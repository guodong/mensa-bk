import {Component} from './Component';
import {Registry} from './Registry';
import $ from '../../node_modules/jquery';

export class StartMenu extends Component {
  constructor() {
    super({
      name: 'startmenu',
      className: 'startmenu',
      visible: false,
      props: {
        searchval: 'search cloudware!'
      },
      listeners: {
        click: function(e) {
          // e.stopPropagation();
        }
      },
      template: `
      <div class="startpopup">
    <div class="applications">
        <ul>
            <li><a href="#"><img src="assets/paint.jpg" alt="">Paint</a></li>
        </ul>
        
        <div class="search">
            <form action="">
            <input type="text" value="{{props.searchval}}" placeholder="Search programs and files">
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
        <li><a href="#"><span>Pictures</span></a></li>
        <li><a href="#"><span>Music</span></a></li>
        <li><a href="#"><span>Computer</span></a></li>
        <li><a href="#"><span>Network</span></a></li>
        <li><a href="#"><span>Connect to</span></a></li>
    </ul>
    </div>
      `
    });
    var self = this;
    //var contextmenu = Registry.findComponentByName('contextmenu');
    $(document).on('click', function(e) {
      if (!self.getDom().has(e.target).length && !Registry.findComponentByName('startbtn').getDom().has(e.target).length) {
        self.hide();
      }
    //  $('.contextmenu').hide();
    //  $('.contextmenu').destroy();
    })

  }
}