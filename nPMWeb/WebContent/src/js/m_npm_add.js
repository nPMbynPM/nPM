/**
 * 비동기 요청을 위한 요청 객체를 생성
 */
function createRequest() {
	var request = null;
	try {
		request = new XMLHttpRequest();
	} catch (tryMS) {
		try {
			request = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (otherMS) {
			try {
				request = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (failed) {
				request = null;
			}
		}
	}	
	return request;
}

/**
 * 취소 버튼
 */
function goHome(){
	location.replace('m_npm.html');
}

/**
 * 확인 버튼
 */
function insertDB(){
//	location.replace('m_npm_add_ok.html');
	var person = document.getElementById('person').value;
	var todo = document.getElementById('todo').value;
	var start = document.getElementById('todoStart').value;
	var finish = document.getElementById('todoClose').value;
	
	var RegExpDate = /^[\d]{4}-[\d]{1,2}-[\d]{1,2}$/;
	if(!RegExpDate.test(start) ||
			!RegExpDate.test(finish)){
		alert('시작일자 및 종료일자를 yyyy-mm-dd 형식으로 입력해주세요');
		return false;
	}
	
	var param = "npm=insert"
		+ '&person=' + person
		+ '&todo=' + todo
		+ '&start=' + start
		+ '&finish=' + finish;
	
	var request = createRequest();

	if(request == null){
		alert("서버 접속에 실패하였습니다");
	}
	else{
		request.open("POST", "mobileServlet", true);
		request.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
		request.setRequestHeader("Cache-Control","no-cache, must-revalidate");
		request.setRequestHeader("Pragma","no-cache");
		request.onreadystatechange = function(){
			if (request.readyState == 4) {
				if (request.status == 200) {
					location.replace('m_npm_add_ok.html');
				}
			}
		};
		request.send(param);
	}
}

/**
 * 달력을 보여줌
 */
function showCalendar(param){
	document.getElementById(param).style.top = window.event.y + 'px';
	document.getElementById(param).style.left = window.event.x + 'px';
	document.getElementById(param).style.position = 'absolute';
	document.getElementById(param).style.display = 'block';
	if(param == 'calendarStart'){
		calendarId = 'todoStart';
	}
	else{
		calendarId = 'todoClose';
	}
	calendar();
}