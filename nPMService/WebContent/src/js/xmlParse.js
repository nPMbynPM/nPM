/**
 * 현재의 프로젝트를 XML로 저장하기 위해 데이터를 추출
 * @param saveText
 */
function saveAsXML(saveText){
	//작업자 정보
	var personID = new Array();
	var personX = new Array();
	var personY = new Array();
	var personImgSrc = new Array();
	var personName = new Array();
	var personEmail = new Array();
	var personFont = new Array();
	//할일 정보
	var todoX = new Array();
	var todoY = new Array();
	var todoTodo = new Array();
	var todoStart = new Array();
	var todoFinish = new Array();
	var todoFont = new Array();
	var todoColor = new Array();
	var todoIsfinished = new Array();
	//연결 정보
	var fromClassName = new Array();
	var fromX = new Array();
	var fromY = new Array();
	var toClassName = new Array();
	var toX = new Array();
	var toY = new Array();

	for(var i = 0; i < personArray.length; i++){
		personID.push(personArray[i].id);
		personX.push(personArray[i].x);
		personY.push(personArray[i].y);
		var imgSrc = personArray[i].img.src;
		personImgSrc.push(imgSrc);
		personName.push(personArray[i].name);
		personEmail.push(personArray[i].email);
		personFont.push(personArray[i].font);
	}
	for(var i = 0; i < todoArray.length; i++){
		todoX.push(todoArray[i].x);
		todoY.push(todoArray[i].y);
		todoTodo.push(todoArray[i].todo);
		todoStart.push(todoArray[i].start);
		todoFinish.push(todoArray[i].finish);
		todoFont.push(todoArray[i].font);
		todoColor.push(todoArray[i].color);
		todoIsfinished.push(todoArray[i].isFinished);
	}
	for(var i = 0; i < connArray.length; i++){
		fromClassName.push(getObjectClass(connArray[i].from));
		fromX.push(connArray[i].from.x);
		fromY.push(connArray[i].from.y);
		toClassName.push(getObjectClass(connArray[i].to));
		toX.push(connArray[i].to.x);
		toY.push(connArray[i].to.y);
	}
	
	//저장을 위해 서버로 요청
	requestSaveAsXML(saveText, personID, personX, personY, personImgSrc, personName, personFont, personEmail,
			todoX, todoY, todoTodo, todoStart, todoFinish, todoFont,
			fromClassName, fromX, fromY, toClassName, toX, toY,
			todoColor, todoIsfinished, projectID);
}

/**
 * XML 파일로 부터 정보를 가져온다
 * @param loadText
 */
function loadAsXML(loadText){
	//서버에 xml 요청
	requestLoadAsXML(loadText);
}

/**
 * load 된 정보를 파싱하여 배열에 정보 삽입
 * @param response
 * @returns projName
 */
function npmXMLParsing(response){	
	var person = response.getElementsByTagName("Resources");
	var todo = response.getElementsByTagName("Tasks");
	var conn = response.getElementsByTagName("conn");
	var name = response.getElementsByTagName("Name");
	
	//프로젝트 이름 정보 파싱
	var projName = name[0].firstChild.nodeValue;
	
	//작업자 정보를 파싱한다
	var personId = person[0].getElementsByTagName("Resource");

	for(var i = 0; i < personId.length; i++){
		var id = personId[i].getElementsByTagName("id")[0].firstChild.nodeValue;
		var x = personId[i].getElementsByTagName("x")[0].firstChild.nodeValue;
		var y = personId[i].getElementsByTagName("y")[0].firstChild.nodeValue;
		var imgSrc = personId[i].getElementsByTagName("imgSrc")[0].firstChild.nodeValue;
		var name = personId[i].getElementsByTagName("Name")[0].firstChild.nodeValue;
		var email = personId[i].getElementsByTagName("Email")[0].firstChild.nodeValue;
		var font = personId[i].getElementsByTagName("font")[0].firstChild.nodeValue;

		//작업자 배열에 정보를 넣는다
		var tmpClass = new personClass(Number(x), Number(y), String(name));
		tmpClass.img.src = imgSrc;
		tmpClass.font = font;
		tmpClass.id = id;
		tmpClass.email = email;
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
	
	return projName;
}

/**
 * 유저의 목록정보 XML을 파싱함
 * @param response
 */
function userXMLParsing(response){
	var data = response.getElementsByTagName("data");
	
	//유저 정보를 파싱한다
	var user = data[0].getElementsByTagName("user");

	for(var i = 0; i < user.length; i++){
		var id = user[i].getElementsByTagName("id")[0].firstChild.nodeValue;
		var name = user[i].getElementsByTagName("name")[0].firstChild.nodeValue;
		var email = user[i].getElementsByTagName("email")[0].firstChild.nodeValue;
		var photo = user[i].getElementsByTagName("photo")[0].firstChild.nodeValue;
		
		//test code
		//console.log(name);
		//console.log(email);
		
		idArr.push(id);
		nameArr.push(name);
		emailArr.push(email);
		photoArr.push(photo);
	}
}