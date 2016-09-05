import {Component} from './Component';

export class ContextMenuItem extends Component {
  constructor() {
    super({
      styles: {
          //backgroundColor:'#d4d0c8',
          font:'menutext',
          fontSize:'13px',
          border:'1 solid buttonface',
          paddingLeft:'30px'
      },
      name: 'contextmenuitem',
      className: 'contextmenuitem',
      tagName: 'li',
      template: `
        <a href="#" class={{props.item}} style="padding-left:3px; border-left:1px solid gray"> {{props.text}} </a>
        `
      }
    );

  }
}
