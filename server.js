const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 3001;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

const cors = require('cors');
app.use(cors());

app.get('/country/:name', async (req, res) => {
    try {
        const response = await axios.get(`https://restcountries.com/v3.1/name/${req.params.name}`);
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching country data.');
    }
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server is running at https://pleasant-lamb-lab-coat.cyclic.app/${port}`);
    });
}

module.exports = app; // Export your app
