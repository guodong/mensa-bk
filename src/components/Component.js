import Util from './Util';
import $ from '../../node_modules/jquery';
import Handlebars from '../../node_modules/handlebars/dist/handlebars';
import {Registry} from './Registry';

function addStyleUnit(styles) {
  var out = {};
  for (var i in styles) {
    if (-1 !== $.inArray(i, ['top', 'left', 'width', 'height'])) {
      if ((-1 === (styles[i]+'').indexOf('px')) && (-1 === (styles[i]+'').indexOf('%'))) {
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
  var comps = Registry.getComponents();
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

export class Component {
  constructor({

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
    this.template = template;

    this.visible = visible;
    this.draggable = draggable;
    this.resizeable = resizeable;
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
      parentDom = $('body');
    }
    var dom = document.createElement(this.tagName);
    dom.setAttribute('id', this.id);
    dom.setAttribute('class', this.className);
    if (!this.visible) {
      this.styles.display = 'none';
    }
    var sts = addStyleUnit(this.styles);
    Object.assign(dom.style, sts);
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

  setActive() {
    $(this.tagName + '.active').removeClass('active');
    this.getDom().addClass('active');
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
    var topWindow = getTopWindow();
    if (topWindow) {
      topWindow.setActive();
    }
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
    Registry.unregister(this);
    delete this;
    (this.listeners['afterDestroy'] || function(){})();

    var topWindow = getTopWindow();
    if (topWindow) {
      topWindow.setActive();
    }
  }

  toggle() {
    this.visible ? this.hide() : this.show();
  }

  setProps(props) {
    this.props = props;
    return this;
  }

}