const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');
// crear el servidor
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

global.io = io;
// Conectar a la base de datos
conectarDB();

// Hablitar express.json
app.use(express.json({ extend: true, limit: '50mb' }));

io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});

// Habilitar cors
app.use(cors());

// puerto de la app
const PORT = process.env.PORT || 4000;

app.use('/api/activeMemberships', require('./routes/activeMemberships'));
app.use('/api/memberships', require('./routes/memberships'));
app.use('/api/applicants', require('./routes/applicants'));
app.use('/api/companies', require('./routes/companies'));
app.use('/api/admins', require('./routes/admins'));
app.use('/api/roles', require('./routes/roles'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/jobs', require('./routes/jobs'));
app.use('/api/chats', require('./routes/chats'));

app.listen(PORT, () => {
    console.log(`El servidor esta funcionando en el puerto ${PORT}`);
})
