var should = require('should')
var cheerio = require('cheerio')
var proxyquire = require('proxyquire')
var J$X = proxyquire('./jDollarX', { 'jquery': cheerio })

describe('Build with tag name', function () {
  it('should works', function () {
    var $el = <div></div>
    $el.is('div').should.ok
  })

  it('should works with nested elements', function () {
    var $el = <div><span></span></div>
    $el.children('span').size().should.be.equal(1)
  })
})
