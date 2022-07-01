import { IData } from "src/app/shared/models/INode";

import * as nodeActions from './node.actions'

export interface NodeState {
    data: IData,
    loading: boolean,
    loaded: boolean,
    error: string
}

export const initialState: NodeState = {

        data: {
            appointments: {
                nodes: []
            }
        }
    ,
    loading: false,
    loaded: false,
    error: ''
}


export function nodeReducer(state = initialState, action: nodeActions.NodeActions): NodeState {
    switch (action.type) {
        case nodeActions.INodeActionTypes.LOAD_NODES: {
            return {
                ...state,
                loading: true
            }
        }
        case nodeActions.INodeActionTypes.LOAD_NODES_SUCCESS: {
            return {
                ...state,
                data: action.payload,
                loading: false,
                loaded: true,

            }
        }
        case nodeActions.INodeActionTypes.LOAD_NODES_FAIL: {
            return {
                ...state,

                    data: {
                        appointments: {
                            nodes: []
                        }
                    },

                loading: false,
                loaded: false,
                error: action.payload
            }
        }
    }
}
