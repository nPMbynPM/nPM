/**
 * 라디오 버튼이 선택됨에 따라 다른 페이지를 출력
 */
function tab(param){
	var elem = param.value;
	
	if(elem == 'xml'){
		document.getElementById('xml').style.display = 'block';
		document.getElementById('list').style.display = 'none';
	}
	else{
		document.getElementById('xml').style.display = 'none';
		document.getElementById('list').style.display = 'block';
	}
}

/**
 * XML파일을 로드
 */
function loadXML(){
	var loadText = document.getElementById('loadFilePath').value;

	//.xml파일이 아니면 경고 메시지를 출력한다
	if(loadText.substring(loadText.length-4, loadText.length) != '.xml'){
		alert(".xml형식으로 입력하여야 합니다.");
		return false;
	}
	
	window.opener.loadXML(loadText);
	window.close();
}

/**
 * DB로드
 */
function loadDB(id){
	window.opener.loadDB(Number(id));
	window.close();
}


/**
 * 로그인 한 사용자가 참여하는 프로젝트의 목록을 보여준다
 */
function displayProject(){
	fbEnsureInit(function(){
		fbID = '';
		FB.api('/me', function(response) {
			fbID = response.id;
			
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
		});
	});
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