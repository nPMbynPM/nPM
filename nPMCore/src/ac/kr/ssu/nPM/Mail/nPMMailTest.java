package ac.kr.ssu.nPM.mail;

public class nPMMailTest {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		nPMSendMail npm = new nPMSendMail();
		npm.setMail("doubletaken@gmail.com");
		npm.getProperty();
		npm.sendMail();
	}

}
