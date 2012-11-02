<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<% request.setCharacterEncoding("euc-kr"); %>
<jsp:useBean id="dao" class="dao.MemberDAO"/>
<jsp:useBean id="dto" class="vo.MemberVO"/>
<jsp:setProperty name="dto" property="*"/>

<%
int flag = dao.update(dto);
out.println("업데이트시 : " + flag);
if(flag == 1){
	String url = "listMember.jsp";
	response.sendRedirect(url);
} else {
	String url = "readMember.jsp?seq="+dto.getSeq();
	response.sendRedirect(response.encodeRedirectURL(url));
}
%>
