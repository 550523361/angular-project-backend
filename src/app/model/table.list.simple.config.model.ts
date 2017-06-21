/**
 * Created by Administrator on 2017/4/21.
 */
export class TableListSimpleConfig{
  public defaultColums:any;
  public defaultColumsHeaderMap:any;
  public watcher:any;
  constructor(
    public url:string,
    public colums?:any,
    public operator?:any,
    public query?:any,
    public httpMethod:string='post',
    public listAdapter?:any,
    public pager:any={
      pageSizeProp:"rowsPerPage",
      pageSizeQueryProp:"pageSize",
      pageNumProp:"currentPage",
      pageNumQueryProp:"pageNum",
      totalRowsProp:"totalRows",
      pageSize:3
    },
  ){

  }
}
