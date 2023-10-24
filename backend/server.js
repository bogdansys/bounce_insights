const express = require('express');
const axios = require('axios');

const app = express();
const port = 3001;

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

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
