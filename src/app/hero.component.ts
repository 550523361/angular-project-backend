/**
 * Created by Administrator on 2017/4/17.
 */
import {Component, Inject} from "@angular/core";
import {Hero} from "./Hero";
import {LoggerService} from "./logger/logger.service";
import {UserService} from "./service/user.service";
import {APP_CONFIG, AppConfig, HERO_DI_CONFIG} from "./config/app.config";

@Component({
  selector:"hero",
  providers:[UserService,LoggerService/*,HeroServiceProvider*/,{provide:APP_CONFIG,useValue:HERO_DI_CONFIG}],
  templateUrl:'hero/hero.html'
})
export class HeroComponent{
  color:string="#aaa";
  hero={name:"12"}
  heros:Hero[]=[];
  constructor(@Inject(APP_CONFIG) config:AppConfig){
    this.heros=[];
  }
  clickUtils={
    save:function (item:any,eventParam:any) {
      console.log(item,eventParam,"234234");
    }
  }
  test(){
    console.log("adsfadfasdf")
  }
  keyUtils={
    keyUp:function (val:any,secondParam) {
      console.log(val," compare ``12`12 aaaa ")
      secondParam.error={
        msg:'请输入url'
      }
    }
  }
}
