const Configurations = require('../models/Configurations');

exports.createConfigurations = async (req, res) => {
    try {
        const newJob = new Configurations(req.body);
        const savedJob = await newJob.save();
        res.status(201).json({
            data: savedJob,
            msg: 'Configuracion creada correctamente',
            status: true
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la configuracion' });
    }
};


exports.updateConfigurations = async (req, res) => {
    try {
        const id = req.params.id;
        const updateConfigurations = await Configurations.findByIdAndUpdate(id, { configuration: req.body }, { new: true })
        res.status(201).json({
            data: updateConfigurations,
            msg: 'Configuracion actualizada correctamente',
            status: true
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la configuracion' });
    }
}

exports.getAllConfigurations = async (req, res) => {
    try {
        const data = await Configurations.findById({ _id: "65a52b6f9882bc696c5f2e68" })
        res.status(201).json({
            data: data,
            msg: 'Datos obtenidos correctamente',
            status: true
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la configuracion' });
    }
}