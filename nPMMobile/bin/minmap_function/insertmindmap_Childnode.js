// 추가버튼을 눌렀을 때의 새로운 window
var mindmapInsert = function(parentnumber, parenttext) {// 클릭했을 때 새로운 페이지 만드는 함수
	var mindWin = Ti.UI.createWindow();
	// 새로운 윈도우 생성
	mindWin.open();
	// 생성한 윈도우 오픈

	// 라벨 생성 및 속성 초기화
	var labelParent = Ti.UI.createLabel({

		top : 30,
		color : '#000',
		width : 'auto',
		height : 'auto',
		text : parenttext,
		textAlign : 'center',
		font : {
			fontSize : 30,
			fontStyle : 'italic'
		},
		objName : parentnumber
	});

	// 입력받기 위한 텍스트 필드 생성 및 초기화
	var txtField = Titanium.UI.createTextField({
		top : 490,
		width : 'auto',
		left : 250,
		hintText : '지금 무슨 생각을 하고 계신가요?(클릭)'
	});

	// 라벨 생성 및 속성 초기화
	var currentMind = Titanium.UI.createLabel({
		top : 375,
		width : 'auto',
		left : 285,
		font : {
			fontSize : 15,
			fontStyle : 'italic'
		},
		text : ' * 현재까지 선택한 마인드 노드 * '

	});

	// 라벨 생성 및 속성 초기화
	var showMind = Titanium.UI.createLabel({

		top : 405,
		width : 'auto',
		left : 293,
		font : {
			fontSize : 10,
			fontStyle : 'italic'
		},
		text : saveContent

	})

	// 뒤로가기 버튼 생성 및 속성 초기화
	var backButton = Ti.UI.createButton({
		saveContent : null,
		title : '뒤로',
		width : 40,
		height : 'auto',
		right : 2,
		top : 47
	});

	// 뒤로가기 버튼에 이벤트 핸들러 부여
	backButton.addEventListener('click', function() {
		mindWin.close();
		// 현재 윈도우 닫는다.

	});

	// 추가 버튼 생성 및 속성 초기화
	var addButton = Ti.UI.createButton({
		top : 47,
		title : '추가',
		width : 40,
		height : 'auto',
		right : 45
	});

	// 현재 생성한 윈도웅에 추가할 view 생성 및 속성 초기화
	var mindviewMiddle = Titanium.UI.createView({
		backgroundColor : '#cacaca',
		top : 0,
		backgroundImage : 'nPMMobile_Image/mindmap_Background4.png',
		width : 'auto'
	});

	// 버튼 생성 및 속성 초기화
	var child_Button = Ti.UI.createButton({

		color : '#ff0000',
		top : 430,
		title : parenttext,
		width : 185,
		height : 50,
		left : 293

	});

	mindviewMiddle.add(child_Button);

	// 추가버튼에 이벤트 핸들러 부여(입력한 값이 디비에 저장되고 현 화면에 추가되어 나타남)
	addButton.addEventListener('click', function() {
		var param = "action=insert" + "&parentnumber=" + labelParent.objName + "&text=" + txtField.value;
		var xhr = Ti.Network.createHTTPClient();
		xhr.open("POST", servletAddr);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
		xhr.setRequestHeader("Cache-Control", "no-cache, must-revalidate");
		xhr.setRequestHeader("Pragma", "no-cache");
		xhr.send(param);
		xhr.onload = function() {
			saveContent = null;
			alert('추가완료');

		};
	});

	// 현재 윈도우에 각 속성들 추가
	mindviewMiddle.add(backButton);
	mindviewMiddle.add(txtField);
	mindviewMiddle.add(addButton);
	mindviewMiddle.add(currentMind);
	mindWin.add(mindviewMiddle);
	mindviewMiddle.add(showMind);

}
