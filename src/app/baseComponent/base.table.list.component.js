var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from "@angular/core";
import { TableListConfig } from "../model/table.list.config.model";
import { BaseDataService } from "../service/base.data.service";
/**
 * 分页功能组件 只需要给它数据源
 */
export var BaseTableListComponent = (function () {
    function BaseTableListComponent(baseDataService) {
        this.baseDataService = baseDataService;
        this.tableData = { headers: [], data: { dataList: [], dataPages: [] } };
        this.queryParam = {};
    }
    BaseTableListComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        this.queryParam = {};
        console.log("this.tableListConfig", this.tableListConfig);
        for (var propName in changes) {
            var changedProp = changes[propName];
            if (this.tableListConfig.query) {
                this.tableListConfig.query.forEach(function (queryItem) {
                    _this.queryParam[queryItem.prop] = queryItem.value;
                });
            }
            if (changedProp.isFirstChange()) {
                this.queryDataByPage({ pageNum: 1 });
            }
        }
    };
    BaseTableListComponent.prototype.pagerDataHelper = function (dataType, data) {
        var pagerData = {};
        if (!data) {
            pagerData[dataType + "List"] = [];
            pagerData[dataType + "Pages"] = {
                totalRows: 0,
                totalPages: 0,
                rowsPerPage: 0,
                currentPage: 0
            };
            return;
        }
        pagerData[dataType + "List"] = data.dataPerPage;
        pagerData[dataType + "Pages"] = {
            totalRows: data[this.tableListConfig.pager.totalRowsProp],
            rowsPerPage: data[this.tableListConfig.pager.pageSizeProp],
            currentPage: data[this.tableListConfig.pager.pageNumProp]
        };
        if (this.tableListConfig.colums != null && this.tableListConfig.colums.length > 0) {
            return pagerData;
        }
        this.tableListConfig.defaultColums = null;
        var dataTemplate = pagerData["dataList"][0];
        for (var prop in dataTemplate) {
            var columsType = null;
            if (prop == "picUrl") {
                columsType = "image";
            }
            else if (prop == "jumpParam") {
                columsType = "href";
            }
            if (!this.tableListConfig.defaultColums) {
                if (this.tableListConfig.defaultColumsHeaderMap) {
                    if (this.tableListConfig.defaultColumsHeaderMap[prop]) {
                        this.tableListConfig.defaultColums = [{ label: this.tableListConfig.defaultColumsHeaderMap[prop], prop: prop, type: columsType }];
                    }
                }
                else {
                    this.tableListConfig.defaultColums = [{ label: prop, prop: prop, type: columsType }];
                }
            }
            else {
                if (this.tableListConfig.defaultColumsHeaderMap) {
                    if (this.tableListConfig.defaultColumsHeaderMap[prop]) {
                        this.tableListConfig.defaultColums.push({ label: this.tableListConfig.defaultColumsHeaderMap[prop], prop: prop, type: columsType });
                    }
                }
                else {
                    this.tableListConfig.defaultColums.push({ label: prop, prop: prop, type: columsType });
                }
            }
        }
        return pagerData;
    };
    BaseTableListComponent.prototype.queryDataByPage = function (param) {
        this.queryParam[this.tableListConfig.pager.pageSizeQueryProp] = this.tableListConfig.pager.pageSize || 15;
        this.queryParam[this.tableListConfig.pager.pageNumQueryProp] = param && param.pageNum || 1;
        this.listData();
    };
    ;
    BaseTableListComponent.prototype.listData = function () {
        var _this = this;
        var url = this.tableListConfig.url;
        this.baseDataService.listData({ url: url, param: this.queryParam, httpMethod: this.tableListConfig.httpMethod }).subscribe(function (data) {
            var result = data.json() || { data: {} };
            if (result.code == "1") {
                _this.tableData.data = _this.pagerDataHelper("data", _this.tableListConfig.listAdapter && _this.tableListConfig.listAdapter(result.data) || result.data);
            }
        });
    };
    BaseTableListComponent.prototype.batchChoose = function ($event, param) {
        for (var key in this.tableData.data.dataList) {
            this.tableData.data.dataList[key].checked = $event.target.checked;
        }
    };
    /*分页功能触发*/
    BaseTableListComponent.prototype.pageClick = function (page) {
        this.queryDataByPage(page);
    };
    /*查询组件搜索按钮事件触发*/
    BaseTableListComponent.prototype.queryClick = function (queryParam) {
        this.queryParam = queryParam || {};
        this.queryDataByPage({});
    };
    __decorate([
        Input(), 
        __metadata('design:type', TableListConfig)
    ], BaseTableListComponent.prototype, "tableListConfig", void 0);
    BaseTableListComponent = __decorate([
        Component({
            selector: "base-table-list",
            templateUrl: 'base.table.list.component.html',
            providers: [BaseDataService],
            styleUrls: ["base.table.list.component.css"]
        }), 
        __metadata('design:paramtypes', [BaseDataService])
    ], BaseTableListComponent);
    return BaseTableListComponent;
}());
//# sourceMappingURL=base.table.list.component.js.map