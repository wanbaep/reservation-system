package kr.or.connect.reservation.dao;

public class UserCommentSqls {
	/*final static String SELECT_USER_COMMENT_BY_PRODUCT_ID = "select RUC.product_id"
			+ ", RUC.user_id"
			+ ", RUC.score"
			+ ", RUC.comment"
			+ ", RUC.create_date"
			+ ", F.id"
			+ " from reservation_user_comment_image as RUCI"
			+ " right outer join (select id, product_id, user_id, score, comment, create_date from reservation_user_comment where product_id = :productId limit :limit offset :offset) as RUC"
			+ " on RUC.id = RUCI.reservation_user_comment_id"
			+ " left outer join file as F"
			+ " on RUCI.file_id = F.id;";
	*/
	final static String SELECT_USER_COMMENT_BY_PRODUCT_ID = "select id"
			+ ", product_id"
			+ ", user_id"
			+ ", score"
			+ ", comment"
			+ ", create_date"
			+ " from reservation_user_comment"
			+ " where product_id = :productId limit :limit offset :offset;";
	final static String SELECT_USER_COMMENT_FILE_ID = "select RUC.user_id"
			+ ", F.id"
			+ " from reservation_user_comment_image as RUCI"
			+ " inner join"
			+ " (select id, user_id from reservation_user_comment"
			+ " where product_id = :productId limit :limit offset :offset) as RUC"
			+ " on RUC.id = RUCI.reservation_user_comment_id"
			+ " inner join file as F"
			+ " on RUCI.file_id = F.id;";
	final static String SELECT_USER_COMMENT_COUNT = "select count(id)"
			+ " from reservation_user_comment"
			+ " group by product_id = :productId;";
	final static String SELECT_USER_COMMENT_AVG = "select avg(score)"
			+ " from reservation_user_comment"
			+ " group by product_id = :productId;";
	
}
