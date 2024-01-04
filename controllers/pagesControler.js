const PagesModel = require('../models/Pages'); // Asegúrate de tener la ruta correcta
const { uploadFile, destroyFile } = require('../tools/cloudinary/images');


async function getAllPages(req, res) {
    try {
        const pages = await PagesModel.find({});
        res.json(pages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Controlador para obtener una página por su ID
async function getPageById(req, res) {
    const { id } = req.params;
    try {
        const page = await PagesModel.findById(id);
        if (!page) {
            return res.status(404).json({ message: 'Página no encontrada' });
        }
        res.json({ page });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Controlador para crear una nueva página
async function createPage(req, res) {
    const pageData = req.body;
    try {
        const newPage = await PagesModel.create(pageData);
        res.status(201).json(newPage);
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ error: error.message });
    }
}

// Controlador para actualizar una página por su ID
async function updatePageById(req, res) {
    const { id } = req.params;
    const {
        background1: newBackground1,
        backgroundCard1: newBackgroundCard1,
        backgroundCard2: newBackgroundCard2,
        backgroundCard3: newBackgroundCard3,
        backgroundBanner: newBackgroundBanner
    } = req.body;
    const newData = { ...req.body };

    const page = await PagesModel.findById(id);
    const { background1, backgroundCard1, backgroundCard2, backgroundCard3, backgroundBanner } = page;

    if (newBackground1) {
        const result = await uploadFile(newBackground1);
        newData.background1 = {
            url: result.url,
            publicId: result.public_id
        }
        if (background1) destroyFile(background1.publicId)
    }

    if (newBackgroundCard1) {
        const result = await uploadFile(newBackgroundCard1);
        newData.background1 = {
            url: result.url,
            publicId: result.public_id
        }
        if (backgroundCard1) destroyFile(backgroundCard1.publicId)
    }

    if (newBackgroundCard2) {
        const result = await uploadFile(newBackgroundCard2);
        newData.background1 = {
            url: result.url,
            publicId: result.public_id
        }
        if (backgroundCard2) destroyFile(backgroundCard2.publicId)
    }

    if (newBackgroundCard3) {
        const result = await uploadFile(newBackgroundCard3);
        newData.background1 = {
            url: result.url,
            publicId: result.public_id
        }
        if (backgroundCard3) destroyFile(backgroundCard3.publicId)
    }

    if (newBackgroundBanner) {
        const result = await uploadFile(newBackgroundBanner);
        newData.background1 = {
            url: result.url,
            publicId: result.public_id
        }
        if (backgroundBanner) destroyFile(backgroundBanner.publicId)
    }

    newData.updateLanding = Date.now();

    try {
        const updatedPage = await PagesModel.findByIdAndUpdate(id, newData, { new: true });
        if (!updatedPage) {
            return res.status(404).json({ message: 'Página no encontrada' });
        }
        res.json(updatedPage);
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ error: error.message });
    }
}

async function updatePageTermsById(req, res) {
    const { id } = req.params;
    const {
        terminosYcondiciones
    } = req.body;
    const newData = { terminosYcondiciones, updateTems: Date.now() };
    try {
        const updatedPage = await PagesModel.findByIdAndUpdate(id, newData, { new: true });
        if (!updatedPage) {
            return res.status(404).json({ message: 'Página no encontrada' });
        }
        res.json(updatedPage);
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ error: error.message });
    }
}

async function updatePagePolicyById(req, res) {
    const { id } = req.params;
    const {
        politicaDePrivacidad
    } = req.body;
    const newData = { politicaDePrivacidad, updatePolicy: Date.now() };
    try {
        const updatedPage = await PagesModel.findByIdAndUpdate(id, newData, { new: true });
        if (!updatedPage) {
            return res.status(404).json({ message: 'Página no encontrada' });
        }
        res.json(updatedPage);
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ error: error.message });
    }
}

// Controlador para eliminar una página por su ID
async function deletePageById(req, res) {
    const { id } = req.params;
    try {
        const deletedPage = await PagesModel.findByIdAndDelete(id);
        if (!deletedPage) {
            return res.status(404).json({ message: 'Página no encontrada' });
        }
        res.json({ message: 'Página eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getAllPages,
    getPageById,
    createPage,
    updatePageById,
    deletePageById,
    updatePageTermsById,
    updatePagePolicyById
};