// const initialState = {
//     nodes: [
//         {
//             id: "2442449",
//             date: "2022-04-28T11:00:00.000+0000",
//             maxInviteeCount: 3,
//             attendeeCount: 2,
//             showContactInformation: false,
//             contact: {
//                 firstName: "",
//                 name: "",
//                 email: "",
//                 mobile: "",
//                 phone: "",
//                 address: {},
//                 fullName: ""
//             },
//             property: {
//                 id: "2442379",
//                 name: "2 Zimmer in Stendal",
//                 imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
//                 inviteeCount: 2,
//                 address: {
//                     street: "Karlhagenbeckstr",
//                     houseNumber: "31",
//                     city: "Stendal",
//                     country: "DE",
//                     zipCode: "39576",
//                     __typename: "Address"
//                 },
//                 attachments: [],
//                 user: {
//                     profile: {
//                         firstname: "Max",
//                         imageUrl: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
//                         name: "Mustermann",
//                         phone: "",
//                         gender: "NA",
//                         title: "NONE"
//                     },
//                     usertype: "COMPANYADMIN",
//                     __typename: "LandlordUser"
//                 },
//                 __typename: "Property"
//             },
//             __typename: "Appointment"
//         },
//         {
//             id: "2442150",
//             date: "2022-04-28T12:00:00.000+0000",
//             maxInviteeCount: 2,
//             attendeeCount: 1,
//             showContactInformation: false,
//             contact: {
//                 firstName: "",
//                 name: "",
//                 email: "",
//                 mobile: "",
//                 phone: "",
//                 address: {},
//                 fullName: ""
//             },
//             property: {
//                 id: "2440848",
//                 name: "Test",
//                 imageUrl: "https://images.unsplash.com/photo-1598228723793-52759bba239c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
//                 inviteeCount: 1,
//                 address: {
//                     street: "Lazarettstr.",
//                     houseNumber: "3",
//                     city: "München",
//                     country: "DE",
//                     zipCode: "80636",
//                     __typename: "Address"
//                 },
//                 attachments: [],
//                 user: {
//                     profile: {
//                         firstname: "Max",
//                         imageUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
//                         name: "Mustermann",
//                         phone: "",
//                         gender: "NA",
//                         title: "NONE"
//                     },
//                     usertype: "COMPANYADMIN",
//                     __typename: "LandlordUser"
//                 },
//                 __typename: "Property"
//             },
//             __typename: "Appointment"
//         },
//         {
//             id: "2442901",
//             date: "2022-04-25T08:00:00.000+0000",
//             maxInviteeCount: 3,
//             attendeeCount: 1,
//             showContactInformation: false,
//             contact: {
//                 firstName: "",
//                 name: "",
//                 email: "",
//                 mobile: "",
//                 phone: "",
//                 address: {},
//                 fullName: ""
//             },
//             property: {
//                 id: "2440850",
//                 name: "Flat ohne name",
//                 imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1175&q=80",
//                 inviteeCount: 1,
//                 address: {
//                     street: "Lazarettstr.",
//                     houseNumber: "3",
//                     city: "München",
//                     country: "DE",
//                     zipCode: "80636",
//                     __typename: "Address"
//                 },
//                 attachments: [],
//                 user: {
//                     profile: {
//                         firstname: "Max",
//                         imageUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
//                         name: "Mustermann",
//                         phone: "",
//                         gender: "NA",
//                         title: "NONE"
//                     },
//                     usertype: "COMPANYADMIN",
//                     __typename: "LandlordUser"
//                 },
//                 __typename: "Property"
//             },
//             __typename: "Appointment"
//         },
//         {
//             id: "2442902",
//             date: "2022-04-25T08:00:00.000+0000",
//             maxInviteeCount: 3,
//             attendeeCount: 1,
//             showContactInformation: false,
//             contact: {
//                 firstName: "",
//                 name: "",
//                 email: "",
//                 mobile: "",
//                 phone: "",
//                 address: {},
//                 fullName: ""
//             },
//             property: {
//                 id: "2440850",
//                 name: "Flat ohne name",
//                 imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1175&q=80",
//                 inviteeCount: 1,
//                 address: {
//                     street: "Lazarettstr.",
//                     houseNumber: "3",
//                     city: "München",
//                     country: "DE",
//                     zipCode: "80636",
//                     __typename: "Address"
//                 },
//                 attachments: [],
//                 user: {
//                     profile: {
//                         firstname: "Max",
//                         imageUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
//                         name: "Mustermann",
//                         phone: "",
//                         gender: "NA",
//                         title: "NONE"
//                     },
//                     usertype: "COMPANYADMIN",
//                     __typename: "LandlordUser"
//                 },
//                 __typename: "Property"
//             },
//             __typename: "Appointment"
//         },
//         {
//             id: "2442902",
//             date: "2022-04-27T08:00:00.000+0000",
//             maxInviteeCount: 3,
//             attendeeCount: 1,
//             showContactInformation: false,
//             contact: {
//                 firstName: "",
//                 name: "",
//                 email: "",
//                 mobile: "",
//                 phone: "",
//                 address: {},
//                 fullName: ""
//             },
//             property: {
//                 id: "2440850",
//                 name: "Flat ohne name",
//                 imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1175&q=80",
//                 inviteeCount: 1,
//                 address: {
//                     street: "Lazarettstr.",
//                     houseNumber: "3",
//                     city: "München",
//                     country: "DE",
//                     zipCode: "80636",
//                     __typename: "Address"
//                 },
//                 attachments: [],
//                 user: {
//                     profile: {
//                         firstname: "Max",
//                         imageUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
//                         name: "Mustermann",
//                         phone: "",
//                         gender: "NA",
//                         title: "NONE"
//                     },
//                     usertype: "COMPANYADMIN",
//                     __typename: "LandlordUser"
//                 },
//                 __typename: "Property"
//             },
//             __typename: "Appointment"
//         }
//     ],
//     loading: false,
//     loaded: true
// }



// export function nodeReducer(state = initialState, action: any) {
//     switch (action.type) {
//         case "LOAD_NODES": {
//             return {
//                 ...state,
//                 loading: true,
//                 loaded: false
//             }
//         }

//         default: {
//             return state;
//         }
//     }
// }


import { IData, INode } from "src/app/shared/models/INode";

import * as fromRoot from "../../state/app-state"
import * as nodeActions from './node.actions'

export interface NodeState {
    data: IData,
    loading: boolean,
    loaded: boolean,
    error: string
}


export interface AppState extends fromRoot.AppState {
    nodes: NodeState
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