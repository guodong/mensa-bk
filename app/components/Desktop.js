import {Window} from './Window';

export class Desktop extends Window {
  constructor(props) {
    super(props);
    this.setBare(true);
    this.setX(0);
    this.setY(0);
    this.setWidth('100%');
    this.setHeight('100%');
  }
}