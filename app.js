const express = require('express')
const { bbcNews } = require('./scrapping/bbcScrapi')
const { bbcNewsDev } = require('./scrapping/bbcScrapiDev')
const fs = require('fs')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    res.send('ok!');
})

app.get('/bbcNews', async (req, res) => {
    try {
        const data = await bbcNews()
        console.log(data)
        res.status(200).send(data)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
    
})

app.get('/bbcNewsDev', async (req, res) => {
    try {
        const data = await bbcNewsDev()
        console.log(data)
        res.status(200).send(data)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
    
})

app.get('/savedBbcNews', async (req, res) => {
    try {
        const jsonBbcNews = fs.readFileSync('scrapping/bbcNews.json', 'utf-8');
        const data = JSON.parse(jsonBbcNews)
        console.log(data)
        res.status(200).send(data)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
    
})

module.exports = app;