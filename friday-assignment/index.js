$(document).ready(function () {
  let quizContent = [
    {
      question: "1. What year did Nigeria gain independence?",
      options: ["1960", "1954", "1920"],
      correctAnswer: 0,
      chosenAnswer: null,
    },
    {
      question: "2. Who is the new US President?",
      options: ["Ngozi Okonjo-Iweala", "Joe Biden", "Bidemi Harris"],
      correctAnswer: 1,
      chosenAnswer: null,
    },
    {
      question: "3. Nigeria has _____ geopolitical zones?",
      options: ["4", "5", "6"],
      correctAnswer: 2,
      chosenAnswer: null,
    },
    {
      question: "4. No pain, no _____",
      options: ["gain", "garri", "gourmet"],
      correctAnswer: 0,
      chosenAnswer: null,
    },
    {
      question: "5. If X is South-West of Y and Z is South-East of X, what is the position of Z with reference to Y? ",
      options: ["North", "South", "North-East"],
      correctAnswer: 1,
      chosenAnswer: null,
    },
    {
      question: "6. To err is _____, to forgive is _____",
      options: ["ordinary, extraordinary", "animals, humans", "human, divine"],
      correctAnswer: 2,
      chosenAnswer: null,
    },
    {
      question: "7. I am referred to as the 'Centre of Excellence' in Nigeria. What state am I?",
      options: ["Lagos", "Abuja", "Oyo"],
      correctAnswer: 0,
      chosenAnswer: null,
    },
    {
      question: "8. Absence makes the heart grow _____",
      options: ["heavy", "fonder", "larger"],
      correctAnswer: 1,
      chosenAnswer: null,
    },
    {
      question: "9. There are _____ states in Nigeria",
      options: ["36", "44", "32"],
      correctAnswer: 0,
      chosenAnswer: null,
    },
    {
      question: "10. I am that which has no enemy.",
      options: ["wisdom", "water", "wealth"],
      correctAnswer: 1,
      chosenAnswer: null,
    },
  ];

  // html render
  const renderQuestion = (indexOfQuestion) => {
    $("#questions").append(
      `<p id="question${indexOfQuestion}">${quizContent[indexOfQuestion].question}</p>`
    );
    $.each(quizContent[indexOfQuestion].options, function (num, val) {
      let htmlOfPresentOption = `
        <div>
           <input type="radio" id="question${indexOfQuestion}options${num}" name="options${indexOfQuestion}" value="${num}">
           <label for="question${indexOfQuestion}options${num}">${val}</label>
        </div>`;
      if (num == quizContent[indexOfQuestion].chosenAnswer) {
        htmlOfPresentOption = `
            <div>
                <input type="radio" id="question${indexOfQuestion}options${num}" name="options${indexOfQuestion}" value="${num}" checked>
                <label for="question${indexOfQuestion}options${num}">${val}</label>
            </div>`;
      }
      $("#options").append(htmlOfPresentOption);
    });
  };

  let currentQuestion = 0;
  renderQuestion(currentQuestion);

  //   On next
  let lastQuestionIndex = quizContent.length - 1;
  $("#next").click(function () {
    quizContent[currentQuestion].chosenAnswer = $(
      `input[name="options${currentQuestion}"]:checked`
    ).val();
    $("#questions").empty();
    $("#options").empty();
    currentQuestion++;
    if (currentQuestion === lastQuestionIndex) {
      $("#submit").removeClass("hide");
      $("#next").addClass("hide");
    }
    if (currentQuestion === 0) {
      $("#prev").addClass("hide");
    } else {
      $("#prev").removeClass("hide");
    }
    renderQuestion(currentQuestion);
  });

  //   On previous
  $("#prev").click(function () {
    quizContent[currentQuestion].chosenAnswer = $(
      `input[name="options${currentQuestion}"]:checked`
    ).val();
    $("#questions").empty();
    $("#options").empty();
    currentQuestion--;
    if (currentQuestion === 0) {
      $("#prev").addClass("hide");
      $("#next").removeClass("hide");
      $("#submit").addClass("hide");
    } else if (currentQuestion !== 0 && currentQuestion !== lastQuestionIndex) {
      $("#prev").removeClass("hide");
      $("#next").removeClass("hide");
      $("#submit").addClass("hide");
    } else {
      $("#prev").removeClass("hide");
      $("#next").addClass("hide");
      $("#submit").removeClass("hide");
    }
    renderQuestion(currentQuestion);
  });

  //   On submit
  $("#submit").click(function () {
    let chosenAnswersArray = [];
    let correctAnswersArray = [];
    quizContent[currentQuestion].chosenAnswer = $(
      `input[name="options${currentQuestion}"]:checked`
    ).val();
    for (let index = 0; index < quizContent.length; index++) {
      const chosenAnswer = quizContent[index].chosenAnswer;
      const correctAnswers = quizContent[index].correctAnswer;
      chosenAnswersArray.push(chosenAnswer);
      correctAnswersArray.push(correctAnswers);
    }

    if (chosenAnswersArray.includes(undefined)) {
      alert("Answer all questions");
    } else {
      let scores = 0;
      for (let index = 0; index < correctAnswersArray.length; index++) {
        const el1 = correctAnswersArray[index];
        const el2 = chosenAnswersArray[index];
        if (el1 == el2) {
          scores++;
        }
      }
      $("#questions").empty();
      $("#options").empty();
      $("#prev").addClass("hide");
      $("#submit").addClass("hide");
      let correctAnswersLength = correctAnswersArray.length;
      let percentageMark = Math.round((scores / correctAnswersLength) * 100);
      if (percentageMark >= 75) {
        $(".result")
          .append(
            `<h3>Congratulations! You scored <span>${scores}</span> out of <span>${correctAnswersLength}</span> questions and have <span>${percentageMark}</span> percent</h3>`
          )
          .addClass("animate__animated animate__flash");
      } else if (percentageMark >= 50 && percentageMark < 75 ) {
        $(".result")
          .append(
            `<h3>Welldone! You scored <span>${scores}</span> out of <span>${correctAnswersLength}</span> questions and have <span>${percentageMark}</span> percent</h3>
            <p>You should try again to do better</p>`
          )
          .addClass("animate__animated animate__flip");
      } else {
        $(".result")
          .append(
            `<h3>Quite woeful. You scored <span>${scores}</span> out of <span>${correctAnswersLength}</span> questions and have <span>${percentageMark}</span> percent</h3>
            <p>Try harder next time</p>`
          )
          .addClass("animate__animated animate__shakeX");
      }
    }
  });
});


