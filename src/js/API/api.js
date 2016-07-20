// Here's our base url so we don't have to keep typing it out.

module.exports = {

    apiKey: '4e6d4f5f0999bcfb27c1d02701df600a',

    base: 'http://gateway.marvel.com/v1/public/',

    url: function (path) {
        return this.base + '/' + path + '?apikey=' + this.apiKey;
    }

};