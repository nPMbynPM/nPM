// 모버알 nPM 홈페이지 주소 연결
var project_Homepage = Ti.UI.createWebView({
	//	url:'http://solar4.ssu.ac.kr:8080/m_npm.html',
	top : 50,
	url : 'http://solar4.ssu.ac.kr:8080/project_Management.html',
	width : 'auto',
	height : 'auto'
});

//모버알 nPM_project 버튼 생성
var project_Button = Titanium.UI.createButton({
	color : '#000', // 버튼 색깔
	selectedColor : '#fff', // 버튼 클릭했을 때 색깔
	backgroundImage : 'nPMMobile_Image/project_Icon.png', // 버튼 이미지
	top : 250, // 버튼 생성 높이
	width : 100, // 버튼 너비
	height : 100, // 버튼 높이
	left : 310 // 버튼 생성 왼쪽 위치

});

//모버알 nPM_project Label 생성
var project_Label = Titanium.UI.createLabel({
	color : '#999',
	text : '프로젝트 관리',
	font : {
		fontSize : 25,
		fontFamily : 'Helvetica Neuw'
	},
	left : 302,
	top : 355,
	width : 'auto'
});

//project_Button 클릭 시 발생하는 이벤트 핸들러
project_Button.addEventListener('click', function(e) {
	/*
	 project_Homepage.addEventListener('load', function(e)
	 {});
	 */
	top_View.show();
	project_Homepage.show();

	main_Win.add(top_View);
	main_Win.add(project_Homepage);
});

main_Win.add(project_Button);
main_Win.add(project_Label);