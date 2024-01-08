const ForgotPassword = require('../models/forgotPassword');
const Applicants = require('../models/Applicants');
const bcryptjs = require('bcryptjs');

function generarCodigo() {
    let codigo = '';
    const caracteres = '0123456789';
    for (let i = 0; i < 5; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
        codigo += caracteres.charAt(indiceAleatorio);
    }
    return codigo;
}

exports.validateEmail = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await Applicants.findOne({ email: email }).select('-password');
        if (!user) {
            return res.status(500).json({ message: 'No se ha encontrado el correo electronico' });
        }
        const code = generarCodigo();
        const savedCode = new ForgotPassword({
            email,
            code
        });
        savedCode.save();
        res.status(201).json({
            code: code,
            user,
            message: 'Codigo generado correctamente',
            status: true
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el trabajo' });
    }
};

exports.validateCode = async (req, res) => {
    try {
        const { email, code } = req.body;
        const validateCodeExist = await ForgotPassword.findOne({ email, code }).sort({ data: -1 });;
        if (!validateCodeExist) {
            return res.status(500).json({ message: 'No se ha encontrado el correo electronico' });
        }
        res.status(201).json({
            code: code,
            message: 'Codigo correcto',
            status: true
        });
    } catch (error) {
        res.status(500).json({ error: 'Ha ocurrido un error' });
    }
};


exports.changePassword = async (req, res) => {
    try {
        const { id, password1, password2 } = req.body;
        if (password1 !== password2) {
           return res.status(500).json({ message: 'Las contraseñas no coinciden' });
        }
        const salt = await bcryptjs.genSalt(10);
        const newPassword = await bcryptjs.hash(password1, salt);
        const updatedAdmin = await Applicants.findByIdAndUpdate(id, {
            password: newPassword
        }, { new: true })
            .select('-password');
        res.status(201).json({
            message: 'Contraseña actualizada',
            status: true,
            updatedAdmin
        });
    } catch (error) {
        res.status(500).json({ error: 'Ha ocurrido un error al cambiar la contraseña' });
    }
};