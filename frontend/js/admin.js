const xhttp = new XMLHttpRequest();
const endPointRoot = "https://www.irislawcst.com/COMP4537/labs/assignment/"

//Global variables
let count = 1;
const GET = "GET";
const PUT = "PUT";
const POST = "POST";

let optionCount = 1;
let questionsArr = [];

let templateStatus = false;
//onload info when new questions added
let onloadData = false;

/*
Begins loading the administrator page.
*/

function load() {

    getAllQuestions();
    setTimeout(function () {
        if (questionsArr != null && questionsArr.length > 0) {

            let counter = questionsArr.length;
            onloadData = true;
            count = 1;

            while (count <= counter) {

                addQuestion();

                if (Object.keys(questionsArr[count - 2]).length === 6) {

                    onloadData = false;
                    addChoice();
                    onloadData = true;

                } else if (Object.keys(questionsArr[count - 2]).length === 7) {
                    onloadData = false;
                    addChoice();
                    addChoice();
                    onloadData = true;
                }
            }
            loadQuestions(counter, questionsArr);

            templateStatus = false;
        }
    }, 3000);
}


/*
Loads up the questions onto the admin page
 */
function loadQuestions(qSize, jsonObjArr) {

    for (i = 1; i <= qSize; i++) {

        let j = i - 1;

        let questionTextArea = "question" + i + "TextArea";
        document.getElementById(questionTextArea).value = jsonObjArr[j].question;

        if (Object.keys(jsonObjArr[j]).length === 7) {
            let numOfChoices = 4;

            for (k = 1; k <= numOfChoices; k++) {

                let choiceTextAreas = "question" + i + "choiceTextArea" + k;
                let choiceRadioButton = "question" + i + "choice" + k;

                if (k == 1) {
                    document.getElementById(choiceTextAreas).value = jsonObjArr[j].choice1;
                    if (jsonObjArr[j].choice1 == jsonObjArr[j].answer) {

                        document.getElementById(choiceRadioButton).checked = true;
                    }

                } else if (k == 2) {

                    document.getElementById(choiceTextAreas).value = jsonObjArr[j].choice2;

                    if (jsonObjArr[j].choice2 == jsonObjArr[j].answer) {

                        document.getElementById(choiceRadioButton).checked = true;
                    }

                } else if (k == 3) {
                    document.getElementById(choiceTextAreas).value = jsonObjArr[j].choice3;
                    if (jsonObjArr[j].choice3 == jsonObjArr[j].answer) {

                        document.getElementById(choiceRadioButton).checked = true;
                    }

                } else if (k == 4) {

                    document.getElementById(choiceTextAreas).value = jsonObjArr[j].choice4;


                    if (jsonObjArr[j].choice4 == jsonObjArr[j].answer) {

                        document.getElementById(choiceRadioButton).checked = true;
                    }
                }
            }

        } else if (Object.keys(jsonObjArr[j]).length === 6) {


            let numOfChoices = 3;

            for (k = 1; k <= numOfChoices; k++) {
                let choiceTextAreas = "question" + i + "choiceTextArea" + k;
                let choiceRadioButton = "question" + i + "choice" + k;

                if (k == 1) {
                    document.getElementById(choiceTextAreas).value = jsonObjArr[j].choice1;

                    if (jsonObjArr[j].choice1 == jsonObjArr[j].answer) {
                        document.getElementById(choiceRadioButton).checked = true;
                    }

                } else if (k == 2) {
                    document.getElementById(choiceTextAreas).value = jsonObjArr[j].choice2;


                    if (jsonObjArr[j].choice2 == jsonObjArr[j].answer) {

                        document.getElementById(choiceRadioButton).checked = true;
                    }

                } else if (k == 3) {
                    document.getElementById(choiceTextAreas).value = jsonObjArr[j].choice3;
                    if (jsonObjArr[j].choice3 == jsonObjArr[j].answer) {

                        document.getElementById(choiceRadioButton).checked = true;
                    }
                }
            }

        } else if (Object.keys(jsonObjArr[j]).length === 5) {

            let numOfChoices = 2;

            for (k = 1; k <= numOfChoices; k++) {
                let choiceTextAreas = "question" + i + "choiceTextArea" + k;
                let choiceRadioButton = "question" + i + "choice" + k;
                if (k == 1) {
                    document.getElementById(choiceTextAreas).value = jsonObjArr[j].choice1;
                    if (jsonObjArr[j].choice1 == jsonObjArr[j].answer) {

                        document.getElementById(choiceRadioButton).checked = true;
                    }
                } else if (k == 2) {
                    document.getElementById(choiceTextAreas).value = jsonObjArr[j].choice2;
                    if (jsonObjArr[j].choice2 == jsonObjArr[j].answer) {
                        document.getElementById(choiceRadioButton).checked = true;
                    }
                }
            }
        }
    }
}

/**
 * Adds question template format to page.
 */
function addQuest() {
    let temp = questionsArr.length + 2;
    if (count == temp) {
        push();
    }

    addQuestion();
    if (onloadData === false) {
        storeObject();
    }
    onloadData = false;
}

/**
 * Pushes page
 */
function push() {
    //declares variables
    let idRadButt = "";
    let idSelectChoice = "";
    let quest = "";


    if (count > 1) {
        for (let ind = 1; ind < optionCount; ind++) {
            idRadButt = "question" + (count - 1) + "choice" + ind;

            if (document.getElementById(idRadButt).checked) {
                idSelectChoice = "question" + (count - 1) + "choiceTextArea" + ind;
                document.getElementById(idRadButt).setAttribute('value', document.getElementById(idSelectChoice).value);
            }
        }

        //for 2 answers
        if (optionCount === 3) {
            quest = {

                index: (count - 1),

                question: document.getElementById('question' + (count - 1) + 'TextArea').value,
                choice1: document.getElementById('question' + (count - 1) + 'choiceTextArea1').value,
                choice2: document.getElementById('question' + (count - 1) + 'choiceTextArea2').value,
                answer: document.getElementById(idSelectChoice).value
            };

            //for 3 answers
        } else if (optionCount === 4) {

            quest = {

                index: (count - 1),

                question: document.getElementById('question' + (count - 1) + 'TextArea').value,
                choice1: document.getElementById('question' + (count - 1) + 'choiceTextArea1').value,
                choice2: document.getElementById('question' + (count - 1) + 'choiceTextArea2').value,
                choice3: document.getElementById('question' + (count - 1) + 'choiceTextArea3').value,
                answer: document.getElementById(idSelectChoice).value
            };
            //for 4 answers
        } else if (optionCount === 5) {
            quest = {
                index: (count - 1),
                question: document.getElementById('question' + (count - 1) + 'TextArea').value,
                choice1: document.getElementById('question' + (count - 1) + 'choiceTextArea1').value,
                choice2: document.getElementById('question' + (count - 1) + 'choiceTextArea2').value,
                choice3: document.getElementById('question' + (count - 1) + 'choiceTextArea3').value,
                choice4: document.getElementById('question' + (count - 1) + 'choiceTextArea4').value,
                answer: document.getElementById(idSelectChoice).value
            };
        }
        questionsArr.push(quest);
    }
}

/*
Adds question format for nnext question.
*/
function addQuestion() {

    optionCount = 1;

    templateStatus = true;

    let container = document.getElementById("quizDiv");
    let questionDiv = document.createElement("div");

    container.appendChild(questionDiv);
    questionDiv.setAttribute('id', 'containerquestion' + count);
    let para = document.createElement("p");
    let questionCount = "Question " + count;

    let nodeP = document.createTextNode(questionCount);
    para.appendChild(nodeP);

    para.setAttribute('class', "questionNo");
    para.setAttribute('id', 'questionNo' + count);
    questionDiv.appendChild(para);
    let questionBodyTextArea = document.createElement("TEXTAREA");
    questionDiv.appendChild(questionBodyTextArea);
    let idTextArea = "question" + count + "TextArea";

    questionBodyTextArea.setAttribute("id", idTextArea);
    questionBodyTextArea.setAttribute("class", "questTextArea");

    let para2 = document.createElement("p");

    nodeP = document.createTextNode("Choices:");
    para2.appendChild(nodeP);
    para2.setAttribute('class', 'choiceHead');

    questionDiv.appendChild(para2);
    let unordList = document.createElement("ul");
    questionDiv.appendChild(unordList);
    unordList.setAttribute('id', 'choiceDiv' + count);
    let radioButtonNames = "question" + count;
    for (let ind = 1; ind <= 2; ind++) {

        optionCount++

        let list = document.createElement('li');
        let radInput = document.createElement('input');
        radInput.setAttribute('type', 'radio');
        radInput.setAttribute('name', radioButtonNames);
        let idRadButtInput = "question" + count + "choice" + ind;
        radInput.setAttribute('id', idRadButtInput);
        radInput.setAttribute('class', "radButton");
        list.appendChild(radInput);
        unordList.appendChild(list);

        list.setAttribute('id', "question" + count + "licontainer" + ind);

        let listDiv = document.getElementById(idRadButtInput).parentNode;
        let choiceTextArea = document.createElement("TEXTAREA");
        listDiv.appendChild(choiceTextArea);
        idTextArea = "question" + count + "choiceTextArea" + ind;
        choiceTextArea.setAttribute('id', idTextArea);
        choiceTextArea.setAttribute('class', 'choiceTextArea');
    }

    count++;
}


/*
Store object into database.
*/
function storeObject() {
    if (count >= 1) {
        for (let ind = 0; ind < questionsArr.length; ind++) {
            xhttp.open(POST, endPointRoot + "question", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify(questionsArr[ind]));
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    console.log("looks like client side is working");
                }
            };
        }
    }
}


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
                    reject('');
                }
            })
            q.then((dbQuestions) => {
                console.log('Retrieved');
                for (let ind = 0; ind < dbQuestions.length; ind++) {
                    questionsArr.push(dbQuestions[ind]);
                }
            }).catch((dbQuestions) => {
                console.log('Error');
            })
        }
    };
}

/**
 * Adds another choice to the question.
 */
function addChoice() {
    if (onloadData === false) {
        tempCount = (count - 1);
        unordList = document.getElementById("choiceDiv" + tempCount);
        let radioButtonNames = "question" + tempCount;
        if (optionCount === 3) {
            let list = document.createElement('li');
            list.setAttribute('id', "question" + tempCount + "licontainer" + optionCount);
            let radInput = document.createElement('input');
            radInput.setAttribute('type', 'radio');
            radInput.setAttribute('name', radioButtonNames);
            let idRadButtInput = "question" + tempCount + "choice" + optionCount;
            radInput.setAttribute('id', idRadButtInput);
            radInput.setAttribute('class', "radButton");

            list.appendChild(radInput);
            unordList.appendChild(list);

            let listDiv = document.getElementById(idRadButtInput).parentNode;
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

            let idRadButtInput = "question" + tempCount + "choice" + optionCount;
            radInput.setAttribute('id', idRadButtInput);
            radInput.setAttribute('class', "radButton");

            list.appendChild(radInput);
            unordList.appendChild(list);

            let listDiv = document.getElementById(idRadButtInput).parentNode;
            let choiceTextArea = document.createElement("TEXTAREA");

            listDiv.appendChild(choiceTextArea);

            idTextArea = "question" + tempCount + "choiceTextArea" + optionCount;

            choiceTextArea.setAttribute('id', idTextArea);
            choiceTextArea.setAttribute('class', 'choiceTextArea');
            optionCount++;
        }
    }
}


/**
 * Removes a choice in a question.
 */
function removeChoice() {

    //if the page did not onload
    if (onloadData === false) {
        let tempCount = (count - 1);
        let tempOptionCount = (optionCount - 1);
        let lastAnswerLiContainer = "";

        //if there is currently 3 option choices remove 1, you will now have 2 option choices remaining
        if (optionCount === 4) {
            lastAnswerLiContainer = document.getElementById("question" + tempCount + "licontainer" + tempOptionCount);
            lastAnswerLiContainer.parentNode.removeChild(lastAnswerLiContainer);
            optionCount--;
            //if there is currently 4 option choices remove 1, you will now have 3 option choices remaining
        } else if (optionCount === 5) {
            lastAnswerLiContainer = document.getElementById("question" + tempCount + "licontainer" + tempOptionCount);
            lastAnswerLiContainer.parentNode.removeChild(lastAnswerLiContainer);
            optionCount--;
        }
    }
}

/**
 * Updates object in database.
 */
function updateObject() {

    let idRadButt = "";
    let idSelectChoice = "";
    let quest = "";
    let placeholderArray = []

    for (let ind = 0; ind < questionsArr.length; ind++) {
        placeholderArray.push(Object.keys(questionsArr[ind]).length);
    }


    let questionSize = questionsArr.length;

    while (questionsArr.length > 0) {
        questionsArr.pop();
    }

    for (let ind = 0; ind < questionSize; ind++) {
        let questionSize = placeholderArray[ind];
        if (questionSize === 7) {
            optionCount = 4;
        } else if (questionSize === 6) {
            optionCount = 3;
        } else if (questionSize === 5) {
            optionCount = 2;
        }


        for (let ind2 = 1; ind2 <= optionCount; ind2++) {


            idRadButt = "question" + (ind + 1) + "choice" + ind2;


            if (document.getElementById(idRadButt).checked) {

                idSelectChoice = "question" + (ind + 1) + "choiceTextArea" + ind2;

                document.getElementById(idRadButt).setAttribute('value', document.getElementById(idSelectChoice).value);
            }
        }

        //for 2 choices
        if (optionCount === 2) {

            quest = {

                index: (ind + 1),
                question: document.getElementById('question' + (ind + 1) + 'TextArea').value,
                choice1: document.getElementById('question' + (ind + 1) + 'choiceTextArea1').value,
                choice2: document.getElementById('question' + (ind + 1) + 'choiceTextArea2').value,
                answer: document.getElementById(idSelectChoice).value
            };

            //for 3 choices
        } else if (optionCount === 3) {

            quest = {

                index: (ind + 1),
                question: document.getElementById('question' + (ind + 1) + 'TextArea').value,
                choice1: document.getElementById('question' + (ind + 1) + 'choiceTextArea1').value,
                choice2: document.getElementById('question' + (ind + 1) + 'choiceTextArea2').value,
                choice3: document.getElementById('question' + (ind + 1) + 'choiceTextArea3').value,
                answer: document.getElementById(idSelectChoice).value
            };

            //for 4 choices
        } else if (optionCount === 4) {

            quest = {

                index: (ind + 1),
                question: document.getElementById('question' + (ind + 1) + 'TextArea').value,
                choice1: document.getElementById('question' + (ind + 1) + 'choiceTextArea1').value,
                choice2: document.getElementById('question' + (ind + 1) + 'choiceTextArea2').value,
                choice3: document.getElementById('question' + (ind + 1) + 'choiceTextArea3').value,
                choice4: document.getElementById('question' + (ind + 1) + 'choiceTextArea4').value,
                answer: document.getElementById(idSelectChoice).value
            };
        }
        questionsArr.push(quest);
    }

    /*
    Make sure to send one per new question
    */
    let xhttpEach = [];
    for (let ind = 0; ind < questionsArr.length; ind++) {
        xhttpEach[ind] = new XMLHttpRequest();
        xhttpEach[ind].open(PUT, endPointRoot + "update", true);
        xhttpEach[ind].setRequestHeader("Content-type", "application/json");
        xhttpEach[ind].send(JSON.stringify(questionsArr[ind]));
        xhttpEach[ind].onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log("Put on the client side is working");
            }
        };
    }
}