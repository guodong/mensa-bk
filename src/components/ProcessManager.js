import {Process} from './Process';
import {Window} from './Window';
import {Registry} from './Registry';

var pid = 1;
var processes = [];

export class ProcessManager {
  constructor() {
    
  }
  
  static run(url) {
    var process = new Process({
      pid: pid++,
      entry: url + '/main.js'
    });
  }
  
}