import { SimulationRun } from "/SimulationRun.js";

export class Simulation {
    #start = new Date();
    #end = new Date();
    #accounts = [];
    #transactions = [];

    constructor(start, end) {
        this.#start = start;
        this.#end = end;

        this.#start.setHours(12, 0, 0);
        this.#end.setHours(12, 0, 0);
    }

    run() {
        var counter = new Date(this.start);
        var run = new SimulationRun(this);

        do {
            run.step(counter);
            
            counter = new Date( counter.getTime() + (24 * 60 * 60 * 1000) );
        } while(counter.getTime() < this.#end.getTime());
    }
}