package servlet;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.StringTokenizer;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.w3c.dom.Document;
import org.w3c.dom.Element;

import java.sql.*;

/**
 * Servlet implementation class windowServlet
 */
public class windowServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	//DB 관련 변수
	private String root = "root";
	private String pw = "apmsetup";
	private String db_name = "npm";

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public windowServlet() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		this.doPost(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {		
		String saveText = request.getParameter("savetext");
		String loadText = request.getParameter("loadtext");
		String ganttText = request.getParameter("gantttext");
		String mindText = request.getParameter("mindtext");

		if(saveText == null && loadText == null && ganttText == null && mindText == null){
			RequestDispatcher rd = request.getRequestDispatcher("index.html");
			rd.forward(request, response);
		}
		//saveText가 null이 아니면 저장
		else if(saveText != null && loadText == null){
			System.out.println("save file name : " + saveText);

			//String
			//작업자
			String personX_ = request.getParameter("personX");
			String personY_ = request.getParameter("personY");
			String personImgSrc_ = request.getParameter("personImgSrc");
			String personName_ = request.getParameter("personName");
			String personFont_ = request.getParameter("personFont");
			//할일
			String todoX_ = request.getParameter("todoX");
			String todoY_ = request.getParameter("todoY");
			String todoTodo_ = request.getParameter("todoTodo");
			String todoStart_ = request.getParameter("todoStart");
			String todoFinish_ = request.getParameter("todoFinish");
			String todoFont_ = request.getParameter("todoFont");
			String todoColor_ = request.getParameter("todoColor");
			String todoIsfinished_ = request.getParameter("todoIsfinished");
			//연결정보
			String fromClassName_ = request.getParameter("fromClassName");
			String fromX_ = request.getParameter("fromX");
			String fromY_ = request.getParameter("fromY");
			String toClassName_ = request.getParameter("toClassName");
			String toX_ = request.getParameter("toX");
			String toY_ = request.getParameter("toY");

			//ArrayList
			//작업자
			ArrayList<String> personX = new ArrayList<String>();
			ArrayList<String> personY = new ArrayList<String>();
			ArrayList<String> personImgSrc = new ArrayList<String>();
			ArrayList<String> personName = new ArrayList<String>();
			ArrayList<String> personFont = new ArrayList<String>();
			//할일
			ArrayList<String> todoX = new ArrayList<String>();
			ArrayList<String> todoY = new ArrayList<String>();
			ArrayList<String> todoTodo = new ArrayList<String>();
			ArrayList<String> todoStart = new ArrayList<String>();
			ArrayList<String> todoFinish = new ArrayList<String>();
			ArrayList<String> todoFont = new ArrayList<String>();
			ArrayList<String> todoColor = new ArrayList<String>();
			ArrayList<String> todoIsfinished = new ArrayList<String>();
			//연결정보
			ArrayList<String> fromClassName = new ArrayList<String>();
			ArrayList<String> fromX = new ArrayList<String>();
			ArrayList<String> fromY = new ArrayList<String>();
			ArrayList<String> toClassName = new ArrayList<String>();
			ArrayList<String> toX = new ArrayList<String>();
			ArrayList<String> toY = new ArrayList<String>();

			StringTokenizer token = new StringTokenizer(personX_, ",");
			while(token.hasMoreElements())	personX.add(token.nextToken());
			token = new StringTokenizer(personY_, ",");
			while(token.hasMoreElements())	personY.add(token.nextToken());
			token = new StringTokenizer(personImgSrc_, ",");
			while(token.hasMoreElements())	personImgSrc.add(token.nextToken());
			token = new StringTokenizer(personName_, ",");
			while(token.hasMoreElements())	personName.add(token.nextToken());
			token = new StringTokenizer(personFont_, ",");
			while(token.hasMoreElements())	personFont.add(token.nextToken());
			token = new StringTokenizer(todoX_, ",");
			while(token.hasMoreElements())	todoX.add(token.nextToken());
			token = new StringTokenizer(todoY_, ",");
			while(token.hasMoreElements())	todoY.add(token.nextToken());
			token = new StringTokenizer(todoTodo_, ",");
			while(token.hasMoreElements())	todoTodo.add(token.nextToken());
			token = new StringTokenizer(todoStart_, ",");
			while(token.hasMoreElements())	todoStart.add(token.nextToken());
			token = new StringTokenizer(todoFinish_, ",");
			while(token.hasMoreElements())	todoFinish.add(token.nextToken());
			token = new StringTokenizer(todoFont_, ",");
			while(token.hasMoreElements())	todoFont.add(token.nextToken());
			token = new StringTokenizer(fromClassName_, ",");
			while(token.hasMoreElements())	fromClassName.add(token.nextToken());
			token = new StringTokenizer(fromX_, ",");
			while(token.hasMoreElements())	fromX.add(token.nextToken());
			token = new StringTokenizer(fromY_, ",");
			while(token.hasMoreElements())	fromY.add(token.nextToken());
			token = new StringTokenizer(toClassName_, ",");
			while(token.hasMoreElements())	toClassName.add(token.nextToken());
			token = new StringTokenizer(toX_, ",");
			while(token.hasMoreElements())	toX.add(token.nextToken());
			token = new StringTokenizer(toY_, ",");
			while(token.hasMoreElements())	toY.add(token.nextToken());
			token = new StringTokenizer(todoColor_, ",");
			while(token.hasMoreElements())	todoColor.add(token.nextToken());
			token = new StringTokenizer(todoIsfinished_, ",");
			while(token.hasMoreElements())	todoIsfinished.add(token.nextToken());

			//XML파일로 씀
			try
			{
				DocumentBuilderFactory docFactory = DocumentBuilderFactory.newInstance();
				DocumentBuilder docBuilder = docFactory.newDocumentBuilder();

				// data
				Document doc = docBuilder.newDocument();
				Element data = doc.createElement("data");
				doc.appendChild(data);

				// person
				Element person = doc.createElement("person");
				data.appendChild(person);
				// person의 child
				for(int i = 0; i < personX.size(); i++){
					// id
					Element id = doc.createElement("id");
					person.appendChild(id);
					// x
					Element x = doc.createElement("x");
					x.appendChild(doc.createTextNode(personX.get(i)));
					id.appendChild(x);
					// y
					Element y = doc.createElement("y");
					y.appendChild(doc.createTextNode(personY.get(i)));
					id.appendChild(y);
					// imgSrc
					Element imgSrc = doc.createElement("imgSrc");
					imgSrc.appendChild(doc.createTextNode(personImgSrc.get(i)));
					id.appendChild(imgSrc);
					// name
					Element name = doc.createElement("name");
					name.appendChild(doc.createTextNode(personName.get(i)));
					id.appendChild(name);
					// font
					Element font = doc.createElement("font");
					font.appendChild(doc.createTextNode(personFont.get(i)));
					id.appendChild(font);
				}

				// todo
				Element todo = doc.createElement("todo");
				data.appendChild(todo);
				// todo의 child
				for(int i = 0; i < todoX.size(); i++){// id
					Element id = doc.createElement("id");
					todo.appendChild(id);
					// x
					Element x = doc.createElement("x");
					x.appendChild(doc.createTextNode(todoX.get(i)));
					id.appendChild(x);
					// y
					Element y = doc.createElement("y");
					y.appendChild(doc.createTextNode(todoY.get(i)));
					id.appendChild(y);
					// job
					Element job = doc.createElement("job");
					job.appendChild(doc.createTextNode(todoTodo.get(i)));
					id.appendChild(job);
					// start
					Element start = doc.createElement("start");
					start.appendChild(doc.createTextNode(todoStart.get(i)));
					id.appendChild(start);
					// finish
					Element finish = doc.createElement("finish");
					finish.appendChild(doc.createTextNode(todoFinish.get(i)));
					id.appendChild(finish);
					// font
					Element font = doc.createElement("font");
					font.appendChild(doc.createTextNode(todoFont.get(i)));
					id.appendChild(font);
					// color
					Element color = doc.createElement("color");
					color.appendChild(doc.createTextNode(todoColor.get(i)));
					id.appendChild(color);
					// isfinished
					Element isfinished = doc.createElement("isfinished");
					isfinished.appendChild(doc.createTextNode(todoIsfinished.get(i)));
					id.appendChild(isfinished);
				}

				// conn
				Element conn = doc.createElement("conn");
				data.appendChild(conn);
				// conn의 child
				Element from = doc.createElement("from");
				conn.appendChild(from);
				Element to = doc.createElement("to");
				conn.appendChild(to);
				// from의 child
				for(int i = 0; i < fromX.size(); i++){
					// id
					Element id = doc.createElement("id");
					from.appendChild(id);
					// className
					Element className = doc.createElement("className");
					className.appendChild(doc.createTextNode(fromClassName.get(i)));
					id.appendChild(className);
					// x
					Element x = doc.createElement("x");
					x.appendChild(doc.createTextNode(fromX.get(i)));
					id.appendChild(x);
					// y
					Element y = doc.createElement("y");
					y.appendChild(doc.createTextNode(fromY.get(i)));
					id.appendChild(y);
				}
				//to의 child
				for(int i = 0; i < toX.size(); i++){
					// id
					Element id = doc.createElement("id");
					to.appendChild(id);
					// className
					Element className = doc.createElement("className");
					className.appendChild(doc.createTextNode(toClassName.get(i)));
					id.appendChild(className);
					// x
					Element x = doc.createElement("x");
					x.appendChild(doc.createTextNode(toX.get(i)));
					id.appendChild(x);
					// y
					Element y = doc.createElement("y");
					y.appendChild(doc.createTextNode(toY.get(i)));
					id.appendChild(y);
				}


				// 태그에 속성 부여하는 방법
				// staff.setAttribute("id", "1");

				// XML 파일로 저장한다
				TransformerFactory transformerFactory = TransformerFactory.newInstance();
				Transformer transformer = transformerFactory.newTransformer();

				transformer.setOutputProperty("{http://xml.apache.org/xslt}indent-amount", "4");
				transformer.setOutputProperty(OutputKeys.ENCODING, "UTF-8");
				transformer.setOutputProperty(OutputKeys.INDENT, "yes");
				DOMSource source = new DOMSource(doc);
				File output = new File("C:\\" + saveText);
				FileOutputStream outStream = new FileOutputStream(output);
				StreamResult result = new StreamResult(outStream);

				// 콘솔로 확인할 때
				// StreamResult result = new StreamResult(System.out);

				transformer.transform(source, result);
				// 파일을 닫는다
				outStream.close();

				System.out.println("XML file saved!");
			}
			catch (ParserConfigurationException pce)
			{
				pce.printStackTrace();
			}
			catch (TransformerException tfe)
			{
				tfe.printStackTrace();
			}
		}
		//loadText가 null이 아니면 로드
		else if(saveText == null && loadText != null){
			System.out.println("load file name : " + loadText);			
			
			response.setContentType("text/xml");
			response.setCharacterEncoding("UTF-8");
			response.setHeader("Cache-Control", "no-cache"); 
			PrintWriter out = response.getWriter();
			BufferedReader br = null;
			try{
				br = new BufferedReader(new FileReader("C:\\" + loadText));
				String str = null;
				String xmlStr = "";

				while((str = br.readLine()) != null){
					//out.write(str);
					xmlStr += str + "\n";
				}
				//System.out.println(xmlStr);
				out.println(xmlStr);
			}catch(Exception e){
				System.out.println("존재하지 않는 파일입니다.");
			}finally{
				if(br != null)	br.close();
			}
		}
		//간트차트 포워딩
		else if(saveText == null && loadText == null && ganttText != null){
//			request.setCharacterEncoding("UTF-8");
			String ganttResource_ = request.getParameter("ganttresource");
			String ganttTodo_ = request.getParameter("gantttodo");
			String ganttStart_ = request.getParameter("ganttstart");
			String ganttFinish_ =  request.getParameter("ganttfinish");
			String ganttLink_ =  request.getParameter("ganttlink");
			String ganttIsFinished_ = request.getParameter("ganttisfinished");
			
			//시작일 종료일 포맷 변경
			String ganttStart__ = "";
			StringTokenizer token = new StringTokenizer(ganttStart_,",");
			boolean isFirst = true;
			while(token.hasMoreElements()){
				if(isFirst == false)	ganttStart__ += ",";
				int cnt = 0;
				String tmpArr[] = new String[3];
				String tmp = token.nextToken();
				StringTokenizer tmpToken = new StringTokenizer(tmp, "-");
				while(tmpToken.hasMoreElements()){
					tmpArr[cnt++] = tmpToken.nextToken();
				}
				ganttStart__ += tmpArr[1] + "/" + tmpArr[2] + "/" + tmpArr[0];
				if(isFirst == true)	isFirst = false;
			}
			
			String ganttFinish__ = "";
			token = new StringTokenizer(ganttFinish_,",");
			isFirst = true;
			while(token.hasMoreElements()){
				if(isFirst == false)	ganttFinish__ += ",";
				int cnt = 0;
				String tmpArr[] = new String[3];
				String tmp = token.nextToken();
				StringTokenizer tmpToken = new StringTokenizer(tmp, "-");
				while(tmpToken.hasMoreElements()){
					tmpArr[cnt++] = tmpToken.nextToken();
				}
				ganttFinish__ += tmpArr[1] + "/" + tmpArr[2] + "/" + tmpArr[0];
				if(isFirst == true)	isFirst = false;
			}
			
			System.out.println(ganttResource_);
			System.out.println(ganttTodo_);
			System.out.println(ganttStart__);
			System.out.println(ganttFinish__);
			System.out.println(ganttLink_);
			System.out.println(ganttIsFinished_);
			
//			ArrayList<String> ganttPerson = new ArrayList<String>();
//			ArrayList<String> ganttTodo = new ArrayList<String>();
//			ArrayList<String> ganttStart = new ArrayList<String>();
//			ArrayList<String> ganttFinish = new ArrayList<String>();
//			ArrayList<String> ganttFrom = new ArrayList<String>();
//			ArrayList<String> ganttTo = new ArrayList<String>();
//
//			StringTokenizer token = new StringTokenizer(ganttPerson_, ",");
//			while(token.hasMoreElements())	ganttPerson.add(token.nextToken());
//			token = new StringTokenizer(ganttTodo_, ",");
//			while(token.hasMoreElements())	ganttTodo.add(token.nextToken());
//			token = new StringTokenizer(ganttStart_, ",");
//			while(token.hasMoreElements())	ganttStart.add(token.nextToken());
//			token = new StringTokenizer(ganttFinish_, ",");
//			while(token.hasMoreElements())	ganttFinish.add(token.nextToken());
//			token = new StringTokenizer(ganttFrom_, ",");
//			while(token.hasMoreElements())	ganttFrom.add(token.nextToken());
//			token = new StringTokenizer(ganttTo_, ",");
//			while(token.hasMoreElements())	ganttTo.add(token.nextToken());
			
//			for(int i = 0; i < ganttPerson.size(); i++)	System.out.println(ganttPerson.get(i));
//			for(int i = 0; i < ganttTodo.size(); i++)	System.out.println(ganttTodo.get(i));
//			for(int i = 0; i < ganttStart.size(); i++)	System.out.println(ganttStart.get(i));
//			for(int i = 0; i < ganttFinish.size(); i++)	System.out.println(ganttFinish.get(i));
//			for(int i = 0; i < ganttFrom.size(); i++)	System.out.println(ganttFrom.get(i));
//			for(int i = 0; i < ganttTo.size(); i++)	System.out.println(ganttTo.get(i));
			
			request.setAttribute("gantttodo", ganttTodo_);
			request.setAttribute("ganttstart", ganttStart__);
			request.setAttribute("ganttfinish", ganttFinish__);
			request.setAttribute("ganttresource", ganttResource_);
			request.setAttribute("ganttlink", ganttLink_);
			request.setAttribute("ganttisfinished", ganttIsFinished_);
			
			RequestDispatcher rd = request.getRequestDispatcher("gantt.jsp");
			rd.forward(request, response);
		}
		//마인드맵 관련 요청
		else if(mindText != null){
			//가장 큰 번호 조회
			if(mindText.equals("check")){
				Connection conn = null;
				PreparedStatement pstmt = null;
				ResultSet rs = null;
				String query = "select max(number) from mindmap";
				int max = 0;
				try{
					conn = mysqlConn();
					pstmt = conn.prepareStatement(query);
					rs = pstmt.executeQuery();
					if(rs.next()){
						max = rs.getInt("max(number)");
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
				//가장 큰 번호 리턴
				response.setContentType("text/xml");
				response.setCharacterEncoding("UTF-8");
				response.setHeader("Cache-Control", "no-cache"); 
				PrintWriter out = response.getWriter();
				out.print(max+1);
				System.out.println(max+1);
			}
			//노드 정보 DB에 저장
			else if(mindText.equals("saveroot") || mindText.equals("savechild")){
				Connection conn = null;
				PreparedStatement pstmt = null;
				String query = "insert into mindmap(parentx,parenty,myx,myy,mytext,number,parentnumber,parentnode,parenttext,mynode) value (?,?,?,?,?,?,?,?,?,?)";
				try{
					conn = mysqlConn();
					pstmt = conn.prepareStatement(query);
					pstmt.setInt(1, Integer.parseInt(request.getParameter("parentx")));
					pstmt.setInt(2, Integer.parseInt(request.getParameter("parenty")));
					pstmt.setInt(3, Integer.parseInt(request.getParameter("myx")));
					pstmt.setInt(4, Integer.parseInt(request.getParameter("myy")));
					pstmt.setString(5, request.getParameter("mytext"));
					pstmt.setInt(6, Integer.parseInt(request.getParameter("number")));
					pstmt.setInt(7, Integer.parseInt(request.getParameter("parentnumber")));
					pstmt.setString(8, request.getParameter("parentnode"));
					pstmt.setString(9, request.getParameter("parenttext"));
					pstmt.setString(10, request.getParameter("mynode"));
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
			//노드 정보 DB 수정
			else if(mindText.equals("modify")){
				Connection conn = null;
				PreparedStatement pstmt = null;
				String updateSQL = "update mindmap set mytext=? where number=?";
				try{
					conn = mysqlConn();
					pstmt = conn.prepareStatement(updateSQL);
					pstmt.setString(1, request.getParameter("text"));
					pstmt.setInt(2, Integer.parseInt(request.getParameter("number")));
					pstmt.executeUpdate();
				}catch(Exception e){
					System.out.println(e.getMessage());
				}finally{
					try{
						close(conn, pstmt);
					}catch(Exception e){
						e.printStackTrace();
					}
				}
			}
			//DB정보 리턴
			else if(mindText.equals("load")){
				Connection conn = null;
				PreparedStatement pstmt = null;
				ResultSet rs = null;
				String query = "select * from mindmap order by number asc";
				
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
			//위치 정보 갱신
			else if(mindText.equals("savepos")){
				Connection conn = null;
				PreparedStatement pstmt = null;
				String updateSQL = "update mindmap set parentx=?,parenty=? where parentx=? and parenty=?";
				try{
					conn = mysqlConn();
					pstmt = conn.prepareStatement(updateSQL);
					pstmt.setInt(1, Integer.parseInt(request.getParameter("newx")));
					pstmt.setInt(2, Integer.parseInt(request.getParameter("newy")));
					pstmt.setInt(3, Integer.parseInt(request.getParameter("prevx")));
					pstmt.setInt(4, Integer.parseInt(request.getParameter("prevy")));
					pstmt.executeUpdate();
					
					updateSQL = "update mindmap set myx=?,myy=? where number=?";
					pstmt = conn.prepareStatement(updateSQL);
					pstmt.setInt(1, Integer.parseInt(request.getParameter("newx")));
					pstmt.setInt(2, Integer.parseInt(request.getParameter("newy")));
					pstmt.setInt(3, Integer.parseInt(request.getParameter("number")));
					pstmt.executeUpdate();
				}catch(Exception e){
					System.out.println(e.getMessage());
				}finally{
					try{
						close(conn, pstmt);
					}catch(Exception e){
						e.printStackTrace();
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