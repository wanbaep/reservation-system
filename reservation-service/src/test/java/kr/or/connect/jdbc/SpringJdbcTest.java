package kr.or.connect.jdbc;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

import kr.or.connect.reservation.config.RootApplicationContextConfig;
import kr.or.connect.reservation.dao.CategoryDao;
import kr.or.connect.reservation.domain.Category;


@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = RootApplicationContextConfig.class)
@Transactional
public class SpringJdbcTest {
	@Autowired
	CategoryDao categoryDao;
	
	@Test
	public void shouldInsertAndSelectById(){
		Category category = new Category("뮤지컬");
		Integer categoryPk = categoryDao.insert(category);
		
		Category result = categoryDao.selectCategoryById(categoryPk);
		
		assertThat(result.getName(), is("뮤지컬"));
	}
	
	@Test
	public void shouldInsertAndSelect(){
		Category category = new Category("뮤지컬");
		Integer categoryPk = categoryDao.insert(category);
		
		List<Category> resultList = categoryDao.selectCategories();
		assertNotNull(resultList);
	}
	
	@Test
	public void shouldInsertAndUpdate(){
		Category category = new Category("뮤지컬");
		Integer categoryPk = categoryDao.insert(category);
		
		category.setId(categoryPk);
		category.setName("전시회");
		int updateCount = categoryDao.update(category);
		
		Category result = categoryDao.selectCategoryById(categoryPk);
		assertThat(result.getName(), is("전시회"));
	}
	
	@Test
	public void shouldInsertAndDelete(){
		Category category = new Category("뮤지컬");
		Integer categoryPk = categoryDao.insert(category);
		
		int deleteCount = categoryDao.delete(categoryPk);
		
		assertThat(deleteCount, is(1));
	}
}
