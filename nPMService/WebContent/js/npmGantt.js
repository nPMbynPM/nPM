window.onload = loadDB;

var personArray = new Array();	//작업자 배열
var todoArray = new Array();	//할일 배열
var connArray = new Array();	//작업자-할일 연결정보 배열
var tmpArray = new Array();	//임시 배열

/**
 * 작업자 클래스
 */
function personClass(x, y, name){
	this.x = x;
	this.y = y;
	this.width = 50;
	this.height = 50;
	this.img = new Image();
	this.img.src = 'image/person1.png';
	this.selected = false;
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
 * 간트차트 초기화
 */
function ganttInit(){
	tableDiv = document.getElementById('gantt_table');
	chartDiv = document.getElementById('gantt_chart');
	//할일에 대한 작업자 정보
	todoResource = new Array();
	//할일 정보
	todoTodo = new Array();
	todoStart = new Array();
	todoFinish = new Array();
	todoIsFinished = new Array();
	//연결 정보
	link = new Array();
	
	for(var i = 0; i < todoArray.length; i++){
		var linkArray = new Array();
		var isLinked = false;
		var resourceFlag = false;
		var str = '';
		//할일, 시작일, 종료일
		var tmpStart = todoArray[i].start.split('-');
		var tmpFinish = todoArray[i].finish.split('-');
		todoTodo.push(todoArray[i].todo);
		todoStart.push(tmpStart[1]+'/'+tmpStart[2]+'/'+tmpStart[0]);
		todoFinish.push(tmpFinish[1]+'/'+tmpFinish[2]+'/'+tmpFinish[0]);
		//완료여부
		if(todoArray[i].isFinished == true){
			todoIsFinished.push(100);
		}
		else{
			todoIsFinished.push(0);
		}
		//리소스 정보
		tmpArray = new Array();
		getConnInform(todoArray[i]);
		for(var j = 0; j < tmpArray.length; j++){
			resourceFlag = true;
			str += tmpArray[j].name;
			if(j != tmpArray.length -1){
				str += ',';
			}
		}
		if(resourceFlag == true){
			todoResource.push(str);			
		}
		else{
			todoResource.push("없음");	
		}
		//연결 정보
		for(var j = 0; j < connArray.length; j++){
			if(getObjectClass(connArray[j].to) == 'todoClass'){
				if(todoArray[i].x == connArray[j].to.x && todoArray[i].y == connArray[j].to.y && getObjectClass(connArray[j].from) == 'todoClass'){
					for(var k = 0; k < todoArray.length; k++){
						if(todoArray[k].x == connArray[j].from.x && todoArray[k].y == connArray[j].from.y){
							isLinked = true;
							linkArray.push(k);
						}
					}
				}
			}
		}
		if(isLinked == false){
			link.push('');
		}
		else{
			str = '';
			for(var j = 0; j < linkArray.length; j++){
				str += linkArray[j];
				if(j != linkArray.length - 1){
					str += ',';
				}
			}
			link.push(str);
		}
	}
	
	//chart
	g = new JSGantt.GanttChart('g', chartDiv, 'day');
	g.setShowRes(1);
	g.setShowDur(1);
	g.setShowComp(1);
	g.setCaptionType('Resource');
	g.setShowStartDate(1);
	g.setShowEndDate(1);
	g.setDateInputFormat('mm/dd/yyyy');
	g.setDateDisplayFormat('mm/dd/yyyy');
	g.setFormatArr("day", "week", "month", "quarter");

	//아이디,작업명,시작일,종료일,색상,링크,마일스톤,자원명,퍼센트,그룹,부모아이디,펼침,의존도,캡션
	g.AddTaskItem(new JSGantt.TaskItem(101, 'nPM', '', '', 'ff0000',	'', 0, '', 0, 1, 0, 1));
	for(var i = 0; i < todoResource.length; i++){
		g.AddTaskItem(new JSGantt.TaskItem(i,todoTodo[i],todoStart[i],todoFinish[i],'ff00ff','',0,todoResource[i],todoIsFinished[i],0,101,1,link[i]));
	}
	g.Draw();
	g.DrawDependencies();
	
	//table
	t = new JSGantt.GanttChart('t', tableDiv, 'day');
	t.setShowRes(1);
	t.setShowDur(1);
	t.setShowComp(1);
	t.setCaptionType('Resource');
	t.setShowStartDate(1);
	t.setShowEndDate(1);
	t.setDateInputFormat('mm/dd/yyyy');
	t.setDateDisplayFormat('mm/dd/yyyy');
	t.setFormatArr("day", "week", "month", "quarter");

	//아이디,작업명,시작일,종료일,색상,링크,마일스톤,자원명,퍼센트,그룹,부모아이디,펼침,의존도,캡션
	t.AddTaskItem(new JSGantt.TaskItem(101, 'nPM', '', '', 'ff0000',	'', 0, '', 0, 1, 0, 1));
	for(var i = 0; i < todoResource.length; i++){
		t.AddTaskItem(new JSGantt.TaskItem(i,todoTodo[i],todoStart[i],todoFinish[i],'ff00ff','',0,todoResource[i],todoIsFinished[i],0,101,1,link[i]));
	}
	t.Draw();
	t.DrawDependencies();
}

/**
 * DB 정보 로드
 */
function loadDB(){
	var param = "loaddb=all";
	
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
					xmlParsing(xml);
				}
			}
		};
		request.send(param);
	}
}

/**
 * load 된 정보를 파싱하여 배열에 삽입한다
 */
function xmlParsing(response){
	personArray = new Array();	//작업자 배열
	todoArray = new Array();	//할일 배열
	connArray = new Array();	//작업자-할일 연결정보 배열
	
	var person = response.getElementsByTagName("Resources");
	var todo = response.getElementsByTagName("Tasks");
	var conn = response.getElementsByTagName("conn");
	
	//작업자 정보를 파싱한다
	var personId = person[0].getElementsByTagName("Resource");

	for(var i = 0; i < personId.length; i++){
		var x = personId[i].getElementsByTagName("x")[0].firstChild.nodeValue;
		var y = personId[i].getElementsByTagName("y")[0].firstChild.nodeValue;
		var imgSrc = personId[i].getElementsByTagName("imgSrc")[0].firstChild.nodeValue;
		var name = personId[i].getElementsByTagName("Name")[0].firstChild.nodeValue;
		var font = personId[i].getElementsByTagName("font")[0].firstChild.nodeValue;

		var tmpClass = new personClass(Number(x), Number(y), String(name));
		tmpClass.img.src = imgSrc;
		tmpClass.font = font;
		personArray.push(tmpClass);
	}
	
	//할일 정보를 파싱한다
	var todoId = todo[0].getElementsByTagName("Task");
	
	for(var i = 0; i < todoId.length; i++){
		var x = todoId[i].getElementsByTagName("x")[0].firstChild.nodeValue;
		var y = todoId[i].getElementsByTagName("y")[0].firstChild.nodeValue;
		var job = todoId[i].getElementsByTagName("Name")[0].firstChild.nodeValue;
		var start = todoId[i].getElementsByTagName("Start")[0].firstChild.nodeValue;
		var finish = todoId[i].getElementsByTagName("Finish")[0].firstChild.nodeValue;
		var font = todoId[i].getElementsByTagName("font")[0].firstChild.nodeValue;
		var color = todoId[i].getElementsByTagName("color")[0].firstChild.nodeValue;
		var isfinished = todoId[i].getElementsByTagName("isfinished")[0].firstChild.nodeValue;

		var tmpClass = new todoClass(Number(x), Number(y), String(job), String(start), String(finish));
		tmpClass.font = font;
		tmpClass.color = color;
		if(isfinished == 'true')		tmpClass.isFinished = true;
		else	tmpClass.isFinished = false;
		todoArray.push(tmpClass);
	}
	
	//연결 정보를 파싱한다
	var from = conn[0].getElementsByTagName("from");
	var to = conn[0].getElementsByTagName("to");
	var fromId = from[0].getElementsByTagName("id");
	var toId = to[0].getElementsByTagName("id");
	
	for(var i = 0; i < fromId.length; i++){
		var className1 = fromId[i].getElementsByTagName("className")[0].firstChild.nodeValue;
		var x1 = fromId[i].getElementsByTagName("x")[0].firstChild.nodeValue;
		var y1 = fromId[i].getElementsByTagName("y")[0].firstChild.nodeValue;
		var className2 = toId[i].getElementsByTagName("className")[0].firstChild.nodeValue;
		var x2 = toId[i].getElementsByTagName("x")[0].firstChild.nodeValue;
		var y2 = toId[i].getElementsByTagName("y")[0].firstChild.nodeValue;
		
		var tmpClass1 = null;
		var tmpClass2 = null;
		if(className1 == 'personClass'){
			for(var j = 0; j < personArray.length; j++){
				if(personArray[j].x == Number(x1) && personArray[j].y == Number(y1)){
					tmpClass1 = personArray[j];
					break;
				}
			}
		}
		else if(className1 == 'todoClass'){
			for(var j = 0; j < todoArray.length; j++){
				if(todoArray[j].x == Number(x1) && todoArray[j].y == Number(y1)){
					tmpClass1 = todoArray[j];
					break;
				}
			}
		}
		for(var j = 0; j < todoArray.length; j++){
			if(todoArray[j].x == Number(x2) && todoArray[j].y == Number(y2)){
				tmpClass2 = todoArray[j];
				break;
			}
		}
		var tmpConn = new connClass(tmpClass1, tmpClass2);
		
		connArray.push(tmpConn);
	}
	ganttInit();
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