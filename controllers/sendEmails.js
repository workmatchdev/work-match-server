
const emails = require('../tools/emails');
const Applicants = require('../models/Applicants');

function generarCodigoLongitud(longitud) {
    const caracteres = '0123456789'; // Caracteres permitidos para el código
    let codigo = '';

    for (let i = 0; i < longitud; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
        codigo += caracteres.charAt(indiceAleatorio);
    }

    return codigo;
}

exports.sendEmailCode = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await Applicants.findOne({ email });
        if (!user) {
            res.status(500).json({
                msg: 'No se se ha encontrado un usuario con ese email'
            });
        }
        const code = generarCodigoLongitud(5);
        const date = new Date();
        await emails.emailCode(
            code,
            email,
            user.firstName,
            date
        );
        res.status(200).json({
            msg: 'Se ha eenviado el correo con el codigo'
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Ha ocurrido un error al enviar el correo.'
        });
    }
};