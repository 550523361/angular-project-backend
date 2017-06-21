import {Component} from "@angular/core";
import {FormBuilder, ReactiveFormsModule, Validator, Validators, FormGroup} from "@angular/forms";
import {TableListConfig} from "../model/table.list.config.model";
import {BaseDataService} from "../service/base.data.service";
/**
 * Created by Administrator on 2017/4/26.
 * 创建基础分页表单配置对象 将提供可实时预览功能
 * 目标：BaseTableListConfig（url,columns,operates,queryElements,httpMethod）
 * 使用reactiveForm进行创建
 */

@Component({
  selector:"base-table-list-config-form",
  templateUrl:"base.table.list.config.form.component.html",
  providers:[BaseDataService],
  styleUrls:["base.table.list.config.form.component.css"]
})
export class BaseTableListConfigFormComponent{
  constructor(public formBuild:FormBuilder,public baseDataService:BaseDataService){
    this.createForm();
    this.createColumnForm();
    this.createOperateForm();
    this.createQueryComplexForm();
    this.createQuerySimpleInputForm();
  }

  reload:any;
  listConfigForm:FormGroup;
  columnFrom:FormGroup;
  operateFrom:FormGroup;
  queryComplexFrom:FormGroup;
  querySimpleInputFrom:FormGroup;

  currentType:any="0";
  addTypes:any=[
    {
      label:'添加列',
      value:0
    },
    {
      label:'添加操作',
      value:1
    },
    {
      label:'添加复杂（级联）查询',
      value:2
    },
    {
      label:'添加简单input查询',
      value:3
    },
  ]

  columnFormData={
    inputs:[
      {
        key:"columnName",
        name:"columnName",
        label:"列名："
      },
      {
        key:"columnProp",
        name:"columnProp",
        label:"属性："
      },
      {
        key:"columnType",
        name:"columnType",
        label:"类型："
      }
    ]
  }
  querySimpleInputFormData={
    inputs:[
      {
          key:"queryLabel",
        name:"queryLabel",
        label:"标题名称："
      },
      {
        key:"queryProp",
        name:"queryProp",
        label:"查询参数名："
      },
      {
        key:"queryPlaceholder",
        name:"queryPlaceholder",
        label:"输入框占位符："
      },
      {
        key:"queryType",
        name:"queryType",
        label:"查询条件类型："
      },
      {
        key:"queryDefaultValue",
        name:"queryDefaultValue",
        label:"查询条件默认值："
      }
    ]
  }
  operatorFormData={
    inputs:[
      {
        key:"operateLabel",
        name:"operateLabel",
        label:"按钮名称："
      },
      {
        key:"operateClick",
        name:"operateClick",
        label:"监听器名称："
      },
      {
        key:"operateNeedParam",
        name:"operateNeedParam",
        label:"是否需要参数："
      },
      {
        key:"operateShowMap",
        name:"operateShowMap",
        label:"显示关联逻辑："
      },
      {
        key:"operateIsExecuteProp",
        name:"operateIsExecuteProp",
        label:"禁用属性："
      },
      {
        key:"operateClickHandler",
        name:"operateClickHandler",
        label:"处理函数："
      }
    ]
  }

  queryComplexFormData={
    inputs:[
      {
        key:"queryLabel",
        name:"queryLabel",
        label:"按钮名称："
      },
      {
        key:"queryType",
        name:"queryType",
        label:"查询类型 select："
      },
      {
        key:"queryProp",
        name:"queryProp",
        label:"查询参数名："
      },
      {
        key:"queryPropList",
        name:"queryPropList",
        label:"结果集属性："
      },
      {
        key:"queryPropKeyList",
        name:"queryPropKeyList",
        label:"结果集KeyKey属性："
      },
      {
        key:"queryPropValueList",
        name:"queryPropValueList",
        label:"结果集ValueKey属性："
      },
      {
        key:"queryCasecadeChild",
        name:"queryCasecadeChild",
        label:"关联子查询参数："
      },
      {
        key:"queryPropAlias",
        name:"queryPropAlias",
        label:"查询参数别名："
      },
      {
        key:"queryCasecadeGrandsonList",
        name:"queryCasecadeGrandsonList",
        label:"级联子孙属性："
      },
      {
        key:"queryDataUrl",
        name:"queryDataUrl",
        label:"数据源地址url："
      },
      {
        key:"queryPlaceholder",
        name:"queryPlaceholder",
        label:"占位符："
      },
      {
        key:"queryClick",
        name:"queryClick",
        label:"监听器名称："
      },
      {
        key:"queryDefaultValue",
        name:"queryDefaultValue",
        label:"默认值："
      },
      {
        key:"queryNeedParam",
        name:"queryNeedParam",
        label:"是否需要参数："
      },
      {
        key:"queryShowMap",
        name:"queryShowMap",
        label:"显示关联逻辑："
      },
      {
        key:"queryIsExecuteProp",
        name:"queryIsExecuteProp",
        label:"禁用属性："
      }
    ]
  };

  columns:any=[];
  operator:any=[];
  query:any=[];

queryModel:any=[
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
    }/*,
    {
      label:'小区名称',
      type:'input',
      placeholder:'小区名称',
      prop:'communityName'
    }*/
    ];

  baseTableListConfig:TableListConfig=new TableListConfig("url",this.columns,this.operator,this.query);
  configModel:any={"url":"activity/getActivityPageList.json","colums":[{"label":"活动ID","prop":"id","name":"id","type":""},{"label":"活动名称","prop":"name","name":"name","type":""},{"label":"报名人数","prop":"registrationCount","name":"registrationCount","type":""},{"label":"状态","prop":"activityStateName","name":"activityStateName","type":""}],"operator":[{"label":"导出报名信息","click":"click","operateNeedParam":"true","operateShowMap":"","operateIsExecuteProp":""}],"query":[{"label":"活动名称","placeholder":"请输入活动名称","type":"input","prop":"name"},{"label":"搜索","placeholder":"请输入活动名称","type":"search","prop":"name"}],"httpMethod":"get"}
  previewTableListConfig:any;//=this.configModel;
  defaultValue:any=Math.ceil(Math.random()*1000);

  createForm(){
    this.listConfigForm=this.formBuild.group({
      name:["name",[Validators.required]],
      age:["23",[Validators.required]],
    })
  }
  createColumnForm(){
    let formGroup:any={};
    this.columnFormData.inputs.forEach((item:any)=>{
      formGroup[item.name]=[item.name,[Validators.required]];
    });
    this.columnFrom=this.formBuild.group(formGroup);
  }
  createOperateForm(){
    let formGroup={};
    this.operatorFormData.inputs.forEach((item:any)=>{
      formGroup[item.name]=[item.name,[Validators.required]];
    });
    this.operateFrom=this.formBuild.group(formGroup);
  }
  createQueryComplexForm(){
    let formGroup={};
    this.queryComplexFormData.inputs.forEach((item:any)=>{
      formGroup[item.name]=[item.name,[Validators.required]];
    });
    this.queryComplexFrom=this.formBuild.group(formGroup);
  }
  createQuerySimpleInputForm(){
    let formGroup={};
    this.querySimpleInputFormData.inputs.forEach((item:any)=>{
      formGroup[item.name]=[item.name,[Validators.required]];
    });
    this.querySimpleInputFrom=this.formBuild.group(formGroup);
  }


  addColumnItem(){
      console.log("this.columnFrom.value",this.columnFrom.value);
      let columnItem:any=this.columnFrom.value;
      this.columns.push({
        label:columnItem.columnName,
        prop:columnItem.columnProp,
        name:columnItem.columnProp,
        type:columnItem.columnType
      })
  }
  addOperateItem(){
      console.log("this.operateFrom.value",this.operateFrom.value);
      let columnItem:any=this.operateFrom.value;
      this.operator.push({
        label:columnItem.operateLabel,
        click:columnItem.operateClick,
        operateNeedParam:columnItem.operateNeedParam,
        operateShowMap:columnItem.operateShowMap,
        operateIsExecuteProp:columnItem.operateIsExecuteProp,
        clickHandler:columnItem.operateClickHandler,
        abc:()=>console.log(121)
      })
  }


  addQueryComplexItem(){
      console.log("this.queryComplexFrom.value",this.queryComplexFrom.value);
      let columnItem:any=this.queryComplexFrom.value;
      this.query.push({
        queryLabel:columnItem.queryLabel,
        queryClick:columnItem.queryClick,
        queryNeedParam:columnItem.queryNeedParam,
        queryShowMap:columnItem.queryShowMap,
        queryIsExecuteProp:columnItem.queryIsExecuteProp
      })
  }
  addQuerySimpleInputItem(){
      console.log("this.querySimpleInputFrom.value",this.querySimpleInputFrom.value);
      let columnItem:any=this.querySimpleInputFrom.value;
      this.query.push({
        label:columnItem.queryLabel,
        placeholder:columnItem.queryPlaceholder,
        type:columnItem.queryType,
        prop:columnItem.queryProp,
        queryClick:columnItem.queryClick,
        queryNeedParam:columnItem.queryNeedParam,
        queryShowMap:columnItem.queryShowMap,
        queryIsExecuteProp:columnItem.queryIsExecuteProp
      })
  }

  exportConfig(){
    console.log(JSON.stringify(this.baseTableListConfig))
  }
  isView:boolean=false;
  previewConfig(){
    console.log("sorry!!! preview is not implements!!!");
    this.isView=!this.isView;
    this.previewTableListConfig=this.baseTableListConfig;
  }

  addCasecadeQuery(){
    this.queryModel.forEach((item:any)=>{
      this.query.push(item);
    });
    let date=new Date();
    this.reload=date ;
  }

}
