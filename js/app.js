/*------------------------ Constants --------------------------------*/

const winningCombos = [
  [0, 1, 2],[3, 4, 5],[6, 7, 8],
  [0, 3, 6],[1, 4, 7],[2, 5, 8],
  [0, 4, 8],[2, 4, 6]
];

console.log(winningCombos)

/*----------------------Variables (state) --------------------------*/

let board, turn, winner

/*------------------------ Cached Element References ----------------*/

const squareEls = document.querySelectorAll(".board > div")
const messageEl = document.querySelector("#message")
const boardEl = document.querySelector('.board')
const resetBtnEl = document.querySelector('#reset-button')
const button = document.querySelector('#btn')
console.log(button)
button.style.border = '1px solid red'

/*--------------------------- Event Listeners -----------------------*/

boardEl.addEventListener('click', handleClick) 
resetBtnEl.addEventListener('click', init)
button.addEventListener('click', handleBtn)

/*------------------------------ Functions --------------------------*/

function handleBtn(e) {
  console.log(e.target.id)
}

init()

function init() {
  board =[
    null, null, null, 
    null, null, null,
    null, null, null]
  console.log(board)
  turn = 1
  winner = null
  render()
}

function handleClick(evt) {
  console.log(evt.target.id);
  //converts id of target div into a number (with parseInt), assigns that number to variable sqIdx
  let sqIdx = parseInt(evt.target.id[2]) 
  console.log(sqIdx)
  if (isNaN(sqIdx)) {
    return 
  }
  if (winner) {
    return
  }
  if (board[sqIdx]) {
    return 
  }
  board[sqIdx] = turn 
  console.log('board after click', board);
  turn = turn * -1 
  winner = getWinner()
  render()
}


function getWinner() {
  let winnersCombo = false
  winningCombos.forEach(function (combo) {
    if (Math.abs(board[combo[0]] + board[combo[1]] + board[combo[2]]) === 3) {
      winnersCombo = true
    }
  })
  if (winnersCombo === true) {
    return turn * -1
  } else if (board.every((sq) => sq !== null)) {
  // When checking for a tie, the every method might be more appropriate.
    return 'T'
  }
  return null
}

function render() {
  board.forEach(function(square, idx) {
    if (square === 1) {
      squareEls[idx].textContent = 'X'
    } else if (square === -1) {
      squareEls[idx].textContent = '0'
    } else {
      squareEls[idx].textContent = ''
    }
  })
  if (winner === null) {
    if(turn === 1) {
      messageEl.textContent = "Player One - Time to play!"
    } else {
      messageEl.textContent = "Player Two - Time to play!"
    }
  } else if (winner === 'T') {
    messageEl.textContent = "It's a tie!"
  } else if (winner === 1) {
    messageEl.textContent = "Player One Wins!"
    } else if (winner === -1)
    messageEl.textContent = "Player Two Wins!"
}