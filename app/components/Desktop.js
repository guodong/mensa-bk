import {Window} from './Window';
import {Menubar} from './Menubar';

export class Desktop extends Window {
  constructor(props) {
    var menubar = new Menubar();
    
    super(props);
    this.setBare(true);
    this.setX(0);
    this.setY(0);
    this.setWidth('100%');
    this.setHeight('100%');
    this.appendContent(menubar);
  }
  
  
}