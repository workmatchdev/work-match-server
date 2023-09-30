const Notifications = require('../models/Notifications'); // Reemplaza con la ruta correcta a tu modelo

// Controlador para crear una nueva notificación
exports.createNotification = async (req, res) => {
  try {
    const newNotification = new Notifications(req.body);
    const savedNotification = await newNotification.save();
    res.status(201).json(savedNotification);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la notificación' });
  }
};

// Controlador para obtener todas las notificaciones
exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notifications.find();
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las notificaciones' });
  }
};

// Controlador para obtener una notificación por su ID
exports.getNotificationById = async (req, res) => {
  const { id } = req.params;
  try {
    const notification = await Notifications.findById(id);
    if (!notification) {
      return res.status(404).json({ error: 'Notificación no encontrada' });
    }
    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la notificación' });
  }
};

// Controlador para actualizar una notificación por su ID
exports.updateNotificationById = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedNotification = await Notifications.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!updatedNotification) {
      return res.status(404).json({ error: 'Notificación no encontrada' });
    }
    res.status(200).json(updatedNotification);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la notificación' });
  }
};

// Controlador para eliminar una notificación por su ID
exports.deleteNotificationById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedNotification = await Notifications.findByIdAndRemove(id);
    if (!deletedNotification) {
      return res.status(404).json({ error: 'Notificación no encontrada' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la notificación' });
  }
};
