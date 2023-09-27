const questionList=[
    {
        question:'What is the capital city of Sri Lanka?',
        answers:['Colombo','Kandy','Galle','Jaffna'],
        correctanswer:0
    },
    {
        question:'Which ocean surrounds Sri Lanka?',
        answers:['Atlantic ocean','Indian ocean','Pacific ocean','Artic ocean'],
        correctanswer:1
    },
    {
        question:'What is the name of King Kasyapas Fotress?',
        answers:['Dambulla Temple','Pitirungala','Nine arch bridge','Sigiriya'],
        correctanswer:3
    },
    {
        question:'What is the currency of Sri Lanka?',
        answers:['Dollar','Rupee','Pounds','Euro'],
        correctanswer:1
    },
    {
        question:'How many districts are there in Sri Lanka?',
        answers:['20','12','25','30'],
        correctanswer:2
    },
    {
        question:'What is the language that the majority people speak in Sri Lanka?',
        answers:['Sinhala','English','Tamil','Hindi'],
        correctanswer:0
    },
    {
        question:'What is the traditional dance form of Sri Lanka?',
        answers:['Salsa','Kandyan dance','Ballet','Hip-hop'],
        correctanswer:1
    },
    {
        question:'Which wildlife park is known for its leopard population in Sri Lanka?',
        answers:['Wilpattu national park','Minneriya national park','Yala national park','Udawalawe national park'],
        correctanswer:2
    },
    {
        question:'What is the main religion followed in Sri Lanka?',
        answers:['Hinduism','Islam','Buddhism','Christianity'],
        correctanswer:2
    },
    {
        question:'Which of these dishes are part of Sri Lankan culture?',
        answers:['Pittu','Rice and Curry','Hoppers','All of the above'],
        correctanswer:3
    }
    ]
    
    let questionMix=[];
    
    // shuffling and pushing questions to a new array
    function shuffleQuestions(){
        while (questionMix.length < 10) {
            const random_question = questionList[Math.floor(Math.random() * questionList.length)];
            if (!questionMix.includes(random_question)) {
                questionMix.push(random_question);
            }
        }
    }
    
    const questionNum=document.querySelector(".query_num");
    const questionPrint=document.querySelector(".question");
    const playerScore=document.querySelector(".total_score");
    const option1=document.querySelector(".optionA");
    const option2=document.querySelector(".optionB");
    const option3=document.querySelector(".optionC");
    const option4=document.querySelector(".optionD");
    const button1=document.getElementById("option0");
    const button2=document.getElementById("option1");
    const button3=document.getElementById("option2");
    const button4=document.getElementById("option3");
    const instructionContainer=document.querySelector(".instruction");
    const quizContainer=document.querySelector(".quiz-container");
    const resultContainer=document.querySelector(".result-container");
    
    let questionCount=0;
    let currentQuestion;
    let score=0;
    let wrongAnswers=0;
    let rightAnswers=0;
    let questionsDone=0;
    let timer;
    let sec=60;
    
    //Displaying the questions with the timer and question number
    function displayQuestion(){
        playerScore.innerHTML=score;
        currentQuestion=questionMix[questionCount].question;
        questionNum.innerHTML="Question " + (questionCount+1)+" of " + questionList.length;
        questionPrint.innerHTML=currentQuestion;
        option1.innerHTML=questionMix[questionCount].answers[0];
        option2.innerHTML=questionMix[questionCount].answers[1];
        option3.innerHTML=questionMix[questionCount].answers[2];
        option4.innerHTML=questionMix[questionCount].answers[3];
    }
    
    //Adding function to the radio buttons
    button1.addEventListener("click",checkAnswer);
    button1.para=0;
    button2.addEventListener("click",checkAnswer);
    button2.para=1;
    button3.addEventListener("click",checkAnswer);
    button3.para=2;
    button4.addEventListener("click",checkAnswer);
    button4.para=3;
    let answerChose;
    let displayOption;
    
    //Change background of options that are not selected to none
    function backgroundColor(label_1,label_2,label_3){
        label_1.style.background="";
        label_2.style.background="";
        label_3.style.background="";
    }
    
    //checks if the answer clicked by the student is correct or not and changes background color of selected option
    function checkAnswer(item){
        let selected = item.currentTarget.para;
        if(selected === questionMix[questionCount].correctanswer){
            displayOption=1;
        }
        else{
            displayOption=0;
        }
        switch(selected){
            case 0:
               option1.style.background="linear-gradient(135deg, #71b7e6, #146C94)";
               backgroundColor(option2,option3,option4);
               answerChose="optionA";
               break;
            case 1:
               option2.style.background="linear-gradient(135deg, #71b7e6, #146C94)";
               backgroundColor(option1,option3,option4);
               answerChose="optionB";
               break;
            case 2:
               option3.style.background="linear-gradient(135deg, #71b7e6, #146C94)";
               backgroundColor(option1,option2,option4);
               answerChose="optionC";
               break;
            case 3:
               option4.style.background="linear-gradient(135deg, #71b7e6, #146C94)";
               backgroundColor(option1,option2,option3);
               answerChose="optionD";
               break;
        }
    }
    
    //Displays green if correct answer is chosen and red if the answer is wrong
    function displayColor(){
        let index=questionMix[questionCount].correctanswer;
        if (displayOption===1){
            setTimeout(()=>{
                questionCount++;
                score+=10;
            },1000);
            rightAnswers++;
            questionsDone++;
            switch(index){
                case 0:
                   option1.style.background=""
                   option1.style.backgroundColor="green";
                   break;
                case 1:
                   option2.style.background=""
                   option2.style.backgroundColor="green";
                   break;
                case 2:
                   option3.style.background=""
                   option3.style.backgroundColor="green";
                   break;
                case 3:
                   option4.style.background=""
                   option4.style.backgroundColor="green";
                   break;
            }
        }
        else{
            setTimeout(()=>{
                questionCount++;
            },1000);
            wrongAnswers++;
            questionsDone++;
            switch(answerChose){
                case "optionA":
                   option1.style.background=""
                   option1.style.backgroundColor="red";
                   break;
                case "optionB":
                   option2.style.background="" 
                   option2.style.backgroundColor="red";
                   break;
                case "optionC":
                   option3.style.background=""
                   option3.style.backgroundColor="red";
                   break;
                case "optionD":
                   option4.style.background="" 
                   option4.style.backgroundColor="red";
                   break;
            }
            
            switch(index){
                case 0:
                   option1.style.backgroundColor="green";
                   break;
                case 1:
                   option2.style.backgroundColor="green";
                   break;
                case 2:
                   option3.style.backgroundColor="green";
                   break;
                case 3:
                   option4.style.backgroundColor="green";
                   break;
            }
        }
    }
    
    
    //Function to uncheck radio buttons
    function buttonUnCheck(){
        button1.checked=false;
        button2.checked=false;
        button3.checked=false;
        button4.checked=false;
    }
    
    //Function to reset background when moving to next question
    function backgroundReset(){
        option1.style.backgroundColor="";
        option2.style.backgroundColor="";
        option3.style.backgroundColor="";
        option4.style.backgroundColor="";
    }
    
    //Adding function to next button
    document.getElementById("next-button").addEventListener("click",displayNextQuestion);
    
    //Displays next question if question number is less than 10 and quiz timer is not over.
    function displayNextQuestion() {
        const selectedOption = document.querySelector("input[name='option']:checked");
        
        if (!selectedOption) {
            alert("Please select an option.");
            return; // Return without proceeding to the next question.
        }
        
        displayColor();
        buttonUnCheck();
        setTimeout(() => {
            if (questionCount < 10) {
                displayQuestion();
            } else {
                endQuiz();
                clearInterval(timer);
            }
            backgroundReset();
        }, 1000);
    }
    
    
    //Function to set countdown for the quiz and prints the result if the time runs out
    function clock(){
        timer=setInterval(function(){
            sec--;
            if(sec==0){
                clearInterval(timer); 
                quizContainer.classList.add("hide");
                resultContainer.classList.remove("hide");
                endQuiz();
            }
            
            else{
                document.getElementById("time").innerHTML="TimeLeft : "+sec+" s";}
            },1000);
    }
    
    function endQuiz(){
        quizContainer.classList.add("hide");
        resultContainer.classList.remove("hide");
        printResult();
    }
    
    //Function to display result when the quiz is over.
    function printResult(){
        let comment;
        let resultColor;
        if(score<=40){
            comment="Keep practicing, You can improve a lot.";
            resultColor="#C00000";
        }
        else if(score<=70){
            comment="Good Performance, Can Do Better.";
            resultColor="orange";
        }
        else{
            comment="Great Performance, Keep Up The Good Work.";
            resultColor="#32CD32";
        }
        
        document.getElementById("quiz-over").style.color=resultColor;
        document.getElementById("questionsattempted").innerHTML="Questions answered: "+questionsDone;
        document.getElementById("rightanswers").innerHTML="CorrectAnswers: "+rightAnswers;
        document.getElementById("wronganswers").innerHTML="WrongAnswers: "+wrongAnswers;
        document.getElementById("marks").innerHTML="Final Score: "+score;
        document.getElementById("timetaken").innerHTML=60-sec+" seconds";
        document.getElementById("remarks").innerHTML=comment;
        document.getElementById("remarks").style.color=resultColor;
    }
    
    document.getElementById("start-again").addEventListener("click",restartQuiz);
    
    function restartQuiz(){
        window.location.href="Quiz.html";
    }
    
    document.getElementById("start").addEventListener("click",beginQuiz);
    
    function beginQuiz(){
        clock();
        instructionContainer.classList.add("hide");
        quizContainer.classList.remove("hide");
        shuffleQuestions();
        displayQuestion();
    }
        
            
            
            
                
            
            
            
    