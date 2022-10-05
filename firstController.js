const fs = require('fs');
/*let questionList = [{"Q":"Q1","A":"A1"},{"Q":"Q2","A":"A2"},{"Q":"Q3","A":"A3"},{"Q":"Q4","A":"A4"}
    ,{"Q":"Q5","A":"A5"}
    ,{"Q":"Q6","A":"A6"}
    ,{"Q":"Q7","A":"A7"}
    ,{"Q":"Q8","A":"A8"}
    ,{"Q":"Q9","A":"A9"}
    ,{"Q":"Q10","A":"A10"}
    ,{"Q":"Q11","A":"A11"}
];*/
//generateQuestionAndAnswer();
async function generateQuestionAndAnswer(questionList) {
    console.log("check sync generateQuestionAndAnswer1");
    
    console.log("check sync generateQuestionAndAnswer2");
    //console.log("questionList:"+JSON.stringify(questionList));
    //setTimeout(1000);
    let resultObj = [];

    for (var i = 0; i < questionList.length; i++) {
        //console.log(questionList[i].Q);
        var selectedAnswerIndex = [i];
        let answer = [];
        answer[0] = {};
        answer[0].A = questionList[i].A;
        answer[0].C = true;

        console.log("check sync generateQuestionAndAnswer 3.1");
        answer[1] = {};
        var rNumber1 = await getRandomIndex(selectedAnswerIndex, questionList.length);
        selectedAnswerIndex[1] = rNumber1;
        answer[1].A = questionList[rNumber1].A;
        answer[1].C = false;

        console.log("check sync generateQuestionAndAnswer 3.2");
        answer[2] = {};
        var rNumber2 = await getRandomIndex(selectedAnswerIndex, questionList.length);
        selectedAnswerIndex[2] = rNumber2;
        answer[2].A = questionList[rNumber2].A;
        answer[2].C = false;

        console.log("check sync generateQuestionAndAnswer 3.3");
        answer[3] = {};
        var rNumber3 = await getRandomIndex(selectedAnswerIndex, questionList.length);
        selectedAnswerIndex[3] = rNumber3;
        answer[3].A = questionList[rNumber3].A;
        answer[3].C = false;

        console.log("check sync generateQuestionAndAnswer 3.4");
        resultObj[i]={};
        resultObj[i].Q = questionList[i].Q;
        //console.log("answer:"+JSON.stringify(answer));
        resultObj[i].A = shuffleArray(answer);
        //resultObj[i].A = answer;
    }
    console.log("check sync generateQuestionAndAnswer10");
    //setTimeout(1000);
    //console.log(JSON.stringify(resultObj));
    return resultObj;
}

function convertQuestionToArray(questionFileName) {
    let questionList = [];
    var lineIndex = 0;
    var tempStr;
    const allFileContents = fs.readFileSync(questionFileName, 'utf-8');
    allFileContents.split(/\r?\n/).forEach(line => {
        //console.log(`Line from file: ${line}`);
        tempStr = line.split("-");
        questionList[lineIndex] = {};
        questionList[lineIndex].Q = tempStr[0];
        questionList[lineIndex].A = tempStr[1];
        lineIndex++;
    });
    console.log("check sync convertQuestionToArray2");
    return questionList;
}

async function getRandomIndex (numList,listLen) {
    var rNumber = Math.floor((Math.random()*listLen));
    while(numList.includes(rNumber)){
        rNumber = Math.floor((Math.random()*listLen));
    }
    return rNumber;
}
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

module.exports= function(app){
    app.get('/', async function (req, res) {
        var returnResult = await generateQuestionAndAnswer(convertQuestionToArray('questionAnswer.json'));
        var lesson2Result = await generateQuestionAndAnswer(convertQuestionToArray('lesson2.json'));
        let finalResult = {"lesson1" : returnResult,
            "lesson2" : lesson2Result
        };
        console.log(JSON.stringify(returnResult));
        console.log("~~~~~~");
        res.render('index.ejs', {returnResult: finalResult});
    });

    app.get ("*", function(req,res){
        res.send("<h1>Invalid page</h1>");
    })
}