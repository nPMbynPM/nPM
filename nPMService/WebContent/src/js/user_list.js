//유저 정보를 담기위한 변수
var idArr = new Array();
var nameArr = new Array();
var emailArr = new Array();
var photoArr = new Array();

/**
 * 유저의 목록을 전부 불러온다
 */
function getUsers(){
	//유저의 목록을 서버에 요청함
	requestUserList();
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