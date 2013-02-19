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
 * XML파일을 열기전에 예외처리
 */
function loadXML(){
	var loadText = document.getElementById('loadFilePath').value;

	//.xml파일이 아니면 경고 메시지를 출력한다
	if(loadText.substring(loadText.length-4, loadText.length) != '.xml'){
		alert(".xml형식으로 입력하여야 합니다.");
		return false;
	}
	
	window.opener.loadAsXML(loadText);
	window.close();
}

/**
 * DB로드
 */
function loadDB(id){
	window.opener.loadAsDB(Number(id));
	window.close();
}


/**
 * 로그인 한 사용자가 참여하는 프로젝트의 목록을 보여준다
 */
function displayProject(){
	//페이스북 로그인 여부 확인
	fbEnsureInit(function(){
		fbID = '';
		FB.api('/me', function(response) {
			fbID = response.id;
			
			if(fbID != null){
				//유저가 참여하는 프로젝트 목록을 요청함
				requestProjList(fbID);
			}
		});
	});
}