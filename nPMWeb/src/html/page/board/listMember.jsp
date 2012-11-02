<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<%@page import="java.util.*, vo.*"%>
<% request.setCharacterEncoding("euc-kr"); %>
<jsp:useBean id="dao" class="dao.MemberDAO"/>
<jsp:useBean id="dto" class="vo.MemberVO"/>
<%
ArrayList al = new ArrayList();
al = dao.list();
%>
<html>
<head>
<title>Member</title>
</head>
<body>
	<h3>회원목록</h3><hr>
	<table width="550" border="1">
		<tr>
			<td>번호</td>
			<td>이름</td>
			<td>아이디</td>
			<td>비밀번호</td>
			<td>등록일</td>
		</tr>
		<% if(al.isEmpty()){ %>
		<tr><td colspan='5'>등록된 회원이 없습니다</center></td></tr>
		<% } else {
			int viewNum = 1;
			for(int i=0; i<al.size(); i++){
				dto = (MemberVO)al.get(i);
		%>
		<tr>
		<td>
			<a href="readMember.jsp?seq=<%=dto.getSeq() %>"><%=viewNum%></a>
		</td>
		<td><%=dto.getUserid()%></td>
		<td><%=dto.getUsername()%></td>
		<td><%=dto.getUserpw()%></td>
		<td><%=dto.getRegdate()%></td>
		</tr>
		<% 
				viewNum++;
			}
		}
		%>
	</table>
	<a href="./createProc.jsp">회원정보 입력</a>
</body>
</html>