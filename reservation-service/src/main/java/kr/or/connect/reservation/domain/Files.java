package kr.or.connect.reservation.domain;

public class Files {
	Integer id;
	int userId;
	String fileName;
	String saveFileName;
	int fileLength;
	String contentType;
	int deleteFlag;
	String createDate;
	String modifyDate;
	
	public Files(){
		
	}
	
	public Files(int userId, String fileName, String saveFileName, int fileLength, String contentType, int deleteFlag, String createDate, String modifyDate){
		this.userId = userId;
		this.fileName = fileName;
		this.saveFileName = saveFileName;
		this.fileLength = fileLength;
		this.contentType = contentType;
		this.deleteFlag = deleteFlag;
		this.createDate = createDate;
		this.modifyDate = modifyDate;
	}
	
	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}

	public void setModifyDate(String modifyDate) {
		this.modifyDate = modifyDate;
	}

	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	public String getSaveFileName() {
		return saveFileName;
	}
	public void setSaveFileName(String saveFileName) {
		this.saveFileName = saveFileName;
	}
	public int getFileLength() {
		return fileLength;
	}
	public void setFileLength(int fileLength) {
		this.fileLength = fileLength;
	}
	public String getContentType() {
		return contentType;
	}
	public void setContentType(String contentType) {
		this.contentType = contentType;
	}
	public int getDeleteFlag() {
		return deleteFlag;
	}
	public void setDeleteFlag(int deleteFlag) {
		this.deleteFlag = deleteFlag;
	}
	public String getCreateDate() {
		return createDate;
	}

	public String getModifyDate() {
		return modifyDate;
	}

	@Override
	public String toString() {
		return "File [id=" + id + ", userId=" + userId + ", fileName=" + fileName + ", saveFileName=" + saveFileName
				+ ", fileLength=" + fileLength + ", contentType=" + contentType + ", deleteFlag=" + deleteFlag
				+ ", createDate=" + createDate + ", modifyDate=" + modifyDate + "]";
	}
	
	
}
