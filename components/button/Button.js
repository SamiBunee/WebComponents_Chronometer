import style from "./Styles.js";

class Button extends HTMLElement {
    constructor() {
        super();
        let shadowRoot = this.attachShadow({mode: 'open'});
        this.htmlElement = document.createElement('button');
        shadowRoot.innerHTML = `<style>${style}</style>`;
        shadowRoot.appendChild(this.htmlElement);
    }

    connectedCallback() {
        this.addEventListener('click', (event) => {
            event.stopPropagation();
            event.preventDefault();
            this.dispatchEvent(new CustomEvent('customClick', {
                detail: {
                    title: this.title
                },
                bubbles: true,
                composed: true
            }))
        })
    }

    get title(){
        return this.getAttribute('title');
    }

    set title(title){
        this.setAttribute('title', title);
    }

    static get observedAttributes(){
        return ['title'];
    }

    attributeChangedCallback(name, oldValue, newValue){
        switch (name){
            case 'title':
                this.updateHtmlElement(oldValue, newValue);
        }
    }

    updateHtmlElement(oldValue, newValue){
        if(oldValue != newValue){
            this.htmlElement.innerHTML = newValue;
        }
    }
}

export default Button;