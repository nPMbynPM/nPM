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

//page_Button 클릭 시 발생하는 이벤트 핸들러
page_Button.addEventListener('click', function(e) {
	/*
	 page_Homepage.addEventListener('load', function(e)
	 {});
	 */
	top_View.show();
	main_Win.add(top_View);

	page_Homepage.show();
	main_Win.add(page_Homepage);
});

main_Win.add(page_Button);
main_Win.add(page_Label);