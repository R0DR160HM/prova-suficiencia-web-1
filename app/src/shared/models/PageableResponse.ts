export class PageableResponse<T> {
    
    constructor(
        public records: T[],
        public pageIndex: number,
        public pageSize: number,
        public hasNext: boolean,
        public hasPrevious: boolean,
        public totalElements: number
    ) {}

}