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

import kr.or.connect.reservation.domain.User;

@Repository
public class UserDao {
	private NamedParameterJdbcTemplate jdbc;
	private SimpleJdbcInsert insertAction;
	private RowMapper<User> rowMapper = BeanPropertyRowMapper.newInstance(User.class);
	
	public UserDao(DataSource dataSource){
		this.jdbc = new NamedParameterJdbcTemplate(dataSource);
		this.insertAction = new SimpleJdbcInsert(dataSource)
				.withTableName("users")
				.usingGeneratedKeyColumns("id");
	}
	
	public Integer insert(User user){
		SqlParameterSource params = new BeanPropertySqlParameterSource(user);
		return insertAction.executeAndReturnKey(params).intValue();
	}
	
	public User selectById(int id){
		/*Map<String, Object> params = new HashMap<>();
		params.put("id", id);
		*/
		Map<String, ?> params = Collections.singletonMap("id", id);
		return jdbc.queryForObject(UserSqls.SELECT_BY_ID, params, rowMapper);
	}
	
	public User selectUserByEmail(String email){
		Map<String, ?> params = Collections.singletonMap("email", email);
		return jdbc.queryForObject(UserSqls.SELECT_USER_BY_EMAIL, params, rowMapper);
	}
}
