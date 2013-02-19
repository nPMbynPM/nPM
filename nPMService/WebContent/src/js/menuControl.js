//추가하려는 작업자의 정보
var memberID = "";
var memberName = "";
var memberEmail = "";
var memberPhoto = "";

//정보를 나타내기 위한 변수
var toolSelected = -1;	//1:선택, 2:드래그, 3:연결
var addSelected = -1;	//1:작업자 추가, 2:할일 추가
var personSelected = '';	//작업자의 이미지 경로
var isFontBold = false;	//굵은 폰트
var isFontItalic = false;	//이태릭 폰트

/**
 * 현재 프로젝트를 저장함
 */
function saveAs(){
	if(document.getElementById('saveAsDB').checked == true){
		//서버의 DB에 저장
		saveAsDB();
	}
	else{
		var saveText = document.getElementById('saveFilePath').value;
		//.xml 형식이 아니면 오류메시지 출력
		if(saveText.substring(saveText.length-4, saveText.length) != '.xml'){
			alert(".xml형식으로 입력하여야 합니다.");
			return false;
		}
		else{
			//서버에 XML형태로 저장
			saveAsXML(saveText);
		}
	}
}

/**
 * 선택된 도구의 배경색 변경
 */
function tools_down(param){
	var elem = getElementsByName_iefix('div', 'tools_name');
	
	//모든 도구의 배경색을 초기화한다
	for(var i = 1; i < elem.length + 1; i++){
		var tools = 'tools_' + i;
		document.getElementById(tools).style.background = '#FFFFFF';
	}	
	//클릭된 도구의 배경색을 바꾼다
	document.getElementById(param).style.background = '#F0CB85';
	//어떤 도구가 선택되었는지 변수에 저장한다
	toolSelected = Number(param.charAt(param.length-1));
}

/**
 * 추가리스트가 선택 되었을 때의 이벤트
 */
function adds_down(param){
	var url = "url('../../../res/cursor/" + param + ".gif'),url('../../../res/cursor/" + param + ".cur'),pointer";
	var canvasId = document.getElementById('bound');
	//마우스 커서 모양을 변경한다
	canvasId.style.cursor = url;
	//어떤 추가리스트가 선택되었는지 변수에 저장한다
	addSelected = Number(param.charAt(param.length-1));
}

/**
 * 작업자 정보 출력
 */
function personInfo(id, name, email, photo){
	//출력
	document.getElementById("memberImg").src = photo;
	document.getElementById("memberInfo").innerHTML = name + '<br/>' + email;
	//변수에 저장
	memberID = id;
	memberName = name;
	memberEmail = email;
	memberPhoto = photo;
}

/**
 * 작업자의 이미지가 선택되었을 때의 이벤트
 */
function person_down(param){
	personSelected = param;
	for(var i = 1; i <= 8; i++){
		document.getElementById('person' + i).style.background = '#FFFFFF';
	}
	//선택된 이미지의 배경색을 변경한다
	document.getElementById(param).style.background = '#F0CB85';
}

/**
 * 달력 이미지가 선택되었을 때의 이벤트
 */
function calendar_down(param){
	document.getElementById(param).style.top = window.event.y + 'px';
	document.getElementById(param).style.left = window.event.x + 'px';
	document.getElementById(param).style.zIndex = '5';
	document.getElementById(param).style.display = 'block';
	calendarId = 'todo' + param.substring(param.length-5, param.length);
	calendar();
}

/**
 * 폰트 스타일이 선택되었을 때의 이벤트
 */
function font_down(param){
	if(param == 'fontBold'){
		if(isFontBold == true){
			document.getElementById(param).style.background = '#FFFFFF';
			isFontBold = false;
		}
		else{
			document.getElementById(param).style.background = '#F0CB85';
			isFontBold = true;
		}
	}
	else if(param == 'fontItalic'){
		if(isFontItalic == true){
			document.getElementById(param).style.background = '#FFFFFF';
			isFontItalic = false;
		}
		else{
			document.getElementById(param).style.background = '#F0CB85';
			isFontItalic = true;
		}
	}
//	var bgcolor = document.getElementById(param).style.background;
//	//활성 -> 비활성
//	if(bgcolor == 'rgb(240, 203, 133)'){
//		document.getElementById(param).style.background = '#FFFFFF';
//		//글꼴의 스타일을 변수에 저장
//		if(param == 'fontBold'){
//			isFontBold = false;
//		}
//		else if(param == 'fontItalic'){
//			isFontItalic = false;
//		}
//	}
//	//비활성 -> 활성
//	else if(bgcolor == 'rgb(255, 255, 255)'){
//		document.getElementById(param).style.background = '#F0CB85';
//		//글꼴의 스타일을 변수에 저장
//		if(param == 'fontBold'){
//			isFontBold = true;
//		}
//		else if(param == 'fontItalic'){
//			isFontItalic = true;
//		}
//	}
}

/**
 * 저장 버튼이 눌렸을 때
 */
function save_down(param){
	document.getElementById('saveFilePath').value = '';
	document.getElementById('saveAsDB').checked = true;
	document.getElementById('save_db').style.display = 'block';
	document.getElementById('save_xml').style.display = 'none';
	document.getElementById(param).style.display = 'block';
}

/**
 * 정보 창의 수정 버튼이 눌렸을 때
 */
function modify_down(){
//	alert(getObjectClass(elementDowned));
	//작업자가 선택되었을 때
	if(getObjectClass(elementDowned) == 'personClass'){
		elementDowned.name = document.getElementById('personProperties_name').value;
	}
	//할 일이 선택되었을 때
	else if(getObjectClass(elementDowned) == 'todoClass'){
		var RegExpDate = /^[\d]{4}-[\d]{1,2}-[\d]{1,2}$/;
		if(!RegExpDate.test(document.getElementById('todoProperties_start').value) ||
				!RegExpDate.test(document.getElementById('todoProperties_finish').value)){
			alert('시작일자 및 종료일자를 yyyy-mm-dd 형식으로 입력해주세요');
			return false;
		}
		elementDowned.todo = document.getElementById('todoProperties_todo').value;
		elementDowned.start = document.getElementById('todoProperties_start').value;
		elementDowned.finish = document.getElementById('todoProperties_finish').value;
		elementDowned.color = '#' + document.getElementById('colorSelect').value;
		
		for(var i = 0; i < document.getElementsByName('finishRadio').length; i++){
			if(document.getElementsByName('finishRadio')[i].checked == true){
				if(document.getElementsByName('finishRadio')[i].value == 'true'){
					elementDowned.isFinished = true;
				}
				else{
					elementDowned.isFinished = false ;
				}
			}
		}
	}
	else{
		return false;
	}
	drawAll();
}

/**
 * XML로 저장하기 탭
 */
function saveXMLTab(){
	document.getElementById('save_db').style.display = 'none';
	document.getElementById('save_xml').style.display = 'block';
}

/**
 * DB로 저장하기 탭
 */
function saveDBTab(){
	document.getElementById('save_db').style.display = 'block';
	document.getElementById('save_xml').style.display = 'none';
}

/**
 * IE에서 getElementsByName 효과를 내는 함수
 * @param tag
 * @param name
 * @returns {Array}
 */
function getElementsByName_iefix(tag, name) {
    
    var elem = document.getElementsByTagName(tag);
    var arr = new Array();
    var i;
    var iarr;
    for(i = 0,iarr = 0; i < elem.length; i++) {
         att = elem[i].getAttribute("name");
         if(att == name) {
              arr[iarr] = elem[i];
              iarr++;
         }
    }
    return arr;
}