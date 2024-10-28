const quizData = [
    {
        question: "What is the capital of France?",
        choices: ["Berlin", "Madrid", "Paris", "Lisbon"],
        correct: "Paris"
    },
    {
        question: "Which language runs in a web browser?",
        choices: ["Java", "C", "Python", "JavaScript"],
        correct: "JavaScript"
    },
    {
        question: "What does CSS stand for?",
        choices: ["Central Style Sheets", "Cascading Style Sheets", "Cascading Simple Sheets", "Cars SUVs Sailboats"],
        correct: "Cascading Style Sheets"
    },
    {
        question: "What year was JavaScript launched?",
        choices: ["1996", "1995", "1994", "none of the above"],
        correct: "1995"
    }
];

let currentQuestion = 0;
let score = 0;

const quizContainer = document.getElementById('quiz');
const submitButton = document.getElementById('submit');
const resultContainer = document.getElementById('result');

function loadQuiz() {
    const currentQuiz = quizData[currentQuestion];
    console.log(currentQuiz)
    quizContainer.innerHTML = `
        <div class="question">${currentQuiz.question}</div>
        <ul class="choices">
            ${currentQuiz.choices.map((choice, index) => 
                `<li><input type="radio" name="answer" id="choice${index}" value="${choice}"> 
                <label for="choice${index}">${choice}</label></li>`
            ).join('')}
        </ul>
    `;
}

function getSelectedAnswer(){
    const answers = document.getElementsByName('answer');
    let selectedAnswer;
    
    answers.forEach(answer => {
        if (answer.checked) {
            selectedAnswer = answer.value;
        }
    });
    
    return selectedAnswer;
}

submitButton.addEventListener('click', () => {
    const selectedAnswer = getSelectedAnswer();
    
    if (selectedAnswer) {
        if (selectedAnswer === quizData[currentQuestion].correct) {
            score++;
        }
        
        currentQuestion++;
        
        if (currentQuestion < quizData.length) {
            loadQuiz();
        } 
        else {
            quizContainer.innerHTML = `<h2>You answered ${score} out of ${quizData.length} questions correctly!</h2>`;
            submitButton.style.display = 'none';
        }
    } else {
        alert('Please select an answer before submitting.');
    }
});

loadQuiz();
