import {WorkoutExercise} from "./WorkoutExercise";

export class Workout {
    id: number;
    sets: string;
    date: Date;
    exercises: WorkoutExercise[];

    constructor(id: number,sets: string, date: Date, exercises: WorkoutExercise[]){
        this.id = id;
        this.sets = sets;
        this.date = date;
        this.exercises = exercises;
    }
}
