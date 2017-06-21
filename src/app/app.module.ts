import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {RouterModule, Routes} from "@angular/router";
import {AppComponent} from "./app.component";
import {LoginComponent} from "./loginComponent";
import {HighLightDirective} from "./directive/highlight.directive";
import {DemoFormComponent} from "./form/demo.form.component";
import {UserLoginService} from "./service/login.service";
import {LotteryListComponent} from "./lottery/lottery_list.component";
import {BaseTableListComponent} from "./baseComponent/base.table.list.component";
import {BaseTableListPager} from "./baseComponent/base.table.list.pager.component";
import {BaseTableListQueryComponent} from "./baseComponent/base.table.list.query.component";
import {BaseTableListConfigFormComponent} from "./utils/base.table.list.config.form.component";
import {BaseCustomerKeysPipe} from "./pipe/base.customer.keys.pipe";
import {BaseUploadDirective} from "./directive/base.upload.directive";
import {BaseModelComponent} from "./baseComponent/base.model.component";
import {CreateGoodsFormComponentFormGroup} from "./merchant/create.goods.form.component.form.group";
import {BaseUploadDirectiveFormGroup} from "./directive/base.upload.directive.form.group";
import {BaseDateChooseDirective} from "./directive/base.date.choose";
import {BaseAreaChooseComponent} from "./baseComponent/base.area.choose.component";
import {CreateMerchantFormComponent} from "./merchant/create.merchant.form.component";
import {BasePopComponent} from "./baseComponent/base.pop.component";
import {CreateMallGoodsCatogeryFormComponent} from "./merchant/create.mallGoodsCatogery.form.component";
import {BaseTestPopComponent} from "./test/base.test.pop.component";
import {MainComponent} from "./main/main.component";
import {MainComponentGuard} from "./guards/MainComponentGuard/main.component.guard";
import {GoodsFormComponent} from "./merchant/goods.form.component";
import {CreateGoodsFormComponent} from "./merchant/create.goods.form.component";
import {BaseFormCreateComponentNew} from "./baseComponent/base.from.create.component.new";
import {BaseFormCreateComponentNewFormGroup} from "./baseComponent/base.from.create.component.new.form.group";


// 定义常量 嵌套自路由
const appChildRoutes: Routes = [
  {
    path: "goods",
    component: CreateGoodsFormComponent,
    canDeactivate:[MainComponentGuard]
  },
  {path: "createMerchant", component: CreateMerchantFormComponent}/*,
  {
    path: '**', redirectTo: "goods"
  }*/
];

const appRoutes:Routes=[
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:"demoForm",
    component:DemoFormComponent
  },
  {
    path:"lotteryList",
    component:LotteryListComponent
  },
  {
    path:"listConfig",
    component:BaseTableListConfigFormComponent
  },
  {
    path:"goodsForm",
    component:GoodsFormComponent
  },
  {
    path:"group",
    component:CreateGoodsFormComponentFormGroup
  },
  {
    path:"areaChoose",
    component:BaseAreaChooseComponent
  },
  {
    path:"merchant",
    component:CreateMerchantFormComponent
  },
  {
    path:"mallCatogery",
    component:CreateMallGoodsCatogeryFormComponent
  },
  {
    path:"basePop",
    component:BasePopComponent
  },
  {
    path:"testPop",
    component:BaseTestPopComponent
  },
  {
    path:"main",
    component:MainComponent,
    children:appChildRoutes,
    canDeactivate:[MainComponentGuard],
    canActivate:[MainComponentGuard],
    canActivateChild:[MainComponentGuard]
  },
 {
 path:"**",
 component:LoginComponent
 }
];
@NgModule({
  declarations: [
    LoginComponent,
    AppComponent,
    HighLightDirective,
    DemoFormComponent,
    LotteryListComponent,
    BaseTableListComponent,
    BaseTableListPager,
    BaseTableListQueryComponent,
    BaseTableListConfigFormComponent,
    BaseCustomerKeysPipe,
    BaseUploadDirective,
    BaseUploadDirectiveFormGroup,
    GoodsFormComponent,
    BaseModelComponent,
    BaseFormCreateComponentNew,
    BaseFormCreateComponentNewFormGroup,
    CreateGoodsFormComponent,
    CreateGoodsFormComponentFormGroup,
    BaseDateChooseDirective,
    BaseAreaChooseComponent,
    CreateMerchantFormComponent,
    CreateMallGoodsCatogeryFormComponent,
    BasePopComponent,
    BaseTestPopComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule
  ],
  providers: [UserLoginService,MainComponentGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
