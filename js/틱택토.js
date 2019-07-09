var 바디 = document.body;
var 테이블 = document.createElement('table');
var 줄들 = [];
var 칸들 = [];
var 턴 = 'X';
var 결과 = document.createElement('div');

function 결과체크(몇줄, 몇칸) {
	// 세칸다 체워졌나?
	var 승리여부 = false;
	// 가로줄 검사
	if (
		칸들[몇줄][0].textContent === 턴 &&
		칸들[몇줄][1].textContent === 턴 &&
		칸들[몇줄][2].textContent === 턴
	) {
		승리여부 = true;
	}
	// 세로줄 검사
	if (칸들[0][몇칸].textContent === 턴 &&
		칸들[1][몇칸].textContent === 턴 &&
		칸들[2][몇칸].textContent === 턴
	) {
		승리여부 = true;
	}
	// 대각선 검사	
	if (
		칸들[0][0].textContent === 턴 &&
		칸들[1][1].textContent === 턴 &&
		칸들[2][2].textContent === 턴
	) {
		승리여부 = true;
	}
	if (
		칸들[0][2].textContent === 턴 &&
		칸들[1][1].textContent === 턴 &&
		칸들[2][0].textContent === 턴
	) {
		승리여부 = true;
	}
	return 승리여부;
}

function 초기화(무승부) {
	if (무승부) {
		결과.textContent = '무승부';
	} else {
		결과.textContent = 턴 + '님이 승리!';
	}

	setTimeout(function () {
		결과.textContent = '';
		칸들.forEach(function (줄) {
			줄.forEach(function (칸) {
				칸.textContent = '';
			});
		});
		턴 = 'X';
	}, 1000);
}


var 비동기콜백 = function (이벤트) { // 칸을 클릭했을 때
	if (턴 === 'O') { // 컴퓨터의 턴일 때 내가 클릭하지 않도록
		return;
	}
	var 몇줄 = 줄들.indexOf(이벤트.target.parentNode);
	var 몇칸 = 칸들[몇줄].indexOf(이벤트.target);

	if (칸들[몇줄][몇칸].textContent !== '') { // 칸이 이미 채워져 있는가?
		console.log('빈칸이 아닙니다');
		alert('빈칸을 눌러 이놈아 ㅇㅅㅇ~!');
	} else {
		console.log('빈칸입니다');
		칸들[몇줄][몇칸].textContent = 턴;
		var 승리여부 = 결과체크(몇줄, 몇칸);
		// 모든칸이 다 찼는지 검사
		var 후보칸 = [];
		칸들.forEach(function (줄) {
			줄.forEach(function (칸) {
				후보칸.push(칸);
			});
		});
		후보칸 = 후보칸.filter(function (칸) {
			return !칸.textContent;
		}); // '', 0, NaN, undefined, null, false
		console.log('후보칸:', 후보칸, 후보칸.length);
		if (승리여부) {
			초기화(false);
		} else if (후보칸.length === 0) { // 칸을 더이상 선택할 수 없음
			초기화(true);
		} else { // 다 안 찼으면
			if (턴 === 'X') {
				턴 = 'O';
			}
			setTimeout(function () {
				// 빈 칸 중 하나를 고른다.						
				var 선택칸 = 후보칸[Math.floor(Math.random() * 후보칸.length)];
				선택칸.textContent = 턴;
				// 컴퓨터가 승리했는지 체크
				var 몇줄 = 줄들.indexOf(선택칸.parentNode);
				var 몇칸 = 칸들[몇줄].indexOf(선택칸);
				var 승리여부 = 결과체크(몇줄, 몇칸);
				// 다찼으면
				if (승리여부) {
					초기화(false);
					// 턴을 나한테 넘긴다.
					턴 = 'X';
				} else {
					턴 = 'X';
				}
			}, 1000)
		}
	} // 첫번째 승리여부검사 
};

// 내가만든것
/*var clickFlag = true;
var 최대클릭횟수;
var 현재클릭횟수 = 0;
var 누군가정답일때 = false;*/

/*function 정답일때함수(무승부) {
	if (무승부 === undefined) {
		누군가정답일때 = true;
		clickFlag = false;
		턴 === 'X' ? 턴 = 'O' : 턴 = 'X';
		alert(턴 + ' 승리');
		setTimeout(function () {
			for (var i = 0; i < 3; i++) {
				for (var j = 0; j < 3; j++) {
					칸들[i][j].textContent = '';
				}
			}
			누군가정답일때 = false;
			clickFlag = true;
			현재클릭횟수 = 0;
			턴 = 'X';
		}, 1000)
	} else {
		clickFlag = false;
		턴 === 'X' ? 턴 = 'O' : 턴 = 'X';
		alert('무승부');
		setTimeout(function () {
			for (var i = 0; i < 3; i++) {
				for (var j = 0; j < 3; j++) {
					칸들[i][j].textContent = '';
				}
			}
			clickFlag = true;
			현재클릭횟수 = 0;
			턴 = 'X';
		}, 1000)
	}

}*/

// 내가만든것 함수 -> 오목적용 가능할듯
/*
var 비동기콜백 = function (이벤트) {
	if (clickFlag) {
		var 몇줄 = 줄들.indexOf(이벤트.target.parentNode);
		var 몇칸 = 칸들[몇줄].indexOf(이벤트.target);
		var 칸오른쪽으로더하기 = 1;
		var 칸위쪽으로더하기 = 1;
		var 칸왼쪽으로빼기 = 1;
		var 칸아래쪽으로빼기 = 1;
		var 대각선위_X = 1;
		var 대각선위_Y = 1;
		var 대각선아래_X = 1;
		var 대각선아래_Y = 1;
		var 대각선왼쪽위_X = 1;
		var 대각선왼쪽위_Y = 1;
		var 대각선왼쪽아래_X = 1;
		var 대각선왼쪽아래_Y = 1;

		if (칸들[몇줄][몇칸].textContent !== "") { //칸이 이미 채워져 있는가?
			// 빈칸 X

		} else {
			// 빈칸 0			
			현재클릭횟수 += 1;


			칸들[몇줄][몇칸].textContent = 턴;
			턴 === 'X' ? 턴 = 'O' : 턴 = 'X';

			// 세칸 다 채워졌나?
			var 현재칸상태 = 칸들[몇줄][몇칸].textContent;
			var 가로배열 = [];
			var 세로배열 = [];
			var 대각선배열 = [];
			var 대각선왼쪽배열 = [];

			if (몇줄 >= 0 && 몇줄 <= 2) {
				while (칸들[몇줄][몇칸 + 칸오른쪽으로더하기] !== undefined && 칸들[몇줄][몇칸 + 칸오른쪽으로더하기].textContent !== "") {
					//오른쪽으로
					현재칸상태 = 칸들[몇줄][몇칸 + 칸오른쪽으로더하기];
					가로배열.push(현재칸상태);
					칸오른쪽으로더하기++;
				}
				while (칸들[몇줄][몇칸 - 칸왼쪽으로빼기] !== undefined && 칸들[몇줄][몇칸 - 칸왼쪽으로빼기].textContent !== "") {
					//왼쪽으로
					현재칸상태 = 칸들[몇줄][몇칸 - 칸왼쪽으로빼기];
					가로배열.push(현재칸상태);
					칸왼쪽으로빼기++;
				}
				if (몇줄 - 칸위쪽으로더하기 >= 0 || 몇줄 - 대각선위_Y >= 0) {
					while (칸들[몇줄 - 칸위쪽으로더하기][몇칸] !== undefined && 칸들[몇줄 - 칸위쪽으로더하기][몇칸].textContent !== "") {
						//위쪽으로			
						현재칸상태 = 칸들[몇줄 - 칸위쪽으로더하기][몇칸];
						세로배열.push(현재칸상태);
						칸위쪽으로더하기++;
						if (몇줄 - 칸위쪽으로더하기 < 0) {
							break;
						}
					}

					while (칸들[몇줄 - 대각선위_Y][몇칸 + 대각선위_X] !== undefined && 칸들[몇줄 - 대각선위_Y][몇칸 + 대각선위_X].textContent !== "") {
						//대각선위		
						현재칸상태 = 칸들[몇줄 - 대각선위_Y][몇칸 + 대각선위_X];
						대각선배열.push(현재칸상태);
						대각선위_Y++;
						대각선위_X++;
						if (몇줄 - 대각선위_Y < 0) {
							break;
						}
					}

					while (칸들[몇줄 - 대각선왼쪽위_Y][몇칸 - 대각선왼쪽위_X] !== undefined && 칸들[몇줄 - 대각선왼쪽위_Y][몇칸 - 대각선왼쪽위_X].textContent !== "") {
						//대각선왼쪽위		
						현재칸상태 = 칸들[몇줄 - 대각선왼쪽위_Y][몇칸 - 대각선왼쪽위_X];
						대각선왼쪽배열.push(현재칸상태);
						대각선왼쪽위_Y++;
						대각선왼쪽위_X++;
						if (몇줄 - 대각선왼쪽위_Y < 0) {
							break;
						}
					}
				}
				if (몇줄 + 칸아래쪽으로빼기 <= 2) {
					while (칸들[몇줄 + 칸아래쪽으로빼기][몇칸] !== undefined && 칸들[몇줄 + 칸아래쪽으로빼기][몇칸].textContent !== "") {
						//아래쪽으로			
						현재칸상태 = 칸들[몇줄 + 칸아래쪽으로빼기][몇칸];
						세로배열.push(현재칸상태);
						칸아래쪽으로빼기++;
						if (몇줄 + 칸아래쪽으로빼기 > 2) {
							break;
						}
					}

					while (칸들[몇줄 + 대각선아래_Y][몇칸 - 대각선아래_X] !== undefined && 칸들[몇줄 + 대각선아래_Y][몇칸 - 대각선아래_X].textContent !== "") {
						//대각선아래		
						현재칸상태 = 칸들[몇줄 + 대각선아래_Y][몇칸 - 대각선아래_X];
						대각선배열.push(현재칸상태);
						대각선아래_Y++;
						대각선아래_X++;
						if (몇줄 + 대각선아래_Y > 2) {
							break;
						}
					}

					while (칸들[몇줄 + 대각선왼쪽아래_Y][몇칸 + 대각선왼쪽아래_X] !== undefined && 칸들[몇줄 + 대각선왼쪽아래_Y][몇칸 + 대각선왼쪽아래_X].textContent !== "") {
						//대각선왼쪽아래		
						현재칸상태 = 칸들[몇줄 + 대각선왼쪽아래_Y][몇칸 + 대각선왼쪽아래_X];
						대각선왼쪽배열.push(현재칸상태);
						대각선왼쪽아래_Y++;
						대각선왼쪽아래_X++;
						if (몇줄 + 대각선왼쪽아래_Y > 2) {
							break;
						}
					}
				}

				현재칸상태 = 칸들[몇줄][몇칸];
				가로배열.push(현재칸상태);
				세로배열.push(현재칸상태);
				대각선배열.push(현재칸상태);
				대각선왼쪽배열.push(현재칸상태);

				if (가로배열.length === 3) {
					if (가로배열[0].textContent === 가로배열[1].textContent && 가로배열[1].textContent === 가로배열[2].textContent) {
						정답일때함수();
					}
				}
				if (세로배열.length === 3) {
					if (세로배열[0].textContent === 세로배열[1].textContent && 세로배열[1].textContent === 세로배열[2].textContent) {
						정답일때함수();
					}
				}
				if (대각선배열.length === 3) {
					if (대각선배열[0].textContent === 대각선배열[1].textContent && 대각선배열[1].textContent === 대각선배열[2].textContent) {
						정답일때함수();
					}
				}
				if (대각선왼쪽배열.length === 3) {
					if (대각선왼쪽배열[0].textContent === 대각선왼쪽배열[1].textContent && 대각선왼쪽배열[1].textContent === 대각선왼쪽배열[2].textContent) {
						정답일때함수();
					}
				}
				if (최대클릭횟수 === 현재클릭횟수 && 누군가정답일때 === false) {
					정답일때함수('무승부');
				}
			}
			console.log('');
		}
	}
};
*/

for (var i = 0; i < 3; i++) {
	var 줄 = document.createElement('tr');
	줄들.push(줄);
	칸들.push([]);
	for (var j = 0; j < 3; j++) {
		var 칸 = document.createElement('td');
		칸.addEventListener('click', 비동기콜백);
		칸들[i].push(칸);
		줄.append(칸);
	}
	/*최대클릭횟수 = 줄들.length * 칸들[0].length;*/
	테이블.append(줄);
}

바디.append(테이블);
바디.append(결과);