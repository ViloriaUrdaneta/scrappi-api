//import chromium from 'chrome-aws-lambda';
const chrome = require("chrome-aws-lambda");
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

/*
(async () => {
    puppeteer.use(StealthPlugin())
    const browser = await puppeteer.launch({headless: true});
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
    let titles = []
    for (let topNewLink of topNewsLinks){
        await page.goto(topNewLink)
        await page.waitForTimeout(1000);
        const title = await page.evaluate(() => {
            const tmp = {}
            tmp.title = document.querySelector('h1[id="content"]').innerText
            tmp.subtitle = document.querySelector('main div p b').innerText
            return tmp
        })
        titles.push(title)
    }
    console.log(topNewsLinks)
    console.log(titles)
    await browser.close();
})();*/

const bbcNews = async () => {

    /*
    let chrome = {};
    let puppeteer;

    if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
    chrome = require("chrome-aws-lambda");
    puppeteer = require("puppeteer-core");
    } else {
    puppeteer = require("puppeteer");
    }

    if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
        options = {
            args: [...chrome.args, "--hide-scrollbars", "--disable-web-security"],
            defaultViewport: chrome.defaultViewport,
            executablePath: await chrome.executablePath,
            headless: true,
            ignoreHTTPSErrors: true,
        };
    }**/

    const browser = await chrome.puppeteer.launch({
        args: [...chrome.args, "--hide-scrollbars", "--disable-web-security"],
        defaultViewport: chrome.defaultViewport,
        executablePath: await chrome.executablePath,
        headless: true,
        ignoreHTTPSErrors: true,
    })
    
    //const browser = await puppeteer.launch(options);
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
    }
    console.log(topNewsLinks)
    console.log(titles)
    await browser.close();
    const conciseNewsArray = titles.map((news, index) => {
        return `Noticia ${index}: ${news.title} - desarrollo:${news.subtitle}`;
    });
    return conciseNewsArray
}

module.exports = {
    bbcNews
}