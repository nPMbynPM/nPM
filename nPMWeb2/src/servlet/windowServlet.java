package servlet;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.PrintWriter;
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

/**
 * Servlet implementation class windowServlet
 */
public class windowServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

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

		if(saveText == null && loadText == null){
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
	}
}
