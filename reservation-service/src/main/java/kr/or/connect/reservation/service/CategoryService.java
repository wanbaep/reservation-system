package kr.or.connect.reservation.service;

import java.util.List;

import kr.or.connect.reservation.domain.Category;

public interface CategoryService {
	public Category get(Integer id);
	public Category addCategory(Category category);
	public int delete(Integer id);
	public int update(Category category);
	public List<Category> getAll();
}
