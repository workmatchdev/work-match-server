const cloudinary = require('cloudinary').v2;
require('dotenv').config({ path: 'variables.env' });

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLODINARY_API_KEY,
    api_secret: process.env.CLODINARY_API_KEY_SECRET
});

exports.destroyFile = async (publicId) => {
    const result = cloudinary.uploader.destroy(publicId);
    return result
}

exports.uploadFile = async (image) => {
    const result = await cloudinary.uploader.upload(image, {
        folder: "workmatch",
        width: 500,
        crop: "scale",
    });
    return result
}