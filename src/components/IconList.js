import {Component} from './Component';
import {Icon} from './Icon';
export class IconList extends Component {
  constructor() {
    super({
      styles: {
        margin: '-15px 5 3 -30px',
        listStyle: 'none',
        position: 'absolute',
        left: '20px',
        top: '20px'
      },
      name: 'IconList',
      className: 'iconlist',
      tagName: 'ul'
    });
    var icon2 = new Icon();
    icon2.setProps({
      iconSrc: "assets/trash-icon.png",
      iconName: "回收站"
    });
    var icon3 = new Icon();
    icon3.setProps({
      iconSrc: "assets/windows-7-system-icon.png",
      iconName: "我的电脑"
    });
    this.appendChild(icon3);
    this.appendChild(icon2);

  }
}
