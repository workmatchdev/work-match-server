const Jobs = require('../models/Jobs'); // Reemplaza con la ruta correcta a tu modelo
const Applicants = require('../models/Applicants');

exports.getAvalibleJobs = async (req, res) => {
  try {
    const { userId, currentPage } = req.body;
    const resultsPerPage = 10;
    const documentsSkip = (currentPage - 1) * resultsPerPage;
    const applicant = await Applicants.findById(userId);
    const applicantSkills = applicant?.skills ? applicant?.skills : [];
    const getJobs = await Jobs.find({
      $or: [
        { keywords: { $in: applicantSkills } },
        { extraKeywords: { $in: applicantSkills } },
        { matchs: { $lt: "$limitMatches" } }
      ],
      avalibe: true
    })
      .skip(documentsSkip)
      .limit(resultsPerPage);

    res.status(200).json({
      data: getJobs
    })
  } catch (error) {
    res.status(500).json({ error: 'Ha ocurrido un error al obtener la información' });
  }
}

// Controlador para crear un nuevo trabajo
exports.createJob = async (req, res) => {
  try {
    const newJob = new Jobs(req.body);
    const savedJob = await newJob.save();
    res.status(201).json({
      data: savedJob,
      msg: 'Trabajo creado correctamente',
      status: true
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el trabajo' });
  }
};

// Controlador para obtener todos los trabajos
exports.getAllJobs = async (req, res) => {
  const { id } = req.params;
  try {
    const jobs = await Jobs.find({ company: id });
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
    res.status(200).json({
      data: updatedJob,
      msg: 'Tranajo actualizado correctamente'
    });
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
