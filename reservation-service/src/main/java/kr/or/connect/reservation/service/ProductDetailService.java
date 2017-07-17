package kr.or.connect.reservation.service;

import java.util.List;

import kr.or.connect.reservation.domain.ProductDetail;

public interface ProductDetailService {
	public ProductDetail getDetailByProductId(int id);
	public List<Integer> getImageIdByProductId(int id);
}
