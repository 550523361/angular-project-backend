import {
    CanActivate,
    CanDeactivate,
    CanActivateChild,
    RouterStateSnapshot,
    ActivatedRouteSnapshot,
    Router
} from "@angular/router";
import {Injectable} from "@angular/core";
import {UserLoginService} from "../../service/login.service";
import {CreateGoodsFormComponent} from "../../merchant/create.goods.form.component";
/**
 * Created by Administrator on 2017/5/22.
 */

@Injectable()
export class MainComponentGuard implements CanActivate,CanDeactivate<CreateGoodsFormComponent>,CanActivateChild{


    constructor(
        public userLoginService:UserLoginService,
        public route:Router
    ){

    }

    canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):boolean{
       // console.log("canActivatecanActivatecanActivatecanActivate");
        return true;
    }

    canDeactivate(component: CreateGoodsFormComponent, route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean{
        console.log("canDeactivatecanDeactivatecanDeactivatecanDeactivate CreateGoodsFormComponentCreateGoodsFormComponentCreateGoodsFormComponentCreateGoodsFormComponent",component);
        return true;
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean{
        //console.log("canActivateChildcanActivateChildcanActivateChildcanActivateChildcanActivateChild",this.userLoginService);
        return true;
    }
}