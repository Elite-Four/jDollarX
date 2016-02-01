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

  it('should work with children prop', function () {
    var $el = <div children={['a', <span>b</span>]}/>
    $el.contents().first().text().should.be.equal('a')
    $el.children('span').text().should.be.equal('b')
  })

  it('should use actual children but not children prop', function () {
    var $el = <div children='a'>b</div>
    $el.text().should.be.equal('b')
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

  it('should work with style', function () {
    var inlineStyle = {display: 'inline'}
    var $el = <div style={inlineStyle}></div>
    $el.css('display').should.be.equal('inline')
  })

  it('should work with style of multiple words\' name', function () {
    var inlineStyle = {textAlign: 'center'}
    var $el = <div style={inlineStyle}></div>
    $el.css('text-align').should.be.equal('center')
  })

  it('should work with style value of number type', function () {
    var inlineStyle = {
      width: -0,
      height: +0,
      borderWidth: 1 / 0,
      margin: NaN,
      fontSize: 14
    }
    var $el = <div style={inlineStyle}></div>
    $el.css('height').should.be.equal('0px')
    $el.css('width').should.be.equal('0px')
    $el.css('border-width').should.be.empty
    $el.css('margin').should.be.empty
    $el.css('font-size').should.be.equal('14px')
  })

  it('should work with attributes & expression', function () {
    var $true = <div data-foo={true ? 'true' : 'false'}></div>
    var $false = <div data-foo={false ? 'true' : 'false'}></div>
    $true.attr('data-foo').should.be.equal('true')
    $false.attr('data-foo').should.be.equal('false')
  })
})

describe('Build with nested components', function () {
  it('should work', function () {
    function Editor (props) {
      /* eslint-disable react/prop-types */
      return <form action={props.action}>
        <textarea>abc</textarea>
        <button>{props.submitText}</button>
      </form>
      /* eslint-enable */
    }

    var submitText = 'Submit >.<'
    var $el = <div>
      <Editor action='//example.com' submitText={submitText}/>
    </div>

    $el.children('form').attr('action').should.be.equal('//example.com')
    $el.find('form button').text().should.be.equal(submitText)
  })
})
