import Component from './Component';
import Taskbar from './Taskbar';
import Startmenu from './StartMenu';
import IconList from './components/IconList';
import $ from '../node_modules/jquery/dist/jquery';

function getActiveWindow() {
  var id = $('window.active').attr('id');
  if (!id) {
    return null;
  }
  return mensa.registry.findComponentById(id);
}

export default class Desktop extends Component {
  constructor(name) {
    name = name || 'desktop';
    super({
      name: name,
      styles: {
        width: '100%',
        height: '100%',
        background: 'url(assets/windows7-bg.jpg)',
        backgroundSize: 'cover',
      },
      listeners: {
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
      }
    });
    this.taskbar = new Taskbar();
    this.startmenu = new Startmenu();
    this.iconList = new IconList();
  }

  render() {
    super.render();
    this.taskbar.render(this.getDom());
    this.startmenu.render(this.getDom());
    this.iconList.render(this.getDom());
  }
}