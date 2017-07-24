package kr.or.connect.reservation.domain;

import java.sql.Date;

public class ProductDisplayDto {
	Integer id;
	String name;
	String description;
	Date salesStart;
	Date salesEnd;
	String observationTime;
	String placeName;
	Date displayStart;
	Date displayEnd;
	
	public ProductDisplayDto(){
		
	}
	public ProductDisplayDto(Integer id
			, String name
			, String description
			, Date salesStart
			, Date salesEnd
			, String observationTime
			, String placeName
			, Date displayStart
			, Date displayEnd){
		this.id = id;
		this.name = name;
		this.description = description;
		this.salesStart = salesStart;
		this.salesEnd = salesEnd;
		this.observationTime = observationTime;
		this.placeName = placeName;
		this.displayStart = displayStart;
		this.displayEnd = displayEnd;
	}
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Date getSalesStart() {
		return salesStart;
	}
	public void setSalesStart(Date salesStart) {
		this.salesStart = salesStart;
	}
	public Date getSalesEnd() {
		return salesEnd;
	}
	public void setSalesEnd(Date salesEnd) {
		this.salesEnd = salesEnd;
	}
	public String getObservationTime() {
		return observationTime;
	}
	public void setObservationTime(String observationTime) {
		this.observationTime = observationTime;
	}
	public String getPlaceName() {
		return placeName;
	}
	public void setPlaceName(String placeName) {
		this.placeName = placeName;
	}
	public Date getDisplayStart() {
		return displayStart;
	}
	public void setDisplayStart(Date displayStart) {
		this.displayStart = displayStart;
	}
	public Date getDisplayEnd() {
		return displayEnd;
	}
	public void setDisplayEnd(Date displayEnd) {
		this.displayEnd = displayEnd;
	}
	
	@Override
	public String toString() {
		return "ProductDisplayDto [id=" + id + ", name=" + name + ", description=" + description + ", salesStart="
				+ salesStart + ", salesEnd=" + salesEnd + ", observationTime=" + observationTime + ", placeName="
				+ placeName + ", displayStart=" + displayStart + ", displayEnd=" + displayEnd + "]";
	}
	
}
