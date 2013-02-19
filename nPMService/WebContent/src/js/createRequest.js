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
 * 프로젝트를 서버의 DB에 저장하기 위해 요청
 * @param personID
 * @param personX
 * @param personY
 * @param personImgSrc
 * @param personName
 * @param personFont
 * @param personEmail
 * @param todoX
 * @param todoY
 * @param todoTodo
 * @param todoStart
 * @param todoFinish
 * @param todoFont
 * @param fromClassName
 * @param fromX
 * @param fromY
 * @param toClassName
 * @param toX
 * @param toY
 * @param todoColor
 * @param todoIsfinished
 * @param projectID
 */
function requestSaveAsDB(personID, personX, personY, personImgSrc, personName, personFont, personEmail,
		todoX, todoY, todoTodo, todoStart, todoFinish, todoFont,
		fromClassName, fromX, fromY, toClassName, toX, toY,
		todoColor, todoIsfinished, projectID){
	//Ajax를 이용한 비동기 요청
	var param = "savedb=all"+"&personID="+personID+"&personX="+personX+"&personY="+personY+"&personImgSrc="+personImgSrc+"&personName="+personName+"&personFont="+personFont+"&personEmail="+personEmail+
	"&todoX="+todoX+"&todoY="+todoY+"&todoTodo="+todoTodo+"&todoStart="+todoStart+"&todoFinish="+todoFinish+"&todoFont="+todoFont+
	"&fromClassName="+fromClassName+"&fromX="+fromX+"&fromY="+fromY+"&toClassName="+toClassName+"&toX="+toX+"&toY="+toY
	+"&todoColor="+todoColor+"&todoIsfinished="+todoIsfinished+"&project="+projectID;

	var saveRequest = createRequest();
	
	if(saveRequest == null){
		alert("요청에 실패했습니다!");
	}
	else{
		saveRequest.open("POST", "../../../nPM", true);
		saveRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
		saveRequest.setRequestHeader("Cache-Control","no-cache, must-revalidate");
		saveRequest.setRequestHeader("Pragma","no-cache");
		saveRequest.onreadystatechange = function(){
			if (saveRequest.readyState == 4) {
				if (saveRequest.status == 200) {
					alert("저장 완료!");
					document.getElementById('savePopup').style.display = 'none';
					
					//프로젝트에 참여한 사람들에게 mail push
					for(var i = 0; i < personEmail.length; i++){
						var mailRequest = createRequest();
						var mailAddr = "&mailAddress="+personEmail[i];
						mailRequest.open("POST", "/mail", true);
						mailRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
						mailRequest.setRequestHeader("Cache-Control","no-cache, must-revalidate");
						mailRequest.setRequestHeader("Pragma","no-cache");
						mailRequest.send(mailAddr);
					}
				}
				else{
					alert("저장에 실패하였습니다.");
				}
			}
		};
		saveRequest.send(param);
	}
}

/**
 * 프로젝트를 서버에 xml파일로 저장하기 위해 요청
 * @param personID
 * @param personX
 * @param personY
 * @param personImgSrc
 * @param personName
 * @param personFont
 * @param personEmail
 * @param todoX
 * @param todoY
 * @param todoTodo
 * @param todoStart
 * @param todoFinish
 * @param todoFont
 * @param fromClassName
 * @param fromX
 * @param fromY
 * @param toClassName
 * @param toX
 * @param toY
 * @param todoColor
 * @param todoIsfinished
 * @param projectID
 */
function requestSaveAsXML(saveText, personID, personX, personY, personImgSrc, personName, personFont, personEmail,
		todoX, todoY, todoTodo, todoStart, todoFinish, todoFont,
		fromClassName, fromX, fromY, toClassName, toX, toY,
		todoColor, todoIsfinished, projectID){
	//Ajax를 이용한 비동기 요청
	var param = "savetext="+saveText+"&personID="+personID+"&personX="+personX+"&personY="+personY+"&personImgSrc="+personImgSrc+"&personName="+personName+"&personFont="+personFont+"&personEmail="+personEmail+
	"&todoX="+todoX+"&todoY="+todoY+"&todoTodo="+todoTodo+"&todoStart="+todoStart+"&todoFinish="+todoFinish+"&todoFont="+todoFont+
	"&fromClassName="+fromClassName+"&fromX="+fromX+"&fromY="+fromY+"&toClassName="+toClassName+"&toX="+toX+"&toY="+toY
	+"&todoColor="+todoColor+"&todoIsfinished="+todoIsfinished+"&project="+projectID;

	var saveRequest = createRequest();
	
	if(saveRequest == null){
		alert("요청에 실패했습니다!");
	}
	else{
		saveRequest.open("POST", "../../../nPM", true);
		saveRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
		saveRequest.setRequestHeader("Cache-Control","no-cache, must-revalidate");
		saveRequest.setRequestHeader("Pragma","no-cache");
		saveRequest.onreadystatechange = function(){
			if (saveRequest.readyState == 4) {
				if (saveRequest.status == 200) {
					alert("저장 완료!");
					document.getElementById('savePopup').style.display = 'none';
				}
				else{
					alert("저장에 실패하였습니다.");
				}
			}
		};
		saveRequest.send(param);
	}
}

/**
 * 서버에 DB정보를 요청
 * @param id
 */
function requestLoadAsDB(id){
	var param = "loaddb=all"
		+ "&project=" + id;
	
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
					//프로젝트 초기화
					var xml = request.responseXML;
					var name = npmXMLParsing(xml);
					initProject(Number(id), name);
					drawAll();
				}
			}
		};
		request.send(param);
	}
}

/**
 * 서버에 xml파일을 요청 
 * @param loadText
 */
function requestLoadAsXML(loadText){
	//Ajax를 이용한 xml파일 비동기 요청
	var param = "loadtext="+loadText;

	var loadRequest = createRequest();

	if(loadRequest == null){
		alert("불러오기 실패");
	}
	else{
		loadRequest.open("POST","../../../nPM",true);
		loadRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
		loadRequest.setRequestHeader("Cache-Control","no-cache, must-revalidate");
		loadRequest.setRequestHeader("Pragma","no-cache");
		loadRequest.onreadystatechange = function(){
			if (loadRequest.readyState == 4) {
				if (loadRequest.status == 200) {
					var responseDoc = loadRequest.responseXML;
					if(responseDoc == null){
						alert("올바른 파일 형식이 아닙니다");
						return false;
					}
					else{
						//캔버스의 프로젝트를 초기화하고 xml파싱
						initProject(-1, 'nPM');
						clearAll();
						npmXMLParsing(responseDoc);
						drawAll();
					}
				}
			}
		};
		loadRequest.send(param);
	}
}

/**
 * 유저가 참가하는 프로젝트의 리스트를 요청함
 * @param fbID
 */
function requestProjList(fbID){
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

/**
 * 유저의 목록을 서버에 요청함
 */
function requestUserList(){
	var param = "user=all";
	
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
					//alert(request.responseText);
					userXMLParsing(request.responseXML);
					displayUserList();
				}
			}
		};
		request.send(param);
	}
}

/**
 * 서버에 새로운 프로젝트 생성을 요청함
 * @param projectName
 * @param fbID
 */
function requestNewProj(projectName, fbID){
	var param = "project=new"
		+ "&name=" + projectName
		+ "&member=" + fbID;
	
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
					var projID = request.responseText;
					//프로젝트 초기화
					window.opener.clearAll();
					window.opener.initProject(Number(projID), projectName);
					//해당 팝업창을 닫는다
					window.close();
				}
			}
		};
		request.send(param);
	}
}