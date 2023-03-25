import { Model } from "../models/Model"

export interface Page {
    content: Model[];
    empty: false;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    pageable: any;
    size: number;
    sort: any;
    totalElements: number;
    totalPages: number;
}
/*
"pageable": {
            "sort": {
                "empty": true,
                "sorted": false,
                "unsorted": true
            },
            "offset": 0,
            "pageSize": 20,
            "pageNumber": 0,
            "paged": true,
            "unpaged": false
        },
        "sort": {
            "empty": true,
            "sorted": false,
            "unsorted": true
        }
*/
