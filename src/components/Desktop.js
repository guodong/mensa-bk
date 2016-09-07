import {Component} from './../Component';
import {Window} from './../Window';
import {Menubar} from './../Taskbar';
import {StartMenu} from './../StartMenu';
import {IconList} from './IconList';
import {Registry} from './../Registry';
import $ from '../../node_modules/jquery';
import {ContextMenuItem} from './ContextMenuItem';


function getActiveWindow() {
  var id = $('window.active').attr('id');
  if (!id) {
    return null;
  }
  return Registry.findComponentById(id);
}

export class Desktop extends Component {
  constructor(props) {
    super({
      name: 'desktop',
      tagName: 'desktop',
      styles: {
        width: '100%',
        height: '100%',
        background: 'url(assets/windows7-bg.jpg)',
        backgroundSize: 'cover',
        display: 'block'
      },
      template: ``,
      afterRender: function() {
        $(document).on('mousemove', function(e) {
          var window = getActiveWindow();
          if (!window) {
            return;
          }
          window.process.worker.postMessage({
            msg: 'mousemove',
            payload: {
              id: self.id,
              x: e.pageX,
              y: e.pageY
            }
          })
        });
        $(document).on('mousedown', function(e) {
          var window = getActiveWindow();
          if (!window) {
            return;
          }
          window.process.worker.postMessage({
            msg: 'mousedown',
            payload: {
              code: e.which
            }
          })
        });
        $(document).on('mouseup', function(e) {
          var window = getActiveWindow();
          if (!window) {
            return;
          }
          window.process.worker.postMessage({
            msg: 'mouseup',
            payload: {
              code: e.which
            }
          })
        });
        $(document).on('keydown', function(e) {
          var window = getActiveWindow();
          if (!window) {
            return;
          }
          window.process.worker.postMessage({
            msg: 'keydown',
            payload: {
              code: e.which
            }
          })
        });
        $(document).on('keyup', function(e) {
          var window = getActiveWindow();
          if (!window) {
            return;
          }
          window.process.worker.postMessage({
            msg: 'keyup',
            payload: {
              code: e.which
            }
          })
        });
      }
    });
    var menubar = new Menubar();
    this.appendChild(menubar);
    
    var startmenu = new StartMenu();
    this.appendChild(startmenu);

    var iconlist = new IconList();
    this.appendChild(iconlist);

  }
}
