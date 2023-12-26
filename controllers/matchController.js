const Matchs = require('../models/Matchs'); // Reemplaza con la ruta correcta a tu modelo
const DiscartedJobs = require('../models/DiscartedJobs');
const Jobs = require('../models/Jobs');
const Chat = require('../models/Chats');
const DiscartedApllicants = require('../models/DiscartedApllicants');
const validations = require('../tools/validations');

// Controlador para crear una nueva coincidencia
exports.createMatch = async (req, res) => {
  try {
    const { job, user, company, userMatch } = req.body;
    console.log(req.body);
    const searchsParams = {};
    let userId = null;
    const currentUserIsApplicant = user ? true : false;
    if (company) {
      userId = company;
      searchsParams.job = job;
    }
    if (user) {
      userId = user;
      searchsParams.job = job;
    }
    const currentJob = await Jobs.findById({ _id: job });
    const benefits = await validations.validateAvailableBenefits(userId);
    const searchMatch = await Matchs.findOne(searchsParams);
    console.log('searchMatch',searchMatch,searchsParams);
    if (searchMatch) {
      const isApplicantMatch = searchMatch.user ? false : true;
      // console.log('isApplicantMatch',isApplicantMatch,searchMatch);
      const updateBody = isApplicantMatch ? { user: userId } : { company: userId, userMatch }
      // console.log('updateBody',updateBody);
      // if (!isApplicantMatch) {
        const upadate = await Matchs.findByIdAndUpdate(
          { _id: searchMatch._id },
          updateBody,
          { new: true }
        );
        // Send email
        const isSendEmailsAvailable = benefits.benefits.includes('emails');
        if (isSendEmailsAvailable) {

        }
        const isChatAvailable = benefits.benefits.includes('chat');
        let createChat = null;
        if (isChatAvailable) {
          const newChatBody = currentUserIsApplicant ? {
            bussines: currentJob.company,
            applicant: userId
          } : {
            bussines: userId,
            applicant: userMatch
          }
          const validateIfChatExist = await Chat.findOne(newChatBody);
          if (!validateIfChatExist) {
            const chat = new Chat(newChat);
            createChat = await chat.save();
          }
        }

        return res.status(201).json({
          data: upadate,
          success: true,
          newMatch: true,
          newChat: !!createChat,
          process: 1
        });
      // }
    }

    const numberOfMatchs = await validations.validateNumberOfMatches(userId);
    if (!numberOfMatchs.isAvailable) {
      return res.status(500).json({
        error: 'Has superado el limite de matches de hoy',
        status: false
      })
    }
    const newMatch = new Matchs(req.body);
    const savedMatch = await newMatch.save();

    // create chat
    const isChatAvailable = benefits.benefits.includes('chat');
    let createChat = null;
    if (isChatAvailable) {
      const newChatBody = currentUserIsApplicant ? {
        bussines: currentJob.company,
        applicant: userId
      } : {
        bussines: userId,
        applicant: userMatch
      }
      const validateIfChatExist = await Chat.findOne(newChatBody);
      if (!validateIfChatExist) {
        const chat = new Chat(newChat);
        createChat = await chat.save();
      }
    }

    return res.status(201).json({
      data: savedMatch,
      success: true,
      newMatch: false,
      newChat: !!createChat,
      process: 2
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Ha ocurrido un error al realizar el match' });
  }
};

exports.discartedJob = async (req, res) => {
  try {
    const numberOfMatchs = await validations.validateNumberOfMatches(req.user);
    if (!numberOfMatchs.isAvailable) {
      return res.status(500).json({
        msg: 'Has superado el limite de matches de hoy',
        status: false
      })
    }
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
    res.status(200).json({ data: updatedMatch, message: 'Actualizado correctamente' });
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
