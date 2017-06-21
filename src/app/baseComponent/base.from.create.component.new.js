var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from "@angular/core";
import { FormBuilder, FormControl } from "@angular/forms";
import { BaseDataService } from "../service/base.data.service";
export var BaseFormCreateComponentNew = (function () {
    function BaseFormCreateComponentNew(formBuilder, baseDataService) {
        this.formBuilder = formBuilder;
        this.baseDataService = baseDataService;
    }
    BaseFormCreateComponentNew.prototype.submit = function () {
        console.log("submit data....");
    };
    BaseFormCreateComponentNew.prototype.initForm = function () {
        this.formGroup = this.formBuilder.group(this.recreateFormByModel());
    };
    BaseFormCreateComponentNew.prototype.chooseResultFun = function (data) {
        console.log("chooseResult", data);
    };
    BaseFormCreateComponentNew.prototype.operateUtil = function ($event, element, operateType, formControl, index) {
        $event.stopPropagation();
        $event.preventDefault();
        console.log(element, operateType, formControl, index, typeof formControl, formControl instanceof FormControl);
        if (operateType == "remove") {
            formControl.setValue("");
        }
        else if (operateType == "left") {
            var groupArray = this.formGroup.get(element.prop);
            var options = groupArray.controls;
            var operateOption = options.splice(index, 1)[0];
            options.splice(index - 1, 0, operateOption);
        }
        else if (operateType == "right") {
            var groupArray = this.formGroup.get(element.prop);
            var options = groupArray.controls;
            var operateOption = options.splice(index, 1)[0];
            options.splice(index + 1, 0, operateOption);
        }
    };
    BaseFormCreateComponentNew.prototype.recreateFormByModel = function () {
        var _this = this;
        var formGroupModel = {};
        this.formModel.elements.forEach(function (item) {
            if (item.type == "checkbox") {
                var addressFGs = item.options.map(function (option) {
                    var optionModel = {};
                    for (var prop in option) {
                        if (prop == "value") {
                            optionModel[prop] = [option[prop], item.validates];
                        }
                        else {
                            optionModel[prop] = [option[prop]];
                        }
                    }
                    if (item.type == "checkbox") {
                        optionModel["checked"] = [item.defaultValue == option.value, item.validates];
                    }
                    if (option.type == "select") {
                        if (option.remoteInfo != null) {
                            _this.baseDataService.listData({ url: option.remoteInfo.url, param: option.remoteInfo.param, httpMethod: option.remoteInfo.httpMethod }).subscribe(function (data) {
                                item["options" + option.prop] = option.remoteInfo.convert(data.json()) || data.json();
                            });
                        }
                    }
                    return _this.formBuilder.group(optionModel);
                });
                var addressFormArray = _this.formBuilder.array(addressFGs);
                formGroupModel[item.prop] = addressFormArray;
                if (item.type == "array" && !item.noNeedValidateElement == true) {
                    formGroupModel[item.prop + "LinkValidate"] = [item.defaultValue, [function (control) {
                                if (control.value != "") {
                                    return { "required": control.value };
                                }
                            }]];
                }
            }
            else if (item.type == "array") {
                var keyPropMap_1 = {};
                var addressFGs = item.options.map(function (option, index) {
                    option["value"] = [option["value"], item.validates];
                    keyPropMap_1[option.prop] = index;
                    if (option.type == "select") {
                        if (option.remoteInfo != null && option.init) {
                            _this.baseDataService.listData({ url: option.remoteInfo.url, param: option.remoteInfo.param, httpMethod: option.remoteInfo.httpMethod }).subscribe(function (data) {
                                option["options"] = option.remoteInfo.convert(data.json()) || data.json();
                            });
                        }
                    }
                    return _this.formBuilder.group(option);
                });
                item["keyPropMap"] = keyPropMap_1;
                var addressFormArray = _this.formBuilder.array(addressFGs);
                formGroupModel[item.prop] = addressFormArray;
                if (item.type == "array" && !item.noNeedValidateElement == true) {
                    formGroupModel[item.prop + "LinkValidate"] = [item.defaultValue, [function (control) {
                                if (control.value != "") {
                                    return { "required": control.value };
                                }
                            }]];
                }
            }
            else if (item.type == "select") {
                if (item.remoteInfo != null) {
                    _this.baseDataService.listData({ url: item.remoteInfo.url, param: item.remoteInfo.param, httpMethod: item.remoteInfo.httpMethod }).subscribe(function (data) {
                        item.options = item.remoteInfo.convert(data.json()) || data.json();
                    });
                }
                formGroupModel[item.prop] = [item.defaultValue, item.validates, item.asyncValidates];
            }
            else {
                formGroupModel[item.prop] = [item.defaultValue, item.validates, item.asyncValidates];
            }
        });
        return formGroupModel;
    };
    BaseFormCreateComponentNew = __decorate([
        Component({
            selector: "BaseFormCreateComponentNew",
            template: "<span></span>"
        }), 
        __metadata('design:paramtypes', [FormBuilder, BaseDataService])
    ], BaseFormCreateComponentNew);
    return BaseFormCreateComponentNew;
}());
//# sourceMappingURL=base.from.create.component.new.js.map