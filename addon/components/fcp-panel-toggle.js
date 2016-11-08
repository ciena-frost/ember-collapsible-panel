/**
 * Component definition for the fcp-panel-toggle component
 */

import Ember from 'ember'
const {Component} = Ember
import PropTypesMixin, {PropTypes} from 'ember-prop-types'

export default Component.extend(PropTypesMixin, {

  // == Dependencies ==========================================================

  // == Ember Keyword Properties ==============================================

  attributeBindings: ['href'],
  classNames: ['fcp-panel-toggle'],
  classNameBindings: ['isOpen:cp-is-open'],
  tagName: 'a',

  // == PropTypes =============================================================

  propTypes: {
    // options
    href: PropTypes.string,
    isOpen: PropTypes.bool,
    onClick: PropTypes.func.isRequired,

    // keyword props
    attributeBindings: PropTypes.arrayOf(PropTypes.string),
    classNames: PropTypes.arrayOf(PropTypes.string),
    classNameBindings: PropTypes.array,
    tagName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.null
    ])
  },

  /**
   * @returns {Object} the default properties for this component
   */
  getDefaultProps () {
    return {
      // options
      href: '#', // So taps register in iOS
      isOpen: false
    }
  },

  // == Computed Properties ===================================================

  // == Functions =============================================================

  // == Events ================================================================

  click (e) {
    e.preventDefa
    this.onClick()
  },

  // == Actions ===============================================================
  actions: {
  }
})
