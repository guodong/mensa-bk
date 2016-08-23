import Util from './Util';

export class Component {
  constructor(opts) {
    this.id = '__comp__' + Util.generateId();
    if (opts) {
      for (var i in opts) {
        this[i] = opts[i];
      }
    }
  }
}