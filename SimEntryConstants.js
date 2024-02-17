import { SimEntry } from "/SimEntry.js";

export class SimEntryConstants extends SimEntry { 
    #values;

    constructor(name, inputs, values) {
        super(name, inputs);
        this.#values = values;
    }

    static classToken = "const";

    static {
        SimEntry.registerSubclass(this);
    }
}