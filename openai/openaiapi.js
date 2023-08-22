const { Configuration, OpenAIApi } = require('openai'); 

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(config);
let prompt = 'puedes, por favor, de esta lista de la siguiente lista de Noticias agruparlas en dos grupos. Un grupo con las que son noticias negativas que tienen que ver con conflictos, guerras, enfermedades y delitos y otro grupo las que son noticias positivas que tienen que ver con descubrimientos, deportes y cultura. Por favor dame única y exclusivamente los numeros de cada noticia de la siguiente manera: Positivas: [1, 2, ...] , Negativas: [1, 2, ...] . Acá está la lista: ';

const badAndGoods = async ( bbcnews ) => {
    try {
        const conciseNewsArray = bbcnews.map((news, index) => {
            return `Noticia ${index}: ${news.title} - desarrollo:${news.subtitle}`;
        });
        const response = await openai.createCompletion({
            prompt: `${prompt} ${conciseNewsArray}`,
            model: 'text-davinci-003',
            temperature: 0.7,
            max_tokens: 150
        })
        console.log(response.data.choices)
        return response.data.choices[0].text
    } catch (error) {
        console.log('error en route', error)
    }
}

module.exports = {
    badAndGoods
}
