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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `address_dongle_types_type_read_out_id_foreign` (`type_read_out_id`),
  CONSTRAINT `address_dongle_types_type_read_out_id_foreign` FOREIGN KEY (`type_read_out_id`) REFERENCES `address_dongle_read_out_types` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `address_dongles_address_id_foreign` (`address_id`),
  KEY `address_dongles_type_read_out_id_foreign` (`type_read_out_id`),
  KEY `address_dongles_type_dongle_id_foreign` (`type_dongle_id`),
  KEY `address_dongles_created_by_id_foreign` (`created_by_id`),
  KEY `address_dongles_updated_by_id_foreign` (`updated_by_id`),
  CONSTRAINT `address_dongles_address_id_foreign` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`id`),
  CONSTRAINT `address_dongles_created_by_id_foreign` FOREIGN KEY (`created_by_id`) REFERENCES `users` (`id`),
  CONSTRAINT `address_dongles_type_dongle_id_foreign` FOREIGN KEY (`type_dongle_id`) REFERENCES `address_dongle_types` (`id`),
  CONSTRAINT `address_dongles_type_read_out_id_foreign` FOREIGN KEY (`type_read_out_id`) REFERENCES `address_dongle_read_out_types` (`id`),
  CONSTRAINT `address_dongles_updated_by_id_foreign` FOREIGN KEY (`updated_by_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `address_ece_address_id_foreign` (`address_id`),
  CONSTRAINT `address_ece_address_id_foreign` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `address_ecg_address_id_foreign` (`address_id`),
  CONSTRAINT `address_ecg_address_id_foreign` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `address_es_address_id_foreign` (`address_id`),
  KEY `address_energy_suppliers_energy_supply_type_id_foreign` (`energy_supply_type_id`),
  KEY `address_energy_suppliers_energy_supplier_id_foreign` (`energy_supplier_id`),
  KEY `address_es_energy_supply_status_id_foreign` (`energy_supply_status_id`),
  KEY `address_energy_suppliers_created_by_id_foreign` (`created_by_id`),
  KEY `address_energy_suppliers_update_by_id_foreign` (`update_by_id`),
  CONSTRAINT `address_energy_suppliers_created_by_id_foreign` FOREIGN KEY (`created_by_id`) REFERENCES `users` (`id`),
  CONSTRAINT `address_energy_suppliers_energy_supplier_id_foreign` FOREIGN KEY (`energy_supplier_id`) REFERENCES `energy_suppliers` (`id`),
  CONSTRAINT `address_energy_suppliers_energy_supply_type_id_foreign` FOREIGN KEY (`energy_supply_type_id`) REFERENCES `energy_supply_types` (`id`),
  CONSTRAINT `address_energy_suppliers_update_by_id_foreign` FOREIGN KEY (`update_by_id`) REFERENCES `users` (`id`),
  CONSTRAINT `address_es_address_id_foreign` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`id`),
  CONSTRAINT `address_es_energy_supply_status_id_foreign` FOREIGN KEY (`energy_supply_status_id`) REFERENCES `energy_supply_statuses` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `addresses_contact_id_foreign` (`contact_id`),
  KEY `addresses_country_id_foreign` (`country_id`),
  CONSTRAINT `addresses_contact_id_foreign` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`id`),
  CONSTRAINT `addresses_country_id_foreign` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `administration_contact_twinfield`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `administration_contact_twinfield` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `contact_id` int(10) unsigned NOT NULL,
  `administration_id` int(10) unsigned NOT NULL,
  `twinfield_number` varchar(191) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `administration_contact_twinfield_contact_id_foreign` (`contact_id`),
  KEY `administration_contact_twinfield_administration_id_foreign` (`administration_id`),
  CONSTRAINT `administration_contact_twinfield_administration_id_foreign` FOREIGN KEY (`administration_id`) REFERENCES `administrations` (`id`),
  CONSTRAINT `administration_contact_twinfield_contact_id_foreign` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `administration_last_used_numbers_unique` (`number_type`,`number_year`,`administration_id`),
  KEY `administration_last_used_numbers_administration_id_foreign` (`administration_id`),
  CONSTRAINT `administration_last_used_numbers_administration_id_foreign` FOREIGN KEY (`administration_id`) REFERENCES `administrations` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `administration_user_user_id_administration_id_unique` (`user_id`,`administration_id`),
  KEY `administration_user_administration_id_foreign` (`administration_id`),
  CONSTRAINT `administration_user_administration_id_foreign` FOREIGN KEY (`administration_id`) REFERENCES `administrations` (`id`),
  CONSTRAINT `administration_user_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `administrations_country_id_foreign` (`country_id`),
  KEY `administrations_created_by_id_foreign` (`created_by_id`),
  KEY `administrations_email_template_reminder_id_foreign` (`email_template_reminder_id`),
  KEY `administrations_email_template_exhortation_id_foreign` (`email_template_exhortation_id`),
  KEY `administrations_email_template_id_collection_foreign` (`email_template_id_collection`),
  KEY `administrations_email_template_id_transfer_foreign` (`email_template_id_transfer`),
  KEY `administrations_mailbox_id_foreign` (`mailbox_id`),
  KEY `administrations_email_template_financial_overview_id_foreign` (`email_template_financial_overview_id`),
  KEY `administrations_portal_settings_layout_id_foreign` (`portal_settings_layout_id`),
  CONSTRAINT `administrations_country_id_foreign` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`),
  CONSTRAINT `administrations_created_by_id_foreign` FOREIGN KEY (`created_by_id`) REFERENCES `users` (`id`),
  CONSTRAINT `administrations_email_template_exhortation_id_foreign` FOREIGN KEY (`email_template_exhortation_id`) REFERENCES `email_templates` (`id`),
  CONSTRAINT `administrations_email_template_financial_overview_id_foreign` FOREIGN KEY (`email_template_financial_overview_id`) REFERENCES `email_templates` (`id`),
  CONSTRAINT `administrations_email_template_id_collection_foreign` FOREIGN KEY (`email_template_id_collection`) REFERENCES `email_templates` (`id`),
  CONSTRAINT `administrations_email_template_id_transfer_foreign` FOREIGN KEY (`email_template_id_transfer`) REFERENCES `email_templates` (`id`),
  CONSTRAINT `administrations_email_template_reminder_id_foreign` FOREIGN KEY (`email_template_reminder_id`) REFERENCES `email_templates` (`id`),
  CONSTRAINT `administrations_mailbox_id_foreign` FOREIGN KEY (`mailbox_id`) REFERENCES `mailboxes` (`id`),
  CONSTRAINT `administrations_portal_settings_layout_id_foreign` FOREIGN KEY (`portal_settings_layout_id`) REFERENCES `portal_settings_layouts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `campaign_coach`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `campaign_coach` (
  `campaign_id` int(10) unsigned NOT NULL,
  `contact_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`campaign_id`,`contact_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `campaign_external_party`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `campaign_external_party` (
  `campaign_id` int(10) unsigned NOT NULL,
  `contact_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`campaign_id`,`contact_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `campaign_measure_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `campaign_measure_category` (
  `campaign_id` int(10) unsigned NOT NULL,
  `measure_category_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`campaign_id`,`measure_category_id`),
  KEY `campaign_measure_measure_category_id_foreign` (`measure_category_id`),
  CONSTRAINT `campaign_measure_measure_category_id_foreign` FOREIGN KEY (`measure_category_id`) REFERENCES `measure_categories` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `campaign_opportunity_action`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `campaign_opportunity_action` (
  `campaign_id` int(10) unsigned NOT NULL,
  `opportunity_action_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`campaign_id`,`opportunity_action_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `campaign_organisation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `campaign_organisation` (
  `campaign_id` int(10) unsigned NOT NULL,
  `organisation_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`campaign_id`,`organisation_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `campaign_project_manager`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `campaign_project_manager` (
  `campaign_id` int(10) unsigned NOT NULL,
  `contact_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`campaign_id`,`contact_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `campaign_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `campaign_status` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `campaign_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `campaign_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `campaign_workflows_campaign_id_foreign` (`campaign_id`),
  KEY `campaign_workflows_opportunity_status_id_foreign` (`opportunity_status_id`),
  KEY `campaign_workflows_quotation_request_status_id_foreign` (`quotation_request_status_id`),
  KEY `campaign_workflows_email_template_id_wf_foreign` (`email_template_id_wf`),
  KEY `campaign_workflows_email_template_id_reminder_foreign` (`email_template_id_reminder`),
  CONSTRAINT `campaign_workflows_campaign_id_foreign` FOREIGN KEY (`campaign_id`) REFERENCES `campaigns` (`id`),
  CONSTRAINT `campaign_workflows_email_template_id_reminder_foreign` FOREIGN KEY (`email_template_id_reminder`) REFERENCES `email_templates` (`id`),
  CONSTRAINT `campaign_workflows_email_template_id_wf_foreign` FOREIGN KEY (`email_template_id_wf`) REFERENCES `email_templates` (`id`),
  CONSTRAINT `campaign_workflows_opportunity_status_id_foreign` FOREIGN KEY (`opportunity_status_id`) REFERENCES `opportunity_status` (`id`),
  CONSTRAINT `campaign_workflows_quotation_request_status_id_foreign` FOREIGN KEY (`quotation_request_status_id`) REFERENCES `quotation_request_status` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `campaigns_status_id_foreign` (`status_id`),
  KEY `campaigns_type_id_foreign` (`type_id`),
  KEY `campaigns_created_by_id_foreign` (`created_by_id`),
  KEY `campaigns_owned_by_id_foreign` (`owned_by_id`),
  KEY `campaigns_inspection_planned_email_template_id_foreign` (`inspection_planned_email_template_id`),
  KEY `campaigns_inspection_planned_mailbox_id_foreign` (`inspection_planned_mailbox_id`),
  KEY `campaigns_inspection_recorded_email_template_id_foreign` (`inspection_recorded_email_template_id`),
  KEY `campaigns_inspection_released_email_template_id_foreign` (`inspection_released_email_template_id`),
  KEY `campaigns_default_workflow_mailbox_id_foreign` (`default_workflow_mailbox_id`),
  CONSTRAINT `campaigns_created_by_id_foreign` FOREIGN KEY (`created_by_id`) REFERENCES `users` (`id`),
  CONSTRAINT `campaigns_default_workflow_mailbox_id_foreign` FOREIGN KEY (`default_workflow_mailbox_id`) REFERENCES `mailboxes` (`id`),
  CONSTRAINT `campaigns_inspection_planned_email_template_id_foreign` FOREIGN KEY (`inspection_planned_email_template_id`) REFERENCES `email_templates` (`id`) ON DELETE SET NULL,
  CONSTRAINT `campaigns_inspection_planned_mailbox_id_foreign` FOREIGN KEY (`inspection_planned_mailbox_id`) REFERENCES `mailboxes` (`id`),
  CONSTRAINT `campaigns_inspection_recorded_email_template_id_foreign` FOREIGN KEY (`inspection_recorded_email_template_id`) REFERENCES `email_templates` (`id`) ON DELETE SET NULL,
  CONSTRAINT `campaigns_inspection_released_email_template_id_foreign` FOREIGN KEY (`inspection_released_email_template_id`) REFERENCES `email_templates` (`id`) ON DELETE SET NULL,
  CONSTRAINT `campaigns_owned_by_id_foreign` FOREIGN KEY (`owned_by_id`) REFERENCES `users` (`id`),
  CONSTRAINT `campaigns_status_id_foreign` FOREIGN KEY (`status_id`) REFERENCES `campaign_status` (`id`),
  CONSTRAINT `campaigns_type_id_foreign` FOREIGN KEY (`type_id`) REFERENCES `campaign_types` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `composed_contact_group_parent_group_id_foreign` (`parent_group_id`),
  KEY `composed_contact_group_group_id_foreign` (`group_id`),
  CONSTRAINT `composed_contact_group_group_id_foreign` FOREIGN KEY (`group_id`) REFERENCES `contact_groups` (`id`),
  CONSTRAINT `composed_contact_group_parent_group_id_foreign` FOREIGN KEY (`parent_group_id`) REFERENCES `contact_groups` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `composed_contact_group_excepted_parent_group_id_foreign` (`parent_group_id`),
  KEY `composed_contact_group_excepted_group_id_foreign` (`group_id`),
  CONSTRAINT `composed_contact_group_excepted_group_id_foreign` FOREIGN KEY (`group_id`) REFERENCES `contact_groups` (`id`),
  CONSTRAINT `composed_contact_group_excepted_parent_group_id_foreign` FOREIGN KEY (`parent_group_id`) REFERENCES `contact_groups` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `contact_availabilities_contact_id_foreign` (`contact_id`),
  CONSTRAINT `contact_availabilities_contact_id_foreign` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `contact_email_contact_id_email_id_unique` (`contact_id`,`email_id`),
  KEY `idx_contact_email_email_contact` (`email_id`,`contact_id`),
  KEY `contact_email_email_address_id_foreign` (`email_address_id`),
  CONSTRAINT `contact_email_contact_id_foreign` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`id`),
  CONSTRAINT `contact_email_email_address_id_foreign` FOREIGN KEY (`email_address_id`) REFERENCES `email_addresses` (`id`),
  CONSTRAINT `contact_email_email_id_foreign` FOREIGN KEY (`email_id`) REFERENCES `emails` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `contact_email_manual`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact_email_manual` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `contact_id` int(10) unsigned NOT NULL,
  `email_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `contact_email_manual_contact_id_email_id_unique` (`contact_id`,`email_id`),
  KEY `idx_contact_email_manual_email_contact` (`email_id`,`contact_id`),
  CONSTRAINT `contact_email_manual_contact_id_foreign` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `contact_email_manual_email_id_foreign` FOREIGN KEY (`email_id`) REFERENCES `emails` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `contact_for_imports_contact_to_import_id_foreign` (`contact_to_import_id`),
  KEY `contact_for_imports_contact_id_foreign` (`contact_id`),
  CONSTRAINT `contact_for_imports_contact_id_foreign` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`id`),
  CONSTRAINT `contact_for_imports_contact_to_import_id_foreign` FOREIGN KEY (`contact_to_import_id`) REFERENCES `contact_to_imports` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `contact_group_participation_group_id_foreign` (`group_id`),
  KEY `contact_group_participation_project_id_foreign` (`project_id`),
  CONSTRAINT `contact_group_participation_group_id_foreign` FOREIGN KEY (`group_id`) REFERENCES `contact_groups` (`id`),
  CONSTRAINT `contact_group_participation_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `contact_groups_responsible_user_id_foreign` (`responsible_user_id`),
  KEY `contact_groups_created_by_id_foreign` (`created_by_id`),
  KEY `contact_groups_email_template_id_new_contact_link_foreign` (`email_template_id_new_contact_link`),
  KEY `contact_groups_simulated_group_id_foreign` (`simulated_group_id`),
  CONSTRAINT `contact_groups_created_by_id_foreign` FOREIGN KEY (`created_by_id`) REFERENCES `users` (`id`),
  CONSTRAINT `contact_groups_email_template_id_new_contact_link_foreign` FOREIGN KEY (`email_template_id_new_contact_link`) REFERENCES `email_templates` (`id`),
  CONSTRAINT `contact_groups_responsible_user_id_foreign` FOREIGN KEY (`responsible_user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `contact_groups_simulated_group_id_foreign` FOREIGN KEY (`simulated_group_id`) REFERENCES `contact_groups` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `contact_groups_contacts_for_report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact_groups_contacts_for_report` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `contact_id` int(10) unsigned NOT NULL,
  `contact_group_id` int(10) unsigned NOT NULL,
  `member_to_group_since` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  UNIQUE KEY `contact_groups_pivot_contact_id_contact_group_id_unique` (`contact_id`,`contact_group_id`),
  KEY `contact_groups_pivot_contact_group_id_foreign` (`contact_group_id`),
  CONSTRAINT `contact_groups_pivot_contact_group_id_foreign` FOREIGN KEY (`contact_group_id`) REFERENCES `contact_groups` (`id`),
  CONSTRAINT `contact_groups_pivot_contact_id_foreign` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `contact_notes_contact_id_foreign` (`contact_id`),
  KEY `contact_notes_created_by_id_foreign` (`created_by_id`),
  KEY `contact_notes_updated_by_id_foreign` (`updated_by_id`),
  CONSTRAINT `contact_notes_contact_id_foreign` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`id`),
  CONSTRAINT `contact_notes_created_by_id_foreign` FOREIGN KEY (`created_by_id`) REFERENCES `users` (`id`),
  CONSTRAINT `contact_notes_updated_by_id_foreign` FOREIGN KEY (`updated_by_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `contact_to_import_suppliers_code_ref_unique` (`code_ref`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `contact_to_imports_contact_id_foreign` (`contact_id`),
  KEY `contact_to_imports_supplier_code_ref_foreign` (`supplier_code_ref`),
  CONSTRAINT `contact_to_imports_contact_id_foreign` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`id`),
  CONSTRAINT `contact_to_imports_supplier_code_ref_foreign` FOREIGN KEY (`supplier_code_ref`) REFERENCES `contact_to_import_suppliers` (`code_ref`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `contacts_public_id_unique` (`public_id`),
  KEY `contacts_owner_id_foreign` (`owner_id`),
  KEY `contacts_created_by_id_foreign` (`created_by_id`),
  KEY `contacts_updated_by_id_foreign` (`updated_by_id`),
  KEY `idx_contacts_advanced` (`id`,`deleted_at`,`full_name`),
  CONSTRAINT `contacts_created_by_id_foreign` FOREIGN KEY (`created_by_id`) REFERENCES `users` (`id`),
  CONSTRAINT `contacts_owner_id_foreign` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`),
  CONSTRAINT `contacts_updated_by_id_foreign` FOREIGN KEY (`updated_by_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `cooperation_hoom_campaigns_cooperation_id_foreign` (`cooperation_id`),
  KEY `cooperation_hoom_campaigns_campaign_id_foreign` (`campaign_id`),
  KEY `cooperation_hoom_campaigns_measure_id_foreign` (`measure_id`),
  CONSTRAINT `cooperation_hoom_campaigns_campaign_id_foreign` FOREIGN KEY (`campaign_id`) REFERENCES `campaigns` (`id`),
  CONSTRAINT `cooperation_hoom_campaigns_cooperation_id_foreign` FOREIGN KEY (`cooperation_id`) REFERENCES `cooperations` (`id`),
  CONSTRAINT `cooperation_hoom_campaigns_measure_id_foreign` FOREIGN KEY (`measure_id`) REFERENCES `measures` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `cooperations_hoom_email_template_id_foreign` (`hoom_email_template_id`),
  KEY `cooperations_hoom_group_id_foreign` (`hoom_group_id`),
  KEY `cooperations_created_by_id_foreign` (`created_by_id`),
  KEY `cooperations_updated_by_id_foreign` (`updated_by_id`),
  KEY `cooperations_inspection_planned_email_template_id_foreign` (`inspection_planned_email_template_id`),
  KEY `cooperations_inspection_recorded_email_template_id_foreign` (`inspection_recorded_email_template_id`),
  KEY `cooperations_inspection_planned_mailbox_id_foreign` (`inspection_planned_mailbox_id`),
  KEY `cooperations_inspection_released_email_template_id_foreign` (`inspection_released_email_template_id`),
  KEY `cooperations_hoom_mailbox_id_foreign` (`hoom_mailbox_id`),
  CONSTRAINT `cooperations_created_by_id_foreign` FOREIGN KEY (`created_by_id`) REFERENCES `users` (`id`),
  CONSTRAINT `cooperations_hoom_email_template_id_foreign` FOREIGN KEY (`hoom_email_template_id`) REFERENCES `email_templates` (`id`),
  CONSTRAINT `cooperations_hoom_group_id_foreign` FOREIGN KEY (`hoom_group_id`) REFERENCES `contact_groups` (`id`),
  CONSTRAINT `cooperations_hoom_mailbox_id_foreign` FOREIGN KEY (`hoom_mailbox_id`) REFERENCES `mailboxes` (`id`) ON DELETE SET NULL,
  CONSTRAINT `cooperations_inspection_planned_email_template_id_foreign` FOREIGN KEY (`inspection_planned_email_template_id`) REFERENCES `email_templates` (`id`) ON DELETE SET NULL,
  CONSTRAINT `cooperations_inspection_planned_mailbox_id_foreign` FOREIGN KEY (`inspection_planned_mailbox_id`) REFERENCES `mailboxes` (`id`),
  CONSTRAINT `cooperations_inspection_recorded_email_template_id_foreign` FOREIGN KEY (`inspection_recorded_email_template_id`) REFERENCES `email_templates` (`id`) ON DELETE SET NULL,
  CONSTRAINT `cooperations_inspection_released_email_template_id_foreign` FOREIGN KEY (`inspection_released_email_template_id`) REFERENCES `email_templates` (`id`) ON DELETE SET NULL,
  CONSTRAINT `cooperations_updated_by_id_foreign` FOREIGN KEY (`updated_by_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `countries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `countries` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  UNIQUE KEY `countries_id_unique` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `district_has_coaches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `district_has_coaches` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `district_id` bigint(20) unsigned NOT NULL,
  `contact_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `district_has_coaches_district_id_foreign` (`district_id`),
  KEY `district_has_coaches_contact_id_foreign` (`contact_id`),
  CONSTRAINT `district_has_coaches_contact_id_foreign` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `district_has_coaches_district_id_foreign` FOREIGN KEY (`district_id`) REFERENCES `districts` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `districts_email_to_contact_template_id_foreign` (`email_to_contact_template_id`),
  KEY `districts_email_to_coach_template_id_foreign` (`email_to_coach_template_id`),
  CONSTRAINT `districts_email_to_coach_template_id_foreign` FOREIGN KEY (`email_to_coach_template_id`) REFERENCES `email_templates` (`id`),
  CONSTRAINT `districts_email_to_contact_template_id_foreign` FOREIGN KEY (`email_to_contact_template_id`) REFERENCES `email_templates` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `document_created_froms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `document_created_froms` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `code_ref` varchar(191) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `document_template_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `document_template_role` (
  `document_template_id` int(10) unsigned NOT NULL,
  `role_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  UNIQUE KEY `document_template_role_document_template_id_role_id_unique` (`document_template_id`,`role_id`),
  KEY `document_template_role_role_id_foreign` (`role_id`),
  CONSTRAINT `document_template_role_document_template_id_foreign` FOREIGN KEY (`document_template_id`) REFERENCES `document_templates` (`id`),
  CONSTRAINT `document_template_role_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `document_templates_base_template_id_foreign` (`base_template_id`),
  KEY `document_templates_header_id_foreign` (`header_id`),
  KEY `document_templates_footer_id_foreign` (`footer_id`),
  KEY `document_templates_created_by_id_foreign` (`created_by_id`),
  CONSTRAINT `document_templates_base_template_id_foreign` FOREIGN KEY (`base_template_id`) REFERENCES `document_templates` (`id`),
  CONSTRAINT `document_templates_created_by_id_foreign` FOREIGN KEY (`created_by_id`) REFERENCES `users` (`id`),
  CONSTRAINT `document_templates_footer_id_foreign` FOREIGN KEY (`footer_id`) REFERENCES `document_templates` (`id`),
  CONSTRAINT `document_templates_header_id_foreign` FOREIGN KEY (`header_id`) REFERENCES `document_templates` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `documents_contact_id_foreign` (`contact_id`),
  KEY `documents_contact_group_id_foreign` (`contact_group_id`),
  KEY `documents_opportunity_id_foreign` (`opportunity_id`),
  KEY `documents_sent_by_id_foreign` (`sent_by_id`),
  KEY `documents_created_by_id_foreign` (`created_by_id`),
  KEY `documents_intake_id_foreign` (`intake_id`),
  KEY `documents_template_id_foreign` (`template_id`),
  KEY `documents_campaign_id_foreign` (`campaign_id`),
  KEY `documents_housing_file_id_foreign` (`housing_file_id`),
  KEY `documents_quotation_request_id_foreign` (`quotation_request_id`),
  KEY `documents_measure_id_foreign` (`measure_id`),
  KEY `documents_task_id_foreign` (`task_id`),
  KEY `documents_order_id_foreign` (`order_id`),
  KEY `documents_project_id_foreign` (`project_id`),
  KEY `documents_participation_project_id_foreign` (`participation_project_id`),
  KEY `documents_administration_id_foreign` (`administration_id`),
  KEY `documents_portal_filter_contact_group_id_foreign` (`portal_filter_contact_group_id`),
  KEY `documents_document_created_from_id_foreign` (`document_created_from_id`),
  KEY `documents_created_by_portal_user_id_foreign` (`created_by_portal_user_id`),
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `dynamic_contact_group_filter_contact_group_id_foreign` (`contact_group_id`),
  CONSTRAINT `dynamic_contact_group_filter_contact_group_id_foreign` FOREIGN KEY (`contact_group_id`) REFERENCES `contact_groups` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `email_addresses_contact_id_foreign` (`contact_id`),
  CONSTRAINT `email_addresses_contact_id_foreign` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `idx_email_attachments` (`email_id`,`id`,`cid`),
  CONSTRAINT `email_attachments_email_id_foreign` FOREIGN KEY (`email_id`) REFERENCES `emails` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `email_group_email_addresses_email_id_foreign` (`email_id`),
  KEY `email_group_email_addresses_email_address_id_foreign` (`email_address_id`),
  CONSTRAINT `email_group_email_addresses_email_address_id_foreign` FOREIGN KEY (`email_address_id`) REFERENCES `email_addresses` (`id`),
  CONSTRAINT `email_group_email_addresses_email_id_foreign` FOREIGN KEY (`email_id`) REFERENCES `emails` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `email_templates_created_by_id_foreign` (`created_by_id`),
  KEY `email_templates_default_attachment_document_id_foreign` (`default_attachment_document_id`),
  CONSTRAINT `email_templates_created_by_id_foreign` FOREIGN KEY (`created_by_id`) REFERENCES `users` (`id`),
  CONSTRAINT `email_templates_default_attachment_document_id_foreign` FOREIGN KEY (`default_attachment_document_id`) REFERENCES `documents` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `emails_mailbox_id_foreign` (`mailbox_id`),
  KEY `emails_closed_by_id_foreign` (`closed_by_id`),
  KEY `emails_intake_id_foreign` (`intake_id`),
  KEY `emails_responsible_user_id_foreign` (`responsible_user_id`),
  KEY `emails_responsible_team_id_foreign` (`responsible_team_id`),
  KEY `emails_task_id_foreign` (`task_id`),
  KEY `emails_quotation_request_id_foreign` (`quotation_request_id`),
  KEY `emails_measure_id_foreign` (`measure_id`),
  KEY `emails_opportunity_id_foreign` (`opportunity_id`),
  KEY `emails_order_id_foreign` (`order_id`),
  KEY `emails_invoice_id_foreign` (`invoice_id`),
  KEY `emails_contact_group_id_foreign` (`contact_group_id`),
  KEY `emails_project_id_foreign` (`project_id`),
  KEY `emails_removed_by_id_foreign` (`removed_by_id`),
  KEY `emails_folder_index` (`folder`),
  KEY `idx_emails_advanced` (`folder`,`mailbox_id`,`deleted_at`,`date_sent`,`from`,`status`,`subject_for_filter`,`responsible_user_id`,`responsible_team_id`),
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `energy_label_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `energy_label_status` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `energy_supply_statuses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `energy_supply_statuses` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `energy_supply_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `energy_supply_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `faq_measure_measure_id_foreign` (`measure_id`),
  CONSTRAINT `faq_measure_measure_id_foreign` FOREIGN KEY (`measure_id`) REFERENCES `measures` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `foc_unique_overview_contact` (`financial_overview_id`,`contact_id`),
  KEY `financial_overview_contacts_contact_id_foreign` (`contact_id`),
  KEY `foc_document_template_fo_id_foreign` (`document_template_financial_overview_id`),
  KEY `foc_email_template_fo_id_foreign` (`email_template_financial_overview_id`),
  CONSTRAINT `financial_overview_contacts_contact_id_foreign` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`id`),
  CONSTRAINT `foc_document_template_fo_id_foreign` FOREIGN KEY (`document_template_financial_overview_id`) REFERENCES `document_templates` (`id`),
  CONSTRAINT `foc_email_template_fo_id_foreign` FOREIGN KEY (`email_template_financial_overview_id`) REFERENCES `email_templates` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `fopp_unique_overviewproject_participantproject` (`financial_overview_project_id`,`participant_project_id`),
  KEY `pp_id_foreign` (`participant_project_id`),
  KEY `financial_overview_participant_projects_contact_id_foreign` (`contact_id`),
  KEY `fopp_project_contact_status_idx` (`financial_overview_project_id`,`contact_id`,`status_id`),
  CONSTRAINT `financial_overview_participant_projects_contact_id_foreign` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`id`),
  CONSTRAINT `fop_id_foreign` FOREIGN KEY (`financial_overview_project_id`) REFERENCES `financial_overview_projects` (`id`),
  CONSTRAINT `pp_id_foreign` FOREIGN KEY (`participant_project_id`) REFERENCES `participation_project` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `fo_post_id_foreign` (`financial_overview_id`),
  CONSTRAINT `fo_post_id_foreign` FOREIGN KEY (`financial_overview_id`) REFERENCES `financial_overviews` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `fo_id_foreign` (`financial_overview_id`),
  KEY `financial_overview_projects_project_id_foreign` (`project_id`),
  CONSTRAINT `financial_overview_projects_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`),
  CONSTRAINT `fo_id_foreign` FOREIGN KEY (`financial_overview_id`) REFERENCES `financial_overviews` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `financial_overviews_administration_id_foreign` (`administration_id`),
  KEY `financial_overviews_document_template_fo_id_foreign` (`document_template_financial_overview_id`),
  KEY `financial_overviews_email_template_fo_id_foreign` (`email_template_financial_overview_id`),
  CONSTRAINT `financial_overviews_administration_id_foreign` FOREIGN KEY (`administration_id`) REFERENCES `administrations` (`id`),
  CONSTRAINT `financial_overviews_document_template_fo_id_foreign` FOREIGN KEY (`document_template_financial_overview_id`) REFERENCES `document_templates` (`id`),
  CONSTRAINT `financial_overviews_email_template_fo_id_foreign` FOREIGN KEY (`email_template_financial_overview_id`) REFERENCES `email_templates` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `foc_id_foreign` (`financial_overview_contact_id`),
  CONSTRAINT `foc_id_foreign` FOREIGN KEY (`financial_overview_contact_id`) REFERENCES `financial_overview_contacts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `free_fields_field_log_free_fields_field_record_id_foreign` (`free_fields_field_record_id`),
  KEY `free_fields_field_log_portal_user_id_foreign` (`portal_user_id`),
  KEY `free_fields_field_log_user_id_foreign` (`user_id`),
  CONSTRAINT `free_fields_field_log_free_fields_field_record_id_foreign` FOREIGN KEY (`free_fields_field_record_id`) REFERENCES `free_fields_field_records` (`id`),
  CONSTRAINT `free_fields_field_log_portal_user_id_foreign` FOREIGN KEY (`portal_user_id`) REFERENCES `portal_users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `free_fields_field_log_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `free_fields_field_records_field_id_foreign` (`field_id`),
  KEY `free_fields_field_records_table_record_id_index` (`table_record_id`),
  CONSTRAINT `free_fields_field_records_field_id_foreign` FOREIGN KEY (`field_id`) REFERENCES `free_fields_fields` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `free_fields_fields_table_id_foreign` (`table_id`),
  KEY `free_fields_fields_field_format_id_foreign` (`field_format_id`),
  CONSTRAINT `free_fields_fields_field_format_id_foreign` FOREIGN KEY (`field_format_id`) REFERENCES `free_fields_field_formats` (`id`),
  CONSTRAINT `free_fields_fields_table_id_foreign` FOREIGN KEY (`table_id`) REFERENCES `free_fields_tables` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `group_participant_pivot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `group_participant_pivot` (
  `participant_id` int(10) unsigned NOT NULL,
  `contact_group_id` int(10) unsigned NOT NULL,
  UNIQUE KEY `group_participant_pivot_participant_id_contact_group_id_unique` (`participant_id`,`contact_group_id`),
  KEY `group_participant_pivot_contact_group_id_foreign` (`contact_group_id`),
  CONSTRAINT `group_participant_pivot_contact_group_id_foreign` FOREIGN KEY (`contact_group_id`) REFERENCES `contact_groups` (`id`),
  CONSTRAINT `group_participant_pivot_participant_id_foreign` FOREIGN KEY (`participant_id`) REFERENCES `participation_project` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `housing_file_housing_statuses_housing_file_id_foreign` (`housing_file_id`),
  KEY `housing_file_housing_statuses_housing_file_hoom_links_id_foreign` (`housing_file_hoom_links_id`),
  CONSTRAINT `housing_file_housing_statuses_housing_file_hoom_links_id_foreign` FOREIGN KEY (`housing_file_hoom_links_id`) REFERENCES `housing_file_hoom_links` (`id`),
  CONSTRAINT `housing_file_housing_statuses_housing_file_id_foreign` FOREIGN KEY (`housing_file_id`) REFERENCES `housing_files` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `housing_file_log_housing_file_id_foreign` (`housing_file_id`),
  KEY `housing_file_log_user_id_foreign` (`user_id`),
  CONSTRAINT `housing_file_log_housing_file_id_foreign` FOREIGN KEY (`housing_file_id`) REFERENCES `housing_files` (`id`),
  CONSTRAINT `housing_file_log_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `housing_file_measure_taken_address_id_measure_id_unique` (`address_id`,`measure_id`),
  UNIQUE KEY `housing_file_measure_taken_id_unique` (`id`),
  KEY `housing_file_measure_taken_measure_id_foreign` (`measure_id`),
  CONSTRAINT `housing_file_measure_taken_address_id_foreign` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`id`),
  CONSTRAINT `housing_file_measure_taken_measure_id_foreign` FOREIGN KEY (`measure_id`) REFERENCES `measures` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `housing_file_specification_floors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `housing_file_specification_floors` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `housing_file_specification_floors_id_unique` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `housing_file_specification_sides`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `housing_file_specification_sides` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `housing_file_specification_sides_id_unique` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `housing_file_specification_statuses_id_unique` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `housing_file_specifications_id_unique` (`id`),
  KEY `housing_file_specifications_housing_file_id_foreign` (`housing_file_id`),
  KEY `housing_file_specifications_measure_id_foreign` (`measure_id`),
  KEY `housing_file_specifications_status_id_foreign` (`status_id`),
  KEY `housing_file_specifications_floor_id_foreign` (`floor_id`),
  KEY `housing_file_specifications_side_id_foreign` (`side_id`),
  KEY `housing_file_specifications_campaign_id_foreign` (`campaign_id`),
  CONSTRAINT `housing_file_specifications_campaign_id_foreign` FOREIGN KEY (`campaign_id`) REFERENCES `campaigns` (`id`),
  CONSTRAINT `housing_file_specifications_floor_id_foreign` FOREIGN KEY (`floor_id`) REFERENCES `housing_file_specification_floors` (`id`),
  CONSTRAINT `housing_file_specifications_housing_file_id_foreign` FOREIGN KEY (`housing_file_id`) REFERENCES `housing_files` (`id`),
  CONSTRAINT `housing_file_specifications_measure_id_foreign` FOREIGN KEY (`measure_id`) REFERENCES `measures` (`id`),
  CONSTRAINT `housing_file_specifications_side_id_foreign` FOREIGN KEY (`side_id`) REFERENCES `housing_file_specification_sides` (`id`),
  CONSTRAINT `housing_file_specifications_status_id_foreign` FOREIGN KEY (`status_id`) REFERENCES `housing_file_specification_statuses` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `housing_files_address_id_foreign` (`address_id`),
  KEY `housing_files_building_type_id_foreign` (`building_type_id`),
  KEY `housing_files_roof_type_id_foreign` (`roof_type_id`),
  KEY `housing_files_energy_label_id_foreign` (`energy_label_id`),
  KEY `housing_files_energy_label_status_id_foreign` (`energy_label_status_id`),
  KEY `housing_files_created_by_id_foreign` (`created_by_id`),
  KEY `housing_files_updated_by_id_foreign` (`updated_by_id`),
  CONSTRAINT `housing_files_address_id_foreign` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`id`),
  CONSTRAINT `housing_files_building_type_id_foreign` FOREIGN KEY (`building_type_id`) REFERENCES `building_types` (`id`),
  CONSTRAINT `housing_files_created_by_id_foreign` FOREIGN KEY (`created_by_id`) REFERENCES `users` (`id`),
  CONSTRAINT `housing_files_energy_label_id_foreign` FOREIGN KEY (`energy_label_id`) REFERENCES `energy_labels` (`id`),
  CONSTRAINT `housing_files_energy_label_status_id_foreign` FOREIGN KEY (`energy_label_status_id`) REFERENCES `energy_label_status` (`id`),
  CONSTRAINT `housing_files_roof_type_id_foreign` FOREIGN KEY (`roof_type_id`) REFERENCES `roof_types` (`id`),
  CONSTRAINT `housing_files_updated_by_id_foreign` FOREIGN KEY (`updated_by_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `industries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `industries` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `intake_measure_requested_id_unique` (`id`),
  UNIQUE KEY `intake_measure_requested_intake_id_measure_category_id_unique` (`intake_id`,`measure_category_id`),
  KEY `intake_measure_requested_measure_category_id_foreign` (`measure_category_id`),
  CONSTRAINT `intake_measure_requested_intake_id_foreign` FOREIGN KEY (`intake_id`) REFERENCES `intakes` (`id`),
  CONSTRAINT `intake_measure_requested_measure_category_id_foreign` FOREIGN KEY (`measure_category_id`) REFERENCES `measure_categories` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `intake_reason`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `intake_reason` (
  `reason_id` int(10) unsigned NOT NULL,
  `intake_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  UNIQUE KEY `intake_reason_reason_id_intake_id_unique` (`reason_id`,`intake_id`),
  KEY `intake_reason_intake_id_foreign` (`intake_id`),
  CONSTRAINT `intake_reason_intake_id_foreign` FOREIGN KEY (`intake_id`) REFERENCES `intakes` (`id`),
  CONSTRAINT `intake_reason_reason_id_foreign` FOREIGN KEY (`reason_id`) REFERENCES `reasons` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `intake_source`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `intake_source` (
  `source_id` int(10) unsigned NOT NULL,
  `intake_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  UNIQUE KEY `intake_source_source_id_intake_id_unique` (`source_id`,`intake_id`),
  KEY `intake_source_intake_id_foreign` (`intake_id`),
  CONSTRAINT `intake_source_intake_id_foreign` FOREIGN KEY (`intake_id`) REFERENCES `intakes` (`id`),
  CONSTRAINT `intake_source_source_id_foreign` FOREIGN KEY (`source_id`) REFERENCES `sources` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `intakes_contact_id_foreign` (`contact_id`),
  KEY `intakes_address_id_foreign` (`address_id`),
  KEY `intakes_intake_status_id_foreign` (`intake_status_id`),
  KEY `intakes_campaign_id_foreign` (`campaign_id`),
  KEY `intakes_created_by_id_foreign` (`created_by_id`),
  KEY `intakes_updated_by_id_foreign` (`updated_by_id`),
  CONSTRAINT `intakes_address_id_foreign` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`id`),
  CONSTRAINT `intakes_campaign_id_foreign` FOREIGN KEY (`campaign_id`) REFERENCES `campaigns` (`id`),
  CONSTRAINT `intakes_contact_id_foreign` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`id`),
  CONSTRAINT `intakes_created_by_id_foreign` FOREIGN KEY (`created_by_id`) REFERENCES `users` (`id`),
  CONSTRAINT `intakes_intake_status_id_foreign` FOREIGN KEY (`intake_status_id`) REFERENCES `intake_status` (`id`),
  CONSTRAINT `intakes_updated_by_id_foreign` FOREIGN KEY (`updated_by_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `invoice_document_invoice_id_foreign` (`invoice_id`),
  CONSTRAINT `invoice_document_invoice_id_foreign` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `invoice_mollie_payments_invoice_id_foreign` (`invoice_id`),
  CONSTRAINT `invoice_mollie_payments_invoice_id_foreign` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `invoice_payment_invoice_id_foreign` (`invoice_id`),
  CONSTRAINT `invoice_payment_invoice_id_foreign` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `invoice_post_administration_id_foreign` (`administration_id`),
  CONSTRAINT `invoice_post_administration_id_foreign` FOREIGN KEY (`administration_id`) REFERENCES `administrations` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `invoice_product_product_id_foreign` (`product_id`),
  KEY `invoice_product_invoice_id_foreign` (`invoice_id`),
  CONSTRAINT `invoice_product_invoice_id_foreign` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`),
  CONSTRAINT `invoice_product_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `invoices_order_id_foreign` (`order_id`),
  KEY `invoices_administration_id_foreign` (`administration_id`),
  KEY `invoices_created_by_id_foreign` (`created_by_id`),
  KEY `invoices_sepa_id_foreign` (`sepa_id`),
  CONSTRAINT `invoices_administration_id_foreign` FOREIGN KEY (`administration_id`) REFERENCES `administrations` (`id`),
  CONSTRAINT `invoices_created_by_id_foreign` FOREIGN KEY (`created_by_id`) REFERENCES `users` (`id`),
  CONSTRAINT `invoices_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `invoices_sepa_id_foreign` FOREIGN KEY (`sepa_id`) REFERENCES `sepas` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `invoices_to_send_invoice_id_foreign` (`invoice_id`),
  CONSTRAINT `invoices_to_send_invoice_id_foreign` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `jobs_log_user_id_foreign` (`user_id`),
  CONSTRAINT `jobs_log_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `last_name_prefixes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `last_name_prefixes` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(16) NOT NULL DEFAULT '',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `ledgers_vat_code_id_foreign` (`vat_code_id`),
  CONSTRAINT `ledgers_vat_code_id_foreign` FOREIGN KEY (`vat_code_id`) REFERENCES `vat_codes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `mailbox_ignores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `mailbox_ignores` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `mailbox_id` int(10) unsigned NOT NULL,
  `value` varchar(191) DEFAULT NULL,
  `type_id` varchar(191) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `mailbox_ignores_mailbox_id_foreign` (`mailbox_id`),
  CONSTRAINT `mailbox_ignores_mailbox_id_foreign` FOREIGN KEY (`mailbox_id`) REFERENCES `mailboxes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `mailbox_gmail_api_settings_mailbox_id_foreign` (`mailbox_id`),
  CONSTRAINT `mailbox_gmail_api_settings_mailbox_id_foreign` FOREIGN KEY (`mailbox_id`) REFERENCES `mailboxes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `mailbox_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `mailbox_user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `mailbox_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `mailbox_user_mailbox_id_foreign` (`mailbox_id`),
  KEY `mailbox_user_user_id_foreign` (`user_id`),
  CONSTRAINT `mailbox_user_mailbox_id_foreign` FOREIGN KEY (`mailbox_id`) REFERENCES `mailboxes` (`id`),
  CONSTRAINT `mailbox_user_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `mailboxes_mailgun_domain_id_foreign` (`mailgun_domain_id`),
  KEY `idx_mailboxes_name` (`id`,`name`),
  CONSTRAINT `mailboxes_mailgun_domain_id_foreign` FOREIGN KEY (`mailgun_domain_id`) REFERENCES `mailgun_domains` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `mailgun_events_mailgun_domain_id_foreign` (`mailgun_domain_id`),
  CONSTRAINT `mailgun_events_mailgun_domain_id_foreign` FOREIGN KEY (`mailgun_domain_id`) REFERENCES `mailgun_domains` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `measure_categories_email_template_id_wf_cqr_foreign` (`email_template_id_wf_create_quotation_request`),
  KEY `measure_categories_organisation_id_wf_cqr_foreign` (`organisation_id_wf_create_quotation_request`),
  KEY `measure_categories_measure_id_wf_co_foreign` (`measure_id_wf_create_opportunity`),
  KEY `measure_categories_opportunity_status_id_wf_cqr_foreign` (`opportunity_status_id_wf_create_opportunity`),
  CONSTRAINT `measure_categories_email_template_id_wf_cqr_foreign` FOREIGN KEY (`email_template_id_wf_create_quotation_request`) REFERENCES `email_templates` (`id`),
  CONSTRAINT `measure_categories_measure_id_wf_co_foreign` FOREIGN KEY (`measure_id_wf_create_opportunity`) REFERENCES `measures` (`id`),
  CONSTRAINT `measure_categories_opportunity_status_id_wf_cqr_foreign` FOREIGN KEY (`opportunity_status_id_wf_create_opportunity`) REFERENCES `opportunity_status` (`id`),
  CONSTRAINT `measure_categories_organisation_id_wf_cqr_foreign` FOREIGN KEY (`organisation_id_wf_create_quotation_request`) REFERENCES `organisations` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `measure_opportunity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `measure_opportunity` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `opportunity_id` int(10) unsigned DEFAULT NULL,
  `measure_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `measure_opportunity_opportunity_id_measure_id_unique` (`opportunity_id`,`measure_id`),
  KEY `measure_opportunity_measure_id_foreign` (`measure_id`),
  CONSTRAINT `measure_opportunity_measure_id_foreign` FOREIGN KEY (`measure_id`) REFERENCES `measures` (`id`),
  CONSTRAINT `measure_opportunity_opportunity_id_foreign` FOREIGN KEY (`opportunity_id`) REFERENCES `opportunities` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `measures_created_by_id_foreign` (`created_by_id`),
  KEY `measures_updated_by_id_foreign` (`updated_by_id`),
  KEY `measures_measure_category_id_foreign` (`measure_category_id`),
  CONSTRAINT `measures_created_by_id_foreign` FOREIGN KEY (`created_by_id`) REFERENCES `users` (`id`),
  CONSTRAINT `measures_measure_category_id_foreign` FOREIGN KEY (`measure_category_id`) REFERENCES `measure_categories` (`id`),
  CONSTRAINT `measures_updated_by_id_foreign` FOREIGN KEY (`updated_by_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(191) NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `model_has_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `model_has_permissions` (
  `permission_id` int(10) unsigned NOT NULL,
  `model_type` varchar(191) NOT NULL,
  `model_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  KEY `model_has_permissions_model_type_model_id_index` (`model_type`,`model_id`),
  CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `model_has_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `model_has_roles` (
  `role_id` int(10) unsigned NOT NULL,
  `model_type` varchar(191) NOT NULL,
  `model_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  KEY `model_has_roles_model_type_model_id_index` (`model_type`,`model_id`),
  CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `oauth_access_tokens_user_id_index` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `oauth_auth_codes_user_id_index` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `oauth_clients_user_id_index` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `oauth_personal_access_clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth_personal_access_clients` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `client_id` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `oauth_refresh_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth_refresh_tokens` (
  `id` varchar(100) NOT NULL,
  `access_token_id` varchar(100) NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_refresh_tokens_access_token_id_index` (`access_token_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `obligation_numbers_number_participation_id_unique` (`number`,`participation_id`),
  KEY `obligation_numbers_participation_id_foreign` (`participation_id`),
  CONSTRAINT `obligation_numbers_participation_id_foreign` FOREIGN KEY (`participation_id`) REFERENCES `participation_project` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_3_keys` (`occupation_id`,`primary_contact_id`,`contact_id`),
  KEY `occupation_contact_primary_contact_id_foreign` (`primary_contact_id`),
  KEY `occupation_contact_contact_id_foreign` (`contact_id`),
  CONSTRAINT `occupation_contact_contact_id_foreign` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`id`),
  CONSTRAINT `occupation_contact_occupation_id_foreign` FOREIGN KEY (`occupation_id`) REFERENCES `occupations` (`id`),
  CONSTRAINT `occupation_contact_primary_contact_id_foreign` FOREIGN KEY (`primary_contact_id`) REFERENCES `contacts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `opportunities_status_id_foreign` (`status_id`),
  KEY `opportunities_intake_id_foreign` (`intake_id`),
  KEY `opportunities_created_by_id_foreign` (`created_by_id`),
  KEY `opportunities_updated_by_id_foreign` (`updated_by_id`),
  KEY `opportunities_measure_category_id_foreign` (`measure_category_id`),
  KEY `opportunities_housing_file_specification_id_foreign` (`housing_file_specification_id`),
  CONSTRAINT `opportunities_created_by_id_foreign` FOREIGN KEY (`created_by_id`) REFERENCES `users` (`id`),
  CONSTRAINT `opportunities_housing_file_specification_id_foreign` FOREIGN KEY (`housing_file_specification_id`) REFERENCES `housing_file_specifications` (`id`),
  CONSTRAINT `opportunities_intake_id_foreign` FOREIGN KEY (`intake_id`) REFERENCES `intakes` (`id`),
  CONSTRAINT `opportunities_measure_category_id_foreign` FOREIGN KEY (`measure_category_id`) REFERENCES `measure_categories` (`id`),
  CONSTRAINT `opportunities_status_id_foreign` FOREIGN KEY (`status_id`) REFERENCES `opportunity_status` (`id`),
  CONSTRAINT `opportunities_updated_by_id_foreign` FOREIGN KEY (`updated_by_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `opportunity_actions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `opportunity_actions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `code_ref` varchar(191) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `opportunity_evaluation_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `opportunity_evaluation_status` (
  `id` int(10) unsigned NOT NULL,
  `name` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `opportunity_status_email_template_id_wf_foreign` (`email_template_id_wf`),
  CONSTRAINT `opportunity_status_email_template_id_wf_foreign` FOREIGN KEY (`email_template_id_wf`) REFERENCES `email_templates` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `order_product_product_id_foreign` (`product_id`),
  KEY `order_product_order_id_foreign` (`order_id`),
  KEY `order_product_cost_center_id_foreign` (`cost_center_id`),
  CONSTRAINT `order_product_cost_center_id_foreign` FOREIGN KEY (`cost_center_id`) REFERENCES `cost_centers` (`id`),
  CONSTRAINT `order_product_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `order_product_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `orders_contact_id_foreign` (`contact_id`),
  KEY `orders_administration_id_foreign` (`administration_id`),
  KEY `orders_email_template_reminder_id_foreign` (`email_template_reminder_id`),
  KEY `orders_email_template_exhortation_id_foreign` (`email_template_exhortation_id`),
  KEY `orders_created_by_id_foreign` (`created_by_id`),
  KEY `orders_email_template_id_collection_foreign` (`email_template_id_collection`),
  KEY `orders_email_template_id_transfer_foreign` (`email_template_id_transfer`),
  KEY `orders_participation_id_foreign` (`participation_id`),
  CONSTRAINT `orders_administration_id_foreign` FOREIGN KEY (`administration_id`) REFERENCES `administrations` (`id`),
  CONSTRAINT `orders_contact_id_foreign` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`id`),
  CONSTRAINT `orders_created_by_id_foreign` FOREIGN KEY (`created_by_id`) REFERENCES `users` (`id`),
  CONSTRAINT `orders_email_template_exhortation_id_foreign` FOREIGN KEY (`email_template_exhortation_id`) REFERENCES `email_templates` (`id`),
  CONSTRAINT `orders_email_template_id_collection_foreign` FOREIGN KEY (`email_template_id_collection`) REFERENCES `email_templates` (`id`),
  CONSTRAINT `orders_email_template_id_transfer_foreign` FOREIGN KEY (`email_template_id_transfer`) REFERENCES `email_templates` (`id`),
  CONSTRAINT `orders_email_template_reminder_id_foreign` FOREIGN KEY (`email_template_reminder_id`) REFERENCES `email_templates` (`id`),
  CONSTRAINT `orders_participation_id_foreign` FOREIGN KEY (`participation_id`) REFERENCES `participation_project` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `organisation_delivers_measure`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `organisation_delivers_measure` (
  `measure_id` int(10) unsigned NOT NULL,
  `organisation_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`measure_id`,`organisation_id`),
  KEY `organisation_delivers_measure_organisation_id_foreign` (`organisation_id`),
  CONSTRAINT `organisation_delivers_measure_measure_id_foreign` FOREIGN KEY (`measure_id`) REFERENCES `measures` (`id`),
  CONSTRAINT `organisation_delivers_measure_organisation_id_foreign` FOREIGN KEY (`organisation_id`) REFERENCES `organisations` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `organisation_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `organisation_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `organisations_contact_id_foreign` (`contact_id`),
  KEY `organisations_type_id_foreign` (`type_id`),
  KEY `organisations_industry_id_foreign` (`industry_id`),
  CONSTRAINT `organisations_contact_id_foreign` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`id`),
  CONSTRAINT `organisations_industry_id_foreign` FOREIGN KEY (`industry_id`) REFERENCES `industries` (`id`),
  CONSTRAINT `organisations_type_id_foreign` FOREIGN KEY (`type_id`) REFERENCES `organisation_types` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `pmmp_participant_mutation_id_foreign` (`participant_mutation_id`),
  CONSTRAINT `pmmp_participant_mutation_id_foreign` FOREIGN KEY (`participant_mutation_id`) REFERENCES `participant_mutations` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `participant_mutation_mutation_status_log` (`participant_mutation_id`),
  KEY `participant_mutation_statuses_log_from_status_id_foreign` (`from_status_id`),
  KEY `participant_mutation_statuses_log_to_status_id_foreign` (`to_status_id`),
  KEY `participant_mutation_statuses_log_created_by_id_foreign` (`created_by_id`),
  CONSTRAINT `participant_mutation_mutation_status_log` FOREIGN KEY (`participant_mutation_id`) REFERENCES `participant_mutations` (`id`),
  CONSTRAINT `participant_mutation_statuses_log_created_by_id_foreign` FOREIGN KEY (`created_by_id`) REFERENCES `users` (`id`),
  CONSTRAINT `participant_mutation_statuses_log_from_status_id_foreign` FOREIGN KEY (`from_status_id`) REFERENCES `participant_mutation_statuses` (`id`),
  CONSTRAINT `participant_mutation_statuses_log_to_status_id_foreign` FOREIGN KEY (`to_status_id`) REFERENCES `participant_mutation_statuses` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `participant_mutations_participation_id_foreign` (`participation_id`),
  KEY `participant_mutations_type_id_foreign` (`type_id`),
  KEY `participant_mutations_status_id_foreign` (`status_id`),
  KEY `participant_mutations_created_by_id_foreign` (`created_by_id`),
  KEY `participant_mutations_updated_by_id_foreign` (`updated_by_id`),
  CONSTRAINT `participant_mutations_created_by_id_foreign` FOREIGN KEY (`created_by_id`) REFERENCES `users` (`id`),
  CONSTRAINT `participant_mutations_participation_id_foreign` FOREIGN KEY (`participation_id`) REFERENCES `participation_project` (`id`),
  CONSTRAINT `participant_mutations_status_id_foreign` FOREIGN KEY (`status_id`) REFERENCES `participant_mutation_statuses` (`id`),
  CONSTRAINT `participant_mutations_type_id_foreign` FOREIGN KEY (`type_id`) REFERENCES `participant_mutation_types` (`id`),
  CONSTRAINT `participant_mutations_updated_by_id_foreign` FOREIGN KEY (`updated_by_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `participant_project_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `participant_project_status` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `participant_transaction_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `participant_transaction_type` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `participant_transactions_participation_id_foreign` (`participation_id`),
  KEY `participant_transactions_type_id_foreign` (`type_id`),
  KEY `participant_transactions_created_by_id_foreign` (`created_by_id`),
  CONSTRAINT `participant_transactions_created_by_id_foreign` FOREIGN KEY (`created_by_id`) REFERENCES `users` (`id`),
  CONSTRAINT `participant_transactions_participation_id_foreign` FOREIGN KEY (`participation_id`) REFERENCES `participation_project` (`id`),
  CONSTRAINT `participant_transactions_type_id_foreign` FOREIGN KEY (`type_id`) REFERENCES `participant_transaction_type` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `participation_project_project_id_foreign` (`project_id`),
  KEY `participation_project_contact_id_foreign` (`contact_id`),
  KEY `participation_project_gifted_by_contact_id_foreign` (`gifted_by_contact_id`),
  KEY `participation_project_legal_rep_contact_id_foreign` (`legal_rep_contact_id`),
  KEY `participation_project_status_id_foreign` (`status_id`),
  KEY `participation_project_type_id_foreign` (`type_id`),
  KEY `participation_project_created_by_id_foreign` (`created_by_id`),
  KEY `participation_project_updated_by_id_foreign` (`updated_by_id`),
  KEY `participation_project_address_id_foreign` (`address_id`),
  CONSTRAINT `participation_project_address_id_foreign` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`id`),
  CONSTRAINT `participation_project_contact_id_foreign` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`id`),
  CONSTRAINT `participation_project_created_by_id_foreign` FOREIGN KEY (`created_by_id`) REFERENCES `users` (`id`),
  CONSTRAINT `participation_project_gifted_by_contact_id_foreign` FOREIGN KEY (`gifted_by_contact_id`) REFERENCES `contacts` (`id`),
  CONSTRAINT `participation_project_legal_rep_contact_id_foreign` FOREIGN KEY (`legal_rep_contact_id`) REFERENCES `contacts` (`id`),
  CONSTRAINT `participation_project_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`),
  CONSTRAINT `participation_project_status_id_foreign` FOREIGN KEY (`status_id`) REFERENCES `participant_project_status` (`id`),
  CONSTRAINT `participation_project_updated_by_id_foreign` FOREIGN KEY (`updated_by_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_resets` (
  `email` varchar(191) NOT NULL,
  `token` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `payment_invoices_revenue_distribution_id_foreign` (`revenue_distribution_id`),
  KEY `payment_invoices_administration_id_foreign` (`administration_id`),
  KEY `payment_invoices_created_by_id_foreign` (`created_by_id`),
  KEY `payment_invoices_sepa_id_foreign` (`sepa_id`),
  CONSTRAINT `payment_invoices_administration_id_foreign` FOREIGN KEY (`administration_id`) REFERENCES `administrations` (`id`),
  CONSTRAINT `payment_invoices_created_by_id_foreign` FOREIGN KEY (`created_by_id`) REFERENCES `users` (`id`),
  CONSTRAINT `payment_invoices_revenue_distribution_id_foreign` FOREIGN KEY (`revenue_distribution_id`) REFERENCES `project_revenue_distribution` (`id`),
  CONSTRAINT `payment_invoices_sepa_id_foreign` FOREIGN KEY (`sepa_id`) REFERENCES `sepas` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `people_contact_id_foreign` (`contact_id`),
  KEY `people_last_name_prefix_id_foreign` (`last_name_prefix`),
  KEY `people_title_id_foreign` (`title_id`),
  KEY `people_organisation_id_foreign` (`organisation_id`),
  KEY `people_type_id_foreign` (`type_id`),
  CONSTRAINT `people_contact_id_foreign` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`id`),
  CONSTRAINT `people_organisation_id_foreign` FOREIGN KEY (`organisation_id`) REFERENCES `organisations` (`id`),
  CONSTRAINT `people_title_id_foreign` FOREIGN KEY (`title_id`) REFERENCES `titles` (`id`),
  CONSTRAINT `people_type_id_foreign` FOREIGN KEY (`type_id`) REFERENCES `person_types` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `person_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `person_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL DEFAULT '',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `phone_numbers_contact_id_foreign` (`contact_id`),
  CONSTRAINT `phone_numbers_contact_id_foreign` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `portal_free_fields_fields_page_id_foreign` (`page_id`),
  KEY `portal_free_fields_fields_field_id_foreign` (`field_id`),
  CONSTRAINT `portal_free_fields_fields_field_id_foreign` FOREIGN KEY (`field_id`) REFERENCES `free_fields_fields` (`id`),
  CONSTRAINT `portal_free_fields_fields_page_id_foreign` FOREIGN KEY (`page_id`) REFERENCES `portal_free_fields_pages` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `portal_password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `portal_password_resets` (
  `email` varchar(191) NOT NULL,
  `token` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `portal_password_resets_email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `portal_settings_responsible_user_id_foreign` (`responsible_user_id`),
  KEY `portal_settings_contact_responsible_owner_user_id_foreign` (`contact_responsible_owner_user_id`),
  KEY `portal_settings_check_contact_task_responsible_user_id_foreign` (`check_contact_task_responsible_user_id`),
  KEY `portal_settings_check_contact_task_responsible_team_id_foreign` (`check_contact_task_responsible_team_id`),
  KEY `portal_settings_email_template_new_account_id_foreign` (`email_template_new_account_id`),
  KEY `portal_settings_default_contact_group_member_id_foreign` (`default_contact_group_member_id`),
  KEY `portal_settings_default_contact_group_no_member_id_foreign` (`default_contact_group_no_member_id`),
  KEY `portal_settings_default_administration_id_foreign` (`default_administration_id`),
  CONSTRAINT `portal_settings_check_contact_task_responsible_team_id_foreign` FOREIGN KEY (`check_contact_task_responsible_team_id`) REFERENCES `teams` (`id`),
  CONSTRAINT `portal_settings_check_contact_task_responsible_user_id_foreign` FOREIGN KEY (`check_contact_task_responsible_user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `portal_settings_contact_responsible_owner_user_id_foreign` FOREIGN KEY (`contact_responsible_owner_user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `portal_settings_default_administration_id_foreign` FOREIGN KEY (`default_administration_id`) REFERENCES `administrations` (`id`),
  CONSTRAINT `portal_settings_default_contact_group_member_id_foreign` FOREIGN KEY (`default_contact_group_member_id`) REFERENCES `contact_groups` (`id`),
  CONSTRAINT `portal_settings_default_contact_group_no_member_id_foreign` FOREIGN KEY (`default_contact_group_no_member_id`) REFERENCES `contact_groups` (`id`),
  CONSTRAINT `portal_settings_email_template_new_account_id_foreign` FOREIGN KEY (`email_template_new_account_id`) REFERENCES `email_templates` (`id`),
  CONSTRAINT `portal_settings_responsible_user_id_foreign` FOREIGN KEY (`responsible_user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `portal_sd_portal_sd_id_foreign` (`portal_settings_dashboard_id`),
  KEY `contact_groups_show_group_id_foreign` (`show_group_id`),
  KEY `contact_groups_hide_group_id_foreign` (`hide_group_id`),
  CONSTRAINT `contact_groups_hide_group_id_foreign` FOREIGN KEY (`hide_group_id`) REFERENCES `contact_groups` (`id`),
  CONSTRAINT `contact_groups_show_group_id_foreign` FOREIGN KEY (`show_group_id`) REFERENCES `contact_groups` (`id`),
  CONSTRAINT `portal_sd_portal_sd_id_foreign` FOREIGN KEY (`portal_settings_dashboard_id`) REFERENCES `portal_settings_dashboards` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `portal_two_factor_tokens_portal_user_id_foreign` (`portal_user_id`),
  CONSTRAINT `portal_two_factor_tokens_portal_user_id_foreign` FOREIGN KEY (`portal_user_id`) REFERENCES `portal_users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `portal_user_login_attempts_portal_user_id_foreign` (`portal_user_id`),
  KEY `portal_user_login_attempts_identifier_created_at_index` (`identifier`,`created_at`),
  KEY `portal_user_login_attempts_ip_index` (`ip`),
  CONSTRAINT `portal_user_login_attempts_portal_user_id_foreign` FOREIGN KEY (`portal_user_id`) REFERENCES `portal_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `portal_users_email_unique` (`email`),
  KEY `portal_users_contact_id_foreign` (`contact_id`),
  CONSTRAINT `portal_users_contact_id_foreign` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `price_history_product_product_id_foreign` (`product_id`),
  CONSTRAINT `price_history_product_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `products_administration_id_foreign` (`administration_id`),
  KEY `products_created_by_id_foreign` (`created_by_id`),
  KEY `products_ledger_id_foreign` (`ledger_id`),
  KEY `products_cost_center_id_foreign` (`cost_center_id`),
  CONSTRAINT `products_administration_id_foreign` FOREIGN KEY (`administration_id`) REFERENCES `administrations` (`id`),
  CONSTRAINT `products_cost_center_id_foreign` FOREIGN KEY (`cost_center_id`) REFERENCES `cost_centers` (`id`),
  CONSTRAINT `products_created_by_id_foreign` FOREIGN KEY (`created_by_id`) REFERENCES `users` (`id`),
  CONSTRAINT `products_ledger_id_foreign` FOREIGN KEY (`ledger_id`) REFERENCES `ledgers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `project_loan_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_loan_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `code_ref` varchar(191) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `project_revenue_distribution_contact_id_foreign` (`contact_id`),
  KEY `project_revenue_distribution_es_id_foreign` (`es_id`),
  KEY `project_revenue_distribution_participation_id_foreign` (`participation_id`),
  KEY `project_revenue_distribution_revenue_id_foreign` (`revenue_id`),
  CONSTRAINT `project_revenue_distribution_contact_id_foreign` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`id`),
  CONSTRAINT `project_revenue_distribution_es_id_foreign` FOREIGN KEY (`es_id`) REFERENCES `energy_suppliers` (`id`),
  CONSTRAINT `project_revenue_distribution_participation_id_foreign` FOREIGN KEY (`participation_id`) REFERENCES `participation_project` (`id`),
  CONSTRAINT `project_revenue_distribution_revenue_id_foreign` FOREIGN KEY (`revenue_id`) REFERENCES `project_revenues` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `project_revenue_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_revenue_type` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `project_revenues_project_id_foreign` (`project_id`),
  KEY `project_revenues_category_id_foreign` (`category_id`),
  KEY `project_revenues_created_by_id_foreign` (`created_by_id`),
  KEY `project_revenues_type_id_foreign` (`type_id`),
  KEY `project_revenues_participation_id_foreign` (`participation_id`),
  KEY `project_revenues_address_energy_supplier_id_foreign` (`address_energy_supplier_id`),
  CONSTRAINT `project_revenues_address_energy_supplier_id_foreign` FOREIGN KEY (`address_energy_supplier_id`) REFERENCES `address_energy_suppliers` (`id`),
  CONSTRAINT `project_revenues_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `project_revenue_category` (`id`),
  CONSTRAINT `project_revenues_created_by_id_foreign` FOREIGN KEY (`created_by_id`) REFERENCES `users` (`id`),
  CONSTRAINT `project_revenues_participation_id_foreign` FOREIGN KEY (`participation_id`) REFERENCES `participation_project` (`id`),
  CONSTRAINT `project_revenues_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`),
  CONSTRAINT `project_revenues_type_id_foreign` FOREIGN KEY (`type_id`) REFERENCES `project_revenue_type` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `project_value_course_project_id_foreign` (`project_id`),
  KEY `project_value_course_created_by_id_foreign` (`created_by_id`),
  CONSTRAINT `project_value_course_created_by_id_foreign` FOREIGN KEY (`created_by_id`) REFERENCES `users` (`id`),
  CONSTRAINT `project_value_course_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `projects_project_status_id_foreign` (`project_status_id`),
  KEY `projects_project_type_id_foreign` (`project_type_id`),
  KEY `projects_administration_id_foreign` (`administration_id`),
  KEY `projects_created_by_id_foreign` (`created_by_id`),
  KEY `projects_owned_by_id_foreign` (`owned_by_id`),
  KEY `projects_updated_by_id_foreign` (`updated_by_id`),
  KEY `projects_email_template_agreement_id_foreign` (`email_template_agreement_id`),
  KEY `projects_document_template_agreement_id_foreign` (`document_template_agreement_id`),
  KEY `projects_question_about_membership_group_id_foreign` (`question_about_membership_group_id`),
  KEY `projects_member_group_id_foreign` (`member_group_id`),
  KEY `projects_no_member_group_id_foreign` (`no_member_group_id`),
  KEY `projects_document_id_project_info_foreign` (`document_id_project_info`),
  KEY `projects_document_id_agree_terms_foreign` (`document_id_agree_terms`),
  KEY `projects_document_id_understand_info_foreign` (`document_id_understand_info`),
  KEY `projects_loan_type_id_foreign` (`loan_type_id`),
  KEY `projects_email_template_increase_participations_id_foreign` (`email_template_increase_participations_id`),
  KEY `projects_document_template_increase_participations_id_foreign` (`document_template_increase_participations_id`),
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `quotation_request_actions_log_quotation_request_id_foreign` (`quotation_request_id`),
  KEY `quotation_request_actions_log_contact_id_foreign` (`contact_id`),
  KEY `quotation_request_actions_log_user_id_foreign` (`user_id`),
  KEY `quotation_request_actions_log_old_status_id_foreign` (`old_status_id`),
  KEY `quotation_request_actions_log_new_status_id_foreign` (`new_status_id`),
  CONSTRAINT `quotation_request_actions_log_contact_id_foreign` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`id`),
  CONSTRAINT `quotation_request_actions_log_new_status_id_foreign` FOREIGN KEY (`new_status_id`) REFERENCES `quotation_request_status` (`id`),
  CONSTRAINT `quotation_request_actions_log_old_status_id_foreign` FOREIGN KEY (`old_status_id`) REFERENCES `quotation_request_status` (`id`),
  CONSTRAINT `quotation_request_actions_log_quotation_request_id_foreign` FOREIGN KEY (`quotation_request_id`) REFERENCES `quotation_requests` (`id`),
  CONSTRAINT `quotation_request_actions_log_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `quotation_request_status_email_template_id_wf_foreign` (`email_template_id_wf`),
  KEY `quotation_request_status_opportunity_action_id_foreign` (`opportunity_action_id`),
  CONSTRAINT `quotation_request_status_email_template_id_wf_foreign` FOREIGN KEY (`email_template_id_wf`) REFERENCES `email_templates` (`id`),
  CONSTRAINT `quotation_request_status_opportunity_action_id_foreign` FOREIGN KEY (`opportunity_action_id`) REFERENCES `opportunity_actions` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `quotation_requests_opportunity_id_foreign` (`opportunity_id`),
  KEY `quotation_requests_status_id_foreign` (`status_id`),
  KEY `quotation_requests_created_by_id_foreign` (`created_by_id`),
  KEY `quotation_requests_updated_by_id_foreign` (`updated_by_id`),
  KEY `quotation_requests_contact_id_foreign` (`contact_id`),
  KEY `quotation_requests_opportunity_action_id_foreign` (`opportunity_action_id`),
  KEY `quotation_requests_project_manager_id_foreign` (`project_manager_id`),
  KEY `quotation_requests_external_party_id_foreign` (`external_party_id`),
  KEY `quotation_requests_district_id_foreign` (`district_id`),
  CONSTRAINT `quotation_requests_contact_id_foreign` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`id`),
  CONSTRAINT `quotation_requests_created_by_id_foreign` FOREIGN KEY (`created_by_id`) REFERENCES `users` (`id`),
  CONSTRAINT `quotation_requests_district_id_foreign` FOREIGN KEY (`district_id`) REFERENCES `districts` (`id`) ON DELETE SET NULL,
  CONSTRAINT `quotation_requests_external_party_id_foreign` FOREIGN KEY (`external_party_id`) REFERENCES `contacts` (`id`),
  CONSTRAINT `quotation_requests_opportunity_action_id_foreign` FOREIGN KEY (`opportunity_action_id`) REFERENCES `opportunity_actions` (`id`),
  CONSTRAINT `quotation_requests_opportunity_id_foreign` FOREIGN KEY (`opportunity_id`) REFERENCES `opportunities` (`id`),
  CONSTRAINT `quotation_requests_project_manager_id_foreign` FOREIGN KEY (`project_manager_id`) REFERENCES `contacts` (`id`),
  CONSTRAINT `quotation_requests_status_id_foreign` FOREIGN KEY (`status_id`) REFERENCES `quotation_request_status` (`id`),
  CONSTRAINT `quotation_requests_updated_by_id_foreign` FOREIGN KEY (`updated_by_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `reasons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `reasons` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `revenue_distribution_kwh_revenue_id_foreign` (`revenue_id`),
  KEY `revenue_distribution_kwh_participation_id_foreign` (`participation_id`),
  KEY `revenue_distribution_kwh_contact_id_foreign` (`contact_id`),
  CONSTRAINT `revenue_distribution_kwh_contact_id_foreign` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`id`),
  CONSTRAINT `revenue_distribution_kwh_participation_id_foreign` FOREIGN KEY (`participation_id`) REFERENCES `participation_project` (`id`),
  CONSTRAINT `revenue_distribution_kwh_revenue_id_foreign` FOREIGN KEY (`revenue_id`) REFERENCES `revenues_kwh` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `revenue_distribution_parts_kwh_parts_id_foreign` (`parts_id`),
  KEY `revenue_distribution_parts_kwh_distribution_id_foreign` (`distribution_id`),
  KEY `revenue_distribution_parts_kwh_revenue_id_foreign` (`revenue_id`),
  KEY `revenue_distribution_parts_kwh_es_id_foreign` (`es_id`),
  CONSTRAINT `revenue_distribution_parts_kwh_distribution_id_foreign` FOREIGN KEY (`distribution_id`) REFERENCES `revenue_distribution_kwh` (`id`),
  CONSTRAINT `revenue_distribution_parts_kwh_es_id_foreign` FOREIGN KEY (`es_id`) REFERENCES `energy_suppliers` (`id`),
  CONSTRAINT `revenue_distribution_parts_kwh_parts_id_foreign` FOREIGN KEY (`parts_id`) REFERENCES `revenue_parts_kwh` (`id`),
  CONSTRAINT `revenue_distribution_parts_kwh_revenue_id_foreign` FOREIGN KEY (`revenue_id`) REFERENCES `revenues_kwh` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `revenue_distribution_values_kwh_distribution_id_foreign` (`distribution_id`),
  KEY `revenue_distribution_values_kwh_revenue_id_foreign` (`revenue_id`),
  KEY `revenue_distribution_values_kwh_parts_id_foreign` (`parts_id`),
  CONSTRAINT `revenue_distribution_values_kwh_distribution_id_foreign` FOREIGN KEY (`distribution_id`) REFERENCES `revenue_distribution_kwh` (`id`),
  CONSTRAINT `revenue_distribution_values_kwh_parts_id_foreign` FOREIGN KEY (`parts_id`) REFERENCES `revenue_parts_kwh` (`id`),
  CONSTRAINT `revenue_distribution_values_kwh_revenue_id_foreign` FOREIGN KEY (`revenue_id`) REFERENCES `revenues_kwh` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `revenue_parts_kwh_revenue_id_foreign` (`revenue_id`),
  CONSTRAINT `revenue_parts_kwh_revenue_id_foreign` FOREIGN KEY (`revenue_id`) REFERENCES `revenues_kwh` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `revenue_values_kwh_revenue_id_foreign` (`revenue_id`),
  CONSTRAINT `revenue_values_kwh_revenue_id_foreign` FOREIGN KEY (`revenue_id`) REFERENCES `revenues_kwh` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `revenues_kwh_category_id_foreign` (`category_id`),
  KEY `revenues_kwh_project_id_foreign` (`project_id`),
  KEY `revenues_kwh_created_by_id_foreign` (`created_by_id`),
  CONSTRAINT `revenues_kwh_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `project_revenue_category` (`id`),
  CONSTRAINT `revenues_kwh_created_by_id_foreign` FOREIGN KEY (`created_by_id`) REFERENCES `users` (`id`),
  CONSTRAINT `revenues_kwh_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `revisions_revisionable_id_revisionable_type_index` (`revisionable_id`,`revisionable_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `role_has_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_has_permissions` (
  `permission_id` int(10) unsigned NOT NULL,
  `role_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`permission_id`,`role_id`),
  KEY `role_has_permissions_role_id_foreign` (`role_id`),
  CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `sepas_administration_id_foreign` (`administration_id`),
  CONSTRAINT `sepas_administration_id_foreign` FOREIGN KEY (`administration_id`) REFERENCES `administrations` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  `context_json` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`context_json`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `scri_run_id_idx` (`system_check_run_id`),
  KEY `scri_entity_idx` (`entity_type`,`entity_id`),
  KEY `scri_related_entity_idx` (`related_entity_type`,`related_entity_id`),
  KEY `scri_severity_idx` (`severity`),
  CONSTRAINT `system_check_run_items_system_check_run_id_foreign` FOREIGN KEY (`system_check_run_id`) REFERENCES `system_check_runs` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `scr_batch_key_idx` (`batch_key`),
  KEY `system_check_runs_app_cooperation_name_index` (`app_cooperation_name`),
  KEY `system_check_runs_command_ref_index` (`command_ref`),
  KEY `system_check_runs_check_code_index` (`check_code`),
  KEY `system_check_runs_status_index` (`status`),
  KEY `system_check_runs_finished_index` (`finished`),
  KEY `system_check_runs_created_in_shared_index` (`created_in_shared`),
  KEY `system_check_runs_start_at_index` (`start_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `task_property_values_property_id_foreign` (`property_id`),
  KEY `task_property_values_task_id_foreign` (`task_id`),
  CONSTRAINT `task_property_values_property_id_foreign` FOREIGN KEY (`property_id`) REFERENCES `task_properties` (`id`),
  CONSTRAINT `task_property_values_task_id_foreign` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `task_types_email_template_id_wf_expired_task_foreign` (`email_template_id_wf_expired_task`),
  KEY `task_types_email_template_id_wf_completed_task_foreign` (`email_template_id_wf_completed_task`),
  KEY `task_types_email_template_id_wf_new_task_foreign` (`email_template_id_wf_new_task`),
  CONSTRAINT `task_types_email_template_id_wf_completed_task_foreign` FOREIGN KEY (`email_template_id_wf_completed_task`) REFERENCES `email_templates` (`id`),
  CONSTRAINT `task_types_email_template_id_wf_expired_task_foreign` FOREIGN KEY (`email_template_id_wf_expired_task`) REFERENCES `email_templates` (`id`),
  CONSTRAINT `task_types_email_template_id_wf_new_task_foreign` FOREIGN KEY (`email_template_id_wf_new_task`) REFERENCES `email_templates` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `tasks_type_id_foreign` (`type_id`),
  KEY `tasks_contact_id_foreign` (`contact_id`),
  KEY `tasks_intake_id_foreign` (`intake_id`),
  KEY `tasks_contact_group_id_foreign` (`contact_group_id`),
  KEY `tasks_opportunity_id_foreign` (`opportunity_id`),
  KEY `tasks_finished_by_id_foreign` (`finished_by_id`),
  KEY `tasks_responsible_user_id_foreign` (`responsible_user_id`),
  KEY `tasks_created_by_id_foreign` (`created_by_id`),
  KEY `tasks_updated_by_id_foreign` (`updated_by_id`),
  KEY `tasks_campaign_id_foreign` (`campaign_id`),
  KEY `tasks_responsible_team_id_foreign` (`responsible_team_id`),
  KEY `tasks_task_id_foreign` (`task_id`),
  KEY `tasks_order_id_foreign` (`order_id`),
  KEY `tasks_invoice_id_foreign` (`invoice_id`),
  KEY `tasks_housing_file_id_foreign` (`housing_file_id`),
  KEY `tasks_project_id_foreign` (`project_id`),
  KEY `tasks_participation_project_id_foreign` (`participation_project_id`),
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `team_contact_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `team_contact_group` (
  `contact_group_id` int(10) unsigned NOT NULL,
  `team_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  UNIQUE KEY `team_contact_group_contact_group_id_team_id_unique` (`contact_group_id`,`team_id`),
  KEY `team_contact_group_team_id_foreign` (`team_id`),
  CONSTRAINT `team_contact_group_contact_group_id_foreign` FOREIGN KEY (`contact_group_id`) REFERENCES `contact_groups` (`id`),
  CONSTRAINT `team_contact_group_team_id_foreign` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `team_district`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `team_district` (
  `district_id` bigint(20) unsigned NOT NULL,
  `team_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  UNIQUE KEY `team_district_district_id_team_id_unique` (`district_id`,`team_id`),
  KEY `team_district_team_id_foreign` (`team_id`),
  CONSTRAINT `team_district_district_id_foreign` FOREIGN KEY (`district_id`) REFERENCES `districts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `team_district_team_id_foreign` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `team_document_created_from`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `team_document_created_from` (
  `document_created_from_id` int(10) unsigned NOT NULL,
  `team_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  UNIQUE KEY `team_document_created_from_unique` (`document_created_from_id`,`team_id`),
  KEY `team_document_created_from_team_id_foreign` (`team_id`),
  CONSTRAINT `team_document_created_from_document_created_from_id_foreign` FOREIGN KEY (`document_created_from_id`) REFERENCES `document_created_froms` (`id`),
  CONSTRAINT `team_document_created_from_team_id_foreign` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `team_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `team_user` (
  `user_id` int(10) unsigned NOT NULL,
  `team_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  UNIQUE KEY `team_user_user_id_team_id_unique` (`user_id`,`team_id`),
  KEY `team_user_team_id_foreign` (`team_id`),
  CONSTRAINT `team_user_team_id_foreign` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`),
  CONSTRAINT `team_user_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `teams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `teams` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_teams_name` (`id`,`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `twinfield_log_invoice_id_foreign` (`invoice_id`),
  KEY `twinfield_log_contact_id_foreign` (`contact_id`),
  KEY `twinfield_log_user_id_foreign` (`user_id`),
  CONSTRAINT `twinfield_log_contact_id_foreign` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`id`),
  CONSTRAINT `twinfield_log_invoice_id_foreign` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`),
  CONSTRAINT `twinfield_log_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `two_factor_tokens_user_id_foreign` (`user_id`),
  CONSTRAINT `two_factor_tokens_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `user_login_attempts_user_id_foreign` (`user_id`),
  KEY `user_login_attempts_identifier_created_at_index` (`identifier`,`created_at`),
  KEY `user_login_attempts_ip_index` (`ip`),
  CONSTRAINT `user_login_attempts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  KEY `users_title_id_foreign` (`title_id`),
  KEY `users_last_name_prefix_id_foreign` (`last_name_prefix_id`),
  KEY `users_default_mailbox_id_foreign` (`default_mailbox_id`),
  KEY `idx_users_name` (`id`,`first_name`,`last_name`),
  CONSTRAINT `users_default_mailbox_id_foreign` FOREIGN KEY (`default_mailbox_id`) REFERENCES `mailboxes` (`id`) ON DELETE SET NULL,
  CONSTRAINT `users_last_name_prefix_id_foreign` FOREIGN KEY (`last_name_prefix_id`) REFERENCES `last_name_prefixes` (`id`),
  CONSTRAINT `users_title_id_foreign` FOREIGN KEY (`title_id`) REFERENCES `titles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  PRIMARY KEY (`id`),
  KEY `webforms_responsible_user_id_foreign` (`responsible_user_id`),
  KEY `webforms_responsible_team_id_foreign` (`responsible_team_id`),
  CONSTRAINT `webforms_responsible_team_id_foreign` FOREIGN KEY (`responsible_team_id`) REFERENCES `teams` (`id`),
  CONSTRAINT `webforms_responsible_user_id_foreign` FOREIGN KEY (`responsible_user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

/*M!999999\- enable the sandbox mode */ 
set autocommit=0;
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (1,'2013_04_09_062329_create_revisions_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (2,'2014_10_12_000000_create_users_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (3,'2014_10_12_100000_create_password_resets_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (4,'2016_06_01_000001_create_oauth_auth_codes_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (5,'2016_06_01_000002_create_oauth_access_tokens_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (6,'2016_06_01_000003_create_oauth_refresh_tokens_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (7,'2016_06_01_000004_create_oauth_clients_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (8,'2016_06_01_000005_create_oauth_personal_access_clients_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (9,'2017_09_26_132523_create_contacts_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (10,'2017_09_26_132939_create_addresses_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (11,'2017_09_26_132956_create_phone_numbers_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (12,'2017_09_26_133023_create_email_addresses_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (13,'2017_10_05_103358_create_people_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (14,'2017_10_05_103427_create_organisations_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (15,'2017_10_05_103840_create_type_on_contacts_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (16,'2017_10_05_134650_create_last_name_prefixes_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (17,'2017_10_05_134814_update_people_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (18,'2017_10_05_135836_seed_last_name_prefixes_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (19,'2017_10_05_151433_add_full_name_to_contacts_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (20,'2017_10_11_105841_add_name_to_organisations_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (21,'2017_10_11_141823_create_titles_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (22,'2017_10_11_142018_add_title_to_people_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (23,'2017_10_11_142851_seed_titles_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (24,'2017_10_19_132709_create_person_types_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (25,'2017_10_19_132733_create_organisation_types_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (26,'2017_10_19_132800_edit_people_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (27,'2017_10_19_132820_edit_contacts_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (28,'2017_10_19_135855_edit_organisations_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (29,'2017_10_26_114627_alter_people_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (30,'2017_10_26_114709_alter_contacts_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (31,'2017_10_26_114936_create_contact_notes_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (32,'2017_11_07_105744_create_industries_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (33,'2017_11_07_111149_alter_organisations_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (34,'2017_11_07_135723_add_primary_to_people_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (35,'2017_11_07_151130_create_permission_tables',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (36,'2017_11_09_105931_create_occupations_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (37,'2017_11_09_110037_add_occupation_to_people_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (38,'2017_11_09_132600_seed_permissions_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (39,'2017_11_14_083409_seed_organisation_types',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (40,'2017_11_14_084159_seed_person_types',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (41,'2017_11_14_101744_seed_industries_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (42,'2017_11_14_101802_seed_occupations_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (43,'2017_11_14_115038_alter_users_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (44,'2017_11_16_13312_create_campaigns_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (45,'2017_11_20_155012_create_measures_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (46,'2017_11_21_140131_create_intakes_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (47,'2017_11_21_140822_create_sources_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (48,'2017_11_21_150255_create_intake_reasons_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (49,'2017_11_21_151244_seed_intakes',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (50,'2017_11_23_084621_add_manage_user_permission',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (51,'2017_11_23_121516_create_contact_groups_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (52,'2017_12_11_113416_create_opportunities_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (53,'2017_12_12_115000_create_task_types_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (54,'2017_12_12_115447_create_tasks_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (55,'2017_12_12_125452_seed_task_types_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (56,'2017_12_13_142311_create_task_properties_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (57,'2017_12_13_142620_seed_task_properties_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (58,'2017_12_13_142713_create_task_property_values_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (59,'2017_12_14_094608_add_softdeletes_to_tasks',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (60,'2017_12_14_152917_add_manage_tasks_permission',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (61,'2017_12_15_153917_add_manage_intakes_permission',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (62,'2017_12_18_163816_alter_campaigns_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (63,'2017_12_19_154016_alter_tasks_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (64,'2017_12_21_105216_alter_measures_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (65,'2018_01_03_125038_create_mailboxes_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (66,'2018_01_03_141849_create_mailbox_user_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (67,'2018_01_03_154150_create_emails_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (68,'2018_01_04_113712_create_email_attachments_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (69,'2018_01_04_125850_add_contact_to_emails',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (70,'2018_01_04_153708_alter_email_date',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (71,'2018_01_11_151358_alter_email_status',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (72,'2018_01_11_165450_create_email_template',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (73,'2018_01_15_095158_alter_mailbox_valid',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (74,'2018_01_16_151150_create_document',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (75,'2018_01_16_164122_create_document_template',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (76,'2018_01_17_154958_alter_document_add_intake',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (77,'2018_01_17_154958_alter_document_add_template',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (78,'2018_01_19_111846_create_jobs_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (79,'2018_01_19_112620_create_failed_jobs_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (80,'2018_01_24_100758_alter_user_add_alfresco',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (81,'2018_01_24_154358_alter_documents_add_alfresco',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (82,'2018_01_25_095158_alter_task_time',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (83,'2018_01_25_112117_add_document_permission',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (84,'2018_01_26_114717_add_audit_trail_permission',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (85,'2018_01_30_104617_connections_contacts',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (86,'2018_01_31_095517_add_email_permission',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (87,'2018_01_31_103617_add_roles',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (88,'2018_02_05_160517_change_mailbox_password_length',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (89,'2018_02_09_114731_create_housing_files_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (90,'2018_02_12_133850_add_intake_to_emails',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (91,'2018_02_13_153350_create_quotation_requests_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (92,'2018_02_13_153850_add_relations_to_document',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (93,'2018_02_13_161622_create_teams_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (94,'2018_02_14_095517_add_team_permission',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (95,'2018_02_15_095158_alter_task_add_responsible_team_id',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (96,'2018_02_17_163058_alter_email_add_responsible',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (97,'2018_02_19_092131_seed_quotation_request_status',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (98,'2018_02_19_092455_add_quotation_request_permission',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (99,'2018_02_19_164250_add_relations_to_email',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (100,'2018_02_20_085849_alter_measures_add_updated_by_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (101,'2018_02_20_085850_create_measure_categories_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (102,'2018_02_20_085851_alter_measures_add_category',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (103,'2018_02_20_085852_seed_measures_categories_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (104,'2018_02_20_113651_alter_opportunities_add_evaluation_agreed_date',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (105,'2018_02_20_113655_alter_tasks_add_task_id',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (106,'2018_02_20_143250_create_opportunity_evaluation_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (107,'2018_02_20_163755_alter_tasks_add_housing_file_id',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (108,'2018_02_21_125431_seed_housing_files',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (109,'2018_02_21_144809_alter_tasks_type_nullable',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (110,'2018_02_21_162609_alter_campaign_measure',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (111,'2018_02_21_162930_alter_intake_measure_requested_edit_measure_id',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (112,'2018_02_21_164250_add_opportunity_id_to_email',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (113,'2018_02_22_113250_add_initials_to_people',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (114,'2018_02_22_124950_add_primary_to_occupations',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (115,'2018_02_22_163050_address_countries',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (116,'2018_02_23_090650_contact_energy_supplier',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (117,'2018_02_23_142550_production_projects',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (118,'2018_02_26_115350_production_project_value_course',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (119,'2018_02_26_144650_participant_production_project',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (120,'2018_02_27_153750_participant_transactions',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (121,'2018_02_28_094850_obligation_numbers',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (122,'2018_02_28_120850_production_project_revenues',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (123,'2018_03_01_090009_alter_contact_status',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (124,'2018_03_01_092655_add_production_project_relations',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (125,'2018_03_01_143250_opportunities_measures',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (126,'2018_03_02_144317_add_participation_administration_permissions',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (127,'2018_03_05_120055_add_production_project_participant_document_relation',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (128,'2018_03_08_112922_create_postalcode_links_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (129,'2018_03_08_164555_add_production_project_participant_task_relation',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (130,'2018_03_09_083355_add_participant_power_kwh_consumption',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (131,'2018_03_09_110555_add_pcr_energy_suppliers',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (132,'2018_03_09_165122_create_revenue_distribution_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (133,'2018_03_13_111355_add_es_number_energy_suppliers',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (134,'2018_03_13_115355_add_delivered_total_distribution',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (135,'2018_03_13_115355_add_energy_supplier_id_distribution',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (136,'2018_03_14_104455_change_trema_contact_type',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (137,'2018_03_14_120855_add_permissions_to_roles',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (138,'2018_03_14_124555_change_email_contact_relation',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (139,'2018_03_15_142955_change_softdeletes',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (140,'2018_03_15_152444_seed_energy_suppliers_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (141,'2018_03_16_110750_add_rendement_production_project_revenues',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (142,'2018_03_20_152850_change_participant_status_verkocht',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (143,'2018_03_23_155350_change_occupation_person',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (144,'2018_03_26_090550_seed_occupation',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (145,'2018_03_26_155252_seed_task_types_add_overige',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (146,'2018_03_26_155452_seed_participation_types_add_interesse',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (147,'2018_04_04_153152_textual_changes',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (148,'2018_04_10_130052_import_extra_fields',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (149,'2018_04_10_142252_change_quotation_request_status',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (150,'2018_04_11_125752_remove_phone_number_mobile',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (151,'2018_04_12_090752_delete_not_used_fields',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (152,'2018_04_16_134352_split_address_number',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (153,'2018_04_23_120152_add_contact_iban_attn',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (154,'2018_04_23_121752_change_status_opportunity',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (155,'2018_04_26_121622_create_administrations_tables',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (156,'2018_05_01_090622_create_products_tables',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (157,'2018_05_02_152722_create_orders_tables',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (158,'2018_05_07_124550_add_order_relations',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (159,'2018_05_08_122522_create_invoices_tables',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (160,'2018_05_11_101250_add_invoice_relations',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (161,'2018_05_16_115550_add_production_project_type',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (162,'2018_05_16_120450_add_production_project_status',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (163,'2018_05_16_123550_production_project_change_kwh',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (164,'2018_05_17_143850_production_project_save_current_participations_contact',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (165,'2018_05_25_093350_add_titles',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (166,'2018_05_28_152655_add_import_permission',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (167,'2018_06_11_125122_add_administration_default_templates',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (168,'2018_06_14_143222_change_email_recipients_length',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (169,'2018_06_14_162912_create_sepa_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (170,'2018_06_15_122212_payment_invoices',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (171,'2018_06_15_140255_add_participation_id_to_distribution',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (172,'2018_06_22_115922_remove_invoice_send_type',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (173,'2018_06_22_161122_remove_payment_invoice_concepts',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (174,'2018_06_28_094322_remove_last_name_prefixes',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (175,'2018_06_28_122222_add_es_and_occupations',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (176,'2018_06_28_122822_add_lastname_prefix',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (177,'2018_06_28_155022_pp_add_postalcode_link',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (178,'2018_07_05_140122_administration_add_iban_attn',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (179,'2018_07_05_143922_alter_email_length',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (180,'2018_07_16_114750_add_email_contact_group',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (181,'2018_07_16_152522_add_lastname_prefix2',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (182,'2018_07_18_113412_dynamic_groups',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (183,'2018_07_19_114712_composed_groups',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (184,'2018_07_19_140812_participation_requires_contact_group',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (185,'2018_07_23_163550_recalculate_participations',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (186,'2018_07_24_114350_recalculate_postal_codes',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (187,'2018_08_01_162050_rename_double_products',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (188,'2018_08_07_103622_products_vat_nullable',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (189,'2018_08_08_135122_add_lastname_prefix3',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (190,'2018_08_12_145255_reset_softdeletes',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (191,'2018_08_13_135055_add_softdeletes',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (192,'2018_08_16_124755_add_softdeletes2',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (193,'2018_08_23_095555_rename_energy_supplier',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (194,'2018_08_23_142955_add_user_has_alfresco_account',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (195,'2018_08_24_144355_add_softdeletes3',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (196,'2018_09_03_092155_add_composed_group_type',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (197,'2018_09_03_095855_add_dynamic_filter_ref',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (198,'2018_09_03_150555_add_dynamic_group_filter_type',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (199,'2018_09_03_171116_create_contact_groups_participations_pivot',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (200,'2018_09_04_124916_add_group_email_participant_pivot',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (201,'2018_09_05_094616_create_webforms_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (202,'2018_09_05_120801_add_manage_webform_permission',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (203,'2018_09_07_121603_add_connections_to_dynamic_contact_group_filter',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (204,'2018_09_13_124102_add_code_to_task_properties',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (205,'2018_09_14_162431_make_created_by_optional_on_contact_energy_supplier',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (206,'2018_09_19_111817_make_created_by_optional_on_intake',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (207,'2018_09_19_134537_add_webform_to_task_types',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (208,'2018_09_19_140242_make_created_by_optional_on_task',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (209,'2018_09_19_161021_make_created_by_optional_on_order',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (210,'2018_09_27_141216_remove_group_email_participant_pivot',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (211,'2018_09_28_093050_contactgroup_name_unique',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (212,'2018_10_01_141850_administration_btwnumber_nullable',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (213,'2018_10_01_161150_invoices_email_to',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (214,'2018_10_01_164650_contactgroup_drop_unique',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (215,'2018_10_05_082850_add_values',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (216,'2018_10_10_113250_change_distribution_fields',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (217,'2018_10_12_125450_order_changes',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (218,'2018_10_15_084050_product_changes',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (219,'2018_10_18_105350_change_invoice_fields_not_nullable',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (220,'2018_10_25_164650_remove_order_product_description',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (221,'2018_10_26_105350_change_order_frequency_id_not_nullable',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (222,'2018_10_26_161050_drop_product_unique',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (223,'2018_10_29_105850_new_invoice_fields',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (224,'2018_10_31_101050_long_fields_to_medium_text',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (225,'2018_10_31_134950_invoice_add_history_fields',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (226,'2018_10_31_150550_recalculate_fields_order_and_product',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (227,'2018_11_01_121750_add_email_template_per_invoice_payment_type',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (228,'2018_11_02_152450_invoice_number_temporarily',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (229,'2018_11_03_100250_change_invoice_status_checked',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (230,'2018_11_12_164350_new_occupation',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (231,'2018_11_14_093650_new_participation_status',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (232,'2018_11_15_162150_order_product_first_invoice_period_start',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (233,'2018_11_16_152350_add_twinfield_fields',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (234,'2018_11_20_125850_add_twinfield_administration_defaults',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (235,'2018_11_22_152150_new_energy_suppliers',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (236,'2018_11_26_155950_mailboxes_checks',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (237,'2018_11_27_094550_product_variable_price',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (238,'2018_11_28_110550_new_task_types',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (239,'2018_11_28_112450_remove_task_type',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (240,'2018_11_28_123450_change_email_subject_length',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (241,'2018_11_28_135350_drop_iban_participations',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (242,'2018_11_29_16100_remove_purchase_vats',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (243,'2018_11_30_145450_change_intake_note_length',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (244,'2018_12_04_091150_change_field_lengths',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (245,'2018_12_06_092350_add_invoice_fields',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (246,'2018_12_07_161349_create_mailbox_ignores_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (247,'2018_12_107_125749_create_jobs_log_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (248,'2019_01_03_113903_fix_tasks_housing_file_foreign_key_constraint',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (249,'2019_01_04_124244_create_mailgun_domains_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (250,'2019_01_04_152254_add_manage_mailgun_domains_permission',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (251,'2019_01_04_170840_add_mailgun_domain_to_mailbox',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (252,'2019_01_04_172059_add_outgoing_server_type_to_mailbox',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (253,'2019_01_16_124134_add_nullables',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (254,'2019_01_18_134724_add_primary_to_mailboxes',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (255,'2019_01_18_160337_alter_mailgun_domains_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (256,'2019_01_18_164659_add_mailbox_to_administration',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (257,'2019_01_24_114501_change_first_mailbox_to_primary',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (258,'2019_01_25_073101_alter_production_project_tables',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (259,'2019_02_04_124001_alter_project__type_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (260,'2019_02_04_1311501_alter_project_status_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (261,'2019_02_04_1521501_add_date_end_to_projects',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (262,'2019_02_06_135801_add_code_ref_to_project_type',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (263,'2019_02_07_081401_add_active_to_project_value_course',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (264,'2019_02_07_121501_add_amount_of_loan_needed_to_projects',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (265,'2019_02_07_142301_add_order_to_project_status',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (266,'2019_02_11_105101_alter_pay_percentage_and_revenue_project_revenues',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (267,'2019_02_18_091701_participant_mutations',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (268,'2019_02_27_105517_add_calculated_participation_fields_to_projects',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (269,'2019_02_27_143117_add_calculated_loan_fields_to_projects',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (270,'2019_03_25_142344_create_vat_codes_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (271,'2019_03_25_143150_create_ledgers_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (272,'2019_03_26_114820_change_administrations_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (273,'2019_03_26_114846_change_contacts_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (274,'2019_03_26_121944_added_default_vat_codes',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (275,'2019_03_26_145508_added_default_ledgers',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (276,'2019_04_02_093853_add_twinfield_number_to_invoice_payment_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (277,'2019_04_16_143901_change_project_status_add_soft_delete',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (278,'2019_04_16_145901_change_project_status_add_code_ref_and_change_label',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (279,'2019_04_18_093501_alter_project_add_updated_by_id',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (280,'2019_04_18_164848_add_new_energy_suppliers',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (281,'2019_04_23_160024_add_price_incl_vat_to_price_history_product',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (282,'2019_04_26_083901_change_participant_mutation_statuses_and_add_coderef',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (283,'2019_04_26_101001_alter_participant_project_type_id_nullable',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (284,'2019_04_26_103323_add_price_incl_vat_to_invoice_product',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (285,'2019_04_26_164255_conversion_price_incl_vat',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (286,'2019_05_01_155301_alter_participant_mutation_types',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (287,'2019_05_01_161201_alter_participant_mutations',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (288,'2019_05_02_082801_create_participant_mutation_status_log',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (289,'2019_05_02_114947_add_deleted_at_to_ledgers_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (290,'2019_05_03_091701_alter_participant_project_add_created_updated_by',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (291,'2019_05_10_095421_change_participant_project_payout_type',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (292,'2019_05_14_084521_create_invoices_to_send_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (293,'2019_05_16_084816_conversion_invoice_number_invoices_to_send',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (294,'2019_05_17_083301_add_participation_worth_and_change_columns_participant_mutations',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (295,'2019_05_17_162556_create_cost_centers_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (296,'2019_05_17_163305_add_cost_center_id_to_products_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (297,'2019_05_17_163359_add_cost_center_id_to_order_product_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (298,'2019_05_22_083201_change_coderef_participant_mutation_types',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (299,'2019_05_23_134701_alter_participant_project_remove_unneeded_fields',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (300,'2019_05_23_161401_alter_project_revenue_category',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (301,'2019_06_06_154301_alter_project_revenues',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (302,'2019_06_12_115101_alter_project_add_date_interest_bearing',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (303,'2019_06_12_144801_remove_unneeded_fields_and_tables_linked_to_participant_project',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (304,'2019_06_18_132445_add_new_energy_suppliers_june_2019',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (305,'2019_06_19_152942_change_name_participant_mutation_types',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (306,'2019_06_19_163640_alter_project_add_date_entry',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (307,'2019_06_21_111423_conversion_sprint_twinfield_v236',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (308,'2019_06_27_081509_alter_participation_project_status_nullable',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (309,'2019_07_01_115122_create_revenue_delivered_kwh_period_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (310,'2019_07_02_105842_change_name_participant_mutation_status_option',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (311,'2019_07_02_153950_alter_project_and_participation_project_amount_to_double',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (312,'2019_07_10_163605_add_participations_interessed_and_granted_fields_to_projects',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (313,'2019_07_11_130801_add_date_terminate_to_participation_project',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (314,'2019_07_17_163431_add_payout_kwh_price_to_participant_mutations',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (315,'2019_07_29_095919_add_amount_result_to_project_revenue_deliverd_kwh_period_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (316,'2019_07_29_100258_add_payout_type_to_project_revenues_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (317,'2019_08_01_091159_add_twinfield_match_number_to_invoice_payment_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (318,'2019_08_01_164812_drop_foreign_key_type_id_participation_project_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (319,'2019_08_02_104115_drop_payout_type_and_add_payout_type_id_to_project_revenue_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (320,'2019_08_06_104016_add_current_obligations_pcr_loan_to_contact_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (321,'2019_08_09_163403_delete_coderef_sell_from_participant_mutation_types_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (322,'2019_08_09_164710_add_date_interest_bearing_kwh_to_projects_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (323,'2019_08_13_091638_add_kwh_start_high_and_low_next_revenue_to_projects_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (324,'2019_08_14_133906_seed_20190814_extra_occupations_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (325,'2019_08_26_105007_create_portal_users_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (326,'2019_08_26_105717_add_conversion_processed_to_participation_project_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (327,'2019_08_27_154543_add_participations_capital_worth_to_participation_project_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (328,'2019_08_28_100000_create_portal_password_resets_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (329,'2019_09_04_111944_add_registration_code_to_contact',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (330,'2019_09_16_160354_add_did_accept_agreement_date_and_did_understand_fields_to_participation_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (331,'2019_09_23_092614_change_task_type_factuur_maken',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (332,'2019_09_25_124024_seed_redemption_category_to_project_revenue_category_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (333,'2019_09_26_121532_add_redemption_types_to_participant_mutation_type_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (334,'2019_09_26_150757_add_date_interest_bearing_redemption_to_projects_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (335,'2019_10_01_155226_seed_portal_registration_code_in_table_contacts',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (336,'2019_10_08_093200_add_min_max_amount_loan_to_projects_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (337,'2019_10_16_142048_add_date_did_agree_avg_to_contacts_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (338,'2019_10_23_190822_add_manage_portal_settings_permission',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (339,'2019_10_25_091543_conversion_occupation_contact_person_organisation',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (340,'2019_10_25_133910_add_task_type_contact_controle',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (341,'2019_10_25_134251_add_occupation_for_portal_to_occupations',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (342,'2019_11_04_164901_add_portal_fields_to_project_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (343,'2019_11_08_102119_add_new_energy_suppliers_november_2019',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (344,'2019_11_14_081800_add_link_contact_from_email_to_mailbox',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (345,'2019_11_25_095835_add_new_workflow_email_fields_to_task_types_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (346,'2019_11_26_155541_add_date_send_wf_fields_to_tasks_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (347,'2019_11_27_104437_add_new_workflow_email_fields_to_quotation_request_status_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (348,'2019_11_27_104827_add_new_workflow_email_fields_to_opportunity_status_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (349,'2019_11_27_153953_add_date_send_wf_field_to_quotation_requests_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (350,'2019_11_27_154008_add_date_send_wf_field_to_opportunities_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (351,'2019_11_28_114355_add_new_task_types_november_2019',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (352,'2019_11_28_114826_add_new_task_properties_november_2019',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (353,'2019_11_28_115259_add_new_sources_november_2019',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (354,'2019_12_03_152037_delete_task_type_november_2019',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (355,'2019_12_06_153239_change_energy_supplier_vattenvall',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (356,'2019_12_27_154346_change_energy_suppliers_does_pcr',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (357,'2020_01_21_141806_add_last_name_prefix_jan_2020',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (358,'2020_01_21_163528_add_country_polen',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (359,'2020_02_13_161726_add_pay_amount_to_project_revenues_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (360,'2020_02_20_161810_add_email_bcc_notas_to_administrations_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (361,'2020_03_03_114858_create_jobs_category_column_in_jobs_log_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (362,'2020_03_06_141946_add_participation_id_to_orders_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (363,'2020_03_13_110451_remove_maximal_participations_youth_column',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (364,'2020_03_18_135114_change_vs_country_id_into_us',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (365,'2020_03_23_122017_add_new_intake_status_row',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (366,'2020_03_23_140225_add_row_sources_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (367,'2020_03_25_084152_add_column_deleted_at_to_opportunity_status_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (368,'2020_03_27_100235_delete_column_date_valid_quotation_request',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (369,'2020_03_27_155214_add_new_column_emails_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (370,'2020_03_30_095631_seed_default_campaign_for_intakes_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (371,'2020_03_31_153812_add_missing_address_fields_to_distribution_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (372,'2020_04_02_153542_change_postal_code_number_into_postal_code_in_dynamic_contact_group_filter_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (373,'2020_04_10_181250_add_new_energy_suppliers_april_2020',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (374,'2020_04_24_164648_add_new_fields_to_administrations_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (375,'2020_04_24_164854_create_new_administration_last_used_numbers_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (376,'2020_05_13_233956_add_last_fetched_data_to_mailbox',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (377,'2020_05_19_091632_change_field_length_message_id_table_emails',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (378,'2020_05_20_071922_seed_default_date_last_fetched_table_mailboxes',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (379,'2020_06_19_111040_add_new_energy_suppliers_june_2020',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (380,'2020_06_19_134510_change_address_addition_not_nullable',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (381,'2020_06_29_180924_add_new_energy_suppliers_june_2020_b',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (382,'2020_07_07_082651_add_twinfield_fields_for_oauth2_to_administration_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (383,'2020_07_27_134028_add_twinfield_refresh_token_to_administrations_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (384,'2020_07_29_095630_seed_july_2020_measures_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (385,'2020_07_29_101738_add_new_energy_suppliers_july_2020',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (386,'2020_07_29_235216_alter_amount_to_double_order_product_and_invoice_product',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (387,'2020_07_31_125703_add_missing_model_name_in_dynamic_contact_group_filter_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (388,'2020_07_31_195546_alter_email_removed',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (389,'2020_08_04_083947_set_twinfield_connection_type',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (390,'2020_08_05_004423_change_twinfield_client_secret_string_to_text',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (391,'2020_08_13_130917_seed_august_2020_measures_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (392,'2020_08_19_170835_seed_augustus_2020_titles',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (393,'2020_08_24_144643_add_new_energy_suppliers_august_2020',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (394,'2020_09_03_115728_add_provider_to_oauth_clients_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (395,'2020_09_10_120414_change_invoice_text_orders_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (396,'2020_09_10_120421_change_invoice_text_invoice_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (397,'2020_09_10_120608_change_date_begin_and_end_project_revenues_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (398,'2020_09_30_121941_seeds_202009_occupations',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (399,'2020_10_06_120738_add_pcr_capacity_one_solor_panel_to_portal_settings',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (400,'2020_10_19_131345_add_lastname_prefix_oct_2020',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (401,'2020_10_20_162546_seed_october_2020_measures_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (402,'2020_10_23_104411_add_reply_type_id_to_table_emails',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (403,'2020_10_28_104402_add_header-portal-icon-color_to_portal_settings',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (404,'2020_11_17_104402_add_new_portal_member_fields_to_project_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (405,'2020_11_17_144345_add_new_portal_member_fields_to_participation_project_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (406,'2020_11_19_084712_change_price_nullable_in_invoice_product_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (407,'2020_11_19_230134_add_price_number_of_decimals_to_price_history_product_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (408,'2020_11_19_230210_add_price_number_of_decimals_to_invoice_product_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (409,'2020_11_23_140912_add_new_sources_november_2020',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (410,'2020_11_30_122636_create_table_financial_overviews',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (411,'2020_12_17_131610_create_cooperations_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (412,'2020_12_21_153853_create_portal_settings_layouts_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (413,'2020_12_24_122210_add_hoom_account_to_contacts_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (414,'2020_12_29_180136_add_participations_loan_amount_to_distributions_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (415,'2020_12_31_081545_add_payment_reference_to_participant_mutations_and_invoice_payment_tables',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (416,'2021_01_14_183410_create_financial_overview_post_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (417,'2021_01_18_135034_add_document_template_id_to_financial_overview_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (418,'2021_01_31_172531_add_foc_ids_to_financial_overview_post_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (419,'2021_02_02_181626_add_portal_text_fields_to_projects_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (420,'2021_02_04_115028_add_link_project_info_to_projects_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (421,'2021_02_10_123032_add_administration_code_to_administrations_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (422,'2021_02_16_142051_add_mollie_settings_to_administrations',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (423,'2021_02_17_111957_create_invoice_mollie_payments_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (424,'2021_02_17_200626_seed_february_2021_measures_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (425,'2021_02_17_200810_seed_february_2021_housing_files_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (426,'2021_02_17_210018_change_build_year_in_housing_files_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (427,'2021_02_18_120510_add_end_date_to_addresses_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (428,'2021_02_25_151325_add_transaction_costs_fields_to_projects_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (429,'2021_02_27_132214_move_mollie_code_to_invoices_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (430,'2021_03_03_180959_add_permission_create_hoom_dossier',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (431,'2021_03_04_102400_add_transaction_costs_amount_to_participant_mutations',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (432,'2021_03_08_111405_add_uses_mollie_to_projects',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (433,'2021_03_08_155030_create_participant_mutation_mollie_payments_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (434,'2021_03_08_161302_add_code_to_participant_mutations',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (435,'2021_03_09_160437_add_more_transaction_costs_fields_to_projects_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (436,'2021_03_09_160542_add_text_registration_finished_to_projects',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (437,'2021_03_11_010552_add_workflow_new_task_to_task_types_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (438,'2021_03_13_163558_add_iban_name_to_participant_mutation_mollie_payments',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (439,'2021_03_13_165105_add_iban_and_name_to_invoice_mollie_payments',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (440,'2021_03_15_120016_add_default_for_portal_to_task_types_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (441,'2021_03_16_085301_update_2020_measures_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (442,'2021_03_16_085439_seed_march_2021_measures_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (443,'2021_03_17_103049_add_created_with_and_updated_with_to_contacts_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (444,'2021_03_17_103114_add_created_with_and_updated_with_to_participation_project_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (445,'2021_03_17_190528_change_march_2021_energy_suppliers_does_pcr',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (446,'2021_03_18_155317_add_created_with_and_updated_with_to_participant_mutations_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (447,'2021_03_19_103951_encrypt_mollie_api_key_in_administrations',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (448,'2021_03_22_100156_add__cz_and__nz_to_countries_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (449,'2021_03_24_145232_set_iban_encrypted_in_invoices_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (450,'2021_03_29_103605_add_new_workflow_fields_to_measure_categories_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (451,'2021_03_31_093319_seed_march_2021_more_measures_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (452,'2021_04_07_131201_add_sce_fields_to_projects_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (453,'2021_04_08_135431_add_is_active_to_project_type_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (454,'2021_04_09_155023_conversion_end_date_addresses_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (455,'2021_04_15_164012_add_field_transaction_costs_with_membership_to_projects_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (456,'2021_04_19_195434_seed_april_2021_measures_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (457,'2021_04_30_085551_add_participation_id_to_project_revenues_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (458,'2021_05_03_211153_add_fields_to_energy_suppliers',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (459,'2021_05_05_100857_add_status_to_quotation_request_status_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (460,'2021_05_05_102109_change_name_status_uitvoering_to_opportunity_status_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (461,'2021_05_05_115234_add_check_postalcode_link_to_projects_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (462,'2021_05_10_115357_seed_new_fields_energy_suppliers',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (463,'2021_05_10_151057_add_send_email_contact_after_adding_to_contact_groups_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (464,'2021_05_12_101745_add_revenue_khw_split_fields_to_participation_project_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (465,'2021_05_17_145018_set_opportunity_status_opdracht_active',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (466,'2021_05_17_145133_seed_may_2021_measures_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (467,'2021_05_18_091321_seed_new_categories_to_project_revenue_category_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (468,'2021_05_18_111237_add_delivered_end_calendar_year_to_project_revenue_distribution_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (469,'2021_05_20_163604_add_email_mark_as_seen_to_mailboxes_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (470,'2021_06_01_131232_add_send_email_to_cooperations_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (471,'2021_06_01_163719_seed_june2021_measures_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (472,'2021_06_08_145426_add_laposta_fields_to_cooperations_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (473,'2021_06_14_095455_add_delivered_totals_last_energy_supplier_to_project_revenue_distribution_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (474,'2021_06_14_220840_add_laposta_list_id_to_contact_groups_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (475,'2021_06_14_232210_add_permission_create_laposta_link',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (476,'2021_06_15_141822_composed_contact_group_excepted',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (477,'2021_06_17_065554_add_delivered_totals_last_es_date_begin_to_project_revenue_distribution_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (478,'2021_06_17_142035_add_laposta_fields_to_contact_groups_pivot_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (479,'2021_06_24_081953_seeds_202106_occupations',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (480,'2021_06_24_082152_add_new_energy_supplier_june_2021',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (481,'2021_06_24_112925_add_number_of_reminders_to_administrations_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (482,'2021_06_24_112935_add_number_of_reminders_to_invoices_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (483,'2021_06_24_125336_add_number_of_reminders_to_orders_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (484,'2021_06_25_162020_seed_june2021_more_measures_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (485,'2021_06_25_165418_change_description_to_type_text_in_invoice_product_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (486,'2021_06_28_120946_add_active_column_to_products_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (487,'2021_07_02_115306_add_is_house_for_sale_to_housing_files_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (488,'2021_07_02_155039_convert_payout_type_in_project_revenue_distribution_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (489,'2021_07_21_111044_seed_empty_invoice_code',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (490,'2021_07_30_105104_set_pcr_type_active_in_projects_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (491,'2021_08_03_143420_create_mailbox_gmail_settings',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (492,'2021_08_09_095525_change_log_text_did_finish',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (493,'2021_08_11_131519_change_message_id_emails_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (494,'2021_08_12_094919_set_to_cc_bcc_default_emails_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (495,'2021_09_03_105903_change_laposta_fields_to_contact_groups_pivot_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (496,'2021_09_10_155308_seed_september2021_measures_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (497,'2021_09_13_095813_conversion_member_to_group_since_to_contact_groups_pivot_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (498,'2021_09_13_232742_add_twinfield_modified_and_in_progress_to_invoice_payment_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (499,'2021_09_14_112648_add_new_fields_sep2021_to_administrations_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (500,'2021_09_15_153211_add_allow_change_name_on_portal_to_projects_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (501,'2021_09_21_164849_create_twinfield_log_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (502,'2021_09_25_124152_add_gmail_message_id_to_emails_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (503,'2021_10_04_082743_seeds202110_occupations',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (504,'2021_10_04_103749_add_statutory_name_column_to_organisations',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (505,'2021_10_04_111904_add_fields_to_titles',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (506,'2021_10_05_163042_add_hide_when_not_matching_postal_check_field_to_projects',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (507,'2021_10_08_091342_add_address_number_series_field_to_projects',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (508,'2021_10_08_115310_seed_october2021_measures_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (509,'2021_10_14_150300_ean_address_changes',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (510,'2021_10_18_140704_change_fields_opportunity_evaluation',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (511,'2021_10_26_143739_add_new_fields_okt2021_to_documents_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (512,'2021_10_27_162920_conversion_postalcode_link_in_projects',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (513,'2021_12_08_135548_add_new_energy_suppliers_dec_2021',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (514,'2021_12_15_101857_add_new_energy_suppliers_15_dec_2021',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (515,'2021_12_17_102432_add_prefix_invoice_number_to_administrations_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (516,'2021_12_20_113545_add_portal_images_to_portal_settings_layouts_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (517,'2021_12_28_102444_add_new_fields_dec2021_to_documents_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (518,'2022_01_03_094936_add_document_id_fields_to_projects_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (519,'2022_01_17_111339_fix_wrong_created_simulated_groups',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (520,'2022_01_18_112931_seed_january2022_measures_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (521,'2022_01_31_103020_alter_postal_code_link',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (522,'2022_01_31_115244_change_energysupplier_energiezero',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (523,'2022_01_31_122810_add_new_task_type_january2022',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (524,'2022_02_02_143824_seed_measures_categories',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (525,'2022_02_03_093540_add_new_task_properties_february2020',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (526,'2022_02_04_134444_add_margin_fee_to_address_energy_suppliers_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (527,'2022_02_07_124451_change_date_begin_and_date_end_in_project_revenues_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (528,'2022_02_08_092417_renew_revenues_kwh_tables',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (529,'2022_03_07_152619_add_new_task_type_march2022',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (530,'2022_03_17_155733_add_new_energy_suppliers_17_mrt_2022',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (531,'2022_03_18_092003_seed_march_2022_measure_categories_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (532,'2022_04_12_135712_change_definition_kwh_fields',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (533,'2022_04_19_095543_create_xxx_conversion2021_ozon_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (534,'2022_04_20_121856_add_fields_to_xxx_conversion2021_ozon_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (535,'2022_04_21_135532_seed_april2022_measure_categories_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (536,'2022_05_20_160650_recalculate2_postal_codes',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (537,'2022_05_20_163929_create_address_energy_consumption_gas_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (538,'2022_05_20_163932_create_address_energy_consumption_electricity_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (539,'2022_05_25_135917_add_use_export_address_consumption_to_cooperations_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (540,'2022_06_02_165352_add_new_energy_suppliers2_juny2022',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (541,'2022_06_02_170737_add_new_occupations2_juny2022',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (542,'2022_06_21_155649_add_fields_portal_settings_layouts_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (543,'2022_06_21_155749_create_portal_settings_dashboard_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (544,'2022_07_11_153930_add_include_into_export_group_report_to_contact_groups_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (545,'2022_07_20_144450_seed_july2022_measure_categories_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (546,'2022_07_21_081403_change_margin_fee_double_to_string',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (547,'2022_07_26_144238_fix_default_widget_background_color',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (548,'2022_07_28_103905_seed_first_portal_settings_dashboard',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (549,'2022_08_02_141242_add_lastname_prefix_aug_2022',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (550,'2022_08_02_151626_conversion_energy_supplier33_to54',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (551,'2022_08_04_122706_add_new_fields_to_housing_files_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (552,'2022_08_12_134533_add_soft_deletes_to_address_energy_suppliers',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (553,'2022_08_16_162317_conversion_soft_delete_a_e_s',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (554,'2022_08_22_145910_seed_august2022_measures_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (555,'2022_08_25_145151_pcr_table_changes',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (556,'2022_09_09_102751_add_start_fetch_mail_to_mailboxes',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (557,'2022_09_19_133554_seed_task_types_add_nazorg',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (558,'2022_09_22_110000_add_two_factor_columns_to_users_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (559,'2022_09_22_125855_create_two_factor_tokens_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (560,'2022_09_23_123531_add_two_factor_columns',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (561,'2022_09_27_162853_change_energy_supplier_pure_energy',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (562,'2022_09_29_090013_create_housing_file_specifications_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (563,'2022_09_30_152034_add_column_visible_to_measures_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (564,'2022_10_04_163511_create_new_energy_suppliers',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (565,'2022_10_10_110400_add_is_coach_to_contacts_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (566,'2022_10_10_110437_add_is_coach_group_to_contact_groups_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (567,'2022_10_10_115834_add_contact_id_to_quotation_requests_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (568,'2022_10_10_140835_create_campaign_coach_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (569,'2022_10_14_084119_okt2022add_new_roles',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (570,'2022_10_14_084119_okt2022add_new_roles_2',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (571,'2022_10_14_084119_okt2022add_new_roles_3',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (572,'2022_10_14_115009_seed_oktober2022_measures_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (573,'2022_10_17_085618_create_team_contact_group_and_mailbox_tables',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (574,'2022_10_17_085618_create_team_document_created_from_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (575,'2022_10_17_110000_add_two_factor_columns_to_portal_users_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (576,'2022_10_17_125855_create_portal_two_factor_tokens_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (577,'2022_10_17_132707_add_show_two_factor_notification_to_users',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (578,'2022_10_24_155409_add_fields_to_quotation_requests',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (579,'2022_10_24_164925_add_inspection_planned_email_template_id_to_cooperations',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (580,'2022_10_28_125558_create_campaign_opportunity_action_tables',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (581,'2022_10_28_125657_create_quotation_request_actions_log_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (582,'2022_10_31_121551_add_default_attachment_document_id_to_email_templates_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (583,'2022_11_04_153338_add_campaign_type_nov2022',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (584,'2022_11_08_103040_add_new_energy_supplier_november_2022',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (585,'2022_11_08_122613_conversion_energy_supplier_12_to_2',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (586,'2022_11_08_131517_change_date_recorded_in_quotation_requests_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (587,'2022_11_11_125756_syc_all_permissions_key_user_nov2022',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (588,'2022_11_11_140027_seed_november2022_measures_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (589,'2022_11_17_153429_seed_17_november_2022_measures_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (590,'2022_11_18_155540_add_inspection_recorded_email_template_id_to_cooperations',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (591,'2022_11_22_113415_add_cid_to_email_attachments',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (592,'2022_11_22_125310_add_inbound_mailgun_settings_to_mailboxes',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (593,'2022_11_28_113308_change_date_released_in_quotation_requests_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (594,'2022_11_29_090537_add_inspection_planned_mailbox_to_cooperation',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (595,'2022_12_01_163956_add_inspection_released_email_template_id_to_cooperations',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (596,'2022_12_07_113850_add_new_energy_supplier_december2022',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (597,'2022_12_07_114056_seed_december2022_measures_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (598,'2022_12_09_122158_add_inspection_type_id_to_contacts_and_contact_groups_tables',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (599,'2022_12_12_113818_create_districts_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (600,'2022_12_12_114305_create_district_has_coaches_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (601,'2022_12_12_152241_create_campaign_project_manager_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (602,'2022_12_12_152250_create_campaign_external_party_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (603,'2022_12_13_091615_add_project_manager_id_and_external_party_id_to_quotation_requests',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (604,'2022_12_13_121958_create_contact_availabilities_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (605,'2022_12_15_163819_createwrong_distribution_parts_data_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (606,'2022_12_19_094028_add_coach_fields_to_contacts',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (607,'2022_12_20_112122_add_planning_fields_to_quotation_requests',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (608,'2022_12_21_185338_create_wrong_energy_supplier_data_in_parts_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (609,'2022_12_23_115036_add_new_energy_supplier23_december2022',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (610,'2023_01_02_113236_set_occupation_gegevensbeheerder_for_portal_true',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (611,'2023_01_02_140025_add_district_id_to_quotation_requests',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (612,'2023_01_02_170303_add_coach_roles',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (613,'2023_01_06_105854_add_quotation_request_status',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (614,'2023_01_06_114846_set_coach_default_values',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (615,'2023_01_09_152340_new_energy_supplier_zonneplan',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (616,'2023_01_09_155146_add_is_pending_status_column_to_quotation_request_status_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (617,'2023_01_12_111649_add_deleted_at_to_quotation_requests_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (618,'2023_01_17_121848_change_energy_supplier_zonneplan_does_pcr',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (619,'2023_01_23_135741_add_end_date_to_energy_suppliers_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (620,'2023_01_23_135809_merge_energy_suppliers_jan2023',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (621,'2023_01_23_161453_change_occupation_energiecoach',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (622,'2023_01_23_165252_change_quotation_request_status_names',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (623,'2023_01_23_170052_change_opportunity_actions',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (624,'2023_01_24_100952_change_task_types_names',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (625,'2023_01_24_102452_add_campaign_types',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (626,'2023_01_24_105252_change_roles_names',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (627,'2023_01_26_135628_change_transfer_worth_not_nullable_in_project_value_course_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (628,'2023_01_26_144417_seed26_january2023_measures_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (629,'2023_02_06_132949_add_default_duration_minutes_to_districts',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (630,'2023_02_06_143409_add_mail_template_settings_to_districts',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (631,'2023_02_07_091938_create_missing_energy_supplier_data_in_parts_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (632,'2023_02_07_092638_create_wrong_revenue_distribution_kwh_status_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (633,'2023_02_07_095921_add_manage_coach_planning_permission_to_energie_adviseurs',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (634,'2023_02_09_142640_new_energy_supplier_nextenergy',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (635,'2023_02_10_163039_change_energy_supplier_gazprom',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (636,'2023_02_16_124630_seed_quotation_request_status_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (637,'2023_02_17_111835_set_default_duration_minutes_values_for_existing_districts',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (638,'2023_02_17_112350_add_closed_option_to_districts',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (639,'2023_02_17_151246_add_extrenalparty_note_to_quotation_requests',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (640,'2023_02_20_160317_add_date_under_review_to_quotation_requests',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (641,'2023_02_21_133539_add_hide_group_id_to_portal_settings_dashboard_widgets',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (642,'2023_03_08_123915_march_2023_new_fields_for_quotation_request_status_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (643,'2023_03_16_233104_add_new_fields_march2023_to_housing_files_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (644,'2023_03_17_115930_add_new_fields_march2023_cooperations_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (645,'2023_03_21_131145_add_new_fields_march2023_to_opportunities_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (646,'2023_03_21_131800_create_contact_groups_contacts_for_report_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (647,'2023_03_24_102104_create_housing_file_hoom_housing_statuses_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (648,'2023_03_24_112158_add_new_fields_march2023_to_measures_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (649,'2023_03_29_121540_new_energy_supplier_prikenergie',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (650,'2023_04_03_082841_add_new_source_woning_dossier',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (651,'2023_04_03_084139_add_field_code_ref_to_intake_status_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (652,'2023_04_13_164401_add_coach_max_appointments_per_month_to_contacts',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (653,'2023_04_18_094402_add_remark_coach_to_housing_files_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (654,'2023_05_01_164214_add_boolean_fields_to_revenue_distribution_parts_kwh_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (655,'2023_05_10_105746_add_projectnummer_to_orders_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (656,'2023_05_19_153746_add_mail_cc_to_coach_wf_to_quotation_request_status_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (657,'2023_05_30_100239_add_date_report_field_to_revenue_distribution_kwh_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (658,'2023_05_31_132736_seed_di_last_name_prefixe_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (659,'2023_05_31_144646_add_email_address_error_report_and_mail_error_report_to_webforms_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (660,'2023_06_02_164854_add_defult_styling_to_cooperation',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (661,'2023_06_05_111121_add_note_to_emails',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (662,'2023_06_08_090100_seed_june_2023_more_measures_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (663,'2023_06_08_100900_add_amount_to_opportunities_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (664,'2023_06_08_113300_seed_june2__2023_measures_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (665,'2023_06_08_180618_add_send_groupmail_without_bcc_to_emails',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (666,'2023_06_12_100826_add_default_mailbox_to_users',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (667,'2023_06_12_122700_add_new_sources_june_12_2023',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (668,'2023_06_12_131300_new_energy_supplier_megaenergie',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (669,'2023_06_12_133300_add_quotation_request_status_june_12_2023',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (670,'2023_06_12_163527_create_contact_email_manual_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (671,'2023_06_26_150803_add_create_contacts_report_table_to_cooperations_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (672,'2023_07_05_164005_create_mailgun_events_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (673,'2023_07_13_082108_july2023_add_new_fields_to_cooperations_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (674,'2023_07_13_103100_change_quotation_request_status_afspraak_gedaan',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (675,'2023_07_13_104800_seed_july2023_measures_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (676,'2023_07_19_113149_delete_revision_records_revenue_distribution_kwh',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (677,'2023_07_19_123133_add_laposta_last_error_message_to_contact_groups_pivot_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (678,'2023_07_25_163613_add_created_by_portal_user_id_to_documents_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (679,'2023_07_28_160000_change_quotation_request_status_code_refs',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (680,'2023_07_31_114314_change_foreign_key_opportunity_status_measure_categories_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (681,'2023_08_01_094837_add_area_code_to_addresses_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (682,'2023_08_01_143512_aug2023_add_extra_fields_to_quotation_requests',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (683,'2023_08_08_120916_seed_august2023_measures_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (684,'2023_08_08_123017_create_cooperation_campaign_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (685,'2023_08_14_161700_add_description_to_payment_invoices_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (686,'2023_08_17_083651_aug2023_add_extra_fields2_to_quotation_requests',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (687,'2023_08_18_095259_add_delivery_status_to_mailgun_events',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (688,'2023_08_22_163300_create_free_fields_tables_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (689,'2023_08_25_091511_add_quotation_request_status_aug2023',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (690,'2023_08_31_133332_seed_free_fields_tables',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (691,'2023_09_07_112922_add_index_to_emails',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (692,'2023_09_08_105901_add_result_deposit_types_to_participant_mutation_types_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (693,'2023_09_15_090334_add_tenant_id_to_mailbox_gmail_api_settings',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (694,'2023_10_04_104800_add_exportable_to_free_fields_fields_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (695,'2023_10_06_092800_add_sort_order_to_free_fields_fields_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (696,'2023_10_11_103800_add_mask_to_free_fields_fields_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (697,'2023_10_18_151434_create_command_runs_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (698,'2023_10_24_102719_seed_october2023_measures_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (699,'2023_10_24_151420_remove-gmail-mailboxen',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (700,'2023_10_30_110000_changing_electricity_name_or_label',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (701,'2023_10_31_091817_add_created_in_shared_to_command_runs_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (702,'2023_11_03_143400_seed_november_2023_measures_and_measure_categories_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (703,'2023_11_09_150000_seed_voor_den_last_name_prefixe_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (704,'2023_11_13_092000_add_quotation_request_status_november132023',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (705,'2023_11_13_103200_change_quotation_request_status_names_november132023',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (706,'2023_11_13_124800_add_new_row_in_opportunity_status_table_november2023',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (707,'2023_11_21_173419_fix_email_templates',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (708,'2023_12_01_165242_cleanup_old_project_revenue_kwh',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (709,'2024_01_09_092400_add_new_row_in_opportunity_status_table_january2024',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (710,'2024_02_07_144458_changes_inspection_fields_cooperation_and_campaign_tables',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (711,'2024_02_26_094000_seed_february_2024_measures_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (712,'2024_03_01_120000_create_invoice_post_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (713,'2024_03_25_004149_change_mutation_type_text_obligation_result_deposit',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (714,'2024_04_03_103000_add_field_name_webform_to_free_fields_fields_table_and_prefix_field_name_webform_to_free_fields_tables_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (715,'2024_04_15_104700_seed_op_der_last_name_prefixe_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (716,'2024_04_22_123200_change_evaluation_note_in_opportunities_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (717,'2024_05_14_135418_change_evaluation_note_default_value_in_opportunities_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (718,'2024_05_17_100300_new_energy_supplier_live_energy',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (719,'2024_05_29_15170_new_energy_supplier_gulf_gas_and_power',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (720,'2024_06_06_102900_seed_in_den_last_name_prefixes_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (721,'2024_06_11_134000_create_contact_to_import_suppliers_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (722,'2024_06_12_091900_create_contact_to_imports_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (723,'2024_07_03_143814_change_checkout_url_field_to_text_participant_mutation_mollie_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (724,'2024_07_10_140618_change_checkout_url_field_to_text_invoice_mollie_payments_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (725,'2024_07_11_164803_add_new_occupations_july2024',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (726,'2024_07_17_092747_new_opportunity_statussen_july2024',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (727,'2024_07_22_100451_add_loan_type_to_projects_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (728,'2024_08_01_153925_add_status_to_project_revenues_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (729,'2024_08_06_122200_change_name_in_project_loan_types_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (730,'2024_08_06_151207_seed_august2024_measures_and_measure_categories_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (731,'2024_08_09_152024_add_new_opportunity_action_redirection',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (732,'2024_08_12_120000_change_visible_in_econobis_for_renevue_solar_panels_in_table_housing_file_hoom_links',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (733,'2024_08_16_130000_change_energy_supplier_onbekend',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (734,'2024_08_20_150900_add_hoom_mailbox_id_to_cooperations',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (735,'2024_08_30_151000_add_hide_group_id_foreign_key_to_portal_settings_dashboard_widgets',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (736,'2024_09_24_155210_free_fields_field_records',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (737,'2024_10_02_103529_change_contact_to_imports_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (738,'2024_10_04_115500_add_campaign_id_to_housing_file_specifications',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (739,'2024_10_14_141300_add_mail_to_contact_wf_to_campaign_workflows_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (740,'2024_10_14_164844_add_initals_to_contact_to_imports_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (741,'2024_10_15_134000_add_send_email_reminder_to_quotation_request_status_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (742,'2024_10_15_165042_create_portal_free_fields_tables',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (743,'2024_10_16_134000_add_send_email_reminder_to_campaign_workflows_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (744,'2024_10_21_161000_seed_oktober_2024_measures_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (745,'2024_10_25_160000_add_quotation_request_status_oktober252024',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (746,'2024_10_29_084000_add_name_custom_to_measures_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (747,'2024_10_29_131000_seed_oktober_29_2024_measures_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (748,'2024_11_05_091946_add_softdelets_to_free_fields_field_records_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (749,'2024_11_07_122157_add_manage_in_portal_to_occupation_contacts_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (750,'2024_11_11_102541_add_fields_portal_increase_participations_to_table_projects',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (751,'2024_11_13_152530_add_column_html_body_to_documents_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (752,'2024_11_18_115500_new_energy_supplier_atlas_power_and_gas',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (753,'2024_12_10_163800_add_use_dongle_registration_to_cooperations_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (754,'2024_12_11_140000_create_address_dongles_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (755,'2024_12_18_171658_add_indexes_for_contact_emails',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (756,'2025_01_07_171500_add_dongle_permissions',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (757,'2025_01_13_133658_change_index_idx_emails_advanced',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (758,'2025_01_14_104809_add_subject_for_filter_to_emails_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (759,'2025_01_31_125141_change_name_energy_supplier_d_g_b_energie',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (760,'2025_01_31_131415_add_housing_file_specification_sides_jan2025',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (761,'2025_02_10_143500_new_energy_supplier_noordstroom',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (762,'2025_02_21_142300_seed_february_2025_measure_categories_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (763,'2025_02_21_143500_seed_spuk_measure_categories_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (764,'2025_03_18_120700_change_key_user_role_name',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (765,'2025_03_28_100117_add_show_external_url_for_contacts_to_cooperations_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (766,'2025_04_23_111536_migrate_passport_keys',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (767,'2025_05_16_092650_add_register_type_to_participant_mutations_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (768,'2025_05_19_124456_add_new_text_link_name_fields_to_projects_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (769,'2025_06_18_155153_create_portal_settings_table',2);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (770,'2025_06_25_151800_change_quotationrequest_name_in_document_created_froms_table',2);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (771,'2025_06_27_141738_change_housing_files_boolean_fields_to_varchar',2);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (772,'2025_07_02_163700_change_projectmedewerker_role_name',2);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (773,'2025_07_03_144600_change_roles_permissions',2);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (774,'2025_07_07_122000_add_calendar_color_fields_to_measure_categories_table',2);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (775,'2025_07_28_115838_new_energy_supplier_groen_stroom_lokaal',2);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (776,'2025_08_07_131714_correction_migrations_after_laravel-11_upgrade',2);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (777,'2025_08_18_140000_add_name_custom_and_visible_to_sources_table',2);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (778,'2025_08_18_145400_add_new_sources_august_18_2025',2);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (779,'2025_08_19_110000_new_energy_supplier_volti',2);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (780,'2025_08_22_163500_add_source_permissions',2);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (781,'2025_08_26_115147_add_approved_statusses_quotatoin_requests',2);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (782,'2025_08_26_125200_add_new_occupation_august2025',2);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (783,'2025_08_27_151200_add_portal_dashboard_widget_groepen_beheer',2);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (784,'2025_08_28_153800_add_portal_sort_order_to_contact_groups_table',2);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (785,'2025_09_25_140112_add_field_code_extern_to_intakes_table',2);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (786,'2025_09_29_140439_add_rate_limit_login_fields',2);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (787,'2025_10_01_113800_seed_oktober_2025_measures_and_measure_categories_table',2);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (788,'2025_10_06_110439_add_rate_limit_login_portal_fields',2);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (789,'2025_10_16_124925_add_require_team_on_user_create_to_cooperations_table',2);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (790,'2025_10_21_093544_add_new_fields_to_contact_to_imports_table',2);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (791,'2025_10_23_160636_add_uses_interim_financial_overview_to_administrations_table',2);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (792,'2025_11_04_154507_add_new_fields_to_financial_overviews_tables',2);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (793,'2025_11_04_154508_add_indexen_to_financial_overviews_tables',2);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (794,'2025_11_12_123018_create_free_fields_field_log_table',2);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (795,'2025_11_12_154900_seed_aan_den_last_name_prefixes_table',2);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (796,'2025_11_27_153623_add_public_idto_contacts_table',2);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (797,'2025_11_27_154023_unique_for_public_id_contacts_table',2);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (798,'2025_12_05_150323_add_fields_to_contact_email_table',2);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (799,'2025_12_31_084729_add_opportunity_code_field_to_opportunities_table',2);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (800,'2026_01_06_080932_create_team_district_table',2);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (801,'2026_02_05_162535_add_soft_deletes_to_contact_notes_table',2);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (802,'2026_02_18_135950_new_fields_mailboxen_table',2);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (803,'2026_03_04_150000_new_energy_supplier_audax_renewables',2);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (804,'2026_03_19_155857_create_system_check_runs_table',2);
commit;
