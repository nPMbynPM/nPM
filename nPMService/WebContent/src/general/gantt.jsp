<%@ page import="java.io.*" %>
<%@ page import="java.util.*" %>
<%
//서블릿으로 부터 넘어온 변수를 받음
String ganttTodo_ = (String)request.getAttribute("gantttodo");
String ganttStart_ = (String)request.getAttribute("ganttstart");
String ganttFinish_ = (String)request.getAttribute("ganttfinish");
String ganttResource_ = (String)request.getAttribute("ganttresource");
String ganttLink_ = (String)request.getAttribute("ganttlink");
String ganttIsFinished_ = (String)request.getAttribute("ganttisfinished");

ArrayList<String> ganttTodo = new ArrayList<String>();
ArrayList<String> ganttStart = new ArrayList<String>();
ArrayList<String> ganttFinish = new ArrayList<String>();
ArrayList<String> ganttResource = new ArrayList<String>();
ArrayList<String> ganttLink = new ArrayList<String>();
ArrayList<String> ganttIsFinished = new ArrayList<String>();

StringTokenizer token = new StringTokenizer(ganttTodo_, ",");
while(token.hasMoreElements())	ganttTodo.add(token.nextToken());
token = new StringTokenizer(ganttStart_, ",");
while(token.hasMoreElements())	ganttStart.add(token.nextToken());
token = new StringTokenizer(ganttFinish_, ",");
while(token.hasMoreElements())	ganttFinish.add(token.nextToken());
token = new StringTokenizer(ganttResource_, ",");
while(token.hasMoreElements())	ganttResource.add(token.nextToken());
token = new StringTokenizer(ganttLink_, ",");
while(token.hasMoreElements())	ganttLink.add(token.nextToken());
token = new StringTokenizer(ganttIsFinished_, ",");
while(token.hasMoreElements())	ganttIsFinished.add(token.nextToken());
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<link rel="stylesheet" type="text/css" href="css/jsgantt.css" />
<script src="js/jsgantt.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>
<body>
	<div style="position: relative" class="gantt" id="GanttChartDIV"></div>
	<script>
		var g = new JSGantt.GanttChart('g', document.getElementById('GanttChartDIV'), 'day');
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
		<% for(int i = 0; i < ganttTodo.size(); i++){%>
		<% String resource = ganttResource.get(i).replace("/", ","); String link = ganttLink.get(i).replace("/", ","); %>
		g.AddTaskItem(new JSGantt.TaskItem(<%out.print(i);%>, '<%out.print(ganttTodo.get(i));%>','<%out.print(ganttStart.get(i));%>', '<%out.print(ganttFinish.get(i));%>', 'ff00ff', '',0, '<%out.print(resource);%>', <%out.print(ganttIsFinished.get(i));%>, 0, 101, 1<% if(!ganttLink.get(i).equals("-1")) out.print(",'"+link+"'"); %>));
		<%}%>
		g.Draw();
		g.DrawDependencies();
	</script>
</body>
</html>