const express = require('express');


const fs = require('fs');
const cheerio = require('cheerio');
const shared = require('./parsers/prs_shared.js');
const fit = require('./parsers/prs_fit.js');


const cors = require('cors'); // для междоменных запросов
const app = express(); // для запуска сервера
const port = 3000;


const DEFAULT_FAC = 'fit';
const DEFAULT_COURSE = 1;

console.log('');
main(DEFAULT_FAC, DEFAULT_COURSE);
console.log('');


function main(fac, course) {
    const file = fs.readFileSync('./table.html');
    const html = cheerio.load(file, {decodeEntities: false});
    const scheduleTable = html('table').eq(1).children('tbody');


    switch (fac) {
        case fit.tag:
            fit.parse(course, scheduleTable);
            break;
        default:
            console.log('unknown faculty');
    }
}


/////////////////////////////////////// SERVER ///////////////////////////////////////////
app.use(cors({origin: true})); // одобрение междоменных запросов

app.get('/', (req, res) => {
    //console.log('fac: ' + req.fac);
    res.end(main(DEFAULT_COURSE, DEFAULT_FAC));
});


// запуск сервера
app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
});