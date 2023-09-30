const Jobs = require('../models/Jobs'); // Reemplaza con la ruta correcta a tu modelo

// Controlador para crear un nuevo trabajo
exports.createJob = async (req, res) => {
  try {
    const newJob = new Jobs(req.body);
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el trabajo' });
  }
};

// Controlador para obtener todos los trabajos
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Jobs.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los trabajos' });
  }
};

// Controlador para obtener un trabajo por su ID
exports.getJobById = async (req, res) => {
  const { id } = req.params;
  try {
    const job = await Jobs.findById(id);
    if (!job) {
      return res.status(404).json({ error: 'Trabajo no encontrado' });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el trabajo' });
  }
};

// Controlador para actualizar un trabajo por su ID
exports.updateJobById = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedJob = await Jobs.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedJob) {
      return res.status(404).json({ error: 'Trabajo no encontrado' });
    }
    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el trabajo' });
  }
};

// Controlador para eliminar un trabajo por su ID
exports.deleteJobById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedJob = await Jobs.findByIdAndRemove(id);
    if (!deletedJob) {
      return res.status(404).json({ error: 'Trabajo no encontrado' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el trabajo' });
  }
};
