import {Field} from './Field'
import {FieldType} from './FieldType'
export class textAreaField implements Field{
    id: string;
    name: string;
    label: string;
    type: FieldType;
    element: HTMLTextAreaElement;
    constructor(id: string, name: string, label: string, type: FieldType) {
        this.element =<HTMLTextAreaElement>document.createElement(<string>type);
        this.element.id=id;
        this.name = name;
        this.label = label;
        this.element.name = this.name;
        }
        render(): HTMLElement {
        return this.element;
        }
        getValue(): any {
        return this.element.value
        }
}