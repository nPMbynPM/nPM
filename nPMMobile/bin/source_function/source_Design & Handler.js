
var github_Homepage = Ti.UI.createWebView({

	top : 50,
	url : 'http://github.com/nPMbynPM/nPM',
	width : 'auto',
	height : 'auto'
});


//모버알 nPM_source 버튼 생성
var source_Button = Titanium.UI.createButton({

	color : '#000',
	selectedColor : '#fff',
	backgroundImage : 'nPMMobile_Image/source_Icon.png',
	top : 430,
	width : 100,
	height : 100,
	left : 310

});

// 모버알 nPM_source Label 생성
var source_Label = Titanium.UI.createLabel({
	color : '#999',
	text : '소스관리',
	font : {
		fontSize : 25,
		fontFamily : 'Helvetica Neuw'
	},
	left : 318,
	top : 535,
	width : 'auto'
});

//source_Button 클릭 시 발생하는 이벤트 핸들러
source_Button.addEventListener('click', function(e) {
	/*
	 github_Homepage.addEventListener('load', function(e)
	 {});
	 */
	top_View.show();
	main_Win.add(top_View);

	github_Homepage.show();
	main_Win.add(github_Homepage);
});

main_Win.add(source_Button);
main_Win.add(source_Label);