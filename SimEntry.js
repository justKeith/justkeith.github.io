export class SimEntry {
    /** name (String) Name of the entry */
    #name;

    /** inputs (Object) Object listing all the inputs this entry requires
      * to function. The object contains attributes with a String value of
      * the form "prev.entryName.entryAttr" or "current.entryName.entryAttr".
      */
    #inputs;

    execute(prev, current) {
        
    }

    getName() {
        return (this.#name);
    }

    getInputs() {
        return (this.#inputs);
    }

    constructor(name, inputs) {
        this.#name = name;
        this.#inputs = inputs;
    }

    static subclasses = {};

    static createFromList(jArray) {
        return new subclasses['const']("Taxes", {}, {});
    }

    static registerSubclass(subclass) {
        SimEntry.subclasses[subclass.classToken] = subclass;
    }
}