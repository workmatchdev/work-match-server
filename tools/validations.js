const DiscartedJobs = require("../models/DiscartedJobs");
const Matchs = require("../models/Matchs");
const ActiveMemberships = require('../models/ActiveMemberships');
const Memberships = require('../models/Memberships');
const moment = require('moment');

exports.validateNumberOfMatches = async (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const todayStart = moment().startOf('day').toDate();
            const todayEnd = moment().endOf('day').toDate();
            const getCurrentMembership = await ActiveMemberships.findOne({user: userId});
            const getMembership = await Memberships.findById(getCurrentMembership.membership);
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
                isAvailable: getMembership.countMatchs > numberOfMatchs,
                numberOfMatchs
                
            })
        } catch (error) {
            reject({
                error: true,
                msg: 'Ha ocurrido un error'
            })
        }
    });

}