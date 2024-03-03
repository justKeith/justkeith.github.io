class SimEntryElement extends HTMLElement {
    static observedAttributes = ["color", "size"];
  
    constructor() {
      // Always call super first in constructor
      super();

      const template = document.getElementById(
        "element-details-template",
      ).content;

      const shadowRoot = this.attachShadow({ mode: "open" });
      shadowRoot.appendChild(template.cloneNode(true));
    }
  
    connectedCallback() {
      console.log("Custom element added to page.");
    }
  
    disconnectedCallback() {
      console.log("Custom element removed from page.");
    }
  
    adoptedCallback() {
      console.log("Custom element moved to new page.");
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      console.log(`Attribute ${name} has changed.`);
    }
  }
  
  customElements.define("SimEntry-element", SimEntryElement);