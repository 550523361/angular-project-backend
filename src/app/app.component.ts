import {Component} from "@angular/core";
import {UserLoginService} from "./service/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers:[UserLoginService],
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'app works!';
  constructor(public userLoginService:UserLoginService,private router:Router){

  }

  activate(event:any){
    console.log('>>>>>>>>>>>>',event)
  }
}
