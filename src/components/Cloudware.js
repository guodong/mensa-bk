import {Registry} from './Registry';
import $ from '../../node_modules/jquery/dist/jquery';

export class Cloudware {
  static install(name, cb) {
    $.get({
      url: 'http://localhost:3000/cloudwares/95383fd4-e586-469a-ae86-cbb42ad46916',
      success: function(data) {
        console.log(data);
      }
    });
  }
}