import $ from '../node_modules/jquery/dist/jquery';
import Mask from './components/Mask';

function encode (input) {
  var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var output = "";
  var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
  var i = 0;

  while (i < input.length) {
    chr1 = input[i++];
    chr2 = i < input.length ? input[i++] : Number.NaN; // Not sure if the index
    chr3 = i < input.length ? input[i++] : Number.NaN; // checks are needed here

    enc1 = chr1 >> 2;
    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
    enc4 = chr3 & 63;

    if (isNaN(chr2)) {
      enc3 = enc4 = 64;
    } else if (isNaN(chr3)) {
      enc4 = 64;
    }
    output += keyStr.charAt(enc1) + keyStr.charAt(enc2) +
      keyStr.charAt(enc3) + keyStr.charAt(enc4);
  }
  return "data:image/x-icon;base64,"+output;
}

export default class Process {
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

    if (this.app.type == 'cloudware') {
      this.mask = new Mask();
      this.mask.show();
    }


    var worker = new Worker('/loader.js');

    var makeReply = function(req, payload) {
      var data = {
        seq: req.seq,
        payload: payload
      };
      worker.postMessage(data);
    }

    this.worker = worker;

    worker.postMessage({entry: entry, version_id: this.app.config.id});
    var me = this;
    worker.onmessage = function(msg) {
      if (me.mask) {
        me.mask.hide();
        me.mask.destroy();
        me.mask = null;
      }
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
            case 'setCursor':
              var cursor64 = encode(new Uint8Array(payload.iconBuffer));
              /* 工字形鼠标返回空图片,特殊处理 */
              if (cursor64.substr(39) == 'AAAADoAgAAFgAAACgAAAAgAAAAQAAAAAEABAAAAAAAgAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAACAAAAAgIAAgAAAAIAAgACAgAAAgICAAMDAwAAAAP8AAP8AAAD//wD/AAAA/wD/AP//AAD///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/w//AAAAAAAAAAAAAAAAAADwAAAAAAAAAAAAAAAAAAAA8AAAAAAAAAAAAAAAAAAAAPAAAAAAAAAAAAAAAAAAAADwAAAAAAAAAAAAAAAAAAAA8AAAAAAAAAAAAAAAAAAAAPAAAAAAAAAAAAAAAAAAAADwAAAAAAAAAAAAAAAAAAAA8AAAAAAAAAAAAAAAAAAAAPAAAAAAAAAAAAAAAAAAAADwAAAAAAAAAAAAAAAAAAAA8AAAAAAAAAAAAAAAAAAAAPAAAAAAAAAAAAAAAAAAAADwAAAAAAAAAAAAAAAAAAAA8AAAAAAAAAAAAAAAAAAP/w//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////w=='){
                cursor64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAPElEQVRYhe3VsQoAIAhAQev//9n2lnAoqO42SeRtRfyuLd5z2p3no3K9Utd3HBUgQIAAAQIqrvqOAeBNA2bsBRzk+8IJAAAAAElFTkSuQmCC';
              }
              $("body").get(0).style.cursor = "url('"+ cursor64 +"')" + payload.xspot + ' ' + payload.yspot + ", auto";
          }
          break;
        case 'app':
          switch (action) {
            case 'info':
              makeReply(request, self.app.config);
              break;
            case 'exit':
              self.exit();
              $("body").get(0).style.cursor = 'default';
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
              var window = mensa.windowManager.createWindow(opts);
              mensa.registry.findComponentByName('desktop').appendChild(window);
              self.windows.push(window);
              makeReply(request, window.id);
              break;
            case 'show':
              var window = mensa.windowManager.findWindowById(payload);
              if (window) {
                window.show();
              }
              $('#' + payload).show();
              break;
            case 'hide':
              $('#' + payload).hide();
              break;
            case 'configure':
              var window = mensa.windowManager.findWindowById(payload.id);
              if (window) {
                window.configure(payload.styles);
              }

              break;
            case 'destroy':
              var window = mensa.windowManager.findWindowById(payload);
              if (window) {
                window.destroy();
              }
              break;
            case 'renderFrame':
              var window = mensa.windowManager.findWindowById(payload.id);
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