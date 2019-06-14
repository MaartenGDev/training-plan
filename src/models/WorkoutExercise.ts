import {Workout} from "./Workout";
import {Workshop} from "./Workshop";
import {Category} from "./Category";
import {Exercise} from "./Exercise";

export class WorkoutExercise extends Exercise {
    dateTime: Date;

    constructor(id: number, name: string, description: string, category: Category, imagePath: string, sets: string, lastPerformed: Date, workouts: Workout[], usedInWorkshops: Workshop[], dateTime: Date) {
        super(id, name, description, category, imagePath, sets, lastPerformed, workouts, usedInWorkshops);
        this.dateTime = dateTime;
    }
}
