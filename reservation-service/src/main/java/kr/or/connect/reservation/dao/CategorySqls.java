package kr.or.connect.reservation.dao;

public class CategorySqls {
	final static String SELECT_CAT = "select id, name from category";
	final static String SELECT_CAT_BY_ID = "select id, name from category where id = :id";
	final static String UPDATE_CAT_BY_ID = "update category set name = :name where id = :id";
	final static String DELETE_CAT_BY_ID = "delete from category where id = :id";
}
