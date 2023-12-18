
const ActiveMemberships = require('../models/ActiveMemberships');
const Memberships = require('../models/Memberships');

const isFechaMayorQueActual = (fecha) => {
    const fechaIngresada = new Date(fecha);
    const fechaActual = new Date();
    return fechaIngresada > fechaActual;
}

exports.getActiveMemberships = async (userId) => {
    try {
        const getCurrentMembershipt = await ActiveMemberships.find({ user: userId });
        const formatMembershipsData = await Promise.all(
            await getCurrentMembershipt.map(async (membership) => {
                const getMembership = await Memberships.findById(membership.membership);
                const validation = !getMembership.name.includes('free');
                if (validation) {
                    const isActive = isFechaMayorQueActual(membership.durations);
                    return {
                        freePlan: false,
                        membership: getMembership,
                        activeMemberships: membership,
                        isActive
                    }
                } else {
                    return {
                        freePlan: true,
                        membership: getMembership,
                        activeMemberships: membership,
                        isActive: true
                    }
                }
            })
        );
        const paymentsPlans = formatMembershipsData.filter(paymentPlan => !paymentPlan.freePlan && paymentPlan.isActive)
        const paymentsFree = formatMembershipsData.filter(paymentPlan => paymentPlan.freePlan)
        let currentPlansData = paymentsFree[0];
        if (paymentsPlans.length) {
            const objetoConFechaMasAlta = paymentsPlans.reduce((maxDateObj, currentObj) => {
                const maxDate = new Date(maxDateObj.activeMemberships.durations);
                const currentDate = new Date(currentObj.activeMemberships.durations);
                return currentDate > maxDate ? currentObj : maxDateObj;
            }, paymentsPlans[0]);
            currentPlansData = objetoConFechaMasAlta;
        }
        return currentPlansData

    } catch (error) {
        console.log(error);
        return null
    }
}
