var frisby = require('frisby');
var restTest = require('./restTest.js');
var setupUtils = require('./setupUtils.js');

var searchId_1 = setupUtils.loadMzId('resources/M_100.mzid');

frisby.create('search list and check for the loaded mzId presence')
    .get(restTest.url('/search'))
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON('', {
        'searchIds': function (val) {
            expect(val).toContain(searchId_1);
        }
    })
    .expectJSONTypes('', {searchIds: Array})
    .toss();

frisby.create('get search info')
    .get(restTest.url('/search/' + searchId_1))
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON('', {
        searchId: searchId_1,
        title: 'test rafts sample 123 spectra for Roman',
        username: 'roman',
        database: [
            {
                'id': 'SDB_SwissProt_ID',
                'version': 'SwissProt_2014_08.fasta',
                'entries': 546238
            }]
    })
    .toss();

frisby.create('delete mzid')
    .delete(restTest.url('/search/' + searchId_1))
    .expectStatus(200)
    .toss();