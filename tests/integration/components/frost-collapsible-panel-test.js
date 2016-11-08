/**
 * Integration test for the fcp-panel component
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

describeComponent(...integration(classes.panel), function () {
  let sandbox, collapsiblePanels

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
    collapsiblePanels = getOwner(this).lookup('service:collapsible-panels')
    initializeHook()
  })

  afterEach(function () {
    sandbox.restore()
    collapsiblePanels.get('state').reset()
  })

  describe('when starting out closed', function () {
    let $panel
    beforeEach(function () {
      this.setProperties({
        myHook: 'fcp'
      })

      this.render(hbs`
        {{#frost-collapsible-panel hook=myHook name='myPanel' as |p|}}
          {{#p.toggle}}Toggle{{/p.toggle}}
          {{#p.body}}Hi!{{/p.body}}
        {{/frost-collapsible-panel}}
      `)

      return wait().then(() => {
        $panel = this.$(`.${classes.panel}`)
      })
    })

    it('should start out closed', function () {
      expect($panel).to.have.class(classes.closed)
    })

    it('should render a toggle', function () {
      expect($panel.find(`.${classes.toggle}`)).to.have.length(1)
    })

    it('should start out without a body', function () {
      expect($panel.find(`.${classes.body}`).text().trim()).to.equal('')
    })

    describe('after clicking toggle', function () {
      beforeEach(function () {
        $panel.find(`.${classes.toggle}`).click()
        return wait()
      })

      it('should become open', function () {
        expect($panel).to.have.class(classes.open)
      })

      it('should have a body', function () {
        expect($panel.find(`.${classes.body}`).text().trim()).to.equal('Hi!')
      })
    })

    describe('after opening with service', function () {
      beforeEach(function () {
        collapsiblePanels.open('myPanel')
        return wait()
      })

      it('should become open', function () {
        expect($panel).to.have.class(classes.open)
      })

      it('should have a body', function () {
        expect($panel.find(`.${classes.body}`).text().trim()).to.equal('Hi!')
      })
    })
  })

  describe('when starting out open', function () {
    let $panel
    beforeEach(function () {
      this.setProperties({
        myHook: 'fcp'
      })

      this.render(hbs`
        {{#frost-collapsible-panel hook=myHook open=true as |p|}}
          {{p.toggle}}
          {{#p.body}}Hi!{{/p.body}}
        {{/frost-collapsible-panel}}
      `)

      return wait().then(() => {
        $panel = this.$(`.${classes.panel}`)
      })
    })

    it('should start out open', function () {
      expect($panel).to.have.class(classes.open)
    })

    it('should start out with a body', function () {
      expect($panel.find(`.${classes.body}`).text().trim()).to.equal('Hi!')
    })

    describe('after clicking toggle', function () {
      beforeEach(function () {
        $panel.find(`.${classes.toggle}`).click()
        return wait()
      })

      it('should become closed', function () {
        expect($panel).to.have.class(classes.closed)
      })

      it('should no longer have a body', function () {
        expect($panel.find(`.${classes.body}`).text().trim()).to.equal('')
      })
    })
  })

  describe('when nesting panels', function () {
    let $parent, $child
    beforeEach(function () {
      this.render(hbs`
        {{#frost-collapsible-panel class='parent' as |p|}}
          {{p.toggle}}
          {{#p.body}}
            {{#frost-collapsible-panel class='child' as |p|}}
              {{p.toggle}}
              {{#p.body}}
                <p>Im a Child!</p>
              {{/p.body}}
            {{/frost-collapsible-panel}}
          {{/p.body}}
        {{/frost-collapsible-panel}}
      `)

      return wait().then(() => {
        $parent = this.$('.parent')
        $child = $parent.find('.child')
      })
    })

    it('should render the parent as closed', function () {
      expect($parent).to.have.class(classes.closed)
    })

    it('should not render the child yet', function () {
      expect($child).to.have.length(0)
    })

    describe('after clicking parent', function () {
      beforeEach(function () {
        $parent.find(`.${classes.toggle}`).click()
        return wait().then(() => {
          $child = $parent.find('.child')
        })
      })

      it('should render the parent as open', function () {
        expect($parent).to.have.class(classes.open)
      })

      it('should render the child as closed', function () {
        expect($child).to.have.class(classes.closed)
      })

      describe('after clicking child', function () {
        beforeEach(function () {
          $child.find(`.${classes.toggle}`).click()
          return wait()
        })

        it('should render the parent as open still', function () {
          expect($parent).to.have.class(classes.open)
        })

        it('should render the child as open', function () {
          expect($child).to.have.class(classes.open)
        })
      })
    })
  })
})
