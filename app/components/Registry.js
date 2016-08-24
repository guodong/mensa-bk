let instance = null;

var components = [];

export default class Registry {
  constructor() {
    this.components = [];
  }

  /**
   * register a component to store
   * @param component
   */
  static register(component) {
    components.push(component);
  }

  /**
   * remove a component from store
   * @param component
   * @returns {Registry}
   */
  static unregister(component) {
    for (var i in components) {
      if (components[i].id === component.id) {
        components.splice(i, 1);
        return this;
      }
    }
  }
  
  static findComponentByName(name) {
    for (var i in components) {
      if (components[i].name === name) {
        return components[i];
      }
    }
    return null;
  }
}