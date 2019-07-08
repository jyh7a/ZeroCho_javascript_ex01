(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('append')) {
      return;
    }
    Object.defineProperty(item, 'append', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function append() {
        var argArr = Array.prototype.slice.call(arguments),
          docFrag = document.createDocumentFragment();
        
        argArr.forEach(function (argItem) {
          var isNode = argItem instanceof Node;
          docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
        });
        
        this.appendChild(docFrag);
      }
    });
  });
})([Element.prototype, Document.prototype, DocumentFragment.prototype]);

var 바디 = document.body;
var 단어 = document.createElement('div');
단어.textContent = '제로초';
바디.append(단어);
var 폼 = document.createElement('form');
바디.append(폼);
var 입력창 = document.createElement('input');
폼.append(입력창);
var 버튼 = document.createElement('button');
버튼.textContent='입력!';
폼.append(버튼);
var 결과창 = document.createElement('div');
결과창.textContent='';
바디.append(결과창);



폼.addEventListener('submit', function(e){ // 콜백함수
	e.preventDefault();
	if(단어.textContent[단어.textContent.length-1] === 입력창.value[0]){
		단어.textContent = 입력창.value;
		입력창.value = '';
		입력창.focus();
		결과창.textContent = '딩동댕';
	}else{
		입력창.value = '';
		입력창.focus();
		결과창.textContent = '떙';
	}
});	



/*var word = '제로초';

while(true){
	var answer = prompt(word);
	if(word[word.length-1] === answer[0]){
		word = answer;
	}else{
		alert('땡');
		answer === null ? function(){break;} : function(){}; 
	}
}*/