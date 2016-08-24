import {Component} from './Component';
import Handlebars from '../../node_modules/handlebars/dist/handlebars';
import $ from '../../node_modules/jquery';

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
  constructor(props) {
    super(props);


    /**
     * parent window
     * @type {null}
     */
    this.parent = null;

    this.template = `
    <window class="{{className}} {{#unless styles.bare}}normal{{/unless}}" style="display: {{#if visible}}block{{else}}none{{/if}};position: {{styles.position}};width: {{size styles.width}};height: {{size styles.height}};left: {{size styles.x}};{{#exists styles.bottom}}bottom: {{size styles.bottom}};{{else}}top: {{size styles.y}};{{/exists}}z-index: {{styles.z}}">
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

  // /**
  //  * render window to the dom tree, window visibility is determined by visible property
  //  * @param parentDom
  //  */
  // render(parentDom) {
  //   if (!parentDom) {
  //     parentDom = $('body');
  //   }
  //   $(parentDom).append('<component id="'+this.id+'"></component>');
  //   var template = Handlebars.compile(this.template);
  //   var html = template(this);
  //
  //   for (var i in this.listeners) {
  //     this.getDom().on(i, this.listeners[i]);
  //   }
  //
  //   this.isRendered = true;
  // }

  toString() {
    this.render('comp')
    var template = Handlebars.compile(this.template);
    var html = template(this);
    return html;
  }
}