import {Component} from './Component';
import Handlebars from '../../node_modules/handlebars/dist/handlebars';
import $ from '../../node_modules/jquery';

Handlebars.registerHelper('size', function(size) {
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
    /**
     * window width, px or %
     */
    width = 300,
    
    /**
     * window height, px or %
     */
    height = 200,

    /**
     * window x coordinate in px
     */
    x = 0,

    /**
     * window y coordinate in px
     */
    y = 0,

    /**
     * window z order
     */
    z = 0,

    /**
     * whether to show top and border, if bare then not show
     */
    bare = false,
    position = 'absolute',
    background = '',
    content = '',
    draggable = true,
    resizeable = true,
    title = 'No title',
    className = '',
    bottom = undefined
  }) {
    super();
    this.styles = {
      width: width,
      height: height,
      x: x,
      y: y,
      z: z,
      bare: bare,
      background: background,
      bottom: bottom,
      position: position
    }
    this.draggable = draggable;
    this.resizeable = resizeable;
    this.content = content;
    this.title = title;
    this.className = className;

    this.isRendered = false;
    /**
     * template string
     * @type {string}
     */
    this.template = '';

    /**
     * children windows
     * @type {Array}
     */
    this.children = [];

    /**
     * parent window
     * @type {null}
     */
    this.parent = null;

    this.template = `
    <window id="{{id}}" class="{{className}} {{#unless styles.bare}}normal{{/unless}}" style="position: {{styles.position}};width: {{size styles.width}};height: {{size styles.height}};left: {{size styles.x}};{{#exists styles.bottom}}bottom: {{size styles.bottom}};{{else}}top: {{size styles.y}};{{/exists}}z-index: {{styles.z}}">
        {{#unless styles.bare}}<top>
        <buttons>
            <maximize></maximize>
            <close></close>
        </buttons>
        <title>{{title}}</title>
        </top>
        {{/unless}}
        <content style="background: {{styles.background}};background-size: cover">{{{content}}}</content>
    </window>
    `;
  }

  getDom() {
    return $('#' + this.id);
  }

  setWidth(width) {
    this.styles.width = width;
    if (this.isRendered) {
      this.getDom().css('width', width);
    }
    return this;
  }

  setHeight(height) {
    this.styles.height = height;
    if (this.isRendered) {
      this.getDom().css('height', height);
    }
    return this;
  }

  setX(x) {
    this.styles.x = x;
    if (this.isRendered) {
      this.getDom().css('left', x);
    }
    return this;
  }

  setY(y) {
    this.styles.y = y;
    if (this.isRendered) {
      this.getDom().css('top', y);
    }
    return this;
  }

  setZ(z) {
    this.styles.z = z;
    if (this.isRendered) {
      this.getDom().css('zIndex', z);
    }
    return this;
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

  setParent(parent) {
    this.parent = parent;
    return this;
  }
  setBottom(val) {
    this.styles.bottom = val;
    return this;
  }

  render(parentDom) {
    this.isRendered = true;
    var template = Handlebars.compile(this.template);
    var html = template(this);

    parentDom.append(html);
    this.isRendered = true;
  }


  show(parentDom) {
    if (!parentDom) {
      parentDom = $('body');
    }
    if (!this.isRendered) {
      this.render(parentDom);
    }
    this.getDom().show();
  }

  hide() {
    this.getDom().hide();
  }

  toString() {
    var template = Handlebars.compile(this.template);
    var html = template(this);
    return html;
  }
}