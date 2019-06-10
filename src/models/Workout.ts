import {Workshop} from "./Workshop";

export class Workout {
    id: number;
    sets: string;
    date: Date;

    constructor(id: number,sets: string, date: Date){
        this.id = id;
        this.sets = sets;
        this.date = date;
    }
}
