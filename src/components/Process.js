import {Registry} from './Registry';
import {Window} from './Window';
import {WindowManager} from './WindowManager';
import $ from '../../node_modules/jquery/dist/jquery';


export class Process {
  constructor({
    pid = undefined,
    entry = null,
    app = null
  } = {}) {
    this.pid = pid;
    this.app = app;
    this.windows = [];

    /* taskbar icon */
    this.taskicon = null;

    this.screen = {
      width: 0,
      height: 0,
      canvas: document.createElement('canvas')
    };

    var self = this;



    var worker = new Worker('/loader.js');

    var makeReply = function(req, payload) {
      var data = {
        seq: req.seq,
        payload: payload
      };
      worker.postMessage(data);
    }

    this.worker = worker;
    worker.postMessage(entry);
    worker.onmessage = function(msg) {
      var request = msg.data;
      var resource = request.resource,
        action = request.action,
        payload = request.payload;
      switch (resource) {
        case 'screen':
          switch (action) {
            case 'renderFrame':

              /* adjust size of screen canvas */
              if (payload.width !== self.screen.width || payload.height !== self.screen.height) {
                self.screen.width = payload.width;
                self.screen.height = payload.height;
                console.log(payload.width, payload.height)
                self.screen.imageData = self.screen.canvas.getContext('2d').createImageData(payload.width, payload.height);
              }
              self.screen.imageData.data.set(payload.buffer);
              // self.screen.canvas.getContext('2d').putImageData(self.screen.imageData, 0, 0);
              self.windows.forEach(function(window) {
                //window.canvas.getContext('2d').drawImage(self.screen.canvas, 0, 0, 0, 0, window.styles.left, window.styles.top, window.styles.width, window.styles.height);
                if (window.startRender) {
                  window.canvas.width = window.styles.width;
                  window.canvas.height = window.styles.height;
                  window.canvas.getContext('2d').putImageData(self.screen.imageData, -window.styles.left, -window.styles.top);
                }
              });
              break;
          }
          break;
        case 'app':
          switch (action) {
            case 'info':
              makeReply(request, self.app.config);
              break;
            case 'exit':
              self.exit();
              break;
          }

        case 'window':
          switch (action) {
            case 'create':
              var opts = {
                title: 'window',
                styles: payload.styles || {
                  left: 0,
                  top: 0,
                  width: '300px',
                  height: '200px',
                },
                content: payload.content || '',
                process: self,
                type: payload.type || 'normal',
                bare: payload.bare || false
              };
              var window = WindowManager.createWindow(opts);
              Registry.findComponentByName('desktop').appendChild(window);
              self.windows.push(window);
              makeReply(request, window.id);
              break;
            case 'show':
              var window = WindowManager.findWindowById(payload);console.log('show', payload)
              if (window) {
                window.show();
              }
              $('#' + payload).show();
              break;
            case 'hide':
              $('#' + payload).hide();
              break;
            case 'configure':
              var window = WindowManager.findWindowById(payload.id);
              if (window) {
                window.configure(payload.styles);
              }

              break;
            case 'destroy':
              var window = WindowManager.findWindowById(payload);
              window.destroy();
              break;
            case 'renderFrame':
              var window = WindowManager.findWindowById(payload.id);
              window.renderFrame({width: payload.width, height: payload.height, data: msg.data.buf});
          }
          break;
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