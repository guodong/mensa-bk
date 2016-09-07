import Component from './../Component';

export default class IconList extends Component {
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

  }
}
