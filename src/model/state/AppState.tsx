import {Result} from "../Result";

export interface AppState {
    currentId: number | boolean;
    results: Result[];
}