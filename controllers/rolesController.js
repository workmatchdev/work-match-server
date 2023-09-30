const Roles = require('../models/Roles'); // Reemplaza con la ruta correcta a tu modelo

// Controlador para crear un nuevo rol
exports.createRole = async (req, res) => {
  try {
    const newRole = new Roles(req.body);
    const savedRole = await newRole.save();
    res.status(201).json(savedRole);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el rol' });
  }
};

// Controlador para obtener todos los roles
exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Roles.find();
    res.status(200).json(roles);
  } catch (error) {
    console.log('error',error);
    res.status(500).json({ error: 'Error al obtener los roles' });
  }
};

// Controlador para obtener un rol por su ID
exports.getRoleById = async (req, res) => {
  const { id } = req.params;
  try {
    const role = await Roles.findById(id);
    if (!role) {
      return res.status(404).json({ error: 'Rol no encontrado' });
    }
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el rol' });
  }
};

// Controlador para actualizar un rol por su ID
exports.updateRoleById = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedRole = await Roles.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedRole) {
      return res.status(404).json({ error: 'Rol no encontrado' });
    }
    res.status(200).json(updatedRole);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el rol' });
  }
};

// Controlador para eliminar un rol por su ID
exports.deleteRoleById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRole = await Roles.findByIdAndRemove(id);
    if (!deletedRole) {
      return res.status(404).json({ error: 'Rol no encontrado' });
    }
    res.status(200).json({ error: 'Rol eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el rol' });
  }
};
