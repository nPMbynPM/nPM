package ac.kr.ssu.nPM.mail;

/**
 * @author Complete
 *
 */
public class nPMManager{
	
	private String name = "MANAGER";
	private String id = "manager@gmail.com";
	private String passWord = "*******";
	
	private String email = "manager@gmail.com";	
	private String subject = "[nPM]_Added Project";	
	private String text = "Added to new project";
	
	public nPMManager(){
		
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getPassWord() {
		return passWord;
	}

	public void setPassWord(String passWord) {
		this.passWord = passWord;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getText() {
		return text;
	}

	public void setText(String text){
		this.text = text;
	}
	
	public void addedProject() {
		
		StringBuilder added = new StringBuilder();
		
		added.append("You were added to new project.\n");
		added.append("Please check project list.\n");
		added.append("go to --> http://solar4.ssu.ac.kr:8080 \n\n\n");
		added.append("Best regards.\n\n");
		added.append("--By Manager\n");
		
		this.text = added.toString();
	}
	
	public void deletedProject(){
		
	}
	
	public void updatedProject(){
		
	}
		
}
