/**
 * Component definition for the frost-collapsible-panel-body component
 */

import Ember from 'ember'
const {Component} = Ember
import PropTypesMixin, {PropTypes} from 'ember-prop-types'

import layout from '../templates/components/frost-collapsible-panel-body'
import {classes} from 'ember-frost-collapsible-panel/typedefs'

export default Component.extend(PropTypesMixin, {

  // == Dependencies ==========================================================

  // == Ember Keyword Properties ==============================================

  classNameBindings: [`isOpen:${classes.open}`],
  classNames: [classes.body],
  layout,

  // == PropTypes =============================================================

  propTypes: {
    // public
    isOpen: PropTypes.bool,
    shouldAnimate: PropTypes.bool.isRequired,

    // state
    classes: PropTypes.object,

    // keywords
    classNames: PropTypes.arrayOf(PropTypes.string),
    classNameBindings: PropTypes.array

  },

  /**
   * @returns {Object} the default properties for this component
   */
  getDefaultProps () {
    return {
      // options
      isOpen: false,

      // state
      classes
    }
  },

  // == Computed Properties ===================================================

  // == Functions =============================================================

  // == DOM Events ============================================================

  // == Lifecycle Hooks =======================================================

  // == Actions ===============================================================
  actions: {
  }
})
