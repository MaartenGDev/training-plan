import {ExerciseDto} from "./ExerciseDto";

export class WorkshopDto {
    id: number;
    name: string;
    exercises: ExerciseDto[];

    constructor(id: number, name: string, exercises: ExerciseDto[]) {
        this.id = id;
        this.name = name;
        this.exercises = exercises;
    }
}
