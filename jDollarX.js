void function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory)
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('jquery'))
  } else {
    root.J$X = factory(root.jQuery)
  }
} (this, function ($) {
  var KEY_ALIASES = {
    className: 'class',
    htmlFor: 'for'
  }

  var slice = Array.prototype.slice
  var ownProp = Object.prototype.hasOwnProperty
  var isArray = function (obj) {
    return Object.prototype.toString.call(obj) === '[object Array]'
  }

  function ClearObject(obj) {
    for (var key in obj) if (ownProp.call(obj, key)) {
      this[key] = obj[key]
    }
  }
  ClearObject.prototype = null

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

  J$X.dom = function (name, props) {
    var $el = $('<' + name + '>')
    for (var key in props) {
      var value = props[key]
      key = KEY_ALIASES[key] || key
      if (key !== 'children') {
        $el.attr(key, value)
      } else { // children
        if (!isArray(children)) {
          $el.append(children)
        } else {
          for (var i = 0, l = children.length; i < l; i++) {
            $el.append(children[i])
          }
        }
      }
    }
    return $el
  }

  return J$X
})
