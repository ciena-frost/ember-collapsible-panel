/* jshint node: true */
'use strict'

var VersionChecker = require('ember-cli-version-checker')

module.exports = function (environment, appConfig, addon) {
  appConfig['ember-frost-collapsible-panel'] = appConfig['ember-frost-collapsible-panel'] || {}

  var checker = new VersionChecker(addon)
  var dep = checker.for('liquid-fire', 'npm')
  var hasLiquidFire = dep.version

  appConfig['ember-frost-collapsible-panel']['hasLiquidFire'] = hasLiquidFire

  return appConfig
}
