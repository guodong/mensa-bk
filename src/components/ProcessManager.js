import {Process} from './Process';
import {Window} from './Window';
import {Registry} from './Registry';
import {MenuList} from './MenuList';
import {MinIcon} from './MinIcon';

var pid = 1;
var processes = [];

export class ProcessManager {
  constructor() {
    
  }
  
  static run(app) {
    var url = app.url + '/' + app.config.entry;
    var process = new Process({
      pid: pid++,
      entry: url,
      app: app
    });

    var icon = new MinIcon({process: process});
    icon.setProps({
      iconSrc: app.url + '/icon.png'
    });
    Registry.findComponentByName('MenuList').appendChild(icon);
    process.taskicon = icon;
  }
  
}