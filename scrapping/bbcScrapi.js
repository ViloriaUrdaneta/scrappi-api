const puppeteer = require("puppeteer");


const bbcNews = async () => {

    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://www.bbc.com/mundo')

        await page.waitForTimeout(2000);
        await page.waitForSelector('ol[role="list"]')
        const topNewsLinks = await page.evaluate(() => {
            const topNews = document.querySelectorAll('ol[role="list"] li div div a')
            let links = [];
            for(let topNew of topNews){
                links.push(topNew.href)
            }
            return links
        })
        console.log(topNewsLinks)
        await browser.close();
        
        return topNewsLinks

    } catch (error) {
        console.log(error);
        return error
    }
    
}

module.exports = {
    bbcNews
}

/**
 * 
 * 
 * /*
    const conciseNewsArray = titles.map((news, index) => {
        return `Noticia ${index}: ${news.title} - desarrollo:${news.subtitle}`;
    });
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