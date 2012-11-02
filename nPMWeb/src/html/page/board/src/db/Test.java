package db;

import java.sql.Connection;

public class Test {
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
			DBManager db = new DBManager();
			Connection conn = db.dbConn();
			if(conn == null)
				System.out.println("null");
			else
				System.out.println("ok");
	}
}
