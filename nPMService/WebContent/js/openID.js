var flag = false;

function fbEnsureInit(callback) {
    if(!window.flag) {
        setTimeout(function() {fbEnsureInit(callback);}, 50);
    } else {
        if(callback) {
            callback();
        }
    }
}

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

function fbLogout(){
	fbEnsureInit(function(response) {
		FB.logout(function(response) {
			fbGetUser();
		});
	});
}

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
		});
	});
}

function fbIsLogin() {
	FB.getLoginStatus(function(response) {
		if (response.status === 'connected') {
//			var uid = response.authResponse.userID;
//			var accessToken = response.authResponse.accessToken;
		} else if (response.status === 'not_authorized') {
			location.replace('joinus.html');
		} else {
			location.replace('joinus.html');
		}
	});
}