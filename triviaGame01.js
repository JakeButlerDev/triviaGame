// Create a trivia game that asks at least 5 questions. API will retrieve at least 10 questions.  Give opportunity for user to answer, tell them if their answer is right or wrong

let counter = 0
let questionArray = []
let correctAnswerCount = 0
// let correctAnswerHighScore = 0

apiCall = () => {
    const url = 'https://opentdb.com/api.php?amount=10'

    const xhr = new XMLHttpRequest()

    xhr.open("GET", url)

    xhr.send()

    xhr.onload = () => {
        jsonData = JSON.parse(xhr.responseText)
        
        for (i=0; i<jsonData.results.length; i++) {     // push each question at i into questionArray
            questionArray.push(jsonData.results[i].question)
        }
    }

}

displayQuestion = () => {    // display current question         DO I NEED THIS FUNCTION?? CAN WE DO IN ABOVE FUNCTION?
    let answersArray = []
    if (counter < jsonData.results.length) {
        document.getElementById("currentQuestion").innerHTML = `${jsonData.results[counter].question}\n` //Type:${jsonData.results[counter].type}
        if (jsonData.results[counter].type == 'multiple') {
            // alert('Functionality not supported, please skip current question.')
            multipleChoiceDropdownHTML = `<select id="multipleChoiceDropdown">`
            for (i=0; i<jsonData.results[counter].incorrect_answers.length; i++) {
                answersArray.push(jsonData.results[counter].incorrect_answers[i])
            }
            answersArray.push(jsonData.results[counter].correct_answer)
            shuffleArray(answersArray)
            for (j=0; j<answersArray.length; j++) {

                multipleChoiceDropdownHTML += `<option value="${answersArray[j]}">${answersArray[j]}</option>` 
            }
            // for (i=0; i<3; i++) {
            //     multipleChoiceDropdownHTML += `<option value="${jsonData.results[counter].incorrect_answers[i]}">${jsonData.results[counter].incorrect_answers[i]}</option>`
            // }
            // multipleChoiceDropdownHTML += `<option value="${jsonData.results[counter].correct_answer}">${jsonData.results[counter].correct_answer}</option>`
            multipleChoiceDropdownHTML += `</select>`
            document.getElementById("dropdownAnswer").innerHTML = multipleChoiceDropdownHTML

        } else {
            multipleChoiceDropdownHTML = `<select id="multipleChoiceDropdown">`
            multipleChoiceDropdownHTML += `<option value="true">True</option>`
            multipleChoiceDropdownHTML += `<option value="false">False</option>`
            multipleChoiceDropdownHTML += `</select>`
            document.getElementById("dropdownAnswer").innerHTML = multipleChoiceDropdownHTML
        }
    } else {
        document.getElementById("currentQuestion").innerHTML = '<h1>There are no more questions.</h1>'
    }

    counter++
}

checkAnswer = () => { // check user's answer to jsonData.results[i].correct_answer
        userAnswer = document.getElementById("multipleChoiceDropdown").value
        if (userAnswer.toLowerCase() == jsonData.results[counter-1].correct_answer.toLowerCase()) {
            document.getElementById("footerMessage").innerHTML = `<h4>That's correct!</h4>`
            correctAnswerCount++
            document.getElementById("scoreboard").innerHTML = `<p>Correct answers this session:${correctAnswerCount}</p>`
        } else {
            document.getElementById("footerMessage").innerHTML = `<h4>That answer is incorrect. The correct answer is ${jsonData.results[counter-1].correct_answer}</h4>`
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


/*
PROGRAM FLOW

1) PULL API DATA FROM URL

2) PARSE TEXT TO JSON DATA

3) PULL QUESTIONS FROM JSON DATA, PUT INTO ARRAY

3) DISPLAY QUESTIONS AS WE ITERATE THROUGH ARRAY

4) BUTTON SHOULD RUN DISPLAY QUESTION, COUNTER SHOULD INCREMENT AT END OF FUNCTION 

5) WHEN 'NEXT' BUTTON IS PRESSED, COUNTER SHOULD INCREMENT AND NEXT QUESTION IS SHOWN

7) CHECK USER INPUT ANSWER AGAINST jsonData.results[counter].correct_answer
*/







// getCategories = () => {              NOT NEEDED (for now...)
//     const url = 'https://opentdb.com/api_category.php'

//     const xhr = new XMLHttpRequest()

//     xhr.open("GET", url)

//     xhr.send()

//     xhr.onload = () => {
//         jsonData = JSON.parse(xhr.responseText)
//         categoryDropdownHTML = `<select id="categoryDropdown">`

//         for (i=0; i<jsonData.trivia_categories.length; i++) {
//             categoryDropdownHTML += `<option value="${jsonData.trivia_categories[i].name}>${jsonData.trivia_categories[i].name}</option>`
//         }
        
//         categoryDropdownHTML += `</select>`
//         document.getElementById("categoryList").innerHTML = categoryDropdownHTML
//     }
// }