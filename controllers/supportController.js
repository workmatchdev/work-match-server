// Importar el modelo y Mongoose
const Support = require('../models/Support'); // Reemplaza la ruta con la correcta
const { uploadFile, destroyFile } = require('../tools/cloudinary/images');

// Controlador para crear un nuevo elemento de soporte
const createSupport = async (req, res) => {
    try {
        const { email, image, message, name } = req.body;
        let imageSuport = {};
        if(image){
            const result = await uploadFile(image);
            imageSuport = {
                url: result.url,
                publicId: result.public_id
            }
        }
        // Crear una nueva instancia del modelo Support
        const newSupport = new Support({
            email,
            image: imageSuport,
            message,
            status: 'pendiente',
            name
        });
        // Guardar el elemento en la base de datos
        await newSupport.save();
        res.status(201).json({ message: 'Elemento de soporte creado exitosamente', support: newSupport });
    } catch (error) {
        res.status(500).json({ message: 'Hubo un error al crear el elemento de soporte', error: error.message });
    }
};

// Controlador para obtener todos los elementos de soporte
const getAllSupports = async (req, res) => {
    try {
        const supports = await Support.find().sort({ date: -1 });
        res.status(200).json({ supports });
    } catch (error) {
        res.status(500).json({ message: 'Hubo un error al obtener los elementos de soporte', error: error.message });
    }
};

// Controlador para actualizar un elemento de soporte por su ID
const updateSupportById = async (req, res) => {
    try {
        const { id } = req.params; // ID del elemento a actualizar
        const body = { ...req.body }
        // Buscar el elemento por su ID y actualizarlo
        const updatedSupport = await Support.findByIdAndUpdate(id, body, { new: true });
        if (!updatedSupport) {
            return res.status(404).json({ message: 'Elemento de soporte no encontrado' });
        }
        res.status(200).json({ message: 'Elemento de soporte actualizado', support: updatedSupport });
    } catch (error) {
        res.status(500).json({ message: 'Hubo un error al actualizar el elemento de soporte', error: error.message });
    }
};

// Controlador para eliminar un elemento de soporte por su ID
const deleteSupportById = async (req, res) => {
    try {
        const { id } = req.params; // ID del elemento a eliminar
        const deletedSupport = await Support.findByIdAndDelete(id);
        if (!deletedSupport) {
            return res.status(404).json({ message: 'Elemento de soporte no encontrado' });
        }
        destroyFile(deletedSupport.image.publicId)
        res.status(200).json({ message: 'Elemento de soporte eliminado', support: deletedSupport });
    } catch (error) {
        res.status(500).json({ message: 'Hubo un error al eliminar el elemento de soporte', error: error.message });
    }
};

module.exports = {
    createSupport,
    getAllSupports,
    updateSupportById,
    deleteSupportById
};

