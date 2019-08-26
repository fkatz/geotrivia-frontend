import POI from './POI';
import Answer from './Answer';

export default class Question{
    id?: number;
    content: string;
    poi?:POI;
    answers:Answer[] = [];
    constructor(content:string,id?:number){
        this.content = content;
        this.id = id;
    }
}