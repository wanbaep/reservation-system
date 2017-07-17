package kr.or.connect.reservation.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.connect.reservation.dao.ProductDetailDao;
import kr.or.connect.reservation.domain.ProductDetail;
import kr.or.connect.reservation.service.ProductDetailService;

@Service
public class ProductDetailServiceImpl implements ProductDetailService {
	@Autowired
	ProductDetailDao productDetailDao;
	
	@Override
	@Transactional(readOnly = true)
	public ProductDetail getDetailByProductId(int id) {
		ProductDetail result = productDetailDao.selectProductDetailById(id);
		return result;
	}

	@Override
	@Transactional(readOnly = true)
	public List<Integer> getImageIdByProductId(int id) {
		List<Integer> result = productDetailDao.selectProductImageById(id);
		return result;
	}
	
}
