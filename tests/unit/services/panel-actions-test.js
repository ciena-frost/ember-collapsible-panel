/**
 * Unit test for panel-actions service
 */

import {expect} from 'chai'
import {describeModule, it} from 'ember-mocha'
import {beforeEach} from 'mocha'

import {module} from 'dummy/tests/helpers/ember-test-utils/describe-module'

describeModule(...module('service', 'panel-actions'), function () {
  let service

  beforeEach(function () {
    service = this.subject()
  })

  // Replace this with your real tests.
  it('should exist', function () {
    expect(service).not.to.equal(undefined)
  })
})
