const Admins = require('../models/Admins'); // Reemplaza con la ruta correcta a tu modelo
const Roles = require('../models/Roles')
const bcryptjs = require('bcryptjs');

// Controlador para crear un nuevo administrador
exports.createAdmin = async (req, res) => {
  try {
    const body = {...req.body}
    const password = req.body.password;
    const salt = await bcryptjs.genSalt(10);
    const newPassword = await bcryptjs.hash(password, salt);
    body.password = newPassword;
    const newAdmin = new Admins(body);
    const savedAdmin = await newAdmin.save();
    const user = await Admins.findById({ _id: savedAdmin._id }).populate('rol').select('-password')
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al crear el administrador' });
  }
};

// Controlador para obtener todos los administradores
exports.getAllAdmins = async (req, res) => {
  try {
    const adminsResult = await Admins.find().populate('rol').select('-password');
    console.log(adminsResult);
    res.status(200).json(adminsResult);
  } catch (error) {
    console.log('error', error);
    res.status(500).json({ error: 'Error al obtener los administradores' });
  }
};

// Controlador para obtener un administrador por su ID
exports.getAdminById = async (req, res) => {
  const { id } = req.params;
  try {
    const admin = await Admins.findById(id);
    const rol = await Roles.findById({ _id: admin.rol })
    let currentUser = JSON.parse(JSON.stringify(admin));
    currentUser.password = '';
    currentUser.rolData = rol ? rol : undefined;
    if (!admin) {
      return res.status(404).json({ error: 'Administrador no encontrado' });
    }
    res.status(200).json(currentUser);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el administrador' });
  }
};

// Controlador para actualizar un administrador por su ID
exports.updateAdminById = async (req, res) => {
  const { id } = req.params;
  try {
    const body = {...req.body}
    const password = req?.body?.password;
    if(password){
      const salt = await bcryptjs.genSalt(10);
      const newPassword = await bcryptjs.hash(password, salt);
      body.password = newPassword;
    }
    const updatedAdmin = await Admins.findByIdAndUpdate(id, req.body, { new: true }).select('-password').populate('rol');
    if (!updatedAdmin) {
      return res.status(404).json({ error: 'Administrador no encontrado' });
    }
    res.status(200).json(updatedAdmin);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el administrador' });
  }
};

// Controlador para eliminar un administrador por su ID
exports.deleteAdminById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedAdmin = await Admins.findByIdAndRemove(id);
    if (!deletedAdmin) {
      return res.status(404).json({ error: 'Administrador no encontrado' });
    }
    res.status(200).json({ result: 'Administrador eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el administrador' });
  }
};
