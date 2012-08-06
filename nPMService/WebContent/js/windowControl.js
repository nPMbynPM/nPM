window.onload = windowAddEvent;

var TMDowned = false;
var TMResize = false;
var TMDownedTop = 0;
var TMDownedLeft = 0;
var TMDownedWidth = 0;
var TMDownedHeight = 0;
var canvasWidth = 0;	//캔버스의 width
var canvasHeight = 0;	//캔버스의 height
var prevX = 0;
var prevY = 0;
var toolSelected = -1;	//1:선택, 2:드래그, 3:연결
var addSelected = -1;	//1:작업자 추가, 2:할일 추가
var personSelected = '';	//작업자의 이미지 경로

/**
 * 윈도우 이벤트를 등록한다
 */
function windowAddEvent(){	
	window.addEventListener('mousemove', window_move, false);
	window.addEventListener('mouseup', window_up, false);
	//canvas에도 이벤트 등록
	canvasAddEvent();
}

/**
 * 윈도우 이벤트를 제거한다
 */
function windowRemoveEvent(){
	window.removeEventListener('mousemove', window_move, false);
	window.removeEventListener('mouseup', window_up, false);
	//canvas에도 이벤트 제거
	canvasRemoveEvent();
}

/**
 * 마우스가 down되었을 때의 윈도우 이벤트
 */
function window_down(param){
	TMDownedId = document.getElementById(param);
	prevX = window.event.x;
	prevY = window.event.y;
	TMDownedTop = document.getElementById(param).offsetTop;
	TMDownedLeft = document.getElementById(param).offsetLeft;
	TMDowned = true;
}

/**
 * 마우스가 move 되었을 때의 윈도우 이벤트
 */
function window_move(ev){
	if(TMDowned == true){
		if(document.getElementById('top').offsetHeight <= TMDownedTop
				&& TMDownedLeft > 0){
			TMDownedId.style.top = TMDownedTop + (window.event.y-prevY) + 'px';
			TMDownedId.style.left = TMDownedLeft + (window.event.x-prevX) + 'px';

			TMDownedTop = TMDownedId.offsetTop;
			TMDownedLeft = TMDownedId.offsetLeft;
			prevX = window.event.x;
			prevY = window.event.y;
		}
		//윈도우가 윗 부분의 메뉴바와 겹치지 않게
		else if(document.getElementById('top').offsetHeight > TMDownedTop){
			TMDownedId.style.top = document.getElementById('top').offsetHeight + 1 + 'px';
			TMDownedTop = document.getElementById('top').offsetHeight + 1; 
		}
		//윈도우가 화면의 왼쪽부분을 넘어가지 않게
		else if(TMDownedLeft <= 0){
			TMDownedId.style.left = 1 + 'px';
			TMDownedLeft = 1;
		}
	}
	//캔버스의 크기 조절
	if(TMResize == true){
		var outerWidth = TMDownedWidth + window.event.x - prevX;
		var outerHeight = TMDownedHeight + window.event.y - prevY;
		var innerWidth = canvasWidth + window.event.x - prevX;
		var innerHeight = canvasHeight + window.event.y - prevY;
		//canvas
		TMDownedId.style.width = outerWidth + 'px';
		TMDownedId.style.height = outerHeight + 'px';
		//TM, MM, BM
		document.getElementById('canvasTM').style.width = innerWidth + 'px';
		document.getElementById('canvasMM').style.width = innerWidth + 'px';
		document.getElementById('canvasBM').style.width = innerWidth + 'px';
		//ML, MM, MR
		document.getElementById('canvasML').style.height = innerHeight + 'px';
		document.getElementById('canvasMM').style.height = innerHeight + 'px';
		document.getElementById('canvasMR').style.height = innerHeight + 'px';
		//ctx_canvas
		document.getElementById('ctx_canvas').style.width = innerWidth + 'px';
		document.getElementById('ctx_canvas').style.height = innerHeight + 'px';
		document.getElementById('ctx_canvas').width = innerWidth;
		document.getElementById('ctx_canvas').height = innerHeight;
		//bound
		document.getElementById('bound').style.width = innerWidth + 'px';
		document.getElementById('bound').style.height = innerHeight + 'px';
		
		TMDownedWidth = TMDownedId.offsetWidth;
		TMDownedHeight = TMDownedId.offsetHeight;
		canvasWidth = document.getElementById('ctx_canvas').offsetWidth;
		canvasHeight = document.getElementById('ctx_canvas').offsetHeight;
		prevX = window.event.x;
		prevY = window.event.y;
		drawAll();
	}
}

/**
 * 마우스가 up 되었을 때의 윈도우 이벤트
 */
function window_up(ev){
	TMDowned = false;
	TMResize = false;
}

/**
 * 도구가 선택 되었을 때의 배경색 변경
 */
function tools_down(param){
	//모든 도구의 배경색을 초기화한다
	for(var i = 1; i < 4; i++){
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
	var url = "url('cursor/" + param + ".png'), pointer";
	var canvasId = document.getElementById('bound');
	//마우스 커서 모양을 변경한다
	canvasId.style.cursor = url;
	//어떤 추가리스트가 선택되었는지 변수에 저장한다
	addSelected = Number(param.charAt(param.length-1));
}

/**
 * 작업자의 이미지가 선택되었을 때의 이벤트
 */
function person_down(param){
	personSelected = param;
	for(var i = 1; i <= 6; i++){
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
	var bgcolor = document.getElementById(param).style.background;
	//활성 -> 비활성
	if(bgcolor == 'rgb(240, 203, 133)'){
		document.getElementById(param).style.background = '#FFFFFF';
		//글꼴의 스타일을 변수에 저장
		if(param == 'fontBold'){
			isFontBold = false;
		}
		else if(param == 'fontItalic'){
			isFontItalic = false;
		}
	}
	//비활성 -> 활성
	else if(bgcolor == 'rgb(255, 255, 255)'){
		document.getElementById(param).style.background = '#F0CB85';
		//글꼴의 스타일을 변수에 저장
		if(param == 'fontBold'){
			isFontBold = true;
		}
		else if(param == 'fontItalic'){
			isFontItalic = true;
		}
	}
}

/**
 * 윈도우의 크기를 변경하는 함수
 */
function canvas_resize(){
	TMDownedId = document.getElementById('canvas');
	prevX = window.event.x;
	prevY = window.event.y;
	TMDownedWidth = TMDownedId.offsetWidth;
	TMDownedHeight = TMDownedId.offsetHeight;
	canvasWidth = document.getElementById('ctx_canvas').offsetWidth;
	canvasHeight = document.getElementById('ctx_canvas').offsetHeight;
	TMResize = true;
}

/**
 * 저장 버튼이 눌렸을 때
 */
function save_down(param){
	document.getElementById('saveFilePath').value = '';
	document.getElementById(param).style.display = 'block';
}

/**
 * 불러오기 버튼이 눌렸을 때
 * @param param
 */
function load_down(param){
	document.getElementById('loadFilePath').value = '';
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
		for(var i = 0; i < document.getElementsByName('colorSelect').length; i++){
			if(document.getElementsByName('colorSelect')[i].checked == true){
				elementDowned.color = document.getElementsByName('colorSelect')[i].value;
			}
		}
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

