$(document).ready(function() {
    var timeRemaining = 15;
    var intervalID;
    var questionsCount = 1;
    var correct = 0;
    var incorrect = 0;
    var unanswered = 0;
    var correctAnswer = ""
    var pause = false;

    var questions = {
        question1: {
            question: "Question 1",
            answers: ["1", "2", "3"],
            correct: "0"
        },
        question2: {
            question: "Question 2",
            answers: ["4", "5", "6"],
            correct: "0"
        }
    }

    function reset() {
        timeRemaining = 3;
        questionsCount = 1;
        correct = 0;
        incorrect = 0;
        unanswered = 0;
        $("#question").text(questions.question1.question);
        $("#0").text(questions.question1.answers[0]);
        $("#1").text(questions.question1.answers[1]);
        $("#2").text(questions.question1.answers[2]);
        correctAnswer = questions.question1.correct;
        questionsCount++;
        $("#title").show();
        $("#content").hide();
        $("#timer").show();
        $("#status").hide();
        $("#end").hide();
    }

    function next(count) {
        if (count < 3) {
            timeRemaining = 3;
            pause = false;
            var question = eval("questions.question" + count);
            $("#questions").show();
            $("#status").hide();
            $("#timer").show();
            $("#time").html("15");
            $("#question").text(question.question);
            $("#0").text(question.answers[0]);
            $("#1").text(question.answers[1]);
            $("#2").text(question.answers[2]);
            questionsCount++;
        } else {
            clearInterval(intervalID);
            $("#questions").hide();
            $("#timer").hide();
            $("#status").hide();
            $("#end").show();
            $("#time").html("0");
            $("#correct").text(correct);
            $("#incorrect").text(incorrect);
            $("#unanswered").text(unanswered);
        }
    }

    function answeredCorrectly() {
        pause = true;
        $("#status").show();
        $("#questions").hide();
        $("#comment").text("Yay! You got it right!")
        $("#correct-answer").text("It was: " + eval("questions.question" + (questionsCount - 1)).correct);
        setTimeout(function() {
            next(questionsCount);
        },3000);
    }

    function answeredIncorrectly() {
        pause = true;
        $("#status").show();
        $("#questions").hide();
        $("#comment").text("Nope! Better luck next time!");
        $("#correct-answer").text("Correct Answer was: " + eval("questions.question" + (questionsCount - 1)).correct);
        setTimeout(function() {
            next(questionsCount);
        },3000);
    }

    function outOfTime() { 
        pause = true;
        $("#status").show();
        $("#questions").hide();
        $("#comment").text("Out of Time!");
        $("#correct-answer").text("Correct Answer was: " + eval("questions.question" + (questionsCount - 1)).correct);
        setTimeout(function() {
            next(questionsCount);
        },3000);
    }

    reset();

    $("#start").on("click", function() {
        $("#title").hide();
        $("#content").show();
        intervalID = setInterval(function() {
            if (!pause) {
                timeRemaining--;
                $("#time").html(timeRemaining);
                if(timeRemaining < 0) {
                    unanswered++;
                    outOfTime();
                }
            }
        }, 1000);
    });

    $(".answer").on("click", function() {
        if ($(this).val() === correctAnswer) {
            correct++;
            answeredCorrectly();
        } else {
            incorrect++;
            answeredIncorrectly();
        }
        
    });

    $("#restart").on("click", function() {
        window.location.reload();
    });

});