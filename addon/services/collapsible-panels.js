/**
 * collapsible-panels service
 */
import Ember from 'ember'
const {Service} = Ember

const State = Ember.Object.extend({
  name: null,
  boundOpenState: false,
  apiOpenState: false,
  apiWasUsed: false,

  isOpen: Ember.computed('boundOpenState', 'apiOpenState', 'apiWasUsed', function () {
    if (this.get('apiWasUsed')) {
      return this.get('apiOpenState')
    } else {
      return this.get('boundOpenState')
    }
  }),

  animate: true,
  group: null
})

export default Service.extend({
  _registry: Ember.Object.create({
    keys: Ember.A([]),

    unknownProperty: function (name) {
      const state = State.create()

      this.get('keys').addObject(name)
      this.set(name, state)

      return state
    },

    // probably not too safe, should only be used in tests
    reset () {
      this.get('keys')
        .map(i => i) // copy, so we dont mess with binding/loops
        .forEach((key) => {
          delete this[key]
        })

      this.get('keys').clear()
    }
  }),

  state: Ember.computed.readOnly('_registry'),

  // FIXME: jsdoc
  _panelFor (name) {
    return this.get(`state.${name}`)
  },

  // FIXME: jsdoc
  _panels: Ember.computed('state.keys.[]', function () {
    const keys = this.get('state.keys')
    const state = this.get('state')

    return keys.reduce((result, key) => {
      return result.addObject(state.get(key))
    }, Ember.A([]))
  }),

  // FIXME: jsdoc
  _panelsInGroup (name) {
    return this.get('_panels').filterBy('group.name', name)
  },

  // FIXME: jsdoc
  open (name) {
    const panel = this._panelFor(name)
    const group = panel.get('group')

    if (group && group.get('accordion')) {
      // if this is part of an accordion close
      // everything else
      this.closeAll(group.get('name'))
    }

    panel.set('apiOpenState', true)
    panel.set('apiWasUsed', true)
  },

  // FIXME: jsdoc
  close (name) {
    this._panelFor(name).set('apiOpenState', false)
    this._panelFor(name).set('apiWasUsed', true)
  },

  // FIXME: jsdoc
  toggle (name) {
    let panel = this._panelFor(name)
    return panel.get('isOpen') ? this.close(name) : this.open(name)
  },

  // FIXME: jsdoc
  openAll (group) {
    this._panelsInGroup(group).forEach((panel) => {
      panel.set('apiOpenState', true)
      panel.set('apiWasUsed', true)
    })
  },

  // FIXME: jsdoc
  closeAll (group) {
    this._panelsInGroup(group).forEach((panel) => {
      panel.set('apiOpenState', false)
      panel.set('apiWasUsed', true)
    })
  }
})
