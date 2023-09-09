class Account {
    #name;
    #balanceDate;
    #balance;
    #history = [];

    constructor(name, balance) {
        // For our account class and it's sub-classes they must each provide a 
        // constructor that can act as a copy constructor.
        if (name instanceof Account) {
            var original = name;

            this.#name = original.getName();
            this.#balance = original.getBalance();
        } else {
            this.#name = name;
            this.#balance = balance;
        }
    }

    // A history entry is at minimum is required to have a balanceDate and a balance. All
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

    // When starting a simulation run we use the copy constructor to create a new instance
    // so that we can retain the original and reuse it for the next run.
    start(startDate) {
        var result = new FixedInterestAccount(this);

        result.addHistory({
            balanceDate: startDate,
            balance: this.getBalance()
        })

        return(result);
    }

    step(stepDate) {
        if (stepDate.getMonth() > this.getBalanceDate().getMonth()) {
            // TODO compute new balance
            var interest = ((this.getBalance() * this.#rate) / 12).toFixed(2); 

            // TODO add history
            this.addHistory( { balanceDate: stepDate, balance: (this.getBalance() + interest), action: 'interest' })
        }
    }

    deposit(depositDate, amount) {
        this.addHistory( { balanceDate: depositDate, balance: (this.getBalance() + amount), action: 'deposit' })
    }

    withdraw(withdrawalDate, amount) {
        this.addHistory( { balanceDate: withdrawalDate, balance: (this.getBalance() - amount), action: 'withdrawal' })
    }

    getRate() {
        return (this.#rate);
    }
}


// A account that tracks a market so the return varies about a mean.
export class InvestmentAccount extends Account {
    #mean = 0.001;
    #std  = 0.001;

    constructor(name, balance, mean, std) {
        if (name instanceof Account) {
            var original = name;

            super(original);
            this.#mean = original.getMean();
            this.#std  = original.getStd();
        } else {
            super(name, balance);

            this.#mean = mean;
            this.#std  = std;
        }
    }

    // When starting a simulation run we use the copy constructor to create a new instance
    // so that we can retain the original and reuse it for the next run.
    start(startDate) {
        var result = new InvestmentAccount(this);

        result.addHistory({
            balanceDate: startDate,
            balance: this.getBalance()
        })

        return(result);
    }

    step(stepDate) {
        if (stepDate.getMonth() > this.getBalanceDate().getMonth()) {
            // TODO compute new balance
            var newBalance = util.projectValue(this.getBalance(), this.getMean(), this.getStd());

            // TODO add history
            this.addHistory( { balanceDate: stepDate, balance: newBalance, action: 'return' });
        }
    }

    deposit(depositDate, amount) {
        this.addHistory( { balanceDate: depositDate, balance: (this.getBalance() + amount), action: 'deposit' })
    }

    withdraw(withdrawalDate, amount) {
        this.addHistory( { balanceDate: withdrawalDate, balance: (this.getBalance() - amount), action: 'withdrawal' })
    }

    getMean() {
        return (this.#mean);
    }

    getStd() {
        return (this.#std);
    }
}