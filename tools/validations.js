const DiscartedJobs = require("../models/DiscartedJobs");
const Matchs = require("../models/Matchs");
const ActiveMemberships = require('../models/ActiveMemberships');
const Memberships = require('../models/Memberships');
const moment = require('moment');
const {getActiveMemberships} = require('../tools/helpers')

exports.validateNumberOfMatches = async (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const todayStart = moment().startOf('day').toDate();
            const todayEnd = moment().endOf('day').toDate();
            const currentActiveMemberships = await getActiveMemberships(userId)
            const numberOfMatchsJobs = await Matchs.countDocuments({
                user: userId,
                date:  { $gte: todayStart, $lte: todayEnd }, 
            });
            const numberOfDiscartedJobs = await DiscartedJobs.countDocuments({
                user: userId,
                created:  { $gte: todayStart, $lte: todayEnd }, 
            });
            const numberOfMatchs = Number(numberOfMatchsJobs) + Number(numberOfDiscartedJobs);
            resolve({
                isAvailable: currentActiveMemberships.membership.countMatchs > numberOfMatchs,
                numberOfMatchs
            })
        } catch (error) {
            console.log(error);
            reject({
                error: true,
                msg: 'Ha ocurrido un error'
            })
        }
    });
}

exports.validateAvailableBenefits = async (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const currentActiveMemberships = await getActiveMemberships(userId);
            resolve({
                benefits: currentActiveMemberships.membership.benefits,
                membership: currentActiveMemberships.membership
            })
        } catch (error) {
            reject({
                error: true,
                msg: 'Ha ocurrido un error'
            })
        }
    });
}