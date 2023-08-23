const database = require('../database/db');
const { ScrapDivideAndSaveNews } = require('../services/badGoodNews')


const getGoodNews = async (req, res, next) => {
    try{
        const goodNews = await database.goodNews.findAll();
        res.status(200).json({
            msg: 'Buenas noticias conseguidas',
            goodNews
        });
    }catch(error){
        res.status(500).json({
            msg: 'Error en getGoodNews',
            error: error.message
        });
    }
}

const getBaddNews = async (req, res, next) => {
    try{
        const badNews = await database.badNews.findAll();
        res.status(200).json({
            msg: 'Buenas noticias conseguidas',
            badNews
        });
    }catch(error){
        res.status(500).json({
            msg: 'Error en getBaddNews',
            error: error.message
        });
    }
}

const scrapNews = async (req, res, next) => {
    try{
        const badAndGoodNews = await ScrapDivideAndSaveNews();
        res.status(200).json({
            msg: 'noticias conseguidas',
            badAndGoodNews
        });
    }catch(error){
        res.status(500).json({
            msg: 'Error en scrapNews',
            error: error.message
        });
    }
}

module.exports = {
    getGoodNews,
    getBaddNews,
    scrapNews
}