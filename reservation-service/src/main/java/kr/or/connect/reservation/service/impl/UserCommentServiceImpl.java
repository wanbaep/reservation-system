package kr.or.connect.reservation.service.impl;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.connect.reservation.dao.UserCommentDao;
import kr.or.connect.reservation.domain.UserComment;
import kr.or.connect.reservation.dto.FileIdDto;
import kr.or.connect.reservation.service.UserCommentService;

@Service
public class UserCommentServiceImpl implements UserCommentService {
	@Autowired
	UserCommentDao userCommentDao;

	@Override
	@Transactional(readOnly = true)
	public List<UserComment> getUserCommentByProductId(int productId, int limit, int offset) {
		
		return userCommentDao.selectUserCommentByProductId(productId, limit, offset);
	}
	
	@Override
	@Transactional(readOnly = true)
	public List<FileIdDto> getUserCommentFileId(int productId, int limit, int offset){
		return userCommentDao.selectUserCommentFileId(productId, limit, offset);
	}
	
	@Override
	@Transactional(readOnly = true)
	public Integer getUserCommentCount(int productId) {
		return userCommentDao.selectUserCommentCount(productId);
	}

	@Override
	@Transactional(readOnly = true)
	public BigDecimal getUserCommentAvg(int productId) {
		
		return userCommentDao.selectUserCommentAvg(productId);
	}
	
}
