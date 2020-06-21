import { Field } from './Field'
import { FieldType } from './FieldType'
export class SelectInputText implements Field {
    id: string;
    name: string;
    label: string;
    type: FieldType;
    element: HTMLSelectElement;
    constructor(id: string, name: string, label: string, selectOption: Array<string>) {
        this.element = <HTMLSelectElement>document.createElement('select');
        if (name == 'Kraj urodzenia') {
            this.fetchOptions<{ name: string, region: string }>("https://restcountries.eu/rest/v2/all").then((data) => {
               // data.forEach(el=>{console.log(el.name)})

                data.filter(region => region.region=="Europe").map(x => x.name).forEach(element => {
                    let option = <HTMLOptionElement>document.createElement("option");
                    option.text = element;
                    option.value = element;
                    this.element.options.add(option);

                })
            });
        }
            for (let i = 0; i < selectOption.length; i++) {
                let option = document.createElement('option')
                option.text = selectOption[i]
                this.element.appendChild(option);
            }
        this.name = name;
        this.label = label;
        this.element.name = this.name;
        this.element.id = this.name;
    }
    render(): HTMLElement {
        return this.element;
    }
    getValue(): any {
        return this.element.value
    }
    fetchOptions<T>(url: string): Promise<T[]> {
        return fetch(url)
            .then(res => res.json())
            .then(res => {
                return res;
            })
            .catch((e) => {
                console.log("API errore fetching ");
            });
    }
}