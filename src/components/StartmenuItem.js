import Component from '../Component';
import $ from '../../node_modules/jquery';

export default class StartmenuItem extends Component{
  
  constructor(appUrl, ...args) {
    super(...args);
    this.appUrl = appUrl;
    this.tagName = 'li';
    this.template = '<a href="#"><img src="{{props.logo}}" alt="">{{props.name}}</a>';
    this.listeners = {
      afterRender(me) {
        me.getDom().click(function() {
          mensa.appManager.installCloudware(me.appUrl, function(app) {
            app.run();
            mensa.registry.findComponentByName('startmenu').hide();
          });
        });
      }
    }
  }
}