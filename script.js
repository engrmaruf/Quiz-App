const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
const timerContainer = document.getElementById('timer');

const modal = document.getElementById("modal");
const closeBtn = document.querySelector(".close-btn");


let currentQuestionIndex = 0;
let correctAnswers = 0;
let timeLeft = 60;
let timerInterval = null;
let questions = [];

async function getQuestions() {
    try {
        const response = await fetch('https://opentdb.com/api.php?amount=10&type=multiple');
        const data = await response.json();
        console.log(data);
        questions = data.results; // assign the questions to the global variable
        return questions;
    } catch (error) {
        console.error(error);
    }
}

function buildQuiz() {
    getQuestions().then((questions) => {
        const output = [];

        questions.forEach((currentQuestion, questionNumber) => {
            const answers = [];

            currentQuestion.incorrect_answers.forEach((answer) => {
                answers.push(
                    `<label>
             <input type="radio" name="question${questionNumber}" value="${answer}">
             ${answer}
           </label>`
                );
            });

            answers.push(
                `<label>
           <input type="radio" name="question${questionNumber}" value="${currentQuestion.correct_answer}">
           ${currentQuestion.correct_answer}
         </label>`
            );

            answers.sort(() => Math.random() - 0.5);

            output.push(
                `
                <div class="question"> ${currentQuestion.question} </div>
         <div class="answers"> ${answers.join('')} </div>
               `
            );
        });

        quizContainer.innerHTML = output.join('');
    });
}

function showResults() {
    clearInterval(timerInterval);

    const answerContainers = quizContainer.querySelectorAll('.answers');

    answerContainers.forEach((answerContainer, index) => {
        const selector = `input[name=question${index}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
        const correctAnswer = questions[index].correct_answer;

        if (userAnswer === correctAnswer) {
            answerContainer.style.color = 'green';
            correctAnswers++;
        } else {
            answerContainer.style.color = 'red';
        }
    });
    modal.style.display = "block";
    resultsContainer.innerHTML = `You got ${correctAnswers} out of ${questions.length} correct!`;
}




closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
    location.reload(true);
});

window.addEventListener("click", function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
        location.reload(true);
    }
});




function updateTimer() {
    timerContainer.innerHTML = ` ${timeLeft}s Left`;

    if (timeLeft === 0) {
        clearInterval(timerInterval);
        modal.style.display = "block";
        resultsContainer.innerHTML = `Sorry your time is over`;
    } else {
        timeLeft--;
    }
}

submitButton.addEventListener('click', showResults);

buildQuiz();

timerInterval = setInterval(updateTimer, 1000);
