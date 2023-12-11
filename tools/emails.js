const nodemailer = require('nodemailer');
const Usuario = require('./models/Usuario');
const { crearNotificacion } = require('./controllers/notificacionesController');

const social = {
    facebook: 'https://www.facebook.com/tusitioproscoremx/',
    instagram: 'https://instagram.com/proscore.mx?utm_medium=copy_link',
    twitter: 'https://twitter.com/Proscoremx'
}

async function emailCode(code, correo, nombre, fecha) {

    const dias = fecha.toLocaleDateString("es-ES", { year: 'numeric', month: '2-digit', day: '2-digit', });
    const hora = fecha.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false });

    const transporter = await nodemailer.createTransport({
        pool: true,
        host: 'smtp.hostinger.com',
        post: 587,
        secure: false,
        auth: {
            user: "contacto@proscore.mx",
            pass: "Proscore.mx.01"
        },
        tls: {
            secure: false,
            ignoreTLS: true,
            rejectUnauthorized: false
        }
    })

    const mailOptions = {
        from: "contacto@proscore.mx",
        to: correo,
        subject: "Codigo de restablecimiento",
        text: '',
        html: `
        <html>
            <body>
                <div style='width: 25rem; border: 1px solid #ccc; margin: 0 auto; backgroun:#e1e6ea;'>
                <div style=' text-align: center;background-color: #B50000;border-top-right-radius: .2rem;border-top-left-radius: .2rem; padding:5px 0'>
                </div>
                    <div style='padding: 20px;'>
                        <div style='text-align: center;'>
                            <img style='width: 70%; margin:0px 0' src='https://proscore.netlify.app/static/media/logo.f3a63792.png' alt='logo'>
                        </div>
                        <br>
                        <br>
                        <p style='margin: 5px;font-family:Arial; font-weight: 500; text-align:center; font-size:14px; color: black;'>Estimado/a 
                            <span'>${nombre}</span> 
                        </p>
                        
                        <p style='margin: 5px;font-family:Arial; font-weight: 500; font-size:13px; text-align:center; color: black;'>
                            Ingresa el codigo en el siguiente enlace para restablecer tu contraseña 
                        </p><br>

                        <p style='margin: 5px;font-family:Arial; font-weight: bold; font-size:13px; text-align:center; color: black;'>
                            ${code}
                        </p><br>

                        <p style='margin: 5px;font-family:Arial; font-weight: bold; font-size:13px; text-align:center; color: black;'>
                            El codigo vence despues de ${dias} ${hora}
                        </p><br>

                        <center>
                        <a style='font-family:Arial; font-weight: bold; font-size:13px; text-align:center; color: #fff; background-color: #B50000; width:100%; padding:10px;'
                        href="http://proscore.mx/codigo/">Restablecer</a>
                        </center>

                        <br>

                                
                        <div style='display:flex; justify-content:space-between;'>
                            <a style='text-decoration:none; margin:0 auto;' href="${social.facebook}">Facebook</a>
                            <a style='text-decoration:none; margin:0 auto;' href="${social.instagram}">Instagram</a>
                            <a style='text-decoration:none; margin:0 auto;' href="${social.twitter}">Twitter</a>
                        </div>

                        <p style='margin: 5px;font-family:Arial; font-weight: 500; font-size:13px; color: black; text-align:center;'>
                            proscore.mx@gmail.com
                        </p>

                    </div>
                </div>
            </body>
        </html>
        `,
    }

    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log(info);
            transporter.close();
        }
    })


}

async function emailCodeConfirmacion(code, correo, nombre) {

    const transporter = await nodemailer.createTransport({
        pool: true,
        host: 'smtp.hostinger.com',
        post: 587,
        secure: false,
        auth: {
            user: "contacto@proscore.mx",
            pass: "Proscore.mx.01"
        },
        tls: {
            secure: false,
            ignoreTLS: true,
            rejectUnauthorized: false
        }
    })

    const mailOptions = {
        from: "contacto@proscore.mx",
        to: correo,
        subject: "Codigo de confirmación",
        text: '',
        html: `
        <html>
            <body>
                <div style='width: 25rem; border: 1px solid #ccc; margin: 0 auto; backgroun:#e1e6ea;'>
                <div style=' text-align: center;background-color: #B50000;border-top-right-radius: .2rem;border-top-left-radius: .2rem; padding:5px 0'>
                </div>
                    <div style='padding: 20px;'>
                        <div style='text-align: center;'>
                            <img style='width: 70%; margin:0px 0' src='https://proscore.netlify.app/static/media/logo.f3a63792.png' alt='logo'>
                        </div>
                        <br>
                        <br>
                        <p style='margin: 5px;font-family:Arial; font-weight: 500; text-align:center; font-size:14px; color: black;'>Estimado/a 
                            <span'>${nombre}</span> 
                        </p>
                        
                        <p style='margin: 5px;font-family:Arial; font-weight: 500; font-size:13px; text-align:center; color: black;'>
                            Tu codigo de confirmación es:
                        </p><br>

                        <p style='margin: 5px;font-family:Arial; font-weight: bold; font-size:13px; text-align:center; color: black;'>
                            ${code}
                        </p><br>

                        <br>
                                
                        <div style='display:flex; justify-content:space-between;'>
                            <a style='text-decoration:none; margin:0 auto;' href="${social.facebook}">Facebook</a>
                            <a style='text-decoration:none; margin:0 auto;' href="${social.instagram}">Instagram</a>
                            <a style='text-decoration:none; margin:0 auto;' href="${social.twitter}">Twitter</a>
                        </div>

                        <p style='margin: 5px;font-family:Arial; font-weight: 500; font-size:13px; color: black; text-align:center;'>
                            proscore.mx@gmail.com
                        </p>

                    </div>
                </div>
            </body>
        </html>
        `,
    }

    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log(info);
            transporter.close();
        }
    })


}

async function sendMailValidacion(nombre, correo, texto) {

    const transporter = await nodemailer.createTransport({
        pool: true,
        host: 'smtp.hostinger.com',
        post: 587,
        secure: false,
        auth: {
            user: "contacto@proscore.mx",
            pass: "Proscore.mx.01"
        },
        tls: {
            secure: false,
            ignoreTLS: true,
            rejectUnauthorized: false
        }
    })

    const mailOptions = {
        from: "contacto@proscore.mx",
        to: correo,
        subject: "Informacion",
        text: '',
        html: `
        <html>
            <body>
                <div style='width: 25rem; border: 1px solid #ccc; margin: 0 auto; backgroun:#e1e6ea;'>
                <div style=' text-align: center;background-color: #B50000;border-top-right-radius: .2rem;border-top-left-radius: .2rem; padding:5px 0'>
                </div>
                    <div style='padding: 20px;'>
                        <div style='text-align: center;'>
                            <img style='width: 70%; margin:0px 0' src='https://proscore.netlify.app/static/media/logo.f3a63792.png' alt='logo'>
                        </div>
                        <br>
                        <br>
                        <p style='margin: 5px;font-family:Arial; font-weight: 500; text-align:center; font-size:14px; color: black;'>Estimado/a 
                            <span'>${nombre}</span> 
                        </p>
                        
                        <p style='margin: 5px;font-family:Arial; font-weight: 500; font-size:13px; text-align:center; color: black;'>
                            ${texto}
                        </p><br>

                        <p style='margin: 5px;font-family:Arial; font-weight: 500; font-size:13px; text-align:center; color: black;'>
                            Ingresa a tu cuenta para poder ver los resultados.
                        </p><br>
            
                        <div style='display:flex; justify-content:space-between;'>
                            <a style='text-decoration:none; margin:0 auto;' href="${social.facebook}">Facebook</a>
                            <a style='text-decoration:none; margin:0 auto;' href="${social.instagram}">Instagram</a>
                            <a style='text-decoration:none; margin:0 auto;' href="${social.twitter}">Twitter</a>
                        </div>

                        <p style='margin: 5px;font-family:Arial; font-weight: 500; font-size:13px; color: black; text-align:center;'>
                            proscore.mx@gmail.com
                        </p>

                    </div>
                </div>
            </body>
        </html>
        `,
    }

    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log(info);
            transporter.close();
        }
    })


}

module.exports = {
    sendMailValidacion: sendMailValidacion,
    emailCode: emailCode,
    emailCodeConfirmacion: emailCodeConfirmacion
}
