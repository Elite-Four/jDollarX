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
    $el.children('span').length.should.be.equal(1)
  })
})

describe('Build with content', function () {
  it('should works with text', function () {
    var $el = <div>foo</div>
    $el.text().should.be.equal('foo')
  })

  it('should works with encoded text', function () {
    var $el = <div>{"<a></a>"}</div>
    $el.text().should.be.equal('<a></a>')
  })

  it('should works with number', function () {
    var $el = <div>{2}</div>
    $el.text().should.be.equal('2')
  })

  it('should works with boolean', function () {
    var $true = <div>{true}</div>
    var $false = <div>{false}</div>
    $true.text().should.be.equal('true')
    $false.text().should.be.equal('false')
  })

  it('should works with null', function () {
    var $el = <div>{null}</div>
    $el.text().should.be.empty
  })

  it('should works with undefined', function () {
    var $el = <div>{void 0}</div>
    $el.text().should.be.empty
  })
  it('should works with property', function () {
    var $el = <div data-foo='bar'></div>
    $el.attr('data-foo').should.be.equal('bar')
  })
})
