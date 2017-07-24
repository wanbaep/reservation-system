package kr.or.connect.reservation.dao;

public class ReserveSqls {
	final static String SELECT_PRODUCT_AND_DISPLAY_INFO = "select P.id"
			+ ", P.name"
			+ ", P.description"
			+ ", P.sales_start"
			+ ", P.sales_end"
			+ ", DI.observation_time"
			+ ", DI.place_name"
			+ ", DI.display_start"
			+ ", DI.display_end"
			+ " from product as P"
			+ " inner join display_info as DI"
			+ " on P.id = DI.product_id"
			+ " where P.id = :productId";
	final static String SELECT_PRODUCT_TITLE_IMAGE = "select P.id"
			+ ", PI.file_id"
			+ " from product as P"
			+ " left outer join product_image as PI"
			+ " on P.id = PI.product_id"
			+ " left outer join file as F"
			+ " on PI.file_id = F.id"
			+ " where PI.`type` = 1 and P.id = :productId";
	final static String SELECT_PRODUCT_PRICE = "select PP.product_id"
			+ ", PP.price_type"
			+ ", PP.price"
			+ ", PP.discount_rate"
			+ " from product as P"
			+ " inner join product_price as PP"
			+ " on P.id = PP.product_id"
			+ " where P.id = :productId order by PP.price asc";
}
