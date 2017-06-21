import {Component, OnInit, OnChanges, Input, SimpleChange, Output, EventEmitter} from "@angular/core";
import {BaseDataService} from "../service/base.data.service";



@Component({
  selector:"base-table-list-query",
  templateUrl:'base.table.list.query.component.html',
  styleUrls:["./base.table.list.query.component.css"]
})
export class BaseTableListQueryComponent implements OnInit,OnChanges{
  @Input()
  queryElements:[any];
  @Input()
  pageData:any;
  queryButtons:any;
  @Input()
  reInit:any;
  dataQuery:any={query:{}};
  queryParam:any={aa:121};
  ngOnInit(){

  }
  ngOnChanges(changes: {[propKey: string]: SimpleChange}){
    this.initQueryElement();
  }

  constructor(protected baseDataService:BaseDataService){

  }

  /**
   * 属性变化监控
   * @param prop
   */
  changeQueryParam(prop:any){
    this.changeHelp(prop);
  }

  changeHelp(prop:any={}){
    if(prop.type=="select"){
      let currentSwitchValue:any=this.queryParam[prop.prop];
      if(prop.switchElements){
        let needInitSelected=[].filter.call(prop.switchElements,(item:any)=>{if(item.whenSwitchValue==currentSwitchValue){ return true;}})[0];
        console.log("needInitSelected",needInitSelected)
        if(needInitSelected){
          for(let key in needInitSelected.dropProps){
            delete this.queryParam[needInitSelected.dropProps[key]];
          }
          this.baseDataService.listData({url:needInitSelected.dataUrl,param:this.queryParam,httpMethod:needInitSelected.httpMethod||"get"}).subscribe((data:any)=>{
            let listData:any=data.json();
            this.dataQuery.query[needInitSelected.propKeyList]=listData[needInitSelected.propValueList];
            this.queryParam[needInitSelected.prop]=needInitSelected.defaultValue;
          },(error:any)=>{
            console.log(error);
          });
        }
      }else if(prop.casecadeChild){
        let casecadeChild=this.findCasecadeChild(prop.casecadeChild);
        if(casecadeChild.extendsProp){
          for(let seq in casecadeChild.extendsProp){
            this.queryParam[casecadeChild.extendsProp[seq]]=currentSwitchValue;
          }
        }
        this.baseDataService.listData({url:casecadeChild.dataUrl,param:this.queryParam,httpMethod:casecadeChild.httpMethod||"get"}).subscribe((data:any)=>{
          let listData:any=data.json();
          this.dataQuery.query[casecadeChild.propKeyList]=listData[casecadeChild.propValueList];
          this.queryParam[casecadeChild.prop]=casecadeChild.defaultValue;
        },(error:any)=>{
          console.log(error);
        });
      }
    }else if(prop.type="input"){

    }
  }


  findCasecadeChild(elementKey:any){
    let result:any={};
    for(let j=0;j<this.queryElements.length;j++){
      let item:any=this.queryElements[j];
      if(item.prop==elementKey){
        result=item;
        break;
      }

      if(item.switchElements){
        for(let i=0;i<item.switchElements.length;i++){
          let innerItem:any=item.switchElements[i];
          if(innerItem.prop == elementKey){
            result=innerItem;
          }
        }
      }
    }
    return result;
  }

  @Output()
  outClick:any=new EventEmitter<boolean>();

  queryBtnClick(data:any){
    this.outClick.emit(data);
  }

  initQueryElement(){
    /*n 级 级联查询开始*/
    var queryParam:any=this.queryParam;
    if(this.queryElements==null||this.queryElements.length==0) return;
    var requestUrlParam= [].filter.call(this.queryElements, function (item:any) {
      if(item.dataUrl&&item.initQuery){
        return item;
      }
    });

    for(let seq in requestUrlParam){
      let item=requestUrlParam[seq];
      if(item.casecadeParen==null||item.casecadeParen==""){
        /*顶级元素优先查询完成一级数据初始化*/
        this.baseDataService.listData({url:item.dataUrl,param:this.queryParam,httpMethod:item.httpMethod||"get"}).subscribe((data:any)=>{
          let listData=data.json();
          this.dataQuery.query[item.propKeyList]=listData[item.propValueList];
          this.queryParam[item.prop]=item.defaultValue;
        },(error:any)=>{
          console.log(error);
        });
      }
    }
    /*n 级 级联查询结束*/

    this.queryButtons=this.queryElements.filter(item=>{return item.type=='button'||item.type=='search'});
  }
}
