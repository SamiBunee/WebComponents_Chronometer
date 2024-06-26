import style from "./Styles.js";

class DigitContainer extends HTMLElement {
    constructor() {
        super();
        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `<style>${style}</style>` + '<slot></slot>';
    }
}

export default DigitContainer;