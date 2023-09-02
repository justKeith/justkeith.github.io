export class Base {
    #name;

    constructor(name) {
        this.#name = name;
    }
}

export class Ext extends Base {
    #age;

    constructor(name, age) {
        super(name);
        this.#age = age;
    }
}
