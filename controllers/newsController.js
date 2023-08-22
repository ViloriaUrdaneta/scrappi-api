const database = require('../database/db');
const { ScarpDivideAndSaveNews } = require('../services/badGoodNews')


const getGoodNews = async (req, res, next) => {
    try{
        const goodNews = await database.goodNews.findAll();
        res.status(200).json({
            msg: 'Buenas noticias conseguidas',
            goodNews
        });
    }catch(error){
        res.status(500).json({
            msg: 'Error al actualizar el estado de conexión',
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
            msg: 'Error al actualizar el estado de conexión',
            error: error.message
        });
    }
}

const scrapNews = async (req, res, next) => {
    try{
        const badAndGoodNews = await ScarpDivideAndSaveNews();
        res.status(200).json({
            msg: 'Buenas noticias conseguidas',
            badAndGoodNews
        });
    }catch(error){
        res.status(500).json({
            msg: 'Error al actualizar el estado de conexión',
            error: error.message
        });
    }
}

module.exports = {
    getGoodNews,
    getBaddNews,
    scrapNews
}