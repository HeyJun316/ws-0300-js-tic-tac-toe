const restart = document.getElementById('restart');
const crossClass = document.querySelector('.cross');
const circleClass = document.querySelector('.circle');
const messageClass = document.querySelector('.message');
const tableClass = document.querySelector('.table');
const cells = document.querySelectorAll('.cell');
const circlePlayer = '○';
const circleNum = 1;
const crossPlayer = 'x';
const crossNum = 2;
const maxCellNum = 9;
const boardMaxIndex = 2;
const draw = 'draw';
const deleteCount = 1;

let currentPlayer = '○';
let count = 0;
let fin = false;
let board = [0, 0, 0, 0, 0, 0, 0, 0, 0];

const patterns = [
  // 横
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // 縦
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // 斜
  [0, 4, 8],
  [2, 4, 6]
]

cells.forEach(function (element, index) {
  element.addEventListener('click', function (e) {
    // 書き込まれてる場合、countが9の場合、一列揃った場合は、クリックしても無効化
    if (element.innerHTML !== '' || fin === true) {
      return;
    }

    // IDから取得しているのでDOMに依存している
    // なのでforEachの第二引数からindexを取得
    // let checkedId = element.id;

    // プレイヤーの記号を格納
    element.innerHTML = currentPlayer === circlePlayer ? circlePlayer : crossPlayer;
    board[index] = currentPlayer === circlePlayer ? circleNum: crossNum ;

    if (checkWin()) {
      messageClass.innerHTML = `${currentPlayer} win!!`;
      return fin = true;
    };

    switchPlayer();
    count++;

    // マスが全て埋まったら、’引き分け’を表示
    if (count === maxCellNum) {
      messageClass.innerHTML = draw;
      fin = true;
    }
  })
})

function switchPlayer() {
  if (currentPlayer === circlePlayer) {
    // プレイヤーを入れ替える
    currentPlayer = crossPlayer;
    // turnのアンダーバーの位置を入れ替える
    crossClass.classList.add('active');
    circleClass.classList.remove('active');
    return;
  } else {
    // プレイヤーを入れ替える
    currentPlayer = circlePlayer;
    // turnのアンダーバーの位置を入れ替える
    crossClass.classList.remove('active');
    circleClass.classList.add('active');
    return;
  }
}

// Restartクリック時の処理
restart.addEventListener('click', function () {
  window.location.reload();
});

// 勝敗チェック
function checkWin() {
  return patterns.some(([first, second, third]) => {
    if (board[first] !== 0 && (board[first] === board[second] && board[second] === board[third])) {
      return true
    }

    return false
  })
}
