/**
 * 현재의 상태를 파일로 저장하기 위해 비동기 요청을 서버로 보낸다
 */
function saveAs(){
	var saveText = document.getElementById('saveFilePath').value;
	//.xml 형식이 아니면 오류메시지 출력
	if(saveText.substring(saveText.length-4, saveText.length) != '.xml'){
		alert(".xml형식으로 입력하여야 합니다.");
		return false;
	}

	//작업자 정보
	var personX = new Array();
	var personY = new Array();
	var personImgSrc = new Array();
	var personName = new Array();
	var personFont = new Array();
	//할일 정보
	var todoX = new Array();
	var todoY = new Array();
	var todoTodo = new Array();
	var todoStart = new Array();
	var todoFinish = new Array();
	var todoFont = new Array();
	//연결 정보
	var fromClassName = new Array();
	var fromX = new Array();
	var fromY = new Array();
	var toClassName = new Array();
	var toX = new Array();
	var toY = new Array();

	for(var i = 0; i < personArray.length; i++){
		personX.push(personArray[i].x);
		personY.push(personArray[i].y);
		var imgSrc = personArray[i].img.src;
		personImgSrc.push(imgSrc.substring(imgSrc.length-17, imgSrc.length));
		personName.push(personArray[i].name);
		personFont.push(personArray[i].font);
	}
	for(var i = 0; i < todoArray.length; i++){
		todoX.push(todoArray[i].x);
		todoY.push(todoArray[i].y);
		todoTodo.push(todoArray[i].todo);
		todoStart.push(todoArray[i].start);
		todoFinish.push(todoArray[i].finish);
		todoFont.push(todoArray[i].font);
	}
	for(var i = 0; i < connArray.length; i++){
		fromClassName.push(getObjectClass(connArray[i].from));
		fromX.push(connArray[i].from.x);
		fromY.push(connArray[i].from.y);
		toClassName.push(getObjectClass(connArray[i].to));
		toX.push(connArray[i].to.x);
		toY.push(connArray[i].to.y);
	}
	
	//Ajax를 이용한 비동기 요청
	var param = "savetext="+saveText+"&personX="+personX+"&personY="+personY+"&personImgSrc="+personImgSrc+"&personName="+personName+"&personFont="+personFont+
	"&todoX="+todoX+"&todoY="+todoY+"&todoTodo="+todoTodo+"&todoStart="+todoStart+"&todoFinish="+todoFinish+"&todoFont="+todoFont+
	"&fromClassName="+fromClassName+"&fromX="+fromX+"&fromY="+fromY+"&toClassName="+toClassName+"&toX="+toX+"&toY="+toY;

	var saveRequest = createRequest();
	
	if(saveRequest == null){
		alert("요청에 실패했습니다!");
	}
	else{
		saveRequest.open("POST", "nPM", true);
		saveRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
		saveRequest.setRequestHeader("Cache-Control","no-cache, must-revalidate");
		saveRequest.setRequestHeader("Pragma","no-cache");
		saveRequest.onreadystatechange = function(){
			if (saveRequest.readyState == 4) {
				if (saveRequest.status == 200) {
					alert("저장 완료!");
					document.getElementById('savePopup').style.display = 'none';
				}
				else{
					alert("저장에 실패하였습니다.");
				}
			}
		};
		saveRequest.send(param);
	}
}

/**
 * XML 파일로 부터 정보를 가져온다
 */
function loadXML(){
	var loadText = document.getElementById('loadFilePath').value;

	//.xml파일이 아니면 경고 메시지를 출력한다
	if(loadText.substring(loadText.length-4, loadText.length) != '.xml'){
		alert(".xml형식으로 입력하여야 합니다.");
		return false;
	}

	//Ajax를 이용한 xml파일 비동기 요청
	var param = "loadtext="+loadText;

	var loadRequest = createRequest();

	if(loadRequest == null){
		alert("불러오기 실패");
	}
	else{
		loadRequest.open("POST","nPM",true);
		loadRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
		loadRequest.setRequestHeader("Cache-Control","no-cache, must-revalidate");
		loadRequest.setRequestHeader("Pragma","no-cache");
		loadRequest.onreadystatechange = function(){
			if (loadRequest.readyState == 4) {
				if (loadRequest.status == 200) {
					var responseDoc = loadRequest.responseXML;
					if(responseDoc == null){
						alert("올바른 파일 형식이 아닙니다");
						return false;
					}
					else{
						xmlParsing(responseDoc);
						document.getElementById('loadPopup').style.display = 'none';
						drawAll();
					}
				}
			}
		};
		loadRequest.send(param);
	}
}
/**
 * load 된 정보를 파싱하여 배열에 삽입한다
 */
function xmlParsing(response){
	personArray = new Array();	//작업자 배열
	todoArray = new Array();	//할일 배열
	connArray = new Array();	//작업자-할일 연결정보 배열
	
	var person = response.getElementsByTagName("person");
	var todo = response.getElementsByTagName("todo");
	var conn = response.getElementsByTagName("conn");
	
	//작업자 정보를 파싱한다
	var personId = person[0].getElementsByTagName("id");

	for(var i = 0; i < personId.length; i++){
		var x = personId[i].getElementsByTagName("x")[0].firstChild.nodeValue;
		var y = personId[i].getElementsByTagName("y")[0].firstChild.nodeValue;
		var imgSrc = personId[i].getElementsByTagName("imgSrc")[0].firstChild.nodeValue;
		var name = personId[i].getElementsByTagName("name")[0].firstChild.nodeValue;
		var font = personId[i].getElementsByTagName("font")[0].firstChild.nodeValue;

		var tmpClass = new personClass(Number(x), Number(y), String(name));
		tmpClass.img.src = imgSrc;
		tmpClass.font = font;
		personArray.push(tmpClass);
	}
	
	//할일 정보를 파싱한다
	var todoId = todo[0].getElementsByTagName("id");
	
	for(var i = 0; i < todoId.length; i++){
		var x = todoId[i].getElementsByTagName("x")[0].firstChild.nodeValue;
		var y = todoId[i].getElementsByTagName("y")[0].firstChild.nodeValue;
		var job = todoId[i].getElementsByTagName("job")[0].firstChild.nodeValue;
		var start = todoId[i].getElementsByTagName("start")[0].firstChild.nodeValue;
		var finish = todoId[i].getElementsByTagName("finish")[0].firstChild.nodeValue;
		var font = todoId[i].getElementsByTagName("font")[0].firstChild.nodeValue;

		var tmpClass = new todoClass(Number(x), Number(y), String(job), String(start), String(finish));
		tmpClass.font = font;
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