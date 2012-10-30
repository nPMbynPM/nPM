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
		
		var circle = [];   // circle을 저장할 배열 성정
		var circle_r = [];   // circle을 저장할 배열 성정
		var circleSize = 130; // parnetNode를 저장하는 원의 크기
		var circleX = 120;    // 원의 x좌표
		var circleY = 0;      // 원의 y좌표
		
		// id의 개수에 따라 파싱 시작
		for (var i = 0; i < id.length; i++) {
			var currentItem = id.item(i);
			var mytext = currentItem.getElementsByTagName('mytext').item(0).text;
			var mynumber = currentItem.getElementsByTagName('number').item(0).text;

			num = i;
			num2 = i + 1;

			
		if(i==0){
			
			// 바깥원 모양의 view 생성
			var circle[i]= Titanium.UI.createView({
				height : circleSize,  // 원의 높이 설정
				width : circleSize,   // 원의 크기 설정
				anchorPoint : {   // 원의 중심을 기준으로 한 크기 설정
					x : (circleSize / 2),
					y : (circleSize / 2)
				},
				borderRadius : (circleSize / 2), // 원의 둘레 설정
				backgroundColor : '#336699',   // 원의 배경색 설정
				opacity : 0.3,
				left : check_side + node_Count * plus_side,  // 원의 시작 왼쪽 위치
				top : check_height + height  // 원의 시작 위쫏 위치
			});
			
			// 안쪽원 모양의 view 생성
			var circle_r[i]=Titanium.UI.createView({
				height : circleSize,   // 원의 높이 설정
				width : circleSize,    // 원의 크기 설정
				anchorPoint : {        // 원의 중심을 기준으로 한 크기 설정
					x : (circleSize / 2),  
					y : (circleSize / 2)
				},
				borderRadius : (circleSize / 2),  // 원의 둘레 설정
				backgroundColor : '#e6e6fa',      // 원의 배경색 설정
				top : check_height + height,      // 원의 시작 위쪽 위치
				left : check_side + node_Count * plus_side  // 원의 시작 왼쪽 위치
			});
							
			// 안쪽 원에 대한 이벤트 핸들러 설정
			circle_r[i].addEventListener('touchmove', function(e)  // 안쪽 원을 클릭해서 움직인다면
			{
				circle[i].setTop(e.y + circleY - (circleSize/2));  // 바깥쪽 원의 top값을 이동
				circle[i]1.setLeft(e.x + circleX - (circleSize/2));  // 바깥쪽 원의 left값을 이동
            });
                                
			// 안쪽 웬에 대한 이벤트 핸들러
			circle_r[i].addEventListener('touchend', function(e)  // 원의 움직임을 끝낸다면
            {
                   	circleY = circle[i].getTop();  // 현재 안쪽원의 x값을 고정
                   	circleX = circle[i].getLeft(); // 현재 안쪽원의 y값을 고정
                    	
                   	circle_r[i].setTop(circle1.getTop()); 
                   	circle_r[i].setLeft(circle1.getLeft());
             });
                    
			// 바깥쪽 원에 대한 이벤트 핸들러 설정
			circle[i].addEventListener('touchmove', function(e)  // 바깥쪽 원을 움직인다면
			{
				label.setLeft(e.x);  
				label.setTop(e.y);
			});
 

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
			
			var circle[i]= Titanium.UI.createView({
				height : circleSize,
				width : circleSize,
				anchorPoint : {
					x : (circleSize / 2),
					y : (circleSize / 2)
				},
				borderRadius : (circleSize / 2),
				backgroundColor : '#336699',
				opacity : 0.3,
				left : check_side + node_Count * plus_side,
				top : check_height + height
			});
				
			var circle_r[i]=Titanium.UI.createView({
				height : circleSize,
				width : circleSize,
				anchorPoint : {
					x : (circleSize / 2),
					y : (circleSize / 2)
				},
				borderRadius : (circleSize / 2),
				backgroundColor : '#e6e6fa',
				top : check_height + height,
				left : check_side + node_Count * plus_side
			});
							
			circle_r[i].addEventListener('touchmove', function(e)
			{
				circle[i].setTop(e.y + circleY - (circleSize/2));
				circle[i]1.setLeft(e.x + circleX - (circleSize/2));
            });
                                 
			circle_r[i].addEventListener('touchend', function(e)
            {
                   	circleY = circle[i].getTop();
                   	circleX = circle[i].getLeft();
                    	
                   	circle_r[i].setTop(circle1.getTop());
                   	circle_r[i].setLeft(circle1.getLeft());
             });
                    
			circle[i].addEventListener('touchmove', function(e)
			{
				label.setLeft(e.x);
				label.setTop(e.y);
			});	

				
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
			
			var circle[i]= Titanium.UI.createView({
				height : circleSize,
				width : circleSize,
				anchorPoint : {
					x : (circleSize / 2),
					y : (circleSize / 2)
				},
				borderRadius : (circleSize / 2),
				backgroundColor : '#336699',
				opacity : 0.3,
				left : check_side + node_Count * plus_side,
				top : check_height + height
			});
				
			var circle_r[i]=Titanium.UI.createView({
				height : circleSize,
				width : circleSize,
				anchorPoint : {
					x : (circleSize / 2),
					y : (circleSize / 2)
				},
				borderRadius : (circleSize / 2),
				backgroundColor : '#e6e6fa',
				top : check_height + height,
				left : check_side + node_Count * plus_side
			});
							
			circle_r[i].addEventListener('touchmove', function(e)
			{
				circle[i].setTop(e.y + circleY - (circleSize/2));
				circle[i]1.setLeft(e.x + circleX - (circleSize/2));
            });
                                 
			circle_r[i].addEventListener('touchend', function(e)
            {
                   	circleY = circle[i].getTop();
                   	circleX = circle[i].getLeft();
                    	
                   	circle_r[i].setTop(circle1.getTop());
                   	circle_r[i].setLeft(circle1.getLeft());
             });
                    
			circle[i].addEventListener('touchmove', function(e)
			{
				label.setLeft(e.x);
				label.setTop(e.y);
			});	

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
			
			var circle[i]= Titanium.UI.createView({
				height : circleSize,
				width : circleSize,
				anchorPoint : {
					x : (circleSize / 2),
					y : (circleSize / 2)
				},
				borderRadius : (circleSize / 2),
				backgroundColor : '#336699',
				opacity : 0.3,
				left : check_side + node_Count * plus_side,
				top : check_height + height
			});
				
			var circle_r[i]=Titanium.UI.createView({
				height : circleSize,
				width : circleSize,
				anchorPoint : {
					x : (circleSize / 2),
					y : (circleSize / 2)
				},
				borderRadius : (circleSize / 2),
				backgroundColor : '#e6e6fa',
				top : check_height + height,
				left : check_side + node_Count * plus_side
			});
							
			circle_r[i].addEventListener('touchmove', function(e)
			{
				circle[i].setTop(e.y + circleY - (circleSize/2));
				circle[i]1.setLeft(e.x + circleX - (circleSize/2));
            });
                                 
			circle_r[i].addEventListener('touchend', function(e)
            {
                   	circleY = circle[i].getTop();
                   	circleX = circle[i].getLeft();
                    	
                   	circle_r[i].setTop(circle1.getTop());
                   	circle_r[i].setLeft(circle1.getLeft());
             });
                    
			circle[i].addEventListener('touchmove', function(e)
			{
				label.setLeft(e.x);
				label.setTop(e.y);
			});	
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
			
			// 보이는 모든 원을 없앤다.
			for ( i = 0; i < num; i++) {
				circle[i].hide();
				circle_r[i].hide();
			}
		});
		// 현재 윈도우에 속성 추가함
		 mindviewMiddle.add(btnBack);
		 mindviewMiddle.add(useMind);
	
	}
	 mindmap_Win.add(mindviewMiddle);
};