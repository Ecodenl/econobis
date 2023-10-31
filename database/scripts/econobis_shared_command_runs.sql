/*
Tables for econobis_shared database
*/

-- ----------------------------
-- Table structure for `shared_command_runs`
-- ----------------------------
-- DROP TABLE IF EXISTS `shared_command_runs`;
CREATE TABLE `shared_command_runs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `local_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `app_cooperation_name` varchar(191) NOT NULL,
  `schedule_run_id` int(10) unsigned NOT NULL,
  `scheduled_commands_command_ref` varchar(191) NOT NULL,
  `start_at` datetime NOT NULL,
  `end_at` datetime DEFAULT NULL,
  `finished` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

