jDollarX (J$X)
==============

[![Build Status](https://travis-ci.org/Elite-Four/jDollarX.svg?branch=master)](https://travis-ci.org/Elite-Four/jDollarX)
[![Build status](https://ci.appveyor.com/api/projects/status/lflssgij23ciccsk?svg=true)](https://ci.appveyor.com/project/blade254353074/jdollarx)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

Use JSX to build jQuery Objects.

Install
-------

```bash
$ npm install jdollarx
```

Usage
-----

```jsx
/** @jsx J$X */
var J$X = require('jdollarx')
$('body').append(<div>Hello, world</div>)
```

License
-------

[Apache-2.0](https://github.com/Elite-Four/jDollarX/blob/master/LICENSE)
