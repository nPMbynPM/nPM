/**
 * DB로드
 */
function loadDB(id){
	location.replace('m_npm.html?npm=' + id);
}


/**
 * 로그인 한 사용자가 참여하는 프로젝트의 목록을 보여준다
 */
function displayProject(){
	var fbID = location.href.split("=")[1];
	if(fbID != null){
		var param = "project=list"
			+ "&id=" + fbID;

		var request = createRequest();

		if(request == null){
			alert("서버 접속에 실패하였습니다");
		}
		else{
			request.open("POST", "../../../nPM", true);
			request.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
			request.setRequestHeader("Cache-Control","no-cache, must-revalidate");
			request.setRequestHeader("Pragma","no-cache");
			request.onreadystatechange = function(){
				if (request.readyState == 4) {
					if (request.status == 200) {
						document.getElementById("projectList").innerHTML = request.responseText;
					}
				}
			};
			request.send(param);
		}
	}
}

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