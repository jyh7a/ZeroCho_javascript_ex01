var tetris = document.querySelector('#tetris');
var blockArr = [
  ['red', true, [
    [1, 1],
    [1, 1]
  ]],
  ['blue', true, [
    [0, 2, 0],
    [2, 2, 2]
  ]],
  ['orange', true, [
    [3, 3, 0],
    [0, 3, 3]
  ]],
  ['skyblue', true, [
    [0, 4, 4],
    [4, 4, 0]
  ]],
  ['yellowgreen', true, [
    [5, 5, 5],
    [5, 0, 0]
  ]],
  ['pink', true, [
    [6, 6, 6],
    [0, 0, 6]
  ]],
  ['yellow', true, [
    [7, 7, 7, 7]
  ]]
];
var blockDict = {
  0: ['white', false, []],
  1: ['red', true, [
    [1, 1],
    [1, 1]
  ]],
  2: ['blue', true, [
    [0, 1, 0],
    [1, 1, 1]
  ]],
  3: ['orange', true, [
    [1, 1, 0],
    [0, 1, 1]
  ]],
  4: ['skyblue', true, [
    [0, 1, 1],
    [1, 1, 0]
  ]],
  5: ['yellowgreen', true, [
    [1, 1, 1],
    [1, 0, 0]
  ]],
  6: ['pink', true, [
    [1, 1, 1],
    [0, 0, 1]
  ]],
  7: ['yellow', true, [
    [1, 1, 1, 1]
  ]],
  10: ['red', false, [

  ]],
  20: ['blue', false, [

  ]],
  30: ['orange', false, [

  ]],
  40: ['skyblue', false, [

  ]],
  50: ['yellowgreen', false, [

  ]],
  60: ['pink', false, [

  ]],
  70: ['yellow', false, [

  ]],
}
var tetrisData = [

];
var stopDown = false;


function 칸만들기() {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < 20; i++) {
    var tr = document.createElement('tr');
    var arr = [];
    tetrisData.push(arr);
    fragment.appendChild(tr);
    for (var j = 0; j < 10; j++) {
      var td = document.createElement('td');
      tr.appendChild(td);
      arr.push(0);
    }
  } // second for
  tetris.appendChild(fragment);
} // 칸만들기

function 화면그리기() {
  tetrisData.forEach(function (tr, i) {
    tr.forEach(function (td, j) {
      tetris.children[i].children[j].className = '';
      tetris.children[i].children[j].className = blockDict[td][0];
    }) //td
  }) //tr
} // 화면그리기

function 블록생성기() {
  stopDown = false;
  var 블록 = blockArr[Math.floor(Math.random() * 7)][2];
  console.log(블록);
  블록.forEach(function (tr, i) {
    tr.forEach(function (td, j) {
      // TODO: 블록 생성할 때 이미 차있으면 게임오버
      tetrisData[i][j + 3] = td;
    })
  })
  화면그리기();
} // 블록생성기

function 블록내리기() {
  for (var i = tetrisData.length - 1; i >= 0; i--) {
    tetrisData[i].forEach(function (td, j) {
      if (td > 0 && td < 10) {
        if (tetrisData[i + 1] && !stopDown) {
          tetrisData[i + 1][j] = td;
          tetrisData[i][j] = 0;
        } else { //땅끝에 도달한경우
          stopDown = true;
          tetrisData[i][j] = td * 10;
        }
      } // 데이터가 1~10 살아있는 데이터면
    }) //forEach
  } //for
  if(stopDown){
    블록생성기();
  }
  화면그리기();
}

window.addEventListener('keydown', function (e) {
  switch (e.code) {
    case 'ArrowRight':
      this.console.log('right');
      break;
    case 'ArrowLeft':
      break;
    case 'ArrowDown':
      break;
    default:
      break;
  }
}); // keydown

window.addEventListener('keyup', function (e) {
  switch (e.code) {
    case 'Space': // 한방에 내리기

      break;
    case 'ArrowUp': // 방향 전환
      break;
    default:
      break;
  }
}); // keyup

칸만들기();
블록생성기();


// var timer1 = setInterval(블록내리기, 100);