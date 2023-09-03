export class Account {
    #name;
    #balanceDate;
    #balance;
    #history;

    constructor(name, balance) {
        this.#name = name;
        this.#balance = balance;
    }

    getName() {
        return (this.#name);
    }

    getBalanceDate() {
        return (this.#balanceDate);
    }

    getBalance() {
        return (this.#balance);
    }
}

// A account that pays a fixed interst the first day of each month.
export class FixedInterestAccount extends Account {
    #rate = 0.001;

    constructor(name, balance, rate) {
        super(name, balance);

        this.#rate = rate;
    }

    start(date) {
        var result = Object.create(this);
        this.#balanceDate = date;
        this.#history = [];
    }

    step(date) {
    }

    getRate() {
        return (this.#rate);
    }
}