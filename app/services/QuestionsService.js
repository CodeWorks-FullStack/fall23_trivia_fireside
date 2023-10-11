import { AppState } from "../AppState.js";
import { Question } from "../models/Question.js";

class QuestionsService {
  removeQuestion() {
    AppState.questions.shift()
    if (AppState.questions.length == 0) {
      this.getQuestions()
    }
    else {
      AppState.emit('questions')
    }
  }
  async getQuestions() {
    // @ts-ignore
    const res = await axios.get('https://opentdb.com/api.php?amount=10&type=multiple')
    console.log('GOT QUESTIONS', res.data);
    const newQuestions = res.data.results.map(questionPOJO => new Question(questionPOJO))
    AppState.questions = newQuestions
  }

}

export const questionsService = new QuestionsService()