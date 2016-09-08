import Component from '../Component';

export default class Mask extends Component {
  constructor() {
    super({
      styles: {
        width: '100%',
        height: '100%',
        background: '#000',
        zIndex: 99999,
        position: 'absolute',
        top: 0,
        left: 0,
        opacity: 0.5
      },
      template: '<div style="text-align:center;margin-top: 150px"><img src="assets/loading.gif"/></div>'
    })
  }
}