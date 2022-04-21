import { IAddress } from "./IAddress";
import { IProfile } from "./IProfile";


export interface IProperty {
    id: string;
    name: string;
    inviteeCount: number;
    address: IAddress;
    attachements: [];
    user: {
        profile: IProfile;
        usertype: string;
        __typename: string;
    },
    __typename: string;
}