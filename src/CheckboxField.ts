import {FieldType} from "./FieldType";
import {Field} from "./Field"

export class CheckboxField implements Field{
    id: string;
    name: string;
    label: string;
    type: FieldType;
    element: HTMLInputElement;
    constructor(id: string,name: string, label: string) {
        this.element =<HTMLInputElement>document.createElement(FieldType.InputBox);
        this.element.setAttribute('type',FieldType.checkBox);
        this.name = name;
        this.element.id=id;
        this.label = label;
        this.element.name = this.name;
        }
        render(): HTMLElement {
        return this.element;
        }
        getValue(): any {
        return this.element.checked==true?'Tak':'Nie';
        }
}