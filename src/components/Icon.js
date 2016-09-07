/**
 * Created by zhangliqing on 16/8/24.
 */
import Component from './../Component';

export default class Icon extends Component {
  constructor() {
    super({
      styles: {
        height: '90px',
        width: '70px',
        marginLeft: '20px',
        float: 'left'
      },
      name: 'Icon',
      className: 'icon',
      tagName: 'li',
      template: `
        <a href="#">
            <img src={{props.iconSrc}} style="height: 48px;" ><br />{{props.iconName}}
        </a>
        `
    });
  }

  setHandle(handle) {
    this.addListener('dblclick', handle);
  }
}