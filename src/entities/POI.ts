import Hint from './Hint';

export default class POI{
    id?: number;
    name: string;
    lat: number;
    lng: number;
    hints:Hint[] = [];
    constructor(name:string,lat:number,lng:number,id?:number){
        this.name = name;
        this.lat = lat;
        this.lng = lng;
        this.id = id;
    }
}