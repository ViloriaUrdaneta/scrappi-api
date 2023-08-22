//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const http = require('http');
const app = require('../app');
const database = require('../database/db')
const PORT =  process.env.PORT || 3000

database
    .sequelize
    .sync({
        force: false
    })
    .then(()=>{
        console.log('Base de datos conectada')
        const server = http.createServer(app);
        server.listen(PORT);
        server.on('listening', () => {
            console.log(`Servidor escuchando en el puerto ${PORT}`)
        });
    })
