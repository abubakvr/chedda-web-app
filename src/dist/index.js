
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./chedda-sdk.cjs.production.min.js')
} else {
  module.exports = require('./chedda-sdk.cjs.development.js')
}
