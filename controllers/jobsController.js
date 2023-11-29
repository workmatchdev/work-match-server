const Jobs = require('../models/Jobs'); // Reemplaza con la ruta correcta a tu modelo
const Applicants = require('../models/Applicants');
const axios = require('axios');
const sectors = require('../data/skillJobs');

exports.getAvalibleJobs = async (req, res) => {
  try {
    const { userId, currentPage } = req.body;
    const resultsPerPage = 10;
    const documentsSkip = (currentPage - 1) * resultsPerPage;
    const applicant = await Applicants.findById({ _id: userId });
    const applicantSkills = applicant?.profile?.skills ? applicant?.profile?.skills : [];
    const formatSkill = applicantSkills.map(skill => skill.skill.toLowerCase());
    const getJobs = await Jobs.find({
      $or: [
        { "extraKeywords.name": { $in: formatSkill } },
        { "keywords.name": { $in: formatSkill } }
      ],
      $expr: { $lt: ["$matchs", { $toInt: "$limitMatches" }] }
    })
      .populate('company')
      .skip(documentsSkip)
      .limit(resultsPerPage);

    res.status(200).json({
      data: getJobs
    })
  } catch (error) {
    console.log('error', error);
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

exports.getSkills = async (req, res) => {
  try {
    const { search } = req.params;
    const config = {
      headers: {
        apikey: "kBdue8fO2pqf4f8cmt73cU129jE9fQcI",
      }
    }
    const query = await axios.get(`https://api.apilayer.com/skills?q=${search}`, config);
    res.status(200).json({ skills: query.data })
  } catch (error) {
    console.log('error', error);
    res.status(500).json({ error: 'Ha ocurrido un error' });
  }
}

exports.getSector = async (req, res) => {
  try {
    const { search } = req.params;
    const searchSectore = sectors.jobSkils.filter(sector => sector.name.toLowerCase().includes(search.toLowerCase()))
    res.status(200).json({ sectores: searchSectore })
  } catch (error) {
    console.log('error', error);
    res.status(500).json({ error: 'Ha ocurrido un error' });
  }
}
