$(document).ready(function() {
    var timeRemaining = 15;
    var intervalID;
    var questionsCount = 1;
    var correct = 0;
    var incorrect = 0;
    var unanswered = 0;
    var correctAnswer = ""

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
        timeRemaining = 15;
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
        $("#end").hide();
    }

    function next(count) {
        if (count < 3) {
            timeRemaining = 15;
            var question = eval("questions.question" + count);
            $("#time").html("15");
            $("#question").text(question.question);
            $("#0").text(question.answers[0]);
            $("#1").text(question.answers[1]);
            $("#2").text(question.answers[2]);
            questionsCount++;
        } else {
            clearInterval(intervalID);
            $("#questions").hide();
            $("#end").show();
            $("#time").html("0");
            $("#correct").text(correct);
            $("#incorrect").text(incorrect);
            $("#unanswered").text(unanswered);
        }
    }

    reset();

    $("#start").on("click", function() {
        $("#title").hide();
        $("#content").show();
        intervalID = setInterval(function() {
            timeRemaining--;
            $("#time").html(timeRemaining);
            if(timeRemaining < 0) {
                unanswered++;
                next(questionsCount);
            }
        }, 1000);
    });

    $(".answer").on("click", function() {
        if ($(this).val() === correctAnswer) {
            correct++;
        } else {
            incorrect++;
        }
        next(questionsCount);
    });

    $("#restart").on("click", function() {
        window.location.reload();
    });

});