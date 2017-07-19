package kr.or.connect.reservation.controller;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.or.connect.reservation.domain.UserComment;
import kr.or.connect.reservation.dto.FileIdDto;
import kr.or.connect.reservation.service.UserCommentService;

@RestController
@RequestMapping("/api/comment")
public class UserCommentController {
	@Autowired
	UserCommentService userCommentService;
	
	@GetMapping
	public Map<String, Object> selectUserCommentByProductId(
			@RequestParam(name="productid") int productId, 
			@RequestParam(name="limit") int limit, 
			@RequestParam(name="offset") int offset){
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		List<UserComment> userComment = userCommentService.getUserCommentByProductId(productId, limit, offset);
		List<FileIdDto> fileIdDto = userCommentService.getUserCommentFileId(productId, limit, offset);
		
		result.put("userComment", userComment);
		result.put("fileIdDto", fileIdDto);
		
		return result;
	}
		
	@GetMapping("/commoninfo/{productId}")
	public Map<String,?> selectUserCommentCommonInfo(@PathVariable("productId") int productId){
		Map<String, Object> result = new HashMap<String,Object>();
		Integer commentCount = userCommentService.getUserCommentCount(productId);
		BigDecimal commentAvgScore = userCommentService.getUserCommentAvg(productId);
		
		result.put("count", commentCount);
		result.put("avgScore", commentAvgScore);
		
		return result;
	}
}
