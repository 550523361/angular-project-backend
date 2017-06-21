import {Component, OnInit, ElementRef, EventEmitter, Output} from "@angular/core";
/**
 * Created by Administrator on 2017/5/5.
 */
@Component({
  selector:"base-model",
  templateUrl:"base.model.component.html",
  styleUrls:["base.model.component.css"]
})
export class BaseModelComponent implements OnInit{
  modelStatus={hidden:false,show:true};
  constructor(
    public elementRef:ElementRef
  ){
  }

  @Output()
  closeEvent=new EventEmitter<any>();

  open(){
    if(this.elementRef.nativeElement){
      this.elementRef.nativeElement.className="base-model";
    }
    this.modelStatus={hidden:false,show:true};
  }

  close(){
    if(this.elementRef.nativeElement){
      this.elementRef.nativeElement.className="";
    }
    this.modelStatus={hidden:true,show:false};
    this.closeEvent.emit({"popClose":true});
  }
  ngOnInit(){

  }
}
