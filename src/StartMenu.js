import Component from './Component';
import $ from '../node_modules/jquery';

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
          comp.getDom().find('.notepad').click(function() {
            var url = $(this).attr('app-url');
            mensa.appManager.install(url, function(app) {
              app.run();
              mensa.registry.findComponentByName('startmenu').hide();
            });
          })
        }
      },
      template: `
      <div class="startpopup">
    <div class="applications">
        <ul>
            <li class="notepad" app-url="http://mensa-apps.cloudwarehub.com/Notepad"><a href="#"><img src="assets/notepad.jpg">Notepad</a></li>
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