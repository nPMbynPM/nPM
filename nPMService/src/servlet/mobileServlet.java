package servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Random;

import javax.servlet.RequestDispatcher;
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
		String action = request.getParameter("action");	//모바일 마인드맵
		String npm = request.getParameter("npm");	//모바일 nPM
		String gantt = request.getParameter("gantt");	//모바일 gantt		

		//마인드맵
		if(action != null){
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
//								+ "<parentnumber>" + parentnumber + "</parentnumber>"
//								+ "<parentnode>" + parentnode + "</parentnode>"
//								+ "<parentx>" + parentx + "</parentx>"
//								+ "<parenty>" + parenty + "</parenty>"
//								+ "<parenttext>" + parenttext + "</parenttext>"
//								+ "<mynode>" + mynode + "</mynode>"
//								+ "<myx>" + myx + "</myx>"
//								+ "<myy>" + myy + "</myy>"
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
			else if(action.equals("child")){
				String parentNumber = request.getParameter("parentnumber");
				
				Connection conn = null;
				PreparedStatement pstmt = null;
				ResultSet rs = null;
				String query = "select * from mindmap where parentnumber=? order by number asc";

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
					pstmt.setInt(1, Integer.parseInt(parentNumber));
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
//								+ "<parentnumber>" + parentnumber + "</parentnumber>"
//								+ "<parentnode>" + parentnode + "</parentnode>"
//								+ "<parentx>" + parentx + "</parentx>"
//								+ "<parenty>" + parenty + "</parenty>"
//								+ "<parenttext>" + parenttext + "</parenttext>"
//								+ "<mynode>" + mynode + "</mynode>"
//								+ "<myx>" + myx + "</myx>"
//								+ "<myy>" + myy + "</myy>"
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
			else if(action.equals("insert")){
				int parentnumber = Integer.parseInt(request.getParameter("parentnumber"));
				String mytext = request.getParameter("text");
				String parentnode = "";
				int parentx = 0;
				int parenty = 0;
				String parenttext = "";
				
				int maxnum = 0;
				int myx = 0;
				int myy = 0;
				
				if(parentnumber == -1){
					
				}
				else{
					Connection conn = null;
					PreparedStatement pstmt = null;
					ResultSet rs = null;
					//가장 큰 번호 리턴
					String query = "select max(number) from mindmap";

					try{
						conn = mysqlConn();
						pstmt = conn.prepareStatement(query);
						rs = pstmt.executeQuery();
						if(rs.next()){
							maxnum = rs.getInt("max(number)");
							maxnum += 1;
						}
						//부모의 정보 가져오기
						query = "select * from mindmap where number=?";
						pstmt = conn.prepareStatement(query);
						pstmt.setInt(1, parentnumber);
						rs = pstmt.executeQuery();
						if(rs.next()){
							parentnode = rs.getString("mynode");
							parentx = rs.getInt("myx");
							parenty = rs.getInt("myy");
							parenttext = rs.getString("mytext");
						}
						//추가하려는 노드 입력하기
						Random rd = new Random();
						myx = rd.nextInt(1100) + 1;
						myy = rd.nextInt(1000) + 1;
						
						query = "insert into mindmap(number,parentnumber,parentnode,parentx,parenty,parenttext,mynode,myx,myy,mytext) values(?,?,?,?,?,?,?,?,?,?)";
						pstmt = conn.prepareStatement(query);
						pstmt.setInt(1, maxnum);
						pstmt.setInt(2, parentnumber);
						pstmt.setString(3, parentnode);
						pstmt.setInt(4, parentx);
						pstmt.setInt(5, parenty);
						pstmt.setString(6, parenttext);
						pstmt.setString(7, "childClass");
						pstmt.setInt(8, myx);
						pstmt.setInt(9, myy);
						pstmt.setString(10, mytext);
						pstmt.executeUpdate();

					}catch(Exception e){
						System.out.println(e.getMessage());
					}finally{
						try{
							close(conn,pstmt);
						}catch(Exception e){
							e.printStackTrace();
						}
					}
				}
			}
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
