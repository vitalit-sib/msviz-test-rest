var frisby = require('frisby');
var restTest = require('./restTest.js');

frisby.create('home')
    .get(restTest.url('/'))
    .expectStatus(200)
    .toss();

