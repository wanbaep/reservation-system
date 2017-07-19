package kr.or.connect.reservation.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
	ProductDetailService service;
	
	@Autowired
	public ProductDetailController(ProductDetailService productDetailService) {
		this.service = productDetailService;
	}
	
	@GetMapping("/{productId}")
	public Map<String, Object> testMethod(@PathVariable("productId") int productId){
		Map<String, Object> result = new HashMap<String, Object>();
		ProductDetail productDetail = new ProductDetail();
		productDetail = service.getDetailByProductId(productId);
		List<Integer> filesId = service.getImageIdByProductId(productId);
		
		//Map에 ProductDetail 정보와 Product의 image file들의 정보를 저장해서 반환
		// Content-type이 application/json이기 때문에 자동으로 json으로 변환
		
		result.put("productDetail", productDetail);
		result.put("images", filesId);
		
		return result;
	}
	
}
