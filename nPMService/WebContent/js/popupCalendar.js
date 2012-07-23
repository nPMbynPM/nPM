var calendarId = '';

function onMouse(td){
	td.style.backgroundColor = "#ffffff";
	td.style.color="#000099";
	td.style.fontWeight="bold";
	td.style.cursor="pointer";
}
function outMouse(td,today){
	if(today=="today"){
		td.style.backgroundColor = "#cc0033";
		td.style.color="#ffffff";
		td.style.fontWeight="bold";
	}else{
		td.style.backgroundColor = "#D7A35D";
		td.style.fontWeight="normal";
	}
}
//-----------------------------------------------CSS 적용을 위한 함수

function datePicker(tYear,tMonth,tDay,tYoil){ // 텍스트박스에 날짜 넣기 위해 만든 함수
	picDate= new Date(tYear,tMonth,tDay);       // 변경된 날짜 객체 선언후 날짜셋팅
	document.getElementById(calendarId).value = leadingZeros(picDate.getFullYear(), 4)+"-"+leadingZeros(picDate.getMonth()+1, 2)+"-"+leadingZeros(picDate.getDate(), 2);
	var calstr = 'calendar' + calendarId.substring(calendarId.length-5, calendarId.length);
	closeCalendar(calstr);
}


function calendar(tYear,tMonth){ //달력 함수

	var nowDate = new Date();               //오늘 날짜 객체 선언
	var nYear = nowDate.getFullYear();      //오늘의 년도
	var nMonth = nowDate.getMonth() ;       //오늘의 월 ※ 0월부터 시작
	var nDate = nowDate.getDate();           //오늘의 날
	var nNumday = nowDate.getDay();         //오늘의 요일 0=일요일...6=토요일
	var endDay=new Array(31,28,31,30,31,30,31,31,30,31,30,31);      //각달의 마지막 날짜
	var dayName=new Array("일", "월", "화", "수", "목", "금", "토"); // 숫자 요일을 문자 요일 바꿀 함수
	var col=0;  //나중에 앞뒤 빈 날짜칸 계산 

	if (tYear==null)   //null 일경우, 처음 페이지가 로드 될때의 년도는 
	{tYear=nYear;} // 현재 년도를 가져오고

	if (tMonth==null)   //null 일경우, 처음 페이지가 로드 될때의 월은
	{tMonth=nMonth;}//현재 월을 가져오고

	eDate= new Date();       // 변경된 날짜 객체 선언
	eDate.setFullYear(tYear);// 변경된 년도 세팅
	eDate.setMonth(tMonth);  // 변경된 월 세팅
	eDate.setDate(1);        // 날짜는 1일로 설정해서
	var fNumday=eDate.getDay();    // 첫번째 날짜 1일의 숫자 요일
	var lastDay=endDay[eDate.getMonth()]; //변경된 월의 마지막 날짜

	if ((eDate.getMonth()==1)&&(((eDate.getYear()%4==0)&&(eDate.getYear() %100 !=0))||eDate.getYear() % 400 ==0 ))
	{lastDay=29;} // 0월 부터 시작하므로 1는 2월임. 윤달 계산 4년마다 29일 , 100년는 28일, 400년 째는 29일

	calendarStr  = "<TABLE align=center>";
	calendarStr +="<TR align=center><TD valign=middle>";
	calendarStr +="<a href=javascript:calendar("+tYear+","+(tMonth-1)+") class=preNext>◀</a>"; //월을 넘길때 빼기 -1을 해서 넘긴다(년도는 자동 계산됨)
	calendarStr +="</TD><TD colspan=5 >";
	calendarStr +="<font size=3 color=black>  <b>"+eDate.getFullYear()+"년 "+(eDate.getMonth()+1)+"월</b></font> ";// 해당하는 년도와 월 표시
	calendarStr +="</TD><TD valign=middle>";
	calendarStr +="<a href=javascript:calendar("+tYear+","+(tMonth+1)+") class=preNext>▶</a>"; //월을 넘길때 더하기 +1을 해서 넘긴다(년도는 자동 계산됨)
	calendarStr +="</TD></TR><TR>";
	for (var i=0;i<dayName.length;i++){			
		calendarStr +="<TD class=week>"+dayName[i] + "</TD>"; // 숫자 요일을 날짜 요일로 입력
	}

	calendarStr +="</TR><TR align=center>";

	for (var i=0;i<fNumday;i++){          // 첫번째 날짜의 숫자 요일을 구해서 그전까지는 빈칸 처리
		calendarStr +="<TD>&nbsp;</TD>" ;
		col++;                     
	}

	for (var i=1; i<=lastDay; i++){       // 해당 월의 달력 
		if(eDate.getFullYear()==nYear&&eDate.getMonth()==nMonth&&i==nDate){//오늘이면 today 스타일로 표시
			calendarStr +="<TD class=today onmouseover=onMouse(this) onmouseout=outMouse(this,'today') onClick=datePicker("+tYear+","+tMonth+","+i+",'"+dayName[col]+"')>"+i+"</TD>" ;
		}else{

			if(col==0){              //일요일이면
				calendarStr +="<TD class=sunday onmouseover=onMouse(this) onmouseout=outMouse(this,'notToday') onClick=datePicker("+tYear+","+tMonth+","+i+",'"+dayName[col]+"')>"+i+"</TD>";
			}else if(1<=col&&col<=5){//그외 평범한 날이면
				calendarStr +="<TD class=workday onmouseover=onMouse(this) onmouseout=outMouse(this,'notToday') onClick=datePicker("+tYear+","+tMonth+","+i+",'"+dayName[col]+"')>"+i+"</TD>"; 
			}else if(col==6){        //토요일이면
				calendarStr +="<TD class=satday onmouseover=onMouse(this) onmouseout=outMouse(this,'notToday') onClick=datePicker("+tYear+","+tMonth+","+i+",'"+dayName[col]+"')>"+i+"</TD>" ;
			}

		}			
		col++;

		if(col==7){     //7칸을 만들면 줄 바꾸어 새 줄을 만들고 다시 첫 칸부터 시작
			calendarStr +="</TR><TR align=center>";
			col=0;
		}
	}   

	for (i=col;i<dayName.length;i++){        //마지막 날에서 남은 요일의 빈 칸 만들기
		calendarStr +="<TD>&nbsp;</TD>";
	}
	var calstr = 'calendar' + calendarId.substring(calendarId.length-5, calendarId.length);
	calendarStr += "</TR></TABLE>";
	calendarStr += "<div>";
	calendarStr += "<input style='position:absolute; bottom: 10px; right: 10px;' type='button' class='button' value='닫기' onclick=closeCalendar('" + calstr + "')></div>";

	document.getElementById(calstr).innerHTML = calendarStr;
}

function leadingZeros(n, digits) {
	var zero = '';
	n = n.toString();

	if (n.length < digits) {
		for (var i = 0; i < digits - n.length; i++)
			zero += '0';
	}
	return zero + n;
}

function closeCalendar(id){
	document.getElementById(id).style.display = 'none';
}