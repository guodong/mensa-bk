import Util from './Util';
import $ from '../../node_modules/jquery';
import Handlebars from '../../node_modules/handlebars/dist/handlebars';
import Registry from './Registry'

export class Component {
  constructor({
  /**
   * window width, px or %
   */
    width = 'auto',

  /**
   * window height, px or %
   */
    height = 'auto',

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
    position = 'absolute',
    background = '',
    content = [],
    draggable = true,
    resizeable = true,
    title = 'No title',
    className = '',
    bottom = undefined,
    listeners = {},
    visible = true,
    template = '',
    tagName = 'component',
    styles = {},
    parent = null,
    parentTag = '',
    name = '',
    props = {},
    afterRender = function () {

    }
    } = {}) {
    this.id = '__comp__' + Util.generateId();
    Registry.register(this);
    this.width = width;
    this.height = height;
    this.template = template;

    this.visible = visible;
    this.draggable = draggable;
    this.resizeable = resizeable;
    this.content = content;
    this.title = title;
    this.className = className;
    this.listeners = listeners;
    this.tagName = tagName;
    this.styles = styles;
    this.parent = parent;
    this.parentTag = parentTag;
    this.name = name;
    this.props = props;
    this.afterRender = afterRender;

    this.isRendered = false;

    /**
     * children windows
     * @type {Array}
     */
    this.children = [];
  }

  getDom() {
    return $('#' + this.id);
  }

  setWidth(width) {
    this.width = width;
    if (this.isRendered) {
      this.getDom().css('width', width);
    }
    return this;
  }

  setHeight(height) {
    this.height = height;
    if (this.isRendered) {
      this.getDom().css('height', height);
    }
    return this;
  }

  setLeft(x) {
    this.left = x;
    if (this.isRendered) {
      this.getDom().css('left', x);
    }
    return this;
  }

  setTop(y) {
    this.top = y;
    if (this.isRendered) {
      this.getDom().css('top', y);
    }
    return this;
  }

  setZindex(z) {
    this.zindex = z;
    if (this.isRendered) {
      this.getDom().css('zIndex', z);
    }
    return this;
  }

  setParent(parent) {
    this.parent = parent;
    parent.children.push(this);
    return this;
  }

  appendChild(child, parentTag) {
    this.children.push(child);
    child.parent = this;
    child.parentTag = parentTag;
  }

  render(parentDom) {
    if (!parentDom) {
      parentDom = $('body');
    }
    var dom = document.createElement(this.tagName);
    dom.setAttribute('id', this.id);
    dom.setAttribute('class', this.className);
    if (!this.visible) {
      this.styles.display = 'none';
    }
    Object.assign(dom.style, this.styles);
    var template = Handlebars.compile(this.template);
    var html = template(this);
    dom.innerHTML = html;
    if (this.parentTag) {
      $(parentDom).find(this.parentTag).append(dom);
    } else {
      $(parentDom).append(dom);
    }
    var self = this;
    this.children.map(function (child) {
      child.render(self.getDom());
    });
    for (var i in this.listeners) {
      this.getDom().on(i, this.listeners[i]);
    }
    this.isRendered = true;
    this.afterRender(this);
  }

  show(parentDom) {
    if (!parentDom) {
      parentDom = $('body');
    }
    if (!this.isRendered) {
      this.render(parentDom);
    }
    this.getDom().show();
    this.visible = true;
  }

  hide() {
    this.getDom().hide();
    this.visible = false;
  }

  toggle() {
    this.visible ? this.hide() : this.show();
  }

  setProps(props) {
    this.props = props;
    return this;
  }

}