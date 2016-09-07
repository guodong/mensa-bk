import Process from './Process';
import MinIcon from './components/MinIcon';

var pid = 1;
var processes = [];

export default class ProcessManager {
  
  run(app) {
    var url = app.url + '/' + app.config.entry;
    var process = new Process({
      pid: pid++,
      entry: url,
      app: app
    });
    
    processes.push(process);

    var icon = new MinIcon({process: process});
    icon.setProps({
      iconSrc: app.url + '/icon.png'
    });

    mensa.registry.findComponentByName('MenuList').appendChild(icon);
    process.taskicon = icon;
    
  }
  
}