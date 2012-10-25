// 모버알 nPM_introduce 버튼 생성
var introduce_Button = Titanium.UI.createButton({
	color : '#000',
	selectedColor : '#fff',
	backgroundImage : 'nPMMobile_Image/nPM_Logo.png',
	top : 610,
	width : 100,
	height : 100,
	left : 560

});

// 모버알 nPM_introduce 이미지 생성
var introduce_Image = Titanium.UI.createImageView({

	top : 0,
	width : 'auto',
	//	height:630,
	image : 'nPMMobile_Image/introduce_Image.png'

});

//모버알 nPM_introduce Label 생성
var introduce_Label = Titanium.UI.createLabel({
	color : '#999',
	text : 'nPM 소개',
	font : {
		fontSize : 25,
		fontFamily : 'Helvetica Neuw'
	},
	left : 572,
	top : 715,
	width : 'auto'
});

//introduce_Button 클릭 시 발생하는 이벤트 핸들러
introduce_Button.addEventListener('click', function(e) {

	var winExplain = Titanium.UI.createWindow();

	var btnBack = Titanium.UI.createButton({

		top : 12,
		title : '뒤로',
		width : 40,
		height : 'auto',
		right : 10
	});

	winExplain.open();
	//	introduceBottom_View.add(btnBack);
	introduce_Image.add(btnBack);

	winExplain.add(introduce_Image);
	//	winExplain.add(introduceBottom_View);

	btnBack.addEventListener('click', function(e) {
		winExplain.close();
		main_Win.open();
	});

});

main_Win.add(introduce_Button);
main_Win.add(introduce_Label);