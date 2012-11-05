<%@ page contentType="text/html; charset=EUC-KR" pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<% request.setCharacterEncoding("euc-kr");%>
 
<jsp:useBean id="dao" class="dao.MemberDAO"/>
<jsp:useBean id="dto" class="vo.MemberVO"/>
<jsp:setProperty name="dto" property="*"/>

<%
int flag = dao.insert(dto);
out.println(flag);
if(flag == 1){
	response.sendRedirect("listMember.jsp");
} else{
	response.sendRedirect("inputMember.jsp");
}
%>
