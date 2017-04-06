
$(document).ready(function(){
    var Questionnaire = (function() {
        var currentQuestionNo = 1;
        var answersGiven = {};
        var questions = [];

        var init = function() {
            getQuestions();
            $('button').on('click', submitQuestion);
        };

        var getQuestions = function() {
            $.ajax( "https://cdn.rawgit.com/santosh-suresh/39e58e451d724574f3cb/raw/784d83b460d6c0150e338c34713f3a1c2371e20a/assignment.json" )
                .done(function(res) {
                    questions = res;
                    constructHtml();
                })
                .fail(function(err) {
                    console.log(err);
                })
        };

        var constructHtml = function() {
            data = questions[currentQuestionNo - 1];
            $('.questions-wrap').find('.small').text('Javascript Quiz ' + currentQuestionNo + ' of ' + questions.length);
            $('.questions-wrap').find('.question').text(data.text);
            $('.questions-wrap').find('.options-wrap li').each(function(index) {
                $(this).text(data.options[index]);
            });
            $('.questions-wrap').find('.selections-wrap input').each(function(index) {
                $(this).val(index);
            });
            $('input[name="options"]').attr('checked', false);
            if(currentQuestionNo === questions.length) {
                $('button').text('Submit And Get result');
            }
        }

        var submitQuestion = function(cxt) {
            var answerGiven = $('input[name="options"]:checked').val();
            answersGiven[currentQuestionNo] = answerGiven;
            displayNextQuestion();
        };

        var displayNextQuestion = function() {
            if(currentQuestionNo === questions.length) {
                displayResult();
            } else {
                currentQuestionNo++;
                constructHtml();
            }
        };

        var displayResult = function() {
            $('.questions-wrap').hide();
            $('.result-section').show();
            var totalCorrectAns = 0;
            $tBody = $('.result-section table tbody');
            questions.map(function(question, index) {
                $tBody.append('<tr><td>' + (index + 1) + '</td><td>' + question.text + '</td><td>' + (question.answer + 1) + '</td><td>' + (answersGiven[index + 1] + 1) + '</td></tr>');
                if(question.answer.toString() === answersGiven[index + 1]) {
                    totalCorrectAns++;
                }
            });
            $('.totalCorrectAns').text(totalCorrectAns);
        }

        return {
            init: init
        };

    })();
    
    Questionnaire.init();
});
