import {Form} from "./Form";
import './styles/style.scss';

document.addEventListener('DOMContentLoaded', () => new App())
class App{
    constructor(){
        let form = new Form('2')
        window.addEventListener('load', () => {
            form.render();
            form.loadItems();
        })
        document.getElementById("Get").addEventListener("click",() => form.getValue())
    }

}
