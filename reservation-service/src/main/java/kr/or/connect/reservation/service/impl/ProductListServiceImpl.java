package kr.or.connect.reservation.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.connect.reservation.dao.ProductListDao;
import kr.or.connect.reservation.domain.ProductList;
import kr.or.connect.reservation.service.ProductListService;

@Service
public class ProductListServiceImpl implements ProductListService {
	@Autowired
	ProductListDao productListDao;

	@Override
	@Transactional(readOnly=true)
	public List<ProductList> getAll(int limit, int offset) {
		List<ProductList> result = productListDao.selectAll(limit, offset);
		return result;
	}

	@Override
	@Transactional(readOnly=true)
	public List<ProductList> getAllByCategory(int limit, int offset, int categoryId) {
		List<ProductList> result = productListDao.selectByCategory(limit, offset, categoryId);
		return result;
	}

	@Override
	@Transactional(readOnly=true)
	public int getCount(int salesFlag) {
		int count = productListDao.selectCount(salesFlag);
		return count;
	}
	
	
}
