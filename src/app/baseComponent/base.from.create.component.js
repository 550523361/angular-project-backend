"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var base_customer_keys_pipe_1 = require("../pipe/base.customer.keys.pipe");
var base_validate_service_1 = require("../service/base.validate.service");
var BaseFormCreateComponent = (function () {
    function BaseFormCreateComponent(formBuilder, baseValidateService) {
        this.formBuilder = formBuilder;
        this.baseValidateService = baseValidateService;
        this.createFormModel();
    }
    BaseFormCreateComponent.prototype.createFormModel = function () {
        var _this = this;
        var formGroup = this.formGroup;
        this.formModel = {
            url: "",
            elements: [
                {
                    type: "input",
                    label: "远程校验",
                    prop: "name21",
                    removeValidateUrl: "",
                    placeholder: "请输入名称",
                    defaultValue: "",
                    required: true,
                    switcher: [{
                            prop: "sports",
                            showValue: 2
                        }, {
                            prop: "sex",
                            showValue: 0
                        }],
                    validates: [function (control) {
                            var remoteValidateRequiredParam = { "name21": true, name1: true };
                            var remoteService = {
                                url: "goods/existName",
                                baseUrl: "https://testmerchant.goodaa.com.cn/ejiazi-merchant/"
                            };
                            return _this.baseValidateService.baseValidate(control, { remote: true }, remoteValidateRequiredParam, remoteService);
                        }]
                },
                {
                    type: "input",
                    label: "名称1",
                    prop: "name1",
                    removeValidateUrl: "",
                    placeholder: "请输入名称",
                    defaultValue: "",
                    required: true,
                    switcher: [
                        {
                            prop: "sports",
                            showValue: 1
                        }
                    ],
                    validates: [function (data) {
                            var error = _this.baseValidateService.baseValidate(data, { required: true, maxlength: 15, minlength: 1, number: "###.##", maxvalue: 300.01, minvalue: 100.00 });
                            return error;
                        }]
                },
                {
                    type: "radio",
                    label: "性别",
                    prop: "sex",
                    defaultValue: "0",
                    switcher: [
                        {
                            prop: "sports",
                            showValue: 3
                        }
                    ],
                    options: [
                        {
                            label: "男",
                            value: "0"
                        },
                        {
                            label: "女",
                            value: "1"
                        }
                    ],
                    placeholder: "请输入名称",
                    required: true,
                    validates: [
                        function (control) {
                            var param = { prop: "sex", formModel: _this.formModel };
                            return _this.baseValidateService.baseValidate(control, { watchers: true }, param);
                        }
                    ]
                },
                {
                    type: "checkbox",
                    label: "爱好",
                    prop: "love",
                    options: [
                        {
                            label: "看报",
                            value: "0"
                        },
                        {
                            label: "看电视",
                            value: "1"
                        },
                        {
                            label: "交友",
                            value: "2"
                        },
                        {
                            label: "创作",
                            value: "3"
                        }
                    ],
                    placeholder: "请输入名称",
                    defaultValue: "",
                    required: true,
                    validates: [forms_1.Validators.required, forms_1.Validators.maxLength(5)]
                },
                {
                    type: "checkbox",
                    label: "体育运动",
                    prop: "sports",
                    options: [
                        {
                            label: "跑步",
                            value: "0"
                        },
                        {
                            label: "健身",
                            value: "1"
                        },
                        {
                            label: "瑜伽",
                            value: "2"
                        },
                        {
                            label: "太极",
                            value: "3" }
                    ],
                    placeholder: "请输入名称",
                    defaultValue: "2",
                    required: true,
                    validates: [function (control) {
                            var param = { prop: "sports", formModel: _this.formModel, grandfather: "sports", formGroup: _this.formGroup };
                            _this.baseValidateService.baseValidate(control, { checkboxRequired: true, checkboxWatchers: true }, param);
                        }]
                },
                {
                    type: "input",
                    label: "内增高",
                    switcher: [{
                            prop: "sex",
                            showValue: "1"
                        }],
                    prop: "innerHeight",
                    validates: [
                        function (data) {
                            return _this.baseValidateService.baseValidate(data, { required: true, number: "##.##", maxvalue: 10, minvalue: 0.5 });
                        }
                    ]
                },
                {
                    label: "头像",
                    prop: "photo",
                    type: "upload",
                    multiple: false,
                    uploadClass: { myUploadStyle: true },
                    imageConfig: { id: "imgId", url: "imageUrl", detail: "大转盘分享图标大小", size: "<30k", "validate": true, extend: ".png,.jpeg,.jpg" },
                    validates: [function (control) {
                            console.log(control.value);
                            _this.baseValidateService.baseValidate(control, { required: true });
                        }]
                },
                {
                    label: "详情图片",
                    prop: "detail",
                    type: "upload",
                    multiple: false,
                    uploadClass: { myUploadStyle2: true },
                    imageConfig: { id: "imgId", url: "imageUrl", detail: "大转盘分享图标大小", size: "<30k", "validate": true, extend: ".png,.jpeg,.jpg" },
                    validates: [function (control) {
                            console.log(control.value);
                            _this.baseValidateService.baseValidate(control, { required: true });
                        }]
                }
            ]
        };
        this.initForm();
    };
    BaseFormCreateComponent.prototype.initForm = function () {
        this.formGroup = this.formBuilder.group(this.recreateFormByModel());
    };
    BaseFormCreateComponent.prototype.recreateFormByModel = function () {
        var _this = this;
        var formGroupModel = {};
        this.formModel.elements.forEach(function (item) {
            if (item.type == "checkbox") {
                var addressFGs = item.options.map(function (option) {
                    var optionModel = {};
                    for (var prop in option) {
                        optionModel[prop] = [option[prop]];
                    }
                    optionModel["checked"] = [item.defaultValue == option.value, item.validates];
                    return _this.formBuilder.group(optionModel);
                });
                var addressFormArray = _this.formBuilder.array(addressFGs);
                formGroupModel[item.prop] = addressFormArray;
            }
            else {
                formGroupModel[item.prop] = [item.defaultValue, item.validates, item.asyncValidates];
            }
        });
        return formGroupModel;
    };
    BaseFormCreateComponent.prototype.getArrayFormByName = function (name) {
        return this.formGroup.get(name);
    };
    BaseFormCreateComponent = __decorate([
        core_1.Component({
            selector: "base-form-create",
            templateUrl: "base.from.create.component.html",
            styleUrls: ["base.from.create.component.css"],
            providers: [base_customer_keys_pipe_1.BaseCustomerKeysPipe, base_validate_service_1.BaseValidateService]
        })
    ], BaseFormCreateComponent);
    return BaseFormCreateComponent;
}());
exports.BaseFormCreateComponent = BaseFormCreateComponent;
