//window 및 view 설정
Titanium.UI.setBackgroundColor('#FEDCDC');
// 티타늄 시뮬레이터의 배경색깔 초기
var main_Win = Titanium.UI.createWindow();
// main 윈도우 생

// main 윈도우의 배경화면 설정(이미지 삽)
main_Win.setBackgroundImage('nPMMobile_Image/background_Icon.png');
var facebook_Logincheck = false;    // facebook 로그인 체크 여부 변수

// facebook에 로그인 햇을 떄의 사용자 app를 가져오기 위한 label 생성
var label_uid = Ti.UI.createLabel({
	text : Ti.Facebook.uid,
	font : {
		fontSize : 14
	},
	height : 'auto',
	top : 10,
	textAlign : 'center'
});



// 연결된 링크 주소로 이동위, 메인 페이지로 돌아가기 위해 생성한 버튼
var back_Home = Ti.UI.createButton({
	top : 12,
	title : '뒤로',
	width : 40,
	height : 'auto',
	right : 10

});

// 연결된 링크주소의 view위에 새로운 view 추가(뒤로가기 버튼 누르기 위해)
var top_View = Ti.UI.createView({

	top : 0,
	backgroundColor : '#a9a9a9',
	width : 'auto',
	height : 'auto'
});


// top_view위에 nPM로고를 삽입하기 위한 버튼
var top_button = Ti.UI.createButton({
	
	backgroundImage : 'nPMMobile_Image/nPM_Logo.png',
	top : 7,
		width : 45,
		height : 50,
		left : 10
		
	});

// 내 페이지 생성하기 위한 view 생성
var page_Mainview = Ti.UI.createView({
	
	backgroundColor : '#808080',
	top : 0,
	width : 'auto'

});


back_Home.addEventListener('click', function() {

	nPM_Homepage.hide();
	project_Homepage.hide();
	mindmap_Homepage.hide();
	gantt_Homepage.hide();
	github_Homepage.hide();
	board_Homepage.hide();
	page_Homepage.hide();
	page_Mainview.hide();
	top_View.hide();

});

top_View.add(back_Home);
top_View.add(top_button);
