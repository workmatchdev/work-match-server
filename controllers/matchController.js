const Matchs = require('../models/Matchs'); // Reemplaza con la ruta correcta a tu modelo
const DiscartedJobs = require('../models/DiscartedJobs');
const DiscartedApllicants = require('../models/DiscartedApllicants');

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

exports.discartedJob = async (req, res) => {
  try {
    const newDiscartedJob = new DiscartedJobs(req.body);
    const saved = await newDiscartedJob.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: 'Ha ocurrido un error intentelo mas tarder' });
  }
};

exports.discartedApllicants = async (req, res) => {
  try {
    const newDiscartedApllicants = new DiscartedApllicants(req.body);
    const saved = await newDiscartedApllicants.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: 'Ha ocurrido un error intentelo mas tarder' });
  }
};

// Controlador para obtener todas las coincidencias
exports.getAllMatches = async (req, res) => {
  try {
    const { user } = req.params;
    const matches = await Matchs.find({ user: user })
      .populate('job')
      .populate('user');
    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las coincidencias' });
  }
};

// Controlador para obtener una coincidencia por su ID
exports.getMatchById = async (req, res) => {
  const { id } = req.params;
  try {
    const match = await Matchs.findById(id)
      .populate('job')
      .populate('user');
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
    res.status(200).json({data:updatedMatch, message: 'Actualizado correctamente'});
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
    res.status(204).send('Eliminado correctamente');
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la coincidencia' });
  }
};
