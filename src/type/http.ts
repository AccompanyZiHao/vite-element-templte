export interface ResponseType {
  code: number;
  msg: string;
  detail?: any
}

export interface ResponseTableDataType extends ResponseType {
  page:{
    list: object[];
    currPage: number;
    pageSize: number;
    totalCount: number;
  },
  sum?: object | null;
}