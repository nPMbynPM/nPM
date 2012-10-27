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
	
	// face_book에 로그인이 안된다면
	if(facebook_Logincheck == false)
	{
		alert("facebook 로그인 하세요");
		return;
	}
	
	else
	{
		// 내 페이지 view안에서 새로운 view생성(facebokk에 저장된 사용자의 이미지 저장하기 위해)
		var image_View = Ti.UI.createView({
	
		backgroundColor : '#808080',
		top : 80,
		backgroundImage : 'nPMMobile_Image/page_Icon.png',
		height:400,
		width : 'auto'
	
		});
	
		// 프로필 label을 생성하기 위한 label 
		var profile = Ti.UI.createLabel({
	
			color : '#ffffff',
			text : '프로필',
			font : {
				fontSize : 28,
				fontFamily : 'Helvetica Neuw'
			},
			left : 100,
			top : 18,	
			width : 'auto'
	
		});

		// 디자인 꾸미기 위한 label 
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
	
		// 이름 label을 생성하기 위한 label
		var name = Ti.UI.createLabel({
		
			color : '#ffffff',
			text : '이름 : ',
			font : {
			fontSize : 23,
			fontFamily : 'Helvetica Neuw'
			},
			left : 100,
			top : 100,
			width : 'auto'
	
		});
	
		// 생년월일 label을 생성하기 위한 label
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
	
		// 메일 label을 생성하기 위한 label
		var mail = Ti.UI.createLabel({
		
			color : '#ffffff',
			text : '연락처: ',
			font : {
				fontSize : 23,
				fontFamily : 'Helvetica Neuw'
			},
			left : 100,
			top : 220,
			width : 'auto'
	
		});
	
		// 직업 label을 생성하기 위한 label
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
	
		// 경력 label을 생성하기 위한 label
		var  speck = Ti.UI.createLabel({
	
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
	

		// facebook으로 부터 기존정보를 가져와서 보여주는 view
		var bottom_View = Ti.UI.createView({
	
			backgroundColor : '#00ced1',
			top : 480,
			width : 'auto'
	
		});
	}
	
	
	// 각 label을 view에 추가
		bottom_View.add(name);
		bottom_View.add(birth);
		bottom_View.add(mail);
		bottom_View.add(job);
		bottom_View.add(speck);
		bottom_View.add(profile_down);
		bottom_View.add(profile);
		bottom_View.add(profile_down);
		page_Mainview.add(bottom_View);
		page_Mainview.add(back_Home);
		page_Mainview.add(image_View);
		main_Win.add(page_Mainview);
	
	
};

//page_Button 클릭 시 발생하는 이벤트 핸들러
page_Button.addEventListener('click', function(e) {
	
	pageInit();  // pageInit() 호출
	page_Mainview.show();
	
});

main_Win.add(page_Button);
main_Win.add(page_Label);