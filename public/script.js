
let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

async function fetchQuestions() {
    try {
        const response = await fetch('http://localhost:3000/questions');
        questions = await response.json();
        displayQuestion();
    } catch (error) {
        document.getElementById('question').innerText = 'Error loading quiz!';
    }
}

function displayQuestion() {
    if (currentQuestionIndex >= questions.length) {
        showResults();
        return;
    }

    const questionObj = questions[currentQuestionIndex];
    document.getElementById('question').innerText = questionObj.question;
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = "";

    questionObj.options.forEach(option => {
        const btn = document.createElement('button');
        btn.innerText = option;
        btn.classList.add('option');
        btn.onclick = () => checkAnswer(btn, option);
        optionsContainer.appendChild(btn);
    });
}

function checkAnswer(button, selectedOption) {
    const correctAnswer = questions[currentQuestionIndex].answer;
    if (selectedOption === correctAnswer) {
        button.classList.add('correct');
        score++;
    } else {
        button.classList.add('wrong');
    }

    document.querySelectorAll('.option').forEach(btn => btn.onclick = null);
}

function nextQuestion() {
    currentQuestionIndex++;
    displayQuestion();
}

function showResults() {
    document.getElementById('question').innerText = `Quiz Finished! Your Score: ${score} / ${questions.length}`;
    document.getElementById('options').innerHTML = "";

    const playerName = prompt("Enter your name for the leaderboard:");
    if (playerName) {
        leaderboard.push({ name: playerName, score: score });
        leaderboard.sort((a, b) => b.score - a.score); // Sort by highest score
        localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
    }

    displayLeaderboard();
}

function displayLeaderboard() {
    const leaderboardContainer = document.createElement("div");
    leaderboardContainer.classList.add("leaderboard");
    leaderboardContainer.innerHTML = "<h2>Leaderboard</h2>";

    leaderboard.forEach((player, index) => {
        const entry = document.createElement("p");
        entry.innerText = `${index + 1}. ${player.name} - ${player.score}`;
        leaderboardContainer.appendChild(entry);
    });

    document.body.appendChild(leaderboardContainer);
}

fetchQuestions();
