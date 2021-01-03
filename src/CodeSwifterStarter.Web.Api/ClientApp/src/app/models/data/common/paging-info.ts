export interface IPagingInfo {
  pageIndex: number;
  pageSize: number;
  totalItems: number;
  pagingEnabled: boolean;
}

export class PagingInfo implements IPagingInfo {
  pageIndex: number;
  pageSize: number;
  totalItems: number;
  pagingEnabled: boolean;


  public constructor(init?: Partial<PagingInfo>) {
    (<any>Object).assign(this, init);
  }
}
