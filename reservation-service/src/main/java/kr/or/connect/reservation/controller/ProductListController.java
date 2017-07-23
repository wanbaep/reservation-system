package kr.or.connect.reservation.controller;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.or.connect.reservation.domain.ProductList;
import kr.or.connect.reservation.service.ProductListService;

@RestController
@RequestMapping("/api/productlist")
public class ProductListController {
	@Autowired
	ProductListService	productListService;
		
	@GetMapping
	public Collection<ProductList> selectByCategory(
			@RequestParam(name="categoryId") int categoryId, 
			@RequestParam(name="limit") int limit, 
			@RequestParam(name="offset") int offset){
		if(categoryId == 0){
			return productListService.getAll(limit, offset);
		} else{
			return productListService.getAllByCategory(limit, offset, categoryId);			
		}
	}
	
	@GetMapping("/count/{salesFlag}")
	public int selectCount(@PathVariable("salesFlag") int salesFlag){
		return productListService.getCount(salesFlag);
	}
}
