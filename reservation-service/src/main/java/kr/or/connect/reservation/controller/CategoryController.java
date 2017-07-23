package kr.or.connect.reservation.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import kr.or.connect.reservation.domain.Category;
import kr.or.connect.reservation.service.CategoryService;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {
	
	@Autowired
	private CategoryService categoryService;
	
//	@GetMapping
//	public ModelAndView index(HttpServletRequest request, HttpServletResponse response) throws Exception{
//		List<Category> categoryList = categoryService.getAll();
//		ModelAndView view = new ModelAndView("index");
//		view.addObject("category", categoryList);
//		
//		return view;
//	}
	
	@GetMapping
	public List<Category> selectAll(){
		return categoryService.getAll();
	}
	
	@PostMapping
	public ModelAndView create(@RequestParam(name="name") Category category){
		ModelAndView view = new ModelAndView("index");
		List<Category> categoryList = categoryService.getAll();
		view.addObject("category", categoryList);
		Category result = categoryService.addCategory(category);

		if(result != null)
			return view;
		else
			return view;
	}
	
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public ResponseEntity<String> delete(@PathVariable Integer id){
		int result = categoryService.delete(id);
		if(result == 0){
			return new ResponseEntity<>("No category found for ID " + id, HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>("Deleted category ID " + result, HttpStatus.OK);
	}
	
	@PostMapping("/{id}")
	public ResponseEntity<String> update(@PathVariable Integer id, @RequestParam(name="uvalue") Category category){
		category.setId(id);
		int result = categoryService.update(category);
		if(result == 0){
			return new ResponseEntity<>("No category found for ID " + id, HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>("Updated category ID " + result, HttpStatus.OK);		
	}
}
