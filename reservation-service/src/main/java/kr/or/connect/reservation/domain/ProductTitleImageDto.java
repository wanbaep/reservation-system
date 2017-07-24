package kr.or.connect.reservation.domain;

public class ProductTitleImageDto {
	Integer id;
	Integer fileId;
	
	public ProductTitleImageDto(){
		
	}
	
	public ProductTitleImageDto(Integer id, Integer fileId){
		this.id = id;
		this.fileId = fileId;
	}
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getFileId() {
		return fileId;
	}
	public void setFileId(Integer fileId) {
		this.fileId = fileId;
	}

	@Override
	public String toString() {
		return "ProductTitleImageDto [id=" + id + ", fileId=" + fileId + "]";
	}
	
	
}
