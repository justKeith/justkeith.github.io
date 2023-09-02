export class Account {
    #name;
    #balanceDate;
    #balance;

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

    step(date) {
        if (this.#now == null) {
            // First call so we simply record this as the balnce date
        } else if (date.getMonth() != this.#now.getMonth()) {
            // New month so we compute interst
        }

        this.#now = date;
    }
}