import {Component} from './Component';

export class StartMenu extends Component {
  constructor() {
    super({
      name: 'startmenu',
      className: 'startmenu',
      visible: false,
      template: `
      <div class="startpopup">
    <div class="applications">
        <ul>
            <li><a href="#"><img src="assets/paint.jpg" alt="">Paint</a></li>
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
        <li><a href="#"><span>Pictures</span></a></li>
        <li><a href="#"><span>Music</span></a></li>
        <li><a href="#"><span>Computer</span></a></li>
        <li><a href="#"><span>Network</span></a></li>
        <li><a href="#"><span>Connect to</span></a></li>
    </ul>
    </div>
      `
    });
  }
}