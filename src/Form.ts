import { Field } from "./Field";
import { FieldType } from "./FieldType";
import { InputField } from "./InputField";
import { EmailField } from "./EmailField";
import { SelectInputText } from "./SelectInputField";
import { CheckboxField } from "./CheckboxField";
import { textAreaField } from "./TextareaField"
let socket = new WebSocket("ws://localhost:8080");
export class Form {
    fields: Field[];
    formElement: HTMLElement;
    constructor(id: string) {
        this.fields = new Array();
        this.formElement = document.getElementById(id);
        let BTNSET = document.getElementById('Get').addEventListener('Click',() => this.getValue())
        this.fields.push(new InputField('Nazwisko', 'Nazwisko', 'Nazwisko', FieldType.InputBox))
        this.fields.push(new InputField('Imię', 'Imię', 'Imię', FieldType.InputBox))
        this.fields.push(new EmailField('Email', 'Email', 'Email'))
        this.fields.push(new SelectInputText('Wybrany kierunek studiów', 'Wybrany kierunek studiów', 'Wybrany kierunek studiów', ['Lekarz', 'Lekarka', 'Internista', 'Internistka']))
        this.fields.push(new CheckboxField('Czy preferujesz e-learning', 'Czy preferujesz e-learning', 'Czy preferujesz e-learning'))
        this.fields.push(new textAreaField('Uwagi', 'Uwagi', 'Uwagi', FieldType.multiLine))
        this.fields.push(new SelectInputText('Kraj urodzenia', 'Kraj urodzenia', 'Kraj urodzenia', []))

    }
    render(): void {
        for (let i = 0; i < this.fields.length; i++) {
            document.body.append(this.fields[i].label)
            document.body.appendChild(document.createElement('br'))
            document.body.appendChild(this.fields[i].render())
            document.body.appendChild(document.createElement('br'))
        }
    }
    getValue(): void {
        // TODO: pętla wyświetlająca wartości kolejnych pól
        document.getElementById('Get').style.display="block";
        document.getElementById('Set').style.display="none";
        let X = document.getElementById('tabela');
        let Y = document.createElement('tr');
        let Surname = this.fields[0].getValue();
        let Name = this.fields[1].getValue();
        let Email = this.fields[2].getValue();
        let Kierunek = this.fields[3].getValue();
        let elern = this.fields[4].getValue();
        let args = this.fields[5].getValue();
        let country = this.fields[6].getValue();
        let KEY = new Date().getTime();

        const obj = {
            Surname: Surname,
            Name: Name,
            Email: Email,
            Kierunek: Kierunek,
            elern: elern,
            args: args,
            country: country,
            KEY: KEY,
        }
        document.getElementById('tabela').style.display = 'block';
        X.appendChild(Y);
        socket.send(JSON.stringify(obj));

        for (let i = 0; i < this.fields.length; i++) {
            var Z = document.createElement('td');
            Z.append(this.fields[i].getValue())
            Y.appendChild(Z);
        }
        let BTN = document.createElement('button');
        let BTNTD = document.createElement('td');
        BTN.innerText = 'X'
        BTN.setAttribute('class', 'delete')
        Y.setAttribute('id', KEY.toString());
        BTNTD.appendChild(BTN);
        Y.appendChild(BTNTD);
        X.appendChild(Y);
        document.body.append(X);
        BTN.addEventListener('click', () => this.deleteItem(Y))
        let BTNx = document.createElement('button');
        BTNx.setAttribute('class','edit');
        let BTNTE = document.createElement('td');
        BTNx.innerText = 'E'
        BTNx.setAttribute('class', 'edit')
        BTNTE.appendChild(BTNx);
        Y.appendChild(BTNTE);
        X.appendChild(Y);
        document.body.append(X);
        BTNx.addEventListener('click', () => this.edit(KEY.toString()))
        localStorage.setItem(KEY.toString(), JSON.stringify(obj));

    }
    edit(x: string): any {
        document.getElementById('Get').style.display="none";
        document.getElementById('Set').style.display="block";
        const retrievedObject = localStorage.getItem(x);
        let Surname =  document.getElementById(this.fields[0].name) as HTMLFormElement;
        Surname.value=JSON.parse(retrievedObject).Surname;

        let Name =  document.getElementById(this.fields[1].name) as HTMLFormElement;
        Name.value=JSON.parse(retrievedObject).Name;

        let Email =  document.getElementById(this.fields[2].name) as HTMLFormElement;
        Email.value=JSON.parse(retrievedObject).Email;

        let Kierunek =  document.getElementById(this.fields[3].name) as HTMLFormElement;
        Kierunek.value=JSON.parse(retrievedObject).Kierunek;

        let elern =  document.getElementById(this.fields[4].name) as HTMLFormElement;
        elern.value=JSON.parse(retrievedObject).elern;


        let args =  document.getElementById(this.fields[5].name) as HTMLFormElement;
        args.value=JSON.parse(retrievedObject).args;

        let country = document.getElementById(this.fields[6].name) as HTMLFormElement;
        country.value=JSON.parse(retrievedObject).country;

        document.getElementById('Set').addEventListener('click',() => this.change(x))
        
    }
    change(x: string){
        let SurnameEd = this.fields[0].getValue();
        let NameEd = this.fields[1].getValue();
        let EmailEd = this.fields[2].getValue();
        let KierunekEd = this.fields[3].getValue();
        let elernEd = this.fields[4].getValue();
        let argsEd = this.fields[5].getValue();
        let countryEd = this.fields[6].getValue();
        let KEY = x;
        const obj = {
            Surname: SurnameEd,
            Name: NameEd,
            Email: EmailEd,
            Kierunek: KierunekEd,
            elern: elernEd,
            args: argsEd,
            country:countryEd,
            KEY: KEY,
        }
        localStorage.setItem(x, JSON.stringify(obj));
        location.reload();
    }
     loadItems(): void {
        for (let i = 0; i < localStorage.length; i++) {
            let X = document.getElementById('tabela');
            let Y = document.createElement('tr');
            let BTN = document.createElement('input');
            let BTNTD = document.createElement('td');
            BTN.setAttribute('type', 'button')
            BTN.setAttribute('value', 'X')
            BTN.setAttribute('class', 'delete')


            let klucz = localStorage.key(i);

            BTN.setAttribute('id', klucz);
            const retrievedObject = localStorage.getItem(klucz);
            let Surname = document.createElement('td');
            Surname.append(JSON.parse(retrievedObject).Surname);
            let Name = document.createElement('td');
            Name.append(JSON.parse(retrievedObject).Name);
            let Email = document.createElement('td');
            Email.append(JSON.parse(retrievedObject).Email);
            let Kierunek = document.createElement('td');
            Kierunek.append(JSON.parse(retrievedObject).Kierunek);
            let elern = document.createElement('td');
            elern.append(JSON.parse(retrievedObject).elern);
            let args = document.createElement('td');
            args.append(JSON.parse(retrievedObject).args);
            let country = document.createElement('td');
            country.append(JSON.parse(retrievedObject).country);
            Y.appendChild(Surname);
            Y.appendChild(Name);
            Y.appendChild(Email);
            Y.appendChild(Kierunek);
            Y.appendChild(elern);
            Y.appendChild(args);
            Y.appendChild(country);
            BTNTD.appendChild(BTN);
            Y.appendChild(BTNTD);
            X.appendChild(Y);
            document.body.append(X);
            document.getElementById(klucz).addEventListener('click', () => this.deleteItem(BTN))
            let BTNx = document.createElement('button');
        let BTNTE = document.createElement('td');
        BTNx.innerText = 'E'
        BTNx.setAttribute('class', 'edit')
        BTNTE.appendChild(BTNx);
        Y.appendChild(BTNTE);
        X.appendChild(Y);
        document.body.append(X);
        BTNx.addEventListener('click', () => this.edit(klucz))
        document.getElementById('tabela').style.display = 'block';
        }

    }
    deleteItem(Y): void {
        localStorage.removeItem(Y.id);
        location.reload();
    }

}