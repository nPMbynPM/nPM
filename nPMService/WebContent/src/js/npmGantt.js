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
	this.img.src = '';
	this.imgLoaded = false;
	this.selected = false;
	this.id = '';	//작업자 ID
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
 * 간트차트 초기화
 */
function ganttInit(projectName){
	//튜토리얼 display:none, 테이블 display:block
	document.getElementById('ganttNotice').style.display = 'none';
	document.getElementById('gantt_wrapper').style.display = 'block';
	//프로젝트 이름
	document.getElementById('gantt_title').innerHTML = projectName;
	
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
function loadDB(id){
	//console.log(id);
	//Gantt chart의 DB정보를 서버에 요청함
	loadGanttDB(id);
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


/**
 * 로그인 한 사용자가 참여하는 프로젝트의 목록을 보여준다
 */
function displayProject(){
	fbEnsureInit(function(){
		fbID = '';
		FB.api('/me', function(response) {
			fbID = response.id;
			
			if(fbID != null){
				//프로젝트 목록을 요청한다
				requestProjList(fbID);
			}
		});
	});
}