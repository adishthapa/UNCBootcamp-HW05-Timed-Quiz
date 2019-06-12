$(document).ready(function() {
    // Time to answer the question
    var timeRemaining = 15;
    // Variable to hold the inverval id
    var intervalID;
    // Questions seen so far
    var questionsCount = 1;
    // Questions answered correctly so far
    var correct = 0;
     // Questions answered incorrectly so far
    var incorrect = 0;
     // Questions not answered so far
    var unanswered = 0;
    // Variable to hold the correct answer for the current question
    var correctAnswer = ""
    // Variable that keeps track of whether to pause the timer or not
    var pause = false;

    // Questions object containing information for all of the questions
    var questions = {
        question1: {
            question: "What is the name of the main city that the show takes place in?",
            answers: ["Scranton", "Sacramento", "Syracuse"],
            correct: "0",
            correct_word: "Scranton"
        },
        question2: {
            question: "Who does Michael accidentally hit with his car in the parking lot?",
            answers: ["Oscar", "Meredith", "Phyllis"],
            correct: "1",
            correct_word: "Meredith"
        },
        question3: {
            question: "According to 'Prison Mike', what is the worst thing about prison?",
            answers: ["The dementors", "The orcs", "The banshees"],
            correct: "0",
            correct_word: "The dementors"
        },
        question4: {
            question: "What's in the giant pot that Kevin drops all over the office floor?",
            answers: ["Gravy", "Salsa", "Chili"],
            correct: "2",
            correct_word: "Chili"
        },
        question5: {
            question: "What does Michael pick as his username when he signs up for an online dating site?",
            answers: ["HappyKidMan", "LittleKidLover", "MakeKidsHappy"],
            correct: "1",
            correct_word: "LittleKidLover"
        },
        question6: {
            question: "When Jim thinks Michael is eating ice cream for breakfast, what is he actually eating?",
            answers: ["Mayonnaise and black olives", "Sour cream and sprinkles", "Whipped cream and ketchup"],
            correct: "0",
            correct_word: "Mayonnaise and black olives"
        },
        question7: {
            question: "What kind of Farm does Dwight Own?",
            answers: ["Carrots", "Pumpkins", "Beets"],
            correct: "2",
            correct_word: "Beets"
        },
        question8: {
            question: "According to Dwight, nostalgia is one of the greatest human weaknesses, second only to what?",
            answers: ["Forgetfullness", "Emotions", "Neck"],
            correct: "2",
            correct_word: "Neck"
        },
        question9: {
            question: "How long had Jim and Pam been dating when he bought her engagement ring?",
            answers: ["A Week", "A Month", "A Year"],
            correct: "0",
            correct_word: "A Week"
        },
        question10: {
            question: "According to the song the office sing to Michael when he leaves, how many minutes did he work at Dunder Mifflin for?",
            answers: ["9,921,000", "9,986,000", "9,738,000"],
            correct: "1",
            correct_word: "9,986,000"
        }
    }

    // Resets the App
    function reset() {
        timeRemaining = 15;
        questionsCount = 1;
        correct = 0;
        incorrect = 0;
        unanswered = 0;
        pause = false;
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

    // Controls the flow of answering the questions
    function next(count) {
        if (count < 11) {
            timeRemaining = 15
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
            correctAnswer = question.correct;
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

    // Function that takes care of steps when the User has answered correctly
    function answeredCorrectly() {
        pause = true;
        $("#status").show();
        $("#questions").hide();
        $("#comment").text("Yay! You got it right!")
        $("#correct-answer").text("It was: " + eval("questions.question" + (questionsCount - 1)).correct_word);
        setTimeout(function() {
            next(questionsCount);
        },3000);
    }

    // Function that takes care of steps when the User has answered incorrectly
    function answeredIncorrectly() {
        pause = true;
        $("#status").show();
        $("#questions").hide();
        $("#comment").text("Nope! Better luck next time!");
        $("#correct-answer").text("Correct Answer was: " + eval("questions.question" + (questionsCount - 1)).correct_word);
        setTimeout(function() {
            next(questionsCount);
        },3000);
    }

    // Function that takes care of steps when the User has not answered and the time has run out
    function outOfTime() { 
        pause = true;
        $("#status").show();
        $("#questions").hide();
        $("#comment").text("Out of Time!");
        $("#correct-answer").text("Correct Answer was: " + eval("questions.question" + (questionsCount - 1)).correct_word);
        setTimeout(function() {
            next(questionsCount);
        },3000);
    }

    // Initial reset of the app
    reset();

    // Starts the quiz
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

    // Checks to see if the User answered correctly or not
    $(".answer").on("click", function() {
        console.log($(this).val);
        console.log(correctAnswer);
        if ($(this).val() === correctAnswer) {
            correct++;
            answeredCorrectly();
        } else {
            incorrect++;
            answeredIncorrectly();
        }
        
    });

    // Restarts the app
    $("#restart").on("click", function() {
        window.location.reload();
    });

});