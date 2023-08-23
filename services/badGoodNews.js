const { bbcNews } = require('../scrapping/bbcScrapi');
const { badAndGoods } = require('../openai/openaiapi');
const database = require('../database/db');

const ScrapDivideAndSaveNews = async () => {
    try {
        const bbcnews = await bbcNews();
        const badGoodNews = await badAndGoods(bbcnews)
        const positiveArrayString = badGoodNews.match(/Positivas: \[(.*?)\]/)[1];
        const negativeArrayString = badGoodNews.match(/Negativas: \[(.*?)\]/)[1];
        const positiveArray = positiveArrayString.split(', ').map(Number);
        const negativeArray = negativeArrayString.split(', ').map(Number);
        let badNews = [];
        let goodNews = [];
        bbcnews.forEach((bbcNew, index) => {
            if(positiveArray.includes(index)){
                goodNews.push(bbcNew)
            } else if(negativeArray.includes(index)){
                badNews.push(bbcNew)
            }
        });
        for (const badNew of badNews){
            await database.badNews.create(badNew)
        }
        for (const goodNew of goodNews){
            await database.goodNews.create(goodNew)
        }
        return badGoodNews;
    } catch (error) {
        console.log('error en ScrapDivideAndSaveNews', error)
    }
}

module.exports = {
    ScrapDivideAndSaveNews
}

