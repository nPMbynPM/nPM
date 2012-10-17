/**
 * 프로젝트 생성 팝업창을 띄움
 */
function createPopup(){
	document.getElementById("createPopup").style.display = 'block';
	document.getElementById("list").style.display = 'none';
}

/**
 * 프로젝트 생성 팝업창을 닫음
 */
function closePopup(){
	document.getElementById("createPopup").style.display = 'none';
	document.getElementById("list").style.display = 'block';
}

/**
 * 목록에 유저 이름을 추가한다
 * @param id
 * @param name
 */
function addList(id, name){
	var list = document.getElementById("projectMember");
	var flag = false;
	
	//동일한 ID가 있는지 검사한다
	for(var i = 0; i < list.options.length; i++){
		if(list.options[i].value == id){
			flag = true;
			break;
		}
	}
	if(flag == false)
		list.options[list.options.length] = new Option(name, id);
	else
		alert('동일한 멤버가 이미 추가되었습니다');
}

/**
 * 목록의 유저 이름을 제거한다
 */
function removeList(){
	var list = document.getElementById("projectMember");
	
	for(var i = 0; i < list.options.length; i++){
		if(list.options[i].selected)
			list.options[i] = null;
	}
}

/**
 * 프로젝트를 생성한다
 */
function createProject(){
	var list = document.getElementById("projectMember");
	var projectName = document.getElementById("projectName").value;
	var memberArr = new Array();
	for(var i = 0; i < list.options.length; i++){
		memberArr.push(list.options[i].value);
	}
	
	var param = "project=new"
		+ "&name=" + projectName
		+ "&member=" + memberArr;
	
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
					//해당 페이지를 새로고침 한다
					location.reload();
				}
			}
		};
		request.send(param);
	}
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
								document.getElementById("list").innerHTML = request.responseText;
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