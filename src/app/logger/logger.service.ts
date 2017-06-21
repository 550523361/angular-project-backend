import {Injectable} from "@angular/core";
@Injectable()
export class LoggerService{
  constructor(){}
  log(msg:any){
    console.log(msg)
  }
}
