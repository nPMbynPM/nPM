package ac.kr.ssu.nPM.servlet;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import ac.kr.ssu.nPM.mail.nPMSendMail;

/**
 * Servlet implementation class nPMMailPush
 */
public class nPMMailPush extends HttpServlet {
	private static final long serialVersionUID = 1L;
    
	
	private String mailAddress; 
	
    /**
     * @see HttpServlet#HttpServlet()
     */
    public nPMMailPush() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub

		doPost(request,response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		this.mailAddress = request.getParameter("mailAddress");
		
		nPMSendMail mail = new nPMSendMail();
		mail.setMail(this.mailAddress);
		mail.getProperty();
		mail.sendMail();
		
	}

}
