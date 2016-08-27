/**
 * Created by zhangliqing on 16/8/24.
 */
import {Component} from './Component';

export class MinIcon extends Component {
  constructor({
    process = null
  } = {}) {
    super({
      styles: {
        height: '40px',
        maxWidth: '40px',
        float: 'left',
        display: 'block',
        textAlign: 'center'
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
    this.process = process;
    var self = this;
    this.addListener('click', () => {
      self.process.windows.forEach((window) => {
        window.unMinimize();
      })
    })
  }
}