var frisby = require('frisby');
var restTest = require('./restTest.js');
var setupUtils = require('./setupUtils.js');
var _ =require ('underscore');

frisby.globalSetup({
    timeout: 20000
});

var searchId_1 = setupUtils.loadMzId('resources/M_100.mzid');
var searchId_F001303 = setupUtils.loadMzId('resources/F001303.mzid');

frisby.create('modification list for one search')
    .get(restTest.url('/match/modifications/' + searchId_1))
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON('', {
        "GPIanchor": 1,
        "Cys->ethylaminoAla": 1,
        "Acetyl": 1,
        "Carbamidomethyl": 3
    })
    .toss();


frisby.create('check correct proteRef Assignation for LWDVR @ APAF_MOUSE (bug #22)')
    .get(restTest.url('/match/psms/' + searchId_F001303 + '/by-ac/APAF_MOUSE'))
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON('?', {
        pep: {sequence: 'LWDVR'},
        proteinList:function(list) {
            var p = _.find(list, function(pr){
                return pr.proteinRef.AC === 'APAF_MOUSE';
            });
            expect(p).not.toBeUndefined();
            expect(p.startPos).toBe(769);
            expect(p.endPos).toBe(773);
        }
    })
    .toss();

setupUtils.deleteAll();