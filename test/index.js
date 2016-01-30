/* eslint-env node, mocha */
/** @jsx J$X */
var jsdom = require('jsdom')
var jquery = require('jquery')
var J$X = require('../jDollarX')

before(function () {
  var window = jsdom.jsdom().defaultView
  var $ = jquery(window)

  J$X.use($)
})

describe('Build with tag name', function () {
  it('should work', function () {
    var $el = <div></div>
    $el.is('div').should.ok
  })

  it('should work with nested elements', function () {
    var $el = <div><span></span></div>
    $el.children('span').length.should.be.equal(1)
  })
})

describe('Build with content', function () {
  it('should work with text', function () {
    var $el = <div>foo</div>
    $el.text().should.be.equal('foo')
  })

  it('should work with encoded text', function () {
    var $el = <div>{"<a></a>"}</div>
    $el.text().should.be.equal('<a></a>')
  })

  it('should work with number', function () {
    var $el = <div>{2}</div>
    $el.text().should.be.equal('2')
  })

  it('should work with boolean', function () {
    var $true = <div>{true}</div>
    var $false = <div>{false}</div>
    $true.text().should.be.equal('true')
    $false.text().should.be.equal('false')
  })

  it('should work with null', function () {
    var $el = <div>{null}</div>
    $el.text().should.be.empty
  })

  it('should work with undefined', function () {
    var $el = <div>{void 0}</div>
    $el.text().should.be.empty
  })

  it('should work with an array of content', function () {
    var $el = <div>{[1, 'two', false]}</div>
    $el.text().should.be.equal('1twofalse')
  })
})

describe('Build with attributes', function () {
  it('should work with custom attributes', function () {
    var $el = <div data-foo='bar'></div>
    $el.attr('data-foo').should.be.equal('bar')
  })

  it('should work with class', function () {
    var classList = 'foo bar'
    var $el = <div className={classList}></div>
    $el.hasClass('bar').should.be.equal(true)
  })

  xit('should work with style', function () {
    var inlineStyle = {color: '#fff'}
    var $el = <div style={inlineStyle}></div>
    $el.css('color').should.be.equal('#fff')
  })

  it('should work with style of multiple words\' name', function () {
    var inlineStyle = {textAlign: 'center'}
    var $el = <div style={inlineStyle}></div>
    $el.css('text-align').should.be.equal('center')
  })

  it('should work with attributes & expression', function () {
    var $true = <div data-foo={true ? 'true' : 'false'}></div>
    var $false = <div data-foo={false ? 'true' : 'false'}></div>
    $true.attr('data-foo').should.be.equal('true')
    $false.attr('data-foo').should.be.equal('false')
  })
})
