package vo;

public class MemberVO {
	private int seq = 0;
	private String userid =  null;
	private String username = null;
	private String userpw = null;
	private String regdate = null;
	
	public int getSeq() {
		return seq;
	}
	public String getUserid() {
		return userid;
	}
	public String getUsername() {
		return username;
	}
	public String getUserpw() {
		return userpw;
	}
	public String getRegdate() {
		return regdate;
	}
	public void setSeq(int seq) {
		this.seq = seq;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public void setUserpw(String userpw) {
		this.userpw = userpw;
	}
	public void setRegdate(String regdate) {
		this.regdate = regdate;
	}
	
	
}
