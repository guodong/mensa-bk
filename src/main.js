import {Desktop} from './components/Desktop';
import {ProcessManager} from './components/ProcessManager';
import './styles/main.less';


var desktop = new Desktop({});
desktop.show();

ProcessManager.run('http://localhost:8080/apps/monitor');