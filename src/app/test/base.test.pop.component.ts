import {Component, OnInit} from "@angular/core";
import {TableListSimpleConfig} from "../model/table.list.simple.config.model";
import {TableListConfig} from "../model/table.list.config.model";
/**
 * Created by Administrator on 2017/5/15.
 */


declare var layer:any;
declare var $:any;
declare var _:any;

@Component({
    selector:"base-pop-test",
    templateUrl:"base.test.pop.component.html",
    styleUrls:["base.test.pop.component.css"]
})
export  class BaseTestPopComponent implements OnInit{
    tableListConfig:TableListConfig;
    tableListSimpleConfig:TableListSimpleConfig;
    query:any={
        queryElements:[
          {
            label:'小区名称',
            type:'input',
            placeholder:'小区名称',
            prop:'communityIdStr'
          },
          {
            label:'商品名称',
            type:'input',
            placeholder:'商品名称',
            prop:'name'
          },
          {
            label:'搜索',
            type:'search'
          }
    ]
  };
    ngOnInit(){
      let tableListConfig:TableListConfig=new TableListConfig("advert/queryAdvertList.json",
        null,
        [{label:"选择",click:(data:any)=>{
          this.chooseSimple(data);
        }}],
        this.query.queryElements,"post"
      );
      tableListConfig.defaultColumsHeaderMap={
        name:"名称",
        communityName:"小区名称",
        startDate:"开始时间",
        endDate:"结束时间",
        pageTypeName:"页面类型"
      };
      this.tableListConfig=tableListConfig;

      this.tableListSimpleConfig=new TableListSimpleConfig("test");
      this.tableListSimpleConfig.watcher={name:123};
    }



    advert:any;
    chooseSimple(data:any){
      this.advert=data;
      this.tableListConfig.operator[0].label="已选"
      layer.close(this.popId);
    }

    popId:any;

    popTest(){
        this.popNoCopy($("#testPop"),"70%","60%");
    }

    popNoCopy(dom:any, width?:any, height?:any, callBack?:any, data?:any) {
        if (width == undefined) {
            width = "80%";
        }
        if (height == undefined) {
            height = "80%";
        }
        if (!_.contains(width + "", "%")) {
            width += "px";
        }
        if (!_.contains(height + "", "%")) {
            height += "px";
        }
        this.popId=layer.open({
            title: null,
            type: 1,
            content: dom,
            btn: null,
            closeBtn: null,
            zIndex: layer.zIndex,
            area: [width, height],
            success: function (layer:any, index:any) {
                if (typeof  callBack == 'function') {
                    callBack(data);
                }
            }
        })
  }

}
