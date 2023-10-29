const Users = require('../models/Admins');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Applicants = require('../models/Applicants');

exports.authenticateUser = async (req,res) => {
    const {email,password} = req.body;
    try {
        let user = await Users.findOne({ email });
        if(!user){
            return res.status(400).json({msg:'Usuario no encontrado'})
        }
        const errorInPasword = await bcryptjs.compare(password,user.password);
        if(!errorInPasword){
            return res.status(400).json({msg:'Contraseña incorrecta'})
        }
        const payload = {
            usuario:{
                id:user._id
            }
        };
        const currentUser = await Users.findById(user._id).select('-password').populate('rol');
        // Firmar JWT
        jwt.sign(payload,process.env.SECRETEA,{
            expiresIn:86400//1 dia
        },(error,token)=>{
            if(error) throw error;
            // Mensaje de confirmacion
             res.json({token,usuario:currentUser});
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({msg:'Error al iniciar sesion'})
    }
}

exports.authenticateUserApp = async (req,res) => {
    const {email,password} = req.body;
    try {
        let user = await Applicants.findOne({ email });
        if(!user){
            return res.status(400).json({msg:'Usuario no encontrado'})
        }
        const errorInPasword = await bcryptjs.compare(password,user.password);
        if(!errorInPasword){
            return res.status(400).json({msg:'Contraseña incorrecta'})
        }
        const payload = {
            usuario:{
                id:user._id
            }
        };
        const currentUser = await Applicants.findById(user._id).select('-password');
        console.log(currentUser);
        // Firmar JWT
        jwt.sign(payload,process.env.SECRETEA,{
            expiresIn:86400//1 dia
        },(error,token)=>{
            if(error) throw error;
            // Mensaje de confirmacion
             res.json({token,usuario:currentUser});
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({msg:'Error al iniciar sesion'})
    }
}

exports.authenticatedUser = async (req,res) => {
    try {
        const usuario = await Users.findById(req.usuario.id).select('-password');
        res.json({usuario})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'Hubo un error al iniciar sesion'})
    }
}

exports.changePassword = async (req,res) => {
    try {
        const {password,usuario} = req.body;
        const salt = await bcryptjs.genSalt(10);
        const newPass = await bcryptjs.hash(password, salt);
        await Users.findOneAndUpdate({_id:usuario},{$set:{password:newPass}});
        res.json({msg:'Contraseña cambiada correctamente'})
    } catch (error) {
        console.log(error);
        res.status(400).json({msg:'Error al cambiar la contraseña'});
    }
}