import {Component, Input, OnChanges, SimpleChange} from "@angular/core";
import {TableListConfig} from "../model/table.list.config.model";
import {BaseDataService} from "../service/base.data.service";

/**
 * 分页功能组件 只需要给它数据源
 */
@Component({
  selector:"base-table-list",
  templateUrl:'base.table.list.component.html',
  providers:[BaseDataService],
  styleUrls:["base.table.list.component.css"]
})
export class BaseTableListComponent implements OnChanges{

  tableData:any={headers:[],data:{dataList:[],dataPages:[]}};

  @Input()
  tableListConfig:TableListConfig;

  queryParam={};

  ngOnChanges(changes: {[propKey: string]: SimpleChange}){
    this.queryParam={};
    console.log("this.tableListConfig",this.tableListConfig)
    for (let propName in changes) {
      let changedProp = changes[propName];
      if(this.tableListConfig.query){
        this.tableListConfig.query.forEach((queryItem:any)=>{
          this.queryParam[queryItem.prop]=queryItem.value;
        })
      }
      if(changedProp.isFirstChange()){
        this.queryDataByPage({pageNum:1});
      }
    }
  }

  constructor(protected baseDataService:BaseDataService){

  }

  pagerDataHelper(dataType:any, data:any) {
    var pagerData={};
    if (!data) {
      pagerData[dataType + "List"] = [];
      pagerData[dataType + "Pages"] = {
        totalRows: 0,
        totalPages: 0,
        rowsPerPage: 0,
        currentPage: 0
      };
      return;
    }
    pagerData[dataType + "List"] = data.dataPerPage;
    pagerData[dataType + "Pages"] = {
      totalRows:data[this.tableListConfig.pager.totalRowsProp],
      rowsPerPage: data[this.tableListConfig.pager.pageSizeProp],
      currentPage: data[this.tableListConfig.pager.pageNumProp]
    };

    if(this.tableListConfig.colums!=null&&this.tableListConfig.colums.length>0){
      return pagerData;
    }
    this.tableListConfig.defaultColums=null;
    let dataTemplate=pagerData["dataList"][0];
    for(let prop in dataTemplate){
      let columsType:any=null;
      if(prop=="picUrl"){
        columsType="image";
      }else if(prop=="jumpParam"){
        columsType="href";
      }
      if(!this.tableListConfig.defaultColums){
        if(this.tableListConfig.defaultColumsHeaderMap){
          if(this.tableListConfig.defaultColumsHeaderMap[prop]){
            this.tableListConfig.defaultColums=[{label:this.tableListConfig.defaultColumsHeaderMap[prop],prop:prop,type:columsType}];
          }
        }else{
          this.tableListConfig.defaultColums=[{label:prop,prop:prop,type:columsType}];
        }
      }else{
        if(this.tableListConfig.defaultColumsHeaderMap){
          if(this.tableListConfig.defaultColumsHeaderMap[prop]){
            this.tableListConfig.defaultColums.push({label:this.tableListConfig.defaultColumsHeaderMap[prop],prop:prop,type:columsType});
          }
        }else{
          this.tableListConfig.defaultColums.push({label:prop,prop:prop,type:columsType});
        }
      }
    }
    return pagerData;
  }

  queryDataByPage(param:any) {
    this.queryParam[this.tableListConfig.pager.pageSizeQueryProp]=this.tableListConfig.pager.pageSize||15;
    this.queryParam[this.tableListConfig.pager.pageNumQueryProp]= param&&param.pageNum||1;
    this.listData();
  };

  listData(){
    let url=this.tableListConfig.url;
    this.baseDataService.listData({url,param:this.queryParam,httpMethod:this.tableListConfig.httpMethod}).subscribe((data:any)=>{
      let result:any=data.json()||{data:{}};
      if(result.code=="1"){
        this.tableData.data=this.pagerDataHelper("data",this.tableListConfig.listAdapter&&this.tableListConfig.listAdapter(result.data)||result.data);
      }
    });
  }

  batchChoose($event:any,param:any){
    for(let key in this.tableData.data.dataList){
      this.tableData.data.dataList[key].checked=$event.target.checked
    }
  }

  /*分页功能触发*/
  pageClick(page:any){
    this.queryDataByPage(page);
  }

  /*查询组件搜索按钮事件触发*/
  queryClick(queryParam:any){
    this.queryParam=queryParam||{};
    this.queryDataByPage({});
  }
}
