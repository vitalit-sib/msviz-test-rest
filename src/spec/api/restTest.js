/**
 * common call for the rest tests
 * @todo rootUrl shall bedefined via environment variable (let's pick the same as for the perl mirror scripts)
 * @constructor
 */
var RestTest = function () {
    var _this = this;
    _this.rootUrl = 'http://localhost:9000';
};

/**
 * build the absolute url
 * @param uri
 * @returns {string}
 */
RestTest.prototype.url = function (uri) {
    return this.rootUrl + uri;
};

module.exports = new RestTest();
