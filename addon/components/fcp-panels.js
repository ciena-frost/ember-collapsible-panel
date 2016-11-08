import Ember from 'ember'
import layout from '../templates/components/fcp-panels'

export default Ember.Component.extend({
  layout,

  classNames: 'fcp-panels',
  accordion: false,
  animate: true,

  _cpPanels: true,

  name: Ember.computed.oneWay('elementId')
})
