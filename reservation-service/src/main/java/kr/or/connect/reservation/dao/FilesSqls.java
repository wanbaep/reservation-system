package kr.or.connect.reservation.dao;

public class FilesSqls {
	final static String SELECT_FILE_BY_ID = "select id"
			+ ", user_id"
			+ ", file_name"
			+ ", save_file_name"
			+ ", file_length"
			+ ", content_type"
			+ ", delete_flag"
			+ ", create_date"
			+ ", modify_date from file where id = :id";
}
