package kr.or.connect.reservation.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.connect.reservation.dao.UserDao;
import kr.or.connect.reservation.domain.User;
import kr.or.connect.reservation.service.UserService;

@Service
public class UserServiceImpl implements UserService {
	@Autowired
	UserDao userDao;
	
	@Override
	@Transactional(readOnly = true)
	public User getUserById(int id) {
		return userDao.selectById(id);
	}
}
