var 바디 = document.body;

var 숫자후보;
var 숫자배열;

function 숫자뽑기() {
	숫자후보 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	숫자배열 = [];
	for (var i = 0; i < 4; i += 1) {
		var 뽑은것 = 숫자후보.splice(Math.ceil(Math.random() * (숫자후보.length - 1)), 1)[0];
		숫자배열.push(뽑은것);
	}
}

숫자뽑기();


console.log(숫자후보);
console.log(숫자배열);


var 결과 = document.createElement('h1');
바디.append(결과);
var 폼 = document.createElement('form');
바디.append(폼);
var 입력창 = document.createElement('input');
입력창.type = 'text';
입력창.maxLength = 4;
폼.append(입력창);
var 버튼 = document.createElement('button');
버튼.textContent = '입력!';
폼.append(버튼);

// 문자.split(구분자) -> 배열
// 배열.join(구분자) -> 문자
var 틀린횟수 = 0;
폼.addEventListener('submit', function (e) { // 콜백함수
	e.preventDefault();
	var 답 = Number(입력창.value);
	var 답 = 입력창.value;
	console.log(답, typeof 답, 숫자배열.join(''), typeof 숫자배열.join(''));
	if (답 === 숫자배열.join('')) {
		결과.textContent = '홈런';
		입력창.value = '';
		입력창.focus();

		숫자뽑기();

		틀린횟수 = 0;
		console.log(숫자후보);
		console.log(숫자배열);
	} else {
		var 답배열 = 답.split(''); // 답문자를 배열로
		var 스트라이크 = 0;
		var 볼 = 0;
		틀린횟수++;
		if (틀린횟수 > 4) { // 5번째 실행
			결과.textContent = 틀린횟수 + ' 번넘개틀려서 실패 답은 ' + 숫자배열.join(',');
			입력창.value = '';
			입력창.focus();

			숫자뽑기();

			틀린횟수 = 0;
		} else {
			console.log(답배열)
			console.log(숫자배열)
			for (var i = 0; i < 답배열.length; i++) {
				if (Number(답배열[i]) === 숫자배열[i]) {
					스트라이크 += 1;
				} else if (숫자배열.indexOf(Number(답배열[i])) > -1) {
					볼 += 1;
				}
			}
			결과.textContent = 스트라이크 + '스트라이크' + 볼 + '볼';
		}

	}
});