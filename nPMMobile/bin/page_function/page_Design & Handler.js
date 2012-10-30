// 모버알 페이지 홈페이지 주소 연결
var page_Homepage = Ti.UI.createWebView({

	top : 50,
	url : 'http://solar4.ssu.ac.kr:8080/index.html#slidepanel',
	width : 'auto',
	height : 'auto'
});

//모버알 nPM_page 버튼 생성
var page_Button = Titanium.UI.createButton({
	color : '#000',
	selectedColor : '#fff',
	backgroundImage : 'nPMMobile_Image/page_Icon.png',
	top : 610,
	width : 100,
	height : 100,
	left : 80

});

//모버알 nPM_page Label 생성
var page_Label = Titanium.UI.createLabel({
	color : '#999',
	text : '내페이지',
	font : {
		fontSize : 25,
		fontFamily : 'Helvetica Neuw'
	},
	left : 87,
	top : 715,
	width : 'auto'
});

// 내페이지 클릭시 나타나는 view(facebook과 연동)
var pageInit = function() {

	if (Titanium.Facebook.loggedIn == false) {
		return;
	}

	else {
		// facebook에 저장된 프로필 사진 저장 view
		var image_View = Titanium.UI.createView({

			backgroundColor : '#808080',

			top : 80,
			height : 400,
			width : 'auto'

		});

		// token 성정
		Ti.API.debug(Titanium.Facebook.accessToken);

		Titanium.Facebook.requestWithGraphPath('me/albums', {
			fields : 'id,name,cover_photo,count,created_time'
		}, 'GET', function(e) {

			if (e.success) {

				Ti.API.debug(e.result);

				if (e.result) {
					var data = JSON.parse(e.result).data;
					for (x in data) {
						Ti.API.debug(JSON.stringify(data[x]));

						var image = Titanium.UI.createImageView({
							image : "https://graph.facebook.com/"
									+ (data[x].cover_photo || 0)
									+ "/picture?access_token="
									+ Ti.Facebook.accessToken,
							top : 0,
							left : 0,
							width : '800',
							height : 'auto'
						});

						if (data[x].name == "Profile Pictures") {
							image_View.add(image);

						}

					}
				}

			}
		});

		// 프로필 라벨 설정
		var profile = Ti.UI.createLabel({

			color : '#ffffff', // 색깔
			text : '프로필', // 텍스트
			font : { // 글자 스타일
				fontSize : 28,
				fontFamily : 'Helvetica Neuw'
			},
			left : 100, // 왼쪽 위치
			top : 18, // 위에 위치
			width : 'auto' // 넓이

		});

		// 프로필 라벵2 설정
		var profile_down = Ti.UI.createLabel({

			color : '#ffffff',
			text : '_________________________________________________',
			font : {
				fontSize : 28,
				fontFamily : 'Helvetica Neuw'
			},
			left : 0,
			top : 40,
			width : 'auto'

		});

		// 이름 설정
		var name = Ti.UI.createLabel({

			color : '#ffffff',
			text : 'id : ' + Ti.Facebook.uid, // facebook의 id를 가져옴
			font : {
				fontSize : 23,
				fontFamily : 'Helvetica Neuw'
			},
			left : 100,
			top : 100,
			width : 'auto'

		});

		// 생일 라벨 성정
		var birth = Ti.UI.createLabel({

			color : '#ffffff',
			text : '생년월일 : ',
			font : {
				fontSize : 23,
				fontFamily : 'Helvetica Neuw'
			},
			left : 100,
			top : 160,
			width : 'auto'

		});

		//	메일 라벨 설정
		var mail = Ti.UI.createLabel({

			color : '#ffffff',
			text : '연락처 : ',
			font : {
				fontSize : 23,
				fontFamily : 'Helvetica Neuw'
			},
			left : 100,
			top : 220,
			width : 'auto'

		});

		// 직업 라벨 설정
		var job = Ti.UI.createLabel({

			color : '#ffffff',
			text : '직업 : ',
			font : {
				fontSize : 23,
				fontFamily : 'Helvetica Neuw'
			},
			left : 100,
			top : 280,
			width : 'auto'

		});

		// 경력 라벨 설정
		var speck = Ti.UI.createLabel({

			color : '#ffffff',
			text : '경력 :   nPM 프로젝트,   ezTrans 프로젝트',
			font : {
				fontSize : 23,
				fontFamily : 'Helvetica Neuw'
			},
			left : 100,
			top : 340,
			width : 'auto'

		});

		var bottom_View = Ti.UI.createView({

			backgroundColor : '#00ced1',
			top : 480,

			width : 'auto'

		});
	}

	// 각 속성을 bottom_view에 저장
	bottom_View.add(name);
	bottom_View.add(birth);
	bottom_View.add(mail);
	bottom_View.add(job);
	bottom_View.add(speck);
	bottom_View.add(profile_down);
	bottom_View.add(profile);
	bottom_View.add(profile_down);
	
	// 각 속성을 page_MainView에 저장
	page_Mainview.add(bottom_View);
	page_Mainview.add(back_Home);
	Page_Mainview.add(image_View);
	main_Win.add(page_Mainview);

};

//page_Button 클릭 시 발생하는 이벤트 핸들러
page_Button.addEventListener('click', function(e) {

	// facebook 로근인 안했을 경우
	if (Titanium.Facebook.loggedIn == false) {
		alert("facebook 로그인 하세요");
		return;
	} // facebook 로그인 했을 경우
	else {
		page_Mainview.show();

	}

});

main_Win.add(page_Button);
main_Win.add(page_Label);