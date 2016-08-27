import uuid from '../../node_modules/uuid/uuid';
import {AppManager} from './AppManager';

export class App {
  constructor({
    id = uuid.v4(),
    url = '',
    config = {}
  } = {}) {
    this.id = id;
    this.url = url;
    this.config = config;
  }
  
  run() {
    AppManager.run(this);
  }
}