import {Desktop} from './components/Desktop';
import {AppManager} from './components/AppManager';
import {Cloudware} from './components/Cloudware';
import './styles/main.less';


var desktop = new Desktop({});
desktop.show();

// ProcessManager.run('http://localhost:8080/apps/monitor');
AppManager.install('/apps/About');
//AppManager.install('http://localhost:8082/Notepad');