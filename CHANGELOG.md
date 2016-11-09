# 2.0.1

* **Updated** `CHANGELOG` and `package.json` manually due to failed builds (old tags from the forked project hanging around)
* **Updated** travis-ci config to use `ember-try`



# 2.0.0
## Breaking changes
 * **Renamed** the components to `frost-collapsible-panel`, `frost-collapsible-panels`, `frost-collapsible-panel-toggle`, and `frost-collapsible-panel-body` respectively.
 * **Renamed** the `panel-actions` service to `collapsible-panels`
 * **Renamed** the `dependency-checker` service to `liquid-fire-checker`
 * **Changed** the class names on the generated DOM to be:
   * `frost-collapsible-panel`
   * `frost-collapsible-panels`
   * `frost-collapsible-panel-body`
   * `frost-collapsible-panel-body-inner`
   * `frost-collapsible-panel-toggle`
   * `frost-collapsible-panel-is-open`
   * `frost-collapsible-panel-is-closed`

## Non-breaking changes
 * **Updated** style to match frost ux guidelines
 * **Added** an indicator icon to the toggle component
 * **Added** the ability to pass in a `title` attribute to the toggle component
 * **Added** the ability to pass in a `subtitle` attribute to the toggle component
 * **Added** the ability to specify an `onRemove` callback on the toggle component, which will display a remove button on the toggle component itself.
 * **Added** the ability to pass an `onToggle` callback to the collapsible-panel component, it will be invoked whenever the user initiates a toggle by clicking on the toggle component

# 1.0.0
 * The official port of `ember-collapsible-panel@2.0.1`

# 0.2.0
 * **Forked** `ember-collapsible-panel` and converted to frost code style/tools
