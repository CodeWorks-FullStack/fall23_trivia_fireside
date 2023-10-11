export class Question {
  constructor (data) {
    this.category = data.category
    this.difficulty = data.difficulty
    this.question = data.question
    this.correctAnswer = data.correct_answer
    this.answers = data.incorrect_answers
  }

  get ActiveTemplate() {
    return `
    <div class="col-12 text-center">
      <h2>${this.difficulty.toUpperCase()} ${this.category}</h2>
      <h2>${this.question}</h2>
      <div class="row">
       ${this.AnswerButtons}
      </div>
    </div>
    `
  }



  get AnswerButtons() {
    const randomIndex = Math.floor(Math.random() * (this.answers.length + 1))
    this.answers.splice(randomIndex, 0, this.correctAnswer)
    let content = ''

    this.answers.forEach(answer => content += `
    <div class="col-6 text-center mb-3">
      <button onclick="app.QuestionsController.answerQuestion('${answer}')" class="fs-1 btn btn-success">${answer}</button>
    </div>
    `);

    return content
  }
}

const data = {
  "category": "History",
  "type": "multiple",
  "difficulty": "easy",
  "question": "King Henry VIII was the second monarch of which European royal house?",
  "correct_answer": "Tudor",
  "incorrect_answers": [
    "York",
    "Stuart",
    "Lancaster"
  ]
}