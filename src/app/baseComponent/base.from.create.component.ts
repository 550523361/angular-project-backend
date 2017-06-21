import {Component} from "@angular/core";
import {FormBuilder, FormGroup, Validators, FormArray, FormControl} from "@angular/forms";
import {BaseCustomerKeysPipe} from "../pipe/base.customer.keys.pipe";
import {BaseValidateService} from "../service/base.validate.service";

@Component({
  selector:"base-form-create",
  templateUrl:"base.from.create.component.html",
  styleUrls:["base.from.create.component.css"],
  providers:[BaseCustomerKeysPipe,BaseValidateService]
})
export class BaseFormCreateComponent{
  formGroup:FormGroup;
  formModel;
  constructor(
    public formBuilder:FormBuilder,public baseValidateService:BaseValidateService
  ){
    this.createFormModel();
  }

  createFormModel(){
    let formGroup=this.formGroup;
    this.formModel={
      url:"",
      elements:[
        {
          type:"input",
          label:"远程校验",
          prop:"name21",
          removeValidateUrl:"",
          placeholder:"请输入名称",
          defaultValue:"",
          required:true,
          switcher:[{
            prop:"sports",
            showValue:2
          },{
            prop:"sex",
            showValue:0
          }],
          validates:[control=>{
            let remoteValidateRequiredParam={"name21":true,name1:true};
            let remoteService={
              url:"goods/existName",
              baseUrl:"https://testmerchant.goodaa.com.cn/ejiazi-merchant/",
            };
            return this.baseValidateService.baseValidate(control,{remote:true},remoteValidateRequiredParam,remoteService);
          }]
        },
        {
          type:"input",
          label:"名称1",
          prop:"name1",
          removeValidateUrl:"",
          placeholder:"请输入名称",
          defaultValue:"",
          required:true,
          switcher:[
            {
              prop:"sports",
              showValue:1
            }
          ],
          validates:[data=>{
            let error=this.baseValidateService.baseValidate(data,{required:true,maxlength:15,minlength:1,number:"###.##",maxvalue:300.01,minvalue:100.00});
            return error;
          }]
        },
         {
         type:"radio",
         label:"性别",
         prop:"sex",
         defaultValue:"0",
         switcher:[
           {
              prop:"sports",
              showValue:3
           }
         ],
         options:[
         {
         label:"男",
         value:"0"
         },
         {
         label:"女",
         value:"1"
         }
         ],
         placeholder:"请输入名称",
         required:true,
           validates:[
             control=>{
              let param={prop:"sex",formModel:this.formModel};
               return this.baseValidateService.baseValidate(control,{watchers:true},param);
             }
           ],
         },
         {
         type:"checkbox",
         label:"爱好",
         prop:"love",
         options:[
         {
         label:"看报",
         value:"0"
         },
         {
         label:"看电视",
         value:"1"
         },
         {
         label:"交友",
         value:"2"
         },
         {
         label:"创作",
         value:"3"
         }
         ],
         placeholder:"请输入名称",
         defaultValue:"",
         required:true,
         validates:[Validators.required,Validators.maxLength(5)]
         },
         {
         type:"checkbox",
         label:"体育运动",
         prop:"sports",
         options:[
               {
                 label:"跑步",
                 value:"0"
               },
               {
                 label:"健身",
                 value:"1"
               },
               {
                 label:"瑜伽",
                 value:"2"
               },
               {
                 label:"太极",
                 value:"3"}
         ],
         placeholder:"请输入名称",
         defaultValue:"2",
         required:true,
         validates:[control=>{
           let param={prop:"sports",formModel:this.formModel,grandfather:"sports",formGroup:this.formGroup};
           this.baseValidateService.baseValidate(control,{checkboxRequired:true,checkboxWatchers:true},param)
         }]
         },
        {
          type:"input",
          label:"内增高",
          switcher:[{
            prop:"sex",
            showValue:"1"
          }],
          prop:"innerHeight",
          validates:[
            data=>{
              return this.baseValidateService.baseValidate(data,{required:true,number:"##.##",maxvalue:10,minvalue:0.5})
            }
          ]
        },
        {
          label:"头像",
          prop:"photo",
          type:"upload",
          multiple:false,
          uploadClass:{myUploadStyle:true},
          imageConfig:{id:"imgId",url:"imageUrl",detail:"大转盘分享图标大小",size:"<30k","validate":true,extend:".png,.jpeg,.jpg"},
          validates:[control=>{
            console.log(control.value);
            this.baseValidateService.baseValidate(control,{required:true});
          }]
        },
        {
          label:"详情图片",
          prop:"detail",
          type:"upload",
          multiple:false,
          uploadClass:{myUploadStyle2:true},
          imageConfig:{id:"imgId",url:"imageUrl",detail:"大转盘分享图标大小",size:"<30k","validate":true,extend:".png,.jpeg,.jpg"},
          validates:[control=>{
            console.log(control.value);
            this.baseValidateService.baseValidate(control,{required:true});
          }]
        }
      ]
    };
    this.initForm();
  }

  initForm(){
      this.formGroup=this.formBuilder.group(this.recreateFormByModel());
  }


  recreateFormByModel(){
    let formGroupModel={};
    this.formModel.elements.forEach(item=>{
      if(item.type=="checkbox"){
        const addressFGs = item.options.map(option => {
          let optionModel={};
          for(let prop in option){
              optionModel[prop]=[option[prop]];
          }
          optionModel["checked"]=[item.defaultValue==option.value,item.validates];
          return this.formBuilder.group(optionModel);
        });
        const addressFormArray = this.formBuilder.array(addressFGs);
        formGroupModel[item.prop]=addressFormArray;
      }else{
        formGroupModel[item.prop]=[item.defaultValue,item.validates,item.asyncValidates]
      }
    });
    return formGroupModel;
  }

  getArrayFormByName(name:string):FormArray{
    return this.formGroup.get(name) as FormArray;
  }
}
