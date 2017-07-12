package kr.or.connect.reservation.controller;

import java.util.Collection;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import kr.or.connect.reservation.domain.Category;
import kr.or.connect.reservation.service.CategoryService;

@RestController
@RequestMapping("/categories")
public class CategoryController {
	
	@Autowired
	private CategoryService categoryService;
	
	/*@GetMapping("/admin")
	public ModelAndView index(HttpServletRequest request, HttpServletResponse response) throws Exception{
		List<Category> categoryList = categoryService.getAll();
		
		ModelAndView view = new ModelAndView("index");
		
		view.addObject("category", categoryList);
		
		return view;
	}*/
	
	@GetMapping("/list")
	public Collection<Category> selectAll(){
		/*List<Category> categoryList = categoryService.getAll();
		
		return categoryList;
		*/
		return categoryService.getAll();
	}
	
	@PostMapping("/insert")
	public String create(@RequestParam(name="name") Category category){
		Category result = categoryService.addCategory(category);
		if(result != null)
			return "redirect:/";
		else
			return "redirect:/";
	}
	
	@DeleteMapping("/delete/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Integer id){
		int result = categoryService.delete(id);
	}
	
	@PostMapping("/update/{id}")
	public String update(@PathVariable Integer id, @RequestParam(name="uvalue") Category category){
		category.setId(id);
		categoryService.update(category);
		
		return "redirect:/";
	}
}
