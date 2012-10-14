package ac.kr.ssu.nPM.database;

import java.sql.DatabaseMetaData;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.sql.Types;
import java.util.concurrent.ConcurrentSkipListSet;
import java.util.List;
import java.util.Set;
import java.util.Vector;

final class nPMMySQLBridge extends nPMDBBridge {
	private nPMMySQLBridge(String host, String port, String id, String password, String schema) {
		loadDriver(nPMDBMSTypes.MY_SQL.driver());
		
		connection = getConnection(buildURL(host, port, schema), id, password);
	}
	
	static nPMMySQLBridge getInstance(String host, String port, String id, String password, String schema) {
		return new nPMMySQLBridge(host, port, id, password, schema);
	}
	
	protected String buildURL(String host, String port, String schema) {
		return "jdbc:mysql://" + host + ":" + port + "/" + schema;
	}
	
	public nPMSQLResultSet executeQuery(String query) {
		nPMSQLResultSet SQLRS = null;
		
		try {
			Statement stmt = connection.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE,
															 ResultSet.CONCUR_READ_ONLY,
															 ResultSet.HOLD_CURSORS_OVER_COMMIT);
		
			rs = stmt.executeQuery(query);
			rsmd = rs.getMetaData();
			
			SQLRS = new nPMSQLResultSet(rs, rsmd);
		} catch(SQLException e) { e.printStackTrace(); }
		
		return SQLRS;
	}
	
	public String getColumnName(int column) {
		String name = null;
		
		try {
			name = rsmd.getColumnName(column);
		} catch(SQLException e) { e.printStackTrace(); }
		
		return name;
	}
	
	public int findColumn(String columnLabel) {
		int index = 0;
		
		try {
			index = rs.findColumn(columnLabel);
		} catch(SQLException e) {e.printStackTrace(); }
		
		return index;
	}
	
	public String getConnectedCatalog() {
		String db = null;
		
		try {
			db = connection.getCatalog();
		} catch(SQLException e) { e.printStackTrace(); }
		
		return db;
	}
	
	public Set<String> getTables(String catalog) {
		Set<String> set = new ConcurrentSkipListSet<String>();
		
		try {
			DatabaseMetaData dbmd = connection.getMetaData();
			
			String[] types = {"TABLE", /*"VIEW", */"SYSTEM TABLE"/*, "GLOBAL TEMPORARY", "LOCAL TEMPORARY", "ALIAS", "SYNONYM"*/};
			ResultSet tableSet = dbmd.getTables(catalog, null, null, types);
			while (tableSet.next())
				set.add(tableSet.getString("TABLE_NAME"));
		} catch(SQLException e) { e.printStackTrace(); }
		
		return set;
	}
	
	public Set<String> getUniqueKeys(String catalog, String table) {
		Set<String> set = new ConcurrentSkipListSet<String>();

		try {
			Statement stmt = connection.createStatement();
			
			ResultSet rs = stmt.executeQuery("SHOW CREATE TABLE " + catalog + "." + table);
			
			rs.absolute(1);
			
			String DDLForCreateTable = rs.getString(2);
			
			int beginIndexOfUniqueKey = DDLForCreateTable.indexOf("UNIQUE KEY");
			
			while (beginIndexOfUniqueKey > -1) {
				int beginIndexOfColumns = DDLForCreateTable.indexOf("(", beginIndexOfUniqueKey)+1;
				int endIndexOfColumns = DDLForCreateTable.indexOf(")", beginIndexOfUniqueKey);

				String columns = DDLForCreateTable.substring(beginIndexOfColumns, endIndexOfColumns);
				String[] list = columns.split(",");
				for (String columnName: list)
					set.add(columnName.substring(1, columnName.length()-1));
				
				beginIndexOfUniqueKey = DDLForCreateTable.indexOf("UNIQUE KEY", endIndexOfColumns+1);
			}
		} catch(SQLException e) { e.printStackTrace(); }

		return set;
	}
	
	public Set<String> getSingleColumnUniqueKeys(String catalog, String table) {
		Set<String> set = new ConcurrentSkipListSet<String>();

		try {
			Statement stmt = connection.createStatement();
			
			ResultSet rs = stmt.executeQuery("SHOW CREATE TABLE " + catalog + "." + table);
			
			rs.absolute(1);
			
			String DDLForCreateTable = rs.getString(2);
			
			int beginIndexOfUniqueKey = DDLForCreateTable.indexOf("UNIQUE KEY");
			
			while (beginIndexOfUniqueKey > -1) {
				int beginIndexOfColumns = DDLForCreateTable.indexOf("(", beginIndexOfUniqueKey)+1;
				int endIndexOfColumns = DDLForCreateTable.indexOf(")", beginIndexOfUniqueKey);

				String columns = DDLForCreateTable.substring(beginIndexOfColumns, endIndexOfColumns);
				String[] list = columns.split(",");
				if (list.length == 1)
					set.add(list[0].substring(1, list[0].length()-1));
				
				beginIndexOfUniqueKey = DDLForCreateTable.indexOf("UNIQUE KEY", endIndexOfColumns+1);
			}
		} catch(SQLException e) { e.printStackTrace(); }

		return set;
	}
	
	/*public boolean isUniqueKey(String catalog, String table, String column) {
		boolean is = false;
		
		Set<String> ukSet = getUniqueKeys(catalog, table);
		for (String uk: ukSet)
			if(uk.equals(column)) {
				is = true;
				break;
			}
		
		return is;
	}*/
	
	/*public boolean isKey(String catalog, String table, String column) {
		if (isPrimaryKey(catalog, table, column)
				|| isForeignKey(catalog, table, column)
				|| isUniqueKey(catalog, table, column))
			return true;

		return false;
	}
	
	public boolean isForeignKey(String catalog, String table, String column) {
		boolean is = false;
		
		try {
			DatabaseMetaData dbmd = connection.getMetaData();
			
			ResultSet fkSet = dbmd.getImportedKeys(catalog, null, table);
			while (fkSet.next())
				if(fkSet.getString("FKCOLUMN_NAME").equals(column)) {
					is = true;
					break;
				}
		} catch(SQLException e) { e.printStackTrace(); }
		
		return is;
	}*/
	
	public String getColumnTypeName(String catalog, String table, String column) {
		String typeName = null;
		
		try {
			Statement stmt = connection.createStatement();
			
			ResultSet rs = stmt.executeQuery("DESCRIBE " + catalog + "." + table + " " + column);
			ResultSetMetaData rsmd = rs.getMetaData();
			
			int cnt = rsmd.getColumnCount();
			
			rs.absolute(1);
			
			for(int i = 1; i <= cnt; i++)
				if(rsmd.getColumnLabel(i).equals("Type")) {
					typeName = toUpperCase(rs.getString(i));
					break;
				}
		} catch(SQLException e) { e.printStackTrace(); }
		
		return typeName;
	}
	
	private String toUpperCase(String type) {
		if(type.indexOf('(') < 0) return type.toUpperCase();
		
		int open = type.indexOf('(');
		int close = type.lastIndexOf(')');
		
		String head = type.substring(0, open).toUpperCase();
		String tail = type.substring(close+1).toUpperCase();
		
		return head + type.substring(open, close+1) + tail;
	}
	
	private String replaceGlyph(String str) {
		if (str.contains("©¡"))
			str = str.replaceAll("©¡", "&aelig;");
		if (str.contains("©¬"))
			str = str.replaceAll("©¬", "&szlig;");
		if (str.contains("\""))
			str = str.replaceAll("\"", "&quot;");
		if (str.contains("¡¯"))
			str = str.replaceAll("¡¯", "&rsquo;");
		
		return str;
	}
	
	public List<String> getResultSetRowAt(int row) {
		int cnt = getResultSetColumnCount();
		
		List<String> v = new Vector<String>(cnt);
		
		try {
			rs.absolute(row);

			for (int i = 1 ; i <= cnt; i++) {
				switch (rsmd.getColumnType(i)) {
					case Types.CHAR:
					case Types.VARCHAR:
					case Types.LONGVARCHAR:
						String str = rs.getString(i);
						if (str == null)
							v.add(null);
						else {
							str = replaceGlyph(str);
							v.add(str);
						}
						break;
					case Types.NUMERIC:
					case Types.DECIMAL:
						v.add(rs.getBigDecimal(i).toString());
						break;
					case Types.BIT:
						v.add(Boolean.toString(rs.getBoolean(i)));
						break;
					case Types.TINYINT:
						v.add(Byte.toString(rs.getByte(i)));
						break;
					case Types.SMALLINT:
						v.add(Short.toString(rs.getShort(i)));
						break;
					case Types.INTEGER:
						v.add(Integer.toString(rs.getInt(i)));
						break;
					case Types.BIGINT:
						v.add(Long.toString(rs.getLong(i)));
						break;
					case Types.REAL:
						v.add(Float.toString(rs.getFloat(i)));
						break;
					case Types.FLOAT:
					case Types.DOUBLE:
						v.add(Double.toString(rs.getDouble(i)));
						break;
					case Types.BINARY:
					case Types.VARBINARY:
					case Types.LONGVARBINARY:
						byte[] bytes = rs.getBytes(i);
						if (bytes == null)
							v.add(null);
						else
							v.add(new String(bytes));
						break;
					case Types.DATE:
						v.add(rs.getDate(i).toString() + "T00:00:00.000");
						break;
					case Types.TIME:
						v.add(rs.getTime(i).toString());
						break;
					case Types.TIMESTAMP:
						Timestamp timestamp = rs.getTimestamp(i);
						if (timestamp == null)
							v.add(null);
						else
							v.add(timestamp.toString().replace(" ", "T") + "00");
						break;
				}
			}
		} catch(SQLException e) { e.printStackTrace(); }
		
		return v;
	}
	
	public String getColumnDefaultValue(String catalog, String table, String column) {
		String defaultValue = null;
		
		try {
			Statement stmt = connection.createStatement();
			
			ResultSet rs = stmt.executeQuery("DESCRIBE " + catalog + "." + table + " " + column);
			ResultSetMetaData rsmd = rs.getMetaData();
			
			int cnt = rsmd.getColumnCount();
			
			rs.absolute(1);
			
			for(int i = 1; i <= cnt; i++)
				if(rsmd.getColumnLabel(i).equals("Default")) {
					defaultValue = rs.getString(i);
					break;
				}
		} catch(SQLException e) { e.printStackTrace(); }
		
		return defaultValue;
	}
}