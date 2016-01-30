(function (root, factory) {
  /* eslint-disable */
  if (typeof define === 'function' && define.amd) {
    define('J$X', factory)
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory()
  } else {
    root.J$X = factory()
  }
  /* eslint-enable */
})(this, function () {
  var $ = this.$ || function () {
    throw new Error(
      'Cannot find $ in global, run J$X.use( ... ) to assign.'
    )
  }

  var KEY_ALIASES = {
    className: 'class',
    htmlFor: 'for'
  }

  var ownProp = Object.prototype.hasOwnProperty
  var toString = Object.prototype.toString
  var slice = Array.prototype.slice

  function isArray (obj) {
    return toString.call(obj) === '[object Array]'
  }

  function ClearObject (obj) {
    for (var key in obj) if (ownProp.call(obj, key)) {
      this[key] = obj[key]
    }
  }
  ClearObject.prototype = null

  function append ($el, content) {
    if (content == null) {
      return
    } else if (typeof content === 'object') {
      $el.append(content)
    } else {
      var $dummy = $('<div>').text(content.toString())
      $el.append($dummy.html())
    }
  }

  var J$X = function (name, props/*, children... */) {
    var children = slice.call(arguments, 2)
    var _props = new ClearObject(props)
    if (children.length > 1) {
      _props.children = children
    } else if (children.length === 1) {
      _props.children = children[0]
    }

    if (typeof name === 'string') { // tag name
      return J$X.dom(name, _props)
    } else if (typeof name === 'function') { // element constructor
      return name(_props)
    }

    throw new Error(
      'Invalid element name, either tag name or element constructor'
    )
  }

  J$X.use = function (use$) {
    $ = use$
  }

  J$X.dom = function (name, props) {
    var $el = $('<' + name + '>')
    for (var key in props) {
      var value = props[key]
      key = KEY_ALIASES[key] || key
      if (key === 'children') {
        if (!isArray(value)) {
          append($el, value)
        } else {
          for (var i = 0, l = value.length; i < l; i++) {
            append($el, value[i])
          }
        }
      } else if (key === 'style') {
        $el.css(value)
      } else {
        $el.attr(key, value)
      }
    }
    return $el
  }

  return J$X
})
