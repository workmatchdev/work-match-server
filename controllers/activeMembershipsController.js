const ActiveMemberships = require('../models/ActiveMemberships');
const Memberships = require('../models/Memberships');
const Applicants = require('../models/Applicants');
const { MercadoPagoConfig, Payment } = require('mercadopago');
require('dotenv').config({ path: 'variables.env' });

const client = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN, options: { timeout: 5000, idempotencyKey: 'abc' } });


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
        res.json({result})
    }).catch(error => {
        res.json({error})
    });

}

exports.activateMembership = async (req, res) => {
    try {
        const { userId, membershipId } = req.body;


    } catch (error) {

    }
}