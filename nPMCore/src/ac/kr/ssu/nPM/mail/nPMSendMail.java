package ac.kr.ssu.nPM.mail;

import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

/**
 * @author Complete
 *
 */
public class nPMSendMail {

	private String mailAddress;
	private Message message;
	private Session session;
	private Properties props;
	
	private static final String username = nPMManager.ID;
	private static final String password = nPMManager.PASSWORD;
	
	public nPMSendMail(){
		
	}
	
	protected void getProperty(){
		
		this.props = new nPMProperty().getProperties();
		
		//session connection
		this.session = Session.getInstance(props,
		  new javax.mail.Authenticator() {
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(username, password);
			}
		  });
	}
	
	protected void sendMail(){
		
		try {
			 
			this.message = new MimeMessage(this.session);
			this.message.setFrom(new InternetAddress(nPMManager.EMAIL));
			this.message.setRecipients(Message.RecipientType.TO,InternetAddress.parse(this.mailAddress));
			this.message.setSubject(nPMManager.SUBJECT);
			this.message.setText(nPMManager.TEXT);
 
			Transport.send(message);
 
			System.out.println("Completed..");
 
		} catch (MessagingException e) {
			throw new RuntimeException(e);
		}
	}
	
	/**
	 * @return the mailAddress
	 */
	public String getMail() {
		return mailAddress;
	}
	
	/**
	 * @param mailAddress the mail to set
	 */
	public void setMail(String mailAddress) {
		this.mailAddress = mailAddress;
		this.checkMailAddress(this.mailAddress);
	}
	
	private void checkMailAddress(String mailAddress){
		
				
	}
	
}
