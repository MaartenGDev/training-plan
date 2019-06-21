import {WorkoutExerciseDto} from "./WorkoutExerciseDto";

export class WorkoutDto {
    id: number;
    sets: string;
    exercises: WorkoutExerciseDto[] = [];
}
