package kr.or.connect.jdbc;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

import kr.or.connect.reservation.config.RootApplicationContextConfig;
import kr.or.connect.reservation.dao.ProductListDao;
import kr.or.connect.reservation.domain.ProductList;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertThat;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = RootApplicationContextConfig.class)
@Transactional
public class ProductListJdbcTest {
	@Autowired
	ProductListDao productListDao;
	
	@Test
	public void shouldSelectAll(){
		List<ProductList> result = productListDao.selectAll(10, 0);
		
		assertNotNull(result);
		//assertThat(result.size(), is(10));
	}
	
	@Test
	public void shouldSelectAllCat(){
		List<ProductList> result = productListDao.selectByCategory(10, 0, 1);
		
		assertNotNull(result);
	}
	
	@Test
	public void shouldSelectCount(){
		Integer count = productListDao.selectCount(0);
		assertNotNull(count);
		
		count = productListDao.selectCount(1);
		assertThat(count, is(0));
	}
}
