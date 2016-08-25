import {Registry} from './Registry';
import {Window} from './Window';

export class Process {
  constructor({
    pid = undefined,
    entry = null
  } = {}) {
    this.pid = pid;

    var worker = new Worker(entry);
    worker.onmessage = function(msg) {
      var obj = msg.data;
      var payload = obj.payload;
      switch (obj.request) {
        case 'createWindow':
          var window = new Window({
            title: 'clwd',
            styles: {
              left: payload.left || 0,
              top: payload.top || 0,
              width: payload.width || '300px',
              height: payload.height || '200px'
            },
            content: payload.content || ''
          });
          Registry.findComponentByName('desktop').appendChild(window);
      }
    };
  }
}