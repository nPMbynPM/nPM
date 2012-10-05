var check="no";
var okBtn="";
var faceBtn="no";

//window 및 view 설정
Titanium.UI.setBackgroundColor('#FEDCDC');
var tabGroup = Titanium.UI.createTabGroup();
var win1 = Titanium.UI.createWindow();

win1.setBackgroundImage('whole3.png');

var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Tab 1',
    window:win1
});


var scrollView = Ti.UI.createScrollView({
	contentWidth : 'auto',
	contentHeight : 'auto',
	showHorizontalScrollIndicator:true,
	showVerticalScrollIndicator:true
});

win1.add(scrollView);

//facebook 관련
Ti.Facebook.appid = '195974147201995';
Ti.Facebook.permissions = ['publish_stream', 'read_stream', "user_checkins", "publish_checkins",'create_event']; // Permissions your app needs
Ti.Facebook.addEventListener('login', function(e) {
    if (e.success) {
        alert('Logged In');
        Titanium.App.Properties.setBool("enableFacebook", true);
        
        var fbToken = Ti.Facebook.accessToken;
        var fbUid_r = Ti.Facebook.uid;
        
        var fbUid= Ti.UI.createTextField({
        	top:300,
        	height:200,
        	width:200,
        	value:1,
        	textAlign:'center',
        	font:{fontSize:40, fontStyle:'italic'},
        });
        	okBtn = "ok";

    } else if (e.error) {
        alert(e.error);
        Titanium.App.Properties.setBool("enableFacebook", false);
    } else if (e.cancelled) {
        alert("Canceled");
        okBtn = "ok";
        Titanium.App.Properties.setBool("enableFacebook", false);
    }
});

Ti.Facebook.addEventListener('logout', function(e) {
    if (e.success) {
        Titanium.App.Properties.setBool("enableFacebook", false);
        alert('Logged Out');
    } else if (e.error) {
        alert(e.error);
    }
});
 

function login()
{
Ti.facebook.authorize()
}
 

function logout()
{
Ti.facebook.logout()
} 


var webView  = Ti.UI.createWebView({
	url:'http://solar4.ssu.ac.kr:8080/m_index.html',
	width:'auto',
	height:'auto'
});


var webView2  = Ti.UI.createWebView({
	url:'http://solar4.ssu.ac.kr:8080/m_npm.html',
	width:'auto',
	height:'auto'
});

var webView3  = Ti.UI.createWebView({
	url:'http://solar4.ssu.ac.kr/mindmap.html', 
	width:'auto',
	height:'auto'
});


var webView4  = Ti.UI.createWebView({
	url:'http://solar4.ssu.ac.kr:8080/m_gantt.html',
	width:'auto',
	height:'auto'
});

// 소스
var webView5  = Ti.UI.createWebView({

    url:'http://mobile.github.com',
	width:'auto',
	height:'auto'
});

// 게시판
var webView6  = Ti.UI.createWebView({
	url:'http://solar4.ssu.ac.kr/xe/freeboard',
	width:'auto',
	height:'auto'
});

// 내 페이지
/*
var webView7  = Ti.UI.createWebView({
	url:'http://m.daum.net',
	width:'auto',
	height:'auto'
});


var webView8  = Ti.UI.createWebView({
	url:'http://m.daum.net',
	width:'auto',
	height:'auto'
});

var webView9  = Ti.UI.createWebView({
	url:'http://m.daum.net',
	width:'auto',
	height:'auto'
});

*/
var button = Titanium.UI.createButton({	
	color:'#000',
	selectedColor:'#fff',
	backgroundImage:'nPM.png',
	top:160,
	width:82,
	height:72,
	left:70
});

var button2 = Titanium.UI.createButton({
	color:'#000',
	selectedColor:'#fff',
	backgroundImage:'project.png',
	top:160,
	width:82,
	height:72,
	left:200,
	right:200
});

var button3 = Titanium.UI.createButton({
	
	color:'#000',
	selectedColor:'#fff',
	backgroundImage:'mind.png',
	top:160,
	width:82,
	height:72,
	left:340,
	right:200
	
});

var button4 = Titanium.UI.createButton({
	
	color:'#000',
	selectedColor:'#fff',
	backgroundImage:'gantt.png',
	top:320,
	width:82,
	height:72,
	left:70,
	right:200
	
});

var button5 = Titanium.UI.createButton({
	
	color:'#000',
	selectedColor:'#fff',
	backgroundImage:'source.png',
	top:320,
	width:82,
	height:72,
	left:200,
	right:200
	
});

var button6 = Titanium.UI.createButton({
	
	color:'#000',
	selectedColor:'#fff',
	backgroundImage:'board.png',
	top:320,
	width:82,
	height:72,
	left:340,
	right:200
	
});


var button7 = Titanium.UI.createButton({
	color:'#000',
	selectedColor:'#fff',
	backgroundImage:'page.png',
	top:480,
	width:82,
	height:72,
	left:70,
	right:200
	
});

var button8 = Titanium.UI.createButton({
	color:'#000',
	selectedColor:'#fff',
	backgroundImage:'alarm.png',
	top:480,
	width:82,
	height:72,
	left:200,
	right:200
	
});


var button9 = Titanium.UI.createButton({
	color:'#000',
	selectedColor:'#fff',
	backgroundImage:'introduce.png',
	top:480,
	width:82,
	height:72,
	left:340,
	right:200
});


var alarm = Titanium.UI.createImageView({
	
	top: 0,
//	width: 550,
	image:'alarm_r.png'
	
});

var alarmBottom = Titanium.UI.createView({
	
//	backgroundColor: '#cacaca',
	top: 650,
	height: 'auto',
	width: 'auto'
		
});

var introduce = Titanium.UI.createImageView({
	
	top: 0,
	width: 500,
	height:630,
	image:'explain.png'
	
});

var introduceBottom = Titanium.UI.createView({
	
	backgroundColor: '#cacaca',
	top: 630,
//	height: 'auto',
	width: 'auto'
		
});
	
	


var line = Titanium.UI.createLabel({
	color:'#464646',
	text:'───────────────────────────────────────────',
	font:{fontSize:18, fontFamily:'Helvetica Neuw'},
	left:0,
	top:650,
	width:'auto'
})


var btn_name = Titanium.UI.createLabel({
	color:'#999',
	text:'nPM',
	font:{fontSize:23, fontFamily:'Helvetica Neuw'},
	left:90,
	top:235,
	width:'auto'
});

var btn_name2 = Titanium.UI.createLabel({
	color:'#999',
	text:'프로젝트 관리',
	font:{fontSize:23, fontFamily:'Helvetica Neuw'},
	left:185,
	top:235,
	width:'auto'
});

var btn_name3 = Titanium.UI.createLabel({
	color:'#999',
	text:'마인드맵',
	font:{fontSize:23, fontFamily:'Helvetica Neuw'},
	left:345,
	top:235,
	width:'auto'
});

var btn_name4 = Titanium.UI.createLabel({
	color:'#999',
	text:'간트차트',
	font:{fontSize:23, fontFamily:'Helvetica Neuw'},
	left:76,
	top:395,
	width:'auto'
});

var btn_name5 = Titanium.UI.createLabel({
	color:'#999',
	text:'소스관리',
	font:{fontSize:23, fontFamily:'Helvetica Neuw'},
	left:206,
	top:395,
	width:'auto'
});

var btn_name6 = Titanium.UI.createLabel({
	color:'#999',
	text:'게시판',
	font:{fontSize:23, fontFamily:'Helvetica Neuw'},
	left:353,
	top:395,
	width:'auto'
});


var btn_name7 = Titanium.UI.createLabel({
	color:'#999',
	text:'내페이지',
	font:{fontSize:23, fontFamily:'Helvetica Neuw'},
	left:76,
	top:555,
	width:'auto'
});


var bt_message = Titanium.Facebook.createLoginButton({
	top:650,
	left:300,
	
	
});

var btn_name8 = Titanium.UI.createLabel({
	color:'#999',
	text:'nPM 공지사항',
	font:{fontSize:23, fontFamily:'Helvetica Neuw'},
	left:190,
	top:555,
	width:'auto'
});

var btn_name9 = Titanium.UI.createLabel({
	color:'#999',
	text:'nPM 소개',
	font:{fontSize:23, fontFamily:'Helvetica Neuw'},
	left:348,
	top:555,
	width:'auto'
});

bt_message.addEventListener('click',function(e){
	
	 okBtn = "ok";
    var data = {
        link: "http://www.appcelerator.com",
        name: "Appcelerator Titanium Mobile",
        message: "Checkout this cool open source project for creating mobile apps",
        caption: "Appcelerator Titanium Mobile",
        picture: "http://developer.appcelerator.com/assets/img/DEV_titmobile_image.png",
        description: "You've got the ideas, now you've got the power. Titanium translates your hard won web skills into native applications..."
        
    };
 

	Titanium.Facebook.dialog("feed", data, function(e) {
    	if(e.success && e.result) {
    		okBtn = "ok";
        	alert("Success! New Post ID: " + e.result);
    	} else {
        	if(e.error) {
           	 alert(e.error);
           	 okBtn = "ok";
        } else {
      	      alert("User canceled dialog.");
      	      okBtn = "ok";
       	 }
       	 okBtn = "ok";
   	 }
	});
 
});


button.addEventListener('click', function(e)
{
	if(okBtn == 'ok'){
		webView.addEventListener('load', function(e){
		
	});
	
		win1.add(webView);
		alert('success');

	}
	else{
		alert('not loggin');
		return;
	}
	
	});

button2.addEventListener('click', function(e)
{
	
	webView2.addEventListener('load', function(e)
	{});
		
		win1.add(webView2);
});




button4.addEventListener('click', function(e)
{
	webView4.addEventListener('load', function(e)
	{});
		
		win1.add(webView4);
});

button5.addEventListener('click', function(e)
{
	webView5.addEventListener('load', function(e)
	{});
		
		win1.add(webView5);
});


button6.addEventListener('click', function(e)
{
	webView6.addEventListener('load', function(e)
	{});
		
		win1.add(webView6);
});


button7.addEventListener('click', function(e)
{
	webView7.addEventListener('load', function(e)
	{});
		
		win1.add(webView7);
});

button8.addEventListener('click', function(e)
{

	var winAlarm = Titanium.UI.createWindow();
	
	
	
	var btnBack = Titanium.UI.createButton({
				
		top:30,
		title: '뒤로',
		width: 60,
		height: 'auto',
		right: 2
	});
	
	winAlarm.open();
	alarmBottom.add(btnBack);
	winAlarm.add(alarm);
	winAlarm.add(alarmBottom);
			
	btnBack.addEventListener('click', function(e)
	{
		winAlarm.close();
		win1.open();
	});
	
});

button9.addEventListener('click', function(e)
{

	var winExplain = Titanium.UI.createWindow();
	
	var btnBack = Titanium.UI.createButton({
				
		top:30,
		title: '뒤로',
		width: 60,
		height: 'auto',
		right: 2
	});
	
	winExplain.open();
	introduceBottom.add(btnBack);
	winExplain.add(introduce);
	winExplain.add(introduceBottom);
			
	btnBack.addEventListener('click', function(e)
	{
		winExplain.close();
		win1.open();
	});
	
});

win1.add(button);
win1.add(button2);
win1.add(button3);
win1.add(button4);
win1.add(button5);
win1.add(button6);
win1.add(button7);
win1.add(button8);
win1.add(button9);

win1.add(btn_name);

win1.add(btn_name2);
win1.add(btn_name3);
win1.add(btn_name4);
win1.add(btn_name5);
win1.add(btn_name6);
win1.add(btn_name7);
win1.add(bt_message);
win1.add(btn_name8);
win1.add(btn_name9);

win1.open();


///////////////////////////////////////////////////////// 마인드 맵 ////////////////////////////////////////////////////////////


var win2 = Titanium.UI.createWindow();


button3.addEventListener('click', function(e)      // mind 버튼 클릭하였을 때
{
		// win1.close();
		win2.open();
		mindMapInit();
	
});

var mindviewMiddle = Titanium.UI.createView({
		
		backgroundColor: '#cacaca',
		top: 200,
		height: 100,
		width: 'auto'
		
	})

var viewTop = Titanium.UI.createImageView({
	top: 0,
	height: 200,
	width: 500,
	image:'brain_1.png'
});


var viewBottom = Titanium.UI.createView({
	backgroundColor: '#A7EEFF',
	top: 300,
	height: 'auto',
	width: 'auto'
}); 


var line = Titanium.UI.createLabel({
	color:'#464646',
	text:'───────────────────────────────────────────',
	font:{fontSize:18, fontFamily:'Helvetica Neuw'},
	left:0,
	top:650,
	width:'auto'
})

var checkHeight = 135;
var saveText = [];
var saveText_r = [];
var numOftext = 0;
var scopeData = 0;
var checkLine = 0;

var saveContent = "";

//서블릿 주소
var servletAddr = 'http://solar4.ssu.ac.kr:8080/mobileServlet';

var mindMapInit = function(){

	var tableView = Titanium.UI.createTableView({
	//	backgroundColor: '#3CB4FF',
	backgroundColor: '#FFA500',
	}); 

	//table view에 있는 목록 모두 삭제
	
	
	var param = "action=init";
	var xhr = Ti.Network.createHTTPClient();
	xhr.open("POST", servletAddr);
	xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
	xhr.setRequestHeader("Cache-Control","no-cache, must-revalidate");
	xhr.setRequestHeader("Pragma","no-cache");
	xhr.send(param);
	xhr.onload = function() {
		var doc = this.responseXML.documentElement;   // 서버가 sml 문자 받음
		var id = doc.getElementsByTagName('id');

		//id의 개수에 따라 파싱 시작
		for (var i = 0; i < id.length; i++) {
			var currentItem = id.item(i);
			var mytext = currentItem.getElementsByTagName('mytext').item(0).text;
			var mynumber = currentItem.getElementsByTagName('number').item(0).text;
			
			var row = Ti.UI.createTableViewRow({
				color: 'white',
				title: mytext,
				objName: mynumber,
				textAlign:'center',
				fontsize : 350,
				fontStyle:'Comic Sans MS',
				height: 100
							
			});
		
			row.addEventListener('click', function(e) {// mind 버튼 클릭하였을 때
				
				saveContent = this.title + "->"
				mindmapAdd(this.objName, this.title);


			});
			tableView.appendRow(row);
			
			var labelParent = Ti.UI.createLabel({
				
				top:30,
				color: '#000',
				width: 'auto', height: 'auto',
				text: "부모 노드입니다.",
				textAlign:'center',
				font:{fontSize:30, fontStyle:'italic'},

			});
			
			var useMind = Ti.UI.createButton({
				top:30,
				title: '설명',
				width: 60, height: 'auto',
				right: 63
			});
			
				
			var btnBack = Titanium.UI.createButton({
				
				top:30,
				title: '뒤로',
				width: 60,
				height: 'auto',
				right: 2
		
			});
			
			useMind.addEventListener('click', function(e)
			{
				alert('원하는 노드를 클릭하세요!');
			});
			
			
			btnBack.addEventListener('click', function(e)
			{
				win2.close();
				win1.open();
			});
		 
		}
		mindviewMiddle.add(btnBack);
		mindviewMiddle.add(labelParent);
		mindviewMiddle.add(useMind);
	};

	win2.add(viewTop);
	win2.add(viewBottom);
	win2.add(mindviewMiddle);
	viewBottom.add(tableView);
};

//자식노드를 클릭하였을 때의 새로운 window
var mindmapAdd  = function(parentnumber, parenttext){                 // 클릭했을 때 새로운 페이지 만드는 함수
	var mindWin = Ti.UI.createWindow();
	mindWin.title = parenttext;
	mindWin.open();
		
	var tableView = Titanium.UI.createTableView({
	//	backgroundColor: '#3CB4FF',
	backgroundColor: '#0000CD',
	}); 
	
	var labelParent = Ti.UI.createLabel({
		
		top:30,
		color: '#000',
		width: 'auto', height: 'auto',
		text: parenttext + "의 리스트.",
		textAlign:'center',
		font:{fontSize:30, fontStyle:'italic'},
		objName: parentnumber
	});
	
	//뒤로가기 버튼
	var backButton = Ti.UI.createButton({
		top:30,
		title: '뒤로',
		width: 60, height: 'auto',
		right: 2
	});
	
	backButton.addEventListener('click', function(){
		mindWin.close();
	});
	
	//추가 버튼
	var addButton = Ti.UI.createButton({
		top:30,
		title: '추가',
		width: 60, height: 'auto',
		right: 63
	});
	
	addButton.addEventListener('click', function(){
		mindmapInsert(labelParent.objName, labelParent.text);
	});
	
	var mindviewMiddle = Titanium.UI.createView({
		
		backgroundColor: '#cacaca',
		top: 200,
		height: 'auto',
		width: 'auto'
		
	})
	
	var mindviewTop = Titanium.UI.createImageView({
		
		top: 0,
		height: 200,
		width: 500,
		image:'brain_2.png'
	
		
	});
		
	var mindviewBottom = Titanium.UI.createView({
		
	//	image:'body.png',
		backgroundColor: '#A7EEFF',
		top: 300,
		height: 'auto',
		width: 'auto'
	
		
	});

	var param = "action=child"
		+ "&parentnumber=" + parentnumber;
	var xhr = Ti.Network.createHTTPClient();
	xhr.open("POST", servletAddr);
	xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
	xhr.setRequestHeader("Cache-Control","no-cache, must-revalidate");
	xhr.setRequestHeader("Pragma","no-cache");
	xhr.send(param);
	xhr.onload = function() {
		var doc = this.responseXML.documentElement;
		var id = doc.getElementsByTagName('id');
		
		
		

		//id의 개수에 따라 파싱 시작
		for (var i = 0; i < id.length; i++) {
			var currentItem = id.item(i);
			var mytext = currentItem.getElementsByTagName('mytext').item(0).text;
			var mynumber = currentItem.getElementsByTagName('number').item(0).text;
			
			var row = Ti.UI.createTableViewRow({
				color: 'white',
				title: mytext,
				objName: mynumber,
				textAlign:'center',
				fontsize : 350,
				fontStyle:'Comic Sans MS',
				height: 100
			});
		
			row.addEventListener('click', function(e) {
	
			saveContent = saveContent + this.title + "->"
				mindmapAdd(this.objName, this.title);
			});
			tableView.appendRow(row); 
		}
	};
	


	mindviewMiddle.add(labelParent);
	mindviewMiddle.add(addButton);
	mindviewMiddle.add(backButton);
	mindviewBottom.add(tableView);
	mindWin.add(mindviewTop);
	mindWin.add(mindviewMiddle);
	mindWin.add(mindviewBottom);
}

//추가버튼을 눌렀을 때의 새로운 window
var mindmapInsert  = function(parentnumber, parenttext){                 // 클릭했을 때 새로운 페이지 만드는 함수
	var mindWin = Ti.UI.createWindow();
	mindWin.open();
	
	var labelParent = Ti.UI.createLabel({
			
		top:30,
		color: '#000',
		width: 'auto', height: 'auto',
		text: parenttext,
		textAlign:'center',
		font:{fontSize:30, fontStyle:'italic'},
		objName: parentnumber
	});
	
	var txtField = Titanium.UI.createTextField({
		top: 0,
		width: '100%',
		hintText: '지금 무슨 생각을 하고 계신가요?'
	});
	
	var currentMind = Titanium.UI.createLabel({
		top: 200,
		width: '100%',
		left:2,
		font:{fontSize:20, fontStyle:'italic'},
		text: ' - 현재까지 선택한 마인드 노드'
		
	});
	
	var showMind = Titanium.UI.createLabel({
		
		top: 230,
		width: '100%',
		left:2,
		font:{fontSize:20, fontStyle:'italic'},
		text: saveContent
		
	})
	
	
	//뒤로가기 버튼
	var backButton = Ti.UI.createButton({
		title: '뒤로',
		width: 60, height: 'auto',
		right: 2,
		top:30
	});
	
	backButton.addEventListener('click', function(){
		mindWin.close();
	});
	
	var tableView = Titanium.UI.createTableView({
	//	backgroundColor: '#A7EEFF',
	backgroundColor: '#7B68EE',
	}); 
	
	//추가 버튼
	var addButton = Ti.UI.createButton({
		top:30,
		title: '추가',
		width: 60, height: 'auto',
		right: 63
	});
	
	addButton.addEventListener('click', function(){
		var param = "action=insert" + "&parentnumber=" + labelParent.objName + "&text=" + txtField.value;
		var xhr = Ti.Network.createHTTPClient();
		xhr.open("POST", servletAddr);
		xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
		xhr.setRequestHeader("Cache-Control","no-cache, must-revalidate");
		xhr.setRequestHeader("Pragma","no-cache");
		xhr.send(param);
		xhr.onload = function() {
			alert('추가완료');
		//	mindWin.close();
		}; 
	});
	

	var mindviewTop = Titanium.UI.createImageView({
		image:'brain_3.png',
		top: 0,
		height: 200,
		width: 500
		
	});
	
	var mindviewMiddle = Titanium.UI.createView({
		backgroundColor: '#cacaca',
		top: 200,
		height: 100,
		width: 'auto'
	});
		
	var mindviewBottom = Titanium.UI.createView({
	//	backgroundColor: '#A7EEFF',
	backgroundColor: '#7B68EE',
		top: 300,
		height: 'auto',
		width: 'auto'
	});
	

	mindviewBottom.add(currentMind);
	mindviewBottom.add(showMind);
	mindviewMiddle.add(labelParent);
	mindviewMiddle.add(backButton);
	mindviewBottom.add(txtField);
	mindviewMiddle.add(addButton);
	mindWin.add(mindviewTop);
	mindviewMiddle.add(txtField);
	mindWin.add(mindviewBottom);
	mindWin.add(mindviewMiddle);
	
}