const express = require('express');
const newsRouter = express.Router();
const newsController = require('../controllers/newsController')

newsRouter.get('/goodnews', newsController.getGoodNews);
newsRouter.get('/badnews', newsController.getBaddNews);
newsRouter.get('/scrapnews', newsController.scrapNews);

module.exports = newsRouter;