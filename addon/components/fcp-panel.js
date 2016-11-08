/**
 * Component definition for the fcp-panel component
 */
import Ember from 'ember'
const {Component, get, inject} = Ember
import PropTypesMixin, {PropTypes} from 'ember-prop-types'

import layout from '../templates/components/fcp-panel'

export default Component.extend(PropTypesMixin, {

  // == Dependencies ==========================================================

  panelActions: inject.service(),
  dependencyChecker: inject.service(),

  // == Properties ============================================================

  propTypes: {
    // public
    animate: PropTypes.bool,
    group: PropTypes.any,
    panelsWrapper: PropTypes.any,

    // private
    classNames: PropTypes.arrayOf(PropTypes.string),
    classNameBindings: PropTypes.array,
    layout: PropTypes.any
  },

  /**
   * @returns {Object} the default properties for this component
   */
  getDefaultProps () {
    return {
      // public
      animate: true,
      group: null, // passed in if rendered as part of a {{fcp-panels}} group
      panelsWrapper: null,

      // private
      classNames: ['fcp-panel'],
      classNameBindings: ['isOpen:fcp-is-open:fcp-is-closed'],
      layout
    }
  },

  // == Computed Properties ===================================================

  // Caller can overwrite
  name: Ember.computed.oneWay('elementId'),

  shouldAnimate: Ember.computed.and('dependencyChecker.hasLiquidFire', 'animate'),

  panelState: Ember.computed('name', function () {
    const name = this.get('name')
    return this.get(`panelActions.state.${name}`)
  }),

  isOpen: Ember.computed.readOnly('panelState.isOpen'),
  isClosed: Ember.computed.not('isOpen'),

  // == Functions =============================================================

  // == Events ================================================================

  // FIXME: jsdoc
  didReceiveAttrs (attrs) {
    this._super(...arguments)

    // If caller passes in open=, use it
    if (get(attrs, 'newAttrs.open') !== undefined) {
      this.set('panelState.boundOpenState', this.get('open'))
    }
  },

  // Register with parent panels component
  maybeRegisterWithStateService: Ember.on('didInsertElement', function () {
    Ember.run.scheduleOnce('afterRender', () => {
      let group = this.get('group')

      if (group) {
        this.get('panelState').set('group', group)
      }
    })
  }),

  // == Actions ===============================================================
  actions: {
    // FIXME: jsdoc
    toggleIsOpen () {
      this.get('panelActions').toggle(this.get('name'))
    }
  }
})
