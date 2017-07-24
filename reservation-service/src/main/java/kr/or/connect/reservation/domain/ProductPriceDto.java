package kr.or.connect.reservation.domain;

import java.math.BigDecimal;

public class ProductPriceDto {
	Integer productId;
	Integer priceType;
	Integer price;
	BigDecimal discountRate;
	
	public ProductPriceDto(){
		
	}
	public ProductPriceDto(Integer productId
			, Integer priceType
			, Integer price
			, BigDecimal discountRate){
		this.productId = productId;
		this.priceType = priceType;
		this.price = price;
		this.discountRate = discountRate;
	}
	
	public Integer getProductId() {
		return productId;
	}
	public void setProductId(Integer productId) {
		this.productId = productId;
	}
	public Integer getPriceType() {
		return priceType;
	}
	public void setPriceType(Integer priceType) {
		this.priceType = priceType;
	}
	public Integer getPrice() {
		return price;
	}
	public void setPrice(Integer price) {
		this.price = price;
	}
	public BigDecimal getDiscountRate() {
		return discountRate;
	}
	public void setDiscountRate(BigDecimal discountRate) {
		this.discountRate = discountRate;
	}
	
	@Override
	public String toString() {
		return "ProductPriceDto [productId=" + productId + ", priceType=" + priceType + ", price=" + price
				+ ", discountRate=" + discountRate + "]";
	}
	
	
}
