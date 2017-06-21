/**
 * Created by Administrator on 2017/4/18.
 */
import { Component ,Input,OnChanges} from "@angular/core"
import { FormControl,FormArray,FormBuilder,FormGroup,Validators,ValidatorFn } from "@angular/forms"
import {UserLoginService} from "../service/login.service";



@Component({
  selector:"demo-form",
  templateUrl:"demoForm.html"
})
export class DemoFormComponent implements OnChanges{
  heroForm=new FormGroup({
    name:new FormControl(),
    age:new FormControl()
  })


  heroFormBuilder:FormGroup;

  validateForm:FormGroup;

  addressFormArray:any=[];
  constructor(private fb:FormBuilder,public userInfoService:UserLoginService){
    let testAddress:any=[];
    for(let i =0 ;i<3;i++){
      testAddress.push(this.createAddressModel());
    }
    this.createForm(testAddress);

  }

  get addresses():FormArray{
    return this.heroFormBuilder.get("addresses") as FormArray;
  }

  createForm(addresses:any){
    this.heroFormBuilder=this.fb.group({
      name:['xkfeng',Validators.maxLength(13)],
      addresses:this.fb.array([])
    })
    console.log(addresses)

    const addressFGs:any = addresses.map((address:any) => this.fb.group(address));
    const addressFormArray:any = this.fb.array(addressFGs);
    this.heroFormBuilder.setControl("addresses",addressFormArray);

    this.createValidateForm();
  }

  createValidateForm(){
    this.validateForm=this.fb.group(this.createValidateFormModel())
  }

  ngOnChanges(){
    console.log("**********"+Math.ceil(Math.random()*10000))
   // this.resetForm();
  }

  resetForm(){
    var demo={
      name:"冯"+Math.ceil(Math.random()*100),
      address:{
        province:["安徽"+Math.ceil(Math.random()*100)],
        city:["合肥"+Math.ceil(Math.random()*100)],
        community:["城市花园"+Math.ceil(Math.random()*100)]
      }
    }
    this.heroFormBuilder.setValue(demo);
  }

  createAddressModel(){
      return {
        province:["安徽"+Math.ceil(Math.random()*100)],
        city:["合肥"+Math.ceil(Math.random()*100)],
        community:["城市花园"+Math.ceil(Math.random()*100)]
      }
  }


  createValidateFormModel(){
    return {
      name:["安徽"+Math.ceil(Math.random()*100),[Validators.required,Validators.maxLength(3),function (data:any) {
        let name:any=(data as FormControl).value;
        if(name.indexOf("xkfeng")!=-1){
          return {'forbiddenName': {name}}
        }

      }]],
    }
  }
  addAddress(){
    this.addresses.push(this.fb.group(this.createAddressModel()));
  }
}
