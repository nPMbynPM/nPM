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
public class nPMSendMailTLSTest {
	
	public static void main(String[] args) {
 
		final String username = nPMManager.ID;
		final String password = nPMManager.PASSWORD;

		//call property
		Properties props = new nPMProperty().getProperties();	
		
		//session connection
		Session session = Session.getInstance(props,
		  new javax.mail.Authenticator() {
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(username, password);
			}
		  });
 
		try {
 
			Message message = new MimeMessage(session);
			message.setFrom(new InternetAddress(nPMManager.EMAIL));
			message.setRecipients(Message.RecipientType.TO,InternetAddress.parse("doubletaken@gmail.com"));
			message.setSubject(nPMManager.SUBJECT);
			message.setText(nPMManager.TEXT);
 
			Transport.send(message);
 
			System.out.println("Completed..");
 
		} catch (MessagingException e) {
			throw new RuntimeException(e);
		}
	}
}