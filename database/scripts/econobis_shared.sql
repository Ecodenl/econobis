/*
Tables for econobis_shared database
*/

-- ----------------------------
-- Table structure for `shared_areas`
-- ----------------------------
-- DROP TABLE IF EXISTS `shared_areas`;
CREATE TABLE `shared_areas` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `area_code` int(11) NOT NULL DEFAULT 0,
  `area_name` varchar(191) NOT NULL,
  `municipality_code_ref` varchar(20) NOT NULL DEFAULT '',
  `municipality_code` int(11) NOT NULL DEFAULT 0,
  `municipality_name` varchar(191) NOT NULL,
  `district_code_ref` varchar(20) NOT NULL DEFAULT '',
  `district_code` int(11) NOT NULL DEFAULT 0,
  `district_name` varchar(191) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Table structure for `shared_districts`
-- ----------------------------
-- DROP TABLE IF EXISTS `shared_districts`;
CREATE TABLE `shared_districts` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `district_code` int(11) NOT NULL DEFAULT 0,
  `district_name` varchar(191) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Table structure for `shared_municipalities`
-- ----------------------------
-- DROP TABLE IF EXISTS `shared_municipalities`;
CREATE TABLE `shared_municipalities` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `municipality_code` int(11) NOT NULL DEFAULT 0,
  `municipality_name` varchar(191) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Table structure for `shared_postal_codes_house_numbers`
-- ----------------------------
-- DROP TABLE IF EXISTS `shared_postal_codes_house_numbers`;
CREATE TABLE `shared_postal_codes_house_numbers` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `postal_code` varchar(6) NOT NULL DEFAULT '',
  `house_number` int(11) NOT NULL DEFAULT 0,
  `area_code` int(11) NOT NULL DEFAULT 0,
  `district_code` int(11) NOT NULL DEFAULT 0,
  `municipality_code` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Create indexen
-- ----------------------------
DROP INDEX IF EXISTS index_shared_postal_codes_house_numbers ON shared_postal_codes_house_numbers;
CREATE INDEX index_shared_postal_codes_house_numbers
ON shared_postal_codes_house_numbers (postal_code, house_number);
DROP INDEX IF EXISTS index_shared_areas ON shared_areas;
CREATE INDEX index_shared_areas
ON shared_areas (area_code);
DROP INDEX IF EXISTS index_shared_districts ON shared_districts;
CREATE INDEX index_shared_districts
ON shared_districts (district_code);
DROP INDEX IF EXISTS index_shared_municipalities ON shared_municipalities;
CREATE INDEX index_shared_municipalities
ON shared_municipalities (municipality_code);

