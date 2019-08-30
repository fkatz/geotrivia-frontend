import POI from './POI';

export default class Hint{
    id?: number;
    content: string;
    poi?:POI;
    constructor(content:string,id?:number){
        this.content = content;
        this.id = id;
    }
}