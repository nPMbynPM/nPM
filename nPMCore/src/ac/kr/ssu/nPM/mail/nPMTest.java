package ac.kr.ssu.nPM.mail;

public class nPMTest {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		nPMSendMail sd = new nPMSendMail();
		sd.setMail("doubletaken@gmail.com");
		sd.getProperty();
		sd.sendMail();
	}

}