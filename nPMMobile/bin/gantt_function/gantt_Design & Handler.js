// 모버알 nPM_git_hurb 홈페이지 주소 연결
var github_Homepage = Ti.UI.createWebView({

	top : 50,
	url : 'http://github.com/nPMbynPM/nPM',
	width : 'auto',
	height : 'auto'
});

//모버알 nPM_gantt 버튼 생성
var gantt_Button = Titanium.UI.createButton({

	color : '#000',
	selectedColor : '#fff',
	backgroundImage : 'nPMMobile_Image/gantt_Icon.png',
	top : 430,
	width : 100,
	height : 100,
	left : 80
	//	right:200

});

//모버알 nPM_gantt Label 생성
var gantt_Label = Titanium.UI.createLabel({
	color : '#999',
	text : '간트차트',
	font : {
		fontSize : 25,
		fontFamily : 'Helvetica Neuw'
	},
	left : 90,
	top : 535,
	width : 'auto'
});

//gantt_Button 클릭 시 발생하는 이벤트 핸들러
gantt_Button.addEventListener('click', function(e) {
	/*
	 gantt_Homepage.addEventListener('load', function(e)
	 {});
	 */
	top_View.show();
	main_Win.add(top_View);

	gantt_Homepage.show();
	main_Win.add(gantt_Homepage);
});

main_Win.add(gantt_Button);
main_Win.add(gantt_Label);