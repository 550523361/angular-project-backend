var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, KeyValueDiffers, IterableDiffers, ChangeDetectorRef } from "@angular/core";
import { TableListConfig } from "../model/table.list.config.model";
import { TableListSimpleConfig } from "../model/table.list.simple.config.model";
/**
 * Created by Administrator on 2017/5/15.
 */
export var BasePopComponent = (function () {
    function BasePopComponent(_iterableDiffers, _keyValueDiffers, changeDetectorRef) {
        this._iterableDiffers = _iterableDiffers;
        this._keyValueDiffers = _keyValueDiffers;
        this.changeDetectorRef = changeDetectorRef;
    }
    BasePopComponent.prototype.simpleConfig = function (data) {
        console.log("simpleConfig", console.log(data));
        /*this._keyValueDiffer = this._keyValueDiffers.find(data).create(null);
        this.simpleConfigData=data;*/
    };
    ;
    BasePopComponent.prototype.ngOnChanges = function (changes) {
        console.log("this.simpleConfig ngOnChanges");
        for (var propName in changes) {
            var changedProp = changes[propName];
            console.log(propName, changedProp);
        }
    };
    BasePopComponent.prototype.ngDoCheck = function () {
        console.log("this.simpleConfig ngDoCheck");
        /*if(this._keyValueDiffers) {
            const changes = this._keyValueDiffer.diff(this.simpleConfigData);
            if (changes) {
                console.log("this.simpleConfig",changes)
                this.whatIsChanged(changes);
            }
        }*/
    };
    BasePopComponent.prototype.whatIsChanged = function (changes) {
        changes.forEachAddedItem(function (record) {
            console.log("Added item", record.key, record.currentValue);
        });
        changes.forEachChangedItem(function (record) {
            console.log("change item", record.key, record.currentValue);
        });
        changes.forEachRemovedItem(function (record) {
            if (record.previousValue) {
                console.log("remove", record);
            }
        });
    };
    BasePopComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Input(), 
        __metadata('design:type', TableListConfig)
    ], BasePopComponent.prototype, "tableListConfig", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [TableListSimpleConfig]), 
        __metadata('design:returntype', void 0)
    ], BasePopComponent.prototype, "simpleConfig", null);
    BasePopComponent = __decorate([
        Component({
            selector: "base-pop-component",
            templateUrl: "base.pop.component.html",
            styleUrls: ["base.pop.component.css"]
        }), 
        __metadata('design:paramtypes', [IterableDiffers, KeyValueDiffers, ChangeDetectorRef])
    ], BasePopComponent);
    return BasePopComponent;
}());
//# sourceMappingURL=base.pop.component.js.map