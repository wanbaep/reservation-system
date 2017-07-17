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
import kr.or.connect.reservation.dao.UserCommentDao;
import kr.or.connect.reservation.domain.UserComment;
import kr.or.connect.reservation.dto.FileIdDto;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = RootApplicationContextConfig.class)
@Transactional
public class UserCommentJdbcTest {
	@Autowired
	UserCommentDao userCommentDao;
	@Autowired
	
	@Test
	public void shouldSelectCommentByProductId(){
		List<UserComment> result = userCommentDao.selectUserCommentByProductId(3, 3, 0);
		assertNotNull(result);
	}
	
	@Test
	public void shouldSelectCommentFileId(){
		List<FileIdDto> result = userCommentDao.selectUserCommentFileId(3, 3, 0);
		
		assertNotNull(result);
	}
	
	
}
