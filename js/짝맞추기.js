var 가로 = 4;
var 세로 = 3;
var 색깔후보 = ['red', 'red', 'orange', 'orange', 'green', 'green', 'yellow', 'yellow', 'white', 'white', 'pink', 'pink'];
var 색깔 = [];
var 클릭플래그 = true;
var 클릭카드 = [];
var 완성카드 = [];
var 시작시간; 

var timer;
var second = 0;

for (var i = 0; 색깔후보.length > 0; i += 1) {
  색깔 = 색깔.concat(색깔후보.splice(Math.floor(Math.random() * 색깔후보.length), 1));
}
console.log(색깔);

function 카드세팅(가로, 세로) {
  var timerEle = document.querySelector('.timer');

  클릭플래그 = false;
  var card_wrap = document.createElement('div');
  card_wrap.className = 'card-wrap';
  for (var i = 0; i < 가로 * 세로; i += 1) {
    var card = document.createElement('div');
    card.className = 'card'; //card.classList.add('card')
    var cardInner = document.createElement('div');
    cardInner.className = 'card-inner';
    var cardFront = document.createElement('div');
    cardFront.className = 'card-front';
    var cardBack = document.createElement('div');
    cardBack.className = 'card-back';
    cardBack.style.backgroundColor = 색깔[i];

    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);
    card_wrap.appendChild(card);

    // 카드를 클릭 했을때
    (function (c) {
      c.addEventListener('click', function (e) {
        console.log('완성카드', 완성카드.includes(c));
        if (클릭플래그 && !완성카드.includes(c)) {
          c.classList.toggle('flipped');
          클릭카드.push(c);
          if (클릭카드.length === 2) {
            if (클릭카드[0].querySelector('.card-back').style.backgroundColor === 클릭카드[1].querySelector('.card-back').style.backgroundColor) {
              완성카드.push(클릭카드[0]);
              완성카드.push(클릭카드[1]);
              클릭카드 = [];
              if(완성카드.length === 가로 * 세로){
                var 끝시간 = new Date();                
                clearInterval(timer);
                alert('축하해 성공했쪄' + (끝시간 - 시작시간) / 1000 + '초 걸렸습니다.');
                document.querySelector('#wrapper').innerHTML = '';
                timerEle.textContent = '';
                second = 0;
                완성카드 = [];
                setTimeout(function(){
                  카드세팅(가로, 세로);
                }, 1000)
              }
            } else { // 두 카드의 색깔이 다르면
              클릭플래그 = false;
              setTimeout(function () {
                클릭카드[0].classList.remove('flipped');
                클릭카드[1].classList.remove('flipped');
                클릭카드 = [];
                setTimeout(function(){
                  클릭플래그 = true;
                }, 900)
              }, 1000)
            }
          } // length === 2
        }
      })
    })(card);
  } // for
  document.querySelector('#wrapper').appendChild(card_wrap);

  // 카드 1초부터 돌아가면서 초기셋팅
  document.querySelectorAll('.card').forEach(function (card, index) {
    setTimeout(function () {
      card.classList.add('flipped');
    }, 1000 + 100 * index);
  });

  // 4초부터 끝에서부터 카드 닫기
  setTimeout(function () {
    document.querySelectorAll('.card').forEach(function (card, index) {
      setTimeout(function () {
        card.classList.remove('flipped');
        if (index === 0) {
          시작시간 = new Date();
          클릭플래그 = true;
          timer = setInterval(function(){
            second += 1;
            timerEle.textContent = second + '초';
          }, 1000)
        }
      }, 1100 - 100 * index);
    });
  }, 4000);
} // 카드세팅

카드세팅(가로, 세로);