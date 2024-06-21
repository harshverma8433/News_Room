const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

const uploadOnCloudinary = async (file) => {
    try {
        if (!file) throw new Error('File object is required.');
        
        const response = await cloudinary.uploader.upload(file.path, {
            folder: 'uploads', // Optional: Folder in Cloudinary to store uploads
            // Add more upload options as needed
        });

        return response.secure_url;
    } catch (error) {
        console.error('Cloudinary upload error:', error.message);
        throw error;
    }
};

module.exports = uploadOnCloudinary;
