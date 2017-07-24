package kr.or.connect.reservation.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.or.connect.reservation.domain.ProductDisplayDto;
import kr.or.connect.reservation.domain.ProductPriceDto;
import kr.or.connect.reservation.domain.ProductTitleImageDto;
import kr.or.connect.reservation.service.ReserveService;

@RestController
@RequestMapping("/api/reserve")
public class ReserveController {
	private ReserveService service;
	
	@Autowired
	public ReserveController(ReserveService service){
		this.service = service;
	}
	
	@GetMapping("/{productId}")
	public ResponseEntity<Map<String,Object>> selectProductInfoByProductId(@PathVariable("productId") Integer productId){
		Map<String, Object> result = new HashMap<>();
		ProductDisplayDto productDisplayDto = service.getProductDisplayByProductId(productId);
		ProductTitleImageDto productTitleImageDto = service.getProductTitleImageByProductId(productId);
		List<ProductPriceDto> productPriceDto = service.getProductPriceByProductId(productId);
		result.put("displayInfo", productDisplayDto);
		result.put("titleImage", productTitleImageDto);
		result.put("priceInfo", productPriceDto);
		return new ResponseEntity<>(result,HttpStatus.OK);
	}
}
