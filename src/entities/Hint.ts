import POI from './POI';

export default class Hint{
    id?: number;
    description: string;
    poi?:POI;
    constructor(description:string,id?:number){
        this.description = description;
        this.id = id;
    }
}