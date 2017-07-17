package kr.or.connect.reservation.service;

import java.math.BigDecimal;
import java.util.List;

import kr.or.connect.reservation.domain.UserComment;
import kr.or.connect.reservation.dto.FileIdDto;

public interface UserCommentService {
	public List<UserComment> getUserCommentByProductId(int productId, int limit, int offset);
	public List<FileIdDto> getUserCommentFileId(int productId, int limit, int offset);
	public Integer getUserCommentCount(int productId);
	public BigDecimal getUserCommentAvg(int productId);
}
