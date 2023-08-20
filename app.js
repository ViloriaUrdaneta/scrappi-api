const express = require('express')
const { bbcNews } = require('./scrapping/bbcScrapi')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    res.send('ok!');
})

app.get('/bbcNews', async (req, res) => {
    const data = await bbcNews()
    res.send(data);
})

module.exports = app;