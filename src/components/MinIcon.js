/**
 * Created by zhangliqing on 16/8/24.
 */
import {Component} from './Component';

export class MinIcon extends Component {
  constructor() {
    super({
      styles: {
        height: '40px',
        width: '40px',
        float:'left',
        display: 'block',
        textAlign:'center'
      },
      name: 'MinIcon',
      className: 'minicon',
      tagName: 'li',
      template: `
  <a href="#">
      <img src={{props.iconSrc}} style="width:100%; height:35px" >
  </a>
        `
  });
  }
}