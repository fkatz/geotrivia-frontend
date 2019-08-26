import POI from '../entities/POI';
import Question from '../entities/Question'
import UserModule from '@/UserModule';

class QuestionRepository {
   async getOne(poiId:number,id:number):Promise<Question|null>{
    try {
        return await this.fetchJSON("/api/pois/"+poiId+"/questions/"+id,"GET");
      } catch (e) {
        console.log(e);
        return null;
      }
   }
   async getAll(poiId:number):Promise<Question[]|null>{
    try {
        return await this.fetchJSON("/api/pois/"+poiId+"/questions/","GET");
      } catch (e) {
        console.log(e);
        return null;
      }
   }
   async postOne(poiId:number,question:Question){
    try {
        return await this.fetchJSON("/api/pois/"+poiId+"/questions/","POST",question);
      } catch (e) {
        console.log(e);
        return null;
      }
   }
   async putOne(poiId:number,question:Question){
    try {
      let editedQuestion = new Question(question.content,question.id);
        return await this.fetchJSON("/api/pois/"+poiId+"/questions/"+question.id,"PUT",editedQuestion);
      } catch (e) {
        console.log(e);
        return null;
      }
   }
   async deleteOne(poiId:number,question:Question){
    try {
        return await this.fetchJSON("/api/pois/"+poiId+"/questions/"+question.id,"DELETE");
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
      return await res.json();
   }
}
export default new QuestionRepository();