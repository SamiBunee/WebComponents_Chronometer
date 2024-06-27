import style from "./Style.js";

class Chrono extends HTMLElement{
    constructor(){
        super();
        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `<style>${style}</style>`;

        let slot = document.createElement('slot');

        this.buttonStartPause = document.createElement('wc-button');
        this.buttonRestart = document.createElement('wc-button');

        let buttonContainer = document.createElement('div');
        buttonContainer.classList.add('buttons-content');

        shadowRoot.appendChild(slot);
        buttonContainer.appendChild(this.buttonStartPause);
        buttonContainer.appendChild(this.buttonRestart);
        shadowRoot.appendChild(buttonContainer);

        this.counter = 0;

        this.clickStartPause = this.clickStartPause.bind(this);
        this.clickRestart = this.clickRestart.bind(this);
    }

    connectedCallback(){
        this.buttonStartPause.title = 'Start';
        this.buttonRestart.title = 'Restart';

        this.buttonStartPause.addEventListener ('customClick', this.clickStartPause);
        this.buttonRestart.addEventListener ('customClick', this.clickRestart);
    }

    clickStartPause(event){
        if (event.detail.title === 'Start') {
            this.interval = setInterval(() => {
                this.counter++;
                this.dispatchEvent(new CustomEvent('updateTime', {
                    bubbles: true,
                    detail: {
                        counter: this.counter
                    }
                }))
            }, 10);
            this.buttonStartPause.title = 'Pause';
        } else {
            clearInterval(this.interval);
            this.buttonStartPause.title = 'Start';
        }
        event.stopPropagation();
    }

    clickRestart(event){
        this.counter = 0;
        this.dispatchEvent(new CustomEvent('updateTime', {
            bubbles: true,
            detail: {
                counter: this.counter
            }
        }))
        event.stopPropagation();
    }
}

export default Chrono;