var tetris = document.querySelector('#tetris');
var tetrisData = [];

function 칸만들기() {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < 20; i++) {
    var tr = document.createElement('tr');
    fragment.appendChild(tr);
    for (var j = 0; j < 10; j++) {
      var td = document.createElement('td');
      tr.appendChild(td);
    }
  }
  tetris.appendChild(fragment);
} // 칸만들기

칸만들기();

window.addEventListener('keypress', function (e) {
  this.console.log(e);
  switch (e.code) {
    case 'Space':
      break;
    case 'ArrowRight':
      this.console.log('right');
      break;
    case 'ArrowLeft':
      break;
    case 'ArrowDown':
      break;
    case 'ArrowUp':
      break;
    default:
      break;
  }

  // if (e.code === 'Space') { // 한방에 내리기

  // } else if (e.code === "ArrowRight") { // 오른쪽 이동

  // } else if (e.code === "ArrowLeft") { // 왼쪽 이동

  // } else if (e.code === "ArrowDown") { // 아래쪽 이동

  // } else if (e.code === "ArrowUp") { // 방향전환

  // }
}); // keyup