package ac.kr.ssu.nPM.database;

public class nPMDBBridgeFactory {
	public static nPMDBBridge getDBBridge(nPMDBMSTypes DBMS_TYPE, String host, String port, String id, String password, String schema) {
		nPMDBBridge dbBridge = null;
		
		if(DBMS_TYPE.equals(nPMDBMSTypes.MY_SQL))
			dbBridge = nPMMySQLBridge.getInstance(host, port, id, password, schema);
		
		return dbBridge;
	}
}
