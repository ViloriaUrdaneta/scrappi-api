const puppeteer = require("puppeteer");
const fs = require('fs')
require("dotenv").config()

const bbcNewsDev = async () => {

    try {
        const browser = await puppeteer.launch({headless: "new"});
        const page = await browser.newPage();
        await page.goto('https://www.bbc.com/mundo')

        await new Promise(r => setTimeout(r, 2000));
        await page.waitForSelector('ol[role="list"]')
        const topNewsLinks = await page.evaluate(() => {
            const topNews = document.querySelectorAll('ol[role="list"] li div div a')
            let links = [];
            for(let topNew of topNews){
                links.push(topNew.href)
            }
            return links
        })
        let bbcNews = []
        await new Promise(r => setTimeout(r, 2000));
        for (let topNewsLink of topNewsLinks){
            await page.goto(topNewsLink)
            await new Promise(r => setTimeout(r, 2000));
            const bbcNew = await page.evaluate((topNewsLink) => {
                const tmp = {}
                tmp.title = document.querySelector('h1[id="content"]').innerText;
                tmp.subtitle = document.querySelector('main div p b').innerText;
                tmp.link = topNewsLink;
                return tmp;
            }, topNewsLink)
            bbcNews.push(bbcNew);
        }
        console.log(bbcNews)
        await browser.close();

        const jsonBbcNews = JSON.stringify(bbcNews)
        fs.writeFileSync('bbcNews.json', jsonBbcNews, 'utf-8')

        return bbcNews

    } catch (error) {
        console.log(error);
        return error
    }
    
}

module.exports = {
    bbcNewsDev
}


/*
   
*/

    /*
   let titles = []
   for (let topNewLink of topNewsLinks){
       await page.goto(topNewLink)
       await page.waitForTimeout(2000);
       const title = await page.evaluate(() => {
           const tmp = {}
           tmp.title = document.querySelector('h1[id="content"]').innerText
           tmp.subtitle = document.querySelector('main div p b').innerText
           return tmp
       })
       titles.push(title)
   }*/