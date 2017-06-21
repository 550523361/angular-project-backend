import {Component, OnInit} from "@angular/core";
import {UserLoginService} from "../service/login.service";
import {Router} from "@angular/router";
import {UserModel} from "../model/user.model";
declare var $:any;
@Component({
    selector:"main-component",
    templateUrl:"main.component.html",
    styleUrls:["main.component.css"]
})
export class MainComponent implements OnInit{

    constructor(
        public userLoginService:UserLoginService,
        private router:Router
    ){

    }

    menuList:any;
    ngOnInit(){
        this.menuList=[
            {
                label:"商户管理",
                options:[
                    {
                        label:"商户列表",
                        url:"goods"
                    },
                    {
                        label:"创建商户",
                        url:"createMerchant"
                    }
                ]
            }
        ]
    }

    navFunction(event:any,menu:any){
        console.log(event,menu)
    }

    logout(){
        /*this.userLoginService.logout()
            .subscribe(data=>{
                let result=data.json();
                if(result.result==1){
                    $.removeCookie("login_user")
                    var userInfo:UserModel=new UserModel("");
                    userInfo.isLogin=false;
                    this.userLoginService.updateLoginInfo(userInfo);
                    this.router.navigate(["login"]);
                }
            });*/

        $.removeCookie("login_user");
        $.removeCookie("complexId");
        $.removeCookie("adminId");
        $.removeCookie("sn");
        var userInfo:UserModel=new UserModel("");
        userInfo.isLogin=false;
        this.userLoginService.updateLoginInfo(userInfo);
        this.router.navigate(["login"]);
    }

    activate(event:any){
        if(this.userLoginService.userInfo.isLogin==false&&$.cookie("login_user")!=undefined){
            this.userLoginService.userInfo=JSON.parse($.cookie("login_user"));
        }else{
           // this.router.navigate(["login"]);
        }
    }
}