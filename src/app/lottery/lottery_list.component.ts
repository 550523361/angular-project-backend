import {Component, OnInit} from "@angular/core";
import {LotteryListService} from "../service/lottery_list.service";
import {BaseDataService} from "../service/base.data.service";
import {BaseTableListComponent} from "../baseComponent/base.table.list.component";
import {TableListConfig} from "../model/table.list.config.model";

@Component({
  selector:"lottery-list-component",
  providers:[LotteryListService],
  templateUrl:'lottery_list.component.html'
})
export class LotteryListComponent  implements OnInit{

  constructor(private lotteryListService:LotteryListService){

  }

  query={
    queryElements:[
      {
        type:'hidden',
        prop:"upShelves",
        value:"1"
      },
      {
        label:'请选择省',
        type:'select',
        placeholder:'请输入省',
        dataUrl:'citys/queryOpeningCitiesList.json',
        prop:'provinceId',
        initQuery:true,
        defaultValue:"",
        propList:'provinceList',
        propKeyList:'provinceList',
        propValueList:'citiesList',
        casecadeParen:"",
        casecadeChild:"cityId",
        casecadeGrandsonList:["cityId","districtId","communityId"]
      },
      {
        label:'请选择市',
        type:'select',
        defaultValue:"",
        placeholder:'请输入市',
        dataUrl:'citys/queryOpeningCitiesList.json',
        prop:'cityId',
        extendsProp:["pid"],
        propList:'cityList',
        propKeyList:'cityList',
        propValueList:'citiesList',
        casecadeParen:"provinceId",
        casecadeChild:"districtId",
        casecadeGrandsonList:["districtId","communityId"]
      },
      {
        label:'请选择区',
        defaultValue:"",
        type:'select',
        dataUrl:'citys/queryOpeningCitiesList.json',
        placeholder:'请选择区',
        prop:'districtId',
        extendsProp:["pid"],
        propList:'districtList',
        propKeyList:'districtList',
        propValueList:'citiesList',
        casecadeParen:"cityId",
        casecadeChildDataUrl:"community/queryCommunitiesList.json",
        casecadeChildListProp:"data",
        casecadeChild:"",
        queryParam:"cityId"
      },
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
        label:'商品类型',
        placeholder:'请选择商品类型',
        defaultValue:"",
        type:'select',
        casecadeChild:'',
        switchElements:[
          {
            whenSwitchValue:'1',
            label:'电商商品分类',
            initQuery:false,
            defaultValue:"",
            type:'select',
            placeholder:'请选择',
            dataUrl:'mall/goods/queryCategoryList.json?type=1&',
            prop:'categoryId',
            propList:'categoryList',
            propKeyList:'categoryList',
            propValueList:'categoryList',
            casecadeParen:"",
            dropProps:["pid"],
            casecadeChild:"",
            casecadeGrandsonList:[""]
          },
          {
            whenSwitchValue:'2',
            type:'select',
            label:'服务分类',
            initQuery:false,
            defaultValue:"",
            placeholder:'请选择',
            dataUrl:'mall/goods/queryCategoryList.json?type=2&',
            prop:'pid',
            propList:'categoryList',
            propKeyList:'categoryList',
            propValueList:'categoryList',
            casecadeParen:"",
            casecadeChild:"categorySubId",
            casecadeGrandsonList:["categoryId"]
          },
          {
            whenSwitchValue:'2',
            type:'select',
            label:'二级分类',
            defaultValue:"",
            placeholder:'请选择',
            initQuery:false,
            dataUrl:'mall/goods/queryCategoryList.json?type=2&',
            prop:'categorySubId',
            propList:'categorySubList',
            propKeyList:'categorySubList',
            propValueList:'categoryList',
            casecadeParen:"categoryId",
            casecadeChild:"",
            casecadeGrandsonList:[]
          }
          ],
        options:[
          {label:'电商',value:'1'},
          {label:'服务',value:'2'},
          ],
        prop:'goodsType'
      },
      {
        label:'搜索',
        type:'search',
        check: function (queryParam:any) {
        console.log("queryParamqueryParamqueryParam",queryParam);
        if(queryParam){
        var communityName=queryParam.communityName||"";
        communityName=communityName.replace(/^\s+/,"").replace(/\s+$/,"");
        if(communityName==""){
        return true;
      }

}
return true;
}
}   ,
      {
        label:'批量下架',
          type:'button',
        param:true,
        click: function (data:any,list:any) {
          let checkList:any=[].filter.call(list,(item:any)=>{return item.checked;})
          console.log(data,checkList);
        }
      },
      {
        label:'导出',
        type:'button',
        param:true,
        listener: function (queryParam:any,dataList:any) {
          console.log(queryParam,dataList);
        },
        click: function (queryParam:any,dataList:any) {
          console.log(queryParam,dataList);
        }
      }
    ]
  };
  listConfig:TableListConfig;
  listAdvertConfig:TableListConfig;
  listUserConfig:TableListConfig;
  listAdapter(listData:any){
    let result:any=listData.page;
    result["dataPerPage"]=result.content.map((item:any)=>item.user);
    return result;
  }
  ngOnInit(){
    this.listConfig=new TableListConfig("lottery/winLog/queryLotteryWinLogList",
      [{prop:'lotteryName',label:"活动名称"}],
      [{label:"修改",click:function (item:any) {console.log(item)}},{label:"",map:{1:'查看',2:'修改',3:'停止'},prop:"lotteryStatus"}],
      this.query.queryElements,"get"
    );
    this.listAdvertConfig=new TableListConfig("advert/queryAdvertList.json",
      [{label:'选择',type:"checkbox",prop:"id"}],
      [{label:"修改",click:function (item:any) {console.log(item)}},{label:"",map:{1:'查看',2:'修改',3:'停止'},prop:"state"},{label:"查看"}],
      this.query.queryElements,"post"
    );
    this.listUserConfig=new TableListConfig("user/list",
      [{label:'选择',type:"checkbox",prop:"id"}],
      [{label:"修改",click:function (item:any) {console.log(item)}},{label:"",map:{1:'查看',2:'修改',3:'停止'},prop:"status"},{label:"查看"}],
      this.query.queryElements,
      "get",
       this.listAdapter,{
        pageSizeProp:"size",
        pageSizeQueryProp:"size",
        pageNumProp:"number",
        pageNumQueryProp:"number",
        totalRowsProp:"total",
        pageSize:3
      }
    );
  }

}
