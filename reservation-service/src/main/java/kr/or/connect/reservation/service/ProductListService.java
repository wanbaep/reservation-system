package kr.or.connect.reservation.service;

import java.util.List;

import kr.or.connect.reservation.domain.ProductList;

public interface ProductListService {
	public List<ProductList> getAll(int limit, int offset);
	public List<ProductList> getAllByCategory(int limit, int offset, int categoryId);
	public int getCount(int salesFlag);
}
