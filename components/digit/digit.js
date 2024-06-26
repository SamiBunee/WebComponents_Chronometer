import style from './Styles.js';
import html from './Template.js';
import numbers from './Numbers.js';

class Digit extends HTMLElement {
    constructor(){
        super();
        let shadowRoot = this.attachShadow({mode:'open'});
        shadowRoot.innerHTML = `<style>${style}</style>${html}`;
        this._digitContainer = this.shadowRoot.querySelector('#digit-container');
    }

    connectedCallback(){
        this.number = 0;
        setInterval(() => {
            this.advance(this.number);
        }, 100);
    }

    get number(){
        return parseFloat(this.getAttribute('number'));
    }

    advance(number){
        this.number = number === 9 ? 0: number + 1;
    }

    set number(number){
        this.setAttribute('number', number);
    }

    static get observedAttributes(){
        return ['number'];
    }

    attributeChangedCallback(name, oldNumber, newNumber){
        switch(name) {
            case 'number':
                if (oldNumber != newNumber){
                    this.renderNumber();
                }
        }
    }

    renderNumber(){
        Array.from(this._digitContainer.children).forEach((child) => {
            child.classList.add('white');
        });

        numbers.get(this.number).forEach((identifyer) => {
            this._digitContainer.querySelector('#' + identifyer).classList.remove('white');
        })
    }
}

export default Digit;