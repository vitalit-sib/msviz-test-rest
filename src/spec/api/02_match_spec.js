var frisby = require('frisby');
var restTest = require('./restTest.js');
var setupUtils = require('./setupUtils.js');

var searchId_1 = setupUtils.loadMzId('resources/M_100.mzid');

frisby.create('modification list for one search')
    .get(restTest.url('/match/modifications/'+searchId_1))
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON('', {
        "GPIanchor": 1,
        "Cys->ethylaminoAla": 1,
        "Acetyl": 1,
        "Carbamidomethyl": 3
    })
    .toss();
