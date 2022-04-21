import { IContact } from "./IContact";
import { IProperty } from "./IProperty";

export interface INode {
    id: string;
    date: string;
    maxInviteeCount: number;
    attendeeCount: number;
    showContactInformation: boolean;
    contact: IContact;
    property: IProperty;
    __typename: string;
}