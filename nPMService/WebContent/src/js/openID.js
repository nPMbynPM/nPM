var flag = false;

/**
 * 페이스북 api가 초기화 될때까지 재귀호출하는 함수
 * @param callback
 */
function fbEnsureInit(callback) {
    if(!window.flag) {
        setTimeout(function() {fbEnsureInit(callback);}, 50);
    } else {
        if(callback) {
            callback();
        }
    }
}

/**
 * 페이스북 로그인
 */
function fbLogin() {
	fbEnsureInit(function(response) {
		FB.login(function(response) {
			if (response.authResponse) {
				fbGetUser();
			} else {

			}
		}, {
			scope : 'user_birthday,email,user_work_history'
		});
	});
}

/**
 * 페이스북 로그아웃
 */
function fbLogout(){
	fbEnsureInit(function(response) {
		FB.logout(function(response) {
			fbGetUser();
		});
	});
}

/**
 * 로그인 한 유저의 정보를 가져와 화면에 출력
 */
function fbGetUser() {
	fbEnsureInit(function(){
		fbName = '';
		fbBirth = '';
		fbEmail = '';
		fbID = '';
		fbWork = '';
		fbSrc = '';
		FB.api('/me', function(response) {
			fbName = response.name;
			fbBirth = response.birthday;
			fbEmail = response.email;
			fbID = response.id;
			var work = response.work;
			if(work != null){
				fbWork = work[0].employer.name;
			}
			//정보가 오지 않으면 리턴
			if(fbID == null){
				document.getElementById('photo').src = "../../../res/image/person1.png";
				document.getElementById('name').innerHTML = "";
				document.getElementById('birth').innerHTML = "";
				document.getElementById('email').innerHTML = "";
				document.getElementById('work').innerHTML = "";
				if(fbEmail != null){
					document.getElementById('fb_login_button').value = '로그아웃';
					document.getElementById('fb_login_button').onclick = fbLogout;
				}
				else{
					document.getElementById('fb_login_button').value = '로그인';
					document.getElementById('fb_login_button').onclick = fbLogin;
				}
			}
			else{
				fbSrc = "http://graph.facebook.com/"
					+ fbID + "/picture?type=large";
				document.getElementById('photo').src = fbSrc;
				document.getElementById('name').innerHTML = fbName;
				document.getElementById('birth').innerHTML = fbBirth;
				document.getElementById('email').innerHTML = fbEmail;
				document.getElementById('work').innerHTML = fbWork;
				if(fbEmail != null){
				document.getElementById('fb_login_button').value = '로그아웃';
				document.getElementById('fb_login_button').onclick = fbLogout;
				}
				else{
				document.getElementById('fb_login_button').value = '로그인';
				document.getElementById('fb_login_button').onclick = fbLogin;
				}
				//user 테이블에 유저정보 삽입
				addUser();
			}
		});
	});
}

/**
 * user 테이블에 로그인한 유저의 정보를 삽입함
 */
function addUser(){
	var param = "user=new"
		+"&id="+fbID
		+"&name="+fbName
		+"&birth="+fbBirth
		+"&email="+fbEmail
		+"&work="+fbWork
		+"&photo="+fbSrc;
	
	var request = createRequest();

	if(request == null){
		alert("서버 접속에 실패하였습니다");
	}
	else{
		request.open("POST", "../../../nPM", true);
		request.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
		request.setRequestHeader("Cache-Control","no-cache, must-revalidate");
		request.setRequestHeader("Pragma","no-cache");
		request.send(param);
	}
}

/**
 * 로그인 여부 확인
 */
function fbIsLogin() {
	fbEnsureInit(function(){
		FB.getLoginStatus(function(response) {
			if (response.status === 'connected') {
//				var uid = response.authResponse.userID;
//				var accessToken = response.authResponse.accessToken;
			} else if (response.status === 'not_authorized') {
				location.replace('joinus.html');
			} else {
				location.replace('joinus.html');
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