/**
 * 새로운 프로젝트를 생성한다
 */
function createProject(){
	//페이스북으로 부터 로그인한 사용자 정보를 가져옴
	fbEnsureInit(function(){
		fbID = '';
		FB.api('/me', function(response) {
			fbID = response.id;
			
			if(fbID != null){
				var projectName = document.getElementById("projectName").value;

				//예외처리
				if(projectName.replace(/^\s*/,'').replace(/\s*$/,'') == ''){
					alert('프로젝트 이름을 입력해주세요');
					return;
				}
				//서버에 새로운 프로젝트 생성을 요청함
				requestNewProj(projectName, fbID);
			}
		});
	});
}