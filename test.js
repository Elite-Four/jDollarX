var should = require('should')
var cheerio = require('cheerio')
var proxyquire = require('proxyquire')
var J$X = proxyquire('./jDollarX', { 'jquery': cheerio })

describe('Tag name', function () {
  it('should build with string name', function () {
    var $el = <div></div>
    $el.is('div').should.ok
  })
})
