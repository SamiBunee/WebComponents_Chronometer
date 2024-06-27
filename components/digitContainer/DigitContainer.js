import style from "./Styles.js";

class DigitContainer extends HTMLElement {
    constructor() {
        super();
        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `<style>${style}</style>` + '<slot></slot>';
        this.updateTime = this.updateTime.bind(this);
    }

    connectedCallback() {
        document.body.addEventListener('updateTime', this.updateTime);
    }

    disconnectedCallback(){
        document.body.removeEventListener('updateTime', this.updateTime);
    }

    updateTime(event){
        let time = this.timeFormatter(event.detail.counter);

        this.querySelector('#tensHours').number = Math.floor(time.hours/10);
        this.querySelector('#unitsHours').number = Math.floor(time.hours%10);

        this.querySelector('#tensMinutes').number = Math.floor(time.minutes/10);
        this.querySelector('#unitsMinutes').number = Math.floor(time.minutes%10);

        this.querySelector('#tensSeconds').number = Math.floor(time.seconds/10);
        this.querySelector('#unitsSeconds').number = Math.floor(time.seconds%10);
        
        this.querySelector('#tensSplitSeconds').number = time.splitSeconds;
        this.querySelector('#unitsSplitSeconds').number = time.milliSeconds;
    }
    
    timeFormatter(counter){
        let hours, minutes, seconds, splitSeconds, milliSeconds;

        milliSeconds = counter % 10;
        splitSeconds = Math.floor((counter % 100) / 10);
        seconds = Math.floor((counter/ 100) % 60);
        minutes = Math.floor((counter/ 100 / 60) % 60);
        hours = Math.floor(counter / 100 / 3600)

        return {hours, minutes, seconds, splitSeconds, milliSeconds}
    }
}

export default DigitContainer;