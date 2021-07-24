import {TreeNode} from "../TreeNode";

export interface LoadingState {
    loading: boolean;
    status?: string;
    treeNodes?: TreeNode[];
    error?: any;
}