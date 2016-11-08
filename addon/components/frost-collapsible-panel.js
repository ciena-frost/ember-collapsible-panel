/**
 * Component definition for the frost-collapsible-panel component
 */
import Ember from 'ember'
const {Component, get, inject} = Ember
import PropTypesMixin, {PropTypes} from 'ember-prop-types'

import layout from '../templates/components/frost-collapsible-panel'
import {classes} from 'ember-frost-collapsible-panel/typedefs'

export default Component.extend(PropTypesMixin, {

  // == Dependencies ==========================================================

  collapsiblePanels: inject.service(),
  liquidFireChecker: inject.service(),

  // == Ember Keyword Properties ==============================================

  classNameBindings: [`isOpen:${classes.open}:${classes.closed}`],
  classNames: [classes.panel],
  layout,

  // == PropTypes =============================================================

  propTypes: {
    // options
    animate: PropTypes.bool,
    group: PropTypes.any,
    onToggle: PropTypes.func,

    // keywords
    classNames: PropTypes.arrayOf(PropTypes.string),
    classNameBindings: PropTypes.array,
    layout: PropTypes.any
  },

  /**
   * @returns {Object} the default properties for this component
   */
  getDefaultProps () {
    return {
      // options
      animate: true,
      group: null // passed in if rendered as part of a {{frost-collapsible-panels}} group
    }
  },

  // == Computed Properties ===================================================

  // Caller can overwrite
  name: Ember.computed.oneWay('elementId'),

  shouldAnimate: Ember.computed.and('liquidFireChecker.hasLiquidFire', 'animate'),

  panelState: Ember.computed('name', function () {
    const name = this.get('name')
    return this.get(`collapsiblePanels.state.${name}`)
  }),

  isOpen: Ember.computed.readOnly('panelState.isOpen'),
  isClosed: Ember.computed.not('isOpen'),

  // == Functions =============================================================

  // Register with parent panels component
  maybeRegisterWithStateService: Ember.on('didInsertElement', function () {
    Ember.run.scheduleOnce('afterRender', () => {
      let group = this.get('group')

      if (group) {
        this.get('panelState').set('group', group)
      }
    })
  }),

  // == Events ================================================================

  // FIXME: jsdoc
  didReceiveAttrs (attrs) {
    this._super(...arguments)

    // If caller passes in open=, use it
    if (get(attrs, 'newAttrs.open') !== undefined) {
      this.set('panelState.boundOpenState', this.get('open'))
    }
  },

  // == Actions ===============================================================
  actions: {
    // FIXME: jsdoc
    toggleIsOpen () {
      this.get('collapsiblePanels').toggle(this.get('name'))

      if (this.onToggle) {
        this.onToggle()
      }
    }
  }
})
