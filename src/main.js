import './styles/main.less';
import Registry from './Registry';
import ProcessManager from './ProcessManager';
import AppManager from './AppManager';
import DesktopManager from './DesktopManager';
import WindowManager from './WindowManager';
import Login from './components/Login';
import Mask from './components/Mask';

class Mensa {
  constructor() {
    this.version = 'v0.0.1';
    this.api = 'https://apiv2.cloudwarehub.com';
    this.config = {
      defaultApps: [
        'About'
      ]
    }
  }

  boot() {
    var me = this;
    this.registry = new Registry();
    this.appManager = new AppManager();
    this.processManager = new ProcessManager();
    this.desktopManager = new DesktopManager();
    this.windowManager = new WindowManager();
    // this.loginUi = new Login();
    // this.loginUi.show();
    this.desktopManager.createDesktop('desktop');


    this.config.defaultApps.forEach(function(appName) {
      me.appManager.install('apps/' + appName, function(app) {
        //app.run();
      });
    });
  }
}

/**
 * mensa global entry
 * Don't worry, be happy
 */
var mensa = new Mensa();
window.mensa = mensa;
mensa.boot();


//var desktop = new Desktop({});
//desktop.show();

// ProcessManager.run('http://localhost:8080/apps/monitor');
//AppManager.install('/apps/About');
//AppManager.install('http://localhost:8082/Notepad');
