/**
 * Component definition for the fcp-panel-body component
 */

import Ember from 'ember'
const {Component} = Ember
import PropTypesMixin, {PropTypes} from 'ember-prop-types'

import layout from '../templates/components/fcp-panel-body'

export default Component.extend(PropTypesMixin, {

  // == Dependencies ==========================================================

  // == Properties ============================================================

  propTypes: {
    // public
    isOpen: PropTypes.bool,

    // private
    classNames: PropTypes.arrayOf(PropTypes.string),
    classNameBindings: PropTypes.array
  },

  /**
   * @returns {Object} the default properties for this component
   */
  getDefaultProps () {
    return {
      // public
      isOpen: false,

      // private
      classNames: ['fcp-panel-body'],
      classNameBindings: ['isOpen:fcp-is-open'],
      layout
    }
  },

  // == Computed Properties ===================================================

  // == Functions =============================================================

  // == Lifecycle Hooks =======================================================

  // == Actions ===============================================================
  actions: {
  }
})
