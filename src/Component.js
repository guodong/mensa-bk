import Util from './Util';
import $ from '../node_modules/jquery';
import Handlebars from '../node_modules/handlebars/dist/handlebars';
import Base from './Base';

function addStyleUnit(styles) {
  var out = {};
  for (var i in styles) {
    if (-1 !== $.inArray(i, ['top', 'left', 'width', 'height'])) {
      if (typeof styles[i] === 'number') {
        out[i] = styles[i] + 'px';
      } else {
        out[i] = styles[i];
      }
    } else {
      out[i] = styles[i];
    }

  }
  return out;
}

function getTopWindow() {
  var top = null;
  var zMax = 0;
  var comps = mensa.registry.getComponents();
  for (var i in comps) {
    if (comps[i].visible == false || comps[i].isRendered == false) {
      continue;
    }
    var z = parseInt(comps[i].getDom().css('z-index'), 10);
    if (zMax < z) {
      zMax = z;
      top = comps[i];
    }
  }
  return top;
}

export default class Component extends Base {
  constructor({
    visible = true,
    draggable = true,
    resizeable = true,
    className = '',
    bottom = undefined,
    listeners = {},
    template = '',
    tagName = 'component',
    styles = {},
    parent = null,
    parentTag = '',
    name = '',
    props = {},
    renderTo = null
    } = {}) {
    super({
      listeners: listeners
    });
    this.id = '__comp__' + Util.generateId();
    mensa.registry.register(this);
    this.template = template;

    this.visible = visible;
    this.draggable = draggable;
    this.resizeable = resizeable;
    this.className = className;
    this.tagName = tagName;
    this.styles = styles;
    this.parent = parent;
    this.parentTag = parentTag;
    this.name = name;
    this.props = props;
    this.renderTo = renderTo;

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

  setParent(parent) {
    this.parent = parent;
    parent.children.push(this);
    return this;
  }
  
  setStyles(styles) {
    this.styles = styles;
  }

  addStyles(styles) {
    Object.assign(this.styles, styles);
  }
  
  addListener(eventName, handle) {
    this.listeners[eventName] = handle;
    if (this.isRendered) {
      this.getDom().on(eventName, handle);
    }
    return this;
  }

  appendChild(child, parentTag) {
    this.children.push(child);
    child.parent = this;
    child.parentTag = parentTag;

    /* if parent is already rendered, render this comp */
    if (this.isRendered) {
      child.render(this.getDom());
    }
  }

  render(parentDom) {
    if (this.isRendered) {
      return;
    }
    if (!parentDom) {
      parentDom = this.renderTo ? this.renderTo : $('body');
    }
    /* create dom */
    var dom = document.createElement(this.tagName);
    dom.setAttribute('id', this.id);
    dom.setAttribute('class', this.className);

    /* set styles */
    var sts = addStyleUnit(this.styles);
    Object.assign(dom.style, sts);

    /* compile template */
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
    if (!this.visible) {
      this.hide();
    }
    this.fire('afterRender');
  }

  show(parentDom) {
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
  
  removeChild(comp) {
    for (var i in this.children) {
      if (comp === this.children[i]) {
        this.children.splice(i, 1);
        return;
      }
    }
  }
  
  destroy() {
    (this.listeners['beforeDestroy'] || function(){})();
    this.getDom().remove();
    if (this.parent)
      this.parent.removeChild(this);
    mensa.registry.unregister(this);
    delete this;
    (this.listeners['afterDestroy'] || function(){})();

  }

  toggle() {
    this.visible ? this.hide() : this.show();
  }

  setProps(props) {
    this.props = props;
    return this;
  }

}