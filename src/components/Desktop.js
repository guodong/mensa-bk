import {Component} from './Component';
import {Window} from './Window';
import {Menubar} from './Menubar';
import {StartMenu} from './StartMenu';
import {IconList} from './IconList';
import {AppManager} from './AppManager';

export class Desktop extends Component {
  constructor(props) {
    super({
      name: 'desktop',
      tagName: 'desktop',
      styles: {
        width: '100%',
        height: '100%',
        background: 'url(assets/windows7-bg.jpg)',
        backgroundSize: 'cover',
        display: 'block'
      },
   
    });
    var menubar = new Menubar();
    this.appendChild(menubar);
    
    var startmenu = new StartMenu();
    this.appendChild(startmenu);

    var iconlist = new IconList();
    this.appendChild(iconlist);

    AppManager.install('http://localhost:8082/About');
    AppManager.install('http://localhost:8082/My');
    AppManager.install('http://localhost:8082/Admin');
  }


}