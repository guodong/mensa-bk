import {Component} from './Component';
import {Login} from './Login';
import $ from '../../node_modules/jquery';
import {Registry} from './Registry';

export class Register extends Component{
      constructor(props) {
   super({
   name: 'register',
     styles:{
        width: '100%',
        height: '100%',
        background: 'url(assets/img/backgrounds/1.jpg)',
        backgroundSize: 'cover',
        display: 'block'
   }
})
        var button = new Component({
          styles:{
            float: 'left',
            marginLeft:'700px'
          },
          template: `<body>
        <div class="page-container">
            <h1>注册</h1>
            <div class="form">
                <input type="text" name="username" class="user" placeholder="手机号/邮箱">
                <input type="password" name="password" class="user" placeholder="密码">
                <input type="password" name="password" class="user" placeholder="确认密码">
                <button id="121">提交</button>
                <div class="error"><span>+</span></div>
            </div>
          
        </div>
</body>`,
          afterRender: function () {
            this.getDom().find('#121').on('click', function () {
                 alert('注册成功');
             var logins = new Login();
              logins.show();
              Registry.findComponentByName('register').destroy();

            })

          }


        })
        this.appendChild(button);


      }

}