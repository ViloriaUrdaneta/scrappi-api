const express = require('express');
const newsRouter = require('./routes/newsRouter')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    res.send('ok!');
})

app.use('/api', newsRouter);

module.exports = app;