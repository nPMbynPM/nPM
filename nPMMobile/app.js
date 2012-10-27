var okBtn = "";
var facebook_Logincheck = false;
// facebook 상태 저장 변수

//window 및 view 설정
Titanium.UI.setBackgroundColor('#FEDCDC');
// 티타늄 시뮬레이터의 배경색깔 초기
var main_Win = Titanium.UI.createWindow(); 
// main 윈도우 생

//  main 윈도우의 배경화면 설정(이미지 삽)
main_Win.setBackgroundImage('nPMMobile_Image/background_Icon.png');

var back_Home = Ti.UI.createButton({
	top : 12,
	title : '뒤로',
	width : 40,
	height : 'auto',
	right : 10

});


var top_button = Ti.UI.createButton({
	
	
//	color : '#000',
	//selectedColor : '#fff',
//	backgroundImage : 'nPMMobile_Image/nPM_Logo.png',
//	title : '로고',

backgroundImage : 'nPMMobile_Image/nPM_Logo.png',
top : 7,
	width : 45,
	height : 50,
	left : 10
	/*
	top : 12,
	left:10,
	width : 40,
	height : 'auto',
	*/
});


var top_View = Ti.UI.createView({

	top : 0,
	backgroundColor : '#a9a9a9',
	width : 'auto',
	height : 'auto'
});


var page_Mainview = Ti.UI.createView({
	
		backgroundColor : '#808080',
		top : 0,
	//	backgroundImage : 'nPMMobile_Image/mindmap_Background4.png',
		width : 'auto'
	
});
		
back_Home.addEventListener('click', function() {

	nPM_Homepage.hide();
	project_Homepage.hide();
	mindmap_Homepage.hide();
	gantt_Homepage.hide();
	github_Homepage.hide();
	board_Homepage.hide();
	page_Homepage.hide();
	top_View.hide();
	page_Mainview.hide();
	

});

// 모버알 nPM 홈페이지 주소 생성
var nPM_Homepage = Ti.UI.createWebView({

	top : 50,
	url : 'http://solar4.ssu.ac.kr:8080', // 연결할 주소
	width : 'auto',
	height : 'auto'
});

top_View.add(top_button);
top_View.add(back_Home);

// 모버알 nPM 홈페이지 주소 연결
var project_Homepage = Ti.UI.createWebView({
	//	url:'http://solar4.ssu.ac.kr:8080/m_npm.html',
	top : 50,
	url : 'http://solar4.ssu.ac.kr:8080/project_Management.html',
	width : 'auto',
	height : 'auto'
});


//top_View.add(back_Home);

// 모버알 nPM_project 홈페이지 주소 연결
var mindmap_Homepage = Ti.UI.createWebView({

	top : 50,
	url : 'http://solar4.ssu.ac.kr/mindmap.html',
	width : 'auto',
	height : 'auto'
});

//top_View.add(back_Home);

// 모버알 nPM_gantt 홈페이지 주소 연결
var gantt_Homepage = Ti.UI.createWebView({

	top : 50,
	url : 'http://solar4.ssu.ac.kr:8080/m_gantt.html',
	width : 'auto',
	height : 'auto'

});

//top_View.add(back_Home);

// 모버알 nPM_git_hurb 홈페이지 주소 연결
var github_Homepage = Ti.UI.createWebView({

	top : 50,
	url : 'http://github.com/nPMbynPM/nPM',
	width : 'auto',
	height : 'auto'
});

//top_View.add(back_Home);

// 모버알 nPM_board 홈페이지 주소 연결
var board_Homepage = Ti.UI.createWebView({

	top : 50,
	url : 'http://solar4.ssu.ac.kr/xe/freeboard',
	width : 'auto',
	height : 'auto'
});

//top_View.add(back_Home);

var page_Homepage = Ti.UI.createWebView({

	top : 50,
	url : 'http://solar4.ssu.ac.kr:8080/index.html#slidepanel',
	width : 'auto',
	height : 'auto'
});
//top_View.add(back_Home);

// 모버알 nPM 버튼 생성
var nPM_Button = Titanium.UI.createButton({
	color : '#000',
	selectedColor : '#fff',
	backgroundImage : 'nPMMobile_Image/nPM_Icon.png',
	top : 250,
	width : 100,
	height : 100,
	left : 80
});

// 모버알 nPM_project 버튼 생성
var project_Button = Titanium.UI.createButton({
	color : '#000', // 버튼 색깔
	selectedColor : '#fff', // 버튼 클릭했을 때 색깔
	backgroundImage : 'nPMMobile_Image/project_Icon.png', // 버튼 이미지
	top : 250, // 버튼 생성 높이
	width : 100, // 버튼 너비
	height : 100, // 버튼 높이
	left : 310 // 버튼 생성 왼쪽 위치

});

// 모버알 nPM_mindmap 버튼 생성
var mindmap_Button = Titanium.UI.createButton({

	color : '#000',
	selectedColor : '#fff',
	backgroundImage : 'nPMMobile_Image/mind_Icon.png',
	top : 250,
	width : 100,
	height : 100,
	left : 560
	//	right:200

});

// 모버알 nPM_gantt 버튼 생성
var gantt_Button = Titanium.UI.createButton({

	color : '#000',
	selectedColor : '#fff',
	backgroundImage : 'nPMMobile_Image/gantt_Icon.png',
	top : 430,
	width : 100,
	height : 100,
	left : 80
	//	right:200

});

// 모버알 nPM_source 버튼 생성
var source_Button = Titanium.UI.createButton({

	color : '#000',
	selectedColor : '#fff',
	backgroundImage : 'nPMMobile_Image/source_Icon.png',
	top : 430,
	width : 100,
	height : 100,
	left : 310

});

// 모버알 nPM_board 버튼 생성
var board_Button = Titanium.UI.createButton({

	color : '#000',
	selectedColor : '#fff',
	backgroundImage : 'nPMMobile_Image/board_Icon.png',
	top : 430,
	width : 100,
	height : 100,
	left : 560,

});

// 모버알 nPM_page 버튼 생성
var page_Button = Titanium.UI.createButton({
	color : '#000',
	selectedColor : '#fff',
	backgroundImage : 'nPMMobile_Image/page_Icon.png',
	top : 610,
	width : 100,
	height : 100,
	left : 80

});

// 모버알 nPM_alarm 버튼 생성
var alarm_Button = Titanium.UI.createButton({
	color : '#000',
	selectedColor : '#fff',
	backgroundImage : 'nPMMobile_Image/alarm_Icon.png',
	top : 610,
	width : 100,
	height : 100,
	left : 310

});

// 모버알 nPM_introduce 버튼 생성
var introduce_Button = Titanium.UI.createButton({
	color : '#000',
	selectedColor : '#fff',
	backgroundImage : 'nPMMobile_Image/nPM_Logo.png',
	top : 610,
	width : 100,
	height : 100,
	left : 560

});

// 모버알 nPM_alarm 이미지 생성
var alarm_Image = Titanium.UI.createImageView({

	top : 0, // 이미지 생성 위치
	width : 'auto',
	image : 'nPMMobile_Image/alarm_Image.png' // 이미지 삽입

});

// 모버알 nPM_introduce 이미지 생성
var introduce_Image = Titanium.UI.createImageView({

	top : 0,
	width : 'auto',
	//	height:630,
	image : 'nPMMobile_Image/introduce_Image.png'

});

// ipad용 facebook 만들기

// 모버알 nPM facebook Button 생성
var facebook_Button = Titanium.Facebook.createLoginButton({
	top : 900,
	left : 550,
	style : Ti.Facebook.BUTTON_STYLE_WIDE

});

// 모버알 nPM Label 생성
var nPM_Label = Titanium.UI.createLabel({
	color : '#999', // Label 색깔 지정
	text : 'nPM', // Label 이름 지정
	font : {
		fontSize : 25,
		fontFamily : 'Helvetica Neuw'
	}, // Label font 지정
	left : 105, // Label 왼쪽 위치 지정
	top : 355, // Label 위쪽 위치 지정
	width : 'auto' // Label 너비 자동 지정
});

// 모버알 nPM_project Label 생성
var project_Label = Titanium.UI.createLabel({
	color : '#999',
	text : '프로젝트 관리',
	font : {
		fontSize : 25,
		fontFamily : 'Helvetica Neuw'
	},
	left : 302,
	top : 355,
	width : 'auto'
});

// 모버알 nPM_mindmap Label 생성
var mindmap_Label = Titanium.UI.createLabel({
	color : '#999',
	text : '마인드맵',
	font : {
		fontSize : 25,
		fontFamily : 'Helvetica Neuw'
	},
	left : 565,
	top : 355,
	width : 'auto'
});

// 모버알 nPM_gantt Label 생성
var gantt_Label = Titanium.UI.createLabel({
	color : '#999',
	text : '간트차트',
	font : {
		fontSize : 25,
		fontFamily : 'Helvetica Neuw'
	},
	left : 90,
	top : 535,
	width : 'auto'
});

// 모버알 nPM_source Label 생성
var source_Label = Titanium.UI.createLabel({
	color : '#999',
	text : '소스관리',
	font : {
		fontSize : 25,
		fontFamily : 'Helvetica Neuw'
	},
	left : 318,
	top : 535,
	width : 'auto'
});

// 모버알 nPM_board Label 생성
var board_Label = Titanium.UI.createLabel({
	color : '#999',
	text : '게시판',
	font : {
		fontSize : 25,
		fontFamily : 'Helvetica Neuw'
	},
	left : 580,
	top : 535,
	width : 'auto'
});

// 모버알 nPM_page Label 생성
var page_Label = Titanium.UI.createLabel({
	color : '#999',
	text : '내페이지',
	font : {
		fontSize : 25,
		fontFamily : 'Helvetica Neuw'
	},
	left : 87,
	top : 715,
	width : 'auto'
});

// 모버알 nPM_alarm Label 생성
var alarm_Label = Titanium.UI.createLabel({
	color : '#999',
	text : 'nPM 공지사항',
	font : {
		fontSize : 25,
		fontFamily : 'Helvetica Neuw'
	},
	left : 290,
	top : 715,
	width : 'auto'
});

// 모버알 nPM_introduce Label 생성
var introduce_Label = Titanium.UI.createLabel({
	color : '#999',
	text : 'nPM 소개',
	font : {
		fontSize : 25,
		fontFamily : 'Helvetica Neuw'
	},
	left : 572,
	top : 715,
	width : 'auto'
});





Titanium.Facebook.appid = "195974147201995";
Titanium.Facebook.permissions = ['publish_stream', 'read_stream','email'];
Ti.Facebook.addEventListener('login', function(e) {
	
	
	   
        if(Titanium.Facebook.loggedIn)
        {
            Titanium.Facebook.requestWithGraphPath('me', {}, 'GET', function(e) {
                var userInfo = JSON.parse(e.result);
                alert(userInfo.id);
            });
        }   
});

/*
	if (e.success) {//  login이 성공적이라
		
		alert('logged in)');
	}else if(e.error){
		alert(e.error);
	}else if(e.cancelled){
		alert("cancle");
	}
	
});
Ti.Facebook.authorize();
	
*/


/* 
var myButton = Ti.UI.createButton({
  backgroundImage:'my_button_image.png',
  width:100,
  height:30
});
 
win.add(myButton);
 
myButton.addEventListener('click', function() {
  Titanium.Facebook.authorize();
});




*/







/*
// 생성한 facebook app id등록
Ti.Facebook.appid = '195974147201995';
// facebook login 시 접근권한 부여
Ti.Facebook.permissions = ['publish_stream', 'read_stream', "user_checkins", "publish_checkins", 'create_event'];

// facebook_login 버튼 클릭시 이벤트 발생
Ti.Facebook.addEventListener('login', function(e) {

	

	if (e.success) {//  login이 성공적이라
		alert('Logged In');
		facebook_Logincheck = true;
		Titanium.App.Properties.setBool("enableFacebook", true);

		var fbToken = Ti.Facebook.accessToken;
		var fbUid_r = Ti.Facebook.uid;
		// 사용자의 id를 저장하는 변수

		var fbUid_r = Ti.UI.createTextField({
			top : 300,
			height : 200,
			width : 200,
			value : 1,
			textAlign : 'center',
			font : {
				fontSize : 40,
				fontStyle : 'italic'
			},
		});
		
		

	} else if (e.error) {
		alert(e.error);
		Titanium.App.Properties.setBool("enableFacebook", false);
	} else if (e.cancelled) {
		alert("Canceled");
		okBtn = "ok";
		Titanium.App.Properties.setBool("enableFacebook", false);
	}
});

// facebook logout할 때 발생하는 이벤트
Ti.Facebook.addEventListener('logout', function(e) {
	if (e.success) {
		Titanium.App.Properties.setBool("enableFacebook", false);
		alert('Logged Out');
	} else if (e.error) {
		alert(e.error);
	}
});

// facebook_login 함수 설정
function login() {
	Ti.facebook.authorize()
}

// facebook_logout 함수 설정
function logout() {
	Ti.facebook.logout()
}
*/
// nPM_Button 클릭 시 발생하는 이벤트 핸들러
nPM_Button.addEventListener('click', function(e) {
	//	nPM_Homepage.addEventListener('load', function(e){  // nPM_Homepage 연동

	top_View.show();
	nPM_Homepage.show();

	main_Win.add(top_View);
	main_Win.add(nPM_Homepage);
	// main_Win 함수에 등
});
// project_Button 클릭 시 발생하는 이벤트 핸들러
project_Button.addEventListener('click', function(e) {
	/*
	 project_Homepage.addEventListener('load', function(e)
	 {});
	 */
	top_View.show();
	project_Homepage.show();

	main_Win.add(top_View);
	main_Win.add(project_Homepage);
});

// gantt_Button 클릭 시 발생하는 이벤트 핸들러
gantt_Button.addEventListener('click', function(e) {
	/*
	 gantt_Homepage.addEventListener('load', function(e)
	 {});
	 */
	top_View.show();
	main_Win.add(top_View);

	gantt_Homepage.show();
	main_Win.add(gantt_Homepage);
});

// source_Button 클릭 시 발생하는 이벤트 핸들러
source_Button.addEventListener('click', function(e) {
	/*
	 github_Homepage.addEventListener('load', function(e)
	 {});
	 */
	top_View.show();
	main_Win.add(top_View);

	github_Homepage.show();
	main_Win.add(github_Homepage);
});

// board_Button 클릭 시 발생하는 이벤트 핸들러
board_Button.addEventListener('click', function(e) {
	/*
	 board_Homepage.addEventListener('load', function(e)
	 {});
	 */

	top_View.show();
	main_Win.add(top_View);

	board_Homepage.show();
	main_Win.add(board_Homepage);
});


var pageInit = function() {
	
	if(facebook_Logincheck == true)
	{
		alert("facebook 로그인 하세요");
		return;
		
	}
	
	else
	{
		
	

		var image_View = Ti.UI.createView({
	
		backgroundColor : '#808080',
		top : 80,
		backgroundImage : 'nPMMobile_Image/page_Icon.png',
		height:400,
		width : 'auto'
	
		});
	
		var profile = Ti.UI.createLabel({
	
			color : '#ffffff',
			text : '프로필',
			font : {
				fontSize : 28,
				fontFamily : 'Helvetica Neuw'
			},
			left : 100,
			top : 18,	
			width : 'auto'
	
		});

		var profile_down = Ti.UI.createLabel({
	
			color : '#ffffff',
			text : '_________________________________________________',
			font : {
				fontSize : 28,
				fontFamily : 'Helvetica Neuw'
			},
			left : 0,
			top : 40,
			width : 'auto'
	
		});
	
		var name = Ti.UI.createLabel({
		
			color : '#ffffff',
			text : '이름 : ',
			font : {
			fontSize : 23,
			fontFamily : 'Helvetica Neuw'
			},
			left : 100,
			top : 100,
			width : 'auto'
	
		});
	
		var birth = Ti.UI.createLabel({
		
			color : '#ffffff',
			text : '생년월일 : ',
			font : {
				fontSize : 23,
				fontFamily : 'Helvetica Neuw'
			},
			left : 100,
			top : 160,
			width : 'auto'
	
		});
	
		var mail = Ti.UI.createLabel({
		
			color : '#ffffff',
			text : '연락처 : ',
			font : {
				fontSize : 23,
				fontFamily : 'Helvetica Neuw'
			},
			left : 100,
			top : 220,
			width : 'auto'
	
		});
	
		var job = Ti.UI.createLabel({
			
			color : '#ffffff',
			text : '직업 : ',
			font : {
				fontSize : 23,
				fontFamily : 'Helvetica Neuw'
			},	
			left : 100,
			top : 280,
			width : 'auto'
	
		});
	
		var  speck = Ti.UI.createLabel({
	
			color : '#ffffff',
			text : '경력 :   nPM 프로젝트,   ezTrans 프로젝트',
			font : {
				fontSize : 23,
				fontFamily : 'Helvetica Neuw'
			},
			left : 100,
			top : 340,
			width : 'auto'
	
		});

	
		var bottom_View = Ti.UI.createView({
	
			backgroundColor : '#00ced1',
			top : 480,
		//	backgroundImage : 'nPMMobile_Image/page_Icon.png',
			width : 'auto'
	
		});
	}
	
	
		bottom_View.add(name);
		bottom_View.add(birth);
		bottom_View.add(mail);
		bottom_View.add(job);
		bottom_View.add(speck);
		bottom_View.add(profile_down);
	
		bottom_View.add(profile);
		bottom_View.add(profile_down);
		page_Mainview.add(bottom_View);
		page_Mainview.add(back_Home);
	//	page_Mainview.add(top_button);
		page_Mainview.add(image_View);
		main_Win.add(page_Mainview);
	
	
};

// page_Button 클릭 시 발생하는 이벤트 핸들러
page_Button.addEventListener('click', function(e) {
	/*
	 page_Homepage.addEventListener('load', function(e)
	 {});
	 */
//	top_View.show();
//	main_Win.add(top_View);

//	page_Homepage.show();
//	main_Win.add(page_Homepage);

	pageInit();

	page_Mainview.show();
	
});

// alarm_Button 클릭 시 발생하는 이벤트 핸들러
alarm_Button.addEventListener('click', function(e) {

	var winAlarm = Titanium.UI.createWindow();
	// 새로운 window 생성
	var btnBack = Titanium.UI.createButton({// main_Win으로 돌아가기 위한 버튼 생성

		top : 900,
		title : '뒤로',
		width : 60,
		height : 'auto',
		right : 2
	});

	winAlarm.open();
	// 새로운 window 보여
	//	alarmBottom_View.add(btnBack);  // 새로운 window에 btnBack button 추가
	winAlarm.add(alarm_Image);
	alarm_Image.add(btnBack);
	//	winAlarm.add(alarmBottom_View);

	btnBack.addEventListener('click', function(e)// btnBack button 클릭하면
	{
		winAlarm.close();
		// 새로운 window 닫힘
		main_Win.open();
		// main_Win으로 돌아감
	});

});

// introduce_Button 클릭 시 발생하는 이벤트 핸들러
introduce_Button.addEventListener('click', function(e) {

	var winExplain = Titanium.UI.createWindow();

	var btnBack = Titanium.UI.createButton({

		top : 12,
		title : '뒤로',
		width : 40,
		height : 'auto',
		right : 10
	});

	winExplain.open();
	//	introduceBottom_View.add(btnBack);
	introduce_Image.add(btnBack);

	winExplain.add(introduce_Image);
	//	winExplain.add(introduceBottom_View);

	btnBack.addEventListener('click', function(e) {
		winExplain.close();
		main_Win.open();
	});

});

// main_Win에 버튼 추가
//main_Win.add(top_button);
main_Win.add(nPM_Button);
main_Win.add(project_Button);
main_Win.add(mindmap_Button);
main_Win.add(gantt_Button);
main_Win.add(source_Button);
main_Win.add(board_Button);
main_Win.add(page_Button);
main_Win.add(alarm_Button);
main_Win.add(introduce_Button);
main_Win.add(facebook_Button);

// main_Win에 Label 추가
main_Win.add(nPM_Label);
main_Win.add(project_Label);
main_Win.add(mindmap_Label);
main_Win.add(gantt_Label);
main_Win.add(source_Label);
main_Win.add(board_Label);
main_Win.add(page_Label);
main_Win.add(alarm_Label);
main_Win.add(introduce_Label);

// 생성한 main_Win 시뮬레이터에 등록
main_Win.open();

///////////////////////////////////////////////////////// 마인드 맵 ////////////////////////////////////////////////////////////

// 마인드맵을 위한 새로운 window를 생성
var mindmap_Win = Titanium.UI.createWindow();

mindmap_Win.setBackgroundImage('nPMMobile_Image/mindmap_Background.png');

// mindmap_Button을 누르면 이벤트 핸들러가 동작한다.
mindmap_Button.addEventListener('click', function(e)// mind 버튼 클릭하였을 때
{
	//	main_Win.close();
	mindmap_Win.open();
	// mindmap_Win 보여준다.
	mindMapInit();
	// mindMapInit()를 호출

});

var mindviewMiddle = Titanium.UI.createView({// 새로운 window에 view설정

	backgroundColor : '#cacaca', // view 배경색깔
	top : 0, // view 배경위
	width : 'auto', // view 너비
	backgroundImage : 'nPMMobile_Image/mindmap_Background.png' // view배경 이미지
});

var checkHeight = 135;
var numOftext = 0;
var scopeData = 0;
var checkLine = 0;

var saveContent = "";

//서블릿 주소
var servletAddr = 'http://solar4.ssu.ac.kr:8080/mobileServlet';

// 디비에 저장되어 있는 mindmap node(부모노드, 자식노드)호출하는 함수
var mindMapInit = function() {
	
	var scrollview = Ti.UI.createScrollView({
		contentWidth:'auto,',
		contentHeight:'auto',
		showHorizontalScrollIndicator:true,
		showVerticalScrollIndicator:true,
		backgroundImage : 'nPMMobile_Image/mindmap_Background.png'
		
		
	});

	// 서버로부터 data를 가져오기 위한 작업
	var param = "action=init";
	var xhr = Ti.Network.createHTTPClient();

	xhr.open("POST", servletAddr);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
	xhr.setRequestHeader("Cache-Control", "no-cache, must-revalidate");
	xhr.setRequestHeader("Pragma", "no-cache");
	xhr.send(param);
	xhr.onload = function() {
		var doc = this.responseXML.documentElement;
		// 서버가 sml 문자 받음
		var id = doc.getElementsByTagName('id');

		// 새로운 node 생성시 나타날 위치 저장 변수
		var height = 120;
		// var check_side=68;
		var check_side = 100;
		//	var check_height=135;
		var check_height = 150;
		//	var plus_side=225;
		var plus_side = 230;
		var node_Count = 0;
		var height_Count = 0;
		var upgrade_count = 0;

		var circleSize = 130;
		var circleX = 120;
		var circleY = 0;
		
		var num = 0;
		var num2 = 0;

		var label = Titanium.UI.createLabel({
			text : 'Click circle repeatedly to animate or drag the circle',
			bottom : 10,
			color : '#555',
			font : {
				fontSize : 12,
				fontFamily : 'Helvetica Neue'
			},
			textAlign : 'center',
			height : 'auto',
			width : 'auto'
		});

		//id의 개수에 따라 파싱 시작
		for (var i = 0; i < id.length; i++) {
			var currentItem = id.item(i);
			var mytext = currentItem.getElementsByTagName('mytext').item(0).text;
			var mynumber = currentItem.getElementsByTagName('number').item(0).text;
			

			num = i;
			num2 = i;
			
			
			
			switch(i)
			{
				case 0:
				var circle1= Titanium.UI.createView({
				height : circleSize,
				width : circleSize,
				anchorPoint : {
					x : (circleSize / 2),
					y : (circleSize / 2)
				},
				borderRadius : (circleSize / 2),
				backgroundColor : '#336699',
				opacity : 0.3,
				left : check_side + node_Count * plus_side,
				top : check_height + height
				});
				
				var circle2=Titanium.UI.createView({
					height : circleSize,
					width : circleSize,
					anchorPoint : {
						x : (circleSize / 2),
						y : (circleSize / 2)
						},
					borderRadius : (circleSize / 2),
					backgroundColor : '#e6e6fa',
					top : check_height + height,
					left : check_side + node_Count * plus_side
					});
							
					circle2.addEventListener('touchmove', function(e)
					{
						circle1.setTop(e.y + circleY - (circleSize/2));
						circle1.setLeft(e.x + circleX - (circleSize/2));
                    });
                                 
                    circle2.addEventListener('touchend', function(e)
                    {
                    	circleY = circle1.getTop();
                    	circleX = circle1.getLeft();
                    	
                    	circle2.setTop(circle1.getTop());
                    	circle2.setLeft(circle1.getLeft());
                    });
                    
                    circle1.addEventListener('touchmove', function(e)
                    {
                    	label.setLeft(e.x);
                    	label.setTop(e.y);
                    });
 
 				// 버튼 생성 및 버튼 속성 초기화
					var parentNode_Button = Ti.UI.createButton({

						color : '#000',
						//	top:check_height + height,
						top : 40,
						objName : mynumber,
						title : mytext,
						width : 120,
						height : 50,
						
					});

					circle1.add(parentNode_Button);
					circle2.add(parentNode_Button);
					//		mindviewMiddle.add(parentNode_Button);

					// mind 버튼 클릭하였을 때 이벤트 핸들러 호출
					parentNode_Button.addEventListener('click', function(e) {

						saveContent = this.title + "  -->  "// 현재 클릭한 노드의 이름 저장
						mindmapAdd(this.objName, this.title);
						// mindmapAdd 함수 호출
					});
					
					scrollview.add(circle1);
					scrollview.add(circle2);
					
				
			//	    mindmap_Win.add(circle1);
			//	    mindmap_Win.add(circle2);
				    break;
				    
				    case 1:
				    
				    var circleX1 = 120;
		            var circleY1 = 0;
				    plus_side++;
				    
				    
				    var circle3= Titanium.UI.createView({
				    	height : circleSize,
				    	width : circleSize,
				    	anchorPoint : {
				    		x : (circleSize / 2),
				    		y : (circleSize / 2)
				    		},
				    	borderRadius : (circleSize / 2),
				    	backgroundColor : '#336699',
				    	opacity : 0.3,
				    	left : check_side + 230,
				    	top : check_height + height
				    	});
				    	
				    var circle4=Titanium.UI.createView({
				    	height : circleSize,
				    	width : circleSize,
				    	anchorPoint : {
				    		x : (circleSize / 2),
				    		y : (circleSize / 2)
						},
						borderRadius : (circleSize / 2),
						backgroundColor : '#e6e6fa',
						
						top : check_height + height,
						left : check_side + 230
						});
						
						circle4.addEventListener('touchmove', function(e)
						{
							
							circle3.setTop(e.y + circleY1 - (circleSize/2));
							circle3.setLeft(e.x + circleX1 - (circleSize/2));
						});
						
						circle4.addEventListener('touchend', function(e)
						{	
                  		  	circleY1 = circle3.getTop();
                    		circleX1 = circle3.getLeft();
                    	
                   		 	circle4.setTop(circle3.getTop());
                   		 	circle4.setLeft(circle3.getLeft());
                   		 });
                    
                 	   circle3.addEventListener('touchmove', function(e)
                   		 {
                  		  	label.setLeft(e.x);
                    		label.setTop(e.y);	
                   		 });
 
 				// 버튼 생성 및 버튼 속성 초기화
					var parentNode_Button = Ti.UI.createButton({

						color : '#000',
						//	top:check_height + height,
						top : 40,
						objName : mynumber,
						title : mytext,
						width : 120,
						height : 50,
						
					});

					circle3.add(parentNode_Button);
					circle4.add(parentNode_Button);
					//		mindviewMiddle.add(parentNode_Button);

					// mind 버튼 클릭하였을 때 이벤트 핸들러 호출
					parentNode_Button.addEventListener('click', function(e) {

						saveContent = this.title + "  -->  "// 현재 클릭한 노드의 이름 저장
						mindmapAdd(this.objName, this.title);
						// mindmapAdd 함수 호출
					});
					
					scrollview.add(circle3);
					scrollview.add(circle4);
					
				
				//    mindmap_Win.add(circle3);
				//    mindmap_Win.add(circle4);
				    break;
				    
				    case 2:
				    
				    var circleX2 = 120;
		            var circleY2 = 0;
				    
				    plus_side++;
				    
				    var circle5= Titanium.UI.createView({
				    	height : circleSize,
			    	width : circleSize,
				    	anchorPoint : {
				    		x : (circleSize / 2),
				    		y : (circleSize / 2)
				    		},
				    	borderRadius : (circleSize / 2),
				    	backgroundColor : '#336699',
				    	opacity : 0.3,
				    	left : check_side + 460,
				    	top : check_height + height
				    	});
				    	
				    var circle6=Titanium.UI.createView({
				    	height : circleSize,
				    	width : circleSize,
				    	anchorPoint : {
				    		x : (circleSize / 2),
				    		y : (circleSize / 2)
						},
						borderRadius : (circleSize / 2),
						backgroundColor : '#e6e6fa',
						
						top : check_height + height,
						left : check_side + 460
						});
						
						circle6.addEventListener('touchmove', function(e)
						{
							circle5.setTop(e.y + circleY2 - (circleSize/2));
							circle5.setLeft(e.x + circleX2 - (circleSize/2));
						});
						
						circle6.addEventListener('touchend', function(e)
						{	
                  		  	circleY2 = circle5.getTop();
                    		circleX2 = circle5.getLeft();
                    	
                   		 	circle6.setTop(circle5.getTop());
                   		 	circle6.setLeft(circle5.getLeft());
                   		 });
                    
                 	   circle5.addEventListener('touchmove', function(e)
                   		 {
                  		  	label.setLeft(e.x);
                    		label.setTop(e.y);	
                   		 });
 
 				// 버튼 생성 및 버튼 속성 초기화
					var parentNode_Button = Ti.UI.createButton({

						color : '#000',
						//	top:check_height + height,
						top : 40,
						objName : mynumber,
						title : mytext,
						width : 120,
						height : 50,
						
					});

					circle5.add(parentNode_Button);
					circle6.add(parentNode_Button);
					//		mindviewMiddle.add(parentNode_Button);

					// mind 버튼 클릭하였을 때 이벤트 핸들러 호출
					parentNode_Button.addEventListener('click', function(e) {

						saveContent = this.title + "  -->  "// 현재 클릭한 노드의 이름 저장
						mindmapAdd(this.objName, this.title);
						// mindmapAdd 함수 호출
					});
					
					scrollview.add(circle5);
					scrollview.add(circle6);
					
				
			//	    mindmap_Win.add(circle5);
			//	    mindmap_Win.add(circle6);
				    break;
				    
				    case 3:
				    
				    height_Count=1;
				    plus_side=0;
				    
				    var circleX3 = 120;
		            var circleY3 = 0;
				    
				    var circle7= Titanium.UI.createView({
				    	height : circleSize,
			    	    width : circleSize,
				    	anchorPoint : {
				    		x : (circleSize / 2),
				    		y : (circleSize / 2)
				    		},
				    	borderRadius : (circleSize / 2),
				    	backgroundColor : '#336699',
				    	opacity : 0.3,
				    	left : check_side + node_Count * plus_side,
				    	top : check_height + height_Count*check_height + height
				    	});
				    	
				    var circle8=Titanium.UI.createView({
				    	height : circleSize,
				    	width : circleSize,
				    	anchorPoint : {
				    		x : (circleSize / 2),
				    		y : (circleSize / 2)
						},
						borderRadius : (circleSize / 2),
						backgroundColor : '#e6e6fa',
						
						top : check_height + height_Count*check_height + height,
						left : check_side + node_Count * plus_side
						});
						
						circle8.addEventListener('touchmove', function(e)
						{
							circle7.setTop(e.y + circleY3 - (circleSize/2));
							circle7.setLeft(e.x + circleX3 - (circleSize/2));
						});
						
						circle8.addEventListener('touchend', function(e)
						{	
                  		  	circleY3 = circle7.getTop();
                    		circleX3 = circle7.getLeft();
                    	
                   		 	circle8.setTop(circle7.getTop());
                   		 	circle8.setLeft(circle7.getLeft());
                   		 });
                    
                 	   circle7.addEventListener('touchmove', function(e)
                   		 {
                  		  	label.setLeft(e.x);
                    		label.setTop(e.y);	
                   		 });
 
 				// 버튼 생성 및 버튼 속성 초기화
					var parentNode_Button = Ti.UI.createButton({

						color : '#000',
						//	top:check_height + height,
						top : 40,
						objName : mynumber,
						title : mytext,
						width : 120,
						height : 50,
						
					});

					circle7.add(parentNode_Button);
					circle8.add(parentNode_Button);
					//		mindviewMiddle.add(parentNode_Button);

					// mind 버튼 클릭하였을 때 이벤트 핸들러 호출
					parentNode_Button.addEventListener('click', function(e) {

						saveContent = this.title + "  -->  "// 현재 클릭한 노드의 이름 저장
						mindmapAdd(this.objName, this.title);
						// mindmapAdd 함수 호출
					});
					
					
					scrollview.add(circle7);
					scrollview.add(circle8);
				
			//	    mindmap_Win.add(circle7);
			//	    mindmap_Win.add(circle8);
				    break;
				   
				    
				    case 4:
				    
				    var circleX4 = 120;
		            var circleY4 = 0;
				    
				 
				    
				    var circle9= Titanium.UI.createView({
				    	height : circleSize,
			    	width : circleSize,
				    	anchorPoint : {
				    		x : (circleSize / 2),
				    		y : (circleSize / 2)
				    		},
				    	borderRadius : (circleSize / 2),
				    	backgroundColor : '#336699',
				    	opacity : 0.3,
				    	left : check_side + 230,
				    	top : check_height + height_Count*check_height + height
				    	});
				    	
				    var circle10=Titanium.UI.createView({
				    	height : circleSize,
				    	width : circleSize,
				    	anchorPoint : {
				    		x : (circleSize / 2),
				    		y : (circleSize / 2)
						},
						borderRadius : (circleSize / 2),
						backgroundColor : '#e6e6fa',
						
						top : check_height + height_Count*check_height + height,
						left : check_side + 230
						});
						
						circle10.addEventListener('touchmove', function(e)
						{
							circle9.setTop(e.y + circleY4 - (circleSize/2));
							circle9.setLeft(e.x + circleX4 - (circleSize/2));
						});
						
						circle10.addEventListener('touchend', function(e)
						{	
                  		  	circleY4 = circle9.getTop();
                    		circleX4 = circle9.getLeft();
                    	
                   		 	circle10.setTop(circle9.getTop());
                   		 	circle10.setLeft(circle9.getLeft());
                   		 });
                    
                 	   circle9.addEventListener('touchmove', function(e)
                   		 {
                  		  	label.setLeft(e.x);
                    		label.setTop(e.y);	
                   		 });
 
 				// 버튼 생성 및 버튼 속성 초기화
					var parentNode_Button = Ti.UI.createButton({

						color : '#000',
						//	top:check_height + height,
						top : 40,
						objName : mynumber,
						title : mytext,
						width : 120,
						height : 50,
						
					});

					circle9.add(parentNode_Button);
					circle10.add(parentNode_Button);
					//		mindviewMiddle.add(parentNode_Button);

					// mind 버튼 클릭하였을 때 이벤트 핸들러 호출
					parentNode_Button.addEventListener('click', function(e) {

						saveContent = this.title + "  -->  "// 현재 클릭한 노드의 이름 저장
						mindmapAdd(this.objName, this.title);
						// mindmapAdd 함수 호출
					});
					
				
				
			    	scrollview.add(circle9);
					scrollview.add(circle10);
					
				  //  mindmap_Win.add(circle9);
				  //  mindmap_Win.add(circle10);
				    break;
				   
				    
				    case 5:
				    
				   
				    
				    var circleX5 = 120;
		            var circleY5 = 0;
				    
				   
				    
				    var circle11= Titanium.UI.createView({
				    	height : circleSize,
			    	width : circleSize,
				    	anchorPoint : {
				    		x : (circleSize / 2),
				    		y : (circleSize / 2)
				    		},
				    	borderRadius : (circleSize / 2),
				    	backgroundColor : '#336699',
				    	opacity : 0.3,
				    	left : check_side + 460,
				    	top : check_height + height_Count*check_height + height
				    	});
				    	
				    var circle12=Titanium.UI.createView({
				    	height : circleSize,
				    	width : circleSize,
				    	anchorPoint : {
				    		x : (circleSize / 2),
				    		y : (circleSize / 2)
						},
						borderRadius : (circleSize / 2),
						backgroundColor : '#e6e6fa',
						
						top : check_height + height_Count*check_height + height,
						left : check_side + 460
						});
						
						circle12.addEventListener('touchmove', function(e)
						{
							circle11.setTop(e.y + circleY5 - (circleSize/2));
							circle11.setLeft(e.x + circleX5 - (circleSize/2));
						});
						
						circle12.addEventListener('touchend', function(e)
						{	
                  		  	circleY5 = circle11.getTop();
                    		circleX5 = circle11.getLeft();
                    	
                   		 	circle12.setTop(circle11.getTop());
                   		 	circle12.setLeft(circle11.getLeft());
                   		 });
                    
                 	   circle11.addEventListener('touchmove', function(e)
                   		 {
                  		  	label.setLeft(e.x);
                    		label.setTop(e.y);	
                   		 });
 
 				// 버튼 생성 및 버튼 속성 초기화
					var parentNode_Button = Ti.UI.createButton({

						color : '#000',
						//	top:check_height + height,
						top : 40,
						objName : mynumber,
						title : mytext,
						width : 120,
						height : 50,
						
					});

					circle11.add(parentNode_Button);
					circle12.add(parentNode_Button);
					//		mindviewMiddle.add(parentNode_Button);

					// mind 버튼 클릭하였을 때 이벤트 핸들러 호출
					parentNode_Button.addEventListener('click', function(e) {

						saveContent = this.title + "  -->  "// 현재 클릭한 노드의 이름 저장
						mindmapAdd(this.objName, this.title);
						// mindmapAdd 함수 호출
					});
					
					scrollview.add(circle11);
					scrollview.add(circle12);
				
		//		    mindmap_Win.add(circle11);
		//		    mindmap_Win.add(circle12);
				    break;
				    
				    case 6:
				    
				    
				    
				    var circleX6 = 120;
		            var circleY6 = 0;
				    
				   height_Count=2;
				   node_Count=0;
				    
				    var circle13= Titanium.UI.createView({
				    	height : circleSize,
			    	width : circleSize,
				    	anchorPoint : {
				    		x : (circleSize / 2),
				    		y : (circleSize / 2)
				    		},
				    	borderRadius : (circleSize / 2),
				    	backgroundColor : '#336699',
				    	opacity : 0.3,
				    	left : check_side + node_Count * plus_side,
				    	top : check_height + height_Count*check_height + height 
				    	});
				    	
				    var circle14=Titanium.UI.createView({
				    	height : circleSize,
				    	width : circleSize,
				    	anchorPoint : {
				    		x : (circleSize / 2),
				    		y : (circleSize / 2)
						},
						borderRadius : (circleSize / 2),
						backgroundColor : '#e6e6fa',
						
						top : check_height + height_Count*check_height + height,
						left : check_side + node_Count * plus_side
						});
						
						circle14.addEventListener('touchmove', function(e)
						{
							circle13.setTop(e.y + circleY6 - (circleSize/2));
							circle13.setLeft(e.x + circleX6 - (circleSize/2));
						});
						
						circle14.addEventListener('touchend', function(e)
						{	
                  		  	circleY6 = circle13.getTop();
                    		circleX6 = circle13.getLeft();
                    	
                   		 	circle14.setTop(circle13.getTop());
                   		 	circle14.setLeft(circle13.getLeft());
                   		 });
                    
                 	   circle13.addEventListener('touchmove', function(e)
                   		 {
                  		  	label.setLeft(e.x);
                    		label.setTop(e.y);	
                   		 });
 
 				// 버튼 생성 및 버튼 속성 초기화
					var parentNode_Button = Ti.UI.createButton({

						color : '#000',
						//	top:check_height + height,
						top : 40,
						objName : mynumber,
						title : mytext,
						width : 120,
						height : 50,
						
					});

					circle13.add(parentNode_Button);
					circle14.add(parentNode_Button);
					
					
					//		mindviewMiddle.add(parentNode_Button);

					// mind 버튼 클릭하였을 때 이벤트 핸들러 호출
					parentNode_Button.addEventListener('click', function(e) {

						saveContent = this.title + "  -->  "// 현재 클릭한 노드의 이름 저장
						mindmapAdd(this.objName, this.title);
						// mindmapAdd 함수 호출
					});
					
				
				//    mindmap_Win.add(circle13);
				//    mindmap_Win.add(circle14);
				    
				    scrollview.add(circle13);
					scrollview.add(circle14);
				    break;
				   
				   
				    case 7:
				    
				    
				    var circleX7 = 120;
		            var circleY7 = 0;
				    
				    plus_side++;
				    
				    var circle15= Titanium.UI.createView({
				    	height : circleSize,
			    	width : circleSize,
				    	anchorPoint : {
				    		x : (circleSize / 2),
				    		y : (circleSize / 2)
				    		},
				    	borderRadius : (circleSize / 2),
				    	backgroundColor : '#336699',
				    	opacity : 0.3,
				    	left : check_side + 230,
				    	top : check_height + height_Count*check_height + height 
				    	});
				    	
				    var circle16=Titanium.UI.createView({
				    	height : circleSize,
				    	width : circleSize,
				    	anchorPoint : {
				    		x : (circleSize / 2),
				    		y : (circleSize / 2)
						},
						borderRadius : (circleSize / 2),
						backgroundColor : '#e6e6fa',
						
						top : check_height + height_Count*check_height + height ,
						left : check_side + 230
						});
						
						circle16.addEventListener('touchmove', function(e)
						{
							circle15.setTop(e.y + circleY7 - (circleSize/2));
							circle15.setLeft(e.x + circleX7 - (circleSize/2));
						});
						
						circle16.addEventListener('touchend', function(e)
						{	
                  		  	circleY7 = circle15.getTop();
                    		circleX7 = circle15.getLeft();
                    	
                   		 	circle16.setTop(circle15.getTop());
                   		 	circle16.setLeft(circle15.getLeft());
                   		 });
                    
                 	   circle15.addEventListener('touchmove', function(e)
                   		 {
                  		  	label.setLeft(e.x);
                    		label.setTop(e.y);	
                   		 });
 
 				// 버튼 생성 및 버튼 속성 초기화
					var parentNode_Button = Ti.UI.createButton({

						color : '#000',
						//	top:check_height + height,
						top : 40,
						objName : mynumber,
						title : mytext,
						width : 120,
						height : 50,
						
					});

					circle15.add(parentNode_Button);
					circle16.add(parentNode_Button);
					//		mindviewMiddle.add(parentNode_Button);

					// mind 버튼 클릭하였을 때 이벤트 핸들러 호출
					parentNode_Button.addEventListener('click', function(e) {

						saveContent = this.title + "  -->  "// 현재 클릭한 노드의 이름 저장
						mindmapAdd(this.objName, this.title);
						// mindmapAdd 함수 호출
					});
					
					scrollview.add(circle15);
					scrollview.add(circle16);
				
				//    mindmap_Win.add(circle15);
				//    mindmap_Win.add(circle16);
				    break;
				   
				   
				    case 8:
				   			    
				    var circleX17 = 120;
		            var circleY18 = 0;
				    
				    plus_side++;
				    
				    var circle17= Titanium.UI.createView({
				    	height : circleSize,
			    	width : circleSize,
				    	anchorPoint : {
				    		x : (circleSize / 2),
				    		y : (circleSize / 2)
				    		},
				    	borderRadius : (circleSize / 2),
				    	backgroundColor : '#336699',
				    	opacity : 0.3,
				    	left : check_side + 460,
				    	top : check_height + height_Count*check_height + height 
				    	});
				    	
				    var circle18=Titanium.UI.createView({
				    	height : circleSize,
				    	width : circleSize,
				    	anchorPoint : {
				    		x : (circleSize / 2),
				    		y : (circleSize / 2)
						},
						borderRadius : (circleSize / 2),
						backgroundColor : '#e6e6fa',
						
						top : check_height + height_Count*check_height + height ,
						left : check_side + 460
						});
						
						circle18.addEventListener('touchmove', function(e)
						{
							circle17.setTop(e.y + circleY8 - (circleSize/2));
							circle17.setLeft(e.x + circleX8 - (circleSize/2));
						});
						
						circle18.addEventListener('touchend', function(e)
						{	
                  		  	circleY8 = circle17.getTop();
                    		circleX8 = circle17.getLeft();
                    	
                   		 	circle18.setTop(circle17.getTop());
                   		 	circle18.setLeft(circle17.getLeft());
                   		 });
                    
                 	   circle17.addEventListener('touchmove', function(e)
                   		 {
                  		  	label.setLeft(e.x);
                    		label.setTop(e.y);	
                   		 });
 
 				// 버튼 생성 및 버튼 속성 초기화
					var parentNode_Button = Ti.UI.createButton({

						color : '#000',
						//	top:check_height + height,
						top : 40,
						objName : mynumber,
						title : mytext,
						width : 120,
						height : 50,
						
					});

					circle17.add(parentNode_Button);
					circle18.add(parentNode_Button);
					//		mindviewMiddle.add(parentNode_Button);

					// mind 버튼 클릭하였을 때 이벤트 핸들러 호출
					parentNode_Button.addEventListener('click', function(e) {

						saveContent = this.title + "  -->  "// 현재 클릭한 노드의 이름 저장
						mindmapAdd(this.objName, this.title);
						// mindmapAdd 함수 호출
					});
					
					scrollview.add(circle17);
					scrollview.add(circle18);
					
				
				//    mindmap_Win.add(circle17);
				//    mindmap_Win.add(circle18);
				    break;
				   				   
				    case 9:
				    
				    var circleX9 = 120;
		            var circleY9 = 0;
				    height_Count=3;
				    
				    
				    var circle19= Titanium.UI.createView({
				    	height : circleSize,
			    	width : circleSize,
				    	anchorPoint : {
				    		x : (circleSize / 2),
				    		y : (circleSize / 2)
				    		},
				    	borderRadius : (circleSize / 2),
				    	backgroundColor : '#336699',
				    	opacity : 0.3,
				    	left : check_side ,
				    	top : check_height + height_Count*check_height + height 
				    	});
				    	
				    var circle20=Titanium.UI.createView({
				    	height : circleSize,
				    	width : circleSize,
				    	anchorPoint : {
				    		x : (circleSize / 2),
				    		y : (circleSize / 2)
						},
						borderRadius : (circleSize / 2),
						backgroundColor : '#e6e6fa',
						
						top : check_height + height_Count*check_height + height ,
						left : check_side 
						});
						
						circle20.addEventListener('touchmove', function(e)
						{
							circle19.setTop(e.y + circleY9 - (circleSize/2));
							circle19.setLeft(e.x + circleX9 - (circleSize/2));
						});
						
						circle20.addEventListener('touchend', function(e)
						{	
                  		  	circleY9 = circle19.getTop();
                    		circleX9 = circle19.getLeft();
                    	
                   		 	circle20.setTop(circle19.getTop());
                   		 	circle20.setLeft(circle19.getLeft());
                   		 });
                    
                 	   circle19.addEventListener('touchmove', function(e)
                   		 {
                  		  	label.setLeft(e.x);
                    		label.setTop(e.y);	
                   		 });
 
 				// 버튼 생성 및 버튼 속성 초기화
					var parentNode_Button = Ti.UI.createButton({

						color : '#000',
						//	top:check_height + height,
						top : 40,
						objName : mynumber,
						title : mytext,
						width : 120,
						height : 50,
						
					});

					circle19.add(parentNode_Button);
					circle20.add(parentNode_Button);
					//		mindviewMiddle.add(parentNode_Button);

					// mind 버튼 클릭하였을 때 이벤트 핸들러 호출
					parentNode_Button.addEventListener('click', function(e) {

						saveContent = this.title + "  -->  "// 현재 클릭한 노드의 이름 저장
						mindmapAdd(this.objName, this.title);
						// mindmapAdd 함수 호출
					});
					
					scrollview.add(circle19);
					scrollview.add(circle20);
					
				
			//	    mindmap_Win.add(circle19);
			//	    mindmap_Win.add(circle20);
				    break;
				   
				   
				    case 10:
				    
				    
				    var circleX10 = 120;
		            var circleY10 = 0;
				    
				    var circle21= Titanium.UI.createView({
				    	height : circleSize,
			    	width : circleSize,
				    	anchorPoint : {
				    		x : (circleSize / 2),
				    		y : (circleSize / 2)
				    		},
				    	borderRadius : (circleSize / 2),
				    	backgroundColor : '#336699',
				    	opacity : 0.3,
				    	left : check_side + 230,
				    	top : check_height + height_Count*check_height + height 
				    	});
				    	
				    var circle22=Titanium.UI.createView({
				    	height : circleSize,
				    	width : circleSize,
				    	anchorPoint : {
				    		x : (circleSize / 2),
				    		y : (circleSize / 2)
						},
						borderRadius : (circleSize / 2),
						backgroundColor : '#e6e6fa',
						
						top : check_height + height_Count*check_height + height ,
						left : check_side + 230
						});
						
						circle22.addEventListener('touchmove', function(e)
						{
							circle21.setTop(e.y + circleY10 - (circleSize/2));
							circle21.setLeft(e.x + circleX10 - (circleSize/2));
						});
						
						circle22.addEventListener('touchend', function(e)
						{	
                  		  	circleY10 = circle21.getTop();
                    		circleX10 = circle21.getLeft();
                    	
                   		 	circle22.setTop(circle21.getTop());
                   		 	circle22.setLeft(circle21.getLeft());
                   		 });
                    
                 	   circle21.addEventListener('touchmove', function(e)
                   		 {
                  		  	label.setLeft(e.x);
                    		label.setTop(e.y);	
                   		 });
 
 				// 버튼 생성 및 버튼 속성 초기화
					var parentNode_Button = Ti.UI.createButton({

						color : '#000',
						//	top:check_height + height,
						top : 40,
						objName : mynumber,
						title : mytext,
						width : 120,
						height : 50,
						
					});

					circle21.add(parentNode_Button);
					circle22.add(parentNode_Button);
					//		mindviewMiddle.add(parentNode_Button);

					// mind 버튼 클릭하였을 때 이벤트 핸들러 호출
					parentNode_Button.addEventListener('click', function(e) {

						saveContent = this.title + "  -->  "// 현재 클릭한 노드의 이름 저장
						mindmapAdd(this.objName, this.title);
						// mindmapAdd 함수 호출
					});
					
					
					scrollview.add(circle21);
					scrollview.add(circle22);
				
			//	    mindmap_Win.add(circle21);
			//	    mindmap_Win.add(circle22);
				    break;
				  
				    
				    case 11:
				    
				    
				    var circleX11 = 120;
		            var circleY11 = 0;
				    
				     
				    var circle23= Titanium.UI.createView({
				    	height : circleSize,
			    	width : circleSize,
				    	anchorPoint : {
				    		x : (circleSize / 2),
				    		y : (circleSize / 2)
				    		},
				    	borderRadius : (circleSize / 2),
				    	backgroundColor : '#336699',
				    	opacity : 0.3,
				    	left : check_side + 460,
				    	top : check_height + height_Count*check_height + height
				    	});
				    	
				    var circle24=Titanium.UI.createView({
				    	height : circleSize,
				    	width : circleSize,
				    	anchorPoint : {
				    		x : (circleSize / 2),
				    		y : (circleSize / 2)
						},
						borderRadius : (circleSize / 2),
						backgroundColor : '#e6e6fa',
						
						top : check_height + height_Count*check_height + height,
						left : check_side + 460
						});
						
						circle24.addEventListener('touchmove', function(e)
						{
							circle23.setTop(e.y + circleY11 - (circleSize/2));
							circle23.setLeft(e.x + circleX11 - (circleSize/2));
						});
						
						circle24.addEventListener('touchend', function(e)
						{	
                  		  	circleY11 = circle23.getTop();
                    		circleX11 = circle23.getLeft();
                    	
                   		 	circle24.setTop(circle23.getTop());
                   		 	circle24.setLeft(circle23.getLeft());
                   		 });
                    
                 	   circle23.addEventListener('touchmove', function(e)
                   		 {
                  		  	label.setLeft(e.x);
                    		label.setTop(e.y);	
                   		 });
 
 				// 버튼 생성 및 버튼 속성 초기화
					var parentNode_Button = Ti.UI.createButton({

						color : '#000',
						//	top:check_height + height,
						top : 40,
						objName : mynumber,
						title : mytext,
						width : 120,
						height : 50,
						
					});

					circle23.add(parentNode_Button);
					circle24.add(parentNode_Button);
					//		mindviewMiddle.add(parentNode_Button);

					// mind 버튼 클릭하였을 때 이벤트 핸들러 호출
					parentNode_Button.addEventListener('click', function(e) {

						saveContent = this.title + "  -->  "// 현재 클릭한 노드의 이름 저장
						mindmapAdd(this.objName, this.title);
						// mindmapAdd 함수 호출
					});
					
					scrollview.add(circle23);
					scrollview.add(circle24);
					
				
		//		    mindmap_Win.add(circle23);
		//		    mindmap_Win.add(circle24);
				    break;
				   
				   
				    case 12:
				   
				   height_Count=4;
				    
				    var circleX12 = 120;
		            var circleY12 = 0;
				    
				    plus_side++;
				    
				    var circle25= Titanium.UI.createView({
				    	height : circleSize,
			    	width : circleSize,
				    	anchorPoint : {
				    		x : (circleSize / 2),
				    		y : (circleSize / 2)
				    		},
				    	borderRadius : (circleSize / 2),
				    	backgroundColor : '#336699',
				    	opacity : 0.3,
				    	left : check_side ,
				    	top : check_height + height_Count*check_height + height
				    	});
				    	
				    var circle26=Titanium.UI.createView({
				    	height : circleSize,
				    	width : circleSize,
				    	anchorPoint : {
				    		x : (circleSize / 2),
				    		y : (circleSize / 2)
						},
						borderRadius : (circleSize / 2),
						backgroundColor : '#e6e6fa',
						
						top : check_height + height_Count*check_height + height,
						left : check_side 
						});
						
						circle26.addEventListener('touchmove', function(e)
						{
							circle25.setTop(e.y + circleY12 - (circleSize/2));
							circle25.setLeft(e.x + circleX12 - (circleSize/2));
						});
						
						circle26.addEventListener('touchend', function(e)
						{	
                  		  	circleY12 = circle25.getTop();
                    		circleX12 = circle25.getLeft();
                    	
                   		 	circle26.setTop(circle25.getTop());
                   		 	circle26.setLeft(circle25.getLeft());
                   		 });
                    
                 	   circle25.addEventListener('touchmove', function(e)
                   		 {
                  		  	label.setLeft(e.x);
                    		label.setTop(e.y);	
                   		 });
 
 				// 버튼 생성 및 버튼 속성 초기화
					var parentNode_Button = Ti.UI.createButton({

						color : '#000',
						//	top:check_height + height,
						top : 40,
						objName : mynumber,
						title : mytext,
						width : 120,
						height : 50,
						
					});

					circle25.add(parentNode_Button);
					circle26.add(parentNode_Button);
					//		mindviewMiddle.add(parentNode_Button);

					// mind 버튼 클릭하였을 때 이벤트 핸들러 호출
					parentNode_Button.addEventListener('click', function(e) {

						saveContent = this.title + "  -->  "// 현재 클릭한 노드의 이름 저장
						mindmapAdd(this.objName, this.title);
						// mindmapAdd 함수 호출
					});
					
					scrollview.add(circle25);
					scrollview.add(circle26);
					
				
			//	    mindmap_Win.add(circle25);
			//	    mindmap_Win.add(circle26);
				    break;
				   
				  }
				  
			    		
		
		}
		
		// 버튼 생성 및 속성 초기화
		var useMind = Ti.UI.createButton({
			top : 47,
			title : '설명',
			width : 40,
			height : 'auto',
			right : 45
		});

		// 버튼 생성 및 속성 초기화
		var btnBack = Titanium.UI.createButton({

			title : '뒤로',
			width : 40,
			height : 'auto',
			right : 2,
			top : 47

		});

		// 설명 버튼에 이벤트 핸들러 부여
		useMind.addEventListener('click', function(e) {
			alert('원하는 노드를 클릭하세요!');
		});

		// 뒤오 버튼에 이벤트 핸들러 부여
		btnBack.addEventListener('click', function(e) {
			mindmap_Win.close();
			main_Win.open();
			
			circle1.hide();
			/*
			circle2.hide();
			circle3.hide();
			circle4.hide();
			circle5.hide();
			circle6.hide();
			circle7.hide();
			circle8.hide();
			circle9.hide();
			circle10.hide();
			circle11.hide();
			circle12.hide();
			circle13.hide();
			circle14.hide();
			circle15.hide();
			circle16.hide();
			circle17.hide();
			circle18.hide();
			circle19.hide();
			circle20.hide();
			circle21.hide();
			circle22.hide();
			circle23.hide();
			circle24.hide();
			circle25.hide();
			circle26.hide();
			circle27.hide();
			circle28.hide();
			*/
				
			});
		
		
//		 mindmap_Win.add(btnBack);
	//	 mindmap_Win.add(useMind);
	//	 mindmap_Win.add(label);
	     scrollview.add(btnBack);
	     scrollview.add(useMind);
	     scrollview.add(label);  
		 mindmap_Win.add(scrollview);

		 
	}
	//	mindmap_Win.add(mindviewMiddle);
};

//자식노드를 클릭하였을 때의 새로운 window
var mindmapAdd = function(parentnumber, parenttext) {// 클릭했을 때 새로운 페이지 만드는 함수
	var mindWin = Ti.UI.createWindow();
	// 새로운 window 생성

	mindWin.title = parenttext;
	// 함수의 매개변수값을 저장
	mindWin.open();

	// 라벨 생성 및 속성 초기화
	var labelParent = Ti.UI.createLabel({

		top : 30,
		color : '#000',
		width : 'auto',
		height : 'auto',
		text : parenttext,
		textAlign : 'center',
		font : {
			fontSize : 30,
			fontStyle : 'italic'
		},
		objName : parentnumber
	});

	// 뒤로 버튼 생성 및 속성 초기화
	var backButton = Ti.UI.createButton({
		saveContent : null,
		title : '뒤로',
		width : 40,
		height : 'auto',
		right : 2,
		top : 47
	});

	// 뒤로 버튼에 이벤트 핸들러 부여
	backButton.addEventListener('click', function() {
		mindWin.close();
		// 현재 open중인 window 사라짐
	});

	//추가 버튼 생성 및 속성 초기화
	var addButton = Ti.UI.createButton({
		top : 47,
		title : '추가',
		width : 40,
		height : 'auto',
		right : 45
	});

	// 추가 버튼에 이벤트 핸들러 부여
	addButton.addEventListener('click', function() {
		//  mindmapInsert함수 호출
		mindmapInsert(labelParent.objName, labelParent.text);
	});

	// view 생성 및 속성 초기화
	var mindviewMiddle = Titanium.UI.createView({

		backgroundColor : '#cacaca',
		top : 0,
		backgroundImage : 'nPMMobile_Image/mindmap_Background3.png',
		width : 'auto'
	});

	var child_Viewmiddle = Titanium.UI.createView({

		backgroundColor : '#808080',
		top : 85,
		//		height: 100,
		width : 'auto'
	});

	// 새로운 노드 추가위치를 위한 속성 변수
	var check_side = 20;
	var check_height = 125;
	var plus_side = 100;
	var node_Count = 0;
	var height_Count = 0;
	var upgrade_count = 0;

	var param = "action=child" + "&parentnumber=" + parentnumber;
	var xhr = Ti.Network.createHTTPClient();
	xhr.open("POST", servletAddr);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
	xhr.setRequestHeader("Cache-Control", "no-cache, must-revalidate");
	xhr.setRequestHeader("Pragma", "no-cache");
	xhr.send(param);
	xhr.onload = function() {
		var doc = this.responseXML.documentElement;
		var id = doc.getElementsByTagName('id');

		// 전 페이지에서 선택한 노드의 값을 지니는 버튼 생성 및 속성 초기화
		var node_Button = Titanium.UI.createButton({

			color : '#ff0000',
			top : 430,
			title : parenttext,
			width : 185,
			height : 50,
			left : 293

		});

		mindviewMiddle.add(node_Button);

		//id의 개수에 따라 파싱 시작
		for (var i = 0; i < id.length; i++) {
			var currentItem = id.item(i);
			var mytext = currentItem.getElementsByTagName('mytext').item(0).text;
			var mynumber = currentItem.getElementsByTagName('number').item(0).text;

			switch(i) {
				case 0:
					// 노드의 개수가 1개라면

					// 노드 버튼 생성 및 속성 초기화
					var parentNode_Button = Ti.UI.createButton({

						color : '#000',
						top : 430,
						objName : mynumber,
						title : mytext,
						width : 185,
						height : 50,
						left : 68
					});

					mindviewMiddle.add(parentNode_Button);
					// 현재 윈도우에 추가
					// 노드 버튼에 이벤트 핸들러 부여
					parentNode_Button.addEventListener('click', function(e) {

						saveContent = saveContent + this.title + "  -->  "
						mindmapAdd(this.objName, this.title);
					});
					break;

				case 1:
					// 노드의 개수가 2개라면

					// 노드 버튼 생성 및 속성 초기화
					var parentNode_Button = Ti.UI.createButton({

						color : '#000',
						top : 430,
						objName : mynumber,
						title : mytext,
						width : 185,
						height : 50,
						left : 518
					});

					mindviewMiddle.add(parentNode_Button);
					// 노드 버튼에 이벤트 핸들러 부여
					parentNode_Button.addEventListener('click', function(e) {
						saveContent = saveContent + this.title + "  -->  "
						mindmapAdd(this.objName, this.title);
					});
					break;

				case 2:
					// 노드의 개수가 3개라면

					var parentNode_Button = Ti.UI.createButton({

						color : '#000',
						top : 305,
						objName : mynumber,
						title : mytext,
						width : 185,
						height : 50,
						left : 293
					});

					mindviewMiddle.add(parentNode_Button);
					parentNode_Button.addEventListener('click', function(e) {

						saveContent = saveContent + this.title + "  -->  "
						mindmapAdd(this.objName, this.title);

					});
					break;

				case 3:
					// 노드의 개수가 4개라면

					var parentNode_Button = Ti.UI.createButton({

						color : '#000',
						top : 555,
						objName : mynumber,
						title : mytext,
						width : 185,
						height : 50,
						left : 293
					});

					mindviewMiddle.add(parentNode_Button);
					parentNode_Button.addEventListener('click', function(e) {

						saveContent = saveContent + this.title + "  -->  "
						mindmapAdd(this.objName, this.title);
					});
					break;

				case 4:
					// 노드의 개수가 5개라면
					var parentNode_Button = Ti.UI.createButton({

						color : '#000',
						top : 305,
						objName : mynumber,
						title : mytext,
						width : 185,
						height : 50,
						left : 68
					});

					mindviewMiddle.add(parentNode_Button);
					parentNode_Button.addEventListener('click', function(e) {

						saveContent = saveContent + this.title + "  -->  "
						mindmapAdd(this.objName, this.title);
					});
					break;

				case 5:
					// 노드의 개수가 6개라면

					var parentNode_Button = Ti.UI.createButton({

						color : '#000',
						top : 305,
						objName : mynumber,
						title : mytext,
						width : 185,
						height : 50,
						left : 518
					});

					mindviewMiddle.add(parentNode_Button);
					parentNode_Button.addEventListener('click', function(e) {

						saveContent = saveContent + this.title + "  -->  "
						mindmapAdd(this.objName, this.title);
					});
					break;

				case 6:
					// 노드의 개수가 7개라면

					var parentNode_Button = Ti.UI.createButton({

						color : '#000',
						top : 555,
						objName : mynumber,
						title : mytext,
						width : 185,
						height : 50,
						left : 68
					});

					mindviewMiddle.add(parentNode_Button);
					parentNode_Button.addEventListener('click', function(e) {

						saveContent = saveContent + this.title + "  -->  "
						mindmapAdd(this.objName, this.title);
					});
					break;

				case 7:
					// 노드의 개수가 8개라면

					var parentNode_Button = Ti.UI.createButton({

						color : '#000',
						top : 555,
						objName : mynumber,
						title : mytext,
						width : 185,
						height : 50,
						left : 518
					});

					mindviewMiddle.add(parentNode_Button);
					parentNode_Button.addEventListener('click', function(e) {

						saveContent = saveContent + this.title + "  -->  "
						mindmapAdd(this.objName, this.title);
					});
					break;

				case 8:
					// 노드의 개수가 9개라면

					var parentNode_Button = Ti.UI.createButton({

						color : '#000',
						top : 555,
						objName : mynumber,
						title : mytext,
						width : 185,
						height : 50,
						left : 68
					});

					mindviewMiddle.add(parentNode_Button);
					parentNode_Button.addEventListener('click', function(e) {

						saveContent = saveContent + this.title + "  -->  "
						mindmapAdd(this.objName, this.title);
					});
					break;

				case 9:
					// 노드의 개수가 10개라면
					var parentNode_Button = Ti.UI.createButton({

						color : '#000',
						top : 305,
						objName : mynumber,
						title : mytext,
						width : 185,
						height : 50,
						left : 293
					});

					mindviewMiddle.add(parentNode_Button);
					parentNode_Button.addEventListener('click', function(e) {

						saveContent = saveContent + this.title + "  -->  "
						mindmapAdd(this.objName, this.title);
					});
					break;

				case 10:
					// 노드의 개수가 11개라면
					var parentNode_Button = Ti.UI.createButton({

						color : '#000',
						top : 305,
						objName : mynumber,
						title : mytext,
						width : 185,
						height : 50,
						left : 293
					});

					mindviewMiddle.add(parentNode_Button);
					parentNode_Button.addEventListener('click', function(e) {

						saveContent = saveContent + this.title + "  -->  "
						mindmapAdd(this.objName, this.title);
					});
					break;

				case 11:
					// 노드의 개수가 12개라면
					var parentNode_Button = Ti.UI.createButton({

						color : '#000',
						top : 305,
						objName : mynumber,
						title : mytext,
						width : 185,
						height : 50,
						left : 518
					});

					mindviewMiddle.add(parentNode_Button);
					parentNode_Button.addEventListener('click', function(e) {

						saveContent = saveContent + this.title + "  -->  "
						mindmapAdd(this.objName, this.title);
					});
					break;

			}

			node_Count++;
			upgrade_count++;

		}
	};

	mindviewMiddle.add(addButton);
	mindviewMiddle.add(backButton);
	mindWin.add(mindviewMiddle);
}
//추가버튼을 눌렀을 때의 새로운 window
var mindmapInsert = function(parentnumber, parenttext) {// 클릭했을 때 새로운 페이지 만드는 함수
	var mindWin = Ti.UI.createWindow();
	// 새로운 윈도우 생성
	mindWin.open();
	// 생성한 윈도우 오픈

	// 라벨 생성 및 속성 초기화
	var labelParent = Ti.UI.createLabel({

		top : 30,
		color : '#000',
		width : 'auto',
		height : 'auto',
		text : parenttext,
		textAlign : 'center',
		font : {
			fontSize : 30,
			fontStyle : 'italic'
		},
		objName : parentnumber
	});

	// 입력받기 위한 텍스트 필드 생성 및 초기화
	var txtField = Titanium.UI.createTextField({
		top : 490,
		width : 'auto',
		left : 250,
		hintText : '지금 무슨 생각을 하고 계신가요?(클릭)'
	});

	// 라벨 생성 및 속성 초기화
	var currentMind = Titanium.UI.createLabel({
		top : 375,
		width : 'auto',
		left : 285,
		font : {
			fontSize : 15,
			fontStyle : 'italic'
		},
		text : ' * 현재까지 선택한 마인드 노드 * '

	});

	// 라벨 생성 및 속성 초기화
	var showMind = Titanium.UI.createLabel({

		top : 405,
		width : 'auto',
		left : 293,
		font : {
			fontSize : 10,
			fontStyle : 'italic'
		},
		text : saveContent

	})

	//뒤로가기 버튼 생성 및 속성 초기화
	var backButton = Ti.UI.createButton({
		saveContent : null,
		title : '뒤로',
		width : 40,
		height : 'auto',
		right : 2,
		top : 47
	});

	// 뒤로가기 버튼에 이벤트 핸들러 부여
	backButton.addEventListener('click', function() {
		mindWin.close();
		// 현재 윈도우 닫는다.

	});

	//추가 버튼 생성 및 속성 초기화
	var addButton = Ti.UI.createButton({
		top : 47,
		title : '추가',
		width : 40,
		height : 'auto',
		right : 45
	});

	// 현재 생성한 윈도웅에 추가할 view 생성 및 속성 초기화
	var mindviewMiddle = Titanium.UI.createView({
		backgroundColor : '#cacaca',
		top : 0,
		backgroundImage : 'nPMMobile_Image/mindmap_Background4.png',
		width : 'auto'
	});

	// 버튼 생성 및 속성 초기화
	var child_Button = Ti.UI.createButton({

		color : '#ff0000',
		top : 430,
		title : parenttext,
		width : 185,
		height : 50,
		left : 293

	});

	mindviewMiddle.add(child_Button);

	// 추가버튼에 이벤트 핸들러 부여(입력한 값이 디비에 저장되고 현 화면에 추가되어 나타남)
	addButton.addEventListener('click', function() {
		var param = "action=insert" + "&parentnumber=" + labelParent.objName + "&text=" + txtField.value;
		var xhr = Ti.Network.createHTTPClient();
		xhr.open("POST", servletAddr);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
		xhr.setRequestHeader("Cache-Control", "no-cache, must-revalidate");
		xhr.setRequestHeader("Pragma", "no-cache");
		xhr.send(param);
		xhr.onload = function() {
			saveContent = null;
			alert('추가완료');

		};
	});

	// 현재 윈도우에 각 속성들 추가
	mindviewMiddle.add(backButton);
	mindviewMiddle.add(txtField);
	mindviewMiddle.add(addButton);
	mindviewMiddle.add(currentMind);
	mindWin.add(mindviewMiddle);
	mindviewMiddle.add(showMind);

}



