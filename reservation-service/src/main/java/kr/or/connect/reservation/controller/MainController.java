package kr.or.connect.reservation.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import kr.or.connect.reservation.domain.Category;
import kr.or.connect.reservation.service.CategoryService;

@Controller
@RequestMapping("/")
public class MainController {
	private final CategoryService service;
	
	@Autowired
	public MainController(CategoryService service){
		this.service = service;
	}
	
	@GetMapping
	public ModelAndView index(HttpServletRequest request, HttpServletResponse response) throws Exception{
		List<Category> categoryList = service.getAll();
		
		ModelAndView view = new ModelAndView("index");
		view.addObject("category", categoryList);
		return view;
	}
}
