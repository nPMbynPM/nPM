package db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;



public class DBManager {
	/** mysql DB 연결
	 * @return Connection
	 */
	public static Connection dbConn(){
		Connection conn = null;
		System.out.println("Start..");
		//String oracleUrl = "jdbc:oracle:thin:@127.0.0.1:1521:XE";
		String mysqlUrl = "jdbc:mysql://220.70.220:3306/board";// Database name
		
		String mysqlDname="com.mysql.jdbc.Driver";//mysql 드라이버
		//String oracleDname="oracle.jdbc.driver.OracleDriver";
		System.out.println("Completed.1");
		try{
			Class.forName(mysqlDname).newInstance();
			conn = DriverManager.getConnection(mysqlUrl, "root", "apmsetup");
			
		}catch(Exception e){
			System.out.println(e.toString());
		}
		return conn; 
		}
	
	/** mysql DB 연결 해제
	 * @Param conn
	 */
	public static void close(Connection conn){
		try {
			if(conn!=null)conn.close();
		} catch (Throwable e) {
			System.out.println(e.toString());
		}finally{
			try{
				if(conn != null) conn.close();
			}catch(Exception e){
				System.out.println(e.toString());
			}
		}
	}
	
	/** mysql DB 연결 해제
	 * @Param conn
	 * @Param pstmt
	 */
	public static void close(Connection conn, PreparedStatement pstmt){
		try {
			if(pstmt != null) pstmt.close();
			if(conn != null) conn.close();
		} catch (Throwable e) {
			System.out.println(e.toString());
		} finally{
			try {
				if(pstmt != null) pstmt.close();
				if(conn != null) conn.close();
			} catch (Exception e) {
				System.out.println(e.toString());
			}
		}
	}
	
	/** mysql DB 연결 해제
	 * @param conn
	 * @param pstmt
	 * @param rs
	 */
	public static void close(Connection conn, PreparedStatement pstmt, ResultSet rs){
		try {
			if(rs != null) rs.close();
			if(pstmt != null) pstmt.close();
			if(conn != null) conn.close();
		} catch (Throwable e) {
			System.out.println(e.toString());
		} finally {
			try {
				if(rs != null) rs.close();
				if(pstmt != null) pstmt.close();
				if(conn != null) conn.close();
			} catch (Exception e) {
			}
		}
	}
}
