const Matchs = require('../models/Matchs'); // Reemplaza con la ruta correcta a tu modelo

// Controlador para crear una nueva coincidencia
exports.createMatch = async (req, res) => {
  try {
    const newMatch = new Matchs(req.body);
    const savedMatch = await newMatch.save();
    res.status(201).json(savedMatch);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la coincidencia' });
  }
};

// Controlador para obtener todas las coincidencias
exports.getAllMatches = async (req, res) => {
  try {
    const matches = await Matchs.find();
    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las coincidencias' });
  }
};

// Controlador para obtener una coincidencia por su ID
exports.getMatchById = async (req, res) => {
  const { id } = req.params;
  try {
    const match = await Matchs.findById(id);
    if (!match) {
      return res.status(404).json({ error: 'Coincidencia no encontrada' });
    }
    res.status(200).json(match);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la coincidencia' });
  }
};

// Controlador para actualizar una coincidencia por su ID
exports.updateMatchById = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedMatch = await Matchs.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedMatch) {
      return res.status(404).json({ error: 'Coincidencia no encontrada' });
    }
    res.status(200).json(updatedMatch);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la coincidencia' });
  }
};

// Controlador para eliminar una coincidencia por su ID
exports.deleteMatchById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedMatch = await Matchs.findByIdAndRemove(id);
    if (!deletedMatch) {
      return res.status(404).json({ error: 'Coincidencia no encontrada' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la coincidencia' });
  }
};
