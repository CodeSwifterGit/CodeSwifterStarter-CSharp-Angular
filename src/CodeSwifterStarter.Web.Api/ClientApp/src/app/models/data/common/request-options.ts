import { ISortedPropertyInfo } from 'app/models/data/common/sorted-property-info';

export interface IRequestOptions {
    timeout?: number;
    filterQuery?: string;
    filterParameters?: Array<any>;
    sortByExpression?: Array<ISortedPropertyInfo>;
    pageIndex?: number;
    pageSize?: number;
}