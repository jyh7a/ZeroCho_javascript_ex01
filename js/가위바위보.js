var 이미지좌표 = 0;
var 가위바위보 = { // 딕셔너리 자료구조
	바위: '0',
	가위: '-142px',
	보: '-284px',
};


function 컴퓨터의선택(이미지좌표) {
	return Object.entries(가위바위보).find(function (v) {
		return v[1] == 이미지좌표; // 배열전체 리턴
	})[0];
}

var 타임아웃;
var 인터벌;

function 인터벌메이커() {
	인터벌 = setInterval(function () {
		if (이미지좌표 === 가위바위보.가위) {
			이미지좌표 = 가위바위보.바위;
		} else if (이미지좌표 === 가위바위보.바위) {
			이미지좌표 = 가위바위보.보;
		} else {
			이미지좌표 = 가위바위보.가위;
		}
		document.querySelector('#computer').style.background = 'url(../img/%EA%B0%80%EC%9C%84%EB%B0%94%EC%9C%84%EB%B3%B4.jpg)' + 이미지좌표 + ' 0';
	}, 100);
}
인터벌메이커();

var 점수표 = {
	가위:1,
	바위:0,
	보:-1
}

document.querySelectorAll('.btn').forEach(function (btn) {
	btn.addEventListener('click', function () {
		clearInterval(인터벌);
		clearTimeout(타임아웃);
		타임아웃 = setTimeout(function () {
			인터벌메이커();
		}, 1000)
		var 나의선택 = this.textContent;
		var 나의점수 = 점수표[나의선택];
		var 컴퓨터점수 = 점수표[컴퓨터의선택(이미지좌표)];
		var 차이 = 나의점수 - 컴퓨터점수;
		console.log(나의선택, 컴퓨터의선택(이미지좌표));		
		if(차이 === 0){
			alert('비겼습니다.');
		}else if([-1,2].includes(차이)){
			alert('이겼습니다.');
		}else{
			alert('졌습니다.');
		}
	})
});

// 가위 1, 바위 0, 보 -1
// 나 / 컴퓨터		가위		바위		보
//		   가위    1 1     1 0   1 -1
//		   바위    0 1     0 0   0 -1
//        보    -1 1    -1 0  -1 -1		
// 비김 : 내선택 - 컴선택 = 0
// 이김 : 내선택 - 컴선택 = 2, -1
//   짐:  내선택 - 컴선택 = 1, -2



