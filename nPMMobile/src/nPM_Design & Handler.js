// 모버알 nPM 홈페이지 주소 생성
var nPM_Homepage = Ti.UI.createWebView({

	top : 50,
	url : 'http://solar4.ssu.ac.kr:8080', // 연결할 주소
	width : 'auto',
	height : 'auto'
});

//모버알 nPM 버튼 생성
var nPM_Button = Titanium.UI.createButton({
	color : '#000',
	selectedColor : '#fff',
	backgroundImage : 'nPMMobile_Image/nPM_Icon.png',
	top : 250,
	width : 100,
	height : 100,
	left : 80
});

//모버알 nPM Label 생성
var nPM_Label = Titanium.UI.createLabel({
	color : '#999', // Label 색깔 지정
	text : 'nPM', // Label 이름 지정
	font : {
		fontSize : 25,
		fontFamily : 'Helvetica Neuw'
	}, // Label font 지정
	left : 105, // Label 왼쪽 위치 지정
	top : 355, // Label 위쪽 위치 지정
	width : 'auto' // Label 너비 자동 지정
});

//nPM_Button 클릭 시 발생하는 이벤트 핸들러
nPM_Button.addEventListener('click', function(e) {
	//	nPM_Homepage.addEventListener('load', function(e){  // nPM_Homepage 연동

	top_View.show();
	nPM_Homepage.show();

	main_Win.add(top_View);
	main_Win.add(nPM_Homepage);
	// main_Win 함수에 등
});

main_Win.add(nPM_Button);
main_Win.add(nPM_Label);