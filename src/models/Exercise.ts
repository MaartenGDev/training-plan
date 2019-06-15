import {Workout} from "./Workout";
import {Category} from "./Category";
import {Workshop} from "./Workshop";

export class Exercise {
    id: number;
    name: string;
    description: string;
    category: Category;
    imagePath: string;
    sets: string;
    lastPerformed: Date = new Date();
    workouts: Workout[] = [];
    workshops: Workshop[] = [];

    constructor(id: number,name: string, description: string, category: Category, imagePath: string, sets: string, lastPerformed: Date, workouts: Workout[], workshops: Workshop[]){
        this.id = id;
        this.name = name;
        this.description = description;
        this.category = category;
        this.sets = sets;
        this.imagePath = imagePath;
        this.lastPerformed = lastPerformed;
        this.workouts = workouts;
        this.workshops = workshops;
    }
}
