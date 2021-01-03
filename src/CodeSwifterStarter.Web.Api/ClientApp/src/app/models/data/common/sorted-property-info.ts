import { SortDirection } from "app/models/data/common/sort-direction.enum";

export interface ISortedPropertyInfo {
  name?: string;
  direction: SortDirection;
}

export class SortedPropertyInfo implements ISortedPropertyInfo {
  name?: string;
  direction: SortDirection;


  public constructor(init?: Partial<SortedPropertyInfo>) {
    (<any>Object).assign(this, init);
  }
}
