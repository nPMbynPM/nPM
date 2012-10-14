package ac.kr.ssu.nPM.database;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.sql.Types;
import java.util.List;
import java.util.Vector;

public class nPMSQLResultSet {
	ResultSet rs;
	ResultSetMetaData rsmd;
	
	nPMSQLResultSet(ResultSet rs, ResultSetMetaData rsmd) {
		this.rs = rs;
		this.rsmd = rsmd;
	}
	
	public int getResultSetColumnCount() {
		int cnt = 0;
		
		try {
			cnt = rsmd.getColumnCount();
		} catch(SQLException e) { e.printStackTrace(); }
		
		return cnt;
	}
	
	public String getResultSetColumnLabel(int column) {
		String label = null;
		
		try {
			label = rsmd.getColumnLabel(column);
		} catch(SQLException e) {e.printStackTrace(); }
		
		return label;
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
	
	public int getResultSetRowCount() {
		int cnt = 0;
		try {
			if(rs.last()) cnt = rs.getRow();
		} catch(SQLException e) { e.printStackTrace(); }
		
		return cnt;
	}
	
	public String getColumnName(int column) {
		String name = null;
		
		try {
			name = rsmd.getColumnName(column);
		} catch(SQLException e) { e.printStackTrace(); }
		
		return name;
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
}
