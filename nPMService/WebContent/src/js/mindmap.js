var isPopupedRoot = false;
var isPopupedChild = false;
var isModified = false;
var isDeleted = false;
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
var elementDelete = null;
var crossX = 0;
var crossY = 0;

var nodeArray = new Array();
var treeArray = new Array();

window.onload = function(){
	canvas = document.getElementById('mindmap_canvas');
	context = document.getElementById('mindmap_canvas').getContext('2d');
	addEvent();
	loadData();
	setInterval("tellTheClock()", 60000);
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
		//노드 삭제
		else if((canvasCurX > popupChildStatus[3].x && canvasCurX < popupChildStatus[3].x + popupChildStatus[3].width)
				&& (canvasCurY > popupChildStatus[3].y && canvasCurY < popupChildStatus[3].y + popupChildStatus[3].height)){
			deleteNode(canvasCurX, canvasCurY);
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
	if(elementDowned != null){
		saveData(elementDowned);
	}
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
	//연결 상태 그리기
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
			//연결 선을 그린다
			context.strokeStyle = '#444444';
			context.lineWidth = 1;
			context.beginPath();
			context.moveTo(ax1, ay1);
			context.lineTo(crossX, crossY);
			context.stroke();
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
	//루트노드 생성을 요청
	requestMindmapMakeRoot(x, y, text);
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
	
	//노드 삭제
	var maxWidth = 110;
	var lineHeight = 20;
	var height = 30;
	var text = "노드 삭제";

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
	//자식노드 생성을 요청
	requestMindmapMakeChild(x, y, text);
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

		//노드의 수정을 요청함
		requestMindmapModify(elementModify);
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
 * 노드 삭제 팝업 생성
 */
function deleteNode(x, y){
	//메뉴 없애고
	isPopupedChild = false;
	drawAll();
	isDeleted = true;
	elementDelete = elementUped;
	//삭제 확인 팝업을 띄움
	var node = document.getElementById('delete_div');
	
	node.style.left = elementUped.x + 'px';
	node.style.top = elementUped.y + 'px';
	node.style.width = elementUped.width + 'px';
	node.style.height = elementUped.height + 20 + 'px';
	node.style.display = 'block';
}

/**
 * 노드 삭제
 */
function deleteNodeOk(){
	if(isDeleted){
		var node = document.getElementById('delete_div');
		node.style.display = 'none';
		isDeleted = false;
		//관련 노드 삭제
		var delNumber = new Array();
		for(var i = nodeArray.length - 1; i >= 0; i--){
			if(nodeArray[i].parent == elementDelete || nodeArray[i].me == elementDelete){
				delNumber.push(Number(nodeArray[i].me.number));
				nodeArray.splice(i, 1);
			}
		}
		//마인드맵 노드 삭제를 요청함
		requestMindmapDelete(delNumber);
	}
}

/**
 * 노드 삭제 취소
 */
function deleteNodeCancel(){
	isDeleted = false;
	elementDelete = null;
	var node = document.getElementById('delete_div');
	node.style.display = 'none';
	drawAll();
}

/**
 * 트리를 텍스트로 출력하는 함수
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
	//마인드맵 정보를 서버에 요청함
	requestMindmapLoad();
}

/**
 * 최신 정보 세이브
 */
function saveData(elem){
	requestMindmapSave(elem);
}