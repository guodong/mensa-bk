import {Component} from './Component';
import {Window} from './Window';
import {Menubar} from './Menubar';
import {StartMenu} from './StartMenu';

export class Desktop extends Component {
  constructor(props) {
    super({
      tagName: 'desktop',
      styles: {
        width: '100%',
        height: '100%',
        background: 'url(assets/windows7-bg.jpg)',
        backgroundSize: 'cover',
        display: 'block'
      }
    });
    var menubar = new Menubar();
    this.appendChild(menubar);
    
    var startmenu = new StartMenu();
    this.appendChild(startmenu);
    
    var window = new Window({
      title: 'test',
      styles: {
        width: '300px',
        height: '200px'
      },
      content: '123'
    });
    
    this.appendChild(window);
  }
  
  
}