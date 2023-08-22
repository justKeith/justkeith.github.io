import { SimulationRun } from "/SimulationRun.js";

export class Simulation {
    #start = new Date();
    #end = new Date();
    #accounts = [];
    #transactions = [];

    constructor(start, end) {
        this.start = start;
        this.endf = end;
    }

    run() {
        return new SimulationRun();
    }
}