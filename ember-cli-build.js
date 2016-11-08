/* global require, module */
const EmberAddon = require('ember-cli/lib/broccoli/ember-addon')

module.exports = function (defaults) {
  const app = new EmberAddon(defaults, {
    babel: {
      optional: ['es7.decorators']
    },
    'ember-cli-mocha': {
      useLintTree: false
    },
    sassOptions: {
      extension: 'scss',
      includePaths: [
        'addon/styles'
      ]
    },
    snippetSearchPaths: ['app', 'tests']
  })

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */
  app.import(app.bowerDirectory + '/bootstrap/dist/css/bootstrap.css')

  if (app.env === 'test') {
    ;[
      'bower_components/sinon-chai/lib/sinon-chai.js',
      'bower_components/chai-jquery/chai-jquery.js'
    ].forEach((path) => {
      app.import(path, {type: 'test'})
    })
  }

  return app.toTree()
}
