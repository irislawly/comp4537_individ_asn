//Declare a new XMHttpRequest
const xhttp = new XMLHttpRequest();
const endPointRoot = "https://www.irislawcst.com/COMP4537/labs/assignment/"

let count = 1;
let score = 0;
let arrayString
let questionsArray = [];

const GET = "GET";
const PUT = "PUT";
const POST = "POST";

/**
 * Get all questions.
 */
function getAllQuestions() {
    xhttp.open(GET, endPointRoot + "question", true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let q = new Promise((resolve, reject) => {
                if (JSON.parse(this.responseText).length > 0) {
                    resolve(JSON.parse(this.responseText));
                } else {
                    reject('Fail');
                }
            })
            q.then((dbQuestions) => {
                console.log('Retrieved items');
                for (let position = 0; position < dbQuestions.length; position++) {
                    questionsArray.push(dbQuestions[position]);
                }
            }).catch((dbQuestions) => {
                console.log('Error');
            })
        }
    };
}

/**
 * Checks that database and size of page accurate.
 */
function check() {
    getAllQuestions();
    setTimeout(function () {

        arrayString = JSON.stringify(questionsArray);
        if (arrayString === null || questionsArray.length == 0) {

            let parag = document.createElement("p");
            let para = document.createTextNode("No questions created.");
            parag.appendChild(para);
            let divElement = document.getElementById("quizDiv");
            divElement.appendChild(parag);

        } else {
            load();
        }
    }, 3000);
}

/*
Loads questions to the page.
*/
function load() {

    let counter = questionsArray.length;
    count = 1;
    while (count <= counter) {

        addQuestion();
        if (Object.keys(questionsArray[count - 2]).length === 6) {
            addChoice();

        } else if (Object.keys(questionsArray[count - 2]).length === 7) {
            addChoice();
            addChoice();
        }
    }

    loadQuestions(counter, questionsArray);
}

/**
 * Add new choice to a question.
 */
function addChoice() {
    tempCount = (count - 1);
    unordList = document.getElementById("choiceDiv" + tempCount);
    let radioButtonNames = "question" + tempCount;
    if (optionCount === 3) {

        let list = document.createElement('li');
        list.setAttribute('id', "question" + tempCount + "licontainer" + optionCount);

        let radInput = document.createElement('input');
        radInput.setAttribute('type', 'radio');
        radInput.setAttribute('name', radioButtonNames);

        let idRadioButtonInput = "question" + tempCount + "choice" + optionCount;
        radInput.setAttribute('id', idRadioButtonInput);
        radInput.setAttribute('class', "radButton");

        list.appendChild(radInput);
        unordList.appendChild(list);

        let listDiv = document.getElementById(idRadioButtonInput).parentNode;
        let choiceTextArea = document.createElement("TEXTAREA");
        listDiv.appendChild(choiceTextArea);

        idTextArea = "question" + tempCount + "choiceTextArea" + optionCount;
        choiceTextArea.setAttribute('id', idTextArea);
        choiceTextArea.setAttribute('class', 'choiceTextArea');
        optionCount++;

    } else if (optionCount === 4) {

        let list = document.createElement('li');
        list.setAttribute('id', "question" + tempCount + "licontainer" + optionCount);

        let radInput = document.createElement('input');
        radInput.setAttribute('type', 'radio');
        radInput.setAttribute('name', radioButtonNames);

        let idRadioButtonInput = "question" + tempCount + "choice" + optionCount;
        radInput.setAttribute('id', idRadioButtonInput);
        radInput.setAttribute('class', "radButton");

        list.appendChild(radInput);
        unordList.appendChild(list);
        let listDiv = document.getElementById(idRadioButtonInput).parentNode;
        let choiceTextArea = document.createElement("TEXTAREA");
        listDiv.appendChild(choiceTextArea);
        idTextArea = "question" + tempCount + "choiceTextArea" + optionCount;
        choiceTextArea.setAttribute('id', idTextArea);

        choiceTextArea.setAttribute('class', 'choiceTextArea');

        optionCount++;
    }
}

/**
 * Creates question to the template.
 */
function addQuestion() {

    optionCount = 1;

    templateStatus = true;
    let container = document.getElementById("quizDiv");
    let questionDiv = document.createElement("div");
    container.appendChild(questionDiv);

    questionDiv.setAttribute('id', 'containerquestion' + count);


    let parag = document.createElement("p");
    let questionCount = "Question " + count;
    let nodeP = document.createTextNode(questionCount);
    parag.appendChild(nodeP);
    parag.setAttribute('class', "questionNo");
    parag.setAttribute('id', 'questionNo' + count);

    questionDiv.appendChild(parag);

    let questionBodyTextArea = document.createElement("TEXTAREA");
    questionDiv.appendChild(questionBodyTextArea);

    let idTextArea = "question" + count + "TextArea";

    questionBodyTextArea.setAttribute("id", idTextArea);
    questionBodyTextArea.setAttribute("class", "questTextArea");


    let parag2 = document.createElement("p");
    nodeP = document.createTextNode("Choices:*");
    parag2.appendChild(nodeP);
    parag2.setAttribute('class', 'choiceHead');

    questionDiv.appendChild(parag2);
    let unordList = document.createElement("ul");
    questionDiv.appendChild(unordList);
    unordList.setAttribute('id', 'choiceDiv' + count);
    let radioButtonNames = "question" + count;

    for (let position = 1; position <= 2; position++) {
        optionCount++;

        let list = document.createElement('li');

        let radInput = document.createElement('input');
        radInput.setAttribute('type', 'radio');
        radInput.setAttribute('name', radioButtonNames);

        let idRadioButtonInput = "question" + count + "choice" + position;
        radInput.setAttribute('id', idRadioButtonInput);
        radInput.setAttribute('class', "radButton");

        list.appendChild(radInput);
        unordList.appendChild(list);
        list.setAttribute('id', "question" + count + "licontainer" + position);

        let listDiv = document.getElementById(idRadioButtonInput).parentNode;
        let choiceTextArea = document.createElement("TEXTAREA");
        listDiv.appendChild(choiceTextArea);

        idTextArea = "question" + count + "choiceTextArea" + position;
        choiceTextArea.setAttribute('id', idTextArea);
        choiceTextArea.setAttribute('class', 'choiceTextArea');
    }

    count++;
}

/**
 * Fills out the questions
 */
function loadQuestions(qSize, jsonObjArr) {

    for (i = 1; i <= qSize; i++) {

        let j = i - 1;
        let questionTextArea = "question" + i + "TextArea";
        document.getElementById(questionTextArea).value = jsonObjArr[j].question;
        disableTextArea(questionTextArea);
        if (Object.keys(jsonObjArr[j]).length === 7) {
            let numOfChoices = 4;

            for (k = 1; k <= numOfChoices; k++) {

                let choiceTextAreas = "question" + i + "choiceTextArea" + k;

                if (k == 1) {
                    document.getElementById(choiceTextAreas).value = jsonObjArr[j].choice1;

                } else if (k == 2) {
                    document.getElementById(choiceTextAreas).value = jsonObjArr[j].choice2;

                } else if (k == 3) {
                    document.getElementById(choiceTextAreas).value = jsonObjArr[j].choice3;


                } else if (k == 4) {
                    document.getElementById(choiceTextAreas).value = jsonObjArr[j].choice4;
                }

                disableTextArea(choiceTextAreas);
            }

        } else if (Object.keys(jsonObjArr[j]).length === 6) {


            let numOfChoices = 3;


            for (k = 1; k <= numOfChoices; k++) {
                let choiceTextAreas = "question" + i + "choiceTextArea" + k;

                if (k == 1) {
                    document.getElementById(choiceTextAreas).value = jsonObjArr[j].choice1;


                } else if (k == 2) {
                    document.getElementById(choiceTextAreas).value = jsonObjArr[j].choice2;


                } else if (k == 3) {
                    document.getElementById(choiceTextAreas).value = jsonObjArr[j].choice3;
                }

                disableTextArea(choiceTextAreas);
            }

            //if the question has 2 answer choices
        } else if (Object.keys(jsonObjArr[j]).length === 5) {
            let numOfChoices = 2;
            for (k = 1; k <= numOfChoices; k++) {
                let choiceTextAreas = "question" + i + "choiceTextArea" + k;
                if (k == 1) {
                    document.getElementById(choiceTextAreas).value = jsonObjArr[j].choice1;

                } else if (k == 2) {
                    document.getElementById(choiceTextAreas).value = jsonObjArr[j].choice2;
                }
                disableTextArea(choiceTextAreas);
            }
        }
    }
}

/*
Diables text area.
*/
function disableTextArea(name) {
    document.getElementById(name).disabled = true;
}

/**
 * Function for submit button
 */
function submit() {

    if (score != -1) {

        let counter = questionsArray.length;
        answerKey(counter, questionsArray);
        displayScore();
    }
}

/*
 Compares answer keys and choices.
*/
function answerKey(numOfQ, array) {
    for (i = 1; i <= numOfQ; i++) {
        let j = i - 1;
        let questionTextArea = "question" + i + "TextArea";
        disableTextArea(questionTextArea);
        if (Object.keys(array[j]).length === 7) {
            let numOfChoices = 4;
            for (k = 1; k <= numOfChoices; k++) {

                let choiceTextAreas = "question" + i + "choiceTextArea" + k;

                let choiceRadioButton = "question" + i + "choice" + k;
                // highlights correct answer green
                if (document.getElementById(choiceTextAreas).value == array[j].answer) {
                    document.getElementById(choiceTextAreas).style.backgroundColor = "green";
                    document.getElementById(choiceTextAreas).style.color = "white";
                }
                if (document.getElementById(choiceRadioButton).checked == true) {
                    if (k == 1) {
                        if (array[j].choice1 == array[j].answer) {
                            score++;

                        } else {

                            document.getElementById(choiceTextAreas).style.backgroundColor = "red";

                            document.getElementById(choiceTextAreas).style.color = "white";
                        }

                    } else if (k == 2) {

                        if (array[j].choice2 == array[j].answer) {

                            score++;

                        } else {

                            document.getElementById(choiceTextAreas).style.backgroundColor = "red";
                            // changes font color to white
                            document.getElementById(choiceTextAreas).style.color = "white";
                        }
                        // 3rd choice
                    } else if (k == 3) {

                        if (array[j].choice3 == array[j].answer) {

                            score++;

                        } else {

                            document.getElementById(choiceTextAreas).style.backgroundColor = "red";

                            document.getElementById(choiceTextAreas).style.color = "white";
                        }
                        // 4th choice
                    } else if (k == 4) {
                        if (array[j].choice4 == array[j].answer) {
                            score++;
                        } else {
                            document.getElementById(choiceTextAreas).style.backgroundColor = "red";
                            document.getElementById(choiceTextAreas).style.color = "white";
                        }
                    }
                }

                disableTextArea(choiceTextAreas);
                disableTextArea(choiceRadioButton);
            }
        } else if (Object.keys(array[j]).length === 6) {

            let numOfChoices = 3;
            for (k = 1; k <= numOfChoices; k++) {

                let choiceTextAreas = "question" + i + "choiceTextArea" + k;
                let choiceRadioButton = "question" + i + "choice" + k;
                if (document.getElementById(choiceTextAreas).value == array[j].answer) {
                    document.getElementById(choiceTextAreas).style.backgroundColor = "green";
                    document.getElementById(choiceTextAreas).style.color = "white";
                }


                if (document.getElementById(choiceRadioButton).checked == true) {
                    // 1st choice
                    if (k == 1) {

                        if (array[j].choice1 == array[j].answer) {

                            score++;

                        } else {
                            document.getElementById(choiceTextAreas).style.backgroundColor = "red";
                            document.getElementById(choiceTextAreas).style.color = "white";
                        }

                    } else if (k == 2) {
                        if (array[j].choice2 == array[j].answer) {
                            score++;

                        } else {
                            document.getElementById(choiceTextAreas).style.backgroundColor = "red";
                            document.getElementById(choiceTextAreas).style.color = "white";
                        }

                    } else if (k == 3) {

                        if (array[j].choice3 == array[j].answer) {

                            score++;

                        } else {
                            document.getElementById(choiceTextAreas).style.backgroundColor = "red";
                            document.getElementById(choiceTextAreas).style.color = "white";
                        }
                    }
                }

                disableTextArea(choiceTextAreas);
                disableTextArea(choiceRadioButton);
            }

        } else if (Object.keys(array[j]).length === 5) {

            let numOfChoices = 2;
            for (k = 1; k <= numOfChoices; k++) {

                let choiceTextAreas = "question" + i + "choiceTextArea" + k;
                let choiceRadioButton = "question" + i + "choice" + k;
                if (document.getElementById(choiceTextAreas).value == array[j].answer) {
                    document.getElementById(choiceTextAreas).style.backgroundColor = "green";
                    document.getElementById(choiceTextAreas).style.color = "white";
                }

                if (document.getElementById(choiceRadioButton).checked == true) {

                    if (k == 1) {
                        if (array[j].choice1 == array[j].answer) {
                            score++;
                        } else {
                            document.getElementById(choiceTextAreas).style.backgroundColor = "red";
                            document.getElementById(choiceTextAreas).style.color = "white";
                        }

                    } else if (k == 2) {

                        if (array[j].choice2 == array[j].answer) {

                            score++;

                        } else {
                            document.getElementById(choiceTextAreas).style.backgroundColor = "red";
                            document.getElementById(choiceTextAreas).style.color = "white";
                        }
                    }
                }
                disableTextArea(choiceTextAreas);
                disableTextArea(choiceRadioButton);
            }
        }
    }
}

/**
 * Displays score on  top of page.
 */
function displayScore() {
    let parag = document.createElement("p");
    let para = document.createTextNode("Quiz Mark: " + score + " / " + questionsArray.length);
    parag.appendChild(para);

    let divElement = document.getElementById("displayScore");
    divElement.appendChild(parag);

    alert("Quiz Mark: " + score + " / " + questionsArray.length);
    score = -1;
}