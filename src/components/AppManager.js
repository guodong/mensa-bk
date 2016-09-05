import $ from '../../node_modules/jquery/dist/jquery';
import _uuid from '../../node_modules/uuid/uuid';
import {App} from './App';
import {ProcessManager} from './ProcessManager';
import {Icon} from './Icon';
import {Registry} from './Registry';

var apps = [];

export class AppManager {
  static install(url, cb) {
    $.getJSON(url + '/mensa.json').fail(() => {
      cb({errno: 1, msg: 'no such app'});
    }).done((appconfig) => {
      var uuid = _uuid.v4();
      var app = new App({
        id: uuid,
        url: url,
        config: appconfig
      });
      apps.push(app);
      
      /* add icon to desktop */
      var icon = new Icon();
      icon.setHandle(function() {
        app.run();
      });
      icon.setProps({
        iconSrc: url + '/icon.png',
        iconName: appconfig.name
      });
      Registry.findComponentByName('IconList').appendChild(icon);
      
      /**
       * equals to:
       * if (cb) {
          cb(app);
        } else {
          function(app){}
        }

       () => {} equals to function(){}
       */
      (cb || (() => {}))(app);
      
    });
  }

  /**
   * run app, this is final entry to run app
   * @App app
   */
  static run(app) {
    ProcessManager.run(app);
  }
}