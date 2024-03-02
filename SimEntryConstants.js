import { SimEntry } from "/SimEntry.js";

export class SimEntryConstants extends SimEntry { 
    #values;

    getValues() {
        return (this.#values);
    }

    toJson() {
        var result = super.toJson();

        result.value = getValues();

        return( result );
    }

    constructor(json) {
        super(json);

        this.#values = json.values | {};
    }

    static classToken = "const";

    static {
        SimEntry.registerSubclass(this);
    }
}