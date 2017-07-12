package kr.or.connect.reservation.dao;

public class UserSqls {
	final static String SELECT_BY_ID = "select id, username, email,tel,nickname,sns_id,sns_type,sns_profile,admin_flag,create_date,modify_date from users where id = :id";
	
}
