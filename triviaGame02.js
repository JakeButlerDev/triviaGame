const xhr = new XMLHttpRequest()

const url = 'https://opentdb.com/api.php?amount=10'

xhr.open('GET', url)

xhr.send()

xhr.onload = () => {
    jsonData = JSON.parse(xhr.responseText)
    listQuestion()
}

let counter = 0
let correctAnswerCount = 0

listQuestion = () => {
    let answersArray = []
    if (counter < jsonData.results.length) {
        document.getElementById("currentQuestion").innerHTML = `${jsonData.results[counter].question}\n`
        if (jsonData.results[counter].type == 'multiple') {
            multipleChoiceDropdownHTML = `<select id="multipleChoiceDropdown">`
            for (i = 0; i < jsonData.results[counter].incorrect_answers.length; i++) {
                answersArray.push(jsonData.results[counter].incorrect_answers[i])
            }
            answersArray.push(jsonData.results[counter].correct_answer)
            shuffleArray(answersArray)

            for (j = 0; j < answersArray.length; j++) {

                multipleChoiceDropdownHTML += `<option value="${answersArray[j]}">${answersArray[j]}</option>`
            }
            multipleChoiceDropdownHTML += `</select>`
            document.getElementById("answerDropdownSection").innerHTML = multipleChoiceDropdownHTML
        } else {
            multipleChoiceDropdownHTML = `<select id="multipleChoiceDropdown">`
            multipleChoiceDropdownHTML += `<option value="true">True</option>`
            multipleChoiceDropdownHTML += `<option value="false">False</option>`
            multipleChoiceDropdownHTML += `</select>`
            document.getElementById("answerDropdownSection").innerHTML = multipleChoiceDropdownHTML
        }

        counter++
    } else {
        document.getElementById("currentQuestion").innerHTML = '<h1>There are no more questions.</h1>'
    }
}

checkAnswer = () => { 
    userAnswer = document.getElementById("multipleChoiceDropdown").value
    if (userAnswer.toLowerCase() == jsonData.results[counter-1].correct_answer.toLowerCase()) {
        document.getElementById("answerFeedback").innerHTML = `<h4>That's correct!</h4>`
        correctAnswerCount++
        document.getElementById("scoreboard").innerHTML = `<p>Correct answers this session:${correctAnswerCount}</p>`
    } else {
        document.getElementById("answerFeedback").innerHTML = `<h4>That answer is incorrect. The correct answer is ${jsonData.results[counter-1].correct_answer}</h4>`
        document.getElementById("scoreboard").innerHTML = `<p>Correct answers this session:${correctAnswerCount}</p>`
    }
}


shuffleArray = (array) => {
    for (var i = array.length - 1; i > 0; i--) {
    
        // Generate random number
        var j = Math.floor(Math.random() * (i + 1));
                    
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
        
    return array;
 }