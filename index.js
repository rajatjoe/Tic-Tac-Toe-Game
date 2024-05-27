const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// initialise the game
function initGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];

    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box${index + 1}`;
    });

    newGameBtn.classList.remove("active");
    gameInfo.innerHTML = `Current Player - ${currentPlayer}`;
}

initGame();

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
})


function handleClick(index) {
    if (gameGrid[index] === "") {
        boxes[index].innerHTML = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        swapTurn();
        checkWinner();
    }
}

function swapTurn() {
    if (currentPlayer == "X") {
        currentPlayer = "0";
    }
    else {
        currentPlayer = "X";
    }

    // UI update
    gameInfo.innerHTML = `Current Player - ${currentPlayer}`;
}

newGameBtn.addEventListener("click", initGame);

function checkWinner() {
    let answer = "";

    winningPositions.forEach((position) => {
        if ((gameGrid[position[0]] != "" || gameGrid[position[0]] != "" || gameGrid[position[0]] != "") &&
            (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])){
                if(gameGrid[position[0]]=="X"){
                    answer="X";
                }
                else{
                    answer="Y";
                }

                //disable pointer 
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
                boxes.forEach((box)=>{
                    box.style.pointerEvents="none";
                })

                
                
            }
    })

    //winner found
    if(answer!==""){
        gameInfo.innerText=`Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return ;
    }

    //no winner or tie is there
    let fillcount=0;
    gameGrid.forEach((box)=>{
        if(box!==""){
            fillcount++;
        }
    });

    if(fillcount=== 9){
        gameInfo.innerText=`Game Tied !!`
        newGameBtn.classList.add("active");
    }



}