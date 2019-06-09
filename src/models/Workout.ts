import {Activity} from "./Activity";

export class Workout {
    id: number;
    name: string;
    activities: Activity[];

    constructor(id: number, name: string, activities: Activity[]){
        this.id = id;
        this.name = name;
        this.activities = activities;
    }
}
