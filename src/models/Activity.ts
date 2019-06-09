export class Activity {
    id: number;
    name: string;
    lastPerformed: Date;

    constructor(id: number,name: string, lastPerformed: Date){
        this.id = id;
        this.name = name;
        this.lastPerformed = lastPerformed;
    }
}
