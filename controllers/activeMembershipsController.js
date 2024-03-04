const ActiveMemberships = require('../models/ActiveMemberships');
const Memberships = require('../models/Memberships');
const Applicants = require('../models/Applicants');
const { MercadoPagoConfig, Payment } = require('mercadopago');
require('dotenv').config({ path: 'variables.env' });
const stripe = require('stripe')('');
const client = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN, options: { timeout: 5000, idempotencyKey: 'abc' } });
const {createNotification} = require('../tools/createNotifications');

function addMonthsToCurrentDate(monthsToAdd) {
    const currentDate = new Date();
    const newDate = new Date(currentDate.setMonth(currentDate.getMonth() + monthsToAdd));
    return newDate;
}

exports.paymentTest = async (req, res) => {
    const { membershipId, userId, token, payment_method_id, installments, issuer_id } = req.body;
    const membership = await Memberships.findById({ _id: membershipId });
    const user = await Applicants.findById({ _id: userId });
    const { email } = user;
    const { disaccount, price, name } = membership;

    const discount = (price * disaccount) / 100;
    const finalPrice = price - discount;

    const payments = new Payment(client);

    const body = {
        transaction_amount: parseFloat(finalPrice),
        description: name,
        payment_method_id: payment_method_id,
        token: token,
        installments,
        issuer_id,
        payer: {
            email: email
        }
    }
    // Step 5: Make the request
    payments.create({ body }).then(result => {
        res.json({ result })
    }).catch(error => {
        res.json({ error })
    });
}

exports.stripePaymentInten = async (req, res) => {
    try {
        const { membershipId, userId } = req.body;
        const membership = await Memberships.findById({ _id: membershipId });
        const { disaccount, price } = membership;
        const discount = (price * disaccount) / 100;
        const finalPrice = (price - discount) * 100;
        const paymentIntent = await stripe.paymentIntents.create({
            amount: finalPrice,
            currency: 'MXN',
            payment_method_types: ['card'],
        });
        res.status(200).json({ paymentIntent: paymentIntent.client_secret })
    } catch (error) {
        console.log(error);
        res.status(500).send('Ha ocurrido un error')
    }
}

exports.activateMembership = async (req, res) => {
    try {
        const { userId, membershipId } = req.body;
        const findMemberships = await Memberships.findById({ _id: membershipId });
        const { duration, _id } = findMemberships;
        const durationMembership = addMonthsToCurrentDate(Number(duration))
        const body = {};
        body.durations = durationMembership;
        body.membership = _id;
        body.user = userId;
        const newActiveMembership = new ActiveMemberships(body);
        const savedActiveMembership = await newActiveMembership.save();
        const membership = await Memberships.findById({ _id: membershipId });
        createNotification(userId,"newPayment")
        res.status(200).json({ savedActiveMembership, membership });
    } catch (error) {
        console.log(error);
        res.status(200).json({ error })
    }
}