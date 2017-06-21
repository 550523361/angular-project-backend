var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef, EventEmitter, Output } from "@angular/core";
/**
 * Created by Administrator on 2017/5/5.
 */
export var BaseModelComponent = (function () {
    function BaseModelComponent(elementRef) {
        this.elementRef = elementRef;
        this.modelStatus = { hidden: false, show: true };
        this.closeEvent = new EventEmitter();
    }
    BaseModelComponent.prototype.open = function () {
        if (this.elementRef.nativeElement) {
            this.elementRef.nativeElement.className = "base-model";
        }
        this.modelStatus = { hidden: false, show: true };
    };
    BaseModelComponent.prototype.close = function () {
        if (this.elementRef.nativeElement) {
            this.elementRef.nativeElement.className = "";
        }
        this.modelStatus = { hidden: true, show: false };
        this.closeEvent.emit({ "popClose": true });
    };
    BaseModelComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], BaseModelComponent.prototype, "closeEvent", void 0);
    BaseModelComponent = __decorate([
        Component({
            selector: "base-model",
            templateUrl: "base.model.component.html",
            styleUrls: ["base.model.component.css"]
        }), 
        __metadata('design:paramtypes', [ElementRef])
    ], BaseModelComponent);
    return BaseModelComponent;
}());
//# sourceMappingURL=base.model.component.js.map