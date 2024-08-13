const questions = [
    {
        question: "what is 10+10?",
        answers: ["20", "5", "15", "50"],
        correct: 0
    },
    {
        question: "what is 5+5?",
        answers: ["8", "7", "10", "6"],
        correct: 2
    },
    {
        question: "what is 1+1?",
        answers: ["2","3","4","5"],
        correct: 0
    },

];

let currentQuestionIndex = 0;
let score = 0;



const startButton = document.getElementById("start-btn");
const homepage = document.getElementById("homepage");
const quizContainer = document.getElementById("quiz-container");
const questionElement = document.getElementById("question");
const answerButtons = document.querySelectorAll(".answer-btn");
const nextButton = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");
const resultText = document.getElementById("result-text");
const backgroundMusic = document.getElementById("background-music")
const restartButton = document.getElementById("restart-btn");


startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
        nextButton.classList.add("hidden");
    } else {
        showResult();
    }
});
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
    homepage.classList.add("hidden");
    quizContainer.classList.remove("hidden");
    quizContainer.classList.add("visible");
    showQuestion(questions[currentQuestionIndex]);
    backgroundMusic.play();
}

function showQuestion(question) {
    questionElement.textContent = question.question;
    answerButtons.forEach((button, index) => {
        button.textContent = question.answers[index];
        button.classList.remove("correct", "incorrect");
        button.disabled = false;
        button.onclick = () => selectAnswer(index, question.correct);
    });
}

function selectAnswer(selected, correct) {
    answerButtons.forEach((button, index) => {
        button.disabled = true;
        if (index === correct) {
            button.classList.add("correct");
        }
        if (index === selected && selected !== correct) {
            button.classList.add("incorrect");
        }
    });
    if (selected === correct) {
        score++;
    }
    nextButton.classList.remove("hidden");
}
function showResult() {
    quizContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    resultContainer.classList.add("visible");
    resultText.textContent = `You scored ${score} out of ${questions.length}.`;
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;

}

function restartQuiz() {
    resultContainer.classList.remove("visible");
    resultContainer.classList.add("hidden");
    quizContainer.classList.remove("visible");
    currentQuestionIndex = 0;
    score = 0;
    startQuiz();
    backgroundMusic.play();
}


