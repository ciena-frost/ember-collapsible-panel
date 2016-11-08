/**
 * Component definition for the frost-collapsible-panel-toggle component
 */

import Ember from 'ember'
const {Component} = Ember
import PropTypesMixin, {PropTypes} from 'ember-prop-types'

import layout from '../templates/components/frost-collapsible-panel-toggle'
import {classes} from 'ember-frost-collapsible-panel/typedefs'

export default Component.extend(PropTypesMixin, {

  // == Dependencies ==========================================================

  // == Ember Keyword Properties ==============================================

  attributeBindings: ['href'],
  classNames: [classes.toggle],
  classNameBindings: [`isOpen:${classes.open}`],
  layout,
  tagName: 'a',

  // == PropTypes =============================================================

  propTypes: {
    // options
    href: PropTypes.string,
    isOpen: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    onRemove: PropTypes.func,
    removeLabel: PropTypes.string,
    subtitle: PropTypes.string,
    title: PropTypes.string,

    // state
    classes: PropTypes.object,

    // keyword props
    attributeBindings: PropTypes.arrayOf(PropTypes.string),
    classNames: PropTypes.arrayOf(PropTypes.string),
    classNameBindings: PropTypes.array,
    layout: PropTypes.any,
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
      isOpen: false,
      onRemove: null,
      removeLabel: 'Remove',
      subtitle: '',
      title: '',

      // state
      classes
    }
  },

  // == Computed Properties ===================================================

  // == Functions =============================================================

  // == DOM Events ============================================================

  /**
   * Handle the click event on the anchor tag that is this component
   * @param {Event} e - the click event being handled
   */
  click (e) {
    e.preventDefault()
    this.onClick()
  },

  // == Lifecycle Hooks =======================================================

  // == Actions ===============================================================
  actions: {
  }
})
