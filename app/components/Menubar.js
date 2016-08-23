import {Window} from './Window';

export class Menubar extends Window {
  constructor(props) {
    var startMenu = new Window({
      bare: true,
      x: 10,
      width: 40,
      height: 40,
      className: 'startMenu',
      content:'<img src="assets/windows_7_orb_icon_by_skyangels.png">'
    });
    
    var dateTime = new Window({
      bare: true,
      width: 70,
      height: '100%',
      className: 'dateTime',
      content: `
      <time>19:02</time>
      <date>2016/6/29</date>
      `,
      position: 'relative'
    });
    super({
      bare: true,
      width: '100%',
      height: 40,
      x: 0,
      bottom: 0,
      className: 'menubar',
      content: [startMenu, dateTime]
    });
  }
}