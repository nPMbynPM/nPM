package servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class mobileServlet
 */
public class mobileServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	//DB 관련 변수
	private String root = "root";
	private String pw = "apmsetup";
	private String db_name = "npm";

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public mobileServlet() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		this.doPost(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String action = request.getParameter("action");
		
//		System.out.println(action);

		if(action.equals("init")){
			Connection conn = null;
			PreparedStatement pstmt = null;
			ResultSet rs = null;
			String query = "select * from mindmap where parentnode='none' order by number asc";

			int number = 0;
			int parentnumber = 0;
			String parentnode = "";
			int parentx = 0;
			int parenty = 0;
			String parenttext = "";
			String mynode = "";
			int myx = 0;
			int myy = 0;
			String mytext = "";

			String xmlStr = "<data>";

			try{
				conn = mysqlConn();
				pstmt = conn.prepareStatement(query);
				rs = pstmt.executeQuery();
				while(rs.next()){
					number = rs.getInt("number");
					parentnumber = rs.getInt("parentnumber");
					parentnode = rs.getString("parentnode");
					parentx = rs.getInt("parentx");
					parenty = rs.getInt("parenty");
					parenttext = rs.getString("parenttext");
					mynode = rs.getString("mynode");
					myx = rs.getInt("myx");
					myy = rs.getInt("myy");
					mytext = rs.getString("mytext");

					xmlStr += "<id>"
							+ "<number>" + number + "</number>"
							+ "<parentnumber>" + parentnumber + "</parentnumber>"
							+ "<parentnode>" + parentnode + "</parentnode>"
							+ "<parentx>" + parentx + "</parentx>"
							+ "<parenty>" + parenty + "</parenty>"
							+ "<parenttext>" + parenttext + "</parenttext>"
							+ "<mynode>" + mynode + "</mynode>"
							+ "<myx>" + myx + "</myx>"
							+ "<myy>" + myy + "</myy>"
							+ "<mytext>" + mytext + "</mytext>"
							+ "</id>";
				}
			}catch(Exception e){
				System.out.println(e.getMessage());
			}finally{
				try{
					close(conn,pstmt,rs);
				}catch(Exception e){
					e.printStackTrace();
				}
			}

			xmlStr += "</data>";

			//xml 전송
			response.setContentType("text/xml");
			response.setCharacterEncoding("UTF-8");
			response.setHeader("Cache-Control", "no-cache"); 
			PrintWriter out = response.getWriter();
			out.println(xmlStr);
		}
	}

	/**
	 * @return Connection
	 */
	public Connection mysqlConn() {
		Connection conn = null;
		String url = "jdbc:mysql://127.0.0.1:3306/" + db_name;
		try {
			Class.forName("com.mysql.jdbc.Driver").newInstance();
			conn = DriverManager.getConnection(url, root, pw);
		} catch (Exception e) {
			System.out.println(e.toString());
		}
		return conn;
	}

	/**
	 * @param conn
	 */
	public void close(Connection conn) {
		try {
			if (conn != null)
				conn.close();
		} catch (Exception e) {
			System.out.println(e.toString());
		} finally {
			try {
				if (conn != null)
					conn.close();
			} catch (Exception e) {
				System.out.println(e.toString());
			}
		}
	}

	/**
	 * @param conn
	 * @param pstmt
	 */
	public void close(Connection conn, PreparedStatement pstmt) {
		try {
			if (pstmt != null)
				pstmt.close();
			if (conn != null)
				conn.close();
		} catch (Exception e) {
			System.out.println(e.toString());
		} finally {
			try {
				if (pstmt != null)
					pstmt.close();
				if (conn != null)
					conn.close();
			} catch (Exception e) {
				System.out.println(e.toString());
			}
		}
	}

	/** 
	 * @param conn
	 * @param pstmt
	 * @param rs
	 */
	public void close(Connection conn, PreparedStatement pstmt,
			ResultSet rs) {
		try {
			if (rs != null)
				rs.close();
			if (pstmt != null)
				pstmt.close();
			if (conn != null)
				conn.close();
		} catch (Exception e) {
			System.out.println(e.toString());
		} finally {
			try {
				if (rs != null)
					rs.close();
				if (pstmt != null)
					pstmt.close();
				if (conn != null)
					conn.close();
			} catch (Exception e) {
				System.out.println(e.toString());
			}
		}
	}

}
