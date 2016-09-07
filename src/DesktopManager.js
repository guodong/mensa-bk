import Desktop from './Desktop';

var desktops = [];
export default class DesktopManager {
  createDesktop(name) {
    var desktop = new Desktop(name);
    desktops.push(desktop);
    desktop.show();
  }
}