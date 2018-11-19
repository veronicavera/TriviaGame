
var panel = $('#quiz-area');

// Starting counter at 30 seconds per question
var countStartNumber = 30;


// Click Events

$(document).on('click', '#start-over', function(e) {
  game.reset();
});

$(document).on('click', '.answer-button', function(e) {
  game.clicked(e);
});

$(document).on('click', '#start', function(e) {
  $('#subwrapper').prepend('<h2>Time Remaining: <span id="counter-number">30</span> Seconds</h2>');
  game.loadQuestion();
});

// Variable storing array of questions
var questions = [{
  question: "Larry David was writer of what great TV sitcom?",
  answers: ["Modern Family", "Friends", "How I Met Your Mother", "Seinfeld"],
  correctAnswer: "Seinfeld",
  image:"assets/images/larryseinfeld.jpg"
}, {
  question: "In season 3, Larry invests in what kind of business?",
  answers: ["Basketball Team", "Restaurant", "Latex Company", "The Gap"],
  correctAnswer: "Restaurant",
  image:"assets/images/larryrestaurant.jpg"
}, {
  question: "What's Larry's manager's name?",
  answers: ["Barry", "Michael", "Jeff", "Tom"],
  correctAnswer: "Jeff",
  image:"assets/images/larryjeff.jpg"
}, {
  question: 'Why did Larry want to quit going to his shrink?"?',
  answers: ["His name is Larry", "He wears shoes with no socks", "He saw his shrink at the beach wearing a thong", "Doesn't drink Coffee"],
  correctAnswer: "He saw his shrink at the beach wearing a thong",
  image:"assets/images/larryshrink.jpg"
}, {
  question: 'What does Larry compare the size of his temporary teeth to?',
  answers: ["Chiclets", "Corn", "Ice cubes", "Finger nails"],
  correctAnswer: "Chiclets",
  image:"assets/images/larrychiclets.jpg"
}, {
  question: 'How did Krazee-Eyez Killa know Larry was hiding upstairs when they were no longer "cool de la"?',
  answers: ["Larry laughed out loud", "Larry stepped on bubble wrap", "Larry farted", "Larry was crying"],
  correctAnswer: "Larry stepped on bubble wrap",
  image:"assets/images/larrykrazee.jpg"
}, {
  question: 'In episode 36, "The Car Pool Lane", which term was NOT used to describe marijuana?',
  answers: ["Pot", "Mary Jane", "Greens", "Hash"],
  correctAnswer: "Mary Jane",
  image:"assets/images/larrycarpool.jpg"
}, {
  question: "In season 6, what does Larry do in an attempt to avoid going to a party at a friend's house?",
  answers: ["He pretends he is out of town", "He pretends he is ill", "He blames it on Cheryl", "He turns up the day after the party, pretending he has the wrong date"],
  correctAnswer: "He turns up the day after the party, pretending he has the wrong date",
  image:"assets/images/larryparty.jpg"
}];




var game = {
  questions:questions,
  currentQuestion:0,
  counter:countStartNumber,
  correct:0,
  incorrect:0,
  countdown: function(){
    game.counter--;
    $('#counter-number').html(game.counter);

    if (game.counter === 0){
      console.log('TIME UP');
      game.timeUp();
    }
  },

// Set time between questions
loadQuestion: function(){
  timer = setInterval(game.countdown, 1000);
  panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
  for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
    panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
  }
},

// End time countdown between questions


// Restart counter with new question
  nextQuestion: function(){
    game.counter = countStartNumber;
    $('#counter-number').html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },
  timeUp: function (){
    clearInterval(timer);
    $('#counter-number').html(game.counter);


    // class adds a 16px top and bottom margin and a 16px left and right padding to any HTML element.
    panel.html('<h3>Out of Time!</h3>');
    panel.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);
    panel.append('<img src="' + questions[this.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  results: function() {
    clearInterval(timer);

// How did user do on the trivia quiz - statistics

    panel.html('<h3>All done, heres how you did!</h3>');
    $('#counter-number').html(game.counter);
    panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
    panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
    panel.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
    panel.append('<br><button id="start-over">Start Over?</button>');
  },
  clicked: function(e) {
    clearInterval(timer);

    if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer){
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },
  answeredIncorrectly: function() {
    game.incorrect++;
    clearInterval(timer);
    panel.html('<h3>Nope!</h3>');
    panel.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  answeredCorrectly: function(){
    clearInterval(timer);
    game.correct++;
    panel.html('<h2>Correct!</h2>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  reset: function(){
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};  