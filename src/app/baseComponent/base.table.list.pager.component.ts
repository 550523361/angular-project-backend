import {Component, Input, OnChanges, SimpleChange, Output, EventEmitter} from "@angular/core";

@Component({
  selector:"base-table-list-pager",
  template:`<nav class="pager">
                  <span *ngFor="let page of pages">
                    <span  *ngIf="page.pageNum>=1&&page.isShow">
                      <span *ngIf="page.isCurrent" style="background: #f00;cursor: not-allowed;color:#fff;border-color:#f00;">{{page.label}}</span>
                      <span *ngIf="!page.isCurrent&&page.clickAble" (click)="changePage(page)">{{page.label}}</span>
                      <span *ngIf="!page.isCurrent&&!page.clickAble" style="cursor: not-allowed">{{page.label}}</span>
                    </span>
                  </span>
                  
                  <span class="selectContainer">
                    <select [(ngModel)]="selectedPage" (change)="choosePage()">
                      <option value="{{page.label}}" *ngFor="let page of allPages">{{page.label}}</option>
                    </select>
                  </span>
                  <span >
                    <span>每页{{pageData.rowsPerPage}}条</span>
                  </span>
                  <span>
                    <span>共{{allPages.length}}页  共{{pageData.totalRows}}条</span>
                  </span>
              </nav>`,
  styles:[`
    .pager{
      padding: 3px 10px;
      background: #eee;
      color: rgba(133, 129, 129, 0.99);
      text-align: right;
      font-size: 12px;
    }
    .pager span{
      display: inline-block;
    }
    .pager>span>span{
      display: inline-block;
      padding: 0px;
      border-radius: 3px;
      margin-right: 5px;
      cursor: pointer;
    }
    .pager>span>span>span{
      display: inline-block;
      border: 1px solid rgba(133, 129, 129, 0.99);
      border-radius: 3px;
      padding: 2px 8px;
      min-width: 20px;
      text-align: center;
      font-size: 12px;
      cursor: pointer;
    }
    .selectContainer{
    }
    .selectContainer select{
          height: 24px;
          line-height: 24px;
          min-width: 50px;
          font-size: 14px;
          border: 1px solid rgba(133, 129, 129, 0.99);
          border-radius: 50px;
          text-align: center;
          padding-left: 10px;
    }
    .selectContainer select:focus{
      outline: none;
    }
  `]
})
export class BaseTableListPager implements OnChanges{

  @Input()
  pageData:any;

  @Output()
  pageClick=new EventEmitter<boolean>();

  changePage(page:any){
    this.pageClick.emit(page);
  }

  choosePage(){
    this.changePage({pageNum:this.selectedPage,label:this.selectedPage});
  }
  pages:any=[];

  selectedPage:any;

  allPages:any=[];

  ngOnChanges(changes:{[prop:string]:SimpleChange}){
    for (let propName in changes) {
      let changedProp = changes[propName];
      if(typeof changedProp == "object"){
        this.initPager(changedProp.currentValue,changedProp.previousValue);
      }
    }
  }

  initPager(newValue:any, oldValue:any){
      this.pages=[];
      this.allPages=[];
      let isPushPreShopFlag:any = false, isPushNextShopFlag:any = false;
      this.pageData = this.pageData || {
          totalRows: 0,
          totalPages: 0,
          rowsPerPage: 10,
          currentPage: 1
        };
      if (!this.pageData) return;
      let totalRows:any = this.pageData.totalRows, rowsPerPage:any = this.pageData.rowsPerPage, currentPage:any = this.pageData.currentPage,totalPages:any = Math.floor((this.pageData.totalRows-1)/rowsPerPage)+1;
      this.selectedPage=currentPage;

      for(let i =0;i<totalPages;i++){
        let page = {
          pageNum: i+1,
          label: i+1,
          clickAble: (i+1)!=currentPage,
          isShow: currentPage > 1
        };
        this.allPages.push(page);
      }

      /*总共显示个数*/
      let showTotalNumber:any = this.pageData.showTotalNumber||7;
      if (totalPages > 1) {
        let firstPage:any = {
          pageNum: 1,
          label: '首页',
          clickAble: true,
          isShow: currentPage > 1
        };
        let prePage:any = {
          pageNum: (this.pageData.currentPage - 1),
          clickAble: true,
          label: '上一页',
          isShow: currentPage > 1
        };
        this.pages.push(firstPage);
        this.pages.push(prePage);
      }
      for (let i = 1; i <= totalPages; i++) {
        if (totalPages > showTotalNumber) {
          if (i == 1) {
            this.pages.push({
              pageNum: i,
              label: i,
              isCurrent: i == currentPage,
              clickAble: true,
              isShow: true
            })
          }

          if (i < currentPage - (showTotalNumber - 1) / 2 && i > 1) {/*当前页前 总数一半隐藏*/
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
          } else if (i > (currentPage + (showTotalNumber - 1) / 2)) {
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
          } else if (i != totalPages && i != 1) {
            this.pages.push({
              pageNum: i,
              label: i,
              isCurrent: i == currentPage,
              clickAble: true,
              isShow: true
            })
          }
          if (i == totalPages) {
            this.pages.push({
              pageNum: i,
              label: i,
              isCurrent: i == currentPage,
              clickAble: true,
              isShow: true
            })
          }
        } else {
          this.pages.push({
            pageNum: i,
            label: i,
            isCurrent: i == currentPage,
            clickAble: true,
            isShow: true
          })
        }
      }
      if (totalPages > 1) {
        let lastPage:any = {
          pageNum: totalPages,
          label: '尾页',
          clickAble: true,
          isShow: currentPage < totalPages
        };
        let nextPage:any = {
          pageNum: (this.pageData.currentPage + 1),
          label: '下一页',
          clickAble: true,
          isShow: currentPage < totalPages
        };
        this.pages.push(nextPage);
        this.pages.push(lastPage);
      }
      console.log("pager",this.pages);
    }
}
