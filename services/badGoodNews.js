const { bbcNewsDev } = require('../scrapping/bbcScrapiDev');
const { badAndGoods } = require('../openai/openaiapi');
const database = require('../database/db');

const divideAndSaveNews = async () => {
    try {
        const bbcnews = await bbcNewsDev();
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
    } catch (error) {
        console.log('error en route', error)
    }
}

module.exports = {
    divideAndSaveNews
}

