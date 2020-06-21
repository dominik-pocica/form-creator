import {FieldType} from "./FieldType"

export interface Field {
    id: string;
    name: string;
    label: string;
    type: FieldType;
    render(): HTMLElement;
    getValue(): any;
}