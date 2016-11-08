/**
 * Integration test for the fcp-panels component
 */

import {expect} from 'chai'
import Ember from 'ember'
const {$, getOwner} = Ember
import {describeComponent, it} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'
import {initialize as initializeHook} from 'ember-hook'
import wait from 'ember-test-helpers/wait'
import {afterEach, beforeEach, describe} from 'mocha'
import sinon from 'sinon'

import {integration} from 'dummy/tests/helpers/ember-test-utils/describe-component'
import {classes} from 'ember-frost-collapsible-panel/typedefs'

$.Velocity.mock = true // fast animations

describeComponent(...integration(classes.panels), function () {
  let sandbox, collapsiblePanels

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
    collapsiblePanels = getOwner(this).lookup('service:collapsible-panels')
    initializeHook()
  })

  afterEach(function () {
    sandbox.restore()
    // FIXME: figure out why the collapsiblePanels.get('sate') is sometimes null
    if (collapsiblePanels.get('state')) {
      collapsiblePanels.get('state').reset()
    }
  })

  describe('when acting as an accordian', function () {
    let $panel1, $panel2
    beforeEach(function () {
      this.setProperties({
        myHook: 'myThing'
      })

      this.render(hbs`
        {{#frost-collapsible-panels accordion=true as |panels|}}
          {{#panels.panel as |panel|}}
            {{panel.toggle}}
            {{#panel.body}}Panel A{{/panel.body}}
          {{/panels.panel}}
          {{#panels.panel as |panel|}}
            {{panel.toggle}}
            {{#panel.body}}Panel B{{/panel.body}}
          {{/panels.panel}}
        {{/frost-collapsible-panels}}
      `)

      return wait().then(() => {
        $panel1 = this.$(`.${classes.panel}:nth-child(1)`)
        $panel2 = this.$(`.${classes.panel}:nth-child(2)`)
      })
    })

    it('should start out with first section closed', function () {
      expect($panel1).to.have.class(classes.closed)
    })

    it('should start out with second section closed', function () {
      expect($panel2).to.have.class(classes.closed)
    })

    describe('after clicking first toggle', function () {
      beforeEach(function () {
        $panel1.find(`.${classes.toggle}`).click()
        return wait()
      })

      it('should open the first section', function () {
        expect($panel1).to.have.class(classes.open)
      })

      it('should leave the second section closed', function () {
        expect($panel2).to.have.class(classes.closed)
      })

      describe('after clicking second toggle', function () {
        beforeEach(function () {
          $panel2.find(`.${classes.toggle}`).click()
          return wait()
        })

        it('should close the first section', function () {
          expect($panel1).to.have.class(classes.closed)
        })

        it('should open the second section', function () {
          expect($panel2).to.have.class(classes.open)
        })
      })
    })
  })

  describe('when acting as a group of panels', function () {
    let $panel1, $panel2
    beforeEach(function () {
      this.render(hbs`
        {{#frost-collapsible-panels name='a-group-of-panels' as |panels|}}
          {{#panels.panel as |panel|}}
            {{#panel.body}}Panel A{{/panel.body}}
          {{/panels.panel}}
          {{#panels.panel as |panel|}}
            {{#panel.body}}Panel B{{/panel.body}}
          {{/panels.panel}}
        {{/frost-collapsible-panels}}
      `)

      return wait().then(() => {
        $panel1 = this.$(`.${classes.panel}:nth-child(1)`)
        $panel2 = this.$(`.${classes.panel}:nth-child(2)`)
      })
    })

    it('should start with first panel closed', function () {
      expect($panel1).to.have.class(classes.closed)
    })

    it('should start with second panel closed', function () {
      expect($panel2).to.have.class(classes.closed)
    })

    describe('when group is opened', function () {
      beforeEach(function () {
        collapsiblePanels.openAll('a-group-of-panels')
        return wait()
      })

      it('should open the first panel', function () {
        expect($panel1).to.have.class(classes.open)
      })

      it('should open the second panel', function () {
        expect($panel2).to.have.class(classes.open)
      })
    })
  })
})
