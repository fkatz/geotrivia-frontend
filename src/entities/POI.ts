import Hint from './Hint';
import Question from './Question';

export default class POI{
    id?: number;
    name: string;
    lat: number;
    lng: number;
    hints:Hint[] = [];
    questions:Question[] = [];
    constructor(name:string,lat:number,lng:number,id?:number){
        this.name = name;
        this.lat = lat;
        this.lng = lng;
        this.id = id;
    }
}