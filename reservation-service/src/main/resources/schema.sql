CREATE TABLE CATEGORY(
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  PRIMARY KEY(`id`)
);

-- 상품 기본정보, 전시정보, 상세정보
-- 상품판매여부 : sales_flag - 0 : 판매안됨 1: 판매 됨
CREATE TABLE PRODUCT (
  `id` INT NOT NULL AUTO_INCREMENT,
  `category_id` INT NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  `description` VARCHAR(100) NULL,
  `sales_start` DATETIME NOT NULL,
  `sales_end` DATETIME NULL,
  `sales_flag` INT(1) NOT NULL,
  `event` VARCHAR(4000),
  `create_date` DATETIME,
  `modify_date` DATETIME,
  PRIMARY KEY(`id`),
  FOREIGN KEY(`category_id`) REFERENCES CATEGORY(`id`) ON UPDATE CASCADE ON DELETE CASCADE
);
