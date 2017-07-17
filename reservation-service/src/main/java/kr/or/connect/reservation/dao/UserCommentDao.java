package kr.or.connect.reservation.dao;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import kr.or.connect.reservation.domain.UserComment;
import kr.or.connect.reservation.dto.FileIdDto;

@Repository
public class UserCommentDao {
	private NamedParameterJdbcTemplate jdbc;
	private RowMapper<UserComment> rowMapper = BeanPropertyRowMapper.newInstance(UserComment.class);
	private RowMapper<FileIdDto> fileMapper = BeanPropertyRowMapper.newInstance(FileIdDto.class);
	
	public UserCommentDao(DataSource dataSource){
		this.jdbc = new NamedParameterJdbcTemplate(dataSource);
	}
	
	public List<UserComment> selectUserCommentByProductId(int productId, int limit, int offset){
		Map<String, Object> params = new HashMap<>();
		params.put("productId", productId);
		params.put("limit", limit);
		params.put("offset", offset);
		return jdbc.query(UserCommentSqls.SELECT_USER_COMMENT_BY_PRODUCT_ID, params, rowMapper);
	}
	
	public List<FileIdDto> selectUserCommentFileId(int productId, int limit, int offset){
		Map<String, Object> params = new HashMap<>();
		params.put("productId", productId);
		params.put("limit", limit);
		params.put("offset", offset);
				
		return jdbc.query(UserCommentSqls.SELECT_USER_COMMENT_FILE_ID, params,fileMapper);
	}
	
	public Integer selectUserCommentCount(int productId){
		Map<String, ?> params = Collections.singletonMap("productId", productId);
		return jdbc.queryForObject(UserCommentSqls.SELECT_USER_COMMENT_COUNT, params, Integer.class);
	}
	
	public BigDecimal selectUserCommentAvg(int productId){
		Map<String, ?> params = Collections.singletonMap("productId", productId);
		return jdbc.queryForObject(UserCommentSqls.SELECT_USER_COMMENT_AVG, params, BigDecimal.class);
	}
	
}
