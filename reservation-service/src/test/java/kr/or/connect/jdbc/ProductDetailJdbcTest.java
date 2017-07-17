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
import kr.or.connect.reservation.dao.ProductDetailDao;
import kr.or.connect.reservation.domain.ProductDetail;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = RootApplicationContextConfig.class)
@Transactional
public class ProductDetailJdbcTest {
	@Autowired
	ProductDetailDao productDetailDao;
	
	@Test
	public void shouldSelectDetailById(){
		ProductDetail result = productDetailDao.selectProductDetailById(3);
		
		assertNotNull(result);
	}
	
	@Test
	public void shouldSelectImageById(){
		List<Integer> result = productDetailDao.selectProductImageById(3);
		
		assertNotNull(result);
	}
	
}
