
/**
 * Component definition for the frost-collapsible-panel-body component
 */

import Ember from 'ember'
const {Component} = Ember
import PropTypesMixin, {PropTypes} from 'ember-prop-types'

import layout from '../templates/components/frost-collapsible-panels'
import {classes} from 'ember-frost-collapsible-panel/typedefs'

export default Component.extend(PropTypesMixin, {

  // == Dependencies ==========================================================

  // == Ember Keyword Properties ==============================================

  classNames: [classes.panels],
  layout,

  // == PropTypes =============================================================

  propTypes: {
    // options
    accordian: PropTypes.bool,
    animate: PropTypes.bool,
    hook: PropTypes.string.isRequired,

    // state
    _cpPanels: PropTypes.bool,
    classes: PropTypes.object
  },

  /**
   * @returns {Object} the default properties for this component
   */
  getDefaultProps () {
    return {
      // options
      accordian: false,
      animate: true,

      // state
      _cpPanels: true,
      classes
    }
  },

  // == Computed Properties ===================================================

  name: Ember.computed.oneWay('elementId'),

  // == Functions =============================================================

  // == DOM Events ============================================================

  // == Lifecycle Hooks =======================================================

  // == Actions ===============================================================
  actions: {
  }
})
