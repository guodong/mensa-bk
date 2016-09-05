import {Window} from './Window';

var windows = [];

export class WindowManager {
  static findWindowById(id) {
    for (var i in windows) {
      if (windows[i].id === id) {
        return windows[i];
      }
    }
    return null;
  }
  
  static createWindow(opts) {
    var window = new Window(opts);
    windows.push(window);
    return window;
  }
}