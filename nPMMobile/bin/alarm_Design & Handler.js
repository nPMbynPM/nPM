// 모버알 nPM_alarm 버튼 생성
var alarm_Button = Titanium.UI.createButton({
	color : '#000',
	selectedColor : '#fff',
	backgroundImage : 'nPMMobile_Image/alarm_Icon.png',
	top : 610,
	width : 100,
	height : 100,
	left : 310

});

//모버알 nPM_alarm 이미지 생성
var alarm_Image = Titanium.UI.createImageView({

	top : 0, // 이미지 생성 위치
	width : 'auto',
	image : 'nPMMobile_Image/alarm_Image.png' // 이미지 삽입

});

//모버알 nPM_alarm Label 생성
var alarm_Label = Titanium.UI.createLabel({
	color : '#999',
	text : 'nPM 공지사항',
	font : {
		fontSize : 25,
		fontFamily : 'Helvetica Neuw'
	},
	left : 290,
	top : 715,
	width : 'auto'
});

//alarm_Button 클릭 시 발생하는 이벤트 핸들러
alarm_Button.addEventListener('click', function(e) {

	var winAlarm = Titanium.UI.createWindow();
	// 새로운 window 생성
	var btnBack = Titanium.UI.createButton({// main_Win으로 돌아가기 위한 버튼 생성

		top : 900,
		title : '뒤로',
		width : 60,
		height : 'auto',
		right : 2
	});

	winAlarm.open();
	// 새로운 window 보여
	//	alarmBottom_View.add(btnBack);  // 새로운 window에 btnBack button 추가
	winAlarm.add(alarm_Image);
	alarm_Image.add(btnBack);
	//	winAlarm.add(alarmBottom_View);

	btnBack.addEventListener('click', function(e)// btnBack button 클릭하면
	{
		winAlarm.close();
		// 새로운 window 닫힘
		main_Win.open();
		// main_Win으로 돌아감
	});

});

main_Win.add(alarm_Button);
main_Win.add(alarm_Label);