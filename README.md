# javascript
 vs코드 단축키 <br>
 단축키 홈페이지 : https://demun.github.io/vscode-tutorial/shortcuts/ <br>
 영역접기 ctrl + shift + [ <br>
 영역펼치기 ctrl + shift + ] <br>
 ctrl+k ctrl+0	모든 영역 접기 <br>
 ctrl+k ctrl+j	모든 영역 펼치기 <br>

<hr/> 
12-5<br>
document.querySelector('.card-hidden .card').cloneNode(true);<br>
cloneNode로 기존태그를 그대로 복사 가능 인자에 true 넣으면 내부까지 복사<br>

<hr/>
12-6<br>
appendchild 와 append 차이점및 prepend 등에대해 좋은? 자료찾음 왜 prependChild는 없냐;; What the Fork...<br>
https://rpubs.com/raulUbiqum/append<br>

<hr>
12-8<br>
요소.classList.toggle('class명') => 쓸만한 매소드인듯<br>
document.getElementById('rival').classList.toggle('turn');<br>

<hr>
13-1<br>
createDocumentFragment() : DocumentFragment는 다른 노드를 담는 임시 컨테이너 역할을 하는 특수 목적의 노드이다. 가상의 노드 객체로서, 메모리상에서만 존재하는 비 문서 탬플릿으로 생각하면 된다. parentNode 프로퍼티는 항상 null이다. 하지만 Element처럼, appendChild()와 insertBefore() 등으로 조작할 수 있는 자손 객체를 가질 수 있다.<br>
출처: https://iamawebdeveloper.tistory.com/64 [나는 웹개발자!]<br>
cf. var fragment = document.createDocumentFragment();<br><br>

table 태그안에 tbody태그가 들어있는지 확인하자( chrome, IE 브라우저 차이일것이다)<br>
<hr>

13-2<br>
screenX: 모니터 기준좌표<br>
pageX: 페이지(스크롤 포함)<br>
clientX: 브라우저 화면 기준<br>
offsetX: 이벤트 타겟 기준

<hr>

14-2<br>
keyup : 눌렀다가 땔때 한번만 발생<br>
keydown : 누르고 있으면 계속 발생<br>
keypress : window.addeventListener() 에서 왜 안될까?<br>
=> keypress 에서 e 벤트 객체는 화살표및 몇개의 키가 안먹는다.<br>

<hr>

14-8<br>
Array.from(row.children) => HTMLcollection 같은 itterationObject => array로 바꿔준다<br>
결과적으로 rray.from(row.children).forEach 사용가능<br>




