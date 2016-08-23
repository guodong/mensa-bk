import {Desktop} from './components/Desktop';
import {Menubar} from './components/Menubar';
import './styles/main.less';

var menubar = new Menubar();

var desktop = new Desktop({
  background: 'url(assets/windows7-bg.jpg)',
  content: [menubar]
});
desktop.show();

//menubar.show();