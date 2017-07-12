package kr.or.connect.jdbc;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

import kr.or.connect.reservation.config.RootApplicationContextConfig;
import kr.or.connect.reservation.dao.UserDao;
import kr.or.connect.reservation.domain.User;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = RootApplicationContextConfig.class)
@Transactional
public class UserJdbcTest {
	@Autowired
	UserDao userDao;
	
	@Test
	public void shouldSelect(){
		User result = userDao.selectById(1);
		
		assertNotNull(result);
	}
}
