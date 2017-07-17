package kr.or.connect.reservation.dao;

public class ProductDetailSqls {
	final static String SELECT_PRODUCT_DETAIL = "select P.id"
			+ ", P.name"
			+ ", P.event"
			+ ", PD.content"
			+ ", DI.homepage"
			+ ", DI.tel"
			+ ", DI.email"
			+ ", DI.place_lot"
			+ ", DI.place_street"
			+ ", DI.place_name"
			+ " from product as P"
			+ " left outer join product_detail as PD"
			+ "	on P.id = PD.product_id"
			+ " left outer join display_info as DI"
			+ " on P.id = DI.product_id"
			+ " where P.id = :productId;";
	final static String SELECT_PRODUCT_IMAGE_FILE_ID = "select F.id"
			+ " from product as P"
			+ " left outer join product_image as PI"
			+ " on P.id = PI.product_id"
			+ " left outer join file as F"
			+ " on PI.file_id = F.id"
			+ " where P.id = :productId;";
}
