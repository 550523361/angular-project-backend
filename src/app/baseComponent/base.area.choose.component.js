var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Output, EventEmitter } from "@angular/core";
import { BaseDataService } from "../service/base.data.service";
import { BaseFormCreateComponentNew } from "./base.from.create.component.new";
import { FormBuilder } from "@angular/forms";
import { BaseValidateService } from "../service/base.validate.service";
export var BaseAreaChooseComponent = (function (_super) {
    __extends(BaseAreaChooseComponent, _super);
    function BaseAreaChooseComponent(formBuilder, baseDataService, baseValidateService) {
        _super.call(this, formBuilder, baseDataService);
        this.formBuilder = formBuilder;
        this.baseDataService = baseDataService;
        this.baseValidateService = baseValidateService;
        this.chooseResult = new EventEmitter();
        this.chooseArray = [];
        this.chooseAreaArray = [];
    }
    BaseAreaChooseComponent.prototype.noticeChooseResult = function () {
        var communityList = this.chooseArray;
        var areaList = this.chooseAreaArray;
        var data = {
            communityList: communityList,
            areaList: areaList,
            list: areaList.concat(communityList)
        };
        this.noticeWrap(data);
    };
    BaseAreaChooseComponent.prototype.noticeWrap = function (data) {
        console.log("noticeWrap", data);
        this.chooseResult.emit(data);
    };
    BaseAreaChooseComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.formModel = {
            url: "goods/saveGoods.json",
            elements: [
                /*{
                  type:"select",
                  label:"商品分类",
                  prop:"goodsCategory",
                  defaultValue:"",
                  remoteInfo:{
                    baseUrl:"https://testbackend.goodaa.com.cn/ejiazi-backend/",
                    url:"indexPromotion/initJumpTypes.json",
                    httpMethod:"post",
                    param:{name:"testName",promotionType:"1"},
                    convert:(data:any)=>{
                      let options=[
                        {
                          label:"请选择",
                          value:""
                        }
                      ];
                      if(data.code=="1"&&data.data){
                        for(let key in data.data){
                          options.push({
                            label:data.data[key],
                            value:key
                          })
                        }
                      }
                      return options;
                    }
                  },
                  switcher:[
                    {
                      prop:"sports",
                      showValue:3
                    }
                  ],
                  options:[
                    {
                      label:"休闲食品",
                      value:"0"
                    },
                    {
                      label:"家居日化",
                      value:"1"
                    }
                  ],
                  placeholder:"请选择分类",
                  required:true,
                  validates:[
                    (control:any)=>{
                      let param={prop:"sex",formModel:this.formModel};
                      return this.baseValidateService.baseValidate(control,{watchers:true},param);
                    }
                  ],
                },
                {
                  type:"input",
                  label:"商品名称",
                  prop:"goodsName",
                  placeholder:"请输入商品名称",
                  defaultValue:"",
                  required:true,
                  validates:[
                    (control:any)=>{
                      let param={prop:"goodsName",formModel:this.formModel};
                      return this.baseValidateService.baseValidate(control,{required:true,maxlength:5},param);
                    }
                  ]
                },
                {
                  type:"radio",
                  label:"是否限购",
                  prop:"isLimit",
                  placeholder:"请输入商品名称",
                  defaultValue:"1",
                  options:[
                    {
                      label:"是",
                      value:"0"
                    },
                    {
                      label:"否",
                      value:"1"
                    }
                  ],
                  required:true,
                  validates:[
                    (control:any)=>{
                      let param={prop:"isLimit",formModel:this.formModel};
                      return this.baseValidateService.baseValidate(control,{watchers:true},param);
                    }
                  ]
                },
                {
                  type:"select",
                  label:"送达说明",
                  prop:"arriveInfo",
                  placeholder:"送达说明",
                  defaultValue:"1",
                  required:true,
                  options:[
                    {
                      label:"半小时",
                      value:"0"
                    },
                    {
                      label:"1小时",
                      value:"1"
                    }
                  ],
                  validates:[
                    (control:any)=>{
                      let param={prop:"arriveInfo",formModel:this.formModel};
                      return this.baseValidateService.baseValidate(control,{required:true},param);
                    }
                  ]
                },
                {
                  type:"checkbox",
                  label:"售后说明",
                  prop:"afterSale",
                  options:[
                    {
                      label:"7天无理由退换",
                      value:"0"
                    }
                  ],
                  placeholder:"请输入名称",
                  defaultValue:"2",
                  required:true,
                  validates:[(control:any)=>{
                    let param={prop:"afterSale",formModel:this.formModel,grandfather:"afterSale",formGroup:this.formGroup};
                    this.baseValidateService.baseValidate(control,{checkboxWatchers:true},param)
                  }]
                },*/
                {
                    label: "小区选择",
                    type: "array",
                    prop: "communityChoose",
                    noNeedValidateElement: true,
                    options: [
                        {
                            label: "",
                            prop: "provinceId",
                            defaultValue: "",
                            type: "select",
                            value: "",
                            init: true,
                            options: [
                                {
                                    label: "请选择省",
                                    value: "0"
                                }
                            ],
                            remoteInfo: {
                                baseUrl: "https://testbackend.goodaa.com.cn/ejiazi-backend/",
                                url: "citys/queryOpeningCitiesList.json",
                                httpMethod: "get",
                                param: { extend: "pid" },
                                convert: function (data) {
                                    var options = [
                                        {
                                            label: "请选择",
                                            value: ""
                                        }
                                    ];
                                    if (data && data.citiesList) {
                                        data.citiesList.forEach(function (item) {
                                            options.push({
                                                label: item["name"],
                                                value: item["id"]
                                            });
                                        });
                                    }
                                    return options;
                                }
                            },
                            validates: [
                                function (control) {
                                    console.log("aaaaaaaaaaaaaaaaaaaaaaa", control);
                                    var param = { prop: "province", formModel: _this.formModel, grandfather: "activeTime", formGroup: _this.formGroup };
                                    _this.baseValidateService.baseValidate(control, { checkboxWatchers: true }, param);
                                }
                            ]
                        },
                        {
                            label: "市",
                            prop: "cityId",
                            defaultValue: "",
                            type: "select",
                            switchers: [
                                {
                                    prop: "provinceId",
                                    showValue: "0"
                                }
                            ],
                            value: "",
                            remoteInfo: {
                                baseUrl: "https://testbackend.goodaa.com.cn/ejiazi-backend/",
                                url: "citys/queryOpeningCitiesList.json",
                                httpMethod: "get",
                                param: { extend: "pid" },
                                propMap: { areaProvinceId: "provinceId", areaCityId: "cityId", areaDistrictId: "districtId" },
                                convert: function (data) {
                                    var options = [
                                        {
                                            label: "请选择",
                                            value: ""
                                        }
                                    ];
                                    if (data && data.citiesList) {
                                        data.citiesList.forEach(function (item) {
                                            options.push({
                                                label: item["name"],
                                                value: item["id"]
                                            });
                                        });
                                    }
                                    return options;
                                }
                            }
                        },
                        {
                            label: "区",
                            prop: "districtId",
                            defaultValue: "",
                            type: "select",
                            switchers: [
                                {
                                    prop: "cityId",
                                    showValue: "0"
                                }
                            ],
                            value: "",
                            remoteInfo: {
                                baseUrl: "https://testbackend.goodaa.com.cn/ejiazi-backend/",
                                url: "citys/queryOpeningCitiesList.json",
                                httpMethod: "get",
                                param: { extend: "pid" },
                                propMap: { areaProvinceId: "provinceId", areaCityId: "cityId", areaDistrictId: "districtId" },
                                convert: function (data) {
                                    var options = [
                                        {
                                            label: "请选择",
                                            value: ""
                                        }
                                    ];
                                    if (data && data.citiesList) {
                                        data.citiesList.forEach(function (item) {
                                            options.push({
                                                label: item["name"],
                                                value: item["id"]
                                            });
                                        });
                                    }
                                    return options;
                                }
                            }
                        },
                        {
                            label: "小区名称",
                            prop: "communityName",
                            type: "input",
                            defaultValue: "",
                            remoteInfo: {
                                baseUrl: "https://testbackend.goodaa.com.cn/ejiazi-backend/",
                                url: "community/queryCommunitiesList.json",
                                httpMethod: "get",
                                param: { cityId: "testName", promotionType: "1", extend: "pid" },
                                convert: function (data) {
                                    var options = [
                                        {
                                            label: "请选择",
                                            value: ""
                                        }
                                    ];
                                    if (data && data.citiesList) {
                                        data.citiesList.forEach(function (item) {
                                            options.push({
                                                label: item["name"],
                                                value: item["id"]
                                            });
                                        });
                                    }
                                    return options;
                                }
                            }
                        },
                        {
                            label: "搜索",
                            prop: "searchBtn",
                            type: "searchBtn",
                            defaultValue: "",
                            click: function (data) {
                                console.log(data);
                                _this.queryCommunityList(data);
                            }
                        }
                    ],
                    validates: [function (control) {
                            var param = { prop: "provinceId", formModel: _this.formModel, grandfather: "communityChoose", formGroup: _this.formGroup };
                            return _this.baseValidateService.baseValidate(control, { arrayWatchers: 1 }, param);
                        }]
                },
                {
                    label: "区域选择",
                    type: "array",
                    prop: "areaChoose",
                    noNeedValidateElement: true,
                    options: [
                        {
                            label: "",
                            prop: "provinceId",
                            defaultValue: "",
                            type: "select",
                            value: "",
                            init: true,
                            options: [
                                {
                                    label: "请选择省",
                                    value: "0"
                                }
                            ],
                            remoteInfo: {
                                baseUrl: "https://testbackend.goodaa.com.cn/ejiazi-backend/",
                                url: "citys/queryOpeningCitiesList.json",
                                httpMethod: "get",
                                param: { extend: "pid" },
                                convert: function (data) {
                                    var options = [
                                        {
                                            label: "请选择",
                                            value: ""
                                        }
                                    ];
                                    if (data && data.citiesList) {
                                        data.citiesList.forEach(function (item) {
                                            options.push({
                                                label: item["name"],
                                                value: item["id"]
                                            });
                                        });
                                    }
                                    return options;
                                }
                            },
                            validates: [
                                function (control) {
                                    var param = { prop: "province", formModel: _this.formModel, grandfather: "activeTime", formGroup: _this.formGroup };
                                    _this.baseValidateService.baseValidate(control, { checkboxWatchers: true }, param);
                                }
                            ]
                        },
                        {
                            label: "市",
                            prop: "cityId",
                            defaultValue: "",
                            type: "select",
                            switchers: [
                                {
                                    prop: "provinceId",
                                    showValue: "0"
                                }
                            ],
                            value: "",
                            remoteInfo: {
                                baseUrl: "https://testbackend.goodaa.com.cn/ejiazi-backend/",
                                url: "citys/queryOpeningCitiesList.json",
                                httpMethod: "get",
                                param: { extend: "pid" },
                                propMap: { provinceId: "provinceId", cityId: "cityId", districtId: "districtId" },
                                convert: function (data) {
                                    var options = [
                                        {
                                            label: "请选择",
                                            value: ""
                                        }
                                    ];
                                    if (data && data.citiesList) {
                                        data.citiesList.forEach(function (item) {
                                            options.push({
                                                label: item["name"],
                                                value: item["id"]
                                            });
                                        });
                                    }
                                    return options;
                                }
                            }
                        },
                        {
                            label: "区",
                            prop: "districtId",
                            defaultValue: "",
                            type: "select",
                            switchers: [
                                {
                                    prop: "cityId",
                                    showValue: "0"
                                }
                            ],
                            value: "",
                            remoteInfo: {
                                baseUrl: "https://testbackend.goodaa.com.cn/ejiazi-backend/",
                                url: "citys/queryOpeningCitiesList.json",
                                httpMethod: "get",
                                param: { extend: "pid" },
                                propMap: { provinceId: "provinceId", cityId: "cityId", districtId: "districtId" },
                                convert: function (data) {
                                    var options = [
                                        {
                                            label: "请选择",
                                            value: ""
                                        }
                                    ];
                                    if (data && data.citiesList) {
                                        data.citiesList.forEach(function (item) {
                                            options.push({
                                                label: item["name"],
                                                value: item["id"]
                                            });
                                        });
                                    }
                                    return options;
                                }
                            }
                        },
                        {
                            label: "环",
                            prop: "rings",
                            defaultValue: "",
                            type: "select",
                            switchers: [
                                {
                                    prop: "cityId",
                                    showValue: "0"
                                }
                            ],
                            value: "",
                            remoteInfo: {
                                baseUrl: "https://testbackend.goodaa.com.cn/ejiazi-backend/",
                                url: "ring/queryOpeningRingList.json",
                                httpMethod: "get",
                                param: {},
                                propMap: { provinceId: "provinceId", cityId: "cityId", districtId: "districtId" },
                                convert: function (data) {
                                    var options = [
                                        {
                                            label: "请选择",
                                            value: ""
                                        }
                                    ];
                                    if (data && data.citiesList) {
                                        data.citiesList.forEach(function (item) {
                                            options.push({
                                                label: item["name"],
                                                value: item["id"]
                                            });
                                        });
                                    }
                                    return options;
                                }
                            }
                        },
                        {
                            label: "添加",
                            prop: "addAreaBtn",
                            type: "button",
                            defaultValue: "",
                            click: function (data) {
                                console.log(data);
                                var area = { name: "" };
                                data.forEach(function (item) {
                                    area[item.prop] = item.value;
                                    var areaName = $("[name=" + item.prop + "]:last option:selected").text();
                                    if (areaName != "请选择" && area[item.prop]) {
                                        area.name += (area.name == "" ? "" : "-") + areaName;
                                    }
                                });
                                _this.chooseArea(area);
                            }
                        }
                    ],
                    validates: [function (control) {
                            var param = { prop: "provinceId", formModel: _this.formModel, grandfather: "areaChoose", formGroup: _this.formGroup };
                            return _this.baseValidateService.baseValidate(control, { arrayWatchers: 1 }, param);
                        }]
                }
            ]
        };
        this.initForm();
    };
    BaseAreaChooseComponent.prototype.queryCommunityList = function (data) {
        var _this = this;
        var queryParmaBody = {};
        data.forEach(function (item) {
            queryParmaBody[item.prop] = item.value;
        });
        var queryParam = {
            baseUrl: "https://testbackend.goodaa.com.cn/ejiazi-backend/",
            url: "community/queryCommunitiesList.json",
            httpMethod: "get",
            param: queryParmaBody
        };
        this.baseDataService.listData(queryParam).subscribe(function (resultDataRemote) {
            var resultData = resultDataRemote.json();
            if (resultData && resultData.code == 1) {
                _this.queryResultCommunityList = resultData.data;
            }
        });
    };
    BaseAreaChooseComponent.prototype.chooseCommunity = function (community) {
        var result = this.findCommunity(community.id, community);
        if (result == 0) {
            return;
        }
        if (!community["checked"] || community["checked"] == false) {
            if (!result) {
                community["checked"] = true;
                this.chooseArray.push(community);
            }
        }
        else {
            result["checked"] = false;
            this.removeCommunity(community.id);
        }
        this.noticeChooseResult();
    };
    BaseAreaChooseComponent.prototype.findCommunity = function (findId, community) {
        if (!this.isCommunityInChooseArea(community)) {
            return 0;
        }
        var findCommunity = this.chooseArray.filter(function (community) {
            if (community.id == findId) {
                return community;
            }
        });
        return findCommunity.length == 0 ? null : findCommunity[0];
    };
    BaseAreaChooseComponent.prototype.removeCommunity = function (removeId) {
        var index = -1;
        var findIndex = this.chooseArray.forEach(function (community, seq) {
            if (community.id == removeId) {
                community.checked = false;
                index = seq;
            }
        });
        this.chooseArray.splice(index, 1);
        this.noticeChooseResult();
    };
    BaseAreaChooseComponent.prototype.chooseArea = function (area) {
        var checkResult = this.checkAreaCanAdd(area);
        if (!checkResult) {
            this.addArea(area);
        }
        this.noticeChooseResult();
    };
    BaseAreaChooseComponent.prototype.checkAreaCanAdd = function (area) {
        /*1：检查区域 被覆盖，2：检查区域 覆盖区域，3：检查区域覆盖小区*/
        var result;
        this.chooseAreaArray.forEach(function (arrayArea) {
            if (arrayArea.provinceId == area.provinceId) {
                if (arrayArea.cityId == "" && arrayArea.cityId == "" && arrayArea.districtId == "" && arrayArea.rings == "") {
                    result = arrayArea; /*被省覆盖 不添加当前区域*/
                    return;
                }
                if (arrayArea.cityId != "" && arrayArea.cityId == area.cityId && arrayArea.districtId == "" && arrayArea.rings == "") {
                    result = arrayArea; /*被城市覆盖 不添加当前区域*/
                    return;
                }
                if (arrayArea.districtId != "" && arrayArea.cityId == area.cityId && arrayArea.districtId == area.districtId && arrayArea.rings == "") {
                    result = arrayArea; /*被城区覆盖 不添加当前区域*/
                    return;
                }
                if (arrayArea.districtId != "" && arrayArea.cityId == area.cityId && arrayArea.districtId == area.districtId && area.rings != "" && arrayArea.rings != "" && arrayArea.rings >= area.rings) {
                    result = arrayArea; /*被有区环覆盖 不添加当前区域*/
                    return;
                }
                if (arrayArea.districtId == "" && area.districtId == "" && arrayArea.cityId == area.cityId && area.rings != "" && arrayArea.rings != "" && arrayArea.rings >= area.rings) {
                    result = arrayArea; /*被无区环覆盖 不添加当前区域*/
                    return;
                }
                if (arrayArea.districtId == "" && area.districtId != "" && area.rings != "" && arrayArea.cityId == area.cityId && area.rings != "" && arrayArea.rings != "" && arrayArea.rings >= area.rings) {
                    result = arrayArea; /*被无区环覆盖 不添加当前区域*/
                    return;
                }
            }
        });
        console.log(result, area);
        var areaDeleteArr = [];
        /*查找被新区域覆盖的已选择的区域*/
        this.chooseAreaArray.forEach(function (arrayArea) {
            if (arrayArea.provinceId == area.provinceId && arrayArea.cityId == area.cityId &&
                arrayArea.districtId == area.districtId && arrayArea.rings == area.rings) {
                //不要排除自己啊
                return;
            }
            if (arrayArea.provinceId == area.provinceId) {
                if (arrayArea.cityId != "" && area.cityId == "" && area.districtId == "" && area.rings == "") {
                    areaDeleteArr.push(arrayArea); /*省覆盖省下面任何区域*/
                    return;
                }
                if (arrayArea.cityId == area.cityId && area.cityId != "" && area.districtId == "" && area.rings == "" && (arrayArea.districtId != "" || arrayArea.rings != "")) {
                    areaDeleteArr.push(arrayArea); /*城市覆盖其下面任何区域*/
                    return;
                }
                if (arrayArea.districtId == area.districtId && arrayArea.cityId == area.cityId && area.cityId != "" && area.districtId != "" && area.rings == "" && arrayArea.rings != "") {
                    areaDeleteArr.push(arrayArea); /*区覆盖其下面任何区域*/
                    return;
                }
                if (area.districtId == "" && arrayArea.cityId == area.cityId && area.cityId != "" && area.rings > arrayArea.rings) {
                    areaDeleteArr.push(arrayArea); /*无区环覆盖其下面任何区域*/
                    return;
                }
                if (arrayArea.districtId == area.districtId && area.districtId != "" && arrayArea.cityId == area.cityId && area.cityId != "" && arrayArea.rings != "" && area.rings > arrayArea.rings) {
                    areaDeleteArr.push(arrayArea); /*有区环覆盖其下面任何区域*/
                    return;
                }
                if (arrayArea.districtId == "" && area.districtId == "" && arrayArea.cityId == area.cityId && area.cityId != "" && arrayArea.rings != "" && area.rings != "" && area.rings > arrayArea.rings) {
                    areaDeleteArr.push(arrayArea); /*无区 对无区 环覆盖其下面任何区域*/
                    return;
                }
                if (arrayArea.districtId != "" && area.districtId == "" && arrayArea.cityId == area.cityId && area.cityId != "" && arrayArea.rings != "" && area.rings != "" && area.rings >= arrayArea.rings) {
                    areaDeleteArr.push(arrayArea); /*无区 对有区 环覆盖其下面任何区域*/
                    return;
                }
                if (arrayArea.districtId == "" && area.districtId != "" && arrayArea.cityId == area.cityId && area.cityId != "" && area.rings > arrayArea.rings) {
                    //areaDeleteArr.push(arrayArea);/*有区 对无区 环覆盖其下面任何区域*/
                    return;
                }
            }
        });
        console.log("delete array", areaDeleteArr);
        this.removeArea(areaDeleteArr);
        //3.查找和删除小区
        var findDeleteCommunity = this.chooseArray.filter(function (community) {
            if (area.provinceId == community.provinceId && area.cityId == "") {
                return community; //省
            }
            else if (area.provinceId == community.provinceId && area.cityId == community.cityId && area.districtId == "" && area.rings == "") {
                return community; //城市
            }
            else if (area.provinceId == community.provinceId && area.cityId == community.cityId && area.districtId == community.districtId && area.rings == "") {
                return community; //区
            }
            else if (area.provinceId == community.provinceId && area.cityId == community.cityId && area.districtId == "" && area.rings >= community.rings) {
                return community; //无区环
            }
            else if (area.provinceId == community.provinceId && area.cityId == community.cityId && area.districtId == community.districtId && area.rings >= community.rings) {
                return community; //有区环
            }
        });
        console.log("findDeleteCommunity", findDeleteCommunity);
        this.removeCommunities(findDeleteCommunity);
        return result;
    };
    BaseAreaChooseComponent.prototype.findArea = function (findId) {
        var findCommunity = this.chooseAreaArray.filter(function (community) {
            if (community.id == findId) {
                return community;
            }
        });
        return findCommunity.length == 0 ? null : findCommunity[0];
    };
    BaseAreaChooseComponent.prototype.addArea = function (area) {
        this.chooseAreaArray.push(area);
    };
    BaseAreaChooseComponent.prototype.removeArea = function (deleteArray) {
        var _this = this;
        deleteArray.forEach(function (deleteArea) {
            var index = -1;
            var findIndex = _this.chooseAreaArray.forEach(function (area, seq) {
                if (area.provinceId == deleteArea.provinceId && area.cityId == deleteArea.cityId && area.districtId == deleteArea.districtId && area.rings == deleteArea.rings) {
                    index = seq;
                }
            });
            _this.chooseAreaArray.splice(index, 1);
        });
        this.noticeChooseResult();
    };
    /**
     * 批量删除小区
     * @param deleteArray
     */
    BaseAreaChooseComponent.prototype.removeCommunities = function (deleteArray) {
        var _this = this;
        deleteArray.forEach(function (deleteCommunity) {
            var index = -1;
            var findIndex = _this.chooseArray.forEach(function (community, seq) {
                if (community.id == deleteCommunity.id) {
                    community.checked = false;
                    index = seq;
                }
            });
            _this.chooseArray.splice(index, 1);
        });
        this.noticeChooseResult();
    };
    /**
     * 查找小区是否被已选择区域覆盖
     * @param community
     */
    BaseAreaChooseComponent.prototype.isCommunityInChooseArea = function (community) {
        var checkResult = this.chooseAreaArray.filter(function (area) {
            if (area.provinceId == community.provinceId && area.cityId == "") {
                return community; //省
            }
            else if (area.provinceId == community.provinceId && area.cityId == community.cityId && area.districtId == "" && area.rings == "") {
                return community; //城市
            }
            else if (area.provinceId == community.provinceId && area.cityId == community.cityId && area.districtId == community.districtId && area.rings == "") {
                return community; //区
            }
            else if (area.provinceId == community.provinceId && area.cityId == community.cityId && area.districtId == "" && area.rings >= community.rings) {
                return community; //无区环
            }
            else if (area.provinceId == community.provinceId && area.cityId == community.cityId && area.districtId == community.districtId && area.rings >= community.rings) {
                return community; //有区环
            }
        });
        return checkResult.length == 0;
    };
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], BaseAreaChooseComponent.prototype, "chooseResult", void 0);
    BaseAreaChooseComponent = __decorate([
        Component({
            selector: "base-area-choose",
            templateUrl: "base.area.choose.component.html",
            styleUrls: ["base.from.create.component.css", "base.area.choose.component.css"],
            providers: [BaseDataService, BaseValidateService]
        }), 
        __metadata('design:paramtypes', [FormBuilder, BaseDataService, BaseValidateService])
    ], BaseAreaChooseComponent);
    return BaseAreaChooseComponent;
}(BaseFormCreateComponentNew));
//# sourceMappingURL=base.area.choose.component.js.map