package kr.or.connect.jdbc;

import static org.junit.Assert.assertNotNull;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

import kr.or.connect.reservation.config.RootApplicationContextConfig;
import kr.or.connect.reservation.dao.ReserveDao;
import kr.or.connect.reservation.domain.ProductDisplayDto;
import kr.or.connect.reservation.domain.ProductPriceDto;
import kr.or.connect.reservation.domain.ProductTitleImageDto;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = RootApplicationContextConfig.class)
@Transactional
public class ReserveJdbcTest {
	@Autowired
	ReserveDao reserveDao;
	
	@Test
	public void shouldSelectProductDisplayDto(){
		ProductDisplayDto productDisplayDto = reserveDao.selectProductDisplayInfoByProductId(1);
		assertNotNull(productDisplayDto);
	}
	
	@Test
	public void shouldSelectProductTitleImageDto(){
		ProductTitleImageDto productTitleImageDto = reserveDao.selectProductTitleImageByProductId(3);
		assertNotNull(productTitleImageDto);
	}
	
	@Test
	public void shouldSelectProductPriceDto(){
		List<ProductPriceDto> productPriceDto = reserveDao.selectProductPriceByProductId(1);
		assertNotNull(productPriceDto);
	}
}
