var TMDowned = false;
var TMResize = false;
var TMDownedTop = 0;
var TMDownedLeft = 0;
var TMDownedWidth = 0;
var TMDownedHeight = 0;
var canvasWidth = 0;	//캔버스의 width
var canvasHeight = 0;	//캔버스의 height
var prevX = 0;
var prevY = 0;

/**
 * 윈도우 이벤트를 등록한다
 */
function windowAddEvent(){
	//현재 캔버스의 너비, 높이를 설정한다
	document.getElementById('ctx_canvas').width = document.getElementById('bound').style.width.replace('px','');
	document.getElementById('ctx_canvas').height = document.getElementById('bound').style.height.replace('px','');
		
	//윈도우 이벤트 등록
	window.addEventListener('mousemove', window_move, false);
	window.addEventListener('mouseup', window_up, false);
	//canvas에도 이벤트 등록
	canvasAddEvent();
	//DB에 정보가 있다면 불러온다
	//loadDB();
}

/**
 * 윈도우 이벤트를 제거한다
 */
function windowRemoveEvent(){
	window.removeEventListener('mousemove', window_move, false);
	window.removeEventListener('mouseup', window_up, false);
	//canvas에도 이벤트 제거
	canvasRemoveEvent();
}

/**
 * 마우스가 down되었을 때의 윈도우 이벤트
 */
function window_down(param){
	TMDownedId = document.getElementById(param);
	TMDownedTop = document.getElementById(param).offsetTop;
	TMDownedLeft = document.getElementById(param).offsetLeft;
	TMDowned = true;
}

/**
 * 마우스가 move 되었을 때의 윈도우 이벤트
 */
function window_move(ev){	
	if(TMDowned == true){
		if(0 <= TMDownedTop	&& TMDownedLeft >= 0){
			TMDownedId.style.top = TMDownedTop + (ev.pageY-prevY) + 'px';
			TMDownedId.style.left = TMDownedLeft + (ev.pageX-prevX) + 'px';
			
			TMDownedTop = TMDownedId.offsetTop;
			TMDownedLeft = TMDownedId.offsetLeft;
			
			prevX = ev.pageX;
			prevY = ev.pageY;
		}
		//윈도우가 윗 부분을 넘어가지 않게
		else if(0 >= TMDownedTop){
			TMDownedId.style.top = 1 + 'px';
			TMDownedTop = 1; 
		}
		//윈도우가 화면의 왼쪽부분을 넘어가지 않게
		else if(TMDownedLeft <= 0){
			TMDownedId.style.left = 1 + 'px';
			TMDownedLeft = 1;
		}
	}
	//캔버스의 크기 조절
	if(TMResize == true){
		var outerWidth = TMDownedWidth + (ev.pageX - prevX);
		var outerHeight = TMDownedHeight + (ev.pageY - prevY);
		var innerWidth = canvasWidth + (ev.pageX - prevX);
		var innerHeight = canvasHeight + (ev.pageY - prevY);
		
		if(innerWidth < 50){
			outerWidth += 5;
			innerWidth += 5;
		}
		else if(innerHeight < 50){
			outerHeight += 5;
			innerHeight += 5;
		}
		
		//canvas
		TMDownedId.style.width = outerWidth + 'px';
		TMDownedId.style.height = outerHeight + 'px';
		//TM, MM, BM
		document.getElementById('canvasTM').style.width = innerWidth + 'px';
		document.getElementById('canvasMM').style.width = innerWidth + 'px';
		document.getElementById('canvasBM').style.width = innerWidth + 'px';
		//ML, MM, MR
		document.getElementById('canvasML').style.height = innerHeight + 'px';
		document.getElementById('canvasMM').style.height = innerHeight + 'px';
		document.getElementById('canvasMR').style.height = innerHeight + 'px';
		//ctx_canvas
		//document.getElementById('ctx_canvas').style.width = innerWidth + 'px';
		//document.getElementById('ctx_canvas').style.height = innerHeight + 'px';
		document.getElementById('ctx_canvas').width = innerWidth;
		document.getElementById('ctx_canvas').height = innerHeight;
		//bound
		document.getElementById('bound').style.width = innerWidth + 'px';
		document.getElementById('bound').style.height = innerHeight + 'px';
		
		TMDownedWidth = TMDownedId.offsetWidth;
		TMDownedHeight = TMDownedId.offstHeight;
		canvasWidth = document.getElementById('bound').offsetWidth;
		canvasHeight = document.getElementById('bound').offsetHeight;
		prevX = ev.pageX;
		prevY = ev.pageY;
		drawAll();
	}
	else{
		prevX = ev.pageX;
		prevY = ev.pageY;		
	}
}

/**
 * 마우스가 up 되었을 때의 윈도우 이벤트
 */
function window_up(ev){
	TMDowned = false;
	TMResize = false;
}

/**
 * 윈도우의 크기를 변경하는 함수
 */
function canvas_resize(){
	TMDownedId = document.getElementById('canvas');
	TMDownedWidth = TMDownedId.offsetWidth;
	TMDownedHeight = TMDownedId.offsetHeight;
	canvasWidth = document.getElementById('bound').offsetWidth;
	canvasHeight = document.getElementById('bound').offsetHeight;

	TMResize = true;
}