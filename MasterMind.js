// JavaScript source code
$(document).ready(function () {
    var lastpicked;
    var guessCount = 0;
    var colorlist = ['red', 'blue', 'yellow', 'green', 'orange', 'purple'];

    //var answers = ['red', 'blue', 'yellow', 'green'];
    // randomly initialize answer key
    var answers = [];

    while (answers.length < 4) {
        var color = colorlist[Math.floor(Math.random() * colorlist.length)];
        if (answers.indexOf(color) == -1) {
            answers.push(color);
        }
    }

    // displays the answer. 
    // comment out this line of code when done testing!
    //$('#answers').html(getAnswerMarkup()); 

    function getButtonColor(button) {
        var colorclassname = "";
        for (var i = 0; i < colorlist.length; i++) {
            if (button.hasClass(colorlist[i] + 'button')) {
                colorclassname = colorlist[i];
                break;
            }
        }
        return colorclassname;
    }
    function getAnswerMarkup() {
        var answerMarkup = "<tr>";

        for (var i = 0; i < answers.length; i++) {
            answerMarkup += "<td>";
            answerMarkup += "<button class='guess colorpicker " + answers[i] + "button'></button>";
            answerMarkup += "</td>";
        }

        answerMarkup += "</tr>"

        return answerMarkup;
    }
    function getResultsButton(resultCode) {
        if (resultCode == 2)
            return " blackresultbutton";
        else if (resultCode == 1)
            return " whiteresultbutton";
        else
            return "";
    };
	
	function resetGuess() {
		for (var i = 0; i < 4; i++) {
            var findGuess = '#submittedGuess tr:nth-child(1) td:nth-child(' + (i + 1) + ') button';
        	// reset guess buttons back to grey to allow user to submit new guess.
            $(findGuess).attr('class', 'guess activeguess');
			}
	};

    $(document).on("click", '.colorpicker', function () {
        lastpicked = getButtonColor($(this)) + 'button';
    });

    $('.activeguess').click(function () {
        $(this).attr('class', 'guess activeguess ' + lastpicked);
    });

    $('#submitGuess').click(function () {

        // add the active guess to the guess list.
        var guessItem = "";
        var buttonClassName = "";
        var submittedAnswerSet = [];
        var results = [];

		guessCount++;

        // accept guess input and built HTML to add to guess list table.
        guessItem += "<tr>";
        for (var i = 0; i < 4; i++) {
            var findGuess = '#submittedGuess tr:nth-child(1) td:nth-child(' + (i + 1) + ') button';
            submittedAnswerSet[i] = getButtonColor($(findGuess));

            buttonClassName = 'colorpicker guess ' +
                getButtonColor($(findGuess)) + 'button';
            guessItem += '<td><button class="' +
                buttonClassName +
                '"></button></td>';            
        }
		
		// analyze submitted answer and determine results.
        for (var i = 0; i < answers.length; i++) {
            var resultcode = 0;
            for (var j = 0; j < submittedAnswerSet.length; j++) {
                if (answers[i] == submittedAnswerSet[j]) {					
                    if (i == j) {
                        // position and color match found. 						
                        resultcode = Math.max(2, resultcode);
                    }
                    else {
                        // color correct, but position is not
                        resultcode = Math.max(1, resultcode);
                    }
                }
            }			
            results.push(resultcode);
        }
        results.sort();
		results.reverse();

        var correct = true;
        for (var i = 0; i < results.length; i++) {
            if (results[i] != 2) {
                correct = false;
                break;
            }
        }
        if (results.length < 4) {
            correct = false;
        }

        if (correct) {
            if (guessCount <= 1) {
                alert("Lucky guess!");
            }
            else {
                alert("You got it! " + guessCount + " guesses.");
            }
        }
        else {
			resetGuess();
            // display the results of the guess.
            guessItem += '<td><table><tr>' +
                    '<td><button class="resultsbutton' + getResultsButton(results[0]) + '"></button></td>' +
                    '<td><button class="resultsbutton' + getResultsButton(results[1]) + '"></button></td>' +
                    '</tr><tr>' +
                    '<td><button class="resultsbutton' + getResultsButton(results[2]) + '"></button></td>' +
                    '<td><button class="resultsbutton' + getResultsButton(results[3]) + '"></button></td>' +
                    '</tr>' +
                    '</table></td>';

            guessItem += "</tr>";

            $('#guesshistory').prepend(guessItem);
        }

    });
	
	

    $('#showAnswer').click(function () {
        if ($(this).text() == "Show Answer") {
            $('#answers').html(getAnswerMarkup());
            $(this).text("Hide Answer");
        }
        else {
            $(this).text("Show Answer");
            $('#answers').empty();
        }
    });
});