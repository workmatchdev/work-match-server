const Applicants = require('../models/Applicants');
const bcryptjs = require('bcryptjs');


exports.createUser = async (req, res) => {
    try {
        const { name, lastName, gender, password, userType, email } = req.body;
        let newUser = {};
        const salt = await bcryptjs.genSalt(10);
        const newPass = await bcryptjs.hash(password, salt);
        newUser.name = name;
        newUser.lastName = lastName;
        newUser.gender = gender;
        newUser.email = email;
        newUser.userType = userType;
        newUser.status = true;
        newUser.password = newPass;
        const user = new Applicants(newUser);
        user.save();
        return res.json({ msg: 'Usuario creado correctamente', user });
    } catch (error) {
        throw new Error(error);
    }
}

exports.editUser = async (req, res) => {
    try {
        const { name, lastName, gender, password, userType, email } = req.body;
        let newUser = {};
        newUser.name = name;
        newUser.lastName = lastName;
        newUser.gender = gender;
        newUser.email = email;
        newUser.userType = userType;
        newUser.status = true;
        if (password.trim() !== '') {
            const salt = await bcryptjs.genSalt(10);
            const newPass = await bcryptjs.hash(req.body.password, salt);
            newUser.password = newPass;
        }

        const user = new Applicants(newUser);
        user.save();
        return res.json({ msg: 'Guardado Correctamente', status: true, user });
    } catch (error) {
        throw new Error(error);
    }
}

exports.deleteUser = async (req,res) => {
    try {
        const {_id} = req.params;
        await Applicants.findByIdAndDelete({_id});
        return res.json({msg:'Usuario eliminado correctamente'})
    } catch (error) {
        return res.status(400).json({msg:'Ha ocurrido un error al eliminar el usuario'});
    }
}

exports.getUsersPagination = async (req,res) => {
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
        return res.json({users,total});
    } catch (error) {
        console.log(error);
        return res.status(400).json({msg:'Error al obtener los aspirantes'});
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