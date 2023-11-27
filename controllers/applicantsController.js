const Applicants = require('../models/Applicants');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { uploadFile, destroyFile } = require('../tools/cloudinary/images')

exports.createUser = async (req, res) => {
    try {
        const body = { ...req.body }
        const isEmailRegiter = await Applicants.findOne({ email: body.email });
        if (isEmailRegiter) return res.status(500).json({
            msg: "Este correo ya esta registrado",
            status: false
        })
        const password = req.body.password;
        const userType = !req.body.isBussines ? 'applicant' : 'company';
        const salt = await bcryptjs.genSalt(10);
        const newPassword = await bcryptjs.hash(password, salt);
        if (req.body.isBussines) {
            body.profile = {
                bussinesName: body.bussinesName
            }
        }
        body.password = newPassword;
        body.userType = userType;
        const user = new Applicants(body);
        user.save();
        const payload = {
            usuario: {
                id: user._id
            }
        };

        jwt.sign(
            payload,
            process.env.SECRETEA,
            {
                expiresIn: 86400//1 dia
            },
            (error, token) => {
                if (error) throw error;
                res.status(200).json({
                    msg: 'Usuario creado correctamente',
                    token,
                    user
                });
            });
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

exports.editUser = async (req, res) => {
    try {
        const body = { ...req.body }
        const upadate = await Applicants.findByIdAndUpdate(req.params.id, body, { new: true });
        return res.json({ msg: 'Guardado Correctamente', status: true, user: upadate });
    } catch (error) {
        throw new Error(error);
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const { _id } = req.params;
        await Applicants.findByIdAndDelete({ _id });
        return res.json({ msg: 'Usuario eliminado correctamente' })
    } catch (error) {
        return res.status(400).json({ msg: 'Ha ocurrido un error al eliminar el usuario' });
    }
}

exports.getUsersPagination = async (req, res) => {
    try {
        const { page, userType } = req.params;
        const skip = (page - 1) * 10;
        const users = await Applicants.find({ userType }).limit(10).skip(skip).select('-password');
        const total = await Applicants.find({ userType }).count();
        // const users = await Promise.all(
        //     users.map(async user => {
        //         let usuario = JSON.parse(JSON.stringify(user));
        //         usuario.password = '';
        //         return usuario;
        //     })
        // );
        return res.json({ users, total });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: 'Error al obtener los aspirantes' });
    }
}

exports.getApplicantsById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Applicants.find({ _id: id });
        return res.json({ user, status: true });
    } catch (error) {
        throw new Error(error);
    }
}

exports.upadateSkills = async (req, res) => {
    try {
        const { skill } = req.body;
        const userId = req.params.id;
        const user = await Applicants.findOne({ _id: userId });
        const currentSkills = user?.profile?.skills ? user?.profile?.skills : [];
        const id = mongoose.Types.ObjectId();
        const newSkill = {
            id,
            skill
        }
        const upadate = await Applicants.findByIdAndUpdate(req.params.id, {
            profile: {
                ...user.profile,
                skills: [
                    ...currentSkills,
                    {
                        ...newSkill
                    }
                ]
            }
        }, { new: true });
        return res.json({ msg: 'Guardado Correctamente', status: true, user: upadate, newSkill });
    } catch (error) {
        console.log('error',error);
        return res.status(500).json({
            msg: "Ha ocurrido un error al actualizar las skills",
            error: true
        })
    }
}

exports.removeSkills = async (req, res) => {
    try {
        const { skillId, userId } = req.params;
        const ObjectId = mongoose.Types.ObjectId;
        const user = await Applicants.findOne({ _id: userId });
        const currentSkills = user?.profile?.skills ? user?.profile?.skills : [];
        const upadateSkills = currentSkills.filter(skill => !skill.id.equals(new ObjectId(skillId)));
        const upadate = await Applicants.findByIdAndUpdate(userId, {
            profile: {
                ...user.profile,
                skills: upadateSkills
            }
        }, { new: true });
        return res.json({ msg: 'Eliminado Correctamente', status: true, user: upadate });
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

exports.upadateExperience = async (req, res) => {
    try {
        const { experience } = req.body;
        const userId = req.params.id;
        const user = await Applicants.findOne({ _id: userId });
        const id = mongoose.Types.ObjectId();
        const currentExperience = user?.profile?.experience ? user?.profile?.experience : [];
        const newSkill =  {
            id,
            experience
        }
        const upadate = await Applicants.findByIdAndUpdate(req.params.id, {
            profile: {
                ...user.profile,
                experience: [
                    ...currentExperience,
                    {
                        ...newSkill
                    }
                ]
            }
        }, { new: true });
        return res.json({ msg: 'Guardado Correctamente', status: true, user: upadate, newSkill });
    } catch (error) {
        throw new Error(error);
    }
}

exports.removeExperience = async (req, res) => {
    try {
        const { experienceId, userId } = req.params;
        const ObjectId = mongoose.Types.ObjectId;
        const user = await Applicants.findOne({ _id: userId });
        const currentExperience = user?.profile?.experience ? user?.profile?.experience : [];
        const upadateExperience = currentExperience.filter(experience => !experience.id.equals(new ObjectId(experienceId)));
        const upadate = await Applicants.findByIdAndUpdate(userId, {
            profile: {
                ...user.profile,
                experience: upadateExperience
            }
        }, { new: true });
        return res.json({ msg: 'Eliminado Correctamente', status: true, user: upadate });
    } catch (error) {
        throw new Error(error);
    }
}

exports.upadateStudies = async (req, res) => {
    try {
        const { studies } = req.body;
        const userId = req.params.id;
        const user = await Applicants.findOne({ _id: userId });
        const id = mongoose.Types.ObjectId();
        const currentStudies = user?.profile?.studies ? user?.profile?.studies : [];
        const newSkill =  {
            id,
            studies
        }
        console.log('newSkill',newSkill);
        const upadate = await Applicants.findByIdAndUpdate(req.params.id, {
            profile: {
                ...user.profile,
                studies: [
                    ...currentStudies,
                    {
                        ...newSkill
                    }
                ]
            }
        }, { new: true });
        return res.json({ msg: 'Guardado Correctamente', status: true, user: upadate, newSkill });
    } catch (error) {
        throw new Error(error);
    }
}

exports.removeStudies = async (req, res) => {
    try {
        const { studyId, userId } = req.params;
        const ObjectId = mongoose.Types.ObjectId;
        const user = await Applicants.findOne({ _id: userId });
        const currentstudies = user?.profile?.studies ? user?.profile?.studies : [];
        const upadateStudies = currentstudies.filter(study => !study.id.equals(new ObjectId(studyId)));
        const upadate = await Applicants.findByIdAndUpdate(userId, {
            profile: {
                ...user.profile,
                studies: upadateStudies
            }
        }, { new: true });
        return res.json({ msg: 'Eliminado Correctamente', status: true, user: upadate });
    } catch (error) {
        throw new Error(error);
    }
}

exports.uploadProfileImage = async (req, res) => {
    try {
        const { image, userId } = req.body;
        const user = await Applicants.findOne({ _id: userId });
        const result = await uploadFile(image);
        if (user?.image?.publicId && user?.image?.url !== 'default') {
            destroyFile(user.image.publicId)
        }
        const upadate = await Applicants.findByIdAndUpdate(userId, {
            image: {
                url: result.url,
                publicId: result.public_id
            }
        }, { new: true });
        res.status(200).json({
            user: upadate,
            msg: "Imagen Actualizada Correctamente"
        })
    } catch (error) {
        return res.status(400).json({ msg: 'Ha ocurrido un error al subir la imagen' });
    }
}