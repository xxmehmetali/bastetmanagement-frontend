import { Result } from "./Result";

export interface DataResult<T> extends Result {
    // burada model de gelebilir model listeside gelebilir. uygun bir çözüm düşün.
    data: T;
}