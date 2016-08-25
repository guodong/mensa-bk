import {Component} from './Component';
import {Icon} from './Icon';
export class IconList extends Component {
    constructor() {
        super({
            styles: {
                margin: '-15px 5 3 -30px',
                listStyle: 'none'
            },
            name: 'IconList',
            className: 'iconlist',
            tagName: 'ul'
        });
        var icon1 = new Icon();
        icon1.setProps({
            iconSrc: "assets/windows-7-ie-icon.png",
            iconName: "Internet Explore"
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
        this.appendChild(icon1);
        this.appendChild(icon2);
        this.appendChild(icon3);
        this.appendChild(icon1);
        this.appendChild(icon2);
        this.appendChild(icon3);
        this.appendChild(icon1);
        this.appendChild(icon2);
        this.appendChild(icon3);
        this.appendChild(icon1);
        this.appendChild(icon2);
        this.appendChild(icon3);
        this.appendChild(icon1);
        this.appendChild(icon2);
        this.appendChild(icon3);
        this.appendChild(icon1);
        this.appendChild(icon2);
        this.appendChild(icon3);

    }
}