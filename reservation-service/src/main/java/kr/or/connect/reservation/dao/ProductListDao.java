package kr.or.connect.reservation.dao;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import kr.or.connect.reservation.domain.ProductList;

@Repository
public class ProductListDao {
	private NamedParameterJdbcTemplate jdbc;
	private RowMapper<ProductList> rowMapper = BeanPropertyRowMapper.newInstance(ProductList.class);
	
	public ProductListDao(DataSource dataSource){
		this.jdbc = new NamedParameterJdbcTemplate(dataSource);
	}
	
	public List<ProductList> selectAll(int limit, int offset){
		Map<String, Object> params = new HashMap<>();
		params.put("limit", limit);
		params.put("offset", offset);
		return jdbc.query(ProductListSqls.SELECT_PRODUCT_LIST, params, rowMapper);
	}
	
	public List<ProductList> selectByCategory(int limit, int offset, int category_id){
		Map<String, Object> params = new HashMap<>();
		params.put("category_id", category_id);
		params.put("limit", limit);
		params.put("offset", offset);
		return jdbc.query(ProductListSqls.SELECT_PRODUCT_LIST_CAT, params, rowMapper);
	}
	
	public Integer selectCount(int sales_flag){
		Map<String, ?> params = Collections.singletonMap("sales_flag", sales_flag);
		return jdbc.queryForObject(ProductListSqls.SELECT_COUNT, params, Integer.class);
	}
}
