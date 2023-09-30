const Memberships = require('../models/Memberships'); // Reemplaza con la ruta correcta a tu modelo

// Controlador para crear una nueva membresía
exports.createMembership = async (req, res) => {
  try {
    const newMembership = new Memberships(req.body);
    const savedMembership = await newMembership.save();
    res.status(201).json(savedMembership);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la membresía' });
  }
};

// Controlador para obtener todas las membresías
exports.getAllMemberships = async (req, res) => {
  try {
    const memberships = await Memberships.find();
    res.status(200).json(memberships);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las membresías' });
  }
};

// Controlador para obtener una membresía por su ID
exports.getMembershipById = async (req, res) => {
  const { id } = req.params;
  try {
    const membership = await Memberships.findById(id);
    if (!membership) {
      return res.status(404).json({ error: 'Membresía no encontrada' });
    }
    res.status(200).json(membership);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la membresía' });
  }
};

// Controlador para actualizar una membresía por su ID
exports.updateMembershipById = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedMembership = await Memberships.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedMembership) {
      return res.status(404).json({ error: 'Membresía no encontrada' });
    }
    res.status(200).json(updatedMembership);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la membresía' });
  }
};

// Controlador para eliminar una membresía por su ID
exports.deleteMembershipById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedMembership = await Memberships.findByIdAndRemove(id);
    if (!deletedMembership) {
      return res.status(404).json({ error: 'Membresía no encontrada' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la membresía' });
  }
};