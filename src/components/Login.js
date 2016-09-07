import {Component} from './Component';
import $ from '../../node_modules/jquery';
import {Desktop} from './Desktop';
import {Registry} from './Registry';
import {Register} from './Register'

export class Login extends Component {

  constructor() {

    super({
      name: 'login',
      styles: {
        width: '100%',
        height: '100%',
       background: 'url(assets/img/backgrounds/2.jpg)',
        backgroundSize: 'cover',
        display: 'block'

      },
    })


    var button = new Component({
 styles:{
   float: 'left',
   marginLeft:'700px',
 },
      template: `<body>
        <div class="page-container">
            <h1>Welcome to Mensa</h1>
            <div class="form">
                <input type="text" name="username" class="user" placeholder="手机号/邮箱">
                <input type="password" name="password" class="user" placeholder="密码">
                <button id="123">提交</button>
                <div class="error"><span>+</span></div>
            </div>
            <div class="connect">
                <p id="456">Registered Account</p><br>
            </div>
        </div>
</body>`,


      afterRender: function () {
        this.getDom().find('#123').on('click', function () {
          var destop = new Desktop();
          destop.show();
          Registry.findComponentByName('login').destroy();

        })
       this.getDom().find('#456').on('click',function() {
          var register  = new Register;
          register.show();
           Registry.findComponentByName('login').destroy();
       })
      }


    })
    this.appendChild(button);


  }

}