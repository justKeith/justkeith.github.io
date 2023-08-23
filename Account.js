export class Account {
    #name;
    #now
    #balance;
    #history = [];

    constructor(name, balance) {
        this.#name = name;
        this.#balance = balance;
    }

    getBalance(index) {
        if (index == undefined) {
            return( this.#balance );
        } else if (index == 0) {
            return( this.#balance );
        }
    }

    getChange(index) {
        if (index == undefined) {
            return( { when: this.#now, balance: this.#balance } );
        } else if (index == 0) {
            return( { when: this.#now, balance: this.#balance } );
        } else if (index > 0) {
            // Return stuff from history
        } // if index a date get the balnce on that date.
    }
}

class FixedInterestAccount extends Account {
    #rate = 0.001; 

    constructor(name, balance, rate) {
        super(name, balance);

        this.#rate = rate;
    }

    step(date) {
        if (this.#now == null) {
            // First call so we need to start history
        } else if ( date.getMonth() != this.#now.getMonth())  {
            // We need to track history

            // New month so we compute interst
        }

        this.#now = date;
    }
}