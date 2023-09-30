const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

// crear el servidor
const app = express();

// Conectar a la base de datos
conectarDB();

// Hablitar express.json
app.use(express.json({extend:true,limit: '50mb'}));
 
// Habilitar cors

app.use(cors());

// puerto de la app
const PORT = process.env.PORT || 4000;

app.use('/api/activeMemberships',require('./routes/activeMemberships'));
app.use('/api/memberships',require('./routes/memberships'));
app.use('/api/applicants',require('./routes/applicants'));
app.use('/api/companies',require('./routes/companies'));
app.use('/api/admins',require('./routes/admins'));
app.use('/api/roles',require('./routes/roles'));
app.use('/api/auth',require('./routes/auth'));

app.listen(PORT, () => {
    console.log(`El servidor esta funcionando en el puerto ${PORT}`);
})
