require('dotenv').config({ path: 'APIKey.env' });
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));
app.use('/assets', express.static(path.join(__dirname, '../public/assets')));

// NASA API base URL for Mars Rover data
const NASA_API_BASE_URL = "https://api.nasa.gov/mars-photos/api/v1/rovers";

// API route to fetch latest Mars Rover photos
app.get('/api/rover/:name', async (req, res) => {
    const { name } = req.params; 
    const apiKey = process.env.API_KEY;

    try {
        const response = await fetch(`${NASA_API_BASE_URL}/${name}/latest_photos?api_key=${apiKey}`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || `Error: ${response.status} ${response.statusText}`);
        }

        res.send({ success: true, data });
    } catch (err) {
        console.error("Error fetching rover data:", err.message || err);
        res.status(500).send({ success: false, message: err.message || "Internal Server Error" });
    }
});

// Start server
app.listen(port, () => console.log(`App listening on http://localhost:${port}`));