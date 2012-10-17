package ac.kr.ssu.nPM.database;

import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.sql.Types;
import java.util.List;
import java.util.Set;
import java.util.Vector;
import java.util.concurrent.ConcurrentSkipListSet;

public abstract class nPMDBBridge {
	protected Connection connection;
	protected ResultSetMetaData rsmd;
	protected ResultSet rs;
	
	protected static void loadDriver(String driver) {
		try {
			Class.forName(driver);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
	}
	
	protected Connection getConnection(String url, String user, String password) {
		Connection connection = null;
		
		try {
			connection = DriverManager.getConnection(url, user, password);
		} catch (SQLException e) { e.printStackTrace(); }

		return connection;
	}
	
	public boolean isConnected() {
		if(connection == null) return false;
		
		return true;
	}
	
	public void disconnect() {
		try {
			if(isConnected()) connection.close();
		} catch (SQLException e) { e.printStackTrace(); }
	}
	
	public String getSuperTable(String catalog, String table) {
		Set<String> pks = getPrimaryKeys(catalog, table);
		Set<String> fks = getForeignKeys(catalog, table);
		
		if (fks.containsAll(pks)) {
			Set<String> referencedTables = new ConcurrentSkipListSet<String>();
			Set<String> referencedColumns = new ConcurrentSkipListSet<String>();
			
			for (String pk: pks) {
				String tableDotColumn = getColumnReferencedBy(catalog, table, pk);
				String[] splitTableDotColumn = tableDotColumn.split("\\.");
				String referencedTable = splitTableDotColumn[0];
				String referencedColumn = splitTableDotColumn[1];
				referencedTables.add(referencedTable);
				referencedColumns.add(referencedColumn);
			}
			
			if (referencedTables.size() == 1 && referencedColumns.size() == pks.size()) {
				String superTable = null;
				for (String referencedTable: referencedTables)
					superTable = referencedTable;
				
				Set<String> primaryKeysInSuperTable = getPrimaryKeys(catalog, superTable);
				if (primaryKeysInSuperTable.size() == referencedColumns.size() && primaryKeysInSuperTable.containsAll(referencedColumns))
					return superTable;
			}
		}
		
		return null;
	}
	
	public String getColumnTypeName(String catalog, String table, String column) {
		String typeName = null;
		
		try {
			DatabaseMetaData dbmd = connection.getMetaData();
			
			ResultSet columns = dbmd.getColumns(catalog, null, table, column);
			columns.absolute(1);
			typeName = columns.getString("TYPE_NAME");
		} catch(SQLException e) { e.printStackTrace(); }
		
		return typeName;
	}
	
	public int getDataType(String catalog, String table, String column) {
		int type = 2012;
		
		try {
			DatabaseMetaData dbmd = connection.getMetaData();
			
			ResultSet columns = dbmd.getColumns(catalog, null, table, column);
			columns.absolute(1);
			type = columns.getInt("DATA_TYPE");
		} catch(SQLException e) { e.printStackTrace(); }
		
		return type;
	}
	
	public String getColumnDefaultValue(String catalog, String table, String column) {
		String defaultValue = null;
		
		try {
			DatabaseMetaData dbmd = connection.getMetaData();
			
			ResultSet columns = dbmd.getColumns(catalog, null, table, column);
			columns.absolute(1);
			defaultValue = columns.getString("COLUMN_DEF");
		} catch(SQLException e) { e.printStackTrace(); }
		
		return defaultValue;
	}
	
	// about DB Scheme
	public abstract String getConnectedCatalog();
	public abstract Set<String> getTables(String catalog);
	
	public Set<String> getPrimaryKeys(String catalog, String table) {
		Set<String> set = new ConcurrentSkipListSet<String>();
		
		try {
			DatabaseMetaData dbmd = connection.getMetaData();
			
			ResultSet pkSet = dbmd.getPrimaryKeys(catalog, null, table);
			while (pkSet.next())
				set.add(pkSet.getString("COLUMN_NAME"));
		} catch(SQLException e) { e.printStackTrace(); }
		
		return set;
	}
	
	public Set<String> getNonPKColumns(String catalog, String table) {
		Set<String> set = new ConcurrentSkipListSet<String>();
		
		try {
			DatabaseMetaData dbmd = connection.getMetaData();
			
			ResultSet fieldSet = dbmd.getColumns(catalog, null, table, null);
			while (fieldSet.next()) {
				String fieldName = fieldSet.getString("COLUMN_NAME");
				boolean alreadyExists = false;
				
				Set<String> pks = getPrimaryKeys(catalog, table);
				for(String pk : pks)
					if(fieldName.equals(pk)) {
						alreadyExists = true;
						break;
					}

				if(!alreadyExists)
					set.add(fieldName);
			}
		} catch(SQLException e) { e.printStackTrace(); }
		
		return set;
	}
	
	public Set<String> getColumns(String catalog, String table) {
		Set<String> set = new ConcurrentSkipListSet<String>();

		try {
			DatabaseMetaData dbmd = connection.getMetaData();

			ResultSet fieldSet = dbmd.getColumns(catalog, null, table, null);
			
			while (fieldSet.next()) {
				String fieldName = fieldSet.getString("COLUMN_NAME");
				set.add(fieldName);
			}
		} catch(SQLException e) { e.printStackTrace(); }

		return set;
	}
	
	public Set<String> getForeignKeys(String catalog, String table) {
		Set<String> set = new ConcurrentSkipListSet<String>();

		try {
			DatabaseMetaData dbmd = connection.getMetaData();

			ResultSet fkSet = dbmd.getImportedKeys(catalog, null, table);
			while (fkSet.next())
				set.add(fkSet.getString("FKCOLUMN_NAME"));
		} catch(SQLException e) { e.printStackTrace(); }

		return set;
	}
	
	public abstract Set<String> getUniqueKeys(String catalog, String table);
	public abstract Set<String> getSingleColumnUniqueKeys(String catalog, String table);
	
	public Set<String> getNotNullColumns(String catalog, String table) {
		Set<String> set = new ConcurrentSkipListSet<String>();

		try {
			DatabaseMetaData dbmd = connection.getMetaData();

			ResultSet fieldSet = dbmd.getColumns(catalog, null, table, null);
			
			while (fieldSet.next()) {
				String isNullable = fieldSet.getString("IS_NULLABLE");
				if (isNullable.equals("NO")) {
					String columnName = fieldSet.getString("COLUMN_NAME");
					set.add(columnName);
				}
			}
		} catch(SQLException e) { e.printStackTrace(); }

		return set;
	}
	
	// about column attributes
	public boolean isNullable(String catalog, String table, String column) {
		boolean is = true;
		
		try {
			DatabaseMetaData dbmd = connection.getMetaData();
			
			ResultSet columns = dbmd.getColumns(catalog, null, table, column);
			columns.absolute(1);
			if(columns.getString("IS_NULLABLE").equals("NO")) is = false;
		} catch(SQLException e) { e.printStackTrace(); }
		
		return is;
	}
	
	public boolean isAutoIncrement(String catalog, String table, String column) {
		boolean is = false;
		
		try {
			DatabaseMetaData dbmd = connection.getMetaData();
			
			ResultSet columns = dbmd.getColumns(catalog, null, table, column);
			columns.absolute(1);
			if(columns.getString("IS_AUTOINCREMENT").equals("YES")) is = true;
		} catch(SQLException e) { e.printStackTrace(); }
		
		return is;
	}
	
	public boolean isPrimaryKey(String catalog, String table, String column) {
		boolean is = false;
		
		try {
			DatabaseMetaData dbmd = connection.getMetaData();
			
			ResultSet pkSet = dbmd.getPrimaryKeys(catalog, null, table);
			while (pkSet.next())
				if(pkSet.getString("COLUMN_NAME").equals(column)) {
					is = true;
					break;
				}
		} catch(SQLException e) { e.printStackTrace(); }
		
		return is;
	}
	
	private boolean isForeignKey(String catalog, String table, String column) {
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
	}
	
	//public abstract boolean isUniqueKey(String catalog, String table, String column);
	//public abstract boolean isKey(String catalog, String table, String column);
	
	public String getColumnReferencedBy(String catalog, String table, String column) {
		try {
			DatabaseMetaData dbmd = connection.getMetaData();

			ResultSet fkSet = dbmd.getImportedKeys(catalog, null, table);
			while (fkSet.next())
				if (column.equals(fkSet.getString("FKCOLUMN_NAME"))) {
					String pkTable = fkSet.getString("PKTABLE_NAME");
					String pkColumn = fkSet.getString("PKCOLUMN_NAME");
					
					return pkTable + "." + pkColumn;
				}
					
		} catch(SQLException e) { e.printStackTrace(); }
		
		return null;
	}
	
	public String getRootColumnReferencedBy(String catalog, String table, String column) {
		String referencedColumn = getColumnReferencedBy(catalog, table, column);
		String[] tableDotColumn = referencedColumn.split("\\.");
		String parentTable = tableDotColumn[0];
		String parentColumn = tableDotColumn[1];
		
		while (isForeignKey(catalog, parentTable, parentColumn)) {
			referencedColumn = getColumnReferencedBy(catalog, parentTable, parentColumn);
			tableDotColumn = referencedColumn.split("\\.");
			parentTable = tableDotColumn[0];
			parentColumn = tableDotColumn[1];
		}
		
		return parentTable + "." + parentColumn;
	}
	
	// about SQL query
	public abstract nPMSQLResultSet executeQuery(String query);
	
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
	
	public abstract String getColumnName(int column);
	public abstract int findColumn(String columnLabel);
	
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
						v.add(rs.getString(i));
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
						v.add(rs.getDate(i).toString());
						break;
					case Types.TIME:
						v.add(rs.getTime(i).toString());
						break;
					case Types.TIMESTAMP:
						Timestamp timestamp = rs.getTimestamp(i);
						if (timestamp == null)
							v.add(null);
						else
							v.add(timestamp.toString());
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
	
	protected abstract String buildURL(String host, String port, String schema);
}
