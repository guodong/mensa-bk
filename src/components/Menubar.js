import {Component} from './Component';
import {Registry} from './Registry';
import {MenuList} from './MenuList';
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
        width: '40px',
        float:'left'
      },
      listeners: {
        click() {
          Registry.findComponentByName('startmenu').toggle();
        }
      }
    });
    this.appendChild(startBtn);

    var menuList=new MenuList();
    this.appendChild(menuList);

    var datetime = new Component({
      styles: {
        width: '70px',
        display: 'block',
        float: 'right',
        color: 'white',
        textAlign: 'center',
        padding: '5px'
      },
      template: '<div class="time"></div><div class="date"></div>'

    });

    function startTime(){
      var m = new Date();
      var dateString = m.getFullYear() + "/" + ("0" + (m.getMonth() + 1)).slice(-2) + "/" + ("0" + m.getDate()).slice(-2);
      var timeString = ("0" + m.getHours()).slice(-2) + ":" + ("0" + m.getMinutes()).slice(-2) + ":" + ("0" + m.getSeconds()).slice(-2);
      datetime.getDom().find('.time').html(timeString);
      datetime.getDom().find('.date').html(dateString);
    }
    startTime();
    var t = setInterval(startTime, 1000);
    this.appendChild(datetime, 'datetime');


  }
}