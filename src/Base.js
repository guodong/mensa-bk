export default class Base {
  constructor({
    listeners = {}
  } = {}) {
    this.listeners = listeners;
  }

  on(eventName, handler) {
    this.listeners[eventName] = handler;
  }

  fire(eventName) {
    (this.listeners[eventName] || function(){})(this);
  }
}