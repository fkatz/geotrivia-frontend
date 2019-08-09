export default class POI{
    id?: number;
    name: string;
    lat: number;
    lng: number;
    constructor(name:string,lat:number,lng:number,id?:number){
        this.name = name;
        this.lat = lat;
        this.lng = lng;
        this.id = id;
    }
}