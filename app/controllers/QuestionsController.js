import { AppState } from "../AppState.js";
import { questionsService } from "../services/QuestionsService.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";

function _drawActiveQuestion() {
  const activeQuestion = AppState.questions[0]
  setHTML('activeQuestion', activeQuestion.ActiveTemplate)
}

export class QuestionsController {
  constructor () {
    console.log('LOADED');
    this.getQuestions()

    AppState.on('questions', _drawActiveQuestion)
  }

  async getQuestions() {
    try {
      await questionsService.getQuestions()
    } catch (error) {
      console.error(error);
      Pop.error(error)
    }
  }

  answerQuestion(userAnswer) {
    const activeQuestion = AppState.questions[0]
    const answeredCorrectly = activeQuestion.correctAnswer == userAnswer

    answeredCorrectly ?
      Pop.success(`${userAnswer} was correct!`)
      :
      Pop.error(`${userAnswer} was incorrect, ${activeQuestion.correctAnswer} is the correct answer`)

    questionsService.removeQuestion()
  }
}