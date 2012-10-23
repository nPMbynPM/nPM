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
	
	private String userName;
	private String password;
	
	private String email;
	private String subject;
	private String text;
	
	public nPMSendMail(){
		
		nPMManager manager = new nPMManager();
		
		this.userName = manager.getName();
		this.password = manager.getPassWord();
		this.email = manager.getEmail();
		this.subject = manager.getSubject();
		
		manager.addedProject();
		this.text = manager.getText();
		
	}
	
	public void getProperty(){
		
		this.props = new nPMProperty().getProperties();
		
		//session connection
		this.session = Session.getInstance(props,
		  new javax.mail.Authenticator() {
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(userName, password);
			}
		  });
	}
	
	public void sendMail(){
		
		try {
			 
			this.message = new MimeMessage(this.session);
			this.message.setFrom(new InternetAddress(this.email));
			this.message.setRecipients(Message.RecipientType.TO,InternetAddress.parse(this.mailAddress));
			this.message.setSubject(this.subject);
			this.message.setText(this.text);
 
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
