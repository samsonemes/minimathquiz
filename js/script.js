const problemElement = document.querySelector('.problem')
const form = document.querySelector('#our-form')
const inputField = document.querySelector("#answer")
const points = document.querySelector("#points")
const chances = document.querySelector("#chances")
const progress = document.querySelector('.radar-inner')
const endMessage = document.querySelector('.message')
const problemText = document.querySelector('.problem')
const resetStart  = document.querySelector('#start')




//state
let state = {
    score: 0,
    wrong: 0
}


form.addEventListener('submit', (e) => {
    e.preventDefault();

    let rightAnswer;
    const prob = state.currentProblem;

    if(prob.operator == "+") rightAnswer = prob.num1 + prob.num2
    if(prob.operator == "-") rightAnswer = prob.num1 - prob.num2
    if(prob.operator == "x") rightAnswer = prob.num1 * prob.num2

    //return console.log(rightAnswer)

    if (parseInt(inputField.value, 10) === rightAnswer) {
        state.score++;
        points.innerHTML--;
        problemText.classList.add('animate-right')
        setTimeout(() => {
            problemText.classList.remove('animate-right')
        }, 500);
        setTimeout(() => {
            updateProblem();
        }, 1000);
        
        renderProgress()
    } else {
        state.wrong++; 
        chances.innerHTML--;
        problemText.classList.add('animate-wrong')
        setTimeout(() => {
            problemText.classList.remove('animate-wrong')
        }, 500);
        setTimeout(() => {
            updateProblem();
        }, 1000);
        
    }

    setLogin()

})

// logic when user wins / lose
function setLogin(){
    if(state.score == 10){
        endMessage.innerHTML = "Congrats, You Won!";
        document.body.classList.add('overlay-open')
    }
    if(state.wrong == 3){
        endMessage.innerHTML = "Oops, You lost!";
        document.body.classList.add('overlay-open')
    }

    
}

//reset Game
function resetGame(){
    state.score = 0;
    state.wrong = 0;
    points.innerHTML = 10;
    chances.innerHTML = 2;
    renderProgress();
}


//progress bar
function renderProgress(){
    progress.style.transform = `scaleX(${state.score / 10})`
}



//update problem
function updateProblem(){
    state.currentProblem = generateProblem()
    problemElement.innerHTML = `${state.currentProblem.num1} ${state.currentProblem.operator} ${state.currentProblem.num2}`
    inputField.value = ""
    inputField.focus()
}

updateProblem()

// random number
function generateNumber(max){
    return Math.floor(Math.random() * (max + 1))
}

//problem
function generateProblem(){
    let randomOperator = Math.floor(Math.random() * 3)
    return {
        num1: generateNumber(20),
        num2: generateNumber(20),
        operator: ['+', '-' , 'x'][randomOperator]

    }
}


//reset game
resetStart.addEventListener('click', () => {
    resetGame()
    document.body.classList.remove('overlay-open')
})