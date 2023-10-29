const Applicants = require('../models/Applicants');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
        const { page } = req.params;
        const skip = (page - 1) * 25;
        const users = await Usuarios.find().limit(25).skip(skip).select('word');;
        const total = await Usuarios.find().count();
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