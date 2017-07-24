package kr.or.connect.reservation.service;

import java.util.List;

import kr.or.connect.reservation.domain.ProductDisplayDto;
import kr.or.connect.reservation.domain.ProductPriceDto;
import kr.or.connect.reservation.domain.ProductTitleImageDto;

public interface ReserveService {
	public ProductDisplayDto getProductDisplayByProductId(Integer productId);
	public ProductTitleImageDto getProductTitleImageByProductId(Integer productId);
	public List<ProductPriceDto> getProductPriceByProductId(Integer productId);
}
