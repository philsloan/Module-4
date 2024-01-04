// script.js 

let questions = [ 
	{ 
		prompt: `Who is the bass player for the band Rush?`, 
		options: [ 
			"Flea", 
			"Peanut", 
			"Geddy Lee", 
			"Randy Jackson", 
		], 
		answer: "Geddy Lee", 
	}, 

	{ 
		prompt: `What band does Jimmy Page play guitar for?`, 
		options: [ 
			"Shed Zepplin", 
			"Fred Shepplin", 
			"Zed Lepplin", 
			"Led Zepplin", 
		], 
		answer: "Led Zepplin", 
	}, 

	{ 
		prompt: `What band did Lemmy play for?`, 
		options: [ 
			"Fred Zepplin", 
			"MotorHead", 
			"Olivia Rodrigo", 
			"KISS", 
		], 
		answer: "MotorHead", 
	}, 

	{ 
		prompt: `What band was Fred Durst apart of?`, 
		options: [
			 "Public Enemy",
			 "Red Hot Chili Peppers",
			 "Limp Bizkit", 
			 "Weezer"
			], 
		answer: "Limp Bizkit", 
	}, 

	{ 
		prompt: `who played lead guitar in "The Jimi Hendrix Experiment"?`, 
		options: [ 
			"Paul Simon", 
			"Paul Stanley", 
			"Paula Abdul", 
			"Jimi Hendrix", 
		], 
		answer: "Jimi Hendrix", 
	}, 

	{ 
		prompt: `What bass player was made famous by James Brown?`, 
		options: [ 
			"Randy Jackson", 
			"Les Claypool", 
			"Bootsy Collins", 
			"Gene Simmons", 
		], 
		answer: "Bootsy Collins", 
	}, 

	{ 
		prompt: `What famous drummer looks exactly like Will Ferrel?`, 
		options: [ 
			"Phil Collins", 
			"Ginger Baker", 
			"Keith Moon", 
			"Chad Smith", 
		], 
		answer: "Chad Smith", 
	}, 

	{ 
		prompt: `What's the most famous band named after a misspelled bug?`, 
		options: [ 
			"The Beatles", 
			"The Wiggles", 
			"The Aquabats", 
			"Mastodon", 
		], 
		answer: "The Beatles", 
	}, 
]; 

// Get Dom Elements 

let questionsEl = 
	document.querySelector( 
		"#questions"
	); 
let timerEl = 
	document.querySelector("#timer"); 
let choicesEl = 
	document.querySelector("#options"); 
let submitBtn = document.querySelector( 
	"#submit-score"
); 
let startBtn = 
	document.querySelector("#start"); 
let nameEl = 
	document.querySelector("#name"); 
let feedbackEl = document.querySelector( 
	"#feedback"
); 
let reStartBtn = 
	document.querySelector("#restart"); 

let currentQuestionIndex = 0; 
let time = questions.length * 15; 
let timerId; 
 

function quizStart() { 
	timerId = setInterval( 
		clockTick, 
		1000 
	); 
	timerEl.textContent = time; 
	let landingScreenEl = 
		document.getElementById( 
			"start-screen"
		); 
	landingScreenEl.setAttribute( 
		"class", 
		"hide"
	); 
	questionsEl.removeAttribute( 
		"class"
	); 
	getQuestion(); 
} 


function getQuestion() { 
	let currentQuestion = 
		questions[currentQuestionIndex]; 
	let promptEl = 
		document.getElementById( 
			"question-words"
		); 
	promptEl.textContent = 
		currentQuestion.prompt; 
	choicesEl.innerHTML = ""; 
	currentQuestion.options.forEach( 
		function (choice, i) { 
			let choiceBtn = 
				document.createElement( 
					"button"
				); 
			choiceBtn.setAttribute( 
				"value", 
				choice 
			); 
			choiceBtn.textContent = 
				i + 1 + ". " + choice; 
			choiceBtn.onclick = 
				questionClick; 
			choicesEl.appendChild( 
				choiceBtn 
			); 
		} 
	); 
} 


function questionClick() { 
	if ( 
		this.value !== 
		questions[currentQuestionIndex] 
			.answer 
	) { 
		time -= 10; 
		if (time < 0) { 
			time = 0; 
		} 
		timerEl.textContent = time; 
		feedbackEl.textContent = `Wrong! The correct answer was 
		${questions[currentQuestionIndex].answer}.`; 
		feedbackEl.style.color = "red"; 
	} else { 
		feedbackEl.textContent = 
			"Correct!"; 
		feedbackEl.style.color = 
			"green"; 
	} 
	feedbackEl.setAttribute( 
		"class", 
		"feedback"
	); 
	setTimeout(function () { 
		feedbackEl.setAttribute( 
			"class", 
			"feedback hide"
		); 
	}, 2000); 
	currentQuestionIndex++; 
	if ( 
		currentQuestionIndex === 
		questions.length 
	) { 
		quizEnd(); 
	} else { 
		getQuestion(); 
	} 
} 


function quizEnd() { 
	clearInterval(timerId); 
	let endScreenEl = 
		document.getElementById( 
			"quiz-end"
		); 
	endScreenEl.removeAttribute( 
		"class"
	); 
	let finalScoreEl = 
		document.getElementById( 
			"score-final"
		); 
	finalScoreEl.textContent = time; 
	questionsEl.setAttribute( 
		"class", 
		"hide"
	); 
} 



function clockTick() { 
	time--; 
	timerEl.textContent = time; 
	if (time <= 0) { 
		quizEnd(); 
	} 
} 

// Save score in local storage 
// Along with users' name 

function saveHighscore() { 
	let name = nameEl.value.trim(); 
	if (name !== "") { 
		let highscores = 
			JSON.parse( 
				window.localStorage.getItem( 
					"highscores"
				) 
			) || []; 
		let newScore = { 
			score: time, 
			name: name, 
		}; 
		highscores.push(newScore); 
		window.localStorage.setItem( 
			"highscores", 
			JSON.stringify(highscores) 
		); 
		console.log(newScore);

		alert( 
			"Your Score has been Submitted"
		); 
	} 
} 

// Save users' score after pressing enter 

function checkForEnter(event) { 
	if (event.key === "Enter") { 
		saveHighscore(); 
		alert( 
			"Your Score has been Submitted"
		); 
	} 
} 
nameEl.onkeyup = checkForEnter; 

// Save users' score after clicking submit 

submitBtn.onclick = saveHighscore; 

// Start quiz after clicking start quiz 

startBtn.onclick = quizStart;
