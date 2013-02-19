/**
 * 현재의 프로젝트를 DB 테이블에 저장하기 위해 데이터를 추출
 */
function saveAsDB(){
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
	
	//서버에 저장을 요청함
	requestSaveAsDB(personID, personX, personY, personImgSrc, personName, personFont, personEmail,
			todoX, todoY, todoTodo, todoStart, todoFinish, todoFont,
			fromClassName, fromX, fromY, toClassName, toX, toY,
			todoColor, todoIsfinished, projectID);
}

/**
 * DB에 존재하는 데이터를 프로젝트로 불러옴
 * @param id
 */
function loadAsDB(id){
	//서버에 DB정보 요청
	requestLoadAsDB(id);
}

/**
 * Gantt chart 데이터를 불러옴
 * @param id
 */
function loadGanttDB(id){
	//Gantt chart데이터를 서버에 요청
	requestGanttDB(id);
}