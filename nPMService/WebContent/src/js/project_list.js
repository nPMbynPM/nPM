/**
 * 프로젝트 생성 팝업창을 띄움
 */
function createPopup(){
	document.getElementById("createPopup").style.display = 'block';
	document.getElementById("list").style.display = 'none';
}

/**
 * 프로젝트 생성 팝업창을 닫음
 */
function closePopup(){
	document.getElementById("createPopup").style.display = 'none';
	document.getElementById("list").style.display = 'block';
}

/**
 * 목록에 유저 이름을 추가한다
 * @param id
 * @param name
 */
function addList(id, name){
	var list = document.getElementById("projectMember");
	var flag = false;
	
	//동일한 ID가 있는지 검사한다
	for(var i = 0; i < list.options.length; i++){
		if(list.options[i].value == id){
			flag = true;
			break;
		}
	}
	if(flag == false)
		list.options[list.options.length] = new Option(name, id);
	else
		alert('동일한 멤버가 이미 추가되었습니다');
}

/**
 * 목록의 유저 이름을 제거한다
 */
function removeList(){
	var list = document.getElementById("projectMember");
	
	for(var i = 0; i < list.options.length; i++){
		if(list.options[i].selected)
			list.options[i] = null;
	}
}