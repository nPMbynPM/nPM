// 자식노드를 클릭하였을 때의 새로운 window
var mindmapAdd = function(parentnumber, parenttext) {// 클릭했을 때 새로운 페이지 만드는 함수
	var mindWin = Ti.UI.createWindow();
	// 새로운 window 생성

	mindWin.title = parenttext;
	// 함수의 매개변수값을 저장
	mindWin.open();

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

	// 뒤로 버튼 생성 및 속성 초기화
	var backButton = Ti.UI.createButton({
		saveContent : null,
		title : '뒤로',
		width : 40,
		height : 'auto',
		right : 2,
		top : 47
	});

	// 뒤로 버튼에 이벤트 핸들러 부여
	backButton.addEventListener('click', function() {
		mindWin.close();
		// 현재 open중인 window 사라짐
	});

	// 추가 버튼 생성 및 속성 초기화
	var addButton = Ti.UI.createButton({
		top : 47,
		title : '추가',
		width : 40,
		height : 'auto',
		right : 45
	});

	// 추가 버튼에 이벤트 핸들러 부여
	addButton.addEventListener('click', function() {
		// mindmapInsert함수 호출
		mindmapInsert(labelParent.objName, labelParent.text);
	});

	// view 생성 및 속성 초기화
	var mindviewMiddle = Titanium.UI.createView({

		backgroundColor : '#cacaca',
		top : 0,
		backgroundImage : 'nPMMobile_Image/mindmap_Background3.png',
		width : 'auto'
	});

	var child_Viewmiddle = Titanium.UI.createView({

		backgroundColor : '#808080',
		top : 85,
		// height: 100,
		width : 'auto'
	});

	// 새로운 노드 추가위치를 위한 속성 변수
	var check_side = 20;
	var check_height = 125;
	var plus_side = 100;
	var node_Count = 0;
	var height_Count = 0;
	var upgrade_count = 0;

	var param = "action=child" + "&parentnumber=" + parentnumber;
	var xhr = Ti.Network.createHTTPClient();
	xhr.open("POST", servletAddr);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
	xhr.setRequestHeader("Cache-Control", "no-cache, must-revalidate");
	xhr.setRequestHeader("Pragma", "no-cache");
	xhr.send(param);
	xhr.onload = function() {
		var doc = this.responseXML.documentElement;
		var id = doc.getElementsByTagName('id');

		// 전 페이지에서 선택한 노드의 값을 지니는 버튼 생성 및 속성 초기화
		var node_Button = Titanium.UI.createButton({

			color : '#ff0000',
			top : 430,
			title : parenttext,
			width : 185,
			height : 50,
			left : 293

		});

		mindviewMiddle.add(node_Button);

		// id의 개수에 따라 파싱 시작
		for (var i = 0; i < id.length; i++) {
			var currentItem = id.item(i);
			var mytext = currentItem.getElementsByTagName('mytext').item(0).text;
			var mynumber = currentItem.getElementsByTagName('number').item(0).text;

			switch(i) {
				case 0:
					// 노드의 개수가 1개라면

					// 노드 버튼 생성 및 속성 초기화
					var parentNode_Button = Ti.UI.createButton({

						color : '#000',
						top : 430,
						objName : mynumber,
						title : mytext,
						width : 185,
						height : 50,
						left : 68
					});

					mindviewMiddle.add(parentNode_Button);
					// 현재 윈도우에 추가
					// 노드 버튼에 이벤트 핸들러 부여
					parentNode_Button.addEventListener('click', function(e) {

						saveContent = saveContent + this.title + "  -->  "
						mindmapAdd(this.objName, this.title);
					});
					break;

				case 1:
					// 노드의 개수가 2개라면

					// 노드 버튼 생성 및 속성 초기화
					var parentNode_Button = Ti.UI.createButton({

						color : '#000',
						top : 430,
						objName : mynumber,
						title : mytext,
						width : 185,
						height : 50,
						left : 518
					});

					mindviewMiddle.add(parentNode_Button);
					// 노드 버튼에 이벤트 핸들러 부여
					parentNode_Button.addEventListener('click', function(e) {
						saveContent = saveContent + this.title + "  -->  "
						mindmapAdd(this.objName, this.title);
					});
					break;

				case 2:
					// 노드의 개수가 3개라면

					var parentNode_Button = Ti.UI.createButton({

						color : '#000',
						top : 305,
						objName : mynumber,
						title : mytext,
						width : 185,
						height : 50,
						left : 293
					});

					mindviewMiddle.add(parentNode_Button);
					parentNode_Button.addEventListener('click', function(e) {

						saveContent = saveContent + this.title + "  -->  "
						mindmapAdd(this.objName, this.title);

					});
					break;

				case 3:
					// 노드의 개수가 4개라면

					var parentNode_Button = Ti.UI.createButton({

						color : '#000',
						top : 555,
						objName : mynumber,
						title : mytext,
						width : 185,
						height : 50,
						left : 293
					});

					mindviewMiddle.add(parentNode_Button);
					parentNode_Button.addEventListener('click', function(e) {

						saveContent = saveContent + this.title + "  -->  "
						mindmapAdd(this.objName, this.title);
					});
					break;

				case 4:
					// 노드의 개수가 5개라면
					var parentNode_Button = Ti.UI.createButton({

						color : '#000',
						top : 305,
						objName : mynumber,
						title : mytext,
						width : 185,
						height : 50,
						left : 68
					});

					mindviewMiddle.add(parentNode_Button);
					parentNode_Button.addEventListener('click', function(e) {

						saveContent = saveContent + this.title + "  -->  "
						mindmapAdd(this.objName, this.title);
					});
					break;

				case 5:
					// 노드의 개수가 6개라면

					var parentNode_Button = Ti.UI.createButton({

						color : '#000',
						top : 305,
						objName : mynumber,
						title : mytext,
						width : 185,
						height : 50,
						left : 518
					});

					mindviewMiddle.add(parentNode_Button);
					parentNode_Button.addEventListener('click', function(e) {

						saveContent = saveContent + this.title + "  -->  "
						mindmapAdd(this.objName, this.title);
					});
					break;

				case 6:
					// 노드의 개수가 7개라면

					var parentNode_Button = Ti.UI.createButton({

						color : '#000',
						top : 555,
						objName : mynumber,
						title : mytext,
						width : 185,
						height : 50,
						left : 68
					});

					mindviewMiddle.add(parentNode_Button);
					parentNode_Button.addEventListener('click', function(e) {

						saveContent = saveContent + this.title + "  -->  "
						mindmapAdd(this.objName, this.title);
					});
					break;

				case 7:
					// 노드의 개수가 8개라면

					var parentNode_Button = Ti.UI.createButton({

						color : '#000',
						top : 555,
						objName : mynumber,
						title : mytext,
						width : 185,
						height : 50,
						left : 518
					});

					mindviewMiddle.add(parentNode_Button);
					parentNode_Button.addEventListener('click', function(e) {

						saveContent = saveContent + this.title + "  -->  "
						mindmapAdd(this.objName, this.title);
					});
					break;

				case 8:
					// 노드의 개수가 9개라면

					var parentNode_Button = Ti.UI.createButton({

						color : '#000',
						top : 555,
						objName : mynumber,
						title : mytext,
						width : 185,
						height : 50,
						left : 68
					});

					mindviewMiddle.add(parentNode_Button);
					parentNode_Button.addEventListener('click', function(e) {

						saveContent = saveContent + this.title + "  -->  "
						mindmapAdd(this.objName, this.title);
					});
					break;

				case 9:
					// 노드의 개수가 10개라면
					var parentNode_Button = Ti.UI.createButton({

						color : '#000',
						top : 305,
						objName : mynumber,
						title : mytext,
						width : 185,
						height : 50,
						left : 293
					});

					mindviewMiddle.add(parentNode_Button);
					parentNode_Button.addEventListener('click', function(e) {

						saveContent = saveContent + this.title + "  -->  "
						mindmapAdd(this.objName, this.title);
					});
					break;

				case 10:
					// 노드의 개수가 11개라면
					var parentNode_Button = Ti.UI.createButton({

						color : '#000',
						top : 305,
						objName : mynumber,
						title : mytext,
						width : 185,
						height : 50,
						left : 293
					});

					mindviewMiddle.add(parentNode_Button);
					parentNode_Button.addEventListener('click', function(e) {

						saveContent = saveContent + this.title + "  -->  "
						mindmapAdd(this.objName, this.title);
					});
					break;

				case 11:
					// 노드의 개수가 12개라면
					var parentNode_Button = Ti.UI.createButton({

						color : '#000',
						top : 305,
						objName : mynumber,
						title : mytext,
						width : 185,
						height : 50,
						left : 518
					});

					mindviewMiddle.add(parentNode_Button);
					parentNode_Button.addEventListener('click', function(e) {

						saveContent = saveContent + this.title + "  -->  "
						mindmapAdd(this.objName, this.title);
					});
					break;

			}

			node_Count++;
			upgrade_count++;

		}
	};

	mindviewMiddle.add(addButton);
	mindviewMiddle.add(backButton);
	mindWin.add(mindviewMiddle);
}