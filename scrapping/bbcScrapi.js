const puppeteer = require("puppeteer");
const fs = require('fs');
require("dotenv").config();

const bbcNews = async () => {

    try {
        const browser = await puppeteer.launch({
            headless: "new",
            args: [
                "--disable-setuid-sandbox",
                "--no-sandbox",
                "--single-process",
                "--no-zygote",
            ],
            executablePath: 
                process.env.NODE_ENV === 'production' 
                    ? process.env.PUPPETEER_EXECUTABLE_PATH
                    : puppeteer.executablePath(),
        });
        const page = await browser.newPage();
        await page.goto('https://www.bbc.com/mundo')

        await new Promise(r => setTimeout(r, 2000));
        await page.waitForSelector('ol[role="list"]');
        const topNewsLinks = await page.evaluate(() => {
            const topNews = document.querySelectorAll('ol[role="list"] li div div a');
            let links = [];
            for(let topNew of topNews){
                links.push(topNew.href);
            }
            return links;
        })
        let bbcNews = [];
        await new Promise(r => setTimeout(r, 2000));
        for (let topNewsLink of topNewsLinks){
            await page.goto(topNewsLink);
            await new Promise(r => setTimeout(r, 2000));
            const bbcNew = await page.evaluate((topNewsLink) => {
                const tmp = {}
                tmp.title = document.querySelector('h1[id="content"]').innerText;
                tmp.subtitle = document.querySelector('main div p b').innerText;
                tmp.link = topNewsLink;
                return tmp;
            }, topNewsLink)
            bbcNews.push(bbcNew)
        }
        await browser.close();
        return bbcNews;

    } catch (error) {
        console.log(error);
        return error
    }
    
}

module.exports = {
    bbcNews
}
