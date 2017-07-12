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
	
	@GetMapping("/{limit}/{offset}")
	public Collection<ProductList> selectAll(@PathVariable("limit") int limit, @PathVariable("offset") int offset){
		return productListService.getAll(limit, offset);
	}
	
	@GetMapping("/{limit}/{offset}/{categoryId}")
	public Collection<ProductList> selectByCategory(@PathVariable("limit") int limit, @PathVariable("offset") int offset, @PathVariable("categoryId") int categoryId){
		return productListService.getAllByCategory(limit, offset, categoryId);
	}
	
	@GetMapping("/count/{salesFlag}")
	public int selectCount(@PathVariable("salesFlag") int salesFlag){
		return productListService.getCount(salesFlag);
	}
}
