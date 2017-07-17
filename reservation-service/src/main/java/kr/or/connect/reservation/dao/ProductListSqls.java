package kr.or.connect.reservation.dao;

public class ProductListSqls {
	final static String SELECT_PRODUCT_LIST = "select P.id"
			+ ", P.name"
			+ ", DI.place_name"
			+ ", PD.content"
			+ ", F.file_name"
			+ ", F.save_file_name "
			+ "from product as P "
			+ "left outer join product_detail as PD "
			+ "on P.id = PD.product_id "
			+ "left outer join display_info as DI "
			+ "on P.id = DI.product_id "
			+ "left outer join product_image as PI "
			+ "on P.id = PI.product_id "
			+ "left outer join file as F "
			+ "on PI.file_id = F.id "
			+ "limit :limit offset :offset;";
	final static String SELECT_PRODUCT_LIST_CAT = "select P.id"
			+ ", P.name"
			+ ", DI.place_name"
			+ ", PD.content"
			+ ", F.file_name"
			+ ", F.save_file_name "
			+ "from product as P "
			+ "left outer join product_detail as PD "
			+ "on P.id = PD.product_id "
			+ "left outer join display_info as DI "
			+ "on P.id = DI.product_id "
			+ "left outer join product_image as PI "
			+ "on P.id = PI.product_id "
			+ "left outer join file as F "
			+ "on PI.file_id = F.id "
			+ "where category_id = :category_id limit :limit offset :offset;";
	final static String SELECT_COUNT = "select count(*) from product where sales_flag = :sales_flag";
}
