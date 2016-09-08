import $ from '../node_modules/jquery/dist/jquery';
import _uuid from '../node_modules/uuid/uuid';
import {App} from './App';
import Icon from './components/Icon';
import {Deserializer} from '../node_modules/jsonapi-serializer';

var apps = [];

function findAppByUrl(url) {
  for (var i in apps) {
    if (apps[i].url == url) {
      return apps[i];
    }
  }
  return null;
}

export default class AppManager {
  install(url, cb) {
    var app = findAppByUrl(url);
    if (app) {
      cb(app);
      return;
    }
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
      mensa.registry.findComponentByName('IconList').appendChild(icon);
      
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

  installCloudware(url, cb) {
    var app = findAppByUrl(url);
    if (app) {
      cb(app);
      return;
    }
    $.get(url).done((payload) => {
      var ds = new Deserializer;
      ds.deserialize(payload, function(err, data) {
        console.log(data);
        var uuid = _uuid.v4();
        var app = new App({
          id: uuid,
          type: 'cloudware',
          url: url,
          config: data
        });
        apps.push(app);

        /* add icon to desktop */
        var icon = new Icon();
        icon.setHandle(function() {
          app.run();
        });
        icon.setProps({
          iconSrc: mensa.api + '/uploads/' + data.cloudware.logo,
          iconName: data.cloudware.name
        });
        mensa.registry.findComponentByName('IconList').appendChild(icon);
        cb(app);
      })
    })
  }

  /**
   * run app, this is final entry to run app
   * @App app
   */
  run(app) {
    mensa.processManager.run(app);
  }
}