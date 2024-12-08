import { questions } from './questions.js';
import { QuizManager } from './manager.js';

// Initialize quiz manager with questions
const quizManager = new QuizManager(questions);

// Document Object Model elements
const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answers');
const scoreElement = document.getElementById('score');
const nextBtn = document.getElementById('nextBtn');

// Display the current question and answers
function showQuestion() {
    const currentQuestion = quizManager.getCurrentQuestion(); // Get current question
    questionElement.textContent = currentQuestion.question; // Display the question
    answersElement.innerHTML = ''; // Clear previous answers

    // Generate buttons for each answer
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button'); // Create a button for each answer
        button.textContent = answer; // Set button text
        button.addEventListener('click', () => checkAnswer(answer)); // Check answer on click
        answersElement.appendChild(button); // Append button to the answers section
    });

    nextBtn.disabled = true; // Disable next button until an answer is selected
}

// Event listener for the Next Question button
nextBtn.addEventListener('click', () => {
    if (quizManager.nextQuestion()) { // If there are more questions
        showQuestion(); // Show the next question
    } else {
        showScore(); // Otherwise, show the final score
    }
});

// Check if the answer is correct and update the score
function checkAnswer(answer) {
    const correct = quizManager.checkAnswer(answer); // Check if the answer is correct
    if (correct) {
        alert('Correct'); // Alert if the answer is correct
    } else {
        alert('Wrong'); // Alert if the answer is wrong
    }
    updateScore(); // Update the score display
    nextBtn.disabled = false; // Enable next button
}

// Update the score display
function updateScore() {
    scoreElement.textContent = `Score: ${quizManager.score}`; // Display the current score
}

// Show final score when quiz is finished
function showScore() {
    questionElement.textContent = `Quiz Finished! Your final score is: ${quizManager.score}/3`; // Display final score
    answersElement.innerHTML = ''; // Clear answers section
    nextBtn.style.display = 'none'; // Hide the next button
}

// Start the quiz by showing the first question
showQuestion();
