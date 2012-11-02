<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<% request.setCharacterEncoding("euc-kr"); %>
<jsp:useBean id="dao" class="dao.MemberDAO"/>
<jsp:useBean id="dto" class="vo.MemberVO"/> 
<%
int seq = Integer.parseInt(request.getParameter("seq"));
System.out.println("readMember에서 db로 읽어온 seq 값 : " + seq);
dto = dao.view(seq);
%>  
<html>
<head>
<title>Member</title>
<script language="javascript">
function goUpt(){
	document.memForm.action ="updateProc.jsp";
	document.memForm.submit();
}
function goDel(idVal){
	document.memForm.action="deleteProc.jsp";
	document.memForm.submit();
}
function goList(){
	location.href="./listMember.jsp";
}
</script>
</head>
<body>
<h3>회원정보 상세보기</h3><hr>
<table width="550" border="1">
	<form name="memForm" method="post">
		<input type=hidden name=seq value="<%=dto.getSeq()%>">
		<tr><td>번호</td><td><%=dto.getSeq()%></td></tr>
		<tr>
			<td>아이디</td>
			<td>
				<input type="text" name="userid" value="<%=dto.getUserid()%>">
			</td>
		</tr>	
		<tr>
			<td>이름</td>
			<td>
				<input type="text" name="username" value="<%=dto.getUsername()%>">
			</td>
		</tr>	
		<tr>
			<td>비밀번호</td>
			<td>
				<input type="text" name="userpw" value="<%=dto.getUserpw()%>">
			</td>
		</tr>	
		<tr><td>등록일</td><td><%=dto.getRegdate()%></td></tr>
		<tr>
			<td colspan="2" align="center">
				<input type="button" value="수정"  onClick="javascript:goUpt()">
				<input type="button" value="삭제"  onClick="javascript:goDel()">
				<input type="button" value="목록"  onClick="javascript:goList()">	
			</td>
		</tr>
	</form>
</table>
</body>
</html>