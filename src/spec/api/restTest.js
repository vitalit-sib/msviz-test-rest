/**
 * common call for the rest tests
 * @constructor
 */
var RestTest = function () {
    var _this = this;
    _this.rootUrl = process.env.URL_MSVIZ_SERVER || 'http://localhost:9000';
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
