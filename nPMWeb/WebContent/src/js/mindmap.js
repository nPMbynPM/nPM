var isPopupedRoot = false;
var isPopupedChild = false;
var isModified = false;
var popupRootStatus = null;
var popupChildStatus = new Array();
var makeNodeFlag = '';

var canvas = null;
var canvasWidth = 1280;
var canvasHeight = 1024;

var timer = 0;

var mouseDowned = false;
var mouseUped = false;
var elementDowned = null;
var elementDownedX = null;
var elementDownedY = null;
var elementUped = null;
var elementModify = null;
var crossX = 0;
var crossY = 0;

var nodeArray = new Array();
var treeArray = new Array();

window.onload = function(){
	canvas = document.getElementById('mindmap_canvas');
	context = document.getElementById('mindmap_canvas').getContext('2d');
	addEvent();
	loadData();
	setInterval("tellTheClock()", 1000);
};

function addEvent(){
	canvas.addEventListener('mousemove', mouseMove, false);
	canvas.addEventListener('mouseup', mouseUp, false);
	canvas.addEventListener('mousedown', mouseDown, false);
	canvas.addEventListener('onkeydown', keyDown, false);
}

/**
 * 루트 노드 클래스
 */
function rootClass(){
	this.number = 0;
	this.x = 0;
	this.y = 0;
	this.width = 200;
	this.height = 80;
	this.cornerRadius = 3;
	this.stroke = '#dfddb5';
	this.strokeWidth = 2;
	this.fill = '#f5f3b4';
	this.fontSize = '13px';
	this.text = '루트 노드임';
	this.align = 'center';
	this.textFill = '#444444';
	this.padding = 10;
}

/**
 * 자식 노드 클래스
 */
function childClass(){
	this.number = 0;
	this.x = 0;
	this.y = 0;
	this.width = 150;
//	this.height = 80;
	this.cornerRadius = 3;
	this.strokeWidth = 1;
	this.stroke = '#51a0b3';
	this.fill = '#66c7e5';
	this.fontSize = '12px';
	this.text = '자식 노드임';
	this.align = 'center';
	this.textFill = '#FFFFFF';
	this.padding = 10;
}

/**
 * 노드간의 연결정보를 담는 클래스
 */
function connClass(parent, me){
	this.parent = parent;
	this.me = me;
}

/**
 * 루트 팝업
 * @returns
 */
function rootPopupClass(x, y, width, height){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
}

/**
 * 자식 팝업
 */
function childPopupClass(x, y, width, height){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
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
 * key Down
 */
function keyDown(){
	timer = 0;
}

/**
 * mouseMove
 */
function mouseMove(ev){
	//타이머 초기화
	timer = 0;
	
	var curX = ev.pageX;
	var curY = ev.pageY;
	canvasCurX = curX - document.getElementById('wrapper_left').offsetLeft + document.getElementById('wrapper_left').scrollLeft;
	canvasCurY = curY - document.getElementById('wrapper_left').offsetTop + document.getElementById('wrapper_left').scrollTop;

	canvas.style.cursor = 'default';

	if(isPopupedRoot){
		if((canvasCurX > popupRootStatus.x && canvasCurX < popupRootStatus.x + popupRootStatus.width)
				&& (canvasCurY > popupRootStatus.y && canvasCurY < popupRootStatus.y + popupRootStatus.height)){
			canvas.style.cursor = 'pointer';
		}
	}
	else if(mouseDowned == true && elementDowned != null){
		elementDowned.x = canvasCurX - elementDowned.width/2;
		elementDowned.y = canvasCurY - elementDowned.height/2;
		drawAll();
	}
	else if(cursorOnElement(canvasCurX, canvasCurY) != null){
		canvas.style.cursor = 'pointer';
	}
}

/**
 * mouseUp
 */
function mouseUp(ev){
	var curX = ev.pageX;
	var curY = ev.pageY;
	canvasCurX = curX - document.getElementById('wrapper_left').offsetLeft + document.getElementById('wrapper_left').scrollLeft;
	canvasCurY = curY - document.getElementById('wrapper_left').offsetTop + document.getElementById('wrapper_left').scrollTop;

	if(isPopupedRoot){
		if((canvasCurX > popupRootStatus.x && canvasCurX < popupRootStatus.x + popupRootStatus.width)
				&& (canvasCurY > popupRootStatus.y && canvasCurY < popupRootStatus.y + popupRootStatus.height)){
			makeNodeFlag = 'root';
			makeNodeForm(canvasCurX, canvasCurY);
		}
		else{
			isPopupedRoot = false;
			drawAll();
		}
	}
	else if(isPopupedChild){
		//자식노드 추가
		if((canvasCurX > popupChildStatus[0].x && canvasCurX < popupChildStatus[0].x + popupChildStatus[0].width)
				&& (canvasCurY > popupChildStatus[0].y && canvasCurY < popupChildStatus[0].y + popupChildStatus[0].height)){
			makeNodeFlag = 'child';
			makeNodeForm(canvasCurX, canvasCurY);
		}
		//수정하기
		else if((canvasCurX > popupChildStatus[1].x && canvasCurX < popupChildStatus[1].x + popupChildStatus[1].width)
				&& (canvasCurY > popupChildStatus[1].y && canvasCurY < popupChildStatus[1].y + popupChildStatus[1].height)){
			modifyNode(canvasCurX, canvasCurY);
		}
		//텍스트로 내보내기
		else if((canvasCurX > popupChildStatus[2].x && canvasCurX < popupChildStatus[2].x + popupChildStatus[2].width)
				&& (canvasCurY > popupChildStatus[2].y && canvasCurY < popupChildStatus[2].y + popupChildStatus[2].height)){
			isPopupedChild = false;
			treeArray = new Array();
			treeArray.push(elementUped.text + '\r\n');
			exportToText(elementUped, 1);
			var str = '';
			for(var i = 0; i < treeArray.length; i++){
				str += treeArray[i];
			}
			drawAll();
			document.getElementById('export_text').style.display = 'block';
			document.getElementById('export_text_area').value = str;
		}
		else{
			isPopupedChild = false;
			drawAll();
		}
	}
	else if(mouseDowned == false && elementDowned == null){
		makeRootPopup();
	}
	else if(mouseDowned == true){
		elementUped = cursorOnElement(canvasCurX, canvasCurY);
		if(elementDownedX == elementUped.x && elementDownedY == elementUped.y){
			makeChildPopup();
		}
		else{
			drawAll();
		}
	}
	//DB에 노드 이동 정보 전송
	saveData(elementDowned);
	mouseDowned = false;
}

/**
 * mouseDown
 */
function mouseDown(ev){
	var curX = ev.pageX;
	var curY = ev.pageY;
	canvasCurX = curX - document.getElementById('wrapper_left').offsetLeft + document.getElementById('wrapper_left').scrollLeft;
	canvasCurY = curY - document.getElementById('wrapper_left').offsetTop + document.getElementById('wrapper_left').scrollTop;

	elementDowned = null;
	elementDowned = cursorOnElement(canvasCurX, canvasCurY);
	if(elementDowned != null){
		mouseDowned = true;
		elementDownedX = elementDowned.x;
		elementDownedY = elementDowned.y;
	}
}

/**
 * 루트노드 팝업을 띄움
 */
function makeRootPopup() {
	if (isPopupedRoot)
		isPopupedRoot = false;
	else
		isPopupedRoot = true;

	if (isPopupedRoot) {
		drawRootPopup(canvasCurX, canvasCurY);
	} else {
		drawAll();
	}
}

/**
 * 루트팝업 그리는 함수
 */
function drawRootPopup(x, y){
	var maxWidth = 110;
	var lineHeight = 20;
	var height = 30;
	var text = "루트노드 만들기";

	var radius = 5;
	var r = x + maxWidth;
	var b = y + height;

	context.beginPath();
	context.fillStyle = '#f0f0f0';
	context.strokeStyle = '#cacaca';
	context.lineWidth="1";
	context.moveTo(x+radius, y);
	context.lineTo(r-radius, y);
	context.quadraticCurveTo(r, y, r, y+radius);
	context.lineTo(r, b-radius);
	context.quadraticCurveTo(r, b, r-radius, b);
	context.lineTo(x+radius, b);
	context.quadraticCurveTo(x, b, x, b-radius);
	context.lineTo(x, y+radius);
	context.quadraticCurveTo(x, y, x+radius, y);
	context.fill();
	context.stroke();

	context.font = "12px Calibri";
	context.fillStyle = "#444";

	wrapText(context, text, x, y, maxWidth, lineHeight);

	popupRootStatus = new rootPopupClass(x, y, maxWidth, height);
}

/**
 * 텍스트 너비에 맞도록 자동 조절하여 출력
 * @param context
 * @param text
 * @param x
 * @param y
 * @param maxWidth
 * @param lineHeight
 */
function wrapText(context, text, x, y, maxWidth, lineHeight) {
	var words = text.split(" ");
	var line = "";
	var height = lineHeight;
	var x = x + (maxWidth/2);
	var y = y + lineHeight;

	context.textAlign = 'center';

	for(var n = 0; n < words.length; n++) {
		var testLine = line + words[n] + " ";
		var metrics = context.measureText(testLine);
		var testWidth = metrics.width;
		if(testWidth > maxWidth) {
			context.fillText(line, x, y);
			line = words[n] + " ";
			y += lineHeight;
			height += lineHeight;
		}
		else {
			line = testLine;
		}
	}
	context.fillText(line, x, y);
	return height;
}

/**
 * 캔버스 새로고침
 */
function drawAll(){
	context.clearRect(0, 0, canvasWidth, canvasHeight);
	//연결 화살표 그리기
	for(var i = 0; i < nodeArray.length; i++){
		if(nodeArray[i].parent != null){
			var ax1 = nodeArray[i].parent.x+nodeArray[i].parent.width/2; 
			var ay1 = nodeArray[i].parent.y+nodeArray[i].parent.height/2;
			var ax2 = nodeArray[i].me.x+nodeArray[i].me.width/2;
			var ay2 = nodeArray[i].me.y+nodeArray[i].me.height/2;
			//왼쪽 선분
			var bx1_1 = nodeArray[i].me.x;
			var by1_1 = nodeArray[i].me.y;
			var bx2_1 = nodeArray[i].me.x;
			var by2_1 = nodeArray[i].me.y+nodeArray[i].me.height;
			//위쪽 선분
			var bx1_2 = nodeArray[i].me.x;
			var by1_2 = nodeArray[i].me.y;
			var bx2_2 = nodeArray[i].me.x+nodeArray[i].me.width;
			var by2_2 = nodeArray[i].me.y;
			//오른쪽 선분
			var bx1_3 = nodeArray[i].me.x+nodeArray[i].me.width;
			var by1_3 = nodeArray[i].me.y;
			var bx2_3 = nodeArray[i].me.x+nodeArray[i].me.width;
			var by2_3 = nodeArray[i].me.y+nodeArray[i].me.height;
			//아래쪽 선분
			var bx1_4 = nodeArray[i].me.x;
			var by1_4 = nodeArray[i].me.y+nodeArray[i].me.height;
			var bx2_4 = nodeArray[i].me.x+nodeArray[i].me.width;
			var by2_4 = nodeArray[i].me.y+nodeArray[i].me.height;
			//교점을 구한다
			getCrossPoint(ax1, ay1, ax2, ay2, bx1_1, by1_1, bx2_1, by2_1);
			getCrossPoint(ax1, ay1, ax2, ay2, bx1_2, by1_2, bx2_2, by2_2);
			getCrossPoint(ax1, ay1, ax2, ay2, bx1_3, by1_3, bx2_3, by2_3);
			getCrossPoint(ax1, ay1, ax2, ay2, bx1_4, by1_4, bx2_4, by2_4);
			//화살표를 그린다
			context.strokeStyle = '#444444';
			context.lineWidth = 1;
			context.beginPath();
			context.moveTo(ax1, ay1);
			context.lineTo(crossX, crossY);
			context.stroke();
//			context.moveTo(crossX, crossY);
//			context.arc(crossX, crossY, 5, 0, Math.PI*2, true);
//			context.fill();
			context.closePath();
		}
	}
	//노드 그리기
	for(var i = 0; i < nodeArray.length; i++){
		var maxWidth = nodeArray[i].me.width;
		var lineHeight = 20;
		var text = nodeArray[i].me.text;
		var height = nodeArray[i].me.height;

		var radius = nodeArray[i].me.cornerRadius;
		var r = nodeArray[i].me.x + maxWidth;
		var b = nodeArray[i].me.y + height;

		context.beginPath();
		context.fillStyle = nodeArray[i].me.fill;
		context.strokeStyle = nodeArray[i].me.stroke;
		context.lineWidth = nodeArray[i].me.strokeWidth;
		context.moveTo(nodeArray[i].me.x+radius, nodeArray[i].me.y);
		context.lineTo(r-radius, nodeArray[i].me.y);
		context.quadraticCurveTo(r, nodeArray[i].me.y, r, nodeArray[i].me.y+radius);
		context.lineTo(r, b-radius);
		context.quadraticCurveTo(r, b, r-radius, b);
		context.lineTo(nodeArray[i].me.x+radius, b);
		context.quadraticCurveTo(nodeArray[i].me.x, b, nodeArray[i].me.x, b-radius);
		context.lineTo(nodeArray[i].me.x, nodeArray[i].me.y+radius);
		context.quadraticCurveTo(nodeArray[i].me.x, nodeArray[i].me.y, nodeArray[i].me.x+radius, nodeArray[i].me.y);
		context.fill();
		context.stroke();
		context.closePath();

		context.font = nodeArray[i].me.fontSize + ' Calibri';
		context.fillStyle = nodeArray[i].me.textFill;

		wrapText(context, text, nodeArray[i].me.x, nodeArray[i].me.y, maxWidth, lineHeight);
	}
}

/**
 * 노드 생성 입력 폼
 * @param x
 * @param y
 */
function makeNodeForm(x, y){
	isPopupedRoot = false;
	isPopupedChild = false;
	
	drawAll();
	
	//캔버스에 input 태그 보이게 함
	var node = document.getElementById('make_div');
	var text =  document.getElementById('make_node');
	
	text.value = '';
	
	node.style.left = x + 'px';
	node.style.top = y + 'px';
	node.style.width = 200 + 'px';
	node.style.height = 30 + 'px';
	node.style.display = 'block';
	
	text.style.left = x + 'px';
	text.style.top = y + 'px';
	text.style.width = 200 + 'px';
	text.style.height = 30 + 'px';
	
	text.focus();
}

/**
 * 노드 생성 확인
 */
function makeNodeOk(){
	var node = document.getElementById('make_div');
	node.style.display = 'none';
	if(makeNodeFlag == 'root'){
		makeRoot(canvasCurX, canvasCurY, document.getElementById('make_node').value);		
	}
	else if(makeNodeFlag == 'child'){
		makeChild(canvasCurX, canvasCurY, document.getElementById('make_node').value);	
	}
}

/**
 * 노드 생성 취소
 */
function makeNodeCancel(){
	var node = document.getElementById('make_div');
	node.style.display = 'none';
	drawAll();
}

/**
 * 루트노드 생성
 */
function makeRoot(x, y, text){
//	isPopupedRoot = false;
	
	//서버로부터 현재 가장 큰 번호 받아오기
	var param = "mindtext=check";
	
	var request = createRequest();
	
	if(request == null){
		alert("서버 접속에 실패하였습니다");
	}
	else{
		request.open("POST", "nPM", true);
		request.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
		request.setRequestHeader("Cache-Control","no-cache, must-revalidate");
		request.setRequestHeader("Pragma","no-cache");
		request.onreadystatechange = function(){
			if (request.readyState == 4) {
				if (request.status == 200) {
					var responseDoc = request.responseText;
					var node = new rootClass();
					node.number = Number(responseDoc);
					node.x = x;
					node.y = y;
					node.text = text;
					node.height = wrapText(context, node.text, node.x, node.y, node.width, 20) + 10;

					// 연결정보 배열에 넣음
					var conn = new connClass(null, node);
					nodeArray.push(conn);
					
					//비동기 요청
					var param1 = "mindtext=saveroot" + "&number=" + node.number + "&parentx=-1" + "&parenty=-1" + "&myx=" + node.x + "&myy=" + node.y + "&mytext=" + node.text + "&mynode=" + getObjectClass(node)
					+ "&parentnumber=-1" + "&parentnode=none" + "&parenttext=none";
						
					var request1 = createRequest();
					
					if(request1 == null){
						alert("서버 접속에 실패하였습니다");
					}
					else{
						request1.open("POST", "nPM", true);
						request1.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
						request1.setRequestHeader("Cache-Control","no-cache, must-revalidate");
						request1.setRequestHeader("Pragma","no-cache");
						request1.send(param1);
					}
					drawAll();
				}
			}
		};
		request.send(param);
	}
}

/**
 * 마우스 커서가 객체 위에 있는지 검사하는 함수
 */
function cursorOnElement(curX, curY){
	if(isPopupedChild){
		for(var i = 0; i < popupChildStatus.length; i++){
			if((popupChildStatus[i].x < curX && curX < popupChildStatus[i].x+popupChildStatus[i].width)
					&& (popupChildStatus[i].y < curY && curY < popupChildStatus[i].y+popupChildStatus[i].height)){
				return popupChildStatus[i];
			}
		}
	}
	else{
		for(var i = 0; i < nodeArray.length; i++){
			if((nodeArray[i].me.x < curX && curX < nodeArray[i].me.x+nodeArray[i].me.width)
					&& (nodeArray[i].me.y < curY && curY < nodeArray[i].me.y+nodeArray[i].me.height)){
				return nodeArray[i].me;
			}
		}
	}
	return null;
}

/**
 * 자식노드 팝업을 띄움
 */
function makeChildPopup() {
	if (isPopupedChild)
		isPopupedChild = false;
	else
		isPopupedChild = true;

	if (isPopupedChild) {
		drawChildPopup(canvasCurX, canvasCurY);
	} else {
		drawAll();
	}
}

/**
 *	자식팝업 그리는 함수
 */
function drawChildPopup(x, y){
	popupChildStatus = new Array();

	//자식 노드 만들기
	var maxWidth = 110;
	var lineHeight = 20;
	var height = 30;
	var text = "자식노드 만들기";

	var radius = 5;
	var r = x + maxWidth;
	var b = y + height;

	context.beginPath();
	context.fillStyle = '#f0f0f0';
	context.strokeStyle = '#cacaca';
	context.lineWidth="1";
	context.moveTo(x+radius, y);
	context.lineTo(r-radius, y);
	context.quadraticCurveTo(r, y, r, y+radius);
	context.lineTo(r, b-radius);
	context.quadraticCurveTo(r, b, r-radius, b);
	context.lineTo(x+radius, b);
	context.quadraticCurveTo(x, b, x, b-radius);
	context.lineTo(x, y+radius);
	context.quadraticCurveTo(x, y, x+radius, y);
	context.fill();
	context.stroke();

	context.font = "12px Calibri";
	context.fillStyle = "#444";

	wrapText(context, text, x, y, maxWidth, lineHeight);

	popupChildStatus.push(new childPopupClass(x, y, maxWidth, height));

	//노드 수정하기
	var maxWidth = 110;
	var lineHeight = 20;
	var height = 30;
	var text = "수정하기";

	var radius = 5;
	var y = y + height;
	var r = x + maxWidth;
	var b = y + height;

	context.beginPath();
	context.fillStyle = '#f0f0f0';
	context.strokeStyle = '#cacaca';
	context.lineWidth="1";
	context.moveTo(x+radius, y);
	context.lineTo(r-radius, y);
	context.quadraticCurveTo(r, y, r, y+radius);
	context.lineTo(r, b-radius);
	context.quadraticCurveTo(r, b, r-radius, b);
	context.lineTo(x+radius, b);
	context.quadraticCurveTo(x, b, x, b-radius);
	context.lineTo(x, y+radius);
	context.quadraticCurveTo(x, y, x+radius, y);
	context.fill();
	context.stroke();

	context.font = "12px Calibri";
	context.fillStyle = "#444";

	wrapText(context, text, x, y, maxWidth, lineHeight);

	popupChildStatus.push(new childPopupClass(x, y, maxWidth, height));
	
	//텍스트로 내보내기
	var maxWidth = 110;
	var lineHeight = 20;
	var height = 30;
	var text = "텍스트로 내보내기";

	var radius = 5;
	var y = y + height;
	var r = x + maxWidth;
	var b = y + height;

	context.beginPath();
	context.fillStyle = '#f0f0f0';
	context.strokeStyle = '#cacaca';
	context.lineWidth="1";
	context.moveTo(x+radius, y);
	context.lineTo(r-radius, y);
	context.quadraticCurveTo(r, y, r, y+radius);
	context.lineTo(r, b-radius);
	context.quadraticCurveTo(r, b, r-radius, b);
	context.lineTo(x+radius, b);
	context.quadraticCurveTo(x, b, x, b-radius);
	context.lineTo(x, y+radius);
	context.quadraticCurveTo(x, y, x+radius, y);
	context.fill();
	context.stroke();

	context.font = "12px Calibri";
	context.fillStyle = "#444";

	wrapText(context, text, x, y, maxWidth, lineHeight);

	popupChildStatus.push(new childPopupClass(x, y, maxWidth, height));
}

/**
 * 자식노드 생성
 */
function makeChild(x, y, text){
//	isPopupedChild = false;
	
	//서버로부터 현재 가장 큰 번호 받아오기
	var param = "mindtext=check";
	
	var request = createRequest();
	
	if(request == null){
		alert("서버 접속에 실패하였습니다");
	}
	else{
		request.open("POST", "nPM", true);
		request.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
		request.setRequestHeader("Cache-Control","no-cache, must-revalidate");
		request.setRequestHeader("Pragma","no-cache");
		request.onreadystatechange = function(){
			if (request.readyState == 4) {
				if (request.status == 200) {
					var responseDoc = request.responseText;
					var node = new childClass();
					node.number = Number(responseDoc);
					node.x = x;
					node.y = y;
					node.text = text;
					node.height = wrapText(context, node.text, node.x, node.y, node.width, 20) + 10;

					// 연결정보 배열에 넣음
					var conn = new connClass(elementUped, node);
					nodeArray.push(conn);
					
					//비동기 요청
					var param1 = "mindtext=savechild" + "&number=" + node.number + "&parentx=" + elementUped.x + "&parenty=" + elementUped.y + "&myx=" + node.x + "&myy=" + node.y + "&mytext=" + node.text + "&mynode=" + getObjectClass(node)
					+ "&parentnumber=" + elementUped.number + "&parentnode=" + getObjectClass(elementUped) + "&parenttext=" + elementUped.text;
						
					var request1 = createRequest();
					
					if(request1 == null){
						alert("서버 접속에 실패하였습니다");
					}
					else{
						request1.open("POST", "nPM", true);
						request1.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
						request1.setRequestHeader("Cache-Control","no-cache, must-revalidate");
						request1.setRequestHeader("Pragma","no-cache");
						request1.send(param1);
					}
					drawAll();
				}
			}
		};
		request.send(param);
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
 * 노드의 텍스트를 수정하는 폼을 띄운다
 */
function modifyNode(x, y){
	//팝업 없애고
	isPopupedChild = false;
	drawAll();
	isModified = true;
	elementModify = elementUped;
	
	//캔버스에 input 태그 보이게 함
	var node = document.getElementById('modify_div');
	var text =  document.getElementById('modify_node');
	
	text.value = '';
	
	node.style.left = elementUped.x + 'px';
	node.style.top = elementUped.y + 'px';
	node.style.width = elementUped.width + 'px';
	node.style.height = elementUped.height + 20 + 'px';
	node.style.display = 'block';
	
	text.style.left = elementUped.x + 'px';
	text.style.top = elementUped.y + 'px';
	text.style.width = elementUped.width + 'px';
	text.style.height = elementUped.height + 'px';
	
	text.focus();
}

/**
 * 노드의 텍스트를 수정한다
 */
function modifyNodeOk(){
	if(isModified){
		var node = document.getElementById('modify_div');
		node.style.display = 'none';
		isModified = false;
		elementModify.text = document.getElementById('modify_node').value;

		//DB 내용 수정
		var param = "mindtext=modify" + "&number=" + elementModify.number + "&text=" + elementModify.text;
		elementModify = null;

		var request = createRequest();

		if(request == null){
			alert("서버 접속에 실패하였습니다");
		}
		else{
			request.open("POST", "nPM", true);
			request.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
			request.setRequestHeader("Cache-Control","no-cache, must-revalidate");
			request.setRequestHeader("Pragma","no-cache");
			request.send(param);
		}
		drawAll();
	}
}

/**
 * 노드의 텍스트 수정을 취소한다
 */
function modifyNodeCancel(){
	isModified = false;
	elementModify = null;
	var node = document.getElementById('modify_div');
	node.style.display = 'none';
	drawAll();
}

/**
 * 트리 형태의 텍스트로 출력하는 함수
 */
function exportToText(element, cnt){
	for(var i = 0; i < nodeArray.length; i++){
		if(nodeArray[i].parent != null){
			if((element.x == nodeArray[i].parent.x) && (element.y == nodeArray[i].parent.y)){
				var str = '';
				for(var j = 0; j < cnt; j++){
					str += '   ';
				}
				treeArray.push(str + '-' + nodeArray[i].me.text + '\r\n');
				exportToText(nodeArray[i].me, cnt + 1);
			}
		}
	}
}

/**
 * 텍스트 팝업 닫기
 */
function exportToTextClose(){
	document.getElementById('export_text').style.display = 'none';
}

/**
 * 비동기 요청을 위한 요청 객체를 생성
 */
function createRequest() {
	var request = null;
	try {
		request = new XMLHttpRequest();
	} catch (tryMS) {
		try {
			request = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (otherMS) {
			try {
				request = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (failed) {
				request = null;
			}
		}
	}	
	return request;
}

/**
 * 아무 이벤트도 일어나지 않은 시간을 잰다
 */
function tellTheClock(){
	timer++;
	if(timer > 5){
		timer = 0;
//		saveData();
		loadData();
	}
}

/**
 * 최신 정보 로드
 */
function loadData(){
	var param = "mindtext=load";

	var request = createRequest();

	if(request == null){
		alert("서버 접속에 실패하였습니다");
	}
	else{
		request.open("POST", "nPM", true);
		request.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
		request.setRequestHeader("Cache-Control","no-cache, must-revalidate");
		request.setRequestHeader("Pragma","no-cache");
		request.onreadystatechange = function(){
			if (request.readyState == 4) {
				if (request.status == 200) {
					var xml = request.responseXML;
					parseXML(xml);
				}
			}
		};
		request.send(param);
	}
}

/**
 * 최신 정보 세이브
 */
function saveData(elem){
	//DB에 현재 노드 위치 정보 세이브
	var param = "mindtext=savepos" + "&newx=" + elem.x + "&newy=" + elem.y + "&number=" + elem.number
	+ "&prevx=" + elementDownedX + "&prevy=" + elementDownedY;
	
	var request = createRequest();
	
	if(request == null){
		alert("서버 접속에 실패하였습니다");
	}
	else{
		request.open("POST", "nPM", true);
		request.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
		request.setRequestHeader("Cache-Control","no-cache, must-revalidate");
		request.setRequestHeader("Pragma","no-cache");
		request.send(param);
	}
}

/**
 * XML정보 파싱
 */
function parseXML(response){
	nodeArray = new Array();	//노드 배열 초기화
	
	var data = response.getElementsByTagName("data");
	
	//노드 정보를 파싱한다
	var id = data[0].getElementsByTagName("id");

	for(var i = 0; i < id.length; i++){
		var number = Number(id[i].getElementsByTagName("number")[0].firstChild.nodeValue);
		var parentnumber = Number(id[i].getElementsByTagName("parentnumber")[0].firstChild.nodeValue);
		var parentnode = id[i].getElementsByTagName("parentnode")[0].firstChild.nodeValue;
		var parentx = Number(id[i].getElementsByTagName("parentx")[0].firstChild.nodeValue);
		var parenty = Number(id[i].getElementsByTagName("parenty")[0].firstChild.nodeValue);
		var parenttext = id[i].getElementsByTagName("parenttext")[0].firstChild.nodeValue;
		var mynode = id[i].getElementsByTagName("mynode")[0].firstChild.nodeValue;
		var myx = Number(id[i].getElementsByTagName("myx")[0].firstChild.nodeValue);
		var myy = Number(id[i].getElementsByTagName("myy")[0].firstChild.nodeValue);
		var mytext = id[i].getElementsByTagName("mytext")[0].firstChild.nodeValue;
		
//		alert(number + ',' + parentnumber + ',' + parentnode + ',' + parentx + ',' + parenty + ',' + parenttext + ',' + 
//				mynode + ',' +  myx + ',' + myy + ',' + mytext);
		
		if(parentnode == 'none'){
			var rootNode = new rootClass();
			rootNode.number = number;
			rootNode.x = myx;
			rootNode.y = myy;
			rootNode.text = mytext;
			context.font = rootNode.fontSize + ' Calibri';
			context.fillStyle = rootNode.textFill;
			rootNode.height = wrapText(context, rootNode.text, rootNode.x, rootNode.y, rootNode.width, 20) + 10;
			
			var conn = new connClass(null, rootNode);
			nodeArray.push(conn);
		}
		else{
			var parentNode = null;
			for(var j = 0; j < nodeArray.length; j++){
				if(nodeArray[j].me.number == parentnumber){
					parentNode = nodeArray[j].me;
				}
			}

			var myNode = new childClass();
			myNode.number = number;
			myNode.x = myx;
			myNode.y = myy;
			myNode.text = mytext;
			context.font = myNode.fontSize + ' Calibri';
			context.fillStyle = myNode.textFill;
			myNode.height = wrapText(context, myNode.text, myNode.x, myNode.y, myNode.width, 20) + 10;
			
			var conn = new connClass(parentNode, myNode);
			nodeArray.push(conn);
		}
	}	
	drawAll();
}