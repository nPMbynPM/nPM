//window 및 view 설정
Titanium.UI.setBackgroundColor('#FEDCDC');
// 티타늄 시뮬레이터의 배경색깔 초기
var main_Win = Titanium.UI.createWindow();
// main 윈도우 생

// main 윈도우의 배경화면 설정(이미지 삽)
main_Win.setBackgroundImage('nPMMobile_Image/background_Icon.png');

var back_Home = Ti.UI.createButton({
	top : 12,
	title : '뒤로',
	width : 40,
	height : 'auto',
	right : 10

});
var top_View = Ti.UI.createView({

	top : 0,
	backgroundColor : '#a9a9a9',
	width : 'auto',
	height : 'auto'
});

back_Home.addEventListener('click', function() {

	nPM_Homepage.hide();
	project_Homepage.hide();
	mindmap_Homepage.hide();
	gantt_Homepage.hide();
	github_Homepage.hide();
	board_Homepage.hide();
	page_Homepage.hide();
	top_View.hide();

});

top_View.add(back_Home);