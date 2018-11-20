(function() {
  const myQuestions = [
    {
      title: "Welcome to David's virtual shopping assistant",
      comment: "We will take you on a guided tour around our webpage to find stuff that really brings out your character, matches your zodiac sign, totally has, like, some seriously good karma, or any combination of the above.  "
    },
    {
      question: "This is David's quiz. May we use your data for research?",
      comment: "DISCLAIMER: We will use your data for nefarious purposes, possibly involving kittens and a large, rusty axe. A link to a really long legal document with terms and conditions should be added here somewhere but I really don't have a template for this so we will have to do with this lorem ipsum for the time being.",
      answers: {
        a: "Sure, have all my data! My shoe size is 42, by the way.",
        b: "This will end in spam mail, won't it? Sod off.",
      },
      correctAnswer: "a"
    },
    {
      question: "This is the first question: Vanilla or chocolate?",
      answers: {
        a: "Rhubarb and engine degreaser",
        b: "Communism",
        c: "Choconilla"
      },
      correctAnswer: "c"
    },
    {
      question: "So have you already thought of some questions?",
      answers: {
        a: "Why, yes, of course!",
        b: "*Awkward silence*",
        c: "What are questions, really?"
      },
      correctAnswer: "b"
    },
    {
      question: "Do you like the visual style? I didn't make it - someone else did. I can edit it, though.",
      answers: {
        a: "Yeah, it's amazing, just what I wanted.",
        b: "It's almost perfect, but could you change that one thing?",
        c: "I have this color scheme I'd like you to implement. Go crazy.",
        d: "It gave me eye cancer."
      },
      correctAnswer: "c"
    },
    {
      title: "These are your test results:",
      comment: "You like to spend a lot of money. Mars and Jupiter are aligned in the fourth house, which means today is a great day for planting turnips. An uninteresting opportunity will present itself. You will meet a stranger with a rusty axe and a bag of kittens. Do not approach him."
    },
  ];

  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // we'll want to store the list of answer choices
      const answers = [];
      
      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label>
             <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
           </label>`
        );
      }
      // add this question and its answers to the output currentQuestion.comment !== "undefined"
      if (currentQuestion.title)  { // If a comment is given, print it as well
      output.push(
        `<div class="slide">
           <div class="title"> ${currentQuestion.title} </div>
           <div class="comment"> ${currentQuestion.comment} </div>
            <img src="https://www.example.com/images/dinosaur.jpg">
         </div>`
      );
      } else if (currentQuestion.comment) { // If a comment is given, print it as well
      output.push(
        `<div class="slide">
           <div class="question"> ${currentQuestion.question} </div>
           <div class="comment"> ${currentQuestion.comment} </div>
           <div class="answers"> ${answers.join("")} </div>
         </div>`
      );
      } else {
      output.push(
        `<div class="slide">
           <div class="question"> ${currentQuestion.question} </div>
           <div class="answers"> ${answers.join("")} </div>
         </div>`)
      }
     
    });
        


    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = "darkgreen";
      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
      
      // here we can do more evaluation, if we want to go crazy.
      showSlide(5) // as of time of writing, slide 5 is the final one
      
      
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;
    
    if (currentSlide === 0) {
      previousButton.style.display = "none";
      nextButton.style.display = "none";
      onwardButton.style.display = "inline-block";
      submitButton.style.display = "none";
      resetButton.style.display = "none";
    } else if (currentSlide === slides.length - 2) {
      nextButton.style.display = "none";
      submitButton.style.display = "inline-block";
      resetButton.style.display = "none";
    } else if (currentSlide !== slides.length - 1){
      previousButton.style.display = "inline-block";
      nextButton.style.display = "inline-block";
      onwardButton.style.display = "none";
      submitButton.style.display = "none";
      resetButton.style.display = "none";
    } else if (currentSlide === slides.length - 1){
      previousButton.style.display = "none";
      nextButton.style.display = "none";
      onwardButton.style.display = "none";
      submitButton.style.display = "none";
      resetButton.style.display = "inline-block";
  }}

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }
  
  function showFirstSlide() {
    showSlide(0);
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");
  const onwardButton = document.getElementById("onward");
  const nextButton = document.getElementById("next");
  const resetButton = document.getElementById("reset");
  // display quiz right away
  buildQuiz();

  const previousButton = document.getElementById("previous");
  
  
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  showSlide(0);

  // on submit, show results
  submitButton.addEventListener("click", showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
  onwardButton.addEventListener("click", showNextSlide);
  resetButton.addEventListener("click", showFirstSlide);
})();
