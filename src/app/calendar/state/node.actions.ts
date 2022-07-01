import { Action } from "@ngrx/store";
import { IData } from "src/app/shared/models/INode";


export enum INodeActionTypes {
    LOAD_NODES = "[NODES] Load Nodes",
    LOAD_NODES_SUCCESS = "[NODES] Load Nodes Success",
    LOAD_NODES_FAIL = "[NODES] Load Nodes Fail"
}


export class LoadNodes implements Action {
    readonly type = INodeActionTypes.LOAD_NODES
}

export class LoadNodesSuccess implements Action {
    readonly type = INodeActionTypes.LOAD_NODES_SUCCESS
    constructor(public payload: IData) {


    }
}
export class LoadNodesFail implements Action {
    readonly type = INodeActionTypes.LOAD_NODES_FAIL
    constructor(public payload: string) { }
}


export type NodeActions = LoadNodes | LoadNodesSuccess | LoadNodesFail
