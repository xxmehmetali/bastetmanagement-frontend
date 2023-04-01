import { Model } from "../models/Model";
import { Page } from "./pagination/Page";
import { Result } from "./Result";

export interface PagedDataResult extends Result {
    data: Page;
}