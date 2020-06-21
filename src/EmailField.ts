import {Field} from './Field'
import {FieldType} from './FieldType'
export class EmailField implements Field{
    id: string;
    name: string;
    label: string;
    type: FieldType;
    element: HTMLInputElement;
    constructor(id: string, name: string, label: string) {
        this.element =<HTMLInputElement>document.createElement(FieldType.InputBox);
        this.element.setAttribute('type',FieldType.email);
        this.name = name;
        this.label = label;
        this.element.id=id;
        this.element.name = this.name;
        }
        render(): HTMLElement {
        return this.element;
        }
        getValue(): any {
        return this.element.value
        }
}