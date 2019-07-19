var 테이블 = document.getElementById('table');
var 데이터 = [];

function 초기화() {
  var fragment = document.createDocumentFragment();
  [1, 2, 3, 4].forEach(function (행) {
    var 행데이터 = [];
    데이터.push(행데이터);

    var tr = document.createElement('tr');
    [1, 2, 3, 4].forEach(function (열) {
      행데이터.push(0);
      var td = document.createElement('td');
      tr.appendChild(td);
    });
    fragment.appendChild(tr);
  });
  테이블.appendChild(fragment);
}

function 랜덤생성() {
  var 빈칸배열 = [];
  데이터.forEach(function (행데이터, i) {
    행데이터.forEach(function (열데이터, j) {
      if (!열데이터) {
        빈칸배열.push([i, j]);
      }
    });
  });
  // 빈칸배열.forEach(function(item, i){
  //   console.log(테이블.children[item[0]].children[item[1]]);
  // })
  var 랜덤칸 = 빈칸배열[Math.floor(Math.random() * 빈칸배열.length)];
  데이터[랜덤칸[0]][랜덤칸[1]] = 2;
  그리기();
}

function 그리기() {
  데이터.forEach(function (행데이터, i) {
    행데이터.forEach(function (열데이터, j) {
      if (열데이터 > 0) {
        테이블.children[i].children[j].textContent = 열데이터;
      } else {
        테이블.children[i].children[j].textContent = '';
      }
    });
  });
}

초기화();
랜덤생성();
그리기();