package kr.or.connect.reservation.dao;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import kr.or.connect.reservation.domain.ProductDetail;

@Repository
public class ProductDetailDao {
	private NamedParameterJdbcTemplate jdbc;
	private RowMapper<ProductDetail> rowMapper = BeanPropertyRowMapper.newInstance(ProductDetail.class);
	
	public ProductDetailDao(DataSource dataSource){
		this.jdbc = new NamedParameterJdbcTemplate(dataSource);
	}
	
	public ProductDetail selectProductDetailById(int productId){
		Map<String, ?> params = Collections.singletonMap("productId", productId);
		return jdbc.queryForObject(ProductDetailSqls.SELECT_PRODUCT_DETAIL, params, rowMapper);
	}
	
	public List<Integer> selectProductImageById(int productId){
		Map<String, ?> params = Collections.singletonMap("productId", productId);
		return jdbc.queryForList(ProductDetailSqls.SELECT_PRODUCT_IMAGE_FILE_ID, params, Integer.class);
	}
}
