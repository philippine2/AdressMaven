var express = require('express');
var router = express.Router();
const { init, verifyToken } = require('./verify-db');
const { readSnapshot } = require('./batch');

let db = null;
/* GET home page. */
router.get('/', function(req, res) {
    'use strict';
    res.render('index', {
        title: 'Elf-Express'
    });
});

router.get('/foo', (request, response) => {
    response.send({ result: 'SUCCESS!!' });
});

router.get('/worker', (request, response) => {
    response.render('worker', {
        title: request.query.title
    });
});

router.get('/get-address-list', function(request, response) {
    'use strict';
    elfReadFile('routes/addresses-list.json').then(result => {
        response.send(JSON.parse(result.result));
    });
});
router.get('/get-address-list', (request, response) => {
    console.log('READ SNAPSHOT CALLED');

    if (!db) {
        db = init();
    }

    verifyToken(request.query.token)
        .then(() => {
            readSnapshot(db).then(snapshot => {
                const data = snapshot.docs.map(doc => doc.data());
                response.send(data);
            });
        })
        .catch(ex => {
            response.send(ex);
        });
});

const fs = require('fs');

const elfReadFile = fileName => {
    return new Promise(function(resolve, reject) {
        fs.readFile(fileName, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            }
            resolve({
                result: data
            });
        });
    });
};
// elfReadFile('foo.txt' , 'utf8').then(result => console.log (result));

module.exports = router;
