var Libmensa;
(function() {
  g_seq = 0;
  g_callbacks = [];
  var g_windows = [];

  function Window(id) {
    this.id = id;
    this.listeners = {};
  }

  function findWindow(id) {
    for (var i in g_windows) {
      if (g_windows[i].id == id) {
        return g_windows[i];
      }
    }
    return null;
  }

  Window.prototype = {
    on: function(eventName, handle) {
      this.listeners[eventName] = handle;
    },
    fire: function(eventName) {
      (this.listeners[eventName] || function() {
      })();
    },
    show: function() {
      var data = {
        seq: g_seq++,
        request: 'showWindow',
        payload: this.id
      };
      postMessage(data);
    },
    destroy: function() {
      var data = {
        seq: g_seq++,
        request: 'destroyWindow',
        payload: this.id
      };
      postMessage(data);
    },
    hide: function() {
      var data = {
        seq: g_seq++,
        request: 'hideWindow',
        payload: this.id
      };
      postMessage(data);
    },
    configure: function(opts) {
      var data = {
        seq: g_seq++,
        request: 'configureWindow',
        payload: opts
      };
      postMessage(data);
    },
  };

  Libmensa = {
    createWindow: function(opts, cb) {
      opts = opts || {};
      var seq = g_seq++;
      var data = {
        seq: seq,
        request: 'createWindow',
        payload: opts
      };
      if (cb) {
        g_callbacks[seq] = cb;
      }
      postMessage(data);
    },
    exit: function() {
      var data = {
        seq: g_seq++,
        request: 'exit'
      };
      postMessage(data);
    },

    onmessage: function(msg) {
      var seq = msg.data.seq;
      if (seq !== undefined) {
        var param = msg.data.payload;
        if (msg.data.reply === 'createWindow') {
          var window = new Window(msg.data.payload);
          g_windows.push(window);
          param = window;
        }
        (g_callbacks[seq] || function() {
        })(param);
      }
      if (msg.data.msg === 'destroy') {
        var window = findWindow(msg.data.payload);
        if (window)
          window.fire('destroy');
      }
    }
  };
})();

onmessage = function(msg) {
  onmessage = Libmensa.onmessage;
  importScripts(msg.data);
};
