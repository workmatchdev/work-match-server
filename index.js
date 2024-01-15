const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http')
// crear el servidor
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: '*'
})

global.io = io;
// Conectar a la base de datos
conectarDB();

// Hablitar express.json
app.use(express.json({ extend: true, limit: '50mb' }));

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('message', function (msg) {
        socket.broadcast.emit('message', msg)
    });

    socket.on('notification', (noti) => {
        socket.broadcast.emit('notification', noti)
    })
    // socket.on('connect', function () {
    //     console.log('connect');
    // });
});

// Habilitar cors
app.use(cors());

// puerto de la app
const PORT = process.env.PORT || 4000;

app.use('/api/activeMemberships', require('./routes/activeMemberships'));
app.use('/api/changePassword', require('./routes/forgotPaswword'));
app.use('/api/configurations', require('./routes/configurations'));
app.use('/api/notifications', require('./routes/notifications'));
app.use('/api/pageBuilder', require('./routes/pageBuilder'));
app.use('/api/memberships', require('./routes/memberships'));
app.use('/api/applicants', require('./routes/applicants'));
app.use('/api/companies', require('./routes/companies'));
app.use('/api/support', require('./routes/support'));
app.use('/api/matchs', require('./routes/matchs'));
app.use('/api/admins', require('./routes/admins'));
app.use('/api/roles', require('./routes/roles'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/jobs', require('./routes/jobs'));
app.use('/api/chats', require('./routes/chats'));

server.listen(PORT, () => {
    console.log(`El servidor esta funcionando en el puerto ${PORT}`);
    // createNotification("65359bf7890925d3cb8b2871","newMatch");
})
