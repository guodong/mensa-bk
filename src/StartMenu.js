import Component from './Component';
import $ from '../node_modules/jquery';
import {Deserializer} from '../node_modules/jsonapi-serializer';
import StartmenuItem from './components/StartmenuItem';

export default class StartMenu extends Component {
  constructor() {
    super({
      name: 'startmenu',
      className: 'startmenu',
      visible: false,
      props: {
        searchval: 'search cloudware!'
      },
      listeners: {
        afterRender: function(comp) {
          $.ajax({
            url: mensa.api + '/versions',
            success: function(payload) {
              var ds = new Deserializer;
              ds.deserialize(payload, function(err, data) {
                data.forEach(function(version) {
                  var item = new StartmenuItem(mensa.api + '/versions/' + version.id, {
                    props: {
                      name: version.cloudware.name,
                      logo: mensa.api + '/uploads/' + version.cloudware.logo
                    },
                    renderTo: comp.getDom().find('.applications ul')
                  });
                  item.show();
                });

              });

            }
          });
        }
      },
      template: `
      <div class="startpopup">
    <div class="applications">
        <ul id="app-list">
            
        </ul>
        
        <div class="search">
            <form action="">
            <input type="text" placeholder="Search programs and files">
            </form>
        </div>
	</div>
	
	<ul class="sysdir">
        <li class="user"><div class="frame" style="z-index: 43;">
          <div class="frame-inner" style="z-index: 9;">
            <img src="assets/logo_default_430x430.jpg" style="width: 35px;">
          </div>
        </div>
      </li>
        <li><a href="#"><span>Documents</span></a></li>
    </ul>
    </div>
      `
    });
    var self = this;
    //var contextmenu = Registry.findComponentByName('contextmenu');
    $(document).on('click', function(e) {
      if (!self.getDom().has(e.target).length && !mensa.registry.findComponentByName('startbtn').getDom().has(e.target).length) {
        self.hide();
      }
    })

  }
}