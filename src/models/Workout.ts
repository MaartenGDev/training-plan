import {WorkoutExercise} from "./WorkoutExercise";

export class Workout {
    id: number;
    sets: string;
    date: Date;
    exercises: WorkoutExercise[];

    constructor(id: number,sets: string, exercises: WorkoutExercise[]){
        this.id = id;
        this.sets = sets;
        this.date = exercises[0].dateTime;
        this.exercises = exercises;
    }
}
