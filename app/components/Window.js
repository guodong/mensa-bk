import {Component} from './Component';
import Handlebars from '../../node_modules/handlebars/dist/handlebars';
import $ from '../../node_modules/jquery';
import interact from '../../node_modules/interact.js/interact'

Handlebars.registerHelper('size', function(size) {
  if (size === 'auto') {
    return 'auto';
  }
  var val = size + '';
  if (-1 === val.indexOf('%')) {
    return val + 'px';
  }
  return val;
});

Handlebars.registerHelper('exists', function(variable, options) {
  if (typeof variable !== 'undefined') {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});


export class Window extends Component {
  constructor({
    title = 'New Window',
    bare = false,
    styles = {},
    content = ''
  } = {}) {
    super({
      tagName: 'window',
      styles: styles,
      afterRender: function(comp) {
        interact('#' + comp.id + ' top').draggable({
          onmove: function(event) {
            var target = event.target.parentNode.parentNode.parentNode, x = (parseFloat(target.style.left) || 0) + event.dx, y = (parseFloat(target.style.top) || 0) + event.dy;
            target.style.left = x + 'px';
            target.style.top = y + 'px';

          },
        });
        interact('#' + comp.id).resizable({
          edges: {
            left: true,
            right: true,
            bottom: true,
            top: false
          }
        }).on('resizemove', function(event) {
          var target = event.target, x = (parseFloat(target.getAttribute('data-resize-x')) || 0), y = (parseFloat(target.getAttribute('data-resize-y')) || 0);

          // update the element's style
          target.style.width = event.rect.width + 'px';
          target.style.height = event.rect.height + 'px';

          self.width = event.rect.width;
          self.height = event.rect.height;

          // translate when resizing from top or left edges
          x += event.deltaRect.left;
          y += event.deltaRect.top;

          target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px,' + y + 'px)';

          target.setAttribute('data-resize-x', x);
          target.setAttribute('data-resize-y', y);
        });
      }
    });
    this.title = title;
    this.bare = bare;
    this.content = content;

    this.template = `
        {{#unless bare}}
        <resize></resize>
        <window-layout>
        <top-row>
          <top>
          <buttons>
              <maximize></maximize>
              <close></close>
          </buttons>
          <title>{{title}}</title>
        </top>
        </top-row>
        {{/unless}}
        <content-row>
          <content>{{{content}}}</content>
        </content-row>
        </window-layout>
        
    `;
  }


  setBackground(bg) {
    this.styles.background = bg;
    return this;
  }

  setTitle(title) {
    this.title = title;
    return this;
  }

  setBare(bare) {
    this.styles.bare = !!bare;
    return this;
  }

  setBottom(val) {
    this.styles.bottom = val;
    return this;
  }

  appendContent(child) {
    this.content.push(child);
    return this;
  }

  setTemplate(tpl) {
    this.template = tpl;
    return this;
  }

  setContent(content) {
    this.content = content;
    return this;
  }

  toString() {
    this.render('comp')
    var template = Handlebars.compile(this.template);
    var html = template(this);
    return html;
  }
}