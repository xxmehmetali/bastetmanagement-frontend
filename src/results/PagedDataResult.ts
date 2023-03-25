import { Model } from "../models/Model";
import { Page } from "./Page";
import { Result } from "./Result";

export interface PagedDataResult extends Result {
    data: Page;
}