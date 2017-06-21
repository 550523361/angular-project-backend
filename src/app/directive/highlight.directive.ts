/**
 * Created by Administrator on 2017/4/18.
 */
import {Directive,ElementRef,HostListener,Input} from "@angular/core"


@Directive({
  selector:'[myHighLight]'
})
export class HighLightDirective{
  @Input()
  myEnterColor:string;
  @Input()
  myLeaveColor:string;
  constructor(public elementPre:ElementRef){

  }

  @HostListener("mouseenter")
  onMouseEnter(){
    this.highLight(this.myEnterColor)
  }
  @HostListener("mouseleave")
  onMouseLeave(){
    this.highLight(this.myLeaveColor)
  }

  private highLight(color:any){
    this.elementPre.nativeElement.style.background=color;
  }
}
