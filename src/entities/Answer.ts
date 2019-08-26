import Question from './Question';

export default class Answer{
    id?: number;
    content: string;
    isCorrect:boolean;
    question?:Question;
    constructor(content:string,isCorrect:boolean,id?:number){
        this.content = content;
        this.isCorrect = isCorrect;
        this.id = id;
    }
}