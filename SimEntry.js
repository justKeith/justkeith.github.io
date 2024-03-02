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

    toJson() {
        var result = {
            token: this.classToken,
            name: this.getName(),
            inputs: this.getInputs()
        };

        return( result );
    }

    constructor(json) {
        this.#name = json.name;
        this.#inputs = json.inputs;
    }

    static subclasses = {};

    static createFromList(jArray) {
        var result = [];

        for(var entry of jArray) {
            result.push( new SimEntry.subclasses[entry.token](entry) );
        }

        return( result );
    }

    static registerSubclass(subclass) {
        SimEntry.subclasses[subclass.classToken] = subclass;
    }
}