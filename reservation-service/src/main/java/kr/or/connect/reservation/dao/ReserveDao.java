package kr.or.connect.reservation.dao;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import kr.or.connect.reservation.domain.ProductDisplayDto;
import kr.or.connect.reservation.domain.ProductPriceDto;
import kr.or.connect.reservation.domain.ProductTitleImageDto;

@Repository
public class ReserveDao {
	private NamedParameterJdbcTemplate jdbc;
	private RowMapper<ProductDisplayDto> productDisplayRowMapper = BeanPropertyRowMapper.newInstance(ProductDisplayDto.class);
	private RowMapper<ProductTitleImageDto> productTitleImageRowMapper = BeanPropertyRowMapper.newInstance(ProductTitleImageDto.class);
	private RowMapper<ProductPriceDto> productPriceRowMapper = BeanPropertyRowMapper.newInstance(ProductPriceDto.class);
	
	public ReserveDao(DataSource dataSource){
		this.jdbc = new NamedParameterJdbcTemplate(dataSource);
	}
	
	public ProductDisplayDto selectProductDisplayInfoByProductId(Integer productId){
		try {
			Map<String,Integer> param = new HashMap<>();
			param.put("productId", productId);
			return jdbc.queryForObject(ReserveSqls.SELECT_PRODUCT_AND_DISPLAY_INFO, param, productDisplayRowMapper);
		} catch (EmptyResultDataAccessException e) {
			return null;
		}
		
	}
	
	public ProductTitleImageDto selectProductTitleImageByProductId(Integer productId){
		try {
			Map<String,?> param = Collections.singletonMap("productId",productId);
			return jdbc.queryForObject(ReserveSqls.SELECT_PRODUCT_TITLE_IMAGE, param, productTitleImageRowMapper);
		} catch (EmptyResultDataAccessException e) {
			return null;
		}
	}
	
	public List<ProductPriceDto> selectProductPriceByProductId(Integer productId){
		try {
			Map<String,?> param = Collections.singletonMap("productId", productId);
			return jdbc.query(ReserveSqls.SELECT_PRODUCT_PRICE, param, productPriceRowMapper);
		} catch (EmptyResultDataAccessException e) {
			return null;
		}
	}
}
