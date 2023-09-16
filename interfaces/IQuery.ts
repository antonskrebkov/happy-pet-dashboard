export interface IFilter {
  key: string;
  value: string;
}
export interface ISort {
  sortBy: string;
  order: string;
}

export default interface IQuery {
  filter: IFilter[];
  sort: ISort;
  page: number;
}
