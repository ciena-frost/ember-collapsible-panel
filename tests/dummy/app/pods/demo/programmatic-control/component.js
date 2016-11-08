import Ember from 'ember'
const {Component, inject} = Ember

// BEGIN-SNIPPET programmatic-control
export default Component.extend({

  collapsiblePanels: inject.service(),

  actions: {
    expandAll () {
      this.get('collapsiblePanels').openAll('group1')
    },

    collapseAll () {
      this.get('collapsibePanels').closeAll('group1')
    },

    togglePanelA () {
      this.get('collapsibePanels').toggle('panelA')
    },

    togglePanelB () {
      this.get('collapsibePanels').toggle('panelB')
    }
  }

})
// END-SNIPPET
