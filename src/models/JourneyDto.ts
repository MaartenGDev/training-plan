import {WorkshopDto} from "./WorkshopDto";

export class JourneyDto {
    id: number;
    name: string;
    workshops: WorkshopDto[];

    constructor(id: number, name: string, workshops: WorkshopDto[]) {
        this.id = id;
        this.name = name;
        this.workshops = workshops;
    }
}
