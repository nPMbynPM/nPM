var canvas;
var ctx;
var personArray = new Array();	//작업자 배열
var todoArray = new Array();	//할일 배열
var connArray = new Array();	//작업자-할일 연결정보 배열
var tmpArray = new Array();	//임시 배열
var elementDowned = null;
var elementUp = null;
var elementPopup = null;
var mouseDowned = false;
var canvasCurX = 0;	//캔버스에서의 마우스 좌표
var canvasCurY = 0;
var crossX = 0;	//교점
var crossY = 0;
var isFontBold = false;	//굵은 폰트
var isFontItalic = false;	//이태릭 폰트
var zoomLevel = 4;	//1~8까지의 zoomLevel이 존재, 작을 수록 줌아웃

//프로젝트 ID, 이름
var projectID = "";
var projectName = "";

/**
 * 작업자 클래스
 */
function personClass(x, y, name){
	this.x = x;
	this.y = y;
	this.width = 50;
	this.height = 50;
	this.img = new Image();
	this.img.src = '';
	this.imgLoaded = false;
	this.selected = false;
	this.id = '';	//작업자 ID
	this.email = '';	//작업자 email
	this.font = '12px san-serif';	//폰트
	this.name = name;	//작업자 이름
}

/**
 * 할일 클래스
 */
function todoClass(x, y, todo, start, finish){
	this.x = x;
	this.y = y;
	this.width = 200;
	this.height = 50;
//	this.img = new Image();
//	this.img.src = 'image/todo.png';
	this.color = "#626461";	//색상
	this.isFinished = false;	//완료 여부
	this.selected = false;
	this.font = '12px san-serif';	//폰트
	this.todo = todo;	//할일
	this.start = start;	//시작일자
	this.finish = finish;	//종료일자
}

/**
 * 객체간의 연결정보 클래스
 */
function connClass(from, to){
	this.from = from;
	this.to = to;
}

/**
 * 프로젝트 ID와 이름을 설정한다
 */
function initProject(id, name){
	if(id != -1){
		projectID = Number(id);
		projectName = name;
	}
	
	//안내 문구 숨김
	document.getElementById('notice').style.display = 'none';
	//캔버스에 프로젝트 이름 출력
	document.getElementById('projectName').innerHTML = name;
	//캔버스 전체를 display: block으로 변경
	document.getElementById('canvas').style.display = 'block';
	document.getElementById('properties').style.display = 'block';
	//캔버스에 이벤트 등록
	windowAddEvent();
	drawAll();
}

/**
 * 캔버스에 이벤트를 등록한다.
 */
function canvasAddEvent(){
	canvas = document.getElementById('ctx_canvas');
	ctx = document.getElementById('ctx_canvas').getContext('2d');
	canvas.addEventListener('mousemove', mouseMove, false);
	canvas.addEventListener('mouseup', mouseUp, false);
	canvas.addEventListener('mousedown', mouseDown, false);
}

/**
 * 캔버스에 이벤트를 제거한다
 */
function canvasRemoveEvent(){
	canvas = document.getElementById('ctx_canvas');
	ctx = document.getElementById('ctx_canvas').getContext('2d');
	canvas.removeEventListener('mousemove', mouseMove, false);
	canvas.removeEventListener('mouseup', mouseUp, false);
	canvas.removeEventListener('mousedown', mouseDown, false);
}

/**
 * 마우스 움직임에 관련된 함수
 */
function mouseMove(ev){
	//커서의 위치정보를 가져온다
	var curX = ev.pageX;
	var curY = ev.pageY;
//	canvasCurX = curX - document.getElementById('canvas').offsetLeft - document.getElementById('bound').offsetLeft - document.getElementById('npm_wrapper_right').offsetLeft - document.getElementById('npm_wrapper_left').offsetLeft;
//	canvasCurY = curY - document.getElementById('canvas').offsetTop - document.getElementById('bound').offsetTop - document.getElementById('npm_wrapper_right').offsetTop - document.getElementById('npm_wrapper_left').offsetTop;
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	canvasCurX = curX - rect.left - root.scrollLeft;
	canvasCurY = curY - rect.top - root.scrollTop;

	//선택 기능
	if(toolSelected == 1 && addSelected == -1 && mouseDowned == false){
		if(cursorOnElement(canvasCurX, canvasCurY)){
			document.getElementById('bound').style.cursor = 'move';
		}
		else{
			document.getElementById('bound').style.cursor = 'default';
		}
	}
	//위치 이동
	else if(toolSelected == 1 && addSelected == -1 && mouseDowned == true){
		elementDowned.x = canvasCurX - elementDowned.width/2;
		elementDowned.y = canvasCurY - elementDowned.height/2;
		drawAll();
	}
	/*
	//세부 정보를 팝업 형태로 띄움
	if(elementPopup = cursorOnElement(canvasCurX, canvasCurY)){
		showDetail(getObjectClass(elementPopup));
	}
	//팝업을 없앰
	if(cursorOnElement(canvasCurX, canvasCurY) == null){
		drawAll();
	}
	 */
	//연결모드 일 때 화살표를 그린다
	else if(toolSelected == 2 && addSelected == -1 && mouseDowned == true){
		drawAll();
		var midX = elementDowned.x + elementDowned.width / 2;
		var midY = elementDowned.y + elementDowned.height / 2;
		ctx.strokeStyle = 'rgb(0,0,0)';
		ctx.beginPath();
		ctx.moveTo(midX, midY);
		ctx.lineTo(canvasCurX, canvasCurY);
		ctx.stroke();
		ctx.moveTo(canvasCurX, canvasCurY);
		ctx.arc(canvasCurX, canvasCurY, 5, 0, Math.PI*2, true);
		ctx.fill();
	}
	//폰트 도구, 삭제도구가 선택되었을 때 손모양커서로 변경
	else if((toolSelected == 3 || toolSelected == 4) && addSelected == -1 && mouseDowned == false){
		if(cursorOnElement(canvasCurX, canvasCurY)){
			document.getElementById('bound').style.cursor = 'pointer';
		}
		else{
			document.getElementById('bound').style.cursor = 'default';
		}
	}
}

/**
 * 마우스가 올라갔을 때
 */
function mouseUp(ev){
	//커서의 위치정보를 가져온다
	var curX = ev.pageX;
	var curY = ev.pageY;
//	canvasCurX = curX - document.getElementById('canvas').offsetLeft - document.getElementById('bound').offsetLeft - document.getElementById('npm_wrapper_right').offsetLeft - document.getElementById('npm_wrapper_left').offsetLeft;
//	canvasCurY = curY - document.getElementById('canvas').offsetTop - document.getElementById('bound').offsetTop - document.getElementById('npm_wrapper_right').offsetTop - document.getElementById('npm_wrapper_left').offsetTop;
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	canvasCurX = curX - rect.left - root.scrollLeft;
	canvasCurY = curY - rect.top - root.scrollTop;

	//추가 리스트를 선택한 상태에서 캔버스를 클릭하였을 때
	if(addSelected != -1){
		//사용자 정보 입력 팝업을 띄움
		if(addSelected == 1){
			var personPopup = document.getElementById('personPopup');
			document.getElementById('memberImg').setAttribute("src", '../../../res/image/person8.png');
			document.getElementById('memberInfo').innerHTML = '멤버를 선택해주세요';
//			document.getElementById('personName').value = '';
//			person_down('person1');
			personPopup.style.left = curX - document.getElementById('npm_wrapper_right').offsetLeft + 'px';
			personPopup.style.top = curY - document.getElementById('npm_wrapper_right').offsetTop + 'px';
			personPopup.style.display = 'block';
			canvasRemoveEvent();
//			windowRemoveEvent();
		}
		//할일 정보 입력 팝업을 띄움
		else if(addSelected == 2){
			var todoPopup = document.getElementById('todoPopup');
			document.getElementById('todoTask').value = '';
			document.getElementById('todoStart').value = '';
			document.getElementById('todoClose').value = '';
			todoPopup.style.left = curX - document.getElementById('npm_wrapper_right').offsetLeft + 'px';
			todoPopup.style.top = curY - document.getElementById('npm_wrapper_right').offsetTop + 'px';
			todoPopup.style.display = 'block';
			canvasRemoveEvent();
//			windowRemoveEvent();
		}
		document.getElementById('bound').style.cursor = 'default';
		addSelected = -1;
	}
	//위치 이동 끝냄
	else if(addSelected == -1 && toolSelected == 1 && mouseDowned == true){
//		elementDowned = null;
		mouseDowned = false;
	}
	//연결모드 끝냄
	else if(addSelected == -1 && toolSelected == 2 && mouseDowned == true){
		mouseDowned = false;
		ctx.closePath();
		var dupFlag = false;
		if(elementUp = cursorOnElement(canvasCurX, canvasCurY)){
			//자기 자신을 연결하려 하지 않는다면 if문 동작
			if(elementDowned.x != elementUp.x){
				//이미 연결된 것을 중복으로 연결하였는지 검사
				for(var i = 0; i < connArray.length; i++){
					if((elementDowned.x == connArray[i].from.x && elementUp.x == connArray[i].to.x)
							&& (elementDowned.y == connArray[i].from.y && elementUp.y == connArray[i].to.y)){
						dupFlag = true;
						break;
					}
				}
				if(!dupFlag){
					//todo -> todo
					if(getObjectClass(elementDowned) == 'todoClass' && getObjectClass(elementUp) == 'todoClass'){
						var conn = new connClass(elementDowned, elementUp);
						connArray.push(conn);
					}
					//person -> todo
					if(getObjectClass(elementDowned) == 'personClass' && getObjectClass(elementUp) == 'todoClass'){
						var conn = new connClass(elementDowned, elementUp);
						connArray.push(conn);
					}
				}
			}
		}
	}
	//폰트 변경 팝업 띄움
	else if(addSelected == -1 && toolSelected == 3 && mouseDowned == false){
		if(elementUp = cursorOnElement(canvasCurX, canvasCurY)){
			var fontPopup = document.getElementById('fontPopup');
			var comboBox = document.getElementById('fontSize');
			//폰트 스타일 버튼 초기화
			isFontBold = false;
			isFontItalic = false;
			document.getElementById('fontBold').style.background = '#ffffff';
			document.getElementById('fontItalic').style.background = '#ffffff';
			//객체에 해당하는 폰트 스타일을 추출하여 세팅
			var fontStr = elementUp.font;
			var bold = fontStr.match("bold");
			var italic = fontStr.match("italic");
			var fontSize = Number(fontStr.substring(fontStr.indexOf("px")-3, fontStr.indexOf("px")));
			if(bold){
				document.getElementById('fontBold').style.background = '#F0CB85';
				isFontBold = true;
			}
			if(italic){
				document.getElementById('fontItalic').style.background = '#F0CB85';
				isFontItalic = true;
			}
			switch(fontSize){
			case 10:
				comboBox[0].selected = true;
				break;
			case 12:
				comboBox[1].selected = true;
				break;
			case 14:
				comboBox[2].selected = true;
				break;
			case 16:
				comboBox[3].selected = true;
				break;
			case 18:
				comboBox[4].selected = true;
				break;
			case 20:
				comboBox[5].selected = true;
				break;
			}
			//팝업을 띄움
			fontPopup.style.left = curX + 'px';
			fontPopup.style.top = curY + 'px';
			fontPopup.style.display = 'block';
			//캔버스의 이벤트 제거
			canvasRemoveEvent();
		}
	}
	//객체 삭제
	else if(addSelected == -1 && toolSelected == 4 && mouseDowned == false){
		//객체 삭제 코드
		if(elementUp = cursorOnElement(canvasCurX, canvasCurY)){
			var deletePopup = document.getElementById('deletePopup');
			
			//팝업을 띄움
			deletePopup.style.left = curX + 'px';
			deletePopup.style.top = curY + 'px';
			deletePopup.style.display = 'block';
			//캔버스의 이벤트 제거
			canvasRemoveEvent();
		}
	}
	drawAll();
}

/**
 * 마우스가 눌렸을 때
 */
function mouseDown(ev){
	//커서의 위치정보를 가져온다
	var curX = ev.pageX;
	var curY = ev.pageY;
//	canvasCurX = curX - document.getElementById('canvas').offsetLeft - document.getElementById('bound').offsetLeft - document.getElementById('npm_wrapper_right').offsetLeft - document.getElementById('npm_wrapper_left').offsetLeft;
//	canvasCurY = curY - document.getElementById('canvas').offsetTop - document.getElementById('bound').offsetTop - document.getElementById('npm_wrapper_right').offsetTop - document.getElementById('npm_wrapper_left').offsetTop;
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	canvasCurX = curX - rect.left - root.scrollLeft;
	canvasCurY = curY - rect.top - root.scrollTop;
	
	//선택모드 일 때
	if(addSelected == -1 && toolSelected == 1 && mouseDowned == false){
		for(var i = 0; i < personArray.length; i++)
			personArray[i].selected = false;
		for(var i = 0; i < todoArray.length; i++)
			todoArray[i].selected = false;
		if(elementDowned = cursorOnElement(canvasCurX, canvasCurY)){
			elementDowned.selected = true;
			mouseDowned = true;
		}
	}
	//연결모드 일 때
	if(addSelected == -1 && toolSelected == 2 && mouseDowned == false){
		if(elementDowned = cursorOnElement(canvasCurX, canvasCurY)){
			mouseDowned = true;
		}
	}
}

/**
 * personArray, todoArray에 있는 정보를 읽어서 캔버스에 그린다
 */
function drawAll(){
	ctx.clearRect(0, 0, document.getElementById('ctx_canvas').width, document.getElementById('ctx_canvas').height);
	//연결 화살표 그리기
	for(var i = 0; i < connArray.length; i++){
		var ax1 = connArray[i].from.x+connArray[i].from.width/2; 
		var ay1 = connArray[i].from.y+connArray[i].from.height/2;
		var ax2 = connArray[i].to.x+connArray[i].to.width/2;
		var ay2 = connArray[i].to.y+connArray[i].to.height/2;
		//왼쪽 선분
		var bx1_1 = connArray[i].to.x;
		var by1_1 = connArray[i].to.y;
		var bx2_1 = connArray[i].to.x;
		var by2_1 = connArray[i].to.y+connArray[i].to.height;
		//위쪽 선분
		var bx1_2 = connArray[i].to.x;
		var by1_2 = connArray[i].to.y;
		var bx2_2 = connArray[i].to.x+connArray[i].to.width;
		var by2_2 = connArray[i].to.y;
		//오른쪽 선분
		var bx1_3 = connArray[i].to.x+connArray[i].to.width;
		var by1_3 = connArray[i].to.y;
		var bx2_3 = connArray[i].to.x+connArray[i].to.width;
		var by2_3 = connArray[i].to.y+connArray[i].to.height;
		//아래쪽 선분
		var bx1_4 = connArray[i].to.x;
		var by1_4 = connArray[i].to.y+connArray[i].to.height;
		var bx2_4 = connArray[i].to.x+connArray[i].to.width;
		var by2_4 = connArray[i].to.y+connArray[i].to.height;
		//교점을 구한다
		getCrossPoint(ax1, ay1, ax2, ay2, bx1_1, by1_1, bx2_1, by2_1);
		getCrossPoint(ax1, ay1, ax2, ay2, bx1_2, by1_2, bx2_2, by2_2);
		getCrossPoint(ax1, ay1, ax2, ay2, bx1_3, by1_3, bx2_3, by2_3);
		getCrossPoint(ax1, ay1, ax2, ay2, bx1_4, by1_4, bx2_4, by2_4);
		//화살표를 그린다
		ctx.strokeStyle = 'rgb(0,0,0)';
		ctx.beginPath();
		ctx.moveTo(ax1, ay1);
		ctx.lineTo(crossX, crossY);
		ctx.stroke();
		ctx.moveTo(crossX, crossY);
		ctx.arc(crossX, crossY, 5, 0, Math.PI*2, true);
		ctx.fill();
		ctx.closePath();

	}
	//작업자 그리기
	document.getElementById('personProperties_name').value = '';
	for(var i = 0; i < personArray.length; i++){
		var midX = personArray[i].x + (personArray[i].width/2);
//		var midY = personArray[i].y + (personArray[i].height/2);
		if(personArray[i].selected == true){
			ctx.strokeStyle = 'rgb(0,0,0)';
			//테두리
			ctx.beginPath();
			ctx.moveTo(personArray[i].x, personArray[i].y);
			ctx.lineTo(personArray[i].x + personArray[i].width, personArray[i].y);
			ctx.lineTo(personArray[i].x + personArray[i].width, personArray[i].y + personArray[i].height);
			ctx.lineTo(personArray[i].x, personArray[i].y + personArray[i].height);
			ctx.lineTo(personArray[i].x, personArray[i].y);
			ctx.stroke();
			ctx.closePath();
			//작업자 정보 창에 작업자 정보 표시
			document.getElementById('personProperties_name').value = personArray[i].name;
		}
		//사용자 이미지를 캔버스에 그린다
		if(personArray[i].imgLoaded == false){
			loadImage(personArray[i], personArray[i].img.src, personArray[i].x, personArray[i].y, personArray[i].width, personArray[i].height, function(image, x, y, width, height){
				ctx.drawImage(image, x, y, width, height);
			});
		}
		else	ctx.drawImage(personArray[i].img, personArray[i].x, personArray[i].y, personArray[i].width, personArray[i].height);
		//사용자 이름을 캔버스에 그린다
		var metrics = ctx.measureText(personArray[i].name);
		var fontWidth = metrics.width;
		var fontMidX = fontWidth / 2;
		ctx.font = personArray[i].font;
		ctx.fillText(personArray[i].name, midX - fontMidX, personArray[i].y + personArray[i].height + 15);
	}
	//할일 그리기
	document.getElementById('todoProperties_todo').value = '';
	document.getElementById('todoProperties_start').value = '';
	document.getElementById('todoProperties_finish').value = '';
	document.getElementById('todoProperties_who').innerHTML = '';
	document.getElementById('colorSelect').value = 'FFFFFF';
	document.getElementById('colorSelect').style.backgroundColor = '#FFFFFF';
	
	for(var i = 0; i < document.getElementsByName('finishRadio').length; i++){
		document.getElementsByName('finishRadio')[i].checked = false;
	}
	for(var i = 0; i < todoArray.length; i++){
//		var midX = todoArray[i].x + (todoArray[i].width/2);
		var midY = todoArray[i].y + (todoArray[i].height/2);
		if(todoArray[i].selected == true){
			ctx.strokeStyle = 'rgb(0,0,0)';
			//테두리
			ctx.beginPath();
			ctx.moveTo(todoArray[i].x, todoArray[i].y);
			ctx.lineTo(todoArray[i].x + todoArray[i].width, todoArray[i].y);
			ctx.lineTo(todoArray[i].x + todoArray[i].width, todoArray[i].y + todoArray[i].height);
			ctx.lineTo(todoArray[i].x, todoArray[i].y + todoArray[i].height);
			ctx.lineTo(todoArray[i].x, todoArray[i].y);
			ctx.stroke();
			ctx.closePath();
			/*
			//크기 변경을 위한 사각형
			ctx.fillStyle = 'rgb(0,0,0)';
			ctx.fillRect(midX-3, todoArray[i].y-6, 6, 6);
			ctx.fillRect(todoArray[i].x + todoArray[i].width, midY-3, 6, 6);
			ctx.fillRect(midX-3, todoArray[i].y + todoArray[i].height, 6, 6);
			ctx.fillRect(todoArray[i].x-6, midY-3, 6, 6);
			 */
			//할일 정보 창에 할일 정보를 출력한다
			document.getElementById('todoProperties_todo').value = todoArray[i].todo;
			document.getElementById('todoProperties_start').value = todoArray[i].start;
			document.getElementById('todoProperties_finish').value = todoArray[i].finish;
			tmpArray = new Array();
			var printArr = new Array();
			getConnInform(todoArray[i]);
			var str = '';
			for(var j = 0; j < tmpArray.length; j++){
				printArr.push(tmpArray[j].name + '</br>');
			}
			printArr.sort();
			for(var j = 0; j < printArr.length; j++){
				str += printArr[j].replace(',', '');
			}
			document.getElementById('todoProperties_who').innerHTML = str;
			
			//색상 정보
			var currentColor = todoArray[i].color;
			document.getElementById('colorSelect').style.backgroundColor = currentColor;
			currentColor = currentColor.replace('#','');
			document.getElementById('colorSelect').value = currentColor;
			
			//완료여부 정보
			if(todoArray[i].isFinished){
				document.getElementById('finishYes').checked = true;
			}
			else{
				document.getElementById('finishNo').checked = true;
			}
		}
		//할 일 이미지를 캔버스에 그린다
		drawTodo(todoArray[i]);
		//해야할 일을 캔버스에 그린다
		ctx.font = todoArray[i].font;
		var metrics = ctx.measureText(todoArray[i].todo);
		var todoWidth = todoArray[i].width - 25;
		var fontWidth = metrics.width;
		if(fontWidth > todoWidth){
			ctx.fillText(resizeString(todoWidth, todoArray[i].todo), todoArray[i].x+15, midY + 6);
		}
		else{
			ctx.fillText(todoArray[i].todo, todoArray[i].x+15, midY + 6);
		}
	}
}

/**
 * 마우스 커서가 객체 위에 있는지 검사하는 함수
 */
function cursorOnElement(curX, curY){
	for(var i = 0; i < personArray.length; i++){
		if((personArray[i].x < curX && curX < personArray[i].x+personArray[i].width)
				&& (personArray[i].y < curY && curY < personArray[i].y+personArray[i].height)){
			return personArray[i];
		}
	}
	for(var i = 0; i < todoArray.length; i++){
		if((todoArray[i].x < curX && curX < todoArray[i].x+todoArray[i].width)
				&& (todoArray[i].y < curY && curY < todoArray[i].y+todoArray[i].height)){
			return todoArray[i];
		}
	}
	return null;
}

/**
 * 팝업창에서 확인 버튼이 눌렸을 때 호출되는 함수
 */
function okButton_down(popupId){
	//작업자 추가
	if(popupId == 'personPopup'){
		var personFlag = false;
		var personPopup = document.getElementById(popupId);
		var name = memberName;
		var add = new personClass(canvasCurX, canvasCurY, String(name));
		add.img.src = memberPhoto;
		add.id = memberID;
		add.email = String(memberEmail);
		add.width += (zoomLevel - 4) * 10;
		add.height += (zoomLevel - 4) * 10;
		personPopup.style.display = 'none';
		//이미 등록된 작업자인지 아닌지 검사한다
		for(var i = 0; i < personArray.length; i++){
			if(personArray[i].id == memberID){
				personFlag = true;
			}
		}
		if(personFlag == true){
			alert('이미 등록된 작업자 입니다');
		}
		else{
			//작업자 배열에 추가
			personArray.push(add);
		}
		//작업자 변수 초기화
		memberID = "";
		memberName = "";
		memberEmail = "";
		memberPhoto = "";
	}
	//할 일 추가
	if(popupId == 'todoPopup'){
		var todoPopup = document.getElementById(popupId);
		var task = document.getElementById('todoTask').value;
		var start = document.getElementById('todoStart').value;
		var finish = document.getElementById('todoClose').value;
		var add = new todoClass(canvasCurX, canvasCurY, String(task), String(start), String(finish));
		add.width += (zoomLevel - 4) * 10;
		add.height += (zoomLevel - 4) * 10;
		todoArray.push(add);
		todoPopup.style.display = 'none';
	}
	//폰트 변경
	if(popupId == 'fontPopup'){
		var fontPopup = document.getElementById('fontPopup');
		var comboBox = document.getElementById('fontSize');
		var fontSize = 0;
		var bold = '';
		var italic = '';
		for(var i = 0; i < comboBox.length; i++){
			if(comboBox[i].selected){
				switch(i){
				case 0:
					fontSize = 10;
					break;
				case 1:
					fontSize = 12;
					break;
				case 2:
					fontSize = 14;
					break;
				case 3:
					fontSize = 16;
					break;
				case 4:
					fontSize = 18;
					break;
				case 5:
					fontSize = 20;
					break;
				}
				fontSize += 'px';
				break;
			}
		}
		if(isFontBold){
			bold = 'bold';
		}
		if(isFontItalic){
			italic = 'italic';
		}
		elementUp.font = bold + ' ' + italic + ' ' + fontSize + ' ' + 'san-serif';
		fontPopup.style.display = 'none';
	}
	//객체 삭제
	if(popupId == 'deletePopup'){
		var deletePopup = document.getElementById('deletePopup');
		//선택된 객체와 같은 것을 검색하여 삭제
		for(var i = 0; i < personArray.length; i++){
			if(personArray[i] == elementUp){
//				console.log('personArray-------');
//				console.log(personArray[i]);
				personArray.splice(i,1);
				break;
			}
		}
		for(var i = 0; i < todoArray.length; i++){
			if(todoArray[i] == elementUp){
//				console.log('todoArray-------');
//				console.log(todoArray[i]);
				todoArray.splice(i,1);
				break;
			}
		}
		for(var i = connArray.length - 1; i >= 0; i--){
			if(connArray[i].from == elementUp || connArray[i].to == elementUp){
//				console.log('connArray-------');
//				console.log(connArray[i]);
				connArray.splice(i,1);
			}
		}
		
		//팝업을 닫음
		deletePopup.style.display = 'none';
	}
	canvasAddEvent();
//	windowAddEvent();
	drawAll();
}

/**
 * 팝업창에서 취소 버튼이 눌렸을 때 호출되는 함수
 */
function cancelButton_down(popupId){
	document.getElementById(popupId).style.display = 'none';
	canvasAddEvent();
//	windowAddEvent();
}

/**
 * 클래스의 이름을 리턴해주는 함수
 */
function getObjectClass(obj) {
	if (obj && obj.constructor && obj.constructor.toString) {
		var arr = obj.constructor.toString().match(
				/function\s*(\w+)/);

		if (arr && arr.length == 2) {
			return arr[1];
		}
	}
	return undefined;
}

/**
 * element에 마우스를 올리면 세부설명이 팝업되는 함수
 */
/*
function showDetail(className){
	if(className == 'todoClass'){
		var popupImgLeft = new Image();
		var popupImgRight = new Image();
		popupImgLeft.src = 'image/popup_left.png';
		popupImgRight.src = 'image/popup_right.png';
		var metrics = ctx.measureText('시작일자: '+elementPopup.start);
		var fontWidth = metrics.width;
		//왼쪽 괄호
		popupImgLeft.onload = function(){
			ctx.drawImage(popupImgLeft, elementPopup.x, elementPopup.y - popupImgLeft.height, popupImgLeft.width, popupImgLeft.height);
			//괄호안의 글자
			ctx.font = '12px san-serif';
			ctx.fillText('시작일자: '+elementPopup.start, elementPopup.x + popupImgLeft.width, elementPopup.y - 24);
			ctx.fillText('종료일자: '+elementPopup.finish, elementPopup.x + popupImgLeft.width, elementPopup.y - 12);
			//오른쪽 괄호
			popupImgRight.onload = function(){
				ctx.drawImage(popupImgRight, elementPopup.x  + popupImgLeft.width + fontWidth, elementPopup.y - popupImgRight.height, popupImgRight.width, popupImgRight.height);
			};
		};
	}
}
 */

/**
 * 문자열이 너무 길 때 크기에 맞도록 적당히 자르는 함수
 */
function resizeString(elementWidth, str){
	var strLen = str.length;
	elementWidth -= 10;
	while(1){
		var subStr = str.substring(0,strLen);
		var subMetrics = ctx.measureText(subStr);
		var subWidth = subMetrics.width;
		if(elementWidth < subWidth)	strLen--;
		else{
			return subStr + '...';
		}
	}
}

/**
 * 두 선분의 교점을 구하는 함수
 */
function getCrossPoint(ax1, ay1, ax2, ay2, bx1, by1, bx2, by2){
	var t, s;
	var under = (by2-by1)*(ax2-ax1)-(bx2-bx1)*(ay2-ay1);
	if(under == 0)	return false;

	var _t = (bx2-bx1)*(ay1-by1)-(by2-by1)*(ax1-bx1);
	var _s = (ax2-ax1)*(ay1-by1)-(ay2-ay1)*(ax1-bx1);

	t = _t/under;
	s = _s/under;

	if(t<0.0 || t>1.0 || s<0.0 || s>1.0)	return false;
	if(_t==0 && _s==0)	return false;

	crossX = ax1+t*(ax2-ax1);
	crossY = ay1+t*(ay2-ay1);

	return true;
}

/**
 * 객체 사이의 연결관계를 계산해주는 함수
 */
function getConnInform(param){
	for(var j = 0; j < connArray.length; j++){
		if(connArray[j].to.x == param.x && connArray[j].to.y == param.y){
			if(getObjectClass(connArray[j].from) == 'personClass'){
				var dupFlag = false;
				for(var k = 0; k < tmpArray.length; k++){
					if(tmpArray[k].x == connArray[j].from.x && tmpArray[k].y == connArray[j].from.y){
						dupFlag = true;
					}
				}
				if(dupFlag == false){
					tmpArray.push(connArray[j].from);
				}
			}
			if(getObjectClass(connArray[j].from) == 'todoClass'){
				getConnInform(connArray[j].from);
			}
		}
	}
}

/**
 * 할 일 이미지를 캔버스에 그리는 함수
 */
function drawTodo(todo){
	var radius = 5;
	var x = todo.x + 5;
	var y = todo.y + 5;
	var r = x + todo.width - 10;
	var b = y + todo.height - 10;

	ctx.beginPath();
	ctx.strokeStyle = todo.color;
	ctx.lineWidth="1";
	ctx.moveTo(x+radius, y);
	ctx.lineTo(r-radius, y);
	ctx.quadraticCurveTo(r, y, r, y+radius);
	ctx.lineTo(r, b-radius);
	ctx.quadraticCurveTo(r, b, r-radius, b);
	ctx.lineTo(x+radius, b);
	ctx.quadraticCurveTo(x, b, x, b-radius);
	ctx.lineTo(x, y+radius);
	ctx.quadraticCurveTo(x, y, x+radius, y);
	ctx.stroke();
}

/**
 * 모든 정보를 모두 초기화
 */
function clearAll(){
	personArray = new Array();	//작업자 배열
	todoArray = new Array();	//할일 배열
	connArray = new Array();	//작업자-할일 연결정보 배열
	tmpArray = new Array();
	elementDowned = null;
	elementUp = null;
	elementPopup = null;
	mouseDowned = false;
	canvasCurX = 0;	//캔버스에서의 마우스 좌표
	canvasCurY = 0;
	crossX = 0;	//교점
	crossY = 0;
	isFontBold = false;	//굵은 폰트
	isFontItalic = false;	//이태릭 폰트
	zoomLevel = 4;	//줌 레벨
}

/**
 * 캔버스에 이미지를 출력하는 재귀함수
 * @param sources
 * @param callback
 */
function loadImage(elem, src, x, y, width, height, callback) {
	elem.imgLoaded = true;
	var image;

	image = new Image();
	image.onload = function() {
			callback(image, x, y, width, height);
	};
	image.src = src;
}

/**
 * 캔버스 줌인
 */
function zoomIn(){
	if(zoomLevel + 1 < 9){
		zoomLevel++;
		//줌
		for(var i = 0; i < personArray.length; i++){
			personArray[i].width += 10;
			personArray[i].height += 10;
		}
		for(var i = 0; i < todoArray.length; i++){
			todoArray[i].width += 10;
			todoArray[i].height += 10;
		}
		drawAll();
	}
}

/**
 * 캔버스 줌아웃
 */
function zoomOut(){
	if(zoomLevel - 1 > 0){
		zoomLevel--;
		//줌
		for(var i = 0; i < personArray.length; i++){
			personArray[i].width -= 10;
			personArray[i].height -= 10;
		}
		for(var i = 0; i < todoArray.length; i++){
			todoArray[i].width -= 10;
			todoArray[i].height -= 10;
		}
		drawAll();
	}	
}