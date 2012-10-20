/**
 * 
 */
package ac.kr.ssu.nPM.mail;

import java.util.Properties;

/**
 * @author Complete
 *
 */
public class nPMProperty {

	private Properties props;
	
	public nPMProperty(){
		
		this.props = new Properties();
		this.props.put("mail.smtp.auth", "true");
		this.props.put("mail.smtp.starttls.enable", "true");
		this.props.put("mail.smtp.host", nPMSMTPList.GMAIL);
		this.props.put("mail.smtp.port", nPMSMTPList.GMAILPORT);
	}
	
	public Properties getProperties(){	
		
		return this.props;	
	}
	
}
