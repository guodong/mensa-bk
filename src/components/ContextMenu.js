import Component from './../Component';
import {ContextMenuItem} from './ContextMenuItem';
import $ from '../../node_modules/jquery';

export class ContextMenu extends Component {
  constructor() {
    super({
      visible: false,
      styles: {
        listStyle: 'none',
        width: '160px',
        display: 'block',
        position: 'absolute',
        height: 'auto',
        border: '1px solid gray',
        backgroundColor: 'menu',
        lineHeight: '200%',
        fontFamily: 'Verdana'
      },
      listeners: {
        click: function(e) {
          // e.stopPropagation();
        }
      },
      name: 'contextmenu',
      className: 'contextmenu',
      tagName: 'ul'
    });

    var self = this;
    this.on('afterRender', function() {
      self.getDom().find('.close').on('click', function() {
        self.process.exit();
      });
      self.getDom().find('.open').on('click', function() {
        $("#" + self.iconId).dblclick();
      });
    })

  }


}

