var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter } from "@angular/core";
export var BaseTableListPager = (function () {
    function BaseTableListPager() {
        this.pageClick = new EventEmitter();
        this.pages = [];
        this.allPages = [];
    }
    BaseTableListPager.prototype.changePage = function (page) {
        this.pageClick.emit(page);
    };
    BaseTableListPager.prototype.choosePage = function () {
        this.changePage({ pageNum: this.selectedPage, label: this.selectedPage });
    };
    BaseTableListPager.prototype.ngOnChanges = function (changes) {
        for (var propName in changes) {
            var changedProp = changes[propName];
            if (typeof changedProp == "object") {
                this.initPager(changedProp.currentValue, changedProp.previousValue);
            }
        }
    };
    BaseTableListPager.prototype.initPager = function (newValue, oldValue) {
        this.pages = [];
        this.allPages = [];
        var isPushPreShopFlag = false, isPushNextShopFlag = false;
        this.pageData = this.pageData || {
            totalRows: 0,
            totalPages: 0,
            rowsPerPage: 10,
            currentPage: 1
        };
        if (!this.pageData)
            return;
        var totalRows = this.pageData.totalRows, rowsPerPage = this.pageData.rowsPerPage, currentPage = this.pageData.currentPage, totalPages = Math.floor((this.pageData.totalRows - 1) / rowsPerPage) + 1;
        this.selectedPage = currentPage;
        for (var i = 0; i < totalPages; i++) {
            var page = {
                pageNum: i + 1,
                label: i + 1,
                clickAble: (i + 1) != currentPage,
                isShow: currentPage > 1
            };
            this.allPages.push(page);
        }
        /*总共显示个数*/
        var showTotalNumber = this.pageData.showTotalNumber || 7;
        if (totalPages > 1) {
            var firstPage = {
                pageNum: 1,
                label: '首页',
                clickAble: true,
                isShow: currentPage > 1
            };
            var prePage = {
                pageNum: (this.pageData.currentPage - 1),
                clickAble: true,
                label: '上一页',
                isShow: currentPage > 1
            };
            this.pages.push(firstPage);
            this.pages.push(prePage);
        }
        for (var i = 1; i <= totalPages; i++) {
            if (totalPages > showTotalNumber) {
                if (i == 1) {
                    this.pages.push({
                        pageNum: i,
                        label: i,
                        isCurrent: i == currentPage,
                        clickAble: true,
                        isShow: true
                    });
                }
                if (i < currentPage - (showTotalNumber - 1) / 2 && i > 1) {
                    if (!isPushPreShopFlag) {
                        this.pages.push({
                            pageNum: i,
                            label: "...",
                            isCurrent: false,
                            clickAble: false,
                            isShow: true
                        });
                        isPushPreShopFlag = !isPushPreShopFlag;
                    }
                }
                else if (i > (currentPage + (showTotalNumber - 1) / 2)) {
                    if (!isPushNextShopFlag) {
                        this.pages.push({
                            pageNum: i,
                            label: "...",
                            isCurrent: false,
                            clickAble: false,
                            isShow: true
                        });
                        isPushNextShopFlag = !isPushNextShopFlag;
                    }
                }
                else if (i != totalPages && i != 1) {
                    this.pages.push({
                        pageNum: i,
                        label: i,
                        isCurrent: i == currentPage,
                        clickAble: true,
                        isShow: true
                    });
                }
                if (i == totalPages) {
                    this.pages.push({
                        pageNum: i,
                        label: i,
                        isCurrent: i == currentPage,
                        clickAble: true,
                        isShow: true
                    });
                }
            }
            else {
                this.pages.push({
                    pageNum: i,
                    label: i,
                    isCurrent: i == currentPage,
                    clickAble: true,
                    isShow: true
                });
            }
        }
        if (totalPages > 1) {
            var lastPage = {
                pageNum: totalPages,
                label: '尾页',
                clickAble: true,
                isShow: currentPage < totalPages
            };
            var nextPage = {
                pageNum: (this.pageData.currentPage + 1),
                label: '下一页',
                clickAble: true,
                isShow: currentPage < totalPages
            };
            this.pages.push(nextPage);
            this.pages.push(lastPage);
        }
        console.log("pager", this.pages);
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BaseTableListPager.prototype, "pageData", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], BaseTableListPager.prototype, "pageClick", void 0);
    BaseTableListPager = __decorate([
        Component({
            selector: "base-table-list-pager",
            template: "<nav class=\"pager\">\n                  <span *ngFor=\"let page of pages\">\n                    <span  *ngIf=\"page.pageNum>=1&&page.isShow\">\n                      <span *ngIf=\"page.isCurrent\" style=\"background: #f00;cursor: not-allowed;color:#fff;border-color:#f00;\">{{page.label}}</span>\n                      <span *ngIf=\"!page.isCurrent&&page.clickAble\" (click)=\"changePage(page)\">{{page.label}}</span>\n                      <span *ngIf=\"!page.isCurrent&&!page.clickAble\" style=\"cursor: not-allowed\">{{page.label}}</span>\n                    </span>\n                  </span>\n                  \n                  <span class=\"selectContainer\">\n                    <select [(ngModel)]=\"selectedPage\" (change)=\"choosePage()\">\n                      <option value=\"{{page.label}}\" *ngFor=\"let page of allPages\">{{page.label}}</option>\n                    </select>\n                  </span>\n                  <span >\n                    <span>\u6BCF\u9875{{pageData.rowsPerPage}}\u6761</span>\n                  </span>\n                  <span>\n                    <span>\u5171{{allPages.length}}\u9875  \u5171{{pageData.totalRows}}\u6761</span>\n                  </span>\n              </nav>",
            styles: ["\n    .pager{\n      padding: 3px 10px;\n      background: #eee;\n      color: rgba(133, 129, 129, 0.99);\n      text-align: right;\n      font-size: 12px;\n    }\n    .pager span{\n      display: inline-block;\n    }\n    .pager>span>span{\n      display: inline-block;\n      padding: 0px;\n      border-radius: 3px;\n      margin-right: 5px;\n      cursor: pointer;\n    }\n    .pager>span>span>span{\n      display: inline-block;\n      border: 1px solid rgba(133, 129, 129, 0.99);\n      border-radius: 3px;\n      padding: 2px 8px;\n      min-width: 20px;\n      text-align: center;\n      font-size: 12px;\n      cursor: pointer;\n    }\n    .selectContainer{\n    }\n    .selectContainer select{\n          height: 24px;\n          line-height: 24px;\n          min-width: 50px;\n          font-size: 14px;\n          border: 1px solid rgba(133, 129, 129, 0.99);\n          border-radius: 50px;\n          text-align: center;\n          padding-left: 10px;\n    }\n    .selectContainer select:focus{\n      outline: none;\n    }\n  "]
        }), 
        __metadata('design:paramtypes', [])
    ], BaseTableListPager);
    return BaseTableListPager;
}());
//# sourceMappingURL=base.table.list.pager.component.js.map