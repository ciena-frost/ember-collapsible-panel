import Ember from 'ember'
const {Service, computed} = Ember
import ENV from '../config/environment'

export default Service.extend({

  hasLiquidFire: computed('', function () {
    return ENV['ember-frost-collapsible-panel'].hasLiquidFire
  })

})
