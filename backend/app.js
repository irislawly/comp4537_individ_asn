const express = require("express");
const mysql = require("mysql");
const PORT = process.env.PORT || 8888;
const app = express();
const endPointRoot = "/COMP4537/labs/assignment/"
const db = mysql.createConnection({
    host: "localhost",
    user: "irislawc_quiz",
    password: "nodemysql123",
    database: "irislawc_quiz",
});

app.use(function(req,res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-Width');
    next();
});

// Express GET 
app.get(endPointRoot + "question", (req, res) => {
    let questionArr = [];
    let optionAnswerArr = [];
    let correctAnswer = "";
    let objArray = [];

    db.query("SELECT * FROM question", (err, result) => {
        if(err) throw err;
        
        for(let ind = 0; ind < result.length; ind++)
        {
            questionArr.push(result[ind]);
        }
    });
    

    db.query("SELECT * FROM option", (err, result) => {
        if(err) throw err;
        
        for(let ind = 0; ind  < questionArr.length; ind++){
            let optionCount = 0;
            optionAnswerArr = [];
            correctAnswer = "";
            for(let ind2 =0 ; ind2 < result.length; ind2++)
            {

                if((result[ind2].questionID - 1) === ind){
                    optionCount++;
                    optionAnswerArr.push(result[ind2].answerOption);
                    if(result[ind2].answerCorrect === 1){
                        correctAnswer = result[ind2].answerOption;
                    }
                }
            }

            // question with 2 options
            if(optionCount === 2){
                let createObj = {
                    index: questionArr[ind].questionID,
                    question: questionArr[ind].questionPrompt,
                    choice1: optionAnswerArr[0],
                    choice2: optionAnswerArr[1],
                    answer: correctAnswer
                };
                objArray.push(createObj);
            // question with 3 options
            }else if(optionCount === 3){
                let createObj = {
                    index: questionArr[ind].questionID,
                    question: questionArr[ind].questionPrompt,
                    choice1: optionAnswerArr[0],
                    choice2: optionAnswerArr[1],
                    choice3: optionAnswerArr[2],
                    answer: correctAnswer
                };
                objArray.push(createObj);
            // question with 4 options
            }else if(optionCount === 4){
                let createObj = {
                    index: questionArr[ind].questionID,
                    question: questionArr[ind].questionPrompt,
                    choice1: optionAnswerArr[0],
                    choice2: optionAnswerArr[1],
                    choice3: optionAnswerArr[2],
                    choice4: optionAnswerArr[3],
                    answer: correctAnswer
                };
                objArray.push(createObj);
            }
               
        }
 
        res.send(objArray);
    });
});

// Express PUT - for updating
app.put(endPointRoot + "update", (req,res) => {
    let objVar = "";
    let data = "";
    req.on('data', function(otherData){ data += otherData})
    req.on('end', function(){
        req.rawBody = data;
        req.jsonBody = JSON.parse(data);
        objVar = req.jsonBody;
        let questionNum = objVar.index;
        let questionText = objVar.question;
        let cho1 = "";
        let cho2 = "";
        let cho3 = "";
        let cho4 = "";
        let correctAnswer = 0;
        let numberOfChoices = 0;
        let query = "";
    
        //length 7 means there is 4 answer choices
        if(Object.keys(objVar).length === 7){
            numberOfChoices = 4;
            cho1 = objVar.choice1;
            cho2 = objVar.choice2;
            cho3 = objVar.choice3;
            cho4 = objVar.choice4;

            query = "" + 'update question set questionPrompt = "' + questionText + '" where questionID =' + questionNum;
            db.query(query,
            (err, result) => {
                if (err) {
                    throw err;
                };
                console.log(result);
            }); 

            //Check choices, update table, find which answer
            for(let ind = 1; ind <= numberOfChoices; ind++){
                

                if(ind === 1){
                    query = update(cho1, objVar.answer, questionNum, correctAnswer, ind);


                }else if(ind === 2){
                    query = update(cho2, objVar.answer, questionNum, correctAnswer, ind);
                

                }else if(ind === 3){
                    query = update(cho3, objVar.answer, questionNum, correctAnswer, ind);
                    
                }else if(ind === 4){
                    query = update(cho4, objVar.answer, questionNum, correctAnswer, ind);
                }
                db.query(query,
                (err, result) => {
                    if (err) {
                        throw err;
                    };
                    console.log(result);
                });
            }
        }
        
        //length 6 means there is 3 answer choices
        else if(Object.keys(objVar).length === 6){
            numberOfChoices = 3;
            cho1 = objVar.choice1;
            cho2 = objVar.choice2;
            cho3 = objVar.choice3;

            query = "" + 'update question set questionPrompt = "' + questionText + '" where questionID =' + questionNum;
            db.query(query,
            (err, result) => {
                if (err) {
                    throw err;
                };
                console.log(result);
            }); 

            for(let ind = 1; ind <= numberOfChoices; ind++){
                if(ind === 1){
                    query = update(cho1, objVar.answer, questionNum, correctAnswer, ind);
                }else if(ind === 2){
                    query = update(cho2, objVar.answer, questionNum, correctAnswer, ind);

                }else if(ind === 3){
                    query = update(cho3, objVar.answer, questionNum, correctAnswer, ind);
                }
                db.query(query,
                (err, result) => {
                    if (err) {
                        throw err;
                    };
                    console.log(result);
                });
            }
        
        //    length 5 means there is 2 answer choices
        }else if(Object.keys(objVar).length === 5){
            numberOfChoices = 2;
            cho1 = objVar.choice1;
            cho2 = objVar.choice2;
            query = "" + 'update question set questionPrompt = "' + questionText + '" where questionID =' + questionNum;
            db.query(query,
            (err, result) => {
                if (err) {
                    throw err;
                };
                console.log(result);
            }); 

            for(let ind = 1; ind <= numberOfChoices; ind++){
                if(ind === 1){
                    query = update(cho1, objVar.answer, questionNum, correctAnswer, ind);

                }else if(ind === 2){

                    query = update(cho2, objVar.answer, questionNum, correctAnswer, ind);
                }
                db.query(query,
                (err, result) => {
                    if (err) {
                        throw err;
                    };
                    console.log(result);
                });
            }
        }
    })
});

//POST to server
app.post(endPointRoot + "question/",(req, res) => {

    let data = "";
    let postObj = "";
    req.on('data', function(otherData){ data += otherData})
    req.on('end', function(){
        req.rawBody = data;
        req.jsonBody = JSON.parse(data);
        postObj = req.jsonBody;
        let answerCheck = false;

        let questionQuery = 'INSERT INTO question (questionID, questionPrompt) values (' + postObj.index + ',"' + postObj.question + '")';
        db.query(questionQuery,
        (err, result) => {
            if (err) {
                throw err;
            };
            console.log(result);
        });

        let answerQuery = "";

        //length 7 means there is 4 answer choices
        if(Object.keys(req.jsonBody).length === 7){

            answerCheck = checkAns(postObj.answer, postObj.choice1);
            let answerNumber = 1;

            insert(answerQuery, postObj.index  , answerNumber ,  postObj.choice1, answerCheck );
            

            answerNumber++;
            answerCheck = checkAns(postObj.answer, postObj.choice2);
            insert(answerQuery, postObj.index  , answerNumber ,  postObj.choice2, answerCheck );
            answerNumber++;
            answerCheck = checkAns(postObj.answer, postObj.choice3);
            insert(answerQuery, postObj.index  , answerNumber ,  postObj.choice3, answerCheck );
            
            answerNumber++;

            answerCheck = checkAns(postObj.answer, postObj.choice4);
            insert(answerQuery, postObj.index  , answerNumber ,  postObj.choice4, answerCheck );
            
            answerNumber++;

        //length 6 means there is 3 answer choices
        }else if(Object.keys(req.jsonBody).length === 6){
                
            answerCheck = checkAns(postObj.answer, postObj.choice1);

               let answerNumber = 1;

               insert(answerQuery, postObj.index  , answerNumber ,  postObj.choice1, answerCheck );
 
               answerNumber++;
  
               answerCheck = checkAns(postObj.answer, postObj.choice2);
               insert(answerQuery, postObj.index  , answerNumber ,  postObj.choice2, answerCheck );

               answerNumber++;

               answerCheck = checkAns(postObj.answer, postObj.choice3);

               insert(answerQuery, postObj.index  , answerNumber ,  postObj.choice3, answerCheck );
               answerNumber++;
            
        //length 5 means there is 2 answer choices
        }else if(Object.keys(req.jsonBody).length === 5){
            answerCheck = checkAns(postObj.answer, postObj.choice1);

            let answerNumber = 1;
            insert(answerQuery, postObj.index  , answerNumber ,  postObj.choice1, answerCheck );
            answerNumber++;


            answerCheck = checkAns(postObj.answer, postObj.choice2);
            insert(answerQuery, postObj.index  , answerNumber ,  postObj.choice2, answerCheck );
  
            //don't really need this but left this here
            //answer resets to 1 back to 1 for every new question
            //therefore only max at answerID = 2
            answerNumber++;
        }
    })  
});


app.listen(PORT, (err) => {
    if(err) throw err;
    console.log("Listening to port", PORT);
});

/*
Inserts query for sql
 */
function insert(answerQuery, ind , answerNumber ,  choice , answerCheck ){
    answerQuery = 'INSERT INTO option (questionID, answerID, answerOption, answerCorrect) values (' + ind + ',' + answerNumber + ',"' + choice + '",' + answerCheck + ')';
    db.query(answerQuery,
    (err, result) => {
        if (err) {
            throw err;
        };
        console.log(result);
    });
}

/*
Helper function for update
*/
function update(cho, ans, questionNum, correctAnswer, ind){
    if(cho === ans){
        correctAnswer = 1;
    }else{
        correctAnswer = 0;
    }
    return  "" + 'update option set answerOption ="' + cho +'", answerCorrect = '+ correctAnswer +' where questionID = '+ questionNum +' and answerID = '+ ind;
    
}

/*
Answer checker function helper for insert/update functions.
*/
function checkAns(ans, cho){
    if(ans === cho)
    {
        return true;

    }else{
        return false;
      
    }
}
