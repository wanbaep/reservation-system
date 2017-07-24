package kr.or.connect.reservation.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.connect.reservation.dao.ReserveDao;
import kr.or.connect.reservation.domain.ProductDisplayDto;
import kr.or.connect.reservation.domain.ProductPriceDto;
import kr.or.connect.reservation.domain.ProductTitleImageDto;
import kr.or.connect.reservation.service.ReserveService;

@Service
public class ReserveServiceImpl implements ReserveService {
	@Autowired
	ReserveDao reserveDao;
	
	@Override
	@Transactional(readOnly = true)
	public ProductDisplayDto getProductDisplayByProductId(Integer productId) {
		return reserveDao.selectProductDisplayInfoByProductId(productId);
	}

	@Override
	@Transactional(readOnly = true)
	public ProductTitleImageDto getProductTitleImageByProductId(Integer productId) {
		return reserveDao.selectProductTitleImageByProductId(productId);
	}

	@Override
	@Transactional(readOnly = true)
	public List<ProductPriceDto> getProductPriceByProductId(Integer productId) {
		return reserveDao.selectProductPriceByProductId(productId);
	}

}
