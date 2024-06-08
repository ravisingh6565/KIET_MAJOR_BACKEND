const imageModel = require("../models/imageModel");

const generateImage = async (req, res) => {
    const body = req.body;
    const searchText = body.searchText;
    const pageNumber = 1; // You can make this dynamic if needed
    const UNSPLASH_ACCESS_KEY = 'zlWMOBdrEdSuxehZGhfTzLaiaH3OZldFG67k5lSUKrU'; // Replace with your Unsplash API key

    let imageUrl = "";
    try {
        const fetch = (await import('node-fetch')).default; // Use dynamic import
        
        const response = await fetch(`https://api.unsplash.com/search/photos?page=${pageNumber}&query=${searchText}&client_id=${UNSPLASH_ACCESS_KEY}`);
        
        const data = await response.json();
        if (response.ok && data.results.length > 0) {
            imageUrl = data.results[0].urls.regular; // Get the URL of the first image result
        } else {
            throw new Error(data.errors || 'No images found');
        }
    } catch (err) {
        console.error('Error fetching image:', err);
        return res.status(500).json({
            status: 'error',
            message: 'Failed to fetch image',
        });
    }

    res.json({
        status: 'success',
        data: {
            imageUrl: imageUrl,
        }
    });
};

module.exports = {
    generateImage
};
