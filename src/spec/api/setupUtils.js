var frisby = require('frisby');
var restTest = require('./restTest.js');
var fd = require('fs');
var _ = require('underscore');

/**
 * common setup (load files, clean them)....
 * @constructor
 */
var SetupUtils = function () {
    var _this = this;
    _this.idPrefix = 'rest_test';
    _this.ids = {
        search: []
    }
};

/**
 *
 * @param localFile
 * @returns {string}
 */
SetupUtils.prototype.loadMzId = function (localFile) {
    var _this = this;
    var contentMzId = fd.readFileSync(localFile);

    var searchId = _this.idPrefix + '-' + (new Date().toISOString() + '_' + Math.round(10000000 * Math.random())).replace(/\W/g, '_');
    frisby.create('upload mzid')
        .post(restTest.url('/search/' + searchId), {}, {
            body: contentMzId,
            headers: {'content-type': 'application/xml'}
        })
        .expectStatus(200)
        .toss();

    _this.ids.search.push(searchId);
    return searchId;
};

/**
 *
 * @param delete all loaded data
 * @returns {string}
 */
SetupUtils.prototype.deleteAll = function (localFile) {
    var _this = this;


    _.each(_this.ids.search, function (searchId) {
        frisby.create('delete mzid')
            .delete(restTest.url('/search/' + searchId))
            .toss();
    });
    _this.ids.search.lenght = 0;
};


module.exports = new SetupUtils();
