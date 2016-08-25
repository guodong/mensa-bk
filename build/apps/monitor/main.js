g_seq = 0;
g_callbacks = [];
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
  destroyWindow: function(wid) {
    var data = {
      seq: g_seq++,
      request: 'destroyWindow',
      payload: wid
    };
    postMessage(data);
  },
  showWindow: function(wid) {
    var data = {
      seq: g_seq++,
      request: 'showWindow',
      payload: wid
    };
    postMessage(data);
  },
  hideWindow: function(wid) {
    var data = {
      seq: g_seq++,
      request: 'hideWindow',
      payload: wid
    };
    postMessage(data);
  },
  configureWindow: function(opts) {
    var data = {
      seq: g_seq++,
      request: 'configureWindow',
      payload: opts
    };
    postMessage(data);
  }
};

onmessage = function(msg) {
  var seq = msg.data.seq;
  if (seq) {
    (g_callbacks[seq] || function() {})(msg.data.payload);
  }
}

Libmensa.createWindow({
  content: 'fff'
}, function(window) {
  window.on('move', function() {
    console.log('move');
  })
});