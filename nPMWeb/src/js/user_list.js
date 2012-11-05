//유저 정보를 담기위한 변수
var idArr = new Array();
var nameArr = new Array();
var emailArr = new Array();
var photoArr = new Array();

/**
 * 유저의 목록을 전부 불러온다
 */
function getUsers(){
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
					parseUserXML(request.responseXML);
					displayUserList();
				}
			}
		};
		request.send(param);
	}
}

/**
 * 유저 목록 XML을 파싱함
 */
function parseUserXML(response){
	var data = response.getElementsByTagName("data");
	
	//유저 정보를 파싱한다
	var user = data[0].getElementsByTagName("user");

	for(var i = 0; i < user.length; i++){
		var id = user[i].getElementsByTagName("id")[0].firstChild.nodeValue;
		var name = user[i].getElementsByTagName("name")[0].firstChild.nodeValue;
		var email = user[i].getElementsByTagName("email")[0].firstChild.nodeValue;
		var photo = user[i].getElementsByTagName("photo")[0].firstChild.nodeValue;
		
		//test code
		//console.log(name);
		//console.log(email);
		
		idArr.push(id);
		nameArr.push(name);
		emailArr.push(email);
		photoArr.push(photo);
	}
}

/**
 * 유저 정보를 화면에 출력한다
 */
function displayUserList(){
	var str = '<form name=form>';
	
	for(var i = 0; i < nameArr.length; i++){
		str += '<li>';
		str += '<div class=left><input type=radio name=user id=' + idArr[i] + ' value=\"' + nameArr[i] + '\"></div>';
		str += '<div class=mid><img class=profile src=' + photoArr[i] + '></div>';
		str += '<div class=right>이름: ' + nameArr[i] + '<br/>이메일: ' + emailArr[i] + '</div>';
		str += '</li>';
	}
	
	str += '</form>';
	
	document.getElementById('name').innerHTML = str;
}

/**
 * 선택한 유저의 정보를 내보낸다
 */
function selectUser(){
	var radioObj = document.getElementsByName('user');
	
	for(var i = 0; i < radioObj.length; i++){
		if(radioObj[i].checked){
			for(var j = 0; j < idArr.length; j++){
				if(radioObj[i].id == idArr[j]){
					window.opener.personInfo(idArr[j], nameArr[j], emailArr[j], photoArr[j]);
					window.close();					
				}
			}
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