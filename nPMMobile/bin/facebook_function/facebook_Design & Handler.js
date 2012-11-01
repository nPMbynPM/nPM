// facebook의 app등록 및 허가 방법
Titanium.Facebook.appid = "195974147201995";
Titanium.Facebook.permissions = ['publish_stream', 'read_stream','user_photos', 'friends_photos'];


function updateLoginStatus() {
	label.text = 'Logged In = ' + Titanium.Facebook.loggedIn;
}



function updateLoginStatus() {
	project_Homepage.url = 'http://solar4.ssu.ac.kr:8080/src/html/mobile/m_load_project.html?npm=' + Ti.Facebook.uid;
	gantt_Homepage.url = 'http://solar4.ssu.ac.kr:8080/src/html/mobile/m_gantt.html?npm=' + Ti.Facebook.uid;
}

func

// login 및 logout 이벤트 핸들러 
Titanium.Facebook.addEventListener('login', updateLoginStatus);
Titanium.Facebook.addEventListener('logout', updateLoginStatus);

// login 버튼 생성및 스타일
if (Titanium.Platform.name == 'iPhone OS') {
	main_Win.add(Titanium.Facebook.createLoginButton({
		style : Ti.Facebook.BUTTON_STYLE_WIDE,
		bottom : 30
	}));
} else {
	main_Win.add(Titanium.Facebook.createLoginButton({
		style : 'wide',
		bottom : 30
	}));
}