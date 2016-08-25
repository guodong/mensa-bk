import {Component} from './Component';
import Registry from './Registry';

export class Menubar extends Component {
  constructor() {

    super({
      styles: {
        width: '100%',
        height: '41px',
        left: 0,
        bottom: 0,
        zIndex: 999,
        display: 'block',
        position: 'absolute',
        backgroundColor: '#619bb9',
        background: 'linear-gradient(65deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9))',
        borderTop: '1px solid rgba(0, 0, 0, 0.5)',
        boxShadow: 'inset 0 1px 0px rgba(255, 255, 255, 0.4)'
      },
      template: `
      <datetime style="display: block;float: right;"></datetime>
      `
    });

    var startBtn = new Component({
      name: 'startbtn',
      template: '<img src="assets/win7-start-btn.png" style="display: block;"/>',
      styles: {
        marginLeft: '5px',
        display: 'block',
        width: '40px'
      },
      listeners: {
        click() {
          Registry.findComponentByName('startmenu').toggle();
        }
      }
    });
    this.appendChild(startBtn);

    var datetime = new Component({
      styles: {
        width: '70px',
        display: 'block',
        float: 'right',
        color: 'white',
        textAlign: 'center',
        padding: '5px'
      },
      template: '<div>15:44</div><div>2016/8/28</div>'
    });
    this.appendChild(datetime, 'datetime');
  }
}