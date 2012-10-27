var mindmap_Win = Titanium.UI.createWindow();

mindmap_Win.setBackgroundImage('nPMMobile_Image/mindmap_Background.png');

// mindmap_Button을 누르면 이벤트 핸들러가 동작한다.
mindmap_Button.addEventListener('click', function(e)// mind 버튼 클릭하였을 때
{
	// main_Win.close();
	mindmap_Win.open();
	// mindmap_Win 보여준다.
	mindMapInit();
	// mindMapInit()를 호출

});

// 모버알 nPM_project 홈페이지 주소 연결
var mindmap_Homepage = Ti.UI.createWebView({

	top : 50,
	url : 'http://solar4.ssu.ac.kr/mindmap.html',
	width : 'auto',
	height : 'auto'
});

//모버알 nPM_mindmap 버튼 생성
var mindmap_Button = Titanium.UI.createButton({

	color : '#000',
	selectedColor : '#fff',
	backgroundImage : 'nPMMobile_Image/mind_Icon.png',
	top : 250,
	width : 100,
	height : 100,
	left : 560
	//	right:200

});


//모버알 nPM_mindmap Label 생성
var mindmap_Label = Titanium.UI.createLabel({
	color : '#999',
	text : '마인드맵',
	font : {
		fontSize : 25,
		fontFamily : 'Helvetica Neuw'
	},
	left : 565,
	top : 355,
	width : 'auto'
});

mindmap_Button.addEventListener('click', function(e)// mind 버튼 클릭하였을 때
		{
			//	main_Win.close();
			mindmap_Win.open();
			// mindmap_Win 보여준다.
			mindMapInit();
			// mindMapInit()를 호출

});

//main_Win에 버튼 추가
main_Win.add(mindmap_Button);

// main_Win에 Label 추가
main_Win.add(mindmap_Label);
