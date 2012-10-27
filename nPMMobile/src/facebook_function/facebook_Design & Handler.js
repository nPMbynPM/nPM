// 모버알 nPM facebook Button 생성
var facebook_Button = Titanium.Facebook.createLoginButton({
	top : 900,
	left : 550,
	style : Ti.Facebook.BUTTON_STYLE_WIDE

});

// 생성한 facebook app id등록
Ti.Facebook.appid = '195974147201995';
// facebook login 시 접근권한 부여
Ti.Facebook.permissions = ['publish_stream', 'read_stream', "user_checkins", "publish_checkins", 'create_event'];

// facebook_login 버튼 클릭시 이벤트 발생
Ti.Facebook.addEventListener('login', function(e) {

	var check = "no";
	var faceBtn = "no";

	if (e.success) {//  login이 성공적이라
		alert('Logged In');
		Titanium.App.Properties.setBool("enableFacebook", true);

		var fbToken = Ti.Facebook.accessToken;
		var fbUid_r = Ti.Facebook.uid;
		// 사용자의 id를 저장하는 변수

		var fbUid_r = Ti.UI.createTextField({
			top : 300,
			height : 200,
			width : 200,
			value : 1,
			textAlign : 'center',
			font : {
				fontSize : 40,
				fontStyle : 'italic'
			},
		});
		okBtn = "ok";

	} else if (e.error) {
		alert(e.error);
		Titanium.App.Properties.setBool("enableFacebook", false);
	} else if (e.cancelled) {
		alert("Canceled");
		okBtn = "ok";
		Titanium.App.Properties.setBool("enableFacebook", false);
	}
});

// facebook logout할 때 발생하는 이벤트
Ti.Facebook.addEventListener('logout', function(e) {
	if (e.success) {
		Titanium.App.Properties.setBool("enableFacebook", false);
		alert('Logged Out');
	} else if (e.error) {
		alert(e.error);
	}
});

// facebook_login 함수 설정
function login() {
	Ti.facebook.authorize()
}

// facebook_logout 함수 설정
function logout() {
	Ti.facebook.logout()
}

main_Win.add(facebook_Button);