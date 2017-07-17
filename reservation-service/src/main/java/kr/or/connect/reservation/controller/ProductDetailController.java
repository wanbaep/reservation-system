package kr.or.connect.reservation.controller;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.or.connect.reservation.domain.ProductDetail;
import kr.or.connect.reservation.service.ProductDetailService;

@RestController
@RequestMapping("/api/product")
public class ProductDetailController {
	@Autowired
	ProductDetailService productDetailService;
	
	@GetMapping("/detail/{id}")
	public ProductDetail selectDetailByProductId(@PathVariable("id") int id){
		return productDetailService.getDetailByProductId(id);
	}
	
	@GetMapping("/images/{id}")
	public Collection<Integer> selectImageIdByProductId(@PathVariable("id") int id){
		return productDetailService.getImageIdByProductId(id);
	}
}
