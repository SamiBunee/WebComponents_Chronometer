import style from "./Styles.js";
import html from "./Template.js"

class Dots extends HTMLElement {
    constructor() {
        super();
        let shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `<style>${style}</style>${html}`;
    }
}

export default Dots; 