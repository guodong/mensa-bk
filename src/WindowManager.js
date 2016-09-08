import Window from './Window';

var windows = [];

export default class WindowManager {
  findWindowById(id) {
    for (var i in windows) {
      if (windows[i].id === id) {
        return windows[i];
      }
    }
    return null;
  }
  
  createWindow(opts) {
    var window = new Window(opts);
    windows.push(window);
    return window;
  }
}