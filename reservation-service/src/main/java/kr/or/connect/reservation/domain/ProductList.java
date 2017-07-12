package kr.or.connect.reservation.domain;

public class ProductList {
	String name;
	String placeName;
	String content;
	String fileName;
	String saveFileName;
	
	public ProductList(){
		
	}
	public ProductList(String name){
		this.name = name;
	}
	public ProductList(String name, String placeName){
		this.name = name;
		this.placeName = placeName;
	}
	public ProductList(String name, String placeName, String content){
		this.name = name;
		this.placeName = placeName;
		this.content = content;
	}
	public ProductList(String name, String placeName, String content, String fileName){
		this.name = name;
		this.placeName = placeName;
		this.content = content;
		this.fileName = fileName;
	}
	public ProductList(String name, String placeName, String content, String fileName, String saveFileName){
		this.name = name;
		this.placeName = placeName;
		this.content = content;
		this.fileName = fileName;
		this.saveFileName = saveFileName;
	}
	
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPlaceName() {
		return placeName;
	}
	public void setPlaceName(String placeName) {
		this.placeName = placeName;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
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
	
	
}
