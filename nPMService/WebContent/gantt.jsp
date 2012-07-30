<%@ page import="java.io.*" %>
<%@ page import="java.util.*" %>
<%
String ganttPerson_ = (String)request.getAttribute("ganttperson");
String ganttTodo_ = (String)request.getAttribute("gantttodo");
String ganttStart_ =  (String)request.getAttribute("ganttstart");
String ganttFinish_ =  (String)request.getAttribute("ganttfinish");
String ganttFrom_ =  (String)request.getAttribute("ganttfrom");
String ganttTo_ =  (String)request.getAttribute("ganttto");

ArrayList<String> ganttPerson = new ArrayList<String>();
ArrayList<String> ganttTodo = new ArrayList<String>();
ArrayList<String> ganttStart = new ArrayList<String>();
ArrayList<String> ganttFinish = new ArrayList<String>();
ArrayList<String> ganttFrom = new ArrayList<String>();
ArrayList<String> ganttTo = new ArrayList<String>();

StringTokenizer token = new StringTokenizer(ganttPerson_, ",");
while(token.hasMoreElements())	ganttPerson.add(token.nextToken());
token = new StringTokenizer(ganttTodo_, ",");
while(token.hasMoreElements())	ganttTodo.add(token.nextToken());
token = new StringTokenizer((String)ganttStart_, ",");
while(token.hasMoreElements())	ganttStart.add(token.nextToken());
token = new StringTokenizer(ganttFinish_, ",");
while(token.hasMoreElements())	ganttFinish.add(token.nextToken());
token = new StringTokenizer(ganttFrom_, ",");
while(token.hasMoreElements())	ganttFrom.add(token.nextToken());
token = new StringTokenizer(ganttTo_, ",");
while(token.hasMoreElements())	ganttTo.add(token.nextToken());
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
		g.AddTaskItem(new JSGantt.TaskItem(3, 'nPM', '', '', 'ff0000',	'http://help.com', 0, '', 0, 1, 0, 1));
		<% for(int i = 0; i < ganttPerson.size(); i++){%>
		g.AddTaskItem(new JSGantt.TaskItem(3<%out.print(i);%>, '<%out.print(ganttTodo.get(i));%>','<%out.print(ganttStart.get(i));%>', '<%out.print(ganttFinish.get(i));%>', 'ff00ff', 'http://help.com',0, '<%out.print(ganttPerson.get(i));%>', 30, 0, 3, 1));
		<%}%>
		g.Draw();
		g.DrawDependencies();
	</script>
</body>
</html>