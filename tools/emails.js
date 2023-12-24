const nodemailer = require('nodemailer');

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
                <div style=' text-align: center;background-color: #192d4b;border-top-right-radius: .2rem;border-top-left-radius: .2rem; padding:15px 0'>
                </div>
                    <div style='padding: 20px;'>
                        <div style='text-align: center;'>
                            <img style='width: 70%; margin:0px 0' src='https://proscore.netlify.app/static/media/logo.f3a63792.png' alt='logo'>
                        </div>
                        <br>
                        <br>
                        <p style='margin: 5px;font-family:Arial; font-weight: 500; text-align:center; font-size:14px; color: black;'>
                            Hola 
                            <span'>${nombre}</span> 
                        </p>
                        
                        <p style='margin: 5px;font-family:Arial; font-weight: 500; font-size:13px; text-align:center; color: black;'>
                            Este es tu codigo para reestablecer tu contraseña
                        </p><br>

                        <p style='margin: 5px;font-family:Arial; font-weight: bold; font-size:13px; text-align:center; color: black;'>
                            ${code}
                        </p><br>

                        <p style='margin: 5px;font-family:Arial; font-weight: bold; font-size:13px; text-align:center; color: black;'>
                            El codigo vence en ${dias} ${hora}
                        </p>
                        <br>
                        <br>        
                        <div style='display:flex; justify-content:space-between;'>
                            <a style='text-decoration:none; margin:0 auto; color: black; font-family: Arial;' href="${social.facebook}">Facebook</a>
                            <a style='text-decoration:none; margin:0 auto; color: black; font-family: Arial;' href="${social.instagram}">Instagram</a>
                            <a style='text-decoration:none; margin:0 auto; color: black; font-family: Arial;' href="${social.linkedin}">Linkedin</a>
                        </div>
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

async function emailNotification(correo, nombre) {

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
                <div style=' text-align: center;background-color: #192d4b;border-top-right-radius: .2rem;border-top-left-radius: .2rem; padding:15px 0'>
                </div>
                    <div style='padding: 20px;'>
                        <div style='text-align: center;'>
                            <img style='width: 70%; margin:0px 0' src='https://proscore.netlify.app/static/media/logo.f3a63792.png' alt='logo'>
                        </div>
                        <br>
                        <br>
                        <p style='margin: 5px;font-family:Arial; font-weight: 500; text-align:center; font-size:14px; color: black;'>
                        Hola <span'>${nombre}</span> 
                        </p>
                        <p style='margin: 5px;font-family:Arial; font-weight: 500; font-size:13px; text-align:center; color: black;'>
                            Tienes un nuevo match, revisa tu aplicacion para ver las nuevas oportunidades que te esperan.
                        </p>
                        <br><br><br>                                
                        <div style='display:flex; justify-content:space-between;'>
                            <a style='text-decoration:none; margin:0 auto; color: black; font-family: Arial;' href="${social.facebook}">Facebook</a>
                            <a style='text-decoration:none; margin:0 auto; color: black; font-family: Arial;' href="${social.instagram}">Instagram</a>
                            <a style='text-decoration:none; margin:0 auto; color: black; font-family: Arial;' href="${social.linkedin}">Linkedin</a>
                        </div>
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

async function sendMailValidacion(nombre, correo) {

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
                <div style=' text-align: center;background-color: #192d4b;border-top-right-radius: .2rem;border-top-left-radius: .2rem; padding:15px 0'>
                </div>
                    <div style='padding: 20px;'>
                        <div style='text-align: center;'>
                            <img style='width: 70%; margin:0px 0' src='https://proscore.netlify.app/static/media/logo.f3a63792.png' alt='logo'>
                        </div>
                        <br>
                        <br>
                        <p style='margin: 5px;font-family:Arial; font-weight: 500; text-align:center; font-size:14px; color: black;'>Hola 
                            <span'>${nombre}</span> 
                        </p>
                        
                        <p style='margin: 5px;font-family:Arial; font-weight: 500; font-size:13px; text-align:center; color: black;'>
                            Gracias por comprar tu membresia
                        </p><br>
                        <p style='margin: 5px;font-family:Arial; font-weight: 500; font-size:13px; text-align:center; color: black;'>
                          ${membership}
                        </p><br>
                        <div style='display:flex; justify-content:space-between;'>
                            <a style='text-decoration:none; margin:0 auto;' href="${social.facebook}">Facebook</a>
                            <a style='text-decoration:none; margin:0 auto;' href="${social.instagram}">Instagram</a>
                            <a style='text-decoration:none; margin:0 auto;' href="${social.twitter}">Twitter</a>
                        </div>
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
    emailCodeConfirmacion: emailNotification
}
