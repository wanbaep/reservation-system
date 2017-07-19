package kr.or.connect.reservation.dao;

import java.util.Collections;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;

import kr.or.connect.reservation.domain.Files;

@Repository
public class FilesDao {
	private NamedParameterJdbcTemplate jdbc;
	private SimpleJdbcInsert insertAction;
	private RowMapper<Files> rowMapper = BeanPropertyRowMapper.newInstance(Files.class);
	
	public FilesDao(DataSource dataSource){
		this.jdbc = new NamedParameterJdbcTemplate(dataSource);
		this.insertAction = new SimpleJdbcInsert(dataSource)
				.withTableName("file")
				.usingGeneratedKeyColumns("id");
	}
	
	public Integer insert(Files files){
		SqlParameterSource params = new BeanPropertySqlParameterSource(files);
		return insertAction.executeAndReturnKey(params).intValue();
	}
	
	public Files selectFileById(int id){
		Map<String, ?> params = Collections.singletonMap("id", id);
		return jdbc.queryForObject(FilesSqls.SELECT_FILE_BY_ID, params, rowMapper);
	}
}
