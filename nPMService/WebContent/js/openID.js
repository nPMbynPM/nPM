var flag = false;

function fbLogin() {
	if(flag){
	FB.getLoginStatus(function(response) {
		FB.login(function(response) {
			if (response.authResponse) {

			} else {

			}
		}, {
			scope : 'user_birthday,email,user_work_history'
		});
	});
	}
	else{
		alert('잠시만 기다려주세요');
	}
}

function fbGetUser() {
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
		
	});
}

function fbIsLogin() {
	FB.getLoginStatus(function(response) {
		if (response.status === 'connected') {
//			alert('connected');
			// the user is logged in and has authenticated your
			// app, and response.authResponse supplies
			// the user's ID, a valid access token, a signed
			// request, and the time the access token
			// and signed request each expire
			fbloginStatus = true;
//			var uid = response.authResponse.userID;
//			var accessToken = response.authResponse.accessToken;
		} else if (response.status === 'not_authorized') {
			// the user is logged in to Facebook,
			// but has not authenticated your app
//			alert('not connected');
			fbloginStatus = false;
			location.replace('joinus.html');
		} else {
			// the user isn't logged in to Facebook.
//			alert('not connected');
			fbloginStatus = false;
			location.replace('joinus.html');
		}
	});
}