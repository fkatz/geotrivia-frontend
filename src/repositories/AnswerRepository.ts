import POI from '../entities/POI';
import Question from '../entities/Question'
import Answer from '../entities/Answer'
import UserModule from '@/UserModule';

class AnswerRepository {
  async getOne(poiId: number, questionId: number, id: number): Promise<Answer | null> {
    try {
      let response = await this.fetchJSON("/api/pois/" + poiId + "/questions/" + questionId + "/answers/" + id, "GET");
      if ('id' in response) {
        return response;
      } else throw new Error("Invalid response");
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  async getAll(poiId: number, questionId: number): Promise<Answer[] | null> {
    try {
      return await this.fetchJSON("/api/pois/" + poiId + "/questions/" + questionId + "/answers/", "GET");
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  async postOne(poiId: number, questionId: number, answer: Answer): Promise<Answer | null> {
    try {
      let response = await this.fetchJSON("/api/pois/" + poiId + "/questions/" + questionId + "/answers/", "POST", answer);
      if ('id' in response) {
        return response;
      } else throw new Error("Invalid response");
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  async putOne(poiId: number, questionId: number, answer: Answer): Promise<Answer | null> {
    try {
      let editedAnswer = new Answer(answer.content, answer.isCorrect, answer.id);
      let response = await this.fetchJSON("/api/pois/" + poiId + "/questions/" + questionId + "/answers/" + answer.id, "PUT", editedAnswer);
      if ('id' in response) {
        return response;
      } else throw new Error("Invalid response");
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  async deleteOne(poiId: number, questionId: number, answer: Answer) {
    try {
      return await this.fetchJSON("/api/pois/" + poiId + "/questions/" + questionId + "/answers/" + answer.id, "DELETE");
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
export default new AnswerRepository();