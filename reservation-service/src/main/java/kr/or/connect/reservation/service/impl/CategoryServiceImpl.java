package kr.or.connect.reservation.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.connect.reservation.dao.CategoryDao;
import kr.or.connect.reservation.domain.Category;
import kr.or.connect.reservation.service.CategoryService;

@Service
public class CategoryServiceImpl implements CategoryService {
	@Autowired
	CategoryDao categoryDao;
	
	@Override
	@Transactional(readOnly = true)
	public Category get(Integer id) {
		return categoryDao.selectCatById(id);
	}

	@Override
	@Transactional(readOnly = false)
	public Category addCategory(Category category) {
		Integer insert = categoryDao.insert(category);
		category.setId(insert);
		return category;
	}

	@Override
	public int delete(Integer id) {
		return categoryDao.delete(id);
	}

	@Override
	public int update(Category category) {
		return categoryDao.update(category);
	}

	@Override
	public List<Category> getAll() {
		return categoryDao.selectCat();
	}
	
	
}
