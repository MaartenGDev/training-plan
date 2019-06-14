import {Exercise} from "./Exercise";

export class Workshop {
    id: number;
    name: string;
    exercises: Exercise[];

    constructor(id: number, name: string, exercises: Exercise[]) {
        this.id = id;
        this.name = name;
        this.exercises = exercises;
    }
}
