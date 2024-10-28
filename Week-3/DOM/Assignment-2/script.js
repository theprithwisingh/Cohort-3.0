let questions = [];//feed data from question.json
let currentQuestionIndex = 0;
let score = 0;

const quizContainer = document.getElementById('quiz');
const scoreContainer = document.getElementById('score');
const finalScore = document.getElementById('final-score');
const progressBar = document.querySelector('.progress');


fetch('data/questions.json')
  .then(response => response.json())
  .then(data => {
    questions = data;
    console.log(questions);

    loadQuestion(); // Start the quiz after data is loaded
  })
  .catch(error => console.error('Error loading questions:', error));

function loadQuestion(){
    const currentQuestion = questions[currentQuestionIndex];

    quizContainer.innerHTML = `
       <div class="question">${currentQuestion.question}</div>
       <div class="options">
         <button onclick="selectAnswer('A')">${currentQuestion.A}</button>
         <button onclick="selectAnswer('B')">${currentQuestion.B}</button>
         <button onclick="selectAnswer('C')">${currentQuestion.C}</button>
         <button onclick="selectAnswer('D')">${currentQuestion.D}</button>
       </div>
    `
    updateProgressBar();
}
function selectAnswer(selectedOption){
    const currentQuestion = questions[currentQuestionIndex];
    if(selectedOption===currentQuestion.answer){
      score++;
    }
    currentQuestionIndex++;

    if(currentQuestionIndex<questions.length){
        loadQuestion();
    }
    else{
        showScore();
    }
}
function updateProgressBar(){
    const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;
    console.log(progressPercent);
    progressBar.style.width=`${progressPercent}%`
}
function showScore(){
    quizContainer.style.display = 'none';
    scoreContainer.style.display ='block';
    finalScore.textContent = `${score} out of ${questions.length}`
}