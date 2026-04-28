/*M!999999\- enable the sandbox mode */ 
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;
DROP TABLE IF EXISTS `_missing_energy_supplier_data_in_parts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `_missing_energy_supplier_data_in_parts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `project_id` int(10) unsigned NOT NULL,
  `revenue_id` int(10) unsigned NOT NULL,
  `revenue_date_begin` date DEFAULT NULL,
  `revenue_date_end` date DEFAULT NULL,
  `parts_id` int(10) unsigned NOT NULL,
  `part_date_begin` date DEFAULT NULL,
  `part_date_end` date DEFAULT NULL,
  `distribution_id` int(10) unsigned NOT NULL,
  `participation_id` int(10) unsigned NOT NULL,
  `participation_date_terminated` date DEFAULT NULL,
  `address_supplier_energy_id` int(10) unsigned DEFAULT NULL,
  `address_supplier_energy_member_since` date DEFAULT NULL,
  `address_supplier_energy_end_date` date DEFAULT NULL,
  `comment` text NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `_wrong_distribution_parts_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `_wrong_distribution_parts_data` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `revenue_id` int(10) unsigned NOT NULL,
  `revenue_date_begin` date DEFAULT NULL,
  `revenue_date_end` date DEFAULT NULL,
  `part_id` int(10) unsigned NOT NULL,
  `distribution_id` int(10) unsigned NOT NULL,
  `part_date_begin` date DEFAULT NULL,
  `part_date_end` date DEFAULT NULL,
  `previous_parts_ids_not_processed` text NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `_wrong_energy_supplier_data_in_parts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `_wrong_energy_supplier_data_in_parts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `revenue_id` int(10) unsigned NOT NULL,
  `revenue_date_begin` date DEFAULT NULL,
  `revenue_date_end` date DEFAULT NULL,
  `parts_id` int(10) unsigned NOT NULL,
  `part_date_begin` date DEFAULT NULL,
  `part_date_end` date DEFAULT NULL,
  `distribution_parts_id` int(10) unsigned NOT NULL,
  `distribution_id` int(10) unsigned NOT NULL,
  `comment` text NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `_wrong_revenue_distribution_kwh_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `_wrong_revenue_distribution_kwh_status` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `project_id` int(10) unsigned NOT NULL,
  `revenue_id` int(10) unsigned NOT NULL,
  `revenue_date_begin` date DEFAULT NULL,
  `revenue_date_end` date DEFAULT NULL,
  `distribution_id` int(10) unsigned NOT NULL,
  `comment` text NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `address_dongle_read_out_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `address_dongle_read_out_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `order` int(10) unsigned NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `address_dongle_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `address_dongle_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `type_read_out_id` int(10) unsigned NOT NULL,
  `name` varchar(191) NOT NULL,
  `order` int(10) unsigned NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `address_dongle_types_type_read_out_id_foreign` (`type_read_out_id`) USING BTREE,
  CONSTRAINT `address_dongle_types_type_read_out_id_foreign` FOREIGN KEY (`type_read_out_id`) REFERENCES `address_dongle_read_out_types` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `address_dongles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `address_dongles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `address_id` int(10) unsigned NOT NULL,
  `type_read_out_id` int(10) unsigned NOT NULL,
  `mac_number` varchar(191) DEFAULT NULL,
  `type_dongle_id` int(10) unsigned DEFAULT NULL,
  `energy_id` int(11) DEFAULT NULL,
  `date_signed` date DEFAULT NULL,
  `date_start` date DEFAULT NULL,
  `date_end` date DEFAULT NULL,
  `created_by_id` int(10) unsigned NOT NULL,
  `updated_by_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `address_dongles_address_id_foreign` (`address_id`) USING BTREE,
  KEY `address_dongles_type_read_out_id_foreign` (`type_read_out_id`) USING BTREE,
  KEY `address_dongles_type_dongle_id_foreign` (`type_dongle_id`) USING BTREE,
  KEY `address_dongles_created_by_id_foreign` (`created_by_id`) USING BTREE,
  KEY `address_dongles_updated_by_id_foreign` (`updated_by_id`) USING BTREE,
  CONSTRAINT `address_dongles_address_id_foreign` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`id`),
  CONSTRAINT `address_dongles_created_by_id_foreign` FOREIGN KEY (`created_by_id`) REFERENCES `users` (`id`),
  CONSTRAINT `address_dongles_type_dongle_id_foreign` FOREIGN KEY (`type_dongle_id`) REFERENCES `address_dongle_types` (`id`),
  CONSTRAINT `address_dongles_type_read_out_id_foreign` FOREIGN KEY (`type_read_out_id`) REFERENCES `address_dongle_read_out_types` (`id`),
  CONSTRAINT `address_dongles_updated_by_id_foreign` FOREIGN KEY (`updated_by_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `address_energy_consumption_electricity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `address_energy_consumption_electricity` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `address_id` int(10) unsigned NOT NULL,
  `date_begin` date DEFAULT NULL,
  `date_end` date DEFAULT NULL,
  `consumption_high` double DEFAULT NULL,
  `consumption_low` double DEFAULT NULL,
  `return_high` double DEFAULT NULL,
  `return_low` double DEFAULT NULL,
  `proposed_variable_rate_high` double DEFAULT NULL,
  `proposed_variable_rate_low` double DEFAULT NULL,
  `proposed_fixed_rate_high` double DEFAULT NULL,
  `proposed_fixed_rate_low` double DEFAULT NULL,
  `total_variable_costs_high` double DEFAULT NULL,
  `total_variable_costs_low` double DEFAULT NULL,
  `total_fixed_costs_high` double DEFAULT NULL,
  `total_fixed_costs_low` double DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `address_ece_address_id_foreign` (`address_id`) USING BTREE,
  CONSTRAINT `address_ece_address_id_foreign` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `address_energy_consumption_gas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `address_energy_consumption_gas` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `address_id` int(10) unsigned NOT NULL,
  `date_begin` date DEFAULT NULL,
  `date_end` date DEFAULT NULL,
  `consumption` double DEFAULT NULL,
  `proposed_variable_rate` double DEFAULT NULL,
  `proposed_fixed_rate` double DEFAULT NULL,
  `total_variable_costs` double DEFAULT NULL,
  `total_fixed_costs` double DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `address_ecg_address_id_foreign` (`address_id`) USING BTREE,
  CONSTRAINT `address_ecg_address_id_foreign` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `address_energy_suppliers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `address_energy_suppliers` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `address_id` int(10) unsigned NOT NULL,
  `energy_supply_type_id` int(10) unsigned NOT NULL,
  `energy_supplier_id` int(10) unsigned NOT NULL,
  `member_since` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `energy_supply_status_id` int(10) unsigned DEFAULT NULL,
  `switch_date` date DEFAULT NULL,
  `is_current_supplier` tinyint(1) NOT NULL DEFAULT 0,
  `es_number` varchar(191) DEFAULT NULL,
  `margin_fee` varchar(191) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `update_by_id` int(10) unsigned DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `address_es_address_id_foreign` (`address_id`) USING BTREE,
  KEY `address_energy_suppliers_energy_supply_type_id_foreign` (`energy_supply_type_id`) USING BTREE,
  KEY `address_energy_suppliers_energy_supplier_id_foreign` (`energy_supplier_id`) USING BTREE,
  KEY `address_es_energy_supply_status_id_foreign` (`energy_supply_status_id`) USING BTREE,
  KEY `address_energy_suppliers_created_by_id_foreign` (`created_by_id`) USING BTREE,
  KEY `address_energy_suppliers_update_by_id_foreign` (`update_by_id`) USING BTREE,
  CONSTRAINT `address_energy_suppliers_created_by_id_foreign` FOREIGN KEY (`created_by_id`) REFERENCES `users` (`id`),
  CONSTRAINT `address_energy_suppliers_energy_supplier_id_foreign` FOREIGN KEY (`energy_supplier_id`) REFERENCES `energy_suppliers` (`id`),
  CONSTRAINT `address_energy_suppliers_energy_supply_type_id_foreign` FOREIGN KEY (`energy_supply_type_id`) REFERENCES `energy_supply_types` (`id`),
  CONSTRAINT `address_energy_suppliers_update_by_id_foreign` FOREIGN KEY (`update_by_id`) REFERENCES `users` (`id`),
  CONSTRAINT `address_es_address_id_foreign` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`id`),
  CONSTRAINT `address_es_energy_supply_status_id_foreign` FOREIGN KEY (`energy_supply_status_id`) REFERENCES `energy_supply_statuses` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `addresses` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `contact_id` int(10) unsigned NOT NULL,
  `type_id` varchar(16) DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `street` varchar(191) NOT NULL DEFAULT '',
  `number` int(10) unsigned DEFAULT NULL,
  `city` varchar(191) NOT NULL DEFAULT '',
  `postal_code` varchar(191) NOT NULL DEFAULT '',
  `shared_area_code` int(11) DEFAULT NULL,
  `shared_area_name` varchar(191) NOT NULL DEFAULT '',
  `primary` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `country_id` varchar(191) DEFAULT NULL,
  `addition` varchar(191) NOT NULL,
  `ean_electricity` varchar(191) DEFAULT NULL,
  `ean_gas` varchar(191) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `addresses_contact_id_foreign` (`contact_id`) USING BTREE,
  KEY `addresses_country_id_foreign` (`country_id`) USING BTREE,
  CONSTRAINT `addresses_contact_id_foreign` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`id`),
  CONSTRAINT `addresses_country_id_foreign` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `administration_contact_twinfield`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `administration_contact_twinfield` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `contact_id` int(10) unsigned NOT NULL,
  `administration_id` int(10) unsigned NOT NULL,
  `twinfield_number` varchar(191) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `administration_contact_twinfield_contact_id_foreign` (`contact_id`) USING BTREE,
  KEY `administration_contact_twinfield_administration_id_foreign` (`administration_id`) USING BTREE,
  CONSTRAINT `administration_contact_twinfield_administration_id_foreign` FOREIGN KEY (`administration_id`) REFERENCES `administrations` (`id`),
  CONSTRAINT `administration_contact_twinfield_contact_id_foreign` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `administration_last_used_numbers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `administration_last_used_numbers` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `number_type` varchar(191) NOT NULL,
  `number_year` int(11) NOT NULL,
  `administration_id` int(10) unsigned NOT NULL,
  `last_used_number` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `administration_last_used_numbers_unique` (`number_type`,`number_year`,`administration_id`) USING BTREE,
  KEY `administration_last_used_numbers_administration_id_foreign` (`administration_id`) USING BTREE,
  CONSTRAINT `administration_last_used_numbers_administration_id_foreign` FOREIGN KEY (`administration_id`) REFERENCES `administrations` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `administration_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `administration_user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `administration_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `administration_user_user_id_administration_id_unique` (`user_id`,`administration_id`) USING BTREE,
  KEY `administration_user_administration_id_foreign` (`administration_id`) USING BTREE,
  CONSTRAINT `administration_user_administration_id_foreign` FOREIGN KEY (`administration_id`) REFERENCES `administrations` (`id`),
  CONSTRAINT `administration_user_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `administrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `administrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `administration_number` int(11) DEFAULT NULL,
  `administration_code` varchar(5) DEFAULT NULL,
  `address` varchar(191) DEFAULT NULL,
  `postal_code` varchar(191) DEFAULT NULL,
  `city` varchar(191) DEFAULT NULL,
  `country_id` varchar(191) DEFAULT NULL,
  `kvk_number` int(11) DEFAULT NULL,
  `btw_number` varchar(191) DEFAULT NULL,
  `IBAN` text NOT NULL,
  `email` varchar(191) DEFAULT NULL,
  `website` varchar(191) DEFAULT NULL,
  `bic` varchar(191) DEFAULT NULL,
  `sepa_contract_name` varchar(191) DEFAULT NULL,
  `sepa_creditor_id` varchar(191) DEFAULT NULL,
  `rsin_number` varchar(191) DEFAULT NULL,
  `default_payment_term` int(11) DEFAULT NULL,
  `number_of_invoice_reminders` smallint(6) NOT NULL DEFAULT 3,
  `prefix_invoice_number` varchar(5) NOT NULL DEFAULT 'F',
  `logo_filename` varchar(191) DEFAULT NULL,
  `logo_name` varchar(191) DEFAULT NULL,
  `created_by_id` int(10) unsigned NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `email_template_id_transfer` int(10) unsigned DEFAULT NULL,
  `email_template_reminder_id` int(10) unsigned DEFAULT NULL,
  `email_template_exhortation_id` int(10) unsigned DEFAULT NULL,
  `email_template_financial_overview_id` int(10) unsigned DEFAULT NULL,
  `iban_attn` varchar(191) DEFAULT NULL,
  `email_template_id_collection` int(10) unsigned DEFAULT NULL,
  `twinfield_username` varchar(191) DEFAULT NULL,
  `twinfield_password` text DEFAULT NULL,
  `twinfield_organization_code` varchar(191) DEFAULT NULL,
  `twinfield_office_code` varchar(191) DEFAULT NULL,
  `uses_twinfield` tinyint(1) NOT NULL,
  `twinfield_is_valid` tinyint(1) NOT NULL,
  `mailbox_id` int(10) unsigned DEFAULT NULL,
  `twinfield_connection_type` varchar(191) DEFAULT NULL,
  `twinfield_client_id` varchar(191) DEFAULT NULL,
  `twinfield_client_secret` text DEFAULT NULL,
  `twinfield_refresh_token` varchar(191) DEFAULT NULL,
  `uses_vat` tinyint(1) NOT NULL DEFAULT 1,
  `email_bcc_notas` varchar(191) DEFAULT NULL,
  `date_sync_twinfield_contacts` date DEFAULT NULL,
  `date_sync_twinfield_payments` date DEFAULT NULL,
  `date_sync_twinfield_invoices` date DEFAULT NULL,
  `portal_settings_layout_id` int(10) unsigned DEFAULT NULL,
  `uses_mollie` tinyint(1) NOT NULL DEFAULT 0,
  `mollie_api_key` text NOT NULL,
  `uses_interim_financial_overviews` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `administrations_country_id_foreign` (`country_id`) USING BTREE,
  KEY `administrations_created_by_id_foreign` (`created_by_id`) USING BTREE,
  KEY `administrations_email_template_reminder_id_foreign` (`email_template_reminder_id`) USING BTREE,
  KEY `administrations_email_template_exhortation_id_foreign` (`email_template_exhortation_id`) USING BTREE,
  KEY `administrations_email_template_id_collection_foreign` (`email_template_id_collection`) USING BTREE,
  KEY `administrations_email_template_id_transfer_foreign` (`email_template_id_transfer`) USING BTREE,
  KEY `administrations_mailbox_id_foreign` (`mailbox_id`) USING BTREE,
  KEY `administrations_email_template_financial_overview_id_foreign` (`email_template_financial_overview_id`) USING BTREE,
  KEY `administrations_portal_settings_layout_id_foreign` (`portal_settings_layout_id`) USING BTREE,
  CONSTRAINT `administrations_country_id_foreign` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`),
  CONSTRAINT `administrations_created_by_id_foreign` FOREIGN KEY (`created_by_id`) REFERENCES `users` (`id`),
  CONSTRAINT `administrations_email_template_exhortation_id_foreign` FOREIGN KEY (`email_template_exhortation_id`) REFERENCES `email_templates` (`id`),
  CONSTRAINT `administrations_email_template_financial_overview_id_foreign` FOREIGN KEY (`email_template_financial_overview_id`) REFERENCES `email_templates` (`id`),
  CONSTRAINT `administrations_email_template_id_collection_foreign` FOREIGN KEY (`email_template_id_collection`) REFERENCES `email_templates` (`id`),
  CONSTRAINT `administrations_email_template_id_transfer_foreign` FOREIGN KEY (`email_template_id_transfer`) REFERENCES `email_templates` (`id`),
  CONSTRAINT `administrations_email_template_reminder_id_foreign` FOREIGN KEY (`email_template_reminder_id`) REFERENCES `email_templates` (`id`),
  CONSTRAINT `administrations_mailbox_id_foreign` FOREIGN KEY (`mailbox_id`) REFERENCES `mailboxes` (`id`),
  CONSTRAINT `administrations_portal_settings_layout_id_foreign` FOREIGN KEY (`portal_settings_layout_id`) REFERENCES `portal_settings_layouts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `building_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `building_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `external_hoom_id` int(11) DEFAULT NULL,
  `external_hoom_short` varchar(191) DEFAULT NULL,
  `order` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `campaign_coach`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `campaign_coach` (
  `campaign_id` int(10) unsigned NOT NULL,
  `contact_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`campaign_id`,`contact_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `campaign_external_party`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `campaign_external_party` (
  `campaign_id` int(10) unsigned NOT NULL,
  `contact_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`campaign_id`,`contact_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `campaign_measure_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `campaign_measure_category` (
  `campaign_id` int(10) unsigned NOT NULL,
  `measure_category_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`campaign_id`,`measure_category_id`) USING BTREE,
  KEY `campaign_measure_measure_category_id_foreign` (`measure_category_id`) USING BTREE,
  CONSTRAINT `campaign_measure_measure_category_id_foreign` FOREIGN KEY (`measure_category_id`) REFERENCES `measure_categories` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `campaign_opportunity_action`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `campaign_opportunity_action` (
  `campaign_id` int(10) unsigned NOT NULL,
  `opportunity_action_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`campaign_id`,`opportunity_action_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `campaign_organisation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `campaign_organisation` (
  `campaign_id` int(10) unsigned NOT NULL,
  `organisation_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`campaign_id`,`organisation_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `campaign_project_manager`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `campaign_project_manager` (
  `campaign_id` int(10) unsigned NOT NULL,
  `contact_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`campaign_id`,`contact_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `campaign_responses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `campaign_responses` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `campaign_id` int(10) unsigned NOT NULL,
  `contact_id` int(10) unsigned NOT NULL,
  `date_responded` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `campaign_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `campaign_status` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `campaign_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `campaign_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `campaign_workflows`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `campaign_workflows` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `workflow_for_type` varchar(191) NOT NULL,
  `campaign_id` int(10) unsigned DEFAULT NULL,
  `opportunity_status_id` int(10) unsigned DEFAULT NULL,
  `quotation_request_status_id` int(10) unsigned DEFAULT NULL,
  `number_of_days_to_send_email` int(11) NOT NULL DEFAULT 0,
  `email_template_id_wf` int(10) unsigned DEFAULT NULL,
  `email_template_id_reminder` int(10) unsigned DEFAULT NULL,
  `number_of_days_to_send_email_reminder` int(10) unsigned NOT NULL DEFAULT 0,
  `mail_cc_to_coach_wf` tinyint(1) NOT NULL DEFAULT 0,
  `mail_reminder_to_coach_wf` tinyint(1) NOT NULL DEFAULT 0,
  `mail_to_contact_wf` tinyint(1) NOT NULL DEFAULT 1,
  `is_active` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `campaign_workflows_campaign_id_foreign` (`campaign_id`) USING BTREE,
  KEY `campaign_workflows_opportunity_status_id_foreign` (`opportunity_status_id`) USING BTREE,
  KEY `campaign_workflows_quotation_request_status_id_foreign` (`quotation_request_status_id`) USING BTREE,
  KEY `campaign_workflows_email_template_id_wf_foreign` (`email_template_id_wf`) USING BTREE,
  KEY `campaign_workflows_email_template_id_reminder_foreign` (`email_template_id_reminder`) USING BTREE,
  CONSTRAINT `campaign_workflows_campaign_id_foreign` FOREIGN KEY (`campaign_id`) REFERENCES `campaigns` (`id`),
  CONSTRAINT `campaign_workflows_email_template_id_reminder_foreign` FOREIGN KEY (`email_template_id_reminder`) REFERENCES `email_templates` (`id`),
  CONSTRAINT `campaign_workflows_email_template_id_wf_foreign` FOREIGN KEY (`email_template_id_wf`) REFERENCES `email_templates` (`id`),
  CONSTRAINT `campaign_workflows_opportunity_status_id_foreign` FOREIGN KEY (`opportunity_status_id`) REFERENCES `opportunity_status` (`id`),
  CONSTRAINT `campaign_workflows_quotation_request_status_id_foreign` FOREIGN KEY (`quotation_request_status_id`) REFERENCES `quotation_request_status` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `campaigns`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `campaigns` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `number` varchar(191) NOT NULL,
  `description` varchar(191) DEFAULT NULL,
  `status_id` int(10) unsigned DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `type_id` int(10) unsigned NOT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `owned_by_id` int(10) unsigned DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `inspection_planned_email_template_id` int(10) unsigned DEFAULT NULL,
  `inspection_planned_mailbox_id` int(10) unsigned DEFAULT NULL,
  `inspection_recorded_email_template_id` int(10) unsigned DEFAULT NULL,
  `inspection_released_email_template_id` int(10) unsigned DEFAULT NULL,
  `default_workflow_mailbox_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `campaigns_status_id_foreign` (`status_id`) USING BTREE,
  KEY `campaigns_type_id_foreign` (`type_id`) USING BTREE,
  KEY `campaigns_created_by_id_foreign` (`created_by_id`) USING BTREE,
  KEY `campaigns_owned_by_id_foreign` (`owned_by_id`) USING BTREE,
  KEY `campaigns_inspection_planned_email_template_id_foreign` (`inspection_planned_email_template_id`) USING BTREE,
  KEY `campaigns_inspection_planned_mailbox_id_foreign` (`inspection_planned_mailbox_id`) USING BTREE,
  KEY `campaigns_inspection_recorded_email_template_id_foreign` (`inspection_recorded_email_template_id`) USING BTREE,
  KEY `campaigns_inspection_released_email_template_id_foreign` (`inspection_released_email_template_id`) USING BTREE,
  KEY `campaigns_default_workflow_mailbox_id_foreign` (`default_workflow_mailbox_id`) USING BTREE,
  CONSTRAINT `campaigns_created_by_id_foreign` FOREIGN KEY (`created_by_id`) REFERENCES `users` (`id`),
  CONSTRAINT `campaigns_default_workflow_mailbox_id_foreign` FOREIGN KEY (`default_workflow_mailbox_id`) REFERENCES `mailboxes` (`id`),
  CONSTRAINT `campaigns_inspection_planned_email_template_id_foreign` FOREIGN KEY (`inspection_planned_email_template_id`) REFERENCES `email_templates` (`id`) ON DELETE SET NULL,
  CONSTRAINT `campaigns_inspection_planned_mailbox_id_foreign` FOREIGN KEY (`inspection_planned_mailbox_id`) REFERENCES `mailboxes` (`id`),
  CONSTRAINT `campaigns_inspection_recorded_email_template_id_foreign` FOREIGN KEY (`inspection_recorded_email_template_id`) REFERENCES `email_templates` (`id`) ON DELETE SET NULL,
  CONSTRAINT `campaigns_inspection_released_email_template_id_foreign` FOREIGN KEY (`inspection_released_email_template_id`) REFERENCES `email_templates` (`id`) ON DELETE SET NULL,
  CONSTRAINT `campaigns_owned_by_id_foreign` FOREIGN KEY (`owned_by_id`) REFERENCES `users` (`id`),
  CONSTRAINT `campaigns_status_id_foreign` FOREIGN KEY (`status_id`) REFERENCES `campaign_status` (`id`),
  CONSTRAINT `campaigns_type_id_foreign` FOREIGN KEY (`type_id`) REFERENCES `campaign_types` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `command_runs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `command_runs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `app_cooperation_name` varchar(191) NOT NULL,
  `schedule_run_id` int(10) unsigned NOT NULL,
  `scheduled_commands_command_ref` varchar(191) NOT NULL,
  `start_at` datetime NOT NULL,
  `end_at` datetime DEFAULT NULL,
  `finished` tinyint(1) NOT NULL,
  `created_in_shared` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `composed_contact_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `composed_contact_group` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `parent_group_id` int(10) unsigned NOT NULL,
  `group_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `composed_contact_group_parent_group_id_foreign` (`parent_group_id`) USING BTREE,
  KEY `composed_contact_group_group_id_foreign` (`group_id`) USING BTREE,
  CONSTRAINT `composed_contact_group_group_id_foreign` FOREIGN KEY (`group_id`) REFERENCES `contact_groups` (`id`),
  CONSTRAINT `composed_contact_group_parent_group_id_foreign` FOREIGN KEY (`parent_group_id`) REFERENCES `contact_groups` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `composed_contact_group_excepted`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `composed_contact_group_excepted` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `parent_group_id` int(10) unsigned NOT NULL,
  `group_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `composed_contact_group_excepted_parent_group_id_foreign` (`parent_group_id`) USING BTREE,
  KEY `composed_contact_group_excepted_group_id_foreign` (`group_id`) USING BTREE,
  CONSTRAINT `composed_contact_group_excepted_group_id_foreign` FOREIGN KEY (`group_id`) REFERENCES `contact_groups` (`id`),
  CONSTRAINT `composed_contact_group_excepted_parent_group_id_foreign` FOREIGN KEY (`parent_group_id`) REFERENCES `contact_groups` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `contact_availabilities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact_availabilities` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `contact_id` int(10) unsigned NOT NULL,
  `from` datetime NOT NULL,
  `to` datetime NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `contact_availabilities_contact_id_foreign` (`contact_id`) USING BTREE,
  CONSTRAINT `contact_availabilities_contact_id_foreign` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `contact_email`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact_email` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `contact_id` int(10) unsigned NOT NULL,
  `email_id` int(10) unsigned NOT NULL,
  `email_address_id` int(10) unsigned DEFAULT NULL,
  `status_code` varchar(16) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `contact_email_contact_id_email_id_unique` (`contact_id`,`email_id`) USING BTREE,
  KEY `idx_contact_email_email_contact` (`email_id`,`contact_id`) USING BTREE,
  KEY `contact_email_email_address_id_foreign` (`email_address_id`) USING BTREE,
  CONSTRAINT `contact_email_contact_id_foreign` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`id`),
  CONSTRAINT `contact_email_email_address_id_foreign` FOREIGN KEY (`email_address_id`) REFERENCES `email_addresses` (`id`),
  CONSTRAINT `contact_email_email_id_foreign` FOREIGN KEY (`email_id`) REFERENCES `emails` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `contact_email_manual`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact_email_manual` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `contact_id` int(10) unsigned NOT NULL,
  `email_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `contact_email_manual_contact_id_email_id_unique` (`contact_id`,`email_id`) USING BTREE,
  KEY `idx_contact_email_manual_email_contact` (`email_id`,`contact_id`) USING BTREE,
  CONSTRAINT `contact_email_manual_contact_id_foreign` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `contact_email_manual_email_id_foreign` FOREIGN KEY (`email_id`) REFERENCES `emails` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `contact_for_imports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact_for_imports` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `contact_to_import_id` int(10) unsigned DEFAULT NULL,
  `contact_id` int(10) unsigned DEFAULT NULL,
  `match_code` varchar(191) NOT NULL,
  `match_description` varchar(191) NOT NULL,
  `match_color` varchar(191) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `contact_for_imports_contact_to_import_id_foreign` (`contact_to_import_id`) USING BTREE,
  KEY `contact_for_imports_contact_id_foreign` (`contact_id`) USING BTREE,
  CONSTRAINT `contact_for_imports_contact_id_foreign` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`id`),
  CONSTRAINT `contact_for_imports_contact_to_import_id_foreign` FOREIGN KEY (`contact_to_import_id`) REFERENCES `contact_to_imports` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `contact_group_participation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact_group_participation` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `group_id` int(10) unsigned NOT NULL,
  `project_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `contact_group_participation_group_id_foreign` (`group_id`) USING BTREE,
  KEY `contact_group_participation_project_id_foreign` (`project_id`) USING BTREE,
  CONSTRAINT `contact_group_participation_group_id_foreign` FOREIGN KEY (`group_id`) REFERENCES `contact_groups` (`id`),
  CONSTRAINT `contact_group_participation_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `contact_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact_groups` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL DEFAULT '',
  `description` text NOT NULL,
  `closed` tinyint(1) NOT NULL DEFAULT 0,
  `responsible_user_id` int(10) unsigned DEFAULT NULL,
  `date_started` date DEFAULT NULL,
  `date_finished` date DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `type_id` varchar(191) NOT NULL,
  `simulated_group_id` int(10) unsigned DEFAULT NULL,
  `xxx_is_coach_group` tinyint(1) NOT NULL DEFAULT 0,
  `inspection_person_type_id` varchar(16) DEFAULT NULL,
  `show_contact_form` tinyint(1) NOT NULL DEFAULT 0,
  `show_portal` tinyint(1) NOT NULL DEFAULT 0,
  `edit_portal` tinyint(1) NOT NULL DEFAULT 0,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `composed_group_type` varchar(191) NOT NULL DEFAULT 'one',
  `dynamic_filter_type` varchar(191) NOT NULL DEFAULT 'and',
  `composed_of` varchar(191) NOT NULL,
  `send_email_new_contact_link` tinyint(1) NOT NULL DEFAULT 0,
  `email_template_id_new_contact_link` int(10) unsigned DEFAULT NULL,
  `laposta_list_id` varchar(191) DEFAULT NULL,
  `laposta_list_created_at` datetime DEFAULT NULL,
  `include_into_export_group_report` tinyint(1) NOT NULL DEFAULT 0,
  `portal_sort_order` smallint(6) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `contact_groups_responsible_user_id_foreign` (`responsible_user_id`) USING BTREE,
  KEY `contact_groups_created_by_id_foreign` (`created_by_id`) USING BTREE,
  KEY `contact_groups_email_template_id_new_contact_link_foreign` (`email_template_id_new_contact_link`) USING BTREE,
  KEY `contact_groups_simulated_group_id_foreign` (`simulated_group_id`) USING BTREE,
  CONSTRAINT `contact_groups_created_by_id_foreign` FOREIGN KEY (`created_by_id`) REFERENCES `users` (`id`),
  CONSTRAINT `contact_groups_email_template_id_new_contact_link_foreign` FOREIGN KEY (`email_template_id_new_contact_link`) REFERENCES `email_templates` (`id`),
  CONSTRAINT `contact_groups_responsible_user_id_foreign` FOREIGN KEY (`responsible_user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `contact_groups_simulated_group_id_foreign` FOREIGN KEY (`simulated_group_id`) REFERENCES `contact_groups` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `contact_groups_contacts_for_report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact_groups_contacts_for_report` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `contact_id` int(10) unsigned NOT NULL,
  `contact_group_id` int(10) unsigned NOT NULL,
  `member_to_group_since` date DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `contact_groups_pivot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact_groups_pivot` (
  `contact_id` int(10) unsigned NOT NULL,
  `contact_group_id` int(10) unsigned NOT NULL,
  `laposta_member_id` varchar(191) DEFAULT NULL,
  `laposta_member_state` varchar(25) DEFAULT NULL,
  `member_created_at` datetime DEFAULT NULL,
  `member_to_group_since` date DEFAULT NULL,
  `laposta_last_error_message` varchar(191) DEFAULT NULL,
  UNIQUE KEY `contact_groups_pivot_contact_id_contact_group_id_unique` (`contact_id`,`contact_group_id`) USING BTREE,
  KEY `contact_groups_pivot_contact_group_id_foreign` (`contact_group_id`) USING BTREE,
  CONSTRAINT `contact_groups_pivot_contact_group_id_foreign` FOREIGN KEY (`contact_group_id`) REFERENCES `contact_groups` (`id`),
  CONSTRAINT `contact_groups_pivot_contact_id_foreign` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `contact_notes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact_notes` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `contact_id` int(10) unsigned NOT NULL,
  `note` text NOT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `contact_notes_contact_id_foreign` (`contact_id`) USING BTREE,
  KEY `contact_notes_created_by_id_foreign` (`created_by_id`) USING BTREE,
  KEY `contact_notes_updated_by_id_foreign` (`updated_by_id`) USING BTREE,
  CONSTRAINT `contact_notes_contact_id_foreign` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`id`),
  CONSTRAINT `contact_notes_created_by_id_foreign` FOREIGN KEY (`created_by_id`) REFERENCES `users` (`id`),
  CONSTRAINT `contact_notes_updated_by_id_foreign` FOREIGN KEY (`updated_by_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `contact_to_import_suppliers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact_to_import_suppliers` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(191) NOT NULL,
  `code_ref` varchar(191) NOT NULL,
  `supplier` varchar(191) NOT NULL,
  `file_header` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `contact_to_import_suppliers_code_ref_unique` (`code_ref`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `contact_to_imports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact_to_imports` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `gender` varchar(191) DEFAULT NULL,
  `title` varchar(191) DEFAULT NULL,
  `contact_type` varchar(191) NOT NULL,
  `initials` varchar(191) DEFAULT NULL,
  `first_name` varchar(191) DEFAULT NULL,
  `last_name` varchar(191) DEFAULT NULL,
  `last_name_prefix` varchar(191) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `address` varchar(191) NOT NULL,
  `street` varchar(191) NOT NULL,
  `housenumber` int(10) unsigned DEFAULT NULL,
  `addition` varchar(191) DEFAULT NULL,
  `postal_code` varchar(191) NOT NULL,
  `city` varchar(191) NOT NULL,
  `email_contact` varchar(191) NOT NULL,
  `email_contact_financial` varchar(191) DEFAULT NULL,
  `phone_number` varchar(191) NOT NULL,
  `chamber_of_commerce_number` varchar(191) DEFAULT NULL,
  `iban` text DEFAULT NULL,
  `ean` varchar(191) NOT NULL,
  `ean_type` varchar(191) NOT NULL,
  `es_number` varchar(191) NOT NULL,
  `member_since` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `ean_gas` varchar(191) NOT NULL,
  `member_since_gas` date DEFAULT NULL,
  `end_date_gas` date DEFAULT NULL,
  `match` varchar(191) DEFAULT NULL,
  `status` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `contact_id` int(10) unsigned DEFAULT NULL,
  `supplier_code_ref` varchar(191) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `contact_to_imports_contact_id_foreign` (`contact_id`) USING BTREE,
  KEY `contact_to_imports_supplier_code_ref_foreign` (`supplier_code_ref`) USING BTREE,
  CONSTRAINT `contact_to_imports_contact_id_foreign` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`id`),
  CONSTRAINT `contact_to_imports_supplier_code_ref_foreign` FOREIGN KEY (`supplier_code_ref`) REFERENCES `contact_to_import_suppliers` (`code_ref`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `contacts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `public_id` varchar(22) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `created_with` varchar(16) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `updated_with` varchar(16) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `type_id` varchar(16) DEFAULT NULL,
  `xxx_is_coach` tinyint(1) NOT NULL DEFAULT 0,
  `inspection_person_type_id` varchar(16) DEFAULT NULL,
  `full_name` varchar(255) NOT NULL DEFAULT '',
  `number` varchar(191) NOT NULL DEFAULT '',
  `status_id` varchar(16) DEFAULT NULL,
  `member_since` date DEFAULT NULL,
  `member_until` date DEFAULT NULL,
  `newsletter` tinyint(1) NOT NULL DEFAULT 0,
  `iban` text DEFAULT NULL,
  `liable` tinyint(1) NOT NULL DEFAULT 0,
  `liability_amount` double NOT NULL DEFAULT 0,
  `owner_id` int(10) unsigned DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  `external_id` varchar(191) DEFAULT NULL,
  `did_agree_avg` tinyint(1) NOT NULL DEFAULT 0,
  `date_did_agree_avg` date DEFAULT NULL,
  `iban_attn` varchar(191) DEFAULT NULL,
  `obligations_current` int(11) NOT NULL DEFAULT 0,
  `participations_current` int(11) NOT NULL DEFAULT 0,
  `postalcode_link_capital_current` int(11) NOT NULL DEFAULT 0,
  `loan_current` int(11) NOT NULL DEFAULT 0,
  `is_collect_mandate` tinyint(1) NOT NULL DEFAULT 0,
  `collect_mandate_code` varchar(191) NOT NULL DEFAULT '',
  `collect_mandate_signature_date` date DEFAULT NULL,
  `collect_mandate_first_run_date` date DEFAULT NULL,
  `collect_mandate_collection_schema` varchar(191) NOT NULL DEFAULT '',
  `portal_registration_code` varchar(32) DEFAULT NULL,
  `hoom_account_id` int(11) DEFAULT NULL,
  `hoom_account_created_at` datetime DEFAULT NULL,
  `coach_max_appointments_per_week` int(11) DEFAULT 100,
  `coach_min_minutes_between_appointments` int(11) DEFAULT 30,
  `coach_max_appointments_per_month` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `contacts_public_id_unique` (`public_id`) USING BTREE,
  KEY `contacts_owner_id_foreign` (`owner_id`) USING BTREE,
  KEY `contacts_created_by_id_foreign` (`created_by_id`) USING BTREE,
  KEY `contacts_updated_by_id_foreign` (`updated_by_id`) USING BTREE,
  KEY `idx_contacts_advanced` (`id`,`deleted_at`,`full_name`) USING BTREE,
  CONSTRAINT `contacts_created_by_id_foreign` FOREIGN KEY (`created_by_id`) REFERENCES `users` (`id`),
  CONSTRAINT `contacts_owner_id_foreign` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`),
  CONSTRAINT `contacts_updated_by_id_foreign` FOREIGN KEY (`updated_by_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `cooperation_hoom_campaigns`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `cooperation_hoom_campaigns` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `cooperation_id` int(10) unsigned NOT NULL,
  `campaign_id` int(10) unsigned NOT NULL,
  `measure_id` int(10) unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `cooperation_hoom_campaigns_cooperation_id_foreign` (`cooperation_id`) USING BTREE,
  KEY `cooperation_hoom_campaigns_campaign_id_foreign` (`campaign_id`) USING BTREE,
  KEY `cooperation_hoom_campaigns_measure_id_foreign` (`measure_id`) USING BTREE,
  CONSTRAINT `cooperation_hoom_campaigns_campaign_id_foreign` FOREIGN KEY (`campaign_id`) REFERENCES `campaigns` (`id`),
  CONSTRAINT `cooperation_hoom_campaigns_cooperation_id_foreign` FOREIGN KEY (`cooperation_id`) REFERENCES `cooperations` (`id`),
  CONSTRAINT `cooperation_hoom_campaigns_measure_id_foreign` FOREIGN KEY (`measure_id`) REFERENCES `measures` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `cooperations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `cooperations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `address` varchar(191) DEFAULT NULL,
  `postal_code` varchar(191) DEFAULT NULL,
  `city` varchar(191) DEFAULT NULL,
  `kvk_number` varchar(191) DEFAULT NULL,
  `btw_number` varchar(191) DEFAULT NULL,
  `iban` text DEFAULT NULL,
  `iban_attn` text DEFAULT NULL,
  `email` varchar(191) DEFAULT NULL,
  `website` varchar(191) DEFAULT NULL,
  `logo_filename` varchar(191) DEFAULT NULL,
  `logo_name` varchar(191) DEFAULT NULL,
  `hoom_link` varchar(191) DEFAULT NULL,
  `hoom_connect_coach_link` varchar(191) DEFAULT NULL,
  `hoom_key` varchar(191) DEFAULT NULL,
  `send_email` tinyint(1) NOT NULL DEFAULT 1,
  `hoom_email_template_id` int(10) unsigned DEFAULT NULL,
  `hoom_mailbox_id` int(10) unsigned DEFAULT NULL,
  `hoom_group_id` int(10) unsigned DEFAULT NULL,
  `use_laposta` tinyint(1) NOT NULL DEFAULT 0,
  `laposta_key` varchar(191) DEFAULT NULL,
  `use_export_address_consumption` tinyint(1) NOT NULL DEFAULT 0,
  `show_external_url_for_contacts` tinyint(1) NOT NULL DEFAULT 0,
  `external_url_contacts_button_text` varchar(191) NOT NULL,
  `external_url_contacts_on_new_page` tinyint(1) NOT NULL DEFAULT 1,
  `external_url_contacts` varchar(191) NOT NULL,
  `use_dongle_registration` tinyint(1) NOT NULL DEFAULT 0,
  `created_by_id` int(10) unsigned NOT NULL,
  `updated_by_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `require_two_factor_authentication` tinyint(1) NOT NULL DEFAULT 0,
  `inspection_planned_email_template_id` int(10) unsigned DEFAULT NULL,
  `inspection_planned_mailbox_id` int(10) unsigned DEFAULT NULL,
  `inspection_recorded_email_template_id` int(10) unsigned DEFAULT NULL,
  `inspection_released_email_template_id` int(10) unsigned DEFAULT NULL,
  `font_family_default` varchar(191) DEFAULT NULL,
  `font_size_default` varchar(191) DEFAULT NULL,
  `font_color_default` varchar(191) DEFAULT NULL,
  `create_contacts_for_report_table` tinyint(1) NOT NULL DEFAULT 0,
  `email_report_table_problems` varchar(191) DEFAULT NULL,
  `create_contacts_for_report_table_last_created` date DEFAULT NULL,
  `create_contacts_for_report_table_in_progress` tinyint(1) NOT NULL DEFAULT 0,
  `require_team_on_user_create` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `cooperations_hoom_email_template_id_foreign` (`hoom_email_template_id`) USING BTREE,
  KEY `cooperations_hoom_group_id_foreign` (`hoom_group_id`) USING BTREE,
  KEY `cooperations_created_by_id_foreign` (`created_by_id`) USING BTREE,
  KEY `cooperations_updated_by_id_foreign` (`updated_by_id`) USING BTREE,
  KEY `cooperations_inspection_planned_email_template_id_foreign` (`inspection_planned_email_template_id`) USING BTREE,
  KEY `cooperations_inspection_recorded_email_template_id_foreign` (`inspection_recorded_email_template_id`) USING BTREE,
  KEY `cooperations_inspection_planned_mailbox_id_foreign` (`inspection_planned_mailbox_id`) USING BTREE,
  KEY `cooperations_inspection_released_email_template_id_foreign` (`inspection_released_email_template_id`) USING BTREE,
  KEY `cooperations_hoom_mailbox_id_foreign` (`hoom_mailbox_id`) USING BTREE,
  CONSTRAINT `cooperations_created_by_id_foreign` FOREIGN KEY (`created_by_id`) REFERENCES `users` (`id`),
  CONSTRAINT `cooperations_hoom_email_template_id_foreign` FOREIGN KEY (`hoom_email_template_id`) REFERENCES `email_templates` (`id`),
  CONSTRAINT `cooperations_hoom_group_id_foreign` FOREIGN KEY (`hoom_group_id`) REFERENCES `contact_groups` (`id`),
  CONSTRAINT `cooperations_hoom_mailbox_id_foreign` FOREIGN KEY (`hoom_mailbox_id`) REFERENCES `mailboxes` (`id`) ON DELETE SET NULL,
  CONSTRAINT `cooperations_inspection_planned_email_template_id_foreign` FOREIGN KEY (`inspection_planned_email_template_id`) REFERENCES `email_templates` (`id`) ON DELETE SET NULL,
  CONSTRAINT `cooperations_inspection_planned_mailbox_id_foreign` FOREIGN KEY (`inspection_planned_mailbox_id`) REFERENCES `mailboxes` (`id`),
  CONSTRAINT `cooperations_inspection_recorded_email_template_id_foreign` FOREIGN KEY (`inspection_recorded_email_template_id`) REFERENCES `email_templates` (`id`) ON DELETE SET NULL,
  CONSTRAINT `cooperations_inspection_released_email_template_id_foreign` FOREIGN KEY (`inspection_released_email_template_id`) REFERENCES `email_templates` (`id`) ON DELETE SET NULL,
  CONSTRAINT `cooperations_updated_by_id_foreign` FOREIGN KEY (`updated_by_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `cost_centers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `cost_centers` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `description` varchar(191) NOT NULL DEFAULT '',
  `twinfield_cost_center_code` varchar(191) NOT NULL DEFAULT '',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `countries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `countries` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  UNIQUE KEY `countries_id_unique` (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `district_has_coaches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `district_has_coaches` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `district_id` bigint(20) unsigned NOT NULL,
  `contact_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `district_has_coaches_district_id_foreign` (`district_id`) USING BTREE,
  KEY `district_has_coaches_contact_id_foreign` (`contact_id`) USING BTREE,
  CONSTRAINT `district_has_coaches_contact_id_foreign` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `district_has_coaches_district_id_foreign` FOREIGN KEY (`district_id`) REFERENCES `districts` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `districts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `districts` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `default_duration_minutes` int(11) DEFAULT NULL,
  `send_email_to_contact_when_planned` tinyint(1) NOT NULL DEFAULT 0,
  `email_to_contact_template_id` int(10) unsigned DEFAULT NULL,
  `send_email_to_coach_when_planned` tinyint(1) NOT NULL DEFAULT 0,
  `email_to_coach_template_id` int(10) unsigned DEFAULT NULL,
  `closed` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `districts_email_to_contact_template_id_foreign` (`email_to_contact_template_id`) USING BTREE,
  KEY `districts_email_to_coach_template_id_foreign` (`email_to_coach_template_id`) USING BTREE,
  CONSTRAINT `districts_email_to_coach_template_id_foreign` FOREIGN KEY (`email_to_coach_template_id`) REFERENCES `email_templates` (`id`),
  CONSTRAINT `districts_email_to_contact_template_id_foreign` FOREIGN KEY (`email_to_contact_template_id`) REFERENCES `email_templates` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `document_created_froms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `document_created_froms` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `code_ref` varchar(191) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `document_template_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `document_template_role` (
  `document_template_id` int(10) unsigned NOT NULL,
  `role_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  UNIQUE KEY `document_template_role_document_template_id_role_id_unique` (`document_template_id`,`role_id`) USING BTREE,
  KEY `document_template_role_role_id_foreign` (`role_id`) USING BTREE,
  CONSTRAINT `document_template_role_document_template_id_foreign` FOREIGN KEY (`document_template_id`) REFERENCES `document_templates` (`id`),
  CONSTRAINT `document_template_role_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `document_templates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `document_templates` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `number` varchar(191) NOT NULL,
  `characteristic` varchar(191) DEFAULT NULL,
  `name` varchar(191) DEFAULT NULL,
  `document_group` varchar(191) DEFAULT NULL,
  `template_type` varchar(191) NOT NULL,
  `base_template_id` int(10) unsigned DEFAULT NULL,
  `header_id` int(10) unsigned DEFAULT NULL,
  `footer_id` int(10) unsigned DEFAULT NULL,
  `active` tinyint(1) NOT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `html_body` mediumtext DEFAULT NULL,
  `allow_change_html_body` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `document_templates_base_template_id_foreign` (`base_template_id`) USING BTREE,
  KEY `document_templates_header_id_foreign` (`header_id`) USING BTREE,
  KEY `document_templates_footer_id_foreign` (`footer_id`) USING BTREE,
  KEY `document_templates_created_by_id_foreign` (`created_by_id`) USING BTREE,
  CONSTRAINT `document_templates_base_template_id_foreign` FOREIGN KEY (`base_template_id`) REFERENCES `document_templates` (`id`),
  CONSTRAINT `document_templates_created_by_id_foreign` FOREIGN KEY (`created_by_id`) REFERENCES `users` (`id`),
  CONSTRAINT `document_templates_footer_id_foreign` FOREIGN KEY (`footer_id`) REFERENCES `document_templates` (`id`),
  CONSTRAINT `document_templates_header_id_foreign` FOREIGN KEY (`header_id`) REFERENCES `document_templates` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `documents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `documents` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `number` varchar(191) NOT NULL,
  `filename` varchar(191) NOT NULL,
  `file_path_and_name` varchar(191) DEFAULT NULL,
  `description` varchar(191) DEFAULT NULL,
  `document_type` varchar(191) NOT NULL,
  `document_group` varchar(191) NOT NULL,
  `free_text_1` varchar(191) DEFAULT NULL,
  `free_text_2` varchar(191) DEFAULT NULL,
  `contact_id` int(10) unsigned DEFAULT NULL,
  `contact_group_id` int(10) unsigned DEFAULT NULL,
  `opportunity_id` int(10) unsigned DEFAULT NULL,
  `sent_by_id` int(10) unsigned DEFAULT NULL,
  `document_created_from_id` int(10) unsigned DEFAULT NULL,
  `created_by_id` int(10) unsigned NOT NULL,
  `created_by_portal_user_id` int(10) unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `intake_id` int(10) unsigned DEFAULT NULL,
  `template_id` int(10) unsigned DEFAULT NULL,
  `html_body` text DEFAULT NULL,
  `alfresco_node_id` varchar(191) DEFAULT NULL,
  `campaign_id` int(10) unsigned DEFAULT NULL,
  `housing_file_id` int(10) unsigned DEFAULT NULL,
  `quotation_request_id` int(10) unsigned DEFAULT NULL,
  `measure_id` int(10) unsigned DEFAULT NULL,
  `task_id` int(10) unsigned DEFAULT NULL,
  `project_id` int(10) unsigned DEFAULT NULL,
  `participation_project_id` int(10) unsigned DEFAULT NULL,
  `order_id` int(10) unsigned DEFAULT NULL,
  `administration_id` int(10) unsigned DEFAULT NULL,
  `show_on_portal` tinyint(1) NOT NULL DEFAULT 0,
  `portal_filter_contact_group_id` int(10) unsigned DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `documents_contact_id_foreign` (`contact_id`) USING BTREE,
  KEY `documents_contact_group_id_foreign` (`contact_group_id`) USING BTREE,
  KEY `documents_opportunity_id_foreign` (`opportunity_id`) USING BTREE,
  KEY `documents_sent_by_id_foreign` (`sent_by_id`) USING BTREE,
  KEY `documents_created_by_id_foreign` (`created_by_id`) USING BTREE,
  KEY `documents_intake_id_foreign` (`intake_id`) USING BTREE,
  KEY `documents_template_id_foreign` (`template_id`) USING BTREE,
  KEY `documents_campaign_id_foreign` (`campaign_id`) USING BTREE,
  KEY `documents_housing_file_id_foreign` (`housing_file_id`) USING BTREE,
  KEY `documents_quotation_request_id_foreign` (`quotation_request_id`) USING BTREE,
  KEY `documents_measure_id_foreign` (`measure_id`) USING BTREE,
  KEY `documents_task_id_foreign` (`task_id`) USING BTREE,
  KEY `documents_order_id_foreign` (`order_id`) USING BTREE,
  KEY `documents_project_id_foreign` (`project_id`) USING BTREE,
  KEY `documents_participation_project_id_foreign` (`participation_project_id`) USING BTREE,
  KEY `documents_administration_id_foreign` (`administration_id`) USING BTREE,
  KEY `documents_portal_filter_contact_group_id_foreign` (`portal_filter_contact_group_id`) USING BTREE,
  KEY `documents_document_created_from_id_foreign` (`document_created_from_id`) USING BTREE,
  KEY `documents_created_by_portal_user_id_foreign` (`created_by_portal_user_id`) USING BTREE,
  CONSTRAINT `documents_administration_id_foreign` FOREIGN KEY (`administration_id`) REFERENCES `administrations` (`id`),
  CONSTRAINT `documents_campaign_id_foreign` FOREIGN KEY (`campaign_id`) REFERENCES `campaigns` (`id`),
  CONSTRAINT `documents_contact_group_id_foreign` FOREIGN KEY (`contact_group_id`) REFERENCES `contact_groups` (`id`),
  CONSTRAINT `documents_contact_id_foreign` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`id`),
  CONSTRAINT `documents_created_by_id_foreign` FOREIGN KEY (`created_by_id`) REFERENCES `users` (`id`),
  CONSTRAINT `documents_created_by_portal_user_id_foreign` FOREIGN KEY (`created_by_portal_user_id`) REFERENCES `portal_users` (`id`),
  CONSTRAINT `documents_document_created_from_id_foreign` FOREIGN KEY (`document_created_from_id`) REFERENCES `document_created_froms` (`id`),
  CONSTRAINT `documents_housing_file_id_foreign` FOREIGN KEY (`housing_file_id`) REFERENCES `housing_files` (`id`),
  CONSTRAINT `documents_intake_id_foreign` FOREIGN KEY (`intake_id`) REFERENCES `intakes` (`id`),
  CONSTRAINT `documents_measure_id_foreign` FOREIGN KEY (`measure_id`) REFERENCES `measures` (`id`),
  CONSTRAINT `documents_opportunity_id_foreign` FOREIGN KEY (`opportunity_id`) REFERENCES `opportunities` (`id`),
  CONSTRAINT `documents_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `documents_participation_project_id_foreign` FOREIGN KEY (`participation_project_id`) REFERENCES `participation_project` (`id`),
  CONSTRAINT `documents_portal_filter_contact_group_id_foreign` FOREIGN KEY (`portal_filter_contact_group_id`) REFERENCES `contact_groups` (`id`),
  CONSTRAINT `documents_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`),
  CONSTRAINT `documents_quotation_request_id_foreign` FOREIGN KEY (`quotation_request_id`) REFERENCES `quotation_requests` (`id`),
  CONSTRAINT `documents_sent_by_id_foreign` FOREIGN KEY (`sent_by_id`) REFERENCES `users` (`id`),
  CONSTRAINT `documents_task_id_foreign` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`),
  CONSTRAINT `documents_template_id_foreign` FOREIGN KEY (`template_id`) REFERENCES `document_templates` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `dynamic_contact_group_filter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `dynamic_contact_group_filter` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `field` varchar(191) NOT NULL,
  `comperator` varchar(191) NOT NULL,
  `data` varchar(191) NOT NULL,
  `type` varchar(191) NOT NULL,
  `contact_group_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `model_name` varchar(191) DEFAULT NULL,
  `connect_name` varchar(191) NOT NULL DEFAULT '',
  `connected_to` varchar(191) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `dynamic_contact_group_filter_contact_group_id_foreign` (`contact_group_id`) USING BTREE,
  CONSTRAINT `dynamic_contact_group_filter_contact_group_id_foreign` FOREIGN KEY (`contact_group_id`) REFERENCES `contact_groups` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `email_addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `email_addresses` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `contact_id` int(10) unsigned NOT NULL,
  `type_id` varchar(16) DEFAULT NULL,
  `email` varchar(191) NOT NULL DEFAULT '',
  `primary` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `email_addresses_contact_id_foreign` (`contact_id`) USING BTREE,
  CONSTRAINT `email_addresses_contact_id_foreign` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `email_attachments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `email_attachments` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `filename` varchar(191) NOT NULL DEFAULT '',
  `name` varchar(191) NOT NULL DEFAULT '',
  `email_id` int(10) unsigned NOT NULL,
  `cid` varchar(191) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idx_email_attachments` (`email_id`,`id`,`cid`) USING BTREE,
  CONSTRAINT `email_attachments_email_id_foreign` FOREIGN KEY (`email_id`) REFERENCES `emails` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `email_group_email_addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `email_group_email_addresses` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email_id` int(10) unsigned DEFAULT NULL,
  `email_address_id` int(10) unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `email_group_email_addresses_email_id_foreign` (`email_id`) USING BTREE,
  KEY `email_group_email_addresses_email_address_id_foreign` (`email_address_id`) USING BTREE,
  CONSTRAINT `email_group_email_addresses_email_address_id_foreign` FOREIGN KEY (`email_address_id`) REFERENCES `email_addresses` (`id`),
  CONSTRAINT `email_group_email_addresses_email_id_foreign` FOREIGN KEY (`email_id`) REFERENCES `emails` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `email_templates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `email_templates` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `subject` varchar(191) DEFAULT NULL,
  `default_attachment_document_id` int(10) unsigned DEFAULT NULL,
  `created_by_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `html_body` mediumtext DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `email_templates_created_by_id_foreign` (`created_by_id`) USING BTREE,
  KEY `email_templates_default_attachment_document_id_foreign` (`default_attachment_document_id`) USING BTREE,
  CONSTRAINT `email_templates_created_by_id_foreign` FOREIGN KEY (`created_by_id`) REFERENCES `users` (`id`),
  CONSTRAINT `email_templates_default_attachment_document_id_foreign` FOREIGN KEY (`default_attachment_document_id`) REFERENCES `documents` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `emails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `emails` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `mailbox_id` int(10) unsigned NOT NULL,
  `from` varchar(191) NOT NULL DEFAULT '',
  `to` text DEFAULT NULL,
  `cc` text DEFAULT NULL,
  `bcc` text DEFAULT NULL,
  `subject` varchar(250) NOT NULL DEFAULT '',
  `subject_for_filter` varchar(150) NOT NULL DEFAULT '',
  `folder` varchar(191) NOT NULL DEFAULT '',
  `imap_id` int(10) unsigned DEFAULT NULL,
  `xxx_gmail_message_id` varchar(191) DEFAULT NULL,
  `msoauth_message_id` varchar(191) DEFAULT NULL,
  `message_id` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `date_sent` datetime DEFAULT NULL,
  `status` varchar(191) DEFAULT NULL,
  `date_closed` datetime DEFAULT NULL,
  `closed_by_id` int(10) unsigned DEFAULT NULL,
  `date_removed` datetime DEFAULT NULL,
  `removed_by_id` int(10) unsigned DEFAULT NULL,
  `intake_id` int(10) unsigned DEFAULT NULL,
  `responsible_user_id` int(10) unsigned DEFAULT NULL,
  `responsible_team_id` int(10) unsigned DEFAULT NULL,
  `task_id` int(10) unsigned DEFAULT NULL,
  `quotation_request_id` int(10) unsigned DEFAULT NULL,
  `measure_id` int(10) unsigned DEFAULT NULL,
  `opportunity_id` int(10) unsigned DEFAULT NULL,
  `project_id` int(10) unsigned DEFAULT NULL,
  `order_id` int(10) unsigned DEFAULT NULL,
  `invoice_id` int(10) unsigned DEFAULT NULL,
  `contact_group_id` int(10) unsigned DEFAULT NULL,
  `mail_contact_group_with_single_mail` tinyint(1) NOT NULL DEFAULT 0,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `html_body` mediumtext NOT NULL,
  `sent_by_user_id` int(10) unsigned DEFAULT NULL,
  `reply_type_id` varchar(191) DEFAULT NULL,
  `old_email_id` int(10) unsigned DEFAULT NULL,
  `note` text DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `emails_mailbox_id_foreign` (`mailbox_id`) USING BTREE,
  KEY `emails_closed_by_id_foreign` (`closed_by_id`) USING BTREE,
  KEY `emails_intake_id_foreign` (`intake_id`) USING BTREE,
  KEY `emails_responsible_user_id_foreign` (`responsible_user_id`) USING BTREE,
  KEY `emails_responsible_team_id_foreign` (`responsible_team_id`) USING BTREE,
  KEY `emails_task_id_foreign` (`task_id`) USING BTREE,
  KEY `emails_quotation_request_id_foreign` (`quotation_request_id`) USING BTREE,
  KEY `emails_measure_id_foreign` (`measure_id`) USING BTREE,
  KEY `emails_opportunity_id_foreign` (`opportunity_id`) USING BTREE,
  KEY `emails_order_id_foreign` (`order_id`) USING BTREE,
  KEY `emails_invoice_id_foreign` (`invoice_id`) USING BTREE,
  KEY `emails_contact_group_id_foreign` (`contact_group_id`) USING BTREE,
  KEY `emails_project_id_foreign` (`project_id`) USING BTREE,
  KEY `emails_removed_by_id_foreign` (`removed_by_id`) USING BTREE,
  KEY `emails_folder_index` (`folder`) USING BTREE,
  KEY `idx_emails_advanced` (`folder`,`mailbox_id`,`deleted_at`,`date_sent`,`from`,`status`,`subject_for_filter`,`responsible_user_id`,`responsible_team_id`) USING BTREE,
  CONSTRAINT `emails_closed_by_id_foreign` FOREIGN KEY (`closed_by_id`) REFERENCES `users` (`id`),
  CONSTRAINT `emails_contact_group_id_foreign` FOREIGN KEY (`contact_group_id`) REFERENCES `contact_groups` (`id`),
  CONSTRAINT `emails_intake_id_foreign` FOREIGN KEY (`intake_id`) REFERENCES `intakes` (`id`),
  CONSTRAINT `emails_invoice_id_foreign` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`),
  CONSTRAINT `emails_mailbox_id_foreign` FOREIGN KEY (`mailbox_id`) REFERENCES `mailboxes` (`id`),
  CONSTRAINT `emails_measure_id_foreign` FOREIGN KEY (`measure_id`) REFERENCES `measures` (`id`),
  CONSTRAINT `emails_opportunity_id_foreign` FOREIGN KEY (`opportunity_id`) REFERENCES `opportunities` (`id`),
  CONSTRAINT `emails_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `emails_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`),
  CONSTRAINT `emails_quotation_request_id_foreign` FOREIGN KEY (`quotation_request_id`) REFERENCES `quotation_requests` (`id`),
  CONSTRAINT `emails_removed_by_id_foreign` FOREIGN KEY (`removed_by_id`) REFERENCES `users` (`id`),
  CONSTRAINT `emails_responsible_team_id_foreign` FOREIGN KEY (`responsible_team_id`) REFERENCES `teams` (`id`),
  CONSTRAINT `emails_responsible_user_id_foreign` FOREIGN KEY (`responsible_user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `emails_task_id_foreign` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `energy_label_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `energy_label_status` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `energy_labels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `energy_labels` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `external_hoom_id` int(11) DEFAULT NULL,
  `external_hoom_short` varchar(191) DEFAULT NULL,
  `order` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `energy_suppliers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `energy_suppliers` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `does_postal_code_links` tinyint(1) NOT NULL DEFAULT 0,
  `excel_template_id` smallint(6) DEFAULT NULL,
  `abbreviation` varchar(3) NOT NULL,
  `file_format_id` smallint(6) DEFAULT NULL,
  `order` int(11) DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `energy_supply_statuses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `energy_supply_statuses` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `energy_supply_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `energy_supply_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `faq_measure`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `faq_measure` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `measure_id` int(10) unsigned DEFAULT NULL,
  `question` varchar(191) NOT NULL,
  `answer` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `faq_measure_measure_id_foreign` (`measure_id`) USING BTREE,
  CONSTRAINT `faq_measure_measure_id_foreign` FOREIGN KEY (`measure_id`) REFERENCES `measures` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `financial_overview_contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `financial_overview_contacts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `financial_overview_id` int(10) unsigned NOT NULL,
  `contact_id` int(10) unsigned NOT NULL,
  `status_id` varchar(191) NOT NULL DEFAULT 'concept',
  `filename` varchar(191) DEFAULT NULL,
  `name` varchar(191) DEFAULT NULL,
  `date_sent` date DEFAULT NULL,
  `emailed_to` varchar(191) DEFAULT NULL,
  `document_template_financial_overview_id` int(10) unsigned DEFAULT NULL,
  `email_template_financial_overview_id` int(10) unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `foc_unique_overview_contact` (`financial_overview_id`,`contact_id`) USING BTREE,
  KEY `financial_overview_contacts_contact_id_foreign` (`contact_id`) USING BTREE,
  KEY `foc_document_template_fo_id_foreign` (`document_template_financial_overview_id`) USING BTREE,
  KEY `foc_email_template_fo_id_foreign` (`email_template_financial_overview_id`) USING BTREE,
  CONSTRAINT `financial_overview_contacts_contact_id_foreign` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`id`),
  CONSTRAINT `foc_document_template_fo_id_foreign` FOREIGN KEY (`document_template_financial_overview_id`) REFERENCES `document_templates` (`id`),
  CONSTRAINT `foc_email_template_fo_id_foreign` FOREIGN KEY (`email_template_financial_overview_id`) REFERENCES `email_templates` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `financial_overview_participant_projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `financial_overview_participant_projects` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `financial_overview_project_id` int(10) unsigned NOT NULL,
  `participant_project_id` int(10) unsigned NOT NULL,
  `contact_id` int(10) unsigned NOT NULL,
  `status_id` varchar(191) NOT NULL DEFAULT 'concept',
  `quantity_start_value` int(11) NOT NULL DEFAULT 0,
  `quantity_end_value` int(11) NOT NULL DEFAULT 0,
  `bookworth_start_value` double NOT NULL DEFAULT 0,
  `bookworth_end_value` double NOT NULL DEFAULT 0,
  `amount_start_value` double NOT NULL DEFAULT 0,
  `amount_end_value` double NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `fopp_unique_overviewproject_participantproject` (`financial_overview_project_id`,`participant_project_id`) USING BTREE,
  KEY `pp_id_foreign` (`participant_project_id`) USING BTREE,
  KEY `financial_overview_participant_projects_contact_id_foreign` (`contact_id`) USING BTREE,
  KEY `fopp_project_contact_status_idx` (`financial_overview_project_id`,`contact_id`,`status_id`) USING BTREE,
  CONSTRAINT `financial_overview_participant_projects_contact_id_foreign` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`id`),
  CONSTRAINT `fop_id_foreign` FOREIGN KEY (`financial_overview_project_id`) REFERENCES `financial_overview_projects` (`id`),
  CONSTRAINT `pp_id_foreign` FOREIGN KEY (`participant_project_id`) REFERENCES `participation_project` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `financial_overview_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `financial_overview_post` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `filename` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `financial_overview_id` int(10) unsigned NOT NULL,
  `financial_overview_contact_ids` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `fo_post_id_foreign` (`financial_overview_id`) USING BTREE,
  CONSTRAINT `fo_post_id_foreign` FOREIGN KEY (`financial_overview_id`) REFERENCES `financial_overviews` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `financial_overview_projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `financial_overview_projects` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `financial_overview_id` int(10) unsigned NOT NULL,
  `project_id` int(10) unsigned NOT NULL,
  `definitive` tinyint(1) NOT NULL DEFAULT 0,
  `status_id` varchar(191) NOT NULL DEFAULT 'concept',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `fo_id_foreign` (`financial_overview_id`) USING BTREE,
  KEY `financial_overview_projects_project_id_foreign` (`project_id`) USING BTREE,
  CONSTRAINT `financial_overview_projects_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`),
  CONSTRAINT `fo_id_foreign` FOREIGN KEY (`financial_overview_id`) REFERENCES `financial_overviews` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `financial_overviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `financial_overviews` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `description` varchar(191) NOT NULL,
  `administration_id` int(10) unsigned NOT NULL,
  `year` year(4) NOT NULL,
  `definitive` tinyint(1) NOT NULL DEFAULT 0,
  `status_id` varchar(191) NOT NULL DEFAULT 'concept',
  `date_processed` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `document_template_financial_overview_id` int(10) unsigned DEFAULT NULL,
  `email_template_financial_overview_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `financial_overviews_administration_id_foreign` (`administration_id`) USING BTREE,
  KEY `financial_overviews_document_template_fo_id_foreign` (`document_template_financial_overview_id`) USING BTREE,
  KEY `financial_overviews_email_template_fo_id_foreign` (`email_template_financial_overview_id`) USING BTREE,
  CONSTRAINT `financial_overviews_administration_id_foreign` FOREIGN KEY (`administration_id`) REFERENCES `administrations` (`id`),
  CONSTRAINT `financial_overviews_document_template_fo_id_foreign` FOREIGN KEY (`document_template_financial_overview_id`) REFERENCES `document_templates` (`id`),
  CONSTRAINT `financial_overviews_email_template_fo_id_foreign` FOREIGN KEY (`email_template_financial_overview_id`) REFERENCES `email_templates` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `financial_overviews_to_send`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `financial_overviews_to_send` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `financial_overview_contact_id` int(10) unsigned NOT NULL,
  `financial_overview_created` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `foc_id_foreign` (`financial_overview_contact_id`) USING BTREE,
  CONSTRAINT `foc_id_foreign` FOREIGN KEY (`financial_overview_contact_id`) REFERENCES `financial_overview_contacts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `free_fields_field_formats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `free_fields_field_formats` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `format_type` varchar(191) NOT NULL,
  `format_name` varchar(191) NOT NULL,
  `format_length` int(10) unsigned NOT NULL,
  `format_decimals` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `free_fields_field_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `free_fields_field_log` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `free_fields_field_record_id` int(10) unsigned NOT NULL,
  `changed_from` varchar(10) NOT NULL,
  `portal_user_id` int(10) unsigned DEFAULT NULL,
  `user_id` int(10) unsigned DEFAULT NULL,
  `old_value` mediumtext DEFAULT NULL,
  `new_value` mediumtext DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `free_fields_field_log_free_fields_field_record_id_foreign` (`free_fields_field_record_id`) USING BTREE,
  KEY `free_fields_field_log_portal_user_id_foreign` (`portal_user_id`) USING BTREE,
  KEY `free_fields_field_log_user_id_foreign` (`user_id`) USING BTREE,
  CONSTRAINT `free_fields_field_log_free_fields_field_record_id_foreign` FOREIGN KEY (`free_fields_field_record_id`) REFERENCES `free_fields_field_records` (`id`),
  CONSTRAINT `free_fields_field_log_portal_user_id_foreign` FOREIGN KEY (`portal_user_id`) REFERENCES `portal_users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `free_fields_field_log_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `free_fields_field_records`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `free_fields_field_records` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `field_id` int(10) unsigned NOT NULL,
  `table_record_id` int(10) unsigned NOT NULL,
  `field_value_text` text DEFAULT NULL,
  `field_value_boolean` tinyint(1) DEFAULT NULL,
  `field_value_int` int(11) DEFAULT NULL,
  `field_value_double` double DEFAULT NULL,
  `field_value_datetime` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `free_fields_field_records_field_id_foreign` (`field_id`) USING BTREE,
  KEY `free_fields_field_records_table_record_id_index` (`table_record_id`) USING BTREE,
  CONSTRAINT `free_fields_field_records_field_id_foreign` FOREIGN KEY (`field_id`) REFERENCES `free_fields_fields` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `free_fields_fields`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `free_fields_fields` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `table_id` int(10) unsigned NOT NULL,
  `field_format_id` int(10) unsigned NOT NULL,
  `field_name` varchar(191) NOT NULL,
  `field_name_webform` varchar(191) DEFAULT NULL,
  `visible_portal` tinyint(1) NOT NULL,
  `change_portal` tinyint(1) NOT NULL,
  `mandatory` tinyint(1) NOT NULL,
  `default_value` varchar(191) NOT NULL,
  `exportable` tinyint(1) NOT NULL DEFAULT 1,
  `sort_order` int(11) NOT NULL DEFAULT 1,
  `mask` varchar(191) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `free_fields_fields_table_id_foreign` (`table_id`) USING BTREE,
  KEY `free_fields_fields_field_format_id_foreign` (`field_format_id`) USING BTREE,
  CONSTRAINT `free_fields_fields_field_format_id_foreign` FOREIGN KEY (`field_format_id`) REFERENCES `free_fields_field_formats` (`id`),
  CONSTRAINT `free_fields_fields_table_id_foreign` FOREIGN KEY (`table_id`) REFERENCES `free_fields_tables` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `free_fields_tables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `free_fields_tables` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `table` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `prefix_field_name_webform` varchar(25) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `group_participant_pivot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `group_participant_pivot` (
  `participant_id` int(10) unsigned NOT NULL,
  `contact_group_id` int(10) unsigned NOT NULL,
  UNIQUE KEY `group_participant_pivot_participant_id_contact_group_id_unique` (`participant_id`,`contact_group_id`) USING BTREE,
  KEY `group_participant_pivot_contact_group_id_foreign` (`contact_group_id`) USING BTREE,
  CONSTRAINT `group_participant_pivot_contact_group_id_foreign` FOREIGN KEY (`contact_group_id`) REFERENCES `contact_groups` (`id`),
  CONSTRAINT `group_participant_pivot_participant_id_foreign` FOREIGN KEY (`participant_id`) REFERENCES `participation_project` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `housing_file_hoom_housing_statuses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `housing_file_hoom_housing_statuses` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `external_hoom_short_name` varchar(191) DEFAULT NULL,
  `hoom_status_question` varchar(191) DEFAULT NULL,
  `hoom_status_value` varchar(191) DEFAULT NULL,
  `hoom_status_name` varchar(191) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `housing_file_hoom_links`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `housing_file_hoom_links` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `external_hoom_short_name` varchar(191) DEFAULT NULL,
  `econobis_field_name` varchar(191) DEFAULT NULL,
  `housing_file_data_type` varchar(1) NOT NULL DEFAULT '',
  `label` varchar(191) NOT NULL DEFAULT '',
  `import_from_hoom` tinyint(1) NOT NULL DEFAULT 0,
  `visible_in_econobis` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `housing_file_housing_statuses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `housing_file_housing_statuses` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `housing_file_id` int(10) unsigned NOT NULL,
  `housing_file_hoom_links_id` int(10) unsigned NOT NULL,
  `status` text DEFAULT NULL,
  `number_or_m2` double DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `housing_file_housing_statuses_housing_file_id_foreign` (`housing_file_id`) USING BTREE,
  KEY `housing_file_housing_statuses_housing_file_hoom_links_id_foreign` (`housing_file_hoom_links_id`) USING BTREE,
  CONSTRAINT `housing_file_housing_statuses_housing_file_hoom_links_id_foreign` FOREIGN KEY (`housing_file_hoom_links_id`) REFERENCES `housing_file_hoom_links` (`id`),
  CONSTRAINT `housing_file_housing_statuses_housing_file_id_foreign` FOREIGN KEY (`housing_file_id`) REFERENCES `housing_files` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `housing_file_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `housing_file_log` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `housing_file_id` int(10) unsigned DEFAULT NULL,
  `message_text` varchar(256) NOT NULL,
  `message_type` varchar(10) NOT NULL,
  `user_id` int(10) unsigned DEFAULT NULL,
  `is_error` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `housing_file_log_housing_file_id_foreign` (`housing_file_id`) USING BTREE,
  KEY `housing_file_log_user_id_foreign` (`user_id`) USING BTREE,
  CONSTRAINT `housing_file_log_housing_file_id_foreign` FOREIGN KEY (`housing_file_id`) REFERENCES `housing_files` (`id`),
  CONSTRAINT `housing_file_log_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `housing_file_measure_taken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `housing_file_measure_taken` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `address_id` int(10) unsigned NOT NULL,
  `measure_id` int(10) unsigned NOT NULL,
  `measure_date` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `housing_file_measure_taken_address_id_measure_id_unique` (`address_id`,`measure_id`) USING BTREE,
  UNIQUE KEY `housing_file_measure_taken_id_unique` (`id`) USING BTREE,
  KEY `housing_file_measure_taken_measure_id_foreign` (`measure_id`) USING BTREE,
  CONSTRAINT `housing_file_measure_taken_address_id_foreign` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`id`),
  CONSTRAINT `housing_file_measure_taken_measure_id_foreign` FOREIGN KEY (`measure_id`) REFERENCES `measures` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `housing_file_specification_floors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `housing_file_specification_floors` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `housing_file_specification_floors_id_unique` (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `housing_file_specification_sides`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `housing_file_specification_sides` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `housing_file_specification_sides_id_unique` (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `housing_file_specification_statuses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `housing_file_specification_statuses` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `code_ref` varchar(191) DEFAULT NULL,
  `order` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `housing_file_specification_statuses_id_unique` (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `housing_file_specifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `housing_file_specifications` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `housing_file_id` int(10) unsigned NOT NULL,
  `campaign_id` int(10) unsigned DEFAULT NULL,
  `measure_id` int(10) unsigned NOT NULL,
  `measure_date` date DEFAULT NULL,
  `answer` text DEFAULT NULL,
  `status_id` int(10) unsigned DEFAULT NULL,
  `external_hoom_name` varchar(191) DEFAULT NULL,
  `type_of_execution` varchar(1) DEFAULT NULL,
  `savings_gas` double DEFAULT NULL,
  `savings_electricity` double DEFAULT NULL,
  `co2_savings` double DEFAULT NULL,
  `floor_id` int(10) unsigned DEFAULT NULL,
  `side_id` int(10) unsigned DEFAULT NULL,
  `type_brand` varchar(191) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `housing_file_specifications_id_unique` (`id`) USING BTREE,
  KEY `housing_file_specifications_housing_file_id_foreign` (`housing_file_id`) USING BTREE,
  KEY `housing_file_specifications_measure_id_foreign` (`measure_id`) USING BTREE,
  KEY `housing_file_specifications_status_id_foreign` (`status_id`) USING BTREE,
  KEY `housing_file_specifications_floor_id_foreign` (`floor_id`) USING BTREE,
  KEY `housing_file_specifications_side_id_foreign` (`side_id`) USING BTREE,
  KEY `housing_file_specifications_campaign_id_foreign` (`campaign_id`) USING BTREE,
  CONSTRAINT `housing_file_specifications_campaign_id_foreign` FOREIGN KEY (`campaign_id`) REFERENCES `campaigns` (`id`),
  CONSTRAINT `housing_file_specifications_floor_id_foreign` FOREIGN KEY (`floor_id`) REFERENCES `housing_file_specification_floors` (`id`),
  CONSTRAINT `housing_file_specifications_housing_file_id_foreign` FOREIGN KEY (`housing_file_id`) REFERENCES `housing_files` (`id`),
  CONSTRAINT `housing_file_specifications_measure_id_foreign` FOREIGN KEY (`measure_id`) REFERENCES `measures` (`id`),
  CONSTRAINT `housing_file_specifications_side_id_foreign` FOREIGN KEY (`side_id`) REFERENCES `housing_file_specification_sides` (`id`),
  CONSTRAINT `housing_file_specifications_status_id_foreign` FOREIGN KEY (`status_id`) REFERENCES `housing_file_specification_statuses` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `housing_files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `housing_files` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `address_id` int(10) unsigned NOT NULL,
  `building_type_id` int(10) unsigned DEFAULT NULL,
  `build_year` smallint(6) DEFAULT NULL,
  `is_house_for_sale` varchar(1) NOT NULL,
  `surface` double DEFAULT NULL,
  `roof_type_id` int(10) unsigned DEFAULT NULL,
  `energy_label_id` int(10) unsigned DEFAULT NULL,
  `floors` int(11) DEFAULT NULL,
  `energy_label_status_id` int(10) unsigned DEFAULT NULL,
  `is_monument` varchar(1) NOT NULL,
  `number_of_residents` int(11) NOT NULL,
  `revenue_solar_panels` int(11) NOT NULL,
  `remark` text NOT NULL,
  `remark_coach` text NOT NULL,
  `hoom_building_id` int(11) DEFAULT NULL,
  `wall_surface` varchar(191) DEFAULT NULL,
  `total_window_surface` varchar(191) DEFAULT NULL,
  `frame_type` varchar(191) DEFAULT NULL,
  `floor_surface` varchar(191) DEFAULT NULL,
  `pitched_roof_surface` varchar(191) DEFAULT NULL,
  `flat_roof_surface` varchar(191) DEFAULT NULL,
  `cook_type` varchar(191) DEFAULT NULL,
  `heat_source` varchar(191) DEFAULT NULL,
  `water_comfort` varchar(191) DEFAULT NULL,
  `boiler_setting_comfort_heat` varchar(191) DEFAULT NULL,
  `pitched_roof_heating` varchar(191) DEFAULT NULL,
  `flat_roof_heating` varchar(191) DEFAULT NULL,
  `hr3p_glass_frame_current_glass` varchar(191) DEFAULT NULL,
  `glass_in_lead_replace_rooms_heated` varchar(191) DEFAULT NULL,
  `amount_gas` varchar(191) DEFAULT NULL,
  `amount_electricity` varchar(191) DEFAULT NULL,
  `created_by_id` int(10) unsigned NOT NULL,
  `updated_by_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `housing_files_address_id_foreign` (`address_id`) USING BTREE,
  KEY `housing_files_building_type_id_foreign` (`building_type_id`) USING BTREE,
  KEY `housing_files_roof_type_id_foreign` (`roof_type_id`) USING BTREE,
  KEY `housing_files_energy_label_id_foreign` (`energy_label_id`) USING BTREE,
  KEY `housing_files_energy_label_status_id_foreign` (`energy_label_status_id`) USING BTREE,
  KEY `housing_files_created_by_id_foreign` (`created_by_id`) USING BTREE,
  KEY `housing_files_updated_by_id_foreign` (`updated_by_id`) USING BTREE,
  CONSTRAINT `housing_files_address_id_foreign` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`id`),
  CONSTRAINT `housing_files_building_type_id_foreign` FOREIGN KEY (`building_type_id`) REFERENCES `building_types` (`id`),
  CONSTRAINT `housing_files_created_by_id_foreign` FOREIGN KEY (`created_by_id`) REFERENCES `users` (`id`),
  CONSTRAINT `housing_files_energy_label_id_foreign` FOREIGN KEY (`energy_label_id`) REFERENCES `energy_labels` (`id`),
  CONSTRAINT `housing_files_energy_label_status_id_foreign` FOREIGN KEY (`energy_label_status_id`) REFERENCES `energy_label_status` (`id`),
  CONSTRAINT `housing_files_roof_type_id_foreign` FOREIGN KEY (`roof_type_id`) REFERENCES `roof_types` (`id`),
  CONSTRAINT `housing_files_updated_by_id_foreign` FOREIGN KEY (`updated_by_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `industries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `industries` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `intake_measure_requested`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `intake_measure_requested` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `intake_id` int(10) unsigned NOT NULL,
  `measure_category_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `intake_measure_requested_id_unique` (`id`) USING BTREE,
  UNIQUE KEY `intake_measure_requested_intake_id_measure_category_id_unique` (`intake_id`,`measure_category_id`) USING BTREE,
  KEY `intake_measure_requested_measure_category_id_foreign` (`measure_category_id`) USING BTREE,
  CONSTRAINT `intake_measure_requested_intake_id_foreign` FOREIGN KEY (`intake_id`) REFERENCES `intakes` (`id`),
  CONSTRAINT `intake_measure_requested_measure_category_id_foreign` FOREIGN KEY (`measure_category_id`) REFERENCES `measure_categories` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `intake_reason`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `intake_reason` (
  `reason_id` int(10) unsigned NOT NULL,
  `intake_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  UNIQUE KEY `intake_reason_reason_id_intake_id_unique` (`reason_id`,`intake_id`) USING BTREE,
  KEY `intake_reason_intake_id_foreign` (`intake_id`) USING BTREE,
  CONSTRAINT `intake_reason_intake_id_foreign` FOREIGN KEY (`intake_id`) REFERENCES `intakes` (`id`),
  CONSTRAINT `intake_reason_reason_id_foreign` FOREIGN KEY (`reason_id`) REFERENCES `reasons` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `intake_source`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `intake_source` (
  `source_id` int(10) unsigned NOT NULL,
  `intake_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  UNIQUE KEY `intake_source_source_id_intake_id_unique` (`source_id`,`intake_id`) USING BTREE,
  KEY `intake_source_intake_id_foreign` (`intake_id`) USING BTREE,
  CONSTRAINT `intake_source_intake_id_foreign` FOREIGN KEY (`intake_id`) REFERENCES `intakes` (`id`),
  CONSTRAINT `intake_source_source_id_foreign` FOREIGN KEY (`source_id`) REFERENCES `sources` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `intake_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `intake_status` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `code_ref` varchar(191) DEFAULT NULL,
  `order` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `intakes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `intakes` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `contact_id` int(10) unsigned NOT NULL,
  `address_id` int(10) unsigned DEFAULT NULL,
  `intake_status_id` int(10) unsigned DEFAULT NULL,
  `campaign_id` int(10) unsigned DEFAULT NULL,
  `note` varchar(2500) NOT NULL DEFAULT '',
  `external_code` varchar(191) DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `intakes_contact_id_foreign` (`contact_id`) USING BTREE,
  KEY `intakes_address_id_foreign` (`address_id`) USING BTREE,
  KEY `intakes_intake_status_id_foreign` (`intake_status_id`) USING BTREE,
  KEY `intakes_campaign_id_foreign` (`campaign_id`) USING BTREE,
  KEY `intakes_created_by_id_foreign` (`created_by_id`) USING BTREE,
  KEY `intakes_updated_by_id_foreign` (`updated_by_id`) USING BTREE,
  CONSTRAINT `intakes_address_id_foreign` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`id`),
  CONSTRAINT `intakes_campaign_id_foreign` FOREIGN KEY (`campaign_id`) REFERENCES `campaigns` (`id`),
  CONSTRAINT `intakes_contact_id_foreign` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`id`),
  CONSTRAINT `intakes_created_by_id_foreign` FOREIGN KEY (`created_by_id`) REFERENCES `users` (`id`),
  CONSTRAINT `intakes_intake_status_id_foreign` FOREIGN KEY (`intake_status_id`) REFERENCES `intake_status` (`id`),
  CONSTRAINT `intakes_updated_by_id_foreign` FOREIGN KEY (`updated_by_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `invoice_document`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoice_document` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `invoice_id` int(10) unsigned DEFAULT NULL,
  `filename` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `invoice_document_invoice_id_foreign` (`invoice_id`) USING BTREE,
  CONSTRAINT `invoice_document_invoice_id_foreign` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `invoice_mollie_payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoice_mollie_payments` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `invoice_id` int(10) unsigned NOT NULL,
  `mollie_id` varchar(191) DEFAULT NULL,
  `checkout_url` varchar(256) DEFAULT NULL,
  `date_activated` datetime DEFAULT NULL,
  `date_paid` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `iban` text DEFAULT NULL,
  `iban_name` varchar(191) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `invoice_mollie_payments_invoice_id_foreign` (`invoice_id`) USING BTREE,
  CONSTRAINT `invoice_mollie_payments_invoice_id_foreign` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `invoice_payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoice_payment` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `invoice_id` int(10) unsigned NOT NULL,
  `amount` double NOT NULL,
  `type_id` varchar(191) NOT NULL,
  `date_paid` date NOT NULL,
  `payment_reference` varchar(191) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `twinfield_number` varchar(191) DEFAULT NULL,
  `twinfield_match_number` varchar(191) DEFAULT NULL,
  `in_progress` tinyint(1) NOT NULL DEFAULT 0,
  `twinfield_modified` datetime DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `invoice_payment_invoice_id_foreign` (`invoice_id`) USING BTREE,
  CONSTRAINT `invoice_payment_invoice_id_foreign` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `invoice_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoice_post` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `filename` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `administration_id` int(10) unsigned NOT NULL,
  `invoice_ids` text NOT NULL,
  `contact_ids` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `invoice_post_administration_id_foreign` (`administration_id`) USING BTREE,
  CONSTRAINT `invoice_post_administration_id_foreign` FOREIGN KEY (`administration_id`) REFERENCES `administrations` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `invoice_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoice_product` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` int(10) unsigned NOT NULL,
  `invoice_id` int(10) unsigned NOT NULL,
  `product_code` varchar(191) DEFAULT NULL,
  `product_name` varchar(191) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `amount` double(11,2) DEFAULT NULL,
  `amount_reduction` double DEFAULT NULL,
  `percentage_reduction` double DEFAULT NULL,
  `price_number_of_decimals` tinyint(4) NOT NULL DEFAULT 2,
  `price` double DEFAULT NULL,
  `price_incl_vat` double DEFAULT NULL,
  `vat_percentage` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `date_last_invoice` date DEFAULT NULL,
  `twinfield_ledger_code` varchar(191) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `invoice_product_product_id_foreign` (`product_id`) USING BTREE,
  KEY `invoice_product_invoice_id_foreign` (`invoice_id`) USING BTREE,
  CONSTRAINT `invoice_product_invoice_id_foreign` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`),
  CONSTRAINT `invoice_product_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `invoices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoices` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `invoice_number` int(11) NOT NULL,
  `number` varchar(191) NOT NULL,
  `order_id` int(10) unsigned NOT NULL,
  `administration_id` int(10) unsigned NOT NULL,
  `payment_type_id` varchar(191) NOT NULL,
  `status_id` varchar(191) NOT NULL,
  `mollie_status_id` varchar(191) NOT NULL DEFAULT 'not_used',
  `date_sent` date DEFAULT NULL,
  `date_collection` date DEFAULT NULL,
  `number_of_invoice_reminders` smallint(6) NOT NULL DEFAULT 3,
  `date_reminder_1` date DEFAULT NULL,
  `date_reminder_2` date DEFAULT NULL,
  `date_reminder_3` date DEFAULT NULL,
  `date_exhortation` date DEFAULT NULL,
  `date_requested` date DEFAULT NULL,
  `created_by_id` int(10) unsigned NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `sepa_id` int(10) unsigned DEFAULT NULL,
  `emailed_to` varchar(191) DEFAULT NULL,
  `email_reminder_1` varchar(191) DEFAULT NULL,
  `email_reminder_2` varchar(191) DEFAULT NULL,
  `email_reminder_3` varchar(191) DEFAULT NULL,
  `email_exhortation` varchar(191) DEFAULT NULL,
  `collection_frequency_id` varchar(191) DEFAULT NULL,
  `days_to_expire` int(11) DEFAULT NULL,
  `days_last_reminder` int(11) DEFAULT NULL,
  `subject` varchar(191) DEFAULT NULL,
  `iban` text DEFAULT NULL,
  `invoice_text` varchar(1000) DEFAULT NULL,
  `twinfield_number` varchar(191) DEFAULT NULL,
  `iban_attn` varchar(191) DEFAULT NULL,
  `sent_to_name` varchar(191) DEFAULT NULL,
  `sent_to_street` varchar(191) DEFAULT NULL,
  `sent_to_street_number` int(11) DEFAULT NULL,
  `sent_to_addition` varchar(191) DEFAULT NULL,
  `sent_to_postal_code` varchar(191) DEFAULT NULL,
  `sent_to_country` varchar(191) DEFAULT NULL,
  `sent_to_contact_number` varchar(191) DEFAULT NULL,
  `code` varchar(191) NOT NULL,
  `iban_old` varchar(191) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `invoices_order_id_foreign` (`order_id`) USING BTREE,
  KEY `invoices_administration_id_foreign` (`administration_id`) USING BTREE,
  KEY `invoices_created_by_id_foreign` (`created_by_id`) USING BTREE,
  KEY `invoices_sepa_id_foreign` (`sepa_id`) USING BTREE,
  CONSTRAINT `invoices_administration_id_foreign` FOREIGN KEY (`administration_id`) REFERENCES `administrations` (`id`),
  CONSTRAINT `invoices_created_by_id_foreign` FOREIGN KEY (`created_by_id`) REFERENCES `users` (`id`),
  CONSTRAINT `invoices_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `invoices_sepa_id_foreign` FOREIGN KEY (`sepa_id`) REFERENCES `sepas` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `invoices_to_send`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoices_to_send` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `invoice_id` int(10) unsigned NOT NULL,
  `invoice_created` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `invoices_to_send_invoice_id_foreign` (`invoice_id`) USING BTREE,
  CONSTRAINT `invoices_to_send_invoice_id_foreign` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(191) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) unsigned NOT NULL,
  `reserved_at` int(10) unsigned DEFAULT NULL,
  `available_at` int(10) unsigned NOT NULL,
  `created_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `jobs_queue_index` (`queue`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `jobs_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs_log` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `value` varchar(191) NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `job_category_id` varchar(191) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `jobs_log_user_id_foreign` (`user_id`) USING BTREE,
  CONSTRAINT `jobs_log_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `last_name_prefixes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `last_name_prefixes` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(16) NOT NULL DEFAULT '',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `ledgers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `ledgers` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `description` varchar(191) NOT NULL DEFAULT '',
  `vat_code_id` int(10) unsigned DEFAULT NULL,
  `twinfield_ledger_code` varchar(191) NOT NULL DEFAULT '',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `ledgers_vat_code_id_foreign` (`vat_code_id`) USING BTREE,
  CONSTRAINT `ledgers_vat_code_id_foreign` FOREIGN KEY (`vat_code_id`) REFERENCES `vat_codes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `mailbox_ignores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `mailbox_ignores` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `mailbox_id` int(10) unsigned NOT NULL,
  `value` varchar(191) DEFAULT NULL,
  `type_id` varchar(191) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `mailbox_ignores_mailbox_id_foreign` (`mailbox_id`) USING BTREE,
  CONSTRAINT `mailbox_ignores_mailbox_id_foreign` FOREIGN KEY (`mailbox_id`) REFERENCES `mailboxes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `mailbox_oauth_api_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `mailbox_oauth_api_settings` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `mailbox_id` int(10) unsigned NOT NULL,
  `client_id` varchar(191) DEFAULT NULL,
  `project_id` varchar(191) DEFAULT NULL,
  `client_secret` text DEFAULT NULL,
  `token` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `tenant_id` varchar(191) DEFAULT NULL,
  `force_reconnect` tinyint(1) NOT NULL DEFAULT 0,
  `force_select_account` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `mailbox_gmail_api_settings_mailbox_id_foreign` (`mailbox_id`) USING BTREE,
  CONSTRAINT `mailbox_gmail_api_settings_mailbox_id_foreign` FOREIGN KEY (`mailbox_id`) REFERENCES `mailboxes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `mailbox_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `mailbox_user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `mailbox_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `mailbox_user_mailbox_id_foreign` (`mailbox_id`) USING BTREE,
  KEY `mailbox_user_user_id_foreign` (`user_id`) USING BTREE,
  CONSTRAINT `mailbox_user_mailbox_id_foreign` FOREIGN KEY (`mailbox_id`) REFERENCES `mailboxes` (`id`),
  CONSTRAINT `mailbox_user_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `mailboxes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `mailboxes` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL DEFAULT '',
  `email` varchar(191) NOT NULL DEFAULT '',
  `only_outgoing_mailbox` tinyint(1) NOT NULL DEFAULT 0,
  `smtp_host` varchar(191) NOT NULL DEFAULT '',
  `smtp_port` varchar(191) NOT NULL DEFAULT '',
  `smtp_encryption` varchar(191) DEFAULT NULL,
  `imap_host` varchar(191) NOT NULL DEFAULT '',
  `imap_port` varchar(191) NOT NULL DEFAULT '',
  `imap_encryption` varchar(191) DEFAULT NULL,
  `imap_inbox_prefix` varchar(191) NOT NULL DEFAULT '',
  `username` varchar(191) NOT NULL DEFAULT '',
  `password` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `valid` tinyint(1) NOT NULL DEFAULT 0,
  `login_tries` int(11) NOT NULL DEFAULT 0,
  `mailgun_domain_id` int(10) unsigned DEFAULT NULL,
  `incoming_server_type` varchar(191) DEFAULT NULL,
  `outgoing_server_type` varchar(191) NOT NULL DEFAULT '',
  `primary` tinyint(1) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `link_contact_from_email_to_address` tinyint(1) NOT NULL DEFAULT 0,
  `date_last_fetched` datetime DEFAULT NULL,
  `imap_id_last_fetched` int(10) unsigned DEFAULT NULL,
  `email_mark_as_seen` tinyint(1) NOT NULL DEFAULT 1,
  `start_fetch_mail` datetime DEFAULT NULL,
  `inbound_mailgun_email` varchar(191) DEFAULT NULL,
  `inbound_mailgun_post_token` varchar(191) DEFAULT NULL,
  `inbound_mailgun_route_id` varchar(191) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `mailboxes_mailgun_domain_id_foreign` (`mailgun_domain_id`) USING BTREE,
  KEY `idx_mailboxes_name` (`id`,`name`) USING BTREE,
  CONSTRAINT `mailboxes_mailgun_domain_id_foreign` FOREIGN KEY (`mailgun_domain_id`) REFERENCES `mailgun_domains` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `mailgun_domains`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `mailgun_domains` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `domain` varchar(191) NOT NULL DEFAULT '',
  `secret` text NOT NULL,
  `is_system_mailgun_domain` tinyint(1) NOT NULL DEFAULT 0,
  `is_verified` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `mailgun_events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `mailgun_events` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `mailgun_domain_id` int(10) unsigned NOT NULL,
  `mailgun_id` varchar(191) NOT NULL,
  `mailgun_message_id` varchar(191) NOT NULL,
  `event` varchar(191) NOT NULL,
  `recipient` varchar(191) NOT NULL,
  `subject` varchar(191) NOT NULL,
  `event_date` datetime NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `delivery_status` varchar(191) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `mailgun_events_mailgun_domain_id_foreign` (`mailgun_domain_id`) USING BTREE,
  CONSTRAINT `mailgun_events_mailgun_domain_id_foreign` FOREIGN KEY (`mailgun_domain_id`) REFERENCES `mailgun_domains` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `measure_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `measure_categories` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `uses_wf_create_opportunity` tinyint(1) NOT NULL DEFAULT 0,
  `measure_id_wf_create_opportunity` int(10) unsigned DEFAULT NULL,
  `opportunity_status_id_wf_create_opportunity` int(10) unsigned DEFAULT NULL,
  `uses_wf_create_quotation_request` tinyint(1) NOT NULL DEFAULT 0,
  `organisation_id_wf_create_quotation_request` int(10) unsigned DEFAULT NULL,
  `uses_wf_email_quotation_request` tinyint(1) NOT NULL DEFAULT 0,
  `email_template_id_wf_create_quotation_request` int(10) unsigned DEFAULT NULL,
  `calendar_background_color` varchar(7) NOT NULL DEFAULT '#265985',
  `calendar_text_color` varchar(7) NOT NULL DEFAULT '#ffffff',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `measure_categories_email_template_id_wf_cqr_foreign` (`email_template_id_wf_create_quotation_request`) USING BTREE,
  KEY `measure_categories_organisation_id_wf_cqr_foreign` (`organisation_id_wf_create_quotation_request`) USING BTREE,
  KEY `measure_categories_measure_id_wf_co_foreign` (`measure_id_wf_create_opportunity`) USING BTREE,
  KEY `measure_categories_opportunity_status_id_wf_cqr_foreign` (`opportunity_status_id_wf_create_opportunity`) USING BTREE,
  CONSTRAINT `measure_categories_email_template_id_wf_cqr_foreign` FOREIGN KEY (`email_template_id_wf_create_quotation_request`) REFERENCES `email_templates` (`id`),
  CONSTRAINT `measure_categories_measure_id_wf_co_foreign` FOREIGN KEY (`measure_id_wf_create_opportunity`) REFERENCES `measures` (`id`),
  CONSTRAINT `measure_categories_opportunity_status_id_wf_cqr_foreign` FOREIGN KEY (`opportunity_status_id_wf_create_opportunity`) REFERENCES `opportunity_status` (`id`),
  CONSTRAINT `measure_categories_organisation_id_wf_cqr_foreign` FOREIGN KEY (`organisation_id_wf_create_quotation_request`) REFERENCES `organisations` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `measure_opportunity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `measure_opportunity` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `opportunity_id` int(10) unsigned DEFAULT NULL,
  `measure_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `measure_opportunity_opportunity_id_measure_id_unique` (`opportunity_id`,`measure_id`) USING BTREE,
  KEY `measure_opportunity_measure_id_foreign` (`measure_id`) USING BTREE,
  CONSTRAINT `measure_opportunity_measure_id_foreign` FOREIGN KEY (`measure_id`) REFERENCES `measures` (`id`),
  CONSTRAINT `measure_opportunity_opportunity_id_foreign` FOREIGN KEY (`opportunity_id`) REFERENCES `opportunities` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `measures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `measures` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `name_custom` varchar(191) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `number` varchar(191) NOT NULL,
  `description` varchar(191) DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  `measure_category_id` int(10) unsigned NOT NULL,
  `visible` tinyint(1) NOT NULL DEFAULT 1,
  `external_hoom_id` varchar(191) DEFAULT NULL,
  `external_hoom_short_name` varchar(191) DEFAULT NULL,
  `external_hoom_name` varchar(191) DEFAULT NULL,
  `import_from_hoom` tinyint(1) NOT NULL DEFAULT 0,
  `visible_in_econobis` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `measures_created_by_id_foreign` (`created_by_id`) USING BTREE,
  KEY `measures_updated_by_id_foreign` (`updated_by_id`) USING BTREE,
  KEY `measures_measure_category_id_foreign` (`measure_category_id`) USING BTREE,
  CONSTRAINT `measures_created_by_id_foreign` FOREIGN KEY (`created_by_id`) REFERENCES `users` (`id`),
  CONSTRAINT `measures_measure_category_id_foreign` FOREIGN KEY (`measure_category_id`) REFERENCES `measure_categories` (`id`),
  CONSTRAINT `measures_updated_by_id_foreign` FOREIGN KEY (`updated_by_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(191) NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `model_has_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `model_has_permissions` (
  `permission_id` int(10) unsigned NOT NULL,
  `model_type` varchar(191) NOT NULL,
  `model_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`permission_id`,`model_id`,`model_type`) USING BTREE,
  KEY `model_has_permissions_model_type_model_id_index` (`model_type`,`model_id`) USING BTREE,
  CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `model_has_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `model_has_roles` (
  `role_id` int(10) unsigned NOT NULL,
  `model_type` varchar(191) NOT NULL,
  `model_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`role_id`,`model_id`,`model_type`) USING BTREE,
  KEY `model_has_roles_model_type_model_id_index` (`model_type`,`model_id`) USING BTREE,
  CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `oauth_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth_access_tokens` (
  `id` varchar(100) NOT NULL,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `client_id` bigint(20) unsigned NOT NULL,
  `name` varchar(191) DEFAULT NULL,
  `scopes` text DEFAULT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `oauth_access_tokens_user_id_index` (`user_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `oauth_auth_codes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth_auth_codes` (
  `id` varchar(100) NOT NULL,
  `user_id` bigint(20) unsigned NOT NULL,
  `client_id` bigint(20) unsigned NOT NULL,
  `scopes` text DEFAULT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `oauth_auth_codes_user_id_index` (`user_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `oauth_clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth_clients` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `name` varchar(191) NOT NULL,
  `secret` varchar(191) DEFAULT NULL,
  `provider` varchar(191) DEFAULT NULL,
  `redirect` text NOT NULL,
  `personal_access_client` tinyint(1) NOT NULL,
  `password_client` tinyint(1) NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `oauth_clients_user_id_index` (`user_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `oauth_personal_access_clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth_personal_access_clients` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `client_id` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `oauth_refresh_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth_refresh_tokens` (
  `id` varchar(100) NOT NULL,
  `access_token_id` varchar(100) NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `oauth_refresh_tokens_access_token_id_index` (`access_token_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `obligation_numbers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `obligation_numbers` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `participation_id` int(10) unsigned NOT NULL,
  `number` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `obligation_numbers_number_participation_id_unique` (`number`,`participation_id`) USING BTREE,
  KEY `obligation_numbers_participation_id_foreign` (`participation_id`) USING BTREE,
  CONSTRAINT `obligation_numbers_participation_id_foreign` FOREIGN KEY (`participation_id`) REFERENCES `participation_project` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `occupation_contact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `occupation_contact` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `occupation_id` int(10) unsigned NOT NULL,
  `primary_contact_id` int(10) unsigned NOT NULL,
  `contact_id` int(10) unsigned NOT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `primary` tinyint(1) NOT NULL DEFAULT 0,
  `allow_manage_in_portal` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `unique_3_keys` (`occupation_id`,`primary_contact_id`,`contact_id`) USING BTREE,
  KEY `occupation_contact_primary_contact_id_foreign` (`primary_contact_id`) USING BTREE,
  KEY `occupation_contact_contact_id_foreign` (`contact_id`) USING BTREE,
  CONSTRAINT `occupation_contact_contact_id_foreign` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`id`),
  CONSTRAINT `occupation_contact_occupation_id_foreign` FOREIGN KEY (`occupation_id`) REFERENCES `occupations` (`id`),
  CONSTRAINT `occupation_contact_primary_contact_id_foreign` FOREIGN KEY (`primary_contact_id`) REFERENCES `contacts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `occupations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `occupations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `primary_occupation` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `secondary_occupation` varchar(191) NOT NULL,
  `occupation_for_portal` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `opportunities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `opportunities` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `measure_category_id` int(10) unsigned NOT NULL,
  `number` varchar(191) NOT NULL,
  `opportunity_code` varchar(191) DEFAULT NULL,
  `status_id` int(10) unsigned NOT NULL,
  `housing_file_specification_id` int(10) unsigned DEFAULT NULL,
  `date_planned_to_send_wf_email_status` date DEFAULT NULL,
  `intake_id` int(10) unsigned DEFAULT NULL,
  `quotation_text` text DEFAULT NULL,
  `desired_date` date DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `evaluation_is_realised` tinyint(1) NOT NULL DEFAULT 1,
  `evaluation_is_statisfied` tinyint(1) NOT NULL DEFAULT 1,
  `evaluation_would_recommend_organisation` tinyint(1) NOT NULL DEFAULT 1,
  `evaluation_note` text DEFAULT NULL,
  `evaluation_agreed_date` date DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `opportunities_status_id_foreign` (`status_id`) USING BTREE,
  KEY `opportunities_intake_id_foreign` (`intake_id`) USING BTREE,
  KEY `opportunities_created_by_id_foreign` (`created_by_id`) USING BTREE,
  KEY `opportunities_updated_by_id_foreign` (`updated_by_id`) USING BTREE,
  KEY `opportunities_measure_category_id_foreign` (`measure_category_id`) USING BTREE,
  KEY `opportunities_housing_file_specification_id_foreign` (`housing_file_specification_id`) USING BTREE,
  CONSTRAINT `opportunities_created_by_id_foreign` FOREIGN KEY (`created_by_id`) REFERENCES `users` (`id`),
  CONSTRAINT `opportunities_housing_file_specification_id_foreign` FOREIGN KEY (`housing_file_specification_id`) REFERENCES `housing_file_specifications` (`id`),
  CONSTRAINT `opportunities_intake_id_foreign` FOREIGN KEY (`intake_id`) REFERENCES `intakes` (`id`),
  CONSTRAINT `opportunities_measure_category_id_foreign` FOREIGN KEY (`measure_category_id`) REFERENCES `measure_categories` (`id`),
  CONSTRAINT `opportunities_status_id_foreign` FOREIGN KEY (`status_id`) REFERENCES `opportunity_status` (`id`),
  CONSTRAINT `opportunities_updated_by_id_foreign` FOREIGN KEY (`updated_by_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `opportunity_actions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `opportunity_actions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `code_ref` varchar(191) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `opportunity_evaluation_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `opportunity_evaluation_status` (
  `id` int(10) unsigned NOT NULL,
  `name` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `opportunity_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `opportunity_status` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `uses_wf` tinyint(1) NOT NULL DEFAULT 0,
  `email_template_id_wf` int(10) unsigned DEFAULT NULL,
  `number_of_days_to_send_email` int(11) NOT NULL DEFAULT 0,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `external_hoom_id` int(11) DEFAULT NULL,
  `code_ref` varchar(191) DEFAULT NULL,
  `order` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `opportunity_status_email_template_id_wf_foreign` (`email_template_id_wf`) USING BTREE,
  CONSTRAINT `opportunity_status_email_template_id_wf_foreign` FOREIGN KEY (`email_template_id_wf`) REFERENCES `email_templates` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `order_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_product` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` int(10) unsigned NOT NULL,
  `order_id` int(10) unsigned NOT NULL,
  `amount` double(11,2) DEFAULT NULL,
  `amount_reduction` double DEFAULT NULL,
  `percentage_reduction` double DEFAULT NULL,
  `date_start` date NOT NULL,
  `date_end` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `date_last_invoice` date DEFAULT NULL,
  `date_period_start_first_invoice` date DEFAULT NULL,
  `variable_price` double DEFAULT NULL,
  `cost_center_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `order_product_product_id_foreign` (`product_id`) USING BTREE,
  KEY `order_product_order_id_foreign` (`order_id`) USING BTREE,
  KEY `order_product_cost_center_id_foreign` (`cost_center_id`) USING BTREE,
  CONSTRAINT `order_product_cost_center_id_foreign` FOREIGN KEY (`cost_center_id`) REFERENCES `cost_centers` (`id`),
  CONSTRAINT `order_product_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `order_product_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `number` varchar(191) NOT NULL,
  `contact_id` int(10) unsigned NOT NULL,
  `administration_id` int(10) unsigned NOT NULL,
  `status_id` varchar(191) NOT NULL,
  `subject` varchar(191) NOT NULL,
  `email_template_id_transfer` int(10) unsigned DEFAULT NULL,
  `email_template_reminder_id` int(10) unsigned DEFAULT NULL,
  `email_template_exhortation_id` int(10) unsigned DEFAULT NULL,
  `payment_type_id` varchar(191) NOT NULL,
  `collection_frequency_id` varchar(191) NOT NULL,
  `IBAN` text DEFAULT NULL,
  `iban_attn` varchar(191) DEFAULT NULL,
  `po_number` varchar(191) DEFAULT NULL,
  `invoice_text` varchar(1000) DEFAULT NULL,
  `number_of_invoice_reminders` smallint(6) DEFAULT NULL,
  `date_requested` date DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `date_next_invoice` date DEFAULT NULL,
  `email_template_id_collection` int(10) unsigned DEFAULT NULL,
  `participation_id` int(10) unsigned DEFAULT NULL,
  `project_number` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `orders_contact_id_foreign` (`contact_id`) USING BTREE,
  KEY `orders_administration_id_foreign` (`administration_id`) USING BTREE,
  KEY `orders_email_template_reminder_id_foreign` (`email_template_reminder_id`) USING BTREE,
  KEY `orders_email_template_exhortation_id_foreign` (`email_template_exhortation_id`) USING BTREE,
  KEY `orders_created_by_id_foreign` (`created_by_id`) USING BTREE,
  KEY `orders_email_template_id_collection_foreign` (`email_template_id_collection`) USING BTREE,
  KEY `orders_email_template_id_transfer_foreign` (`email_template_id_transfer`) USING BTREE,
  KEY `orders_participation_id_foreign` (`participation_id`) USING BTREE,
  CONSTRAINT `orders_administration_id_foreign` FOREIGN KEY (`administration_id`) REFERENCES `administrations` (`id`),
  CONSTRAINT `orders_contact_id_foreign` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`id`),
  CONSTRAINT `orders_created_by_id_foreign` FOREIGN KEY (`created_by_id`) REFERENCES `users` (`id`),
  CONSTRAINT `orders_email_template_exhortation_id_foreign` FOREIGN KEY (`email_template_exhortation_id`) REFERENCES `email_templates` (`id`),
  CONSTRAINT `orders_email_template_id_collection_foreign` FOREIGN KEY (`email_template_id_collection`) REFERENCES `email_templates` (`id`),
  CONSTRAINT `orders_email_template_id_transfer_foreign` FOREIGN KEY (`email_template_id_transfer`) REFERENCES `email_templates` (`id`),
  CONSTRAINT `orders_email_template_reminder_id_foreign` FOREIGN KEY (`email_template_reminder_id`) REFERENCES `email_templates` (`id`),
  CONSTRAINT `orders_participation_id_foreign` FOREIGN KEY (`participation_id`) REFERENCES `participation_project` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `organisation_delivers_measure`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `organisation_delivers_measure` (
  `measure_id` int(10) unsigned NOT NULL,
  `organisation_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`measure_id`,`organisation_id`) USING BTREE,
  KEY `organisation_delivers_measure_organisation_id_foreign` (`organisation_id`) USING BTREE,
  CONSTRAINT `organisation_delivers_measure_measure_id_foreign` FOREIGN KEY (`measure_id`) REFERENCES `measures` (`id`),
  CONSTRAINT `organisation_delivers_measure_organisation_id_foreign` FOREIGN KEY (`organisation_id`) REFERENCES `organisations` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `organisation_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `organisation_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `organisations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `organisations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `contact_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `name` varchar(191) NOT NULL DEFAULT '',
  `statutory_name` varchar(191) NOT NULL,
  `type_id` int(10) unsigned DEFAULT NULL,
  `website` varchar(191) NOT NULL DEFAULT '',
  `chamber_of_commerce_number` varchar(191) NOT NULL DEFAULT '',
  `vat_number` varchar(191) NOT NULL DEFAULT '',
  `industry_id` int(10) unsigned DEFAULT NULL,
  `square_meters` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `organisations_contact_id_foreign` (`contact_id`) USING BTREE,
  KEY `organisations_type_id_foreign` (`type_id`) USING BTREE,
  KEY `organisations_industry_id_foreign` (`industry_id`) USING BTREE,
  CONSTRAINT `organisations_contact_id_foreign` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`id`),
  CONSTRAINT `organisations_industry_id_foreign` FOREIGN KEY (`industry_id`) REFERENCES `industries` (`id`),
  CONSTRAINT `organisations_type_id_foreign` FOREIGN KEY (`type_id`) REFERENCES `organisation_types` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `participant_mutation_mollie_payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `participant_mutation_mollie_payments` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `participant_mutation_id` int(10) unsigned NOT NULL,
  `mollie_id` varchar(191) DEFAULT NULL,
  `checkout_url` varchar(256) DEFAULT NULL,
  `date_activated` datetime DEFAULT NULL,
  `date_paid` datetime DEFAULT NULL,
  `iban` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `iban_name` varchar(191) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `pmmp_participant_mutation_id_foreign` (`participant_mutation_id`) USING BTREE,
  CONSTRAINT `pmmp_participant_mutation_id_foreign` FOREIGN KEY (`participant_mutation_id`) REFERENCES `participant_mutations` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `participant_mutation_statuses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `participant_mutation_statuses` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `code_ref` varchar(191) NOT NULL DEFAULT '',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `participant_mutation_statuses_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `participant_mutation_statuses_log` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `participant_mutation_id` int(10) unsigned NOT NULL,
  `from_status_id` int(10) unsigned DEFAULT NULL,
  `to_status_id` int(10) unsigned NOT NULL,
  `date_status` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_by_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `participant_mutation_mutation_status_log` (`participant_mutation_id`) USING BTREE,
  KEY `participant_mutation_statuses_log_from_status_id_foreign` (`from_status_id`) USING BTREE,
  KEY `participant_mutation_statuses_log_to_status_id_foreign` (`to_status_id`) USING BTREE,
  KEY `participant_mutation_statuses_log_created_by_id_foreign` (`created_by_id`) USING BTREE,
  CONSTRAINT `participant_mutation_mutation_status_log` FOREIGN KEY (`participant_mutation_id`) REFERENCES `participant_mutations` (`id`),
  CONSTRAINT `participant_mutation_statuses_log_created_by_id_foreign` FOREIGN KEY (`created_by_id`) REFERENCES `users` (`id`),
  CONSTRAINT `participant_mutation_statuses_log_from_status_id_foreign` FOREIGN KEY (`from_status_id`) REFERENCES `participant_mutation_statuses` (`id`),
  CONSTRAINT `participant_mutation_statuses_log_to_status_id_foreign` FOREIGN KEY (`to_status_id`) REFERENCES `participant_mutation_statuses` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `participant_mutation_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `participant_mutation_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `description` varchar(191) NOT NULL,
  `code_ref` varchar(191) NOT NULL DEFAULT '',
  `project_type_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `participant_mutations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `participant_mutations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `participation_id` int(10) unsigned NOT NULL,
  `entry` varchar(191) NOT NULL DEFAULT '',
  `type_id` int(10) unsigned NOT NULL,
  `status_id` int(10) unsigned DEFAULT NULL,
  `date_interest` date DEFAULT NULL,
  `date_option` date DEFAULT NULL,
  `date_granted` date DEFAULT NULL,
  `date_contract_retour` date DEFAULT NULL,
  `date_payment` date DEFAULT NULL,
  `payment_reference` varchar(191) DEFAULT NULL,
  `date_entry` date DEFAULT NULL,
  `amount` double(8,2) DEFAULT NULL,
  `amount_interest` double(8,2) DEFAULT NULL,
  `amount_option` double(8,2) DEFAULT NULL,
  `amount_granted` double(8,2) DEFAULT NULL,
  `amount_final` double(8,2) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `quantity_interest` int(11) DEFAULT NULL,
  `quantity_option` int(11) DEFAULT NULL,
  `quantity_granted` int(11) DEFAULT NULL,
  `quantity_final` int(11) DEFAULT NULL,
  `transaction_costs_amount` double DEFAULT 0,
  `participation_worth` double DEFAULT NULL,
  `returns` double DEFAULT NULL,
  `payout_kwh_price` double DEFAULT NULL,
  `payout_kwh` double DEFAULT NULL,
  `indication_of_restitution_energy_tax` double DEFAULT NULL,
  `paid_on` text DEFAULT NULL,
  `financial_overview_definitive` tinyint(1) NOT NULL DEFAULT 0,
  `created_by_id` int(10) unsigned NOT NULL,
  `updated_by_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `created_with` varchar(16) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `updated_with` varchar(16) DEFAULT NULL,
  `code` varchar(191) NOT NULL DEFAULT '',
  `register_type` varchar(16) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `participant_mutations_participation_id_foreign` (`participation_id`) USING BTREE,
  KEY `participant_mutations_type_id_foreign` (`type_id`) USING BTREE,
  KEY `participant_mutations_status_id_foreign` (`status_id`) USING BTREE,
  KEY `participant_mutations_created_by_id_foreign` (`created_by_id`) USING BTREE,
  KEY `participant_mutations_updated_by_id_foreign` (`updated_by_id`) USING BTREE,
  CONSTRAINT `participant_mutations_created_by_id_foreign` FOREIGN KEY (`created_by_id`) REFERENCES `users` (`id`),
  CONSTRAINT `participant_mutations_participation_id_foreign` FOREIGN KEY (`participation_id`) REFERENCES `participation_project` (`id`),
  CONSTRAINT `participant_mutations_status_id_foreign` FOREIGN KEY (`status_id`) REFERENCES `participant_mutation_statuses` (`id`),
  CONSTRAINT `participant_mutations_type_id_foreign` FOREIGN KEY (`type_id`) REFERENCES `participant_mutation_types` (`id`),
  CONSTRAINT `participant_mutations_updated_by_id_foreign` FOREIGN KEY (`updated_by_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `participant_project_payout_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `participant_project_payout_type` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `code_ref` varchar(191) NOT NULL DEFAULT '',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `participant_project_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `participant_project_status` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `participant_transaction_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `participant_transaction_type` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `participant_transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `participant_transactions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `participation_id` int(10) unsigned NOT NULL,
  `type_id` int(10) unsigned NOT NULL,
  `date_transaction` date NOT NULL,
  `amount` int(11) NOT NULL,
  `iban` text DEFAULT NULL,
  `referral` varchar(191) DEFAULT NULL,
  `entry` varchar(191) DEFAULT NULL,
  `date_booking` date DEFAULT NULL,
  `created_by_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `participant_transactions_participation_id_foreign` (`participation_id`) USING BTREE,
  KEY `participant_transactions_type_id_foreign` (`type_id`) USING BTREE,
  KEY `participant_transactions_created_by_id_foreign` (`created_by_id`) USING BTREE,
  CONSTRAINT `participant_transactions_created_by_id_foreign` FOREIGN KEY (`created_by_id`) REFERENCES `users` (`id`),
  CONSTRAINT `participant_transactions_participation_id_foreign` FOREIGN KEY (`participation_id`) REFERENCES `participation_project` (`id`),
  CONSTRAINT `participant_transactions_type_id_foreign` FOREIGN KEY (`type_id`) REFERENCES `participant_transaction_type` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `participation_project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `participation_project` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `contact_id` int(10) unsigned NOT NULL,
  `status_id` int(10) unsigned DEFAULT NULL,
  `project_id` int(10) unsigned NOT NULL,
  `address_id` int(10) unsigned DEFAULT NULL,
  `date_register` date DEFAULT NULL,
  `date_next_revenue_kwh` date DEFAULT NULL,
  `kwh_start_high_next_revenue` int(11) DEFAULT NULL,
  `kwh_start_low_next_revenue` int(11) DEFAULT NULL,
  `participations_requested` int(11) DEFAULT NULL,
  `participations_granted` int(11) NOT NULL DEFAULT 0,
  `participations_sold` int(11) DEFAULT NULL,
  `participations_rest_sale` int(11) DEFAULT NULL,
  `date_contract_send` date DEFAULT NULL,
  `date_contract_retour` date DEFAULT NULL,
  `date_payed` date DEFAULT NULL,
  `did_accept_agreement` tinyint(1) DEFAULT NULL,
  `date_did_accept_agreement` date DEFAULT NULL,
  `did_understand_info` tinyint(1) DEFAULT NULL,
  `date_did_understand_info` date DEFAULT NULL,
  `choice_membership` tinyint(4) DEFAULT NULL,
  `gifted_by_contact_id` int(10) unsigned DEFAULT NULL,
  `iban_payout` text DEFAULT NULL,
  `legal_rep_contact_id` int(10) unsigned DEFAULT NULL,
  `iban_payout_attn` varchar(191) DEFAULT NULL,
  `date_end` date DEFAULT NULL,
  `type_id` int(10) unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `created_with` varchar(16) DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `updated_with` varchar(16) DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  `power_kwh_consumption` int(11) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `date_terminated` date DEFAULT NULL,
  `participations_definitive` int(11) NOT NULL DEFAULT 0,
  `participations_definitive_worth` double NOT NULL DEFAULT 0,
  `participations_capital_worth` double DEFAULT NULL,
  `participations_optioned` int(11) NOT NULL DEFAULT 0,
  `participations_interessed` int(11) NOT NULL DEFAULT 0,
  `amount_definitive` double(11,2) DEFAULT NULL,
  `amount_granted` double DEFAULT 0,
  `amount_optioned` double(11,2) DEFAULT NULL,
  `amount_interessed` double DEFAULT 0,
  `conversion_processed` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `participation_project_project_id_foreign` (`project_id`) USING BTREE,
  KEY `participation_project_contact_id_foreign` (`contact_id`) USING BTREE,
  KEY `participation_project_gifted_by_contact_id_foreign` (`gifted_by_contact_id`) USING BTREE,
  KEY `participation_project_legal_rep_contact_id_foreign` (`legal_rep_contact_id`) USING BTREE,
  KEY `participation_project_status_id_foreign` (`status_id`) USING BTREE,
  KEY `participation_project_type_id_foreign` (`type_id`) USING BTREE,
  KEY `participation_project_created_by_id_foreign` (`created_by_id`) USING BTREE,
  KEY `participation_project_updated_by_id_foreign` (`updated_by_id`) USING BTREE,
  KEY `participation_project_address_id_foreign` (`address_id`) USING BTREE,
  CONSTRAINT `participation_project_address_id_foreign` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`id`),
  CONSTRAINT `participation_project_contact_id_foreign` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`id`),
  CONSTRAINT `participation_project_created_by_id_foreign` FOREIGN KEY (`created_by_id`) REFERENCES `users` (`id`),
  CONSTRAINT `participation_project_gifted_by_contact_id_foreign` FOREIGN KEY (`gifted_by_contact_id`) REFERENCES `contacts` (`id`),
  CONSTRAINT `participation_project_legal_rep_contact_id_foreign` FOREIGN KEY (`legal_rep_contact_id`) REFERENCES `contacts` (`id`),
  CONSTRAINT `participation_project_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`),
  CONSTRAINT `participation_project_status_id_foreign` FOREIGN KEY (`status_id`) REFERENCES `participant_project_status` (`id`),
  CONSTRAINT `participation_project_updated_by_id_foreign` FOREIGN KEY (`updated_by_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_resets` (
  `email` varchar(191) NOT NULL,
  `token` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `payment_invoices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment_invoices` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `invoice_number` int(11) NOT NULL,
  `number` varchar(191) NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  `revenue_distribution_id` int(10) unsigned NOT NULL,
  `administration_id` int(10) unsigned NOT NULL,
  `status_id` varchar(191) NOT NULL,
  `date_paid` date DEFAULT NULL,
  `created_by_id` int(10) unsigned NOT NULL,
  `sepa_id` int(10) unsigned DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `payment_invoices_revenue_distribution_id_foreign` (`revenue_distribution_id`) USING BTREE,
  KEY `payment_invoices_administration_id_foreign` (`administration_id`) USING BTREE,
  KEY `payment_invoices_created_by_id_foreign` (`created_by_id`) USING BTREE,
  KEY `payment_invoices_sepa_id_foreign` (`sepa_id`) USING BTREE,
  CONSTRAINT `payment_invoices_administration_id_foreign` FOREIGN KEY (`administration_id`) REFERENCES `administrations` (`id`),
  CONSTRAINT `payment_invoices_created_by_id_foreign` FOREIGN KEY (`created_by_id`) REFERENCES `users` (`id`),
  CONSTRAINT `payment_invoices_revenue_distribution_id_foreign` FOREIGN KEY (`revenue_distribution_id`) REFERENCES `project_revenue_distribution` (`id`),
  CONSTRAINT `payment_invoices_sepa_id_foreign` FOREIGN KEY (`sepa_id`) REFERENCES `sepas` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `people`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `people` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `contact_id` int(10) unsigned NOT NULL,
  `initials` varchar(191) DEFAULT NULL,
  `first_name` varchar(191) NOT NULL DEFAULT '',
  `last_name` varchar(191) NOT NULL DEFAULT '',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `last_name_prefix` varchar(155) DEFAULT NULL,
  `title_id` int(10) unsigned DEFAULT NULL,
  `organisation_id` int(10) unsigned DEFAULT NULL,
  `type_id` int(10) unsigned DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `first_name_partner` varchar(191) NOT NULL DEFAULT '',
  `last_name_partner` varchar(191) NOT NULL DEFAULT '',
  `date_of_birth_partner` date DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `people_contact_id_foreign` (`contact_id`) USING BTREE,
  KEY `people_last_name_prefix_id_foreign` (`last_name_prefix`) USING BTREE,
  KEY `people_title_id_foreign` (`title_id`) USING BTREE,
  KEY `people_organisation_id_foreign` (`organisation_id`) USING BTREE,
  KEY `people_type_id_foreign` (`type_id`) USING BTREE,
  CONSTRAINT `people_contact_id_foreign` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`id`),
  CONSTRAINT `people_organisation_id_foreign` FOREIGN KEY (`organisation_id`) REFERENCES `organisations` (`id`),
  CONSTRAINT `people_title_id_foreign` FOREIGN KEY (`title_id`) REFERENCES `titles` (`id`),
  CONSTRAINT `people_type_id_foreign` FOREIGN KEY (`type_id`) REFERENCES `person_types` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `permissions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `guard_name` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `person_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `person_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL DEFAULT '',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `phone_numbers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `phone_numbers` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `contact_id` int(10) unsigned NOT NULL,
  `type_id` varchar(16) DEFAULT NULL,
  `number` varchar(191) NOT NULL DEFAULT '',
  `primary` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `phone_numbers_contact_id_foreign` (`contact_id`) USING BTREE,
  CONSTRAINT `phone_numbers_contact_id_foreign` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `portal_free_fields_fields`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `portal_free_fields_fields` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `page_id` int(10) unsigned NOT NULL,
  `field_id` int(10) unsigned NOT NULL,
  `change_portal` tinyint(1) NOT NULL,
  `sort_order` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `portal_free_fields_fields_page_id_foreign` (`page_id`) USING BTREE,
  KEY `portal_free_fields_fields_field_id_foreign` (`field_id`) USING BTREE,
  CONSTRAINT `portal_free_fields_fields_field_id_foreign` FOREIGN KEY (`field_id`) REFERENCES `free_fields_fields` (`id`),
  CONSTRAINT `portal_free_fields_fields_page_id_foreign` FOREIGN KEY (`page_id`) REFERENCES `portal_free_fields_pages` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `portal_free_fields_pages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `portal_free_fields_pages` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 0,
  `description` text DEFAULT NULL,
  `url_page_ref` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `portal_password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `portal_password_resets` (
  `email` varchar(191) NOT NULL,
  `token` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `portal_password_resets_email_index` (`email`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `portal_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `portal_settings` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `portal_active` tinyint(1) NOT NULL,
  `portal_name` varchar(191) DEFAULT NULL,
  `cooperative_name` varchar(191) DEFAULT NULL,
  `portal_login_info_text` varchar(191) DEFAULT NULL,
  `portal_website` varchar(191) DEFAULT NULL,
  `portal_url` varchar(191) DEFAULT NULL,
  `responsible_user_id` int(10) unsigned DEFAULT NULL,
  `contact_responsible_owner_user_id` int(10) unsigned DEFAULT NULL,
  `check_contact_task_responsible_user_id` int(10) unsigned DEFAULT NULL,
  `check_contact_task_responsible_team_id` int(10) unsigned DEFAULT NULL,
  `email_template_new_account_id` int(10) unsigned DEFAULT NULL,
  `link_privacy_policy` varchar(191) DEFAULT NULL,
  `show_new_at_cooperative_link` tinyint(1) DEFAULT NULL,
  `new_at_cooperative_link_text` varchar(191) DEFAULT NULL,
  `show_allow_request_for_delete` tinyint(1) DEFAULT NULL,
  `allow_request_for_delete_button_text` varchar(191) DEFAULT NULL,
  `pcr_power_kwh_consumption_percentage` double DEFAULT NULL,
  `pcr_generating_capacity_one_solor_panel` double DEFAULT NULL,
  `default_contact_group_member_id` int(10) unsigned DEFAULT NULL,
  `default_contact_group_no_member_id` int(10) unsigned DEFAULT NULL,
  `default_administration_id` int(10) unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `portal_settings_responsible_user_id_foreign` (`responsible_user_id`) USING BTREE,
  KEY `portal_settings_contact_responsible_owner_user_id_foreign` (`contact_responsible_owner_user_id`) USING BTREE,
  KEY `portal_settings_check_contact_task_responsible_user_id_foreign` (`check_contact_task_responsible_user_id`) USING BTREE,
  KEY `portal_settings_check_contact_task_responsible_team_id_foreign` (`check_contact_task_responsible_team_id`) USING BTREE,
  KEY `portal_settings_email_template_new_account_id_foreign` (`email_template_new_account_id`) USING BTREE,
  KEY `portal_settings_default_contact_group_member_id_foreign` (`default_contact_group_member_id`) USING BTREE,
  KEY `portal_settings_default_contact_group_no_member_id_foreign` (`default_contact_group_no_member_id`) USING BTREE,
  KEY `portal_settings_default_administration_id_foreign` (`default_administration_id`) USING BTREE,
  CONSTRAINT `portal_settings_check_contact_task_responsible_team_id_foreign` FOREIGN KEY (`check_contact_task_responsible_team_id`) REFERENCES `teams` (`id`),
  CONSTRAINT `portal_settings_check_contact_task_responsible_user_id_foreign` FOREIGN KEY (`check_contact_task_responsible_user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `portal_settings_contact_responsible_owner_user_id_foreign` FOREIGN KEY (`contact_responsible_owner_user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `portal_settings_default_administration_id_foreign` FOREIGN KEY (`default_administration_id`) REFERENCES `administrations` (`id`),
  CONSTRAINT `portal_settings_default_contact_group_member_id_foreign` FOREIGN KEY (`default_contact_group_member_id`) REFERENCES `contact_groups` (`id`),
  CONSTRAINT `portal_settings_default_contact_group_no_member_id_foreign` FOREIGN KEY (`default_contact_group_no_member_id`) REFERENCES `contact_groups` (`id`),
  CONSTRAINT `portal_settings_email_template_new_account_id_foreign` FOREIGN KEY (`email_template_new_account_id`) REFERENCES `email_templates` (`id`),
  CONSTRAINT `portal_settings_responsible_user_id_foreign` FOREIGN KEY (`responsible_user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `portal_settings_dashboard_widgets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `portal_settings_dashboard_widgets` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `portal_settings_dashboard_id` int(10) unsigned DEFAULT NULL,
  `code_ref` varchar(191) NOT NULL,
  `order` int(11) DEFAULT NULL,
  `title` varchar(191) NOT NULL,
  `text` text NOT NULL,
  `button_text` text NOT NULL,
  `button_link` text NOT NULL,
  `widget_image_file_name` varchar(191) NOT NULL DEFAULT '',
  `show_group_id` int(10) unsigned DEFAULT NULL,
  `background_color` varchar(30) NOT NULL DEFAULT '',
  `text_color` varchar(30) NOT NULL DEFAULT '',
  `active` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `hide_group_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `portal_sd_portal_sd_id_foreign` (`portal_settings_dashboard_id`) USING BTREE,
  KEY `contact_groups_show_group_id_foreign` (`show_group_id`) USING BTREE,
  KEY `contact_groups_hide_group_id_foreign` (`hide_group_id`) USING BTREE,
  CONSTRAINT `contact_groups_hide_group_id_foreign` FOREIGN KEY (`hide_group_id`) REFERENCES `contact_groups` (`id`),
  CONSTRAINT `contact_groups_show_group_id_foreign` FOREIGN KEY (`show_group_id`) REFERENCES `contact_groups` (`id`),
  CONSTRAINT `portal_sd_portal_sd_id_foreign` FOREIGN KEY (`portal_settings_dashboard_id`) REFERENCES `portal_settings_dashboards` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `portal_settings_dashboards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `portal_settings_dashboards` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `welcome_title` varchar(191) NOT NULL,
  `welcome_message` text NOT NULL,
  `default_widget_background_color` varchar(30) NOT NULL DEFAULT '#ffffff',
  `default_widget_text_color` varchar(30) NOT NULL DEFAULT '#000000',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `portal_settings_layouts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `portal_settings_layouts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `description` varchar(191) NOT NULL,
  `is_default` tinyint(1) NOT NULL DEFAULT 0,
  `portal_logo_file_name` varchar(191) NOT NULL,
  `portal_logo_file_name_header` varchar(191) NOT NULL,
  `portal_image_bg_file_name_login` varchar(191) NOT NULL,
  `use_transparent_background_login` tinyint(1) NOT NULL DEFAULT 0,
  `portal_image_bg_file_name_header` varchar(191) NOT NULL,
  `use_transparent_background_header` tinyint(1) NOT NULL DEFAULT 0,
  `portal_favicon_file_name` varchar(191) NOT NULL,
  `portal_background_color` varchar(30) NOT NULL,
  `portal_background_text_color` varchar(30) NOT NULL,
  `login_header_background_color` varchar(30) NOT NULL,
  `login_header_background_text_color` varchar(30) NOT NULL,
  `header_icons_color` varchar(30) NOT NULL,
  `login_field_background_color` varchar(30) NOT NULL,
  `login_field_background_text_color` varchar(30) NOT NULL,
  `button_color` varchar(30) NOT NULL,
  `button_text_color` varchar(30) NOT NULL,
  `portal_main_background_color` varchar(30) NOT NULL DEFAULT '#f5f5f5',
  `portal_main_text_color` varchar(30) NOT NULL DEFAULT '#000000',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `portal_two_factor_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `portal_two_factor_tokens` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `portal_user_id` int(10) unsigned NOT NULL,
  `token` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `portal_two_factor_tokens_portal_user_id_foreign` (`portal_user_id`) USING BTREE,
  CONSTRAINT `portal_two_factor_tokens_portal_user_id_foreign` FOREIGN KEY (`portal_user_id`) REFERENCES `portal_users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `portal_user_login_attempts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `portal_user_login_attempts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `portal_user_id` int(10) unsigned DEFAULT NULL,
  `identifier` varchar(191) DEFAULT NULL,
  `ip` varchar(45) DEFAULT NULL,
  `user_agent` varchar(512) DEFAULT NULL,
  `succeeded` tinyint(1) NOT NULL DEFAULT 0,
  `result` varchar(191) DEFAULT NULL,
  `failed_logins_after` int(10) unsigned DEFAULT NULL,
  `blocked_until` timestamp NULL DEFAULT NULL,
  `blocked_permanent` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `portal_user_login_attempts_portal_user_id_foreign` (`portal_user_id`) USING BTREE,
  KEY `portal_user_login_attempts_identifier_created_at_index` (`identifier`,`created_at`) USING BTREE,
  KEY `portal_user_login_attempts_ip_index` (`ip`) USING BTREE,
  CONSTRAINT `portal_user_login_attempts_portal_user_id_foreign` FOREIGN KEY (`portal_user_id`) REFERENCES `portal_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `portal_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `portal_users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `contact_id` int(10) unsigned NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `two_factor_secret` text DEFAULT NULL,
  `two_factor_recovery_codes` text DEFAULT NULL,
  `two_factor_confirmed_at` timestamp NULL DEFAULT NULL,
  `failed_logins` int(10) unsigned NOT NULL DEFAULT 0,
  `blocked_until` timestamp NULL DEFAULT NULL,
  `blocked_permanent` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `portal_users_email_unique` (`email`) USING BTREE,
  KEY `portal_users_contact_id_foreign` (`contact_id`) USING BTREE,
  CONSTRAINT `portal_users_contact_id_foreign` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `postalcode_links`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `postalcode_links` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `postalcode_main` int(11) NOT NULL,
  `postalcode_link` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `price_history_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `price_history_product` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` int(10) unsigned NOT NULL,
  `date_start` date NOT NULL,
  `input_incl_vat` tinyint(1) NOT NULL DEFAULT 0,
  `price_number_of_decimals` tinyint(4) NOT NULL DEFAULT 2,
  `price` double DEFAULT NULL,
  `price_incl_vat` double DEFAULT NULL,
  `vat_percentage` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `has_variable_price` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `price_history_product_product_id_foreign` (`product_id`) USING BTREE,
  CONSTRAINT `price_history_product_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `invoice_text` text DEFAULT NULL,
  `duration_id` varchar(191) NOT NULL,
  `invoice_frequency_id` varchar(191) NOT NULL,
  `payment_type_id` varchar(191) DEFAULT NULL,
  `administration_id` int(10) unsigned NOT NULL,
  `created_by_id` int(10) unsigned NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `is_one_time` tinyint(1) NOT NULL DEFAULT 0,
  `ledger_id` int(10) unsigned DEFAULT NULL,
  `cost_center_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `products_administration_id_foreign` (`administration_id`) USING BTREE,
  KEY `products_created_by_id_foreign` (`created_by_id`) USING BTREE,
  KEY `products_ledger_id_foreign` (`ledger_id`) USING BTREE,
  KEY `products_cost_center_id_foreign` (`cost_center_id`) USING BTREE,
  CONSTRAINT `products_administration_id_foreign` FOREIGN KEY (`administration_id`) REFERENCES `administrations` (`id`),
  CONSTRAINT `products_cost_center_id_foreign` FOREIGN KEY (`cost_center_id`) REFERENCES `cost_centers` (`id`),
  CONSTRAINT `products_created_by_id_foreign` FOREIGN KEY (`created_by_id`) REFERENCES `users` (`id`),
  CONSTRAINT `products_ledger_id_foreign` FOREIGN KEY (`ledger_id`) REFERENCES `ledgers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `project_loan_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_loan_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `code_ref` varchar(191) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `project_revenue_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_revenue_category` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `code_ref` varchar(191) NOT NULL DEFAULT '',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `project_revenue_distribution`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_revenue_distribution` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `revenue_id` int(10) unsigned NOT NULL,
  `contact_id` int(10) unsigned NOT NULL,
  `street` varchar(191) DEFAULT NULL,
  `street_number` int(11) DEFAULT NULL,
  `street_number_addition` varchar(191) DEFAULT NULL,
  `address` varchar(191) DEFAULT NULL,
  `postal_code` varchar(191) DEFAULT NULL,
  `city` varchar(191) DEFAULT NULL,
  `country` varchar(191) DEFAULT NULL,
  `status` varchar(191) DEFAULT NULL,
  `participations_amount` int(11) DEFAULT NULL,
  `participations_amount_end_calendar_year` int(11) DEFAULT NULL,
  `participations_loan_amount` double DEFAULT NULL,
  `payout` double DEFAULT NULL,
  `payout_type` varchar(191) DEFAULT NULL,
  `payout_type_id` int(11) DEFAULT NULL,
  `date_payout` date DEFAULT NULL,
  `energy_supplier_name` varchar(191) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `delivered_total` double DEFAULT NULL,
  `delivered_total_last_es` double DEFAULT NULL,
  `date_begin_last_es` date DEFAULT NULL,
  `delivered_total_end_calendar_year` double DEFAULT NULL,
  `delivered_total_last_es_end_calendar_year` double DEFAULT NULL,
  `es_id` int(10) unsigned DEFAULT NULL,
  `participation_id` int(10) unsigned DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `energy_supplier_ean_electricity` varchar(191) DEFAULT NULL,
  `energy_supplier_number` varchar(191) DEFAULT NULL,
  `payout_kwh` double DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `project_revenue_distribution_contact_id_foreign` (`contact_id`) USING BTREE,
  KEY `project_revenue_distribution_es_id_foreign` (`es_id`) USING BTREE,
  KEY `project_revenue_distribution_participation_id_foreign` (`participation_id`) USING BTREE,
  KEY `project_revenue_distribution_revenue_id_foreign` (`revenue_id`) USING BTREE,
  CONSTRAINT `project_revenue_distribution_contact_id_foreign` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`id`),
  CONSTRAINT `project_revenue_distribution_es_id_foreign` FOREIGN KEY (`es_id`) REFERENCES `energy_suppliers` (`id`),
  CONSTRAINT `project_revenue_distribution_participation_id_foreign` FOREIGN KEY (`participation_id`) REFERENCES `participation_project` (`id`),
  CONSTRAINT `project_revenue_distribution_revenue_id_foreign` FOREIGN KEY (`revenue_id`) REFERENCES `project_revenues` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `project_revenue_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_revenue_type` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `project_revenues`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_revenues` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `category_id` int(10) unsigned NOT NULL,
  `project_id` int(10) unsigned NOT NULL,
  `participation_id` int(10) unsigned DEFAULT NULL,
  `address_energy_supplier_id` int(10) unsigned DEFAULT NULL,
  `xxx_contact_energy_supplier_id` int(10) unsigned DEFAULT NULL,
  `distribution_type_id` varchar(191) DEFAULT NULL,
  `confirmed` tinyint(1) NOT NULL DEFAULT 0,
  `status` varchar(191) DEFAULT NULL,
  `date_begin` date DEFAULT NULL,
  `date_end` date DEFAULT NULL,
  `date_reference` date NOT NULL,
  `date_confirmed` date DEFAULT NULL,
  `kwh_start` int(11) DEFAULT NULL,
  `kwh_end` int(11) DEFAULT NULL,
  `kwh_start_high` int(11) DEFAULT NULL,
  `kwh_end_calendar_year_high` int(11) DEFAULT NULL,
  `kwh_end_high` int(11) DEFAULT NULL,
  `kwh_start_low` int(11) DEFAULT NULL,
  `kwh_end_calendar_year_low` int(11) DEFAULT NULL,
  `kwh_end_low` int(11) DEFAULT NULL,
  `revenue` double(10,2) DEFAULT NULL,
  `date_payed` date DEFAULT NULL,
  `pay_percentage` double(5,2) DEFAULT NULL,
  `pay_amount` double DEFAULT NULL,
  `key_amount_first_percentage` double DEFAULT NULL,
  `pay_percentage_valid_from_key_amount` double DEFAULT NULL,
  `type_id` int(10) unsigned DEFAULT NULL,
  `created_by_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `payout_kwh` double DEFAULT NULL,
  `payout_type_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `project_revenues_project_id_foreign` (`project_id`) USING BTREE,
  KEY `project_revenues_category_id_foreign` (`category_id`) USING BTREE,
  KEY `project_revenues_created_by_id_foreign` (`created_by_id`) USING BTREE,
  KEY `project_revenues_type_id_foreign` (`type_id`) USING BTREE,
  KEY `project_revenues_participation_id_foreign` (`participation_id`) USING BTREE,
  KEY `project_revenues_address_energy_supplier_id_foreign` (`address_energy_supplier_id`) USING BTREE,
  CONSTRAINT `project_revenues_address_energy_supplier_id_foreign` FOREIGN KEY (`address_energy_supplier_id`) REFERENCES `address_energy_suppliers` (`id`),
  CONSTRAINT `project_revenues_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `project_revenue_category` (`id`),
  CONSTRAINT `project_revenues_created_by_id_foreign` FOREIGN KEY (`created_by_id`) REFERENCES `users` (`id`),
  CONSTRAINT `project_revenues_participation_id_foreign` FOREIGN KEY (`participation_id`) REFERENCES `participation_project` (`id`),
  CONSTRAINT `project_revenues_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`),
  CONSTRAINT `project_revenues_type_id_foreign` FOREIGN KEY (`type_id`) REFERENCES `project_revenue_type` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `project_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_status` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `code_ref` varchar(191) NOT NULL DEFAULT '',
  `order` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `project_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_type` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `code_ref` varchar(191) NOT NULL DEFAULT '',
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `project_value_course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_value_course` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `project_id` int(10) unsigned NOT NULL,
  `date` date NOT NULL,
  `book_worth` double NOT NULL,
  `transfer_worth` double NOT NULL DEFAULT 0,
  `active` tinyint(1) NOT NULL DEFAULT 0,
  `created_by_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `project_value_course_project_id_foreign` (`project_id`) USING BTREE,
  KEY `project_value_course_created_by_id_foreign` (`created_by_id`) USING BTREE,
  CONSTRAINT `project_value_course_created_by_id_foreign` FOREIGN KEY (`created_by_id`) REFERENCES `users` (`id`),
  CONSTRAINT `project_value_course_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `code` varchar(191) NOT NULL,
  `description` varchar(2500) DEFAULT NULL,
  `owned_by_id` int(10) unsigned NOT NULL,
  `project_status_id` int(10) unsigned DEFAULT NULL,
  `date_start` date DEFAULT NULL,
  `date_end` date DEFAULT NULL,
  `date_production` date DEFAULT NULL,
  `date_start_registrations` date DEFAULT NULL,
  `date_end_registrations` date DEFAULT NULL,
  `date_entry` date DEFAULT NULL,
  `date_interest_bearing` date DEFAULT NULL,
  `date_interest_bearing_redemption` date DEFAULT NULL,
  `date_interest_bearing_kwh` date DEFAULT NULL,
  `kwh_start_high_next_revenue` int(11) DEFAULT NULL,
  `kwh_start_low_next_revenue` int(11) DEFAULT NULL,
  `project_type_id` int(10) unsigned DEFAULT NULL,
  `is_sce_project` tinyint(1) NOT NULL DEFAULT 0,
  `base_project_code_ref` varchar(16) DEFAULT NULL,
  `check_double_addresses` tinyint(1) NOT NULL DEFAULT 0,
  `subsidy_provided` tinyint(1) NOT NULL DEFAULT 0,
  `check_postalcode_link` tinyint(1) NOT NULL DEFAULT 0,
  `hide_when_not_matching_postal_check` tinyint(1) NOT NULL DEFAULT 0,
  `disable_change_contact_name_on_portal` tinyint(1) NOT NULL DEFAULT 0,
  `postal_code` varchar(191) DEFAULT NULL,
  `address` varchar(191) DEFAULT NULL,
  `city` varchar(191) DEFAULT NULL,
  `ean` varchar(191) DEFAULT NULL,
  `ean_manager` varchar(191) DEFAULT NULL,
  `warranty_origin` varchar(191) DEFAULT NULL,
  `ean_supply` varchar(191) DEFAULT NULL,
  `participation_worth` double NOT NULL DEFAULT 0,
  `power_kw_available` int(11) DEFAULT NULL,
  `max_participations` int(11) DEFAULT NULL,
  `tax_referral` varchar(191) DEFAULT NULL,
  `total_participations` int(11) DEFAULT NULL,
  `min_participations` int(11) DEFAULT NULL,
  `is_membership_required` tinyint(1) NOT NULL DEFAULT 0,
  `visible_for_all_contacts` tinyint(1) NOT NULL DEFAULT 0,
  `text_info_project_only_members` varchar(191) NOT NULL DEFAULT 'Om in te schrijven voor dit project moet u eerst lid worden van onze coöperatie.',
  `is_participation_transferable` tinyint(1) NOT NULL DEFAULT 0,
  `loan_type_id` int(10) unsigned DEFAULT NULL,
  `amount_of_loan_needed` double DEFAULT NULL,
  `min_amount_loan` double DEFAULT NULL,
  `max_amount_loan` double DEFAULT NULL,
  `created_by_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `administration_id` int(10) unsigned DEFAULT NULL,
  `postalcode_link` varchar(300) DEFAULT NULL,
  `address_number_series` varchar(191) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `participations_definitive` int(11) NOT NULL DEFAULT 0,
  `participations_granted` int(11) NOT NULL DEFAULT 0,
  `participations_optioned` int(11) NOT NULL DEFAULT 0,
  `participations_interessed` int(11) NOT NULL DEFAULT 0,
  `amount_definitive` double(11,2) DEFAULT NULL,
  `amount_granted` double DEFAULT 0,
  `amount_optioned` double(11,2) DEFAULT NULL,
  `amount_interessed` double DEFAULT 0,
  `link_agree_terms` varchar(191) NOT NULL DEFAULT '',
  `link_understand_info` varchar(191) NOT NULL DEFAULT '',
  `email_template_agreement_id` int(10) unsigned DEFAULT NULL,
  `document_template_agreement_id` int(10) unsigned DEFAULT NULL,
  `text_register_page_header` varchar(191) NOT NULL DEFAULT '',
  `text_register_current_book_worth` varchar(191) NOT NULL DEFAULT '',
  `text_register_participation_singular` varchar(191) NOT NULL DEFAULT '',
  `text_register_participation_plural` varchar(191) NOT NULL DEFAULT '',
  `allow_increase_participations_in_portal` tinyint(1) NOT NULL DEFAULT 0,
  `email_template_increase_participations_id` int(10) unsigned DEFAULT NULL,
  `document_template_increase_participations_id` int(10) unsigned DEFAULT NULL,
  `show_question_about_membership` tinyint(1) NOT NULL,
  `question_about_membership_group_id` int(10) unsigned DEFAULT NULL,
  `text_is_member` varchar(191) NOT NULL DEFAULT '',
  `text_is_no_member` varchar(191) NOT NULL DEFAULT '',
  `text_become_member` varchar(191) NOT NULL DEFAULT '',
  `member_group_id` int(10) unsigned DEFAULT NULL,
  `text_become_no_member` varchar(191) NOT NULL DEFAULT '',
  `no_member_group_id` int(10) unsigned DEFAULT NULL,
  `text_agree_terms` varchar(2500) NOT NULL DEFAULT '',
  `text_link_agree_terms` varchar(191) NOT NULL DEFAULT '',
  `text_link_name_agree_terms` varchar(191) NOT NULL DEFAULT '',
  `text_link_understand_info` varchar(191) NOT NULL DEFAULT '',
  `text_link_name_understand_info` varchar(191) NOT NULL DEFAULT '',
  `text_accept_agreement` varchar(2500) NOT NULL DEFAULT '',
  `text_accept_agreement_question` varchar(191) NOT NULL DEFAULT '',
  `link_project_info` varchar(191) NOT NULL DEFAULT '',
  `text_transaction_costs` varchar(191) NOT NULL DEFAULT 'Transactiekosten',
  `use_transaction_costs_with_membership` tinyint(1) NOT NULL DEFAULT 0,
  `transaction_costs_code_ref` varchar(16) DEFAULT 'none',
  `transaction_costs_amount_min` double DEFAULT NULL,
  `transaction_costs_amount_max` double DEFAULT NULL,
  `transaction_costs_amount` double DEFAULT NULL,
  `transaction_costs_percentage` double DEFAULT NULL,
  `transaction_costs_amount_2` double DEFAULT NULL,
  `transaction_costs_percentage_2` double DEFAULT NULL,
  `transaction_costs_amount_3` double DEFAULT NULL,
  `transaction_costs_percentage_3` double DEFAULT NULL,
  `uses_mollie` tinyint(1) NOT NULL DEFAULT 0,
  `text_registration_finished` varchar(2500) NOT NULL DEFAULT 'Bedankt voor je inschrijving. Per e-mail sturen wij een bevestiging van je inschrijving met informatie over de vervolgstappen.\n\n\r\nHet kan zijn dat de mail door een spamfilter is geblokkeerd. Spamfilters van bijvoorbeeld Gmail en Hotmail staan erg "scherp". Kijk even bij de Spam/Reclame of je onze mail daar terug vindt.\n\n\r\nOnder de menuknop “Huidige deelnames” vind je je inschrijving terug.\n\n\r\nWil je je inschrijving aanpassen? Neem dan contact met ons op.',
  `document_id_project_info` int(10) unsigned DEFAULT NULL,
  `document_id_agree_terms` int(10) unsigned DEFAULT NULL,
  `document_id_understand_info` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `projects_project_status_id_foreign` (`project_status_id`) USING BTREE,
  KEY `projects_project_type_id_foreign` (`project_type_id`) USING BTREE,
  KEY `projects_administration_id_foreign` (`administration_id`) USING BTREE,
  KEY `projects_created_by_id_foreign` (`created_by_id`) USING BTREE,
  KEY `projects_owned_by_id_foreign` (`owned_by_id`) USING BTREE,
  KEY `projects_updated_by_id_foreign` (`updated_by_id`) USING BTREE,
  KEY `projects_email_template_agreement_id_foreign` (`email_template_agreement_id`) USING BTREE,
  KEY `projects_document_template_agreement_id_foreign` (`document_template_agreement_id`) USING BTREE,
  KEY `projects_question_about_membership_group_id_foreign` (`question_about_membership_group_id`) USING BTREE,
  KEY `projects_member_group_id_foreign` (`member_group_id`) USING BTREE,
  KEY `projects_no_member_group_id_foreign` (`no_member_group_id`) USING BTREE,
  KEY `projects_document_id_project_info_foreign` (`document_id_project_info`) USING BTREE,
  KEY `projects_document_id_agree_terms_foreign` (`document_id_agree_terms`) USING BTREE,
  KEY `projects_document_id_understand_info_foreign` (`document_id_understand_info`) USING BTREE,
  KEY `projects_loan_type_id_foreign` (`loan_type_id`) USING BTREE,
  KEY `projects_email_template_increase_participations_id_foreign` (`email_template_increase_participations_id`) USING BTREE,
  KEY `projects_document_template_increase_participations_id_foreign` (`document_template_increase_participations_id`) USING BTREE,
  CONSTRAINT `projects_administration_id_foreign` FOREIGN KEY (`administration_id`) REFERENCES `administrations` (`id`),
  CONSTRAINT `projects_created_by_id_foreign` FOREIGN KEY (`created_by_id`) REFERENCES `users` (`id`),
  CONSTRAINT `projects_document_id_agree_terms_foreign` FOREIGN KEY (`document_id_agree_terms`) REFERENCES `documents` (`id`),
  CONSTRAINT `projects_document_id_project_info_foreign` FOREIGN KEY (`document_id_project_info`) REFERENCES `documents` (`id`),
  CONSTRAINT `projects_document_id_understand_info_foreign` FOREIGN KEY (`document_id_understand_info`) REFERENCES `documents` (`id`),
  CONSTRAINT `projects_document_template_agreement_id_foreign` FOREIGN KEY (`document_template_agreement_id`) REFERENCES `document_templates` (`id`),
  CONSTRAINT `projects_document_template_increase_participations_id_foreign` FOREIGN KEY (`document_template_increase_participations_id`) REFERENCES `document_templates` (`id`),
  CONSTRAINT `projects_email_template_agreement_id_foreign` FOREIGN KEY (`email_template_agreement_id`) REFERENCES `email_templates` (`id`),
  CONSTRAINT `projects_email_template_increase_participations_id_foreign` FOREIGN KEY (`email_template_increase_participations_id`) REFERENCES `email_templates` (`id`),
  CONSTRAINT `projects_loan_type_id_foreign` FOREIGN KEY (`loan_type_id`) REFERENCES `project_loan_types` (`id`),
  CONSTRAINT `projects_member_group_id_foreign` FOREIGN KEY (`member_group_id`) REFERENCES `contact_groups` (`id`),
  CONSTRAINT `projects_no_member_group_id_foreign` FOREIGN KEY (`no_member_group_id`) REFERENCES `contact_groups` (`id`),
  CONSTRAINT `projects_owned_by_id_foreign` FOREIGN KEY (`owned_by_id`) REFERENCES `users` (`id`),
  CONSTRAINT `projects_project_status_id_foreign` FOREIGN KEY (`project_status_id`) REFERENCES `project_status` (`id`),
  CONSTRAINT `projects_project_type_id_foreign` FOREIGN KEY (`project_type_id`) REFERENCES `project_type` (`id`),
  CONSTRAINT `projects_question_about_membership_group_id_foreign` FOREIGN KEY (`question_about_membership_group_id`) REFERENCES `contact_groups` (`id`),
  CONSTRAINT `projects_updated_by_id_foreign` FOREIGN KEY (`updated_by_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `quotation_request_actions_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `quotation_request_actions_log` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `quotation_request_id` int(10) unsigned DEFAULT NULL,
  `contact_id` int(10) unsigned DEFAULT NULL,
  `user_id` int(10) unsigned DEFAULT NULL,
  `updated_with` varchar(16) DEFAULT NULL,
  `old_status_id` int(10) unsigned DEFAULT NULL,
  `new_status_id` int(10) unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `quotation_request_actions_log_quotation_request_id_foreign` (`quotation_request_id`) USING BTREE,
  KEY `quotation_request_actions_log_contact_id_foreign` (`contact_id`) USING BTREE,
  KEY `quotation_request_actions_log_user_id_foreign` (`user_id`) USING BTREE,
  KEY `quotation_request_actions_log_old_status_id_foreign` (`old_status_id`) USING BTREE,
  KEY `quotation_request_actions_log_new_status_id_foreign` (`new_status_id`) USING BTREE,
  CONSTRAINT `quotation_request_actions_log_contact_id_foreign` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`id`),
  CONSTRAINT `quotation_request_actions_log_new_status_id_foreign` FOREIGN KEY (`new_status_id`) REFERENCES `quotation_request_status` (`id`),
  CONSTRAINT `quotation_request_actions_log_old_status_id_foreign` FOREIGN KEY (`old_status_id`) REFERENCES `quotation_request_status` (`id`),
  CONSTRAINT `quotation_request_actions_log_quotation_request_id_foreign` FOREIGN KEY (`quotation_request_id`) REFERENCES `quotation_requests` (`id`),
  CONSTRAINT `quotation_request_actions_log_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `quotation_request_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `quotation_request_status` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `code_ref` varchar(191) NOT NULL DEFAULT '',
  `opportunity_action_id` int(10) unsigned DEFAULT NULL,
  `uses_wf` tinyint(1) NOT NULL DEFAULT 0,
  `email_template_id_wf` int(10) unsigned DEFAULT NULL,
  `mail_cc_to_coach_wf` tinyint(1) NOT NULL DEFAULT 0,
  `number_of_days_to_send_email` int(11) NOT NULL DEFAULT 0,
  `send_email_reminder` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `order` int(11) DEFAULT NULL,
  `is_pending_status` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `quotation_request_status_email_template_id_wf_foreign` (`email_template_id_wf`) USING BTREE,
  KEY `quotation_request_status_opportunity_action_id_foreign` (`opportunity_action_id`) USING BTREE,
  CONSTRAINT `quotation_request_status_email_template_id_wf_foreign` FOREIGN KEY (`email_template_id_wf`) REFERENCES `email_templates` (`id`),
  CONSTRAINT `quotation_request_status_opportunity_action_id_foreign` FOREIGN KEY (`opportunity_action_id`) REFERENCES `opportunity_actions` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `quotation_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `quotation_requests` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `contact_id` int(10) unsigned DEFAULT NULL,
  `external_party_id` int(10) unsigned DEFAULT NULL,
  `project_manager_id` int(10) unsigned DEFAULT NULL,
  `xxx_organisation_id` int(10) unsigned DEFAULT NULL,
  `opportunity_id` int(10) unsigned NOT NULL,
  `opportunity_action_id` int(10) unsigned DEFAULT NULL,
  `quotation_amount` double DEFAULT 0,
  `cost_adjustment` double DEFAULT 0,
  `award_amount` double DEFAULT 0,
  `amount_determination` double DEFAULT 0,
  `date_planned_attempt1` date DEFAULT NULL,
  `date_planned_attempt2` date DEFAULT NULL,
  `date_planned_attempt3` date DEFAULT NULL,
  `date_planned` datetime DEFAULT NULL,
  `date_recorded` datetime DEFAULT NULL,
  `date_released` datetime DEFAULT NULL,
  `date_under_review` date DEFAULT NULL,
  `date_approved_external` date DEFAULT NULL,
  `not_approved_external` tinyint(1) NOT NULL DEFAULT 0,
  `date_approved_project_manager` date DEFAULT NULL,
  `not_approved_project_manager` tinyint(1) NOT NULL DEFAULT 0,
  `date_approved_client` date DEFAULT NULL,
  `not_approved_client` tinyint(1) NOT NULL DEFAULT 0,
  `date_executed` date DEFAULT NULL,
  `date_under_review_determination` date DEFAULT NULL,
  `date_approved_determination` date DEFAULT NULL,
  `not_approved_determination` tinyint(1) NOT NULL DEFAULT 0,
  `status_id` int(10) unsigned NOT NULL,
  `date_planned_to_send_wf_email_status` date DEFAULT NULL,
  `quotation_text` text DEFAULT NULL,
  `created_by_id` int(10) unsigned NOT NULL,
  `updated_by_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `uses_planning` tinyint(1) NOT NULL DEFAULT 0,
  `duration_minutes` int(11) DEFAULT NULL,
  `district_id` bigint(20) unsigned DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `externalparty_note` text DEFAULT NULL,
  `coach_or_organisation_note` text DEFAULT NULL,
  `projectmanager_note` text DEFAULT NULL,
  `client_note` text DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `quotation_requests_opportunity_id_foreign` (`opportunity_id`) USING BTREE,
  KEY `quotation_requests_status_id_foreign` (`status_id`) USING BTREE,
  KEY `quotation_requests_created_by_id_foreign` (`created_by_id`) USING BTREE,
  KEY `quotation_requests_updated_by_id_foreign` (`updated_by_id`) USING BTREE,
  KEY `quotation_requests_contact_id_foreign` (`contact_id`) USING BTREE,
  KEY `quotation_requests_opportunity_action_id_foreign` (`opportunity_action_id`) USING BTREE,
  KEY `quotation_requests_project_manager_id_foreign` (`project_manager_id`) USING BTREE,
  KEY `quotation_requests_external_party_id_foreign` (`external_party_id`) USING BTREE,
  KEY `quotation_requests_district_id_foreign` (`district_id`) USING BTREE,
  CONSTRAINT `quotation_requests_contact_id_foreign` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`id`),
  CONSTRAINT `quotation_requests_created_by_id_foreign` FOREIGN KEY (`created_by_id`) REFERENCES `users` (`id`),
  CONSTRAINT `quotation_requests_district_id_foreign` FOREIGN KEY (`district_id`) REFERENCES `districts` (`id`) ON DELETE SET NULL,
  CONSTRAINT `quotation_requests_external_party_id_foreign` FOREIGN KEY (`external_party_id`) REFERENCES `contacts` (`id`),
  CONSTRAINT `quotation_requests_opportunity_action_id_foreign` FOREIGN KEY (`opportunity_action_id`) REFERENCES `opportunity_actions` (`id`),
  CONSTRAINT `quotation_requests_opportunity_id_foreign` FOREIGN KEY (`opportunity_id`) REFERENCES `opportunities` (`id`),
  CONSTRAINT `quotation_requests_project_manager_id_foreign` FOREIGN KEY (`project_manager_id`) REFERENCES `contacts` (`id`),
  CONSTRAINT `quotation_requests_status_id_foreign` FOREIGN KEY (`status_id`) REFERENCES `quotation_request_status` (`id`),
  CONSTRAINT `quotation_requests_updated_by_id_foreign` FOREIGN KEY (`updated_by_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `reasons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `reasons` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `revenue_distribution_kwh`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `revenue_distribution_kwh` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `revenue_id` int(10) unsigned NOT NULL,
  `participation_id` int(10) unsigned DEFAULT NULL,
  `contact_id` int(10) unsigned NOT NULL,
  `status` varchar(191) DEFAULT NULL,
  `begin_date_participant_report` date DEFAULT NULL,
  `end_date_participant_report` date DEFAULT NULL,
  `date_participant_report` date DEFAULT NULL,
  `participations_quantity_at_start` int(11) DEFAULT NULL,
  `participations_quantity` int(11) DEFAULT NULL,
  `delivered_total_concept` double DEFAULT NULL,
  `delivered_total_confirmed` double DEFAULT NULL,
  `delivered_total_processed` double DEFAULT NULL,
  `street` varchar(191) DEFAULT NULL,
  `street_number` int(11) DEFAULT NULL,
  `street_number_addition` varchar(191) DEFAULT NULL,
  `address` varchar(191) DEFAULT NULL,
  `postal_code` varchar(191) DEFAULT NULL,
  `city` varchar(191) DEFAULT NULL,
  `country` varchar(191) DEFAULT NULL,
  `energy_supplier_ean_electricity` varchar(191) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `revenue_distribution_kwh_revenue_id_foreign` (`revenue_id`) USING BTREE,
  KEY `revenue_distribution_kwh_participation_id_foreign` (`participation_id`) USING BTREE,
  KEY `revenue_distribution_kwh_contact_id_foreign` (`contact_id`) USING BTREE,
  CONSTRAINT `revenue_distribution_kwh_contact_id_foreign` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`id`),
  CONSTRAINT `revenue_distribution_kwh_participation_id_foreign` FOREIGN KEY (`participation_id`) REFERENCES `participation_project` (`id`),
  CONSTRAINT `revenue_distribution_kwh_revenue_id_foreign` FOREIGN KEY (`revenue_id`) REFERENCES `revenues_kwh` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `revenue_distribution_parts_kwh`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `revenue_distribution_parts_kwh` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `parts_id` int(10) unsigned NOT NULL,
  `distribution_id` int(10) unsigned NOT NULL,
  `revenue_id` int(10) unsigned NOT NULL,
  `status` varchar(191) DEFAULT NULL,
  `participations_quantity_at_start` int(11) DEFAULT NULL,
  `participations_quantity` int(11) DEFAULT NULL,
  `delivered_kwh` double DEFAULT NULL,
  `es_id` int(10) unsigned DEFAULT NULL,
  `energy_supplier_name` varchar(191) DEFAULT NULL,
  `energy_supplier_number` varchar(191) DEFAULT NULL,
  `is_visible` tinyint(1) NOT NULL DEFAULT 0,
  `is_energy_supplier_switch` tinyint(1) NOT NULL DEFAULT 0,
  `is_end_participation` tinyint(1) NOT NULL DEFAULT 0,
  `is_end_total_period` tinyint(1) NOT NULL DEFAULT 0,
  `is_end_year_period` tinyint(1) NOT NULL DEFAULT 0,
  `begin_date_participant_report` date DEFAULT NULL,
  `end_date_participant_report` date DEFAULT NULL,
  `date_participant_report` date DEFAULT NULL,
  `date_energy_supplier_report` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `revenue_distribution_parts_kwh_parts_id_foreign` (`parts_id`) USING BTREE,
  KEY `revenue_distribution_parts_kwh_distribution_id_foreign` (`distribution_id`) USING BTREE,
  KEY `revenue_distribution_parts_kwh_revenue_id_foreign` (`revenue_id`) USING BTREE,
  KEY `revenue_distribution_parts_kwh_es_id_foreign` (`es_id`) USING BTREE,
  CONSTRAINT `revenue_distribution_parts_kwh_distribution_id_foreign` FOREIGN KEY (`distribution_id`) REFERENCES `revenue_distribution_kwh` (`id`),
  CONSTRAINT `revenue_distribution_parts_kwh_es_id_foreign` FOREIGN KEY (`es_id`) REFERENCES `energy_suppliers` (`id`),
  CONSTRAINT `revenue_distribution_parts_kwh_parts_id_foreign` FOREIGN KEY (`parts_id`) REFERENCES `revenue_parts_kwh` (`id`),
  CONSTRAINT `revenue_distribution_parts_kwh_revenue_id_foreign` FOREIGN KEY (`revenue_id`) REFERENCES `revenues_kwh` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `revenue_distribution_values_kwh`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `revenue_distribution_values_kwh` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `date_begin` date DEFAULT NULL,
  `date_end` date DEFAULT NULL,
  `distribution_id` int(10) unsigned NOT NULL,
  `revenue_id` int(10) unsigned NOT NULL,
  `parts_id` int(10) unsigned NOT NULL,
  `status` varchar(191) DEFAULT NULL,
  `days_of_period` int(11) DEFAULT NULL,
  `participations_quantity` int(11) DEFAULT NULL,
  `quantity_multiply_by_days` int(11) DEFAULT NULL,
  `delivered_kwh` double DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `revenue_distribution_values_kwh_distribution_id_foreign` (`distribution_id`) USING BTREE,
  KEY `revenue_distribution_values_kwh_revenue_id_foreign` (`revenue_id`) USING BTREE,
  KEY `revenue_distribution_values_kwh_parts_id_foreign` (`parts_id`) USING BTREE,
  CONSTRAINT `revenue_distribution_values_kwh_distribution_id_foreign` FOREIGN KEY (`distribution_id`) REFERENCES `revenue_distribution_kwh` (`id`),
  CONSTRAINT `revenue_distribution_values_kwh_parts_id_foreign` FOREIGN KEY (`parts_id`) REFERENCES `revenue_parts_kwh` (`id`),
  CONSTRAINT `revenue_distribution_values_kwh_revenue_id_foreign` FOREIGN KEY (`revenue_id`) REFERENCES `revenues_kwh` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `revenue_parts_kwh`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `revenue_parts_kwh` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `revenue_id` int(10) unsigned NOT NULL,
  `date_begin` date DEFAULT NULL,
  `date_end` date DEFAULT NULL,
  `confirmed` tinyint(1) NOT NULL DEFAULT 0,
  `date_confirmed` date DEFAULT NULL,
  `date_payout` date DEFAULT NULL,
  `status` varchar(191) DEFAULT NULL,
  `payout_kwh` double DEFAULT NULL,
  `delivered_total_concept` double DEFAULT NULL,
  `delivered_total_confirmed` double DEFAULT NULL,
  `delivered_total_processed` double DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `revenue_parts_kwh_revenue_id_foreign` (`revenue_id`) USING BTREE,
  CONSTRAINT `revenue_parts_kwh_revenue_id_foreign` FOREIGN KEY (`revenue_id`) REFERENCES `revenues_kwh` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `revenue_values_kwh`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `revenue_values_kwh` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `revenue_id` int(10) unsigned NOT NULL,
  `date_registration` date DEFAULT NULL,
  `is_simulated` tinyint(1) NOT NULL DEFAULT 0,
  `kwh_start` double DEFAULT NULL,
  `kwh_start_high` double DEFAULT NULL,
  `kwh_start_low` double DEFAULT NULL,
  `status` varchar(191) DEFAULT NULL,
  `delivered_kwh` double DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `revenue_values_kwh_revenue_id_foreign` (`revenue_id`) USING BTREE,
  CONSTRAINT `revenue_values_kwh_revenue_id_foreign` FOREIGN KEY (`revenue_id`) REFERENCES `revenues_kwh` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `revenues_kwh`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `revenues_kwh` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `category_id` int(10) unsigned NOT NULL,
  `project_id` int(10) unsigned NOT NULL,
  `distribution_type_id` varchar(191) DEFAULT NULL,
  `confirmed` tinyint(1) NOT NULL DEFAULT 0,
  `status` varchar(191) DEFAULT NULL,
  `date_begin` date DEFAULT NULL,
  `date_end` date DEFAULT NULL,
  `date_confirmed` date DEFAULT NULL,
  `payout_kwh` double DEFAULT NULL,
  `delivered_total_concept` double DEFAULT NULL,
  `delivered_total_confirmed` double DEFAULT NULL,
  `delivered_total_processed` double DEFAULT NULL,
  `created_by_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `revenues_kwh_category_id_foreign` (`category_id`) USING BTREE,
  KEY `revenues_kwh_project_id_foreign` (`project_id`) USING BTREE,
  KEY `revenues_kwh_created_by_id_foreign` (`created_by_id`) USING BTREE,
  CONSTRAINT `revenues_kwh_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `project_revenue_category` (`id`),
  CONSTRAINT `revenues_kwh_created_by_id_foreign` FOREIGN KEY (`created_by_id`) REFERENCES `users` (`id`),
  CONSTRAINT `revenues_kwh_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `revisions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `revisions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `revisionable_type` varchar(191) NOT NULL,
  `revisionable_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `key` varchar(191) NOT NULL,
  `old_value` mediumtext DEFAULT NULL,
  `new_value` mediumtext DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `revisions_revisionable_id_revisionable_type_index` (`revisionable_id`,`revisionable_type`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `role_has_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_has_permissions` (
  `permission_id` int(10) unsigned NOT NULL,
  `role_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`permission_id`,`role_id`) USING BTREE,
  KEY `role_has_permissions_role_id_foreign` (`role_id`) USING BTREE,
  CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `guard_name` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `roof_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `roof_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `external_hoom_id` int(11) DEFAULT NULL,
  `external_hoom_short` varchar(191) DEFAULT NULL,
  `order` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `sepas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `sepas` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `filename` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `administration_id` int(10) unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `sepa_type_id` varchar(191) NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `sepas_administration_id_foreign` (`administration_id`) USING BTREE,
  CONSTRAINT `sepas_administration_id_foreign` FOREIGN KEY (`administration_id`) REFERENCES `administrations` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `sources`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `sources` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `name_custom` varchar(191) DEFAULT NULL,
  `code_ref` varchar(191) DEFAULT NULL,
  `visible` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `system_check_run_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `system_check_run_items` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `system_check_run_id` bigint(20) unsigned NOT NULL,
  `severity` varchar(191) NOT NULL DEFAULT 'warning',
  `entity_type` varchar(191) DEFAULT NULL,
  `entity_id` bigint(20) unsigned DEFAULT NULL,
  `related_entity_type` varchar(191) DEFAULT NULL,
  `related_entity_id` bigint(20) unsigned DEFAULT NULL,
  `message` text DEFAULT NULL,
  `context_json` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `scri_run_id_idx` (`system_check_run_id`) USING BTREE,
  KEY `scri_entity_idx` (`entity_type`,`entity_id`) USING BTREE,
  KEY `scri_related_entity_idx` (`related_entity_type`,`related_entity_id`) USING BTREE,
  KEY `scri_severity_idx` (`severity`) USING BTREE,
  CONSTRAINT `system_check_run_items_system_check_run_id_foreign` FOREIGN KEY (`system_check_run_id`) REFERENCES `system_check_runs` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `system_check_runs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `system_check_runs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `app_cooperation_name` varchar(191) NOT NULL,
  `command_ref` varchar(191) NOT NULL,
  `check_code` varchar(191) NOT NULL,
  `check_name` varchar(191) NOT NULL,
  `batch_key` varchar(191) DEFAULT NULL,
  `start_at` datetime NOT NULL,
  `end_at` datetime DEFAULT NULL,
  `finished` tinyint(1) NOT NULL DEFAULT 0,
  `created_in_shared` tinyint(1) NOT NULL DEFAULT 0,
  `status` varchar(191) NOT NULL DEFAULT 'ok',
  `issues_found` int(10) unsigned NOT NULL DEFAULT 0,
  `is_recover_mode` tinyint(1) NOT NULL DEFAULT 0,
  `mail_sent` tinyint(1) NOT NULL DEFAULT 0,
  `notification_sent` tinyint(1) NOT NULL DEFAULT 0,
  `mail_to` varchar(191) DEFAULT NULL,
  `summary` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `scr_batch_key_idx` (`batch_key`) USING BTREE,
  KEY `system_check_runs_app_cooperation_name_index` (`app_cooperation_name`) USING BTREE,
  KEY `system_check_runs_command_ref_index` (`command_ref`) USING BTREE,
  KEY `system_check_runs_check_code_index` (`check_code`) USING BTREE,
  KEY `system_check_runs_status_index` (`status`) USING BTREE,
  KEY `system_check_runs_finished_index` (`finished`) USING BTREE,
  KEY `system_check_runs_created_in_shared_index` (`created_in_shared`) USING BTREE,
  KEY `system_check_runs_start_at_index` (`start_at`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `task_properties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `task_properties` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `code` varchar(191) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `task_property_values`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `task_property_values` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `property_id` int(10) unsigned NOT NULL,
  `task_id` int(10) unsigned NOT NULL,
  `value` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `task_property_values_property_id_foreign` (`property_id`) USING BTREE,
  KEY `task_property_values_task_id_foreign` (`task_id`) USING BTREE,
  CONSTRAINT `task_property_values_property_id_foreign` FOREIGN KEY (`property_id`) REFERENCES `task_properties` (`id`),
  CONSTRAINT `task_property_values_task_id_foreign` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `task_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `task_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL DEFAULT '',
  `default_portal_task_type` tinyint(1) NOT NULL DEFAULT 0,
  `uses_wf_new_task` tinyint(1) NOT NULL DEFAULT 0,
  `email_template_id_wf_new_task` int(10) unsigned DEFAULT NULL,
  `uses_wf_completed_task` tinyint(1) NOT NULL DEFAULT 0,
  `email_template_id_wf_completed_task` int(10) unsigned DEFAULT NULL,
  `number_of_days_to_send_email_completed_task` int(11) NOT NULL DEFAULT 0,
  `uses_wf_expired_task` tinyint(1) NOT NULL DEFAULT 0,
  `email_template_id_wf_expired_task` int(10) unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `task_types_email_template_id_wf_expired_task_foreign` (`email_template_id_wf_expired_task`) USING BTREE,
  KEY `task_types_email_template_id_wf_completed_task_foreign` (`email_template_id_wf_completed_task`) USING BTREE,
  KEY `task_types_email_template_id_wf_new_task_foreign` (`email_template_id_wf_new_task`) USING BTREE,
  CONSTRAINT `task_types_email_template_id_wf_completed_task_foreign` FOREIGN KEY (`email_template_id_wf_completed_task`) REFERENCES `email_templates` (`id`),
  CONSTRAINT `task_types_email_template_id_wf_expired_task_foreign` FOREIGN KEY (`email_template_id_wf_expired_task`) REFERENCES `email_templates` (`id`),
  CONSTRAINT `task_types_email_template_id_wf_new_task_foreign` FOREIGN KEY (`email_template_id_wf_new_task`) REFERENCES `email_templates` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasks` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `note` text NOT NULL,
  `type_id` int(10) unsigned DEFAULT NULL,
  `contact_id` int(10) unsigned DEFAULT NULL,
  `intake_id` int(10) unsigned DEFAULT NULL,
  `contact_group_id` int(10) unsigned DEFAULT NULL,
  `opportunity_id` int(10) unsigned DEFAULT NULL,
  `campaign_id` int(10) unsigned DEFAULT NULL,
  `task_id` int(10) unsigned DEFAULT NULL,
  `finished` tinyint(1) NOT NULL DEFAULT 0,
  `date_finished` date DEFAULT NULL,
  `finished_by_id` int(10) unsigned DEFAULT NULL,
  `date_planned_start` date DEFAULT NULL,
  `date_planned_finish` date DEFAULT NULL,
  `start_time_planned` time DEFAULT NULL,
  `end_time_planned` time DEFAULT NULL,
  `responsible_user_id` int(10) unsigned DEFAULT NULL,
  `responsible_team_id` int(10) unsigned DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `housing_file_id` int(10) unsigned DEFAULT NULL,
  `project_id` int(10) unsigned DEFAULT NULL,
  `participation_project_id` int(10) unsigned DEFAULT NULL,
  `order_id` int(10) unsigned DEFAULT NULL,
  `invoice_id` int(10) unsigned DEFAULT NULL,
  `date_sent_wf_completed_task` datetime DEFAULT NULL,
  `date_sent_wf_expired_task` datetime DEFAULT NULL,
  `date_sent_wf_new_task` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `tasks_type_id_foreign` (`type_id`) USING BTREE,
  KEY `tasks_contact_id_foreign` (`contact_id`) USING BTREE,
  KEY `tasks_intake_id_foreign` (`intake_id`) USING BTREE,
  KEY `tasks_contact_group_id_foreign` (`contact_group_id`) USING BTREE,
  KEY `tasks_opportunity_id_foreign` (`opportunity_id`) USING BTREE,
  KEY `tasks_finished_by_id_foreign` (`finished_by_id`) USING BTREE,
  KEY `tasks_responsible_user_id_foreign` (`responsible_user_id`) USING BTREE,
  KEY `tasks_created_by_id_foreign` (`created_by_id`) USING BTREE,
  KEY `tasks_updated_by_id_foreign` (`updated_by_id`) USING BTREE,
  KEY `tasks_campaign_id_foreign` (`campaign_id`) USING BTREE,
  KEY `tasks_responsible_team_id_foreign` (`responsible_team_id`) USING BTREE,
  KEY `tasks_task_id_foreign` (`task_id`) USING BTREE,
  KEY `tasks_order_id_foreign` (`order_id`) USING BTREE,
  KEY `tasks_invoice_id_foreign` (`invoice_id`) USING BTREE,
  KEY `tasks_housing_file_id_foreign` (`housing_file_id`) USING BTREE,
  KEY `tasks_project_id_foreign` (`project_id`) USING BTREE,
  KEY `tasks_participation_project_id_foreign` (`participation_project_id`) USING BTREE,
  CONSTRAINT `tasks_campaign_id_foreign` FOREIGN KEY (`campaign_id`) REFERENCES `campaigns` (`id`),
  CONSTRAINT `tasks_contact_group_id_foreign` FOREIGN KEY (`contact_group_id`) REFERENCES `contact_groups` (`id`),
  CONSTRAINT `tasks_contact_id_foreign` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`id`),
  CONSTRAINT `tasks_created_by_id_foreign` FOREIGN KEY (`created_by_id`) REFERENCES `users` (`id`),
  CONSTRAINT `tasks_finished_by_id_foreign` FOREIGN KEY (`finished_by_id`) REFERENCES `users` (`id`),
  CONSTRAINT `tasks_housing_file_id_foreign` FOREIGN KEY (`housing_file_id`) REFERENCES `housing_files` (`id`),
  CONSTRAINT `tasks_intake_id_foreign` FOREIGN KEY (`intake_id`) REFERENCES `intakes` (`id`),
  CONSTRAINT `tasks_invoice_id_foreign` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`),
  CONSTRAINT `tasks_opportunity_id_foreign` FOREIGN KEY (`opportunity_id`) REFERENCES `opportunities` (`id`),
  CONSTRAINT `tasks_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `tasks_participation_project_id_foreign` FOREIGN KEY (`participation_project_id`) REFERENCES `participation_project` (`id`),
  CONSTRAINT `tasks_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`),
  CONSTRAINT `tasks_responsible_team_id_foreign` FOREIGN KEY (`responsible_team_id`) REFERENCES `teams` (`id`),
  CONSTRAINT `tasks_responsible_user_id_foreign` FOREIGN KEY (`responsible_user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `tasks_task_id_foreign` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`),
  CONSTRAINT `tasks_type_id_foreign` FOREIGN KEY (`type_id`) REFERENCES `task_types` (`id`),
  CONSTRAINT `tasks_updated_by_id_foreign` FOREIGN KEY (`updated_by_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `team_contact_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `team_contact_group` (
  `contact_group_id` int(10) unsigned NOT NULL,
  `team_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  UNIQUE KEY `team_contact_group_contact_group_id_team_id_unique` (`contact_group_id`,`team_id`) USING BTREE,
  KEY `team_contact_group_team_id_foreign` (`team_id`) USING BTREE,
  CONSTRAINT `team_contact_group_contact_group_id_foreign` FOREIGN KEY (`contact_group_id`) REFERENCES `contact_groups` (`id`),
  CONSTRAINT `team_contact_group_team_id_foreign` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `team_district`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `team_district` (
  `district_id` bigint(20) unsigned NOT NULL,
  `team_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  UNIQUE KEY `team_district_district_id_team_id_unique` (`district_id`,`team_id`) USING BTREE,
  KEY `team_district_team_id_foreign` (`team_id`) USING BTREE,
  CONSTRAINT `team_district_district_id_foreign` FOREIGN KEY (`district_id`) REFERENCES `districts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `team_district_team_id_foreign` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `team_document_created_from`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `team_document_created_from` (
  `document_created_from_id` int(10) unsigned NOT NULL,
  `team_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  UNIQUE KEY `team_document_created_from_unique` (`document_created_from_id`,`team_id`) USING BTREE,
  KEY `team_document_created_from_team_id_foreign` (`team_id`) USING BTREE,
  CONSTRAINT `team_document_created_from_document_created_from_id_foreign` FOREIGN KEY (`document_created_from_id`) REFERENCES `document_created_froms` (`id`),
  CONSTRAINT `team_document_created_from_team_id_foreign` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `team_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `team_user` (
  `user_id` int(10) unsigned NOT NULL,
  `team_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  UNIQUE KEY `team_user_user_id_team_id_unique` (`user_id`,`team_id`) USING BTREE,
  KEY `team_user_team_id_foreign` (`team_id`) USING BTREE,
  CONSTRAINT `team_user_team_id_foreign` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`),
  CONSTRAINT `team_user_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `teams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `teams` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idx_teams_name` (`id`,`name`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `titles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `titles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(26) NOT NULL DEFAULT '',
  `address` varchar(191) DEFAULT NULL,
  `salutation` varchar(191) DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `twinfield_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `twinfield_log` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `invoice_id` int(10) unsigned DEFAULT NULL,
  `contact_id` int(10) unsigned DEFAULT NULL,
  `message_text` varchar(256) NOT NULL,
  `message_type` varchar(10) NOT NULL,
  `user_id` int(10) unsigned DEFAULT NULL,
  `is_error` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `twinfield_log_invoice_id_foreign` (`invoice_id`) USING BTREE,
  KEY `twinfield_log_contact_id_foreign` (`contact_id`) USING BTREE,
  KEY `twinfield_log_user_id_foreign` (`user_id`) USING BTREE,
  CONSTRAINT `twinfield_log_contact_id_foreign` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`id`),
  CONSTRAINT `twinfield_log_invoice_id_foreign` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`),
  CONSTRAINT `twinfield_log_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `two_factor_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `two_factor_tokens` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `token` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `two_factor_tokens_user_id_foreign` (`user_id`) USING BTREE,
  CONSTRAINT `two_factor_tokens_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `user_login_attempts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_login_attempts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned DEFAULT NULL,
  `identifier` varchar(191) DEFAULT NULL,
  `ip` varchar(45) DEFAULT NULL,
  `user_agent` varchar(512) DEFAULT NULL,
  `succeeded` tinyint(1) NOT NULL DEFAULT 0,
  `result` varchar(191) DEFAULT NULL,
  `failed_logins_after` int(10) unsigned DEFAULT NULL,
  `blocked_until` timestamp NULL DEFAULT NULL,
  `blocked_permanent` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `user_login_attempts_user_id_foreign` (`user_id`) USING BTREE,
  KEY `user_login_attempts_identifier_created_at_index` (`identifier`,`created_at`) USING BTREE,
  KEY `user_login_attempts_ip_index` (`ip`) USING BTREE,
  CONSTRAINT `user_login_attempts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `title_id` int(10) unsigned DEFAULT NULL,
  `first_name` varchar(191) NOT NULL DEFAULT '',
  `last_name_prefix_id` int(10) unsigned DEFAULT NULL,
  `last_name` varchar(191) NOT NULL DEFAULT '',
  `phone_number` varchar(191) NOT NULL DEFAULT '',
  `mobile` varchar(191) NOT NULL DEFAULT '',
  `occupation` varchar(191) NOT NULL DEFAULT '',
  `last_visit` datetime DEFAULT NULL,
  `visit_count` int(11) NOT NULL DEFAULT 0,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `alfresco_password` text NOT NULL,
  `has_alfresco_account` tinyint(1) NOT NULL DEFAULT 0,
  `require_two_factor_authentication` tinyint(1) NOT NULL DEFAULT 0,
  `two_factor_secret` text DEFAULT NULL,
  `two_factor_recovery_codes` text DEFAULT NULL,
  `two_factor_confirmed_at` timestamp NULL DEFAULT NULL,
  `show_two_factor_notification` tinyint(1) NOT NULL DEFAULT 1,
  `default_mailbox_id` int(10) unsigned DEFAULT NULL,
  `failed_logins` int(10) unsigned NOT NULL DEFAULT 0,
  `blocked_until` timestamp NULL DEFAULT NULL,
  `blocked_permanent` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `users_email_unique` (`email`) USING BTREE,
  KEY `users_title_id_foreign` (`title_id`) USING BTREE,
  KEY `users_last_name_prefix_id_foreign` (`last_name_prefix_id`) USING BTREE,
  KEY `users_default_mailbox_id_foreign` (`default_mailbox_id`) USING BTREE,
  KEY `idx_users_name` (`id`,`first_name`,`last_name`) USING BTREE,
  CONSTRAINT `users_default_mailbox_id_foreign` FOREIGN KEY (`default_mailbox_id`) REFERENCES `mailboxes` (`id`) ON DELETE SET NULL,
  CONSTRAINT `users_last_name_prefix_id_foreign` FOREIGN KEY (`last_name_prefix_id`) REFERENCES `last_name_prefixes` (`id`),
  CONSTRAINT `users_title_id_foreign` FOREIGN KEY (`title_id`) REFERENCES `titles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `vat_codes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `vat_codes` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `start_date` date DEFAULT NULL,
  `description` varchar(191) NOT NULL DEFAULT '',
  `percentage` double DEFAULT NULL,
  `twinfield_code` varchar(191) NOT NULL DEFAULT '',
  `twinfield_ledger_code` varchar(191) NOT NULL DEFAULT '',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `webforms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `webforms` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `api_key` text NOT NULL,
  `email_address_error_report` varchar(191) DEFAULT NULL,
  `mail_error_report` tinyint(1) NOT NULL DEFAULT 1,
  `max_requests_per_minute` int(11) NOT NULL,
  `date_start` date DEFAULT NULL,
  `date_end` date DEFAULT NULL,
  `api_key_date` date NOT NULL,
  `responsible_user_id` int(10) unsigned DEFAULT NULL,
  `responsible_team_id` int(10) unsigned DEFAULT NULL,
  `last_requests` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `webforms_responsible_user_id_foreign` (`responsible_user_id`) USING BTREE,
  KEY `webforms_responsible_team_id_foreign` (`responsible_team_id`) USING BTREE,
  CONSTRAINT `webforms_responsible_team_id_foreign` FOREIGN KEY (`responsible_team_id`) REFERENCES `teams` (`id`),
  CONSTRAINT `webforms_responsible_user_id_foreign` FOREIGN KEY (`responsible_user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

/*M!999999\- enable the sandbox mode */ 
set autocommit=0;
commit;
