package ac.kr.ssu.nPM.database;

public enum nPMDBMSTypes {
	MY_SQL("org.gjt.mm.mysql.Driver");
	
	private final String driver;
	
	private nPMDBMSTypes(String driver){
		this.driver = driver;
	}
	
	public String driver() { return driver; }
}
