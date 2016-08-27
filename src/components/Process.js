import {Registry} from './Registry';
import {Window} from './Window';
import $ from '../../node_modules/jquery/dist/jquery';

export class Process {
  constructor({
    pid = undefined,
    entry = null
  } = {}) {
    this.pid = pid;
    this.windows = [];
    
    /* taskbar icon */
    this.taskicon = null;

    var self = this;

    var worker = new Worker('/loader.js');
    this.worker = worker;
    worker.postMessage(entry);
    worker.onmessage = function(msg) {
      var obj = msg.data;
      var payload = obj.payload;
      switch (obj.request) {
        case 'createWindow':
          var window = new Window({
            title: 'clwd',
            styles: payload.styles || {
              left: 0,
              top: 0,
              width: '300px',
              height: '200px',
            },
            content: payload.content || '',
            process: self
          });
          Registry.findComponentByName('desktop').appendChild(window);
          worker.postMessage({seq: obj.seq, reply: 'createWindow', payload: window.id});
          self.windows.push(window);
          break;
        case 'showWindow':
          $('#' + payload).show();
          break;
        case 'hideWindow':
          $('#' + payload).hide();
          break;
        case 'exit':
          self.exit();
      }
    };
  }
  
  exit() {
    /* destroy all process windows */
    this.windows.forEach(function(window) {
      window.destroy();
    });
    
    /* destroy menubar icon */
    this.taskicon.destroy();
    
  }
}