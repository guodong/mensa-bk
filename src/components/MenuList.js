import {Component} from './Component';
import {MinIcon} from './MinIcon';
export class MenuList extends Component {
  constructor() {
    super({
      styles: {
        listStyle: 'none',
        float:'left',
        marginLeft:'20px'
      },
      name: 'MenuList',
      className: 'menulist',
      tagName: 'ul'
    });
    var minicon1 = new MinIcon();
    minicon1.setProps({
      iconSrc: "assets/windows-7-ie-icon.png",
    });
    var minicon2 = new MinIcon();
    minicon2.setProps({
      iconSrc: "assets/trash-icon.png",
    });
    var minicon3 = new MinIcon();
    minicon3.setProps({
      iconSrc: "assets/windows-7-system-icon.png",
    });
    this.appendChild(minicon1);
    this.appendChild(minicon2);
    this.appendChild(minicon3);
    this.appendChild(minicon1);
    this.appendChild(minicon2);
    this.appendChild(minicon3);
    this.appendChild(minicon1);
    this.appendChild(minicon2);
    this.appendChild(minicon3);
    this.appendChild(minicon1);
    this.appendChild(minicon2);
    this.appendChild(minicon3);
    this.appendChild(minicon1);
    this.appendChild(minicon2);
    this.appendChild(minicon3);
    this.appendChild(minicon1);
    this.appendChild(minicon2);
    this.appendChild(minicon3);
    this.appendChild(minicon2);
    this.appendChild(minicon3);
    this.appendChild(minicon1);
    this.appendChild(minicon2);
    this.appendChild(minicon3);
    this.appendChild(minicon1);
    this.appendChild(minicon2);
    this.appendChild(minicon3);
    this.appendChild(minicon1);
    this.appendChild(minicon2);
    this.appendChild(minicon2);


  }
  appendChild(child, parentTag) {
    this.children.push(child);
    child.parent = this;
    child.parentTag = parentTag;
    var MenuListWidth=window.screen.availWidth-500;
    var iconWidth=MenuListWidth/this.children.length;
    for(let child of this.children){
        child.addStyles({width:iconWidth+'px'});
    }
    /* if parent is already rendered, render this comp */
    if (this.isRendered) {
      child.render(this.getDom());
    }
  }
}

