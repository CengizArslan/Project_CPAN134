export class QuizManager { //manages questions 
    constructor(questions) {
        this.questions = questions;
        this.currentQuestionIndex = 0;
        this.score = 0;
    }

    getCurrentQuestion() {
        return this.questions[this.currentQuestionIndex];
    }

    checkAnswer(answer) {
        const currentQuestion = this.getCurrentQuestion();
        if (answer === currentQuestion.correct) {
            this.score++;
            return true;
        }
        return false;
    }

    nextQuestion() {
        this.currentQuestionIndex++;
        return this.currentQuestionIndex < this.questions.length;
    }
}
