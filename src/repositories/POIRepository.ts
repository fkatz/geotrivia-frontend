import POI from '../entities/POI';
import UserModule from '@/UserModule';

class POIRepository {
   async getOne(id:number):Promise<POI|null>{
    try {
        return await this.fetchJSON("/api/pois/"+id,"GET");
      } catch (e) {
        console.log(e);
        return null;
      }
   }
   async getAll():Promise<POI[]|null>{
    try {
        return await this.fetchJSON("/api/pois/","GET");
      } catch (e) {
        console.log(e);
        return null;
      }
   }
   async postOne(poi:POI){
    try {
        return await this.fetchJSON("/api/pois/","POST",poi);
      } catch (e) {
        console.log(e);
        return null;
      }
   }   
   async putOne(poi:POI){
    try {
        return await this.fetchJSON("/api/pois/"+poi.id,"PUT",poi);
      } catch (e) {
        console.log(e);
        return null;
      }
   }
   async deleteOne(poi:POI){
    try {
        return await this.fetchJSON("/api/pois/"+poi.id,"DELETE");
      } catch (e) {
        console.log(e);
        return null;
      }
   }
   private async fetchJSON(url:string,method:string, body?:any):Promise<any>{
    let res = await fetch(url, {
        method,
        body: body===undefined?undefined:JSON.stringify(body),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: UserModule.token
        }
      });
      let obj = await res.json();
      console.log(obj);
      return obj;
   }
}
export default new POIRepository();