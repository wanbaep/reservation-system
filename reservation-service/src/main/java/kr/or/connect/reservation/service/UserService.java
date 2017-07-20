package kr.or.connect.reservation.service;

import kr.or.connect.reservation.domain.User;

public interface UserService {
	public User getUserById(int id);
	public Integer insertUser(User user);
	public User getUserByEmail(String email);
}
