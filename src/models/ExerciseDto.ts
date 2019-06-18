import {WorkoutDto} from "./WorkoutDto";
import {CategoryDto} from "./CategoryDto";
import {WorkshopDto} from "./WorkshopDto";

export class ExerciseDto {
    id: number;
    name: string;
    description: string;
    category: CategoryDto;
    imagePath: string;
    sets: string;
    lastPerformed: Date = new Date();
    workouts: WorkoutDto[] = [];
    workshops: WorkshopDto[] = [];

    constructor(id: number, name: string, description: string, category: CategoryDto, imagePath: string, sets: string, lastPerformed: Date, workouts: WorkoutDto[], workshops: WorkshopDto[]){
        this.id = id;
        this.name = name;
        this.description = description;
        this.category = category;
        this.sets = sets;
        this.imagePath = imagePath;
        this.lastPerformed = lastPerformed;
        this.workouts = workouts;
        this.workshops = workshops;
    }
}
