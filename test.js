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
})

describe('Build with attributes', function () {
  it('should works with custom attributes', function () {
    var $el = <div data-foo='bar'></div>
    $el.attr('data-foo').should.be.equal('bar')
  })

  it('should works with class', function () {
    var classList = 'foo bar'
    var $el = <div className={classList}></div>
    $el.hasClass('bar').should.be.equal(true)
  })

  it('should works with style', function () {
    var inlineStyle = {color: '#fff'}
    var $el = <div style={inlineStyle}></div>
    $el.css('color').should.be.equal('#fff')
  })

  it('should works with attributes & expression', function () {
    var $true = <div data-foo={true ? 'true' : 'false'}></div>
    var $false = <div data-foo={false ? 'true' : 'false'}></div>
    $true.attr('data-foo').should.be.equal('true')
    $false.attr('data-foo').should.be.equal('false')
  })
})
