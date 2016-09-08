import Component from '../Component';

export default class StartmenuItem extends Component{
  constructor() {
    super(...arguments);
    this.tagName = 'li';
    this.template = '<a href="#"><img src="assets/paint.jpg" alt="">{{props.name}}</a>';
    
  }
}