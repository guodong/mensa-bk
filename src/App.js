import uuid from '../node_modules/uuid/uuid';
import {AppManager} from './AppManager';

export class App {
  constructor({
    id = uuid.v4(),
    url = '',
    type = 'default',
    config = {}
  } = {}) {
    this.id = id;
    this.url = url;
    this.type = type;
    this.config = config;
  }
  
  run() {
    mensa.appManager.run(this);
  }
}