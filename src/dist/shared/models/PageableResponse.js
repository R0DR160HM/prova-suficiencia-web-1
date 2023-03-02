export class PageableResponse {
    constructor(records, pageIndex, pageSize, hasNext, hasPrevious, totalElements) {
        this.records = records;
        this.pageIndex = pageIndex;
        this.pageSize = pageSize;
        this.hasNext = hasNext;
        this.hasPrevious = hasPrevious;
        this.totalElements = totalElements;
    }
}
