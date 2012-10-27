var mindviewMiddle = Titanium.UI.createView({// 새로운 window에 view설정

	backgroundColor : '#cacaca', // view 배경색깔
	top : 0, // view 배경위
	width : 'auto', // view 너비
	backgroundImage : 'nPMMobile_Image/mindmap_Background.png' // view배경 이미지
});


var saveContent = "";
// 서블릿 주소
var servletAddr = 'http://solar4.ssu.ac.kr:8080/mobileServlet';


var mindMapInit = function() {

	// 서버로부터 data를 가져오기 위한 작업
	var param = "action=init";
	var xhr = Ti.Network.createHTTPClient();

	xhr.open("POST", servletAddr);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
	xhr.setRequestHeader("Cache-Control", "no-cache, must-revalidate");
	xhr.setRequestHeader("Pragma", "no-cache");
	xhr.send(param);
	xhr.onload = function() {
		var doc = this.responseXML.documentElement;
		// 서버가 sml 문자 받음
		var id = doc.getElementsByTagName('id');

		// 새로운 node 생성시 나타날 위치 저장 변수
		var height = 220;
		// var check_side=68;
		var check_side = 10;
		// var check_height=135;
		var check_height = 100;
		// var plus_side=225;
		var plus_side = 20;
		var node_Count = 0;
		var height_Count = 0;
		var upgrade_count = 0;

	    // id의 개수에 따라 파싱 시작
		for (var i = 0; i < id.length; i++) {
			var currentItem = id.item(i);
			var mytext = currentItem.getElementsByTagName('mytext').item(0).text;
			var mynumber = currentItem.getElementsByTagName('number').item(0).text;

			num = i;
			num2 = i + 1;

			
		if(i==0){

		// 버튼 생성 및 버튼 속성 초기화
		var parentNode_Button = Ti.UI.createButton({

		color: '#000',
		top:check_height + height,
		objName:mynumber,
		title:mytext,
		width:185,
		height:50,
		left:check_side + node_Count*plus_side
		});

		mindviewMiddle.add(parentNode_Button);

		// mind 버튼 클릭하였을 때 이벤트 핸들러 호출
		parentNode_Button.addEventListener('click', function(e) {

		saveContent = this.title + "  -->  "  // 현재 클릭한 노드의 이름 저장
		mindmapAdd(this.objName, this.title); // mindmapAdd 함수 호출
		});
		}
		*/
		// 한줄에 3개씩 노드를 표현하기 위해 3개가 완성되면 그 다음줄로 개행
		
		else if(i%3==0){

				
		height_Count++;
		node_Count = 0;

		var parentNode_Button = Ti.UI.createButton({

		color: '#000',
		 top:check_height + height_Count*check_height + height,
		objName:mynumber,
		top:40,
		title:mytext,
		width:120,
		height:50,
		 left:check_side + node_Count*plus_side
		});

	    mindviewMiddle.add(parentNode_Button);
		parentNode_Button.addEventListener('click', function(e) {

		saveContent = this.title + "  -->  "
		mindmapAdd(this.objName, this.title);
		});
		}
		// 처음 노드 생성이 아니고 2번째 줄의 2번째 노드부터 생성할 때
		else if(i%3!=0 & node_Count!=0){

		var parentNode_Button = Ti.UI.createButton({

		color: '#000',
		top:check_height + height_Count*check_height +  height,
		objName:mynumber,
		title:mytext,
		width:185,
		height:50,
		left:check_side + node_Count*plus_side
		});

		mindviewMiddle.add(parentNode_Button);

		parentNode_Button.addEventListener('click', function(e) {

		saveContent = this.title + "  -->  "
		mindmapAdd(this.objName, this.title);
		});

		}
		// 위의 3가지 경우가 아닐 때
		else{
		node_Count = upgrade_count;

		var parentNode_Button = Ti.UI.createButton({

		color: '#000',
		top:check_height  + height,
		objName:mynumber,
		title:mytext,
		width:185,
		height:50,
		left:check_side + node_Count*plus_side
		});

		 mindviewMiddle.add(parentNode_Button);

		parentNode_Button.addEventListener('click', function(e) {

		saveContent = this.title + "  -->  "
		mindmapAdd(this.objName, this.title);
		});
		}

		node_Count++;
		upgrade_count++;

		}
	
		// 버튼 생성 및 속성 초기화
		var useMind = Ti.UI.createButton({
			top : 47,
			title : '설명',
			width : 40,
			height : 'auto',
			right : 45
		});

		// 버튼 생성 및 속성 초기화
		var btnBack = Titanium.UI.createButton({

			title : '뒤로',
			width : 40,
			height : 'auto',
			right : 2,
			top : 47

		});

		// 설명 버튼에 이벤트 핸들러 부여
		useMind.addEventListener('click', function(e) {
			alert('원하는 노드를 클릭하세요!');
		});

		// 뒤오 버튼에 이벤트 핸들러 부여
		btnBack.addEventListener('click', function(e) {
			mindmap_Win.close();
			main_Win.open();
			
			for ( i = 0; i < num; i++) {
				circle[i].hide();
			}
		});
		// 현재 윈도우에 속성 추가함
		 mindviewMiddle.add(btnBack);
		 mindviewMiddle.add(useMind);
	
	}
	 mindmap_Win.add(mindviewMiddle);
};