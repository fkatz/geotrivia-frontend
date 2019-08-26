import POI from '../entities/POI';
import Hint from '../entities/Hint'
import UserModule from '@/UserModule';

class HintRepository {
  async getOne(poiId: number, id: number): Promise<Hint | null> {
    try {
      return await this.fetchJSON("/api/pois/" + poiId + "/hints/" + id, "GET");
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  async getAll(poiId: number): Promise<Hint[] | null> {
    try {
      return await this.fetchJSON("/api/pois/" + poiId + "/hints/", "GET");
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  async postOne(poiId: number, hint: Hint): Promise<Hint | null> {
    try {
      let response = await this.fetchJSON("/api/pois/" + poiId + "/hints/", "POST", hint);
      if ('id' in response) {
        return response;
      } else throw new Error("Invalid response");
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  async putOne(poiId: number, hint: Hint): Promise<Hint | null> {
    try {
      let editedHint = new Hint(hint.description, hint.id);
      let response = await this.fetchJSON("/api/pois/" + poiId + "/hints/" + hint.id, "PUT", editedHint);
      if ('id' in response) {
        return response;
      } else throw new Error("Invalid response");
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  async deleteOne(poiId: number, hint: Hint) {
    try {
      return await this.fetchJSON("/api/pois/" + poiId + "/hints/" + hint.id, "DELETE");
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  private async fetchJSON(url: string, method: string, body?: any): Promise<any> {
    let res = await fetch(url, {
      method,
      body: body === undefined ? undefined : JSON.stringify(body),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: UserModule.token
      }
    });
    return await res.json();
  }
}
export default new HintRepository();