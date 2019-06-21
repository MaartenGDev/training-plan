import {WorkoutDto} from "./WorkoutDto";
import {CategoryDto} from "./CategoryDto";
import {WorkshopDto} from "./WorkshopDto";
import Dto from "./Dto";

export class ExerciseDto extends Dto {
    id: number;
    name: string;
    description: string;
    category: CategoryDto;
    imagePath: string;
    sets: string;
    lastPerformed: Date = new Date();
    workouts: WorkoutDto[] = [];
    workshops: WorkshopDto[] = [];
}
