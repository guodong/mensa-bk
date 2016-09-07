/**
 * Created by zhangliqing on 16/8/24.
 */
import Component from './../Component';
import {ContextMenu} from './ContextMenu';
import {ContextMenuItem} from './ContextMenuItem';
import Registry from './../Registry';
import $ from '../../node_modules/jquery';
export default class MinIcon extends Component {
  constructor({
    process = null
  } = {}) {
    super({
      styles: {
        height: '40px',
        maxWidth: '40px',
        float: 'left',
        display: 'block',
        textAlign: 'center'
      },
      name: 'MinIcon',
      className: 'minicon',
      tagName: 'li',
      template: `
      <a href="#">
          <img src={{props.iconSrc}} style="width:100%; height:35px" >
      </a>
        `
    });

    this.process = process;
    var self = this;
    this.addListener('click', () => {
      self.process.windows.forEach((window) => {
        window.unMinimize();
      })
    });


    var CM = new ContextMenu();
    CM.process = process;
    var desktop = mensa.registry.findComponentByName('desktop');
    $(document).on('contextmenu', function(e) {
      var iconId = e.target.parentNode.id === null ? e.target.parentNode.id : e.target.parentNode.parentNode.id;
      CM.iconId = iconId;

      var contextmenu = mensa.registry.findComponentByName('contextmenu');
      contextmenu.getDom().remove();
      CM.constructor();

      if (e.target.tagName === 'DESKTOP') {
        var CMI = new ContextMenuItem();
        CMI.setProps({item: "", text: "default"});
        CM.appendChild(CMI);
        desktop.appendChild(CM);
        CM.getDom().css({left: e.clientX + 'px', bottom: ($(window).height() - e.clientY) + 'px'});
        CM.show();
      }
      if ((e.target.tagName === 'A' || e.target.tagName === 'IMG') && $(window).height() - e.clientY > 40) {
        var CMI1 = new ContextMenuItem();
        CMI1.setProps({item: "open", text: "打开(O)"});
        CM.appendChild(CMI1);
        desktop.appendChild(CM);
        CM.getDom().css({left: (10 + e.clientX) + 'px', bottom: ($(window).height() - e.clientY) + 'px'});
        CM.show();
      }
      if ((e.target.tagName === 'A' || e.target.tagName === 'IMG') && $(window).height() - e.clientY <= 40) {
        var CMI1 = new ContextMenuItem();
        CMI1.setProps({item: "close", text: "关闭(C)"});
        CM.appendChild(CMI1);
        desktop.appendChild(CM);
        CM.getDom().css({left: e.clientX + 'px', bottom: '40px'});
        CM.show();
      }
    })

    var contextmenu = mensa.registry.findComponentByName('contextmenu');
    $(document).on('click', function() {
      $('.contextmenu').hide();
    })


  }
}