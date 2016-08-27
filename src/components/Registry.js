let instance = null;

var components = [];
var data = {};
var apps = [];

export class Registry {

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
  
  static get(key) {
    return data[key];
  }
  
  static set(key, val) {
    data[key] = val;
  }
  
  static getApps() {
    return apps;
  }
}