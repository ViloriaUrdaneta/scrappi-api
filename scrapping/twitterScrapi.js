const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const {executablePath} = require('puppeteer');

(async () => {
    puppeteer.use(StealthPlugin())
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://twitter.com/i/flow/login')
    await page.waitForTimeout(2000);
    const inputSelector = 'input[autocomplete="username"]';
    await page.focus(inputSelector); // Coloca el foco en el input
    await page.type(inputSelector, 'doingmybest');
     // Utiliza selectores CSS combinados para seleccionar el div con role="button" y el texto del span
    const divSelector = 'div[role="button"] span';
    const buttonText = 'Next';
    // Esperar a que el elemento esté presente en la página
    await page.waitForSelector(divSelector);
    // Buscar el elemento directamente por el texto deseado
    const targetElement = await page.$x(`//span[contains(text(), "${buttonText}")]`);
    // Hacer clic en el elemento encontrado
    if (targetElement.length > 0) {
        await targetElement[0].click();
    } else {
        console.log(`No se encontró el elemento con el texto "${buttonText}".`);
    }
    const inputSelector2 = 'input[autocomplete="current-password"]';
    await page.waitForSelector(inputSelector2);
    await page.focus(inputSelector2); // Coloca el foco en el input
    await page.type(inputSelector2, 'messielmejor');
    const iniciarSesion = 'Log in';
    const targetElement2 = await page.$x(`//span[contains(text(), "${iniciarSesion}")]`);
    // Hacer clic en el elemento encontrado
    if (targetElement2.length > 0) {
        await targetElement2[0].click();
    } else {
        console.log(`No se encontró el elemento con el texto "${iniciarSesion}".`);
    }
    await page.waitForTimeout(2000);

    await page.waitForSelector('div[role="textbox"] span');

    await page.evaluate(() => {
        const tweetField = document.querySelector('div[role="textbox"] span');
        if (tweetField) {
            tweetField.textContent = "¡Hellow world!";
        } else {
            console.log('No se encontró el elemento <span> dentro de los <div>.');
        }
    });
    const tweet = 'Tweet';
    await page.waitForTimeout(10000);
    const targetElement3 = await page.$x(`//span[contains(text(), "${tweet}")]`);
    // Hacer clic en el elemento encontrado
    if (targetElement3.length > 0) {
        await targetElement3[0].click();
    } else {
        console.log(`No se encontró el elemento con el texto "${tweet}".`);
    }


    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'twitter.jpg'})
    await browser.close();
})();