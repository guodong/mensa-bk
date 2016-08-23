import {Desktop} from './components/Desktop';
import {Menubar} from './components/Menubar';
import './styles/main.less';


var desktop = new Desktop({
  background: 'url(assets/windows7-bg.jpg)'
});
desktop.show();

var menubar = new Menubar();
menubar.show();