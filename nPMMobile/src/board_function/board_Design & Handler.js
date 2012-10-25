// 모버알 nPM_board 홈페이지 주소 연결
var board_Homepage = Ti.UI.createWebView({

	top : 50,
	url : 'http://solar4.ssu.ac.kr/xe/freeboard',
	width : 'auto',
	height : 'auto'
});

//모버알 nPM_board 버튼 생성
var board_Button = Titanium.UI.createButton({

	color : '#000',
	selectedColor : '#fff',
	backgroundImage : 'nPMMobile_Image/board_Icon.png',
	top : 430,
	width : 100,
	height : 100,
	left : 560,

});

//모버알 nPM_board Label 생성
var board_Label = Titanium.UI.createLabel({
	color : '#999',
	text : '게시판',
	font : {
		fontSize : 25,
		fontFamily : 'Helvetica Neuw'
	},
	left : 580,
	top : 535,
	width : 'auto'
});

//board_Button 클릭 시 발생하는 이벤트 핸들러
board_Button.addEventListener('click', function(e) {
	/*
	 board_Homepage.addEventListener('load', function(e)
	 {});
	 */

	top_View.show();
	main_Win.add(top_View);

	board_Homepage.show();
	main_Win.add(board_Homepage);
});

main_Win.add(board_Button);
main_Win.add(board_Label);