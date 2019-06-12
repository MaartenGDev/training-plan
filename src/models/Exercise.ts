import {Workout} from "./Workout";
import {Workshop} from "./Workshop";
import {Category} from "./Category";

export class Exercise {
    id: number;
    name: string;
    description: string;
    category: Category;
    imagePath: string;
    sets: string;
    lastPerformed: Date = new Date();
    workouts: Workout[] = [];
    usedInWorkshops: Workshop[] = [];

    constructor(id: number,name: string, description: string, category: Category, imagePath: string, sets: string, lastPerformed: Date, workouts: Workout[], usedInWorkshops: Workshop[]){
        this.id = id;
        this.name = name;
        this.description = description;
        this.category = category;
        this.sets = sets;
        this.imagePath = imagePath;
        this.lastPerformed = lastPerformed;
        this.workouts = workouts;
        this.usedInWorkshops = usedInWorkshops;
    }
}
