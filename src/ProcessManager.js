import Process from './Process';
import MinIcon from './components/MinIcon';

var pid = 1;
var processes = [];

export default class ProcessManager {
  
  run(app) {
    if (app.type == 'cloudware') {
      var process = new Process({
        pid: pid++,
        entry: 'cloudware.js',
        app: app
      });
      processes.push(process);

      var icon = new MinIcon({process: process});
      icon.setProps({
        iconSrc: mensa.api + '/uploads/' + app.config.cloudware.logo
      });

      mensa.registry.findComponentByName('MenuList').appendChild(icon);
      process.taskicon = icon;
    } else {
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
  
  getActiveProcess() {
    for (var i in processes) {
      if (processes[i].active) {
        return processes[i];
      }
    }
    return null;
  }
  
  setActiveProcess(proc) {
    processes.forEach(function(process) {
      process.active = false;
    });
    proc.active = true;
  }
  
}