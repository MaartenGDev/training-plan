import {WorkoutDto} from "./WorkoutDto";
import {WorkshopDto} from "./WorkshopDto";
import {CategoryDto} from "./CategoryDto";
import {ExerciseDto} from "./ExerciseDto";

export class WorkoutExerciseDto extends ExerciseDto {
    dateTime: string;

    constructor(id: number, name: string, description: string, category: CategoryDto, imagePath: string, sets: string, lastPerformed: Date, workouts: WorkoutDto[], usedInWorkshops: WorkshopDto[], dateTime: string) {
        super(id, name, description, category, imagePath, sets, lastPerformed, workouts, usedInWorkshops);
        this.dateTime = dateTime;
    }
}
