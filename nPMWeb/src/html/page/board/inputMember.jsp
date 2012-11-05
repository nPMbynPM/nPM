<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<html>
<head>
<title>Insert title here</title>
<script language="javascript">
	function validCheck(f){
		return true;
	}
	function goList(){
		location.href="./listMember.jsp";
	}
</script>
</head>
<body>
	<h3>게시판 글 입력폼</h3>
	<hr>
	<table border="1" width="400">
		<form method="post" action="./createProc.jsp" onSubmit="return validCheck(this)">
		<tr><td>이름</td><td><input type="text" name="username"></td></tr>
		<tr><td>아이디</td><td><input type="text" name="userid"></td></tr>
		<tr><td>비밀번호</td><td><input type="text" name="userpw"></td></tr>
		<tr>
			<td colspan="2" align="center">
				<input type="submit"  value="저장">
				<input type="button"  value="목록" onClick="javascript:goList()">
			</td>
		</tr>
		</form>
	</table>
</body>
</html>