var tetris = document.querySelector('#tetris');
var tetrisData = [];
var currentBlock;
var nextBlock;
var currentTopLeft = [0, 3];
var blocks = [{
    name: 's', // 네모
    center: false,
    numCode: 1,
    color: 'red',
    currentShapeIndex: 0,
    shape: [
      [
        [0, 0, 0],
        [0, 1, 1],
        [0, 1, 1],
      ]
    ],
  }, //네모
  {
    name: 't', //T자
    center: true,
    numCode: 2,
    color: 'orange',
    currentShapeIndex: 0,
    shape: [
      [
        [0, 0, 0], // 아래
        [1, 1, 1],
        [0, 1, 0],
      ],
      [
        [0, 1, 0], // 왼
        [1, 1, 0],
        [0, 1, 0],
      ],
      [
        [0, 1, 0], //위
        [1, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 1, 0], // 오른
        [0, 1, 1],
        [0, 1, 0],
      ],
    ]
  }, //T자
  {
    name: 'z', // 지그재그
    center: true,
    numCode: 3,
    color: 'yellow',
    currentShapeIndex: 0,
    shape: [
      [
        [0, 0, 0],
        [1, 1, 0],
        [0, 1, 1]
      ],
      [
        [0, 1, 0],
        [1, 1, 0],
        [1, 0, 0]
      ],
      [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]
      ],
      [
        [0, 0, 1],
        [0, 1, 1],
        [0, 1, 0]
      ]
    ]
  }, // 지그재그
  {
    name: 'zr', // 반대 지그재그
    center: true,
    numCode: 4,
    color: 'green',
    startRow: 1,
    currentShapeIndex: 0,
    shape: [
      [
        [0, 0, 0],
        [0, 1, 1],
        [1, 1, 0],
      ],
      [
        [1, 0, 0],
        [1, 1, 0],
        [0, 1, 0],
      ],
      [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
      ],
      [
        [0, 1, 0],
        [0, 1, 1],
        [0, 0, 1],
      ],
    ]
  },
  {
    name: 'l', // L자
    center: true,
    numCode: 5,
    color: 'blue',
    currentShapeIndex: 0,
    shape: [
      [
        [0, 0, 0],
        [1, 1, 1],
        [1, 0, 0],
      ],
      [
        [1, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
      ],
      [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 1],
      ],
    ]
  },
  {
    name: 'lr', // 반대 L자
    center: true,
    numCode: 6,
    color: 'navy',
    currentShapeIndex: 0,
    shape: [
      [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 1],
      ],
      [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0],
      ],
      [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 1, 1],
        [0, 1, 0],
        [0, 1, 0],
      ],
    ]
  },
  {
    name: 'b', // 1자
    center: true,
    numCode: 7,
    color: 'violet',
    currentShapeIndex: 0,
    shape: [
      [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
      ],
      [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
      ],
      [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
      ],
    ]
  }
] //blocks

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'navy', 'violet'];
const isActiveBlock = value => (value > 0 && value < 10);
const isInvalidBlock = value => (value === undefined || value >= 10);

// 틱실행
// let int = setInterval(tick, 500);
init();
generate();


function init() {
  const fragment = document.createDocumentFragment();
  // 0 ~ 19 
  [...Array(20).keys()].forEach((row, i) => {
    const tr = document.createElement('tr');
    fragment.appendChild(tr);
    [...Array(10).keys()].forEach((col, j) => {
      const td = document.createElement('td');
      tr.appendChild(td);
    }) // 열데이터들
    const column = Array(10).fill(0);
    tetrisData.push(column);
  }) // [...Array(20).keys()]
  tetris.appendChild(fragment);
}


function generate() { // 테트리스 블록 생성  
  if (!currentBlock) {
    currentBlock = blocks[Math.floor(Math.random() * blocks.length)];
  } else {
    currentBlock = nextBlock;
  }
  currentBlock.currentShapeIndex = 0;
  nextBlock = blocks[Math.floor(Math.random() * blocks.length)];
  drawNext();
  currentTopLeft = [-1, 3];
  let isGameOver = false;
  currentBlock.shape[0].slice(1).forEach((row, i) => { // 게임 오버 판단
    row.forEach((col, j) => {
      if (col && tetrisData[i][j + 3]) {
        isGameOver = true;
      }
    })
  }) // 게임오버판단
  currentBlock.shape[0].slice(1).forEach((row, i) => { // 블록 데이터 생성
    row.forEach((col, j) => {
      if (col) {
        tetrisData[i][j + 3] = currentBlock.numCode;
      }
    })
  }) // 블록 데이터 생성
  console.log('generate', JSON.parse(JSON.stringify(currentBlock)));
  if (isGameOver) {
    clearInterval(int);
    draw();
    alert('game over');
  } else {
    draw();
  }
} // generate

function draw() {
  console.log('drawed', JSON.parse(JSON.stringify(tetrisData)), JSON.parse(JSON.stringify(currentBlock)));
  tetrisData.forEach((row, i) => {
    row.forEach((col, j) => {
      if (col > 0) {
        tetris.children[i].children[j].className = tetrisData[i][j] >= 10 ?
          colors[tetrisData[i][j] / 10 - 1] :
          colors[tetrisData[i][j] - 1];
      } else {
        tetris.children[i].children[j].className = '';
      }
    }) // col
  }) // row
}

function tick() { // 한 칸 아래로
  const nextTopLeft = [currentTopLeft[0] + 1, currentTopLeft[1]];
  const activeBlocks = [];
  let canGoDown = true;
  let currentBlockShape = currentBlock.shape[currentBlock.currentShapeIndex];
  // i = -1;  i < 2; -1, 0, 1
  for (let i = currentTopLeft[0]; i < currentTopLeft[0] + currentBlockShape.length; i++) { // 아래 블록 있으면
    if (i < 0 || i >= 20) continue;
    // j 3, 4, 5
    for (let j = currentTopLeft[1]; j < currentTopLeft[1] + currentBlockShape.length; j++) {
      console.log(i, j);
      if (isActiveBlock(tetrisData[i][j])) { // 현재 움직이는 블럭이면
        activeBlocks.push([i, j]);
        if (isInvalidBlock(tetrisData[i + 1] && tetrisData[i + 1][j])) {
          console.log('아래 블럭이 있다!', i, j, tetrisData[i][j], tetrisData[i + 1] && tetrisData[i + 1][j], JSON.parse(JSON.stringify(tetrisData)));
          canGoDown = false;
        }
      }
    } // 열?
  } // 행
  if (!canGoDown) {
    activeBlocks.forEach((blocks) => {
      tetrisData[blocks[0]][blocks[1]] *= 10;
    }) // 현재 움직일 블록
    checkRows(); // 지울 줄 있나 확인
    generate(); // 새블록 생성
    return false;
  } else if (canGoDown) {
    for (let i = tetrisData.length - 1; i >= 0; i--) {
      const row = tetrisData[i];
      row.forEach((col, j) => {
        if (col < 10 && tetrisData[i + 1] && tetrisData[i + 1][j] < 10) {
          tetrisData[i + 1][j] = col;
          tetrisData[i][j] = 0;
        }
      }) // 열
    } // 행
    currentTopLeft = nextTopLeft;
    draw();
    return true;
  }
} // tick

// 줄 다찼는지 확인
function checkRows() {
  const fullRows = [];
  tetrisData.forEach((row, i) => {
    let count = 0;
    row.forEach((col, j) => {
      if (col > 0) {
        count++;
      }
    }) //열
    if (count === 10) {
      fullRows.push(i);
    }
  }) //행
  const fullRowsCount = fullRows.length;
  tetrisData = tetrisData.filter((row, i) => !fullRows.includes(i));
  for (let i = 0; i < fullRowsCount; i++) {
    tetrisData.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  }
  let score = parseInt(document.getElementById('score').textContent, 10);
  score += fullRowsCount ** 2;
  document.getElementById('score').textContent = String(score);
} //checkRows

window.addEventListener('keydown', (e) => {
  switch (e.code) {
    case 'ArrowLeft': {
      const nextTopLeft = [currentTopLeft[0], currentTopLeft[1] - 1];
      let isMovable = true;
      let currentBlockShape = currentBlock.shape[currentBlock.currentShapeIndex];
      for (let i = currentTopLeft[0]; i < currentTopLeft[0] + currentBlockShape.length; i++) {
        if (!isMovable) break;
        for (let j = currentTopLeft[1]; j < currentTopLeft[1] + currentBlockShape.length; j++) {
          if (!tetrisData[i] || !tetrisData[i][j]) continue;
          if (isActiveBlock(tetrisData[i][j]) && isInvalidBlock(tetrisData[i] && tetrisData[i][j - 1])) {
            isMovable = false;
          }
        } //열
      } // 행
      if (isMovable) {
        currentTopLeft = nextTopLeft;
        tetrisData.forEach((row, i) => {
          for (var j = 0; j < row.length; j++) {
            const col = row[j];
            if (tetrisData[i][j - 1] === 0 && col < 10) {
              tetrisData[i][j - 1] = col;
              tetrisData[i][j] = 0;
            }
          } //열
        }) //행
        draw();
      } // 왼쪽으로 이동가능하면
      break;
    } //ArrowLeft
    case 'ArrowRight': {
      const nextTopLeft = [currentTopLeft[0], currentTopLeft[1] + 1];
      let isMovable = true;
      let currentBlockShape = currentBlock.shape[currentBlock.currentShapeIndex];
      for (let i = currentTopLeft[0]; i < currentTopLeft[0] + currentBlockShape.length; i++) {
        if (!isMovable) break;
        for (let j = currentTopLeft[1]; j < currentTopLeft[1] + currentBlockShape.length; j++) {
          if (!tetrisData[i] || !tetrisData[i][j]) continue;
          if (isActiveBlock(tetrisData[i][j]) && isInvalidBlock(tetrisData[i] && tetrisData[i][j + 1])) {
            isMovable = false;
          }
        } //열
      } // 행
      if (isMovable) {
        currentTopLeft = nextTopLeft;
        tetrisData.forEach((row, i) => {
          for (var j = row.length - 1; j > -1; j--) {
            const col = row[j];
            if (tetrisData[i][j + 1] === 0 && col < 10) {
              tetrisData[i][j + 1] = col;
              tetrisData[i][j] = 0;
            }
          } //열
        }) //행
        draw();
      } // 왼쪽으로 이동가능하면
      break;
    } //ArrowRight
  } // switch
}) // 키다운

// 오른쪽 위 화면에 다음 나올 테트리스 보여줌
function drawNext() {
  const nextTable = document.getElementById('next-table');
  nextTable.querySelectorAll('tr').forEach((row, i) => {
    Array.from(row.children).forEach((col, j) => {
      if (nextBlock.shape[0][i] && nextBlock.shape[0][i][j] > 0) {
        nextTable.querySelectorAll('tr')[i].children[j].className = colors[nextBlock.numCode - 1];
      } else {
        nextTable.querySelectorAll('tr')[i].children[j].className = 'white';
      }
    }) //col
  }) //row
}