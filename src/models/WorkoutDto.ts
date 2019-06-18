import {WorkoutExerciseDto} from "./WorkoutExerciseDto";

export class WorkoutDto {
    id: number;
    sets: string;
    date: Date;
    exercises: WorkoutExerciseDto[];

    constructor(id: number,sets: string, exercises: WorkoutExerciseDto[]){
        this.id = id;
        this.sets = sets;
        this.date = exercises[0].dateTime;
        this.exercises = exercises;
    }
}
