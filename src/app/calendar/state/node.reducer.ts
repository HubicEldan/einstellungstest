
import { INodes } from "src/app/shared/models/INodes";

import * as nodeActions from './node.actions'

export interface NodeState {
  nodes: INodes[],
  loading: boolean,
  loaded: boolean,
  error: string
}

export const initialState: NodeState = {
  nodes: [],
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
        nodes: action.payload,
        loading: false,
        loaded: true,

      }
    }
    case nodeActions.INodeActionTypes.LOAD_NODES_FAIL: {
      return {
        ...state,

        nodes: [],

        loading: false,
        loaded: false,
        error: action.payload
      }
    }
  }
}
