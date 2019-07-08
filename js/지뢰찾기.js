var tbody = document.querySelector('#table tbody');
var dataset = []; // 전체 데이터배열
var 중단플래그 = false;
var 열은칸 = 0;
var 코드표 = {
	연칸: -1,
	물음표: -2,
	깃발: -3,
	깃발지뢰:-4,
	물음표지뢰:-5,
	지뢰: 1,
	보통칸: 0
}

document.querySelector('#exec').addEventListener('click', function () {
	tbody.innerHTML = '';
	dataset = [];
	중단플래그 = false;
	열은칸 = 0;
	var hor = parseInt(document.querySelector('#hor').value);
	var ver = parseInt(document.querySelector('#ver').value);
	var mine = parseInt(document.querySelector('#mine').value);

	for (var i = 0; i < hor; i += 1) {
		var arr = []; // 가로
		var tr = document.createElement('tr');
		dataset.push(arr); // 전체배열에 행넣기

		for (var j = 0; j < ver; j += 1) {
			arr.push(코드표.보통칸); // 행에 열마다 1넣는다
			var td = document.createElement('td');

			td.addEventListener('contextmenu', function (e) {
				e.preventDefault();
				if(중단플래그){
					return;
				}
				var 부모tr = e.currentTarget.parentNode;
				var 부모tbody = e.currentTarget.parentNode.parentNode;
				// html collection 은 유사배열이라 indexOf못쓴다..
				var 줄 = Array.prototype.indexOf.call(부모tbody.children, 부모tr);
				var 칸 = Array.prototype.indexOf.call(부모tr.children, e.currentTarget);
				if (e.currentTarget.textContent === '' || e.currentTarget.textContent === 'X') {
					e.currentTarget.textContent = '!';
					e.currentTarget.classList.remove('question');
					e.currentTarget.classList.add('flag');	// 느낌표
					if(dataset[줄][칸] === 코드표.지뢰){
						dataset[줄][칸] = 코드표.깃발지뢰;
					}else{
						dataset[줄][칸] = 코드표.깃발;
					}
				} else if (e.currentTarget.textContent === '!') {
					e.currentTarget.textContent = '?';
					e.currentTarget.classList.remove('flag');
					e.currentTarget.classList.add('question');	// 물음표
					if(dataset[줄][칸] === 코드표.깃발지뢰){
						dataset[줄][칸] = 코드표.물음표지뢰;
					}else{
						dataset[줄][칸] = 코드표.물음표;
					}
				} else if (e.currentTarget.textContent === '?') {
					e.currentTarget.classList.remove('question');					
					if(dataset[줄][칸] === 코드표.물음표지뢰){
						e.currentTarget.textContent = 'X';
						dataset[줄][칸] = 코드표.지뢰;
					}else{
						e.currentTarget.textContent = '';
						dataset[줄][칸] = 코드표.보통칸;
					}
				}
				console.log(줄, 칸);
			});
			
			td.addEventListener('click', function (e) {
				if(중단플래그){
					return;
				}
				// 클릭했을때 주변 지뢰 개수
				var 부모tr = e.currentTarget.parentNode;
				var 부모tbody = e.currentTarget.parentNode.parentNode;
				// html collection 은 유사배열이라 indexOf못쓴다..
				var 줄 = Array.prototype.indexOf.call(부모tbody.children, 부모tr);
				var 칸 = Array.prototype.indexOf.call(부모tr.children, e.currentTarget);
				if([코드표.연칸, 코드표.깃발, 코드표.깃발지뢰, 코드표.물음표지뢰, 코드표.물음표].includes(
				dataset[줄][칸])){
					return;
				}
				e.currentTarget.classList.add('opened');
				
				열은칸+=1;
				console.log('열은칸', 열은칸);

				// $(this).addClass('opened');
				if (dataset[줄][칸] === 코드표.지뢰) {
					e.currentTarget.textContent = '펑';
					document.querySelector('#result').textContent = '실패 ㅜ.ㅠ';
					중단플래그 = true;
				} else {	// 지뢰가 아닌경우 주변지뢰 개수
					dataset[줄][칸] = 코드표.연칸;
					var 주변 = [
						dataset[줄][칸 - 1], dataset[줄][칸 + 1]
					];
					if (dataset[줄 - 1]) {
						주변 = 주변.concat(dataset[줄 - 1][칸 - 1], dataset[줄 - 1][칸], dataset[줄 - 1][칸 + 1]);
					}
					if (dataset[줄 + 1]) {
						주변 = 주변.concat(dataset[줄 + 1][칸 - 1], dataset[줄 + 1][칸], dataset[줄 + 1][칸 + 1]);
					}
					let 주변지뢰개수 = 주변.filter(function (v) {
						return [코드표.지뢰, 코드표.깃발지뢰, 코드표.물음표지뢰].includes(v);
					}).length;
					// 거짓인 값:false, '', 0, null, undefined, NaN
					e.currentTarget.textContent = 주변지뢰개수 || '';
					if (주변지뢰개수 === 0) {
						// 주변 8칸 동시 오픈(재귀 함수)									
						var 주변칸 = [];
						if (tbody.children[줄 - 1]) {
							주변칸 = 주변칸.concat([
								tbody.children[줄 - 1].children[칸 - 1],
								tbody.children[줄 - 1].children[칸],
								tbody.children[줄 - 1].children[칸 + 1],
							]);
						}
						주변칸 = 주변칸.concat([
							tbody.children[줄].children[칸 - 1],
							tbody.children[줄].children[칸 + 1],
						]);
						if (tbody.children[줄 + 1]) {
							주변칸 = 주변칸.concat([
								tbody.children[줄 + 1].children[칸 - 1],
								tbody.children[줄 + 1].children[칸],
								tbody.children[줄 + 1].children[칸 + 1],
							]);
						}
						// undefined null 이런거제거
						console.log('주변칸', 주변칸);
						주변칸.filter(function (v) {
							return !!v
						}).forEach(function (옆칸) {
							var 부모tr = 옆칸.parentNode;
							var 부모tbody = 옆칸.parentNode.parentNode;
							// html collection 은 유사배열이라 indexOf못쓴다..
							var 옆칸줄 = Array.prototype.indexOf.call(부모tbody.children, 부모tr);
							var 옆칸칸 = Array.prototype.indexOf.call(부모tr.children, 옆칸);
							if(dataset[옆칸줄][옆칸칸] !== 코드표.연칸){
								옆칸.click();
							}
						})
					} // 주변지뢰개수 === 0
				}
				if(열은칸 === hor * ver - mine){
					중단플래그 = true;
					document.querySelector('#result').textContent = '승리';
				}
			}) // 왼쪽클릭
			tr.appendChild(td);
		}
		tbody.appendChild(tr);
	}


	// 지뢰 위치 뽑기
	var 후보군 = Array(hor * ver)
		.fill()
		.map(function (요소, 인덱스) {
			return 인덱스;
		});

	var 셔플 = [];
	while (후보군.length > hor * ver - mine) {
		var 이동값 = 후보군.splice(Math.floor(Math.random() * 후보군.length), 1)[0];
		셔플.push(이동값);
	}
	console.log(셔플)
	// 지뢰 테이블 만들기


	// 지뢰 심기
	for (var k = 0; k < 셔플.length; k++) { // 60
		var 가로 = Math.floor(셔플[k] / hor); // 7번재줄->배열에선6
		var 세로 = 셔플[k] % hor; // 1번재줄 -> 배열0		
		tbody.children[가로].children[세로].textContent = 'X';
		dataset[가로][세로] = 코드표.지뢰;
	}

	console.log(dataset);



}); //exec click















