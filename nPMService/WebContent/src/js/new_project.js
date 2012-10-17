/**
 * 새로운 프로젝트를 생성한다
 */
function createProject(){
	var projectName = document.getElementById("projectName").value;
	
	//예외처리
	if(projectName.replace(/^\s*/,'').replace(/\s*$/,'') == ''){
		alert('프로젝트 이름을 입력해주세요');
		return;
	}
	
	var param = "project=new"
		+ "&name=" + projectName;
	
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
					//해당 팝업창을 닫는다
					window.opener.initProject(request.responseText, projectName);
					window.close();
				}
			}
		};
		request.send(param);
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
