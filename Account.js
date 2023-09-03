class Account {
    #name;
    #balanceDate;
    #balance;
    #history = [];

    constructor(name, balance) {
        if (name instanceof Account) {
            var original = name;

            this.#name = original.getName();
            this.#balance = original.getBalance();
        } else {
            this.#name = name;
            this.#balance = balance;
        }
    }

    // A history entry is at minimum required to have a balanceDate and a balance. All
    // history is frozen so it can't be altered and the getHistory method can simply 
    // return entries safely.
    addHistory(entry) {
        if (entry.balanceDate && (entry.balance !== undefined)) {
            entry = Object.freeze(entry);
            this.#history.push(entry);
            this.#balanceDate = entry.balanceDate;
            this.#balance = entry.balance;
        } else {
            throw "invalid call to addHistory. Either balanceDate or balance is missing " + JSON.stringify(entry) +")"
        }
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

    getHistory(index) {
        var entry = this.#history[index];

        return (entry);
    }
}

// A account that pays a fixed interst the first day of each month.
export class FixedInterestAccount extends Account {
    #rate = 0.001;

    constructor(name, balance, rate) {
        if (name instanceof Account) {
            var original = name;

            super(original);
            this.#rate = original.getRate();
        } else {
            super(name, balance);

            this.#rate = rate;
        }
    }

    start(startDate) {
        var result = new FixedInterestAccount(this);

        result.addHistory({
            balanceDate: startDate,
            balance: this.getBalance()
        })
    }

    step(date) {
    }

    getRate() {
        return (this.#rate);
    }
}