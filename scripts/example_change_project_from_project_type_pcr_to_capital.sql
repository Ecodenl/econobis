-- Omzetten PCR project naar Kapitaal project.
-- LETOP: Dit mag alleen zolang er nog geen opbrengstverdelingen zijn gemaakt !
--
-- projects
-- 	project_type_id         8       	=>	7
-- 	is_sce_project	        0       	=>	1 (optioneel \* )
-- 	base_project_code_ref	           	=>	solar-energy (optioneel \* )
-- 	ean                     [waarde]    =>	[leeg maken, emptystring]
-- 	ean_manager	            [waarde]    =>	[leeg maken, emptystring]
-- 	warranty_origin	        [waarde]    =>	[leeg maken, emptystring]
-- 	ean_supply	            [waarde]    =>	[leeg maken, emptystring]
-- 	tax_referral	        [waarde]    =>	[leeg maken, emptystring]
--
-- * als je is_sce_project op 0 laat staan, dan moet base_project_code_ref ook leeg (null) blijven en moet je postalcode_link ook leeg (null) maken.
--
-- participation_project
-- 	power_kwh_consumption	[waarde]    =>	0
--
-- participant_mutations
-- 	type_id	13	=>	8
-- 	type_id	15	=>	9
-- 	type_id	16	=>	10
-- 	type_id	17	=>	11

SET @projectId = 5;

SELECT `projects`.`id`,
 `projects`.`project_type_id`,
 `projects`.`is_sce_project`,
 `projects`.`base_project_code_ref`,
 `projects`.`ean`,
 `projects`.`ean_manager`,
 `projects`.`warranty_origin`,
 `projects`.`ean_supply`,
 `projects`.`tax_referral`
 FROM `projects`
where `projects`.`id` = @projectId;

SELECT `participation_project`.`id`,
 `participation_project`.`project_id`,
 `participation_project`.`power_kwh_consumption`
 FROM `participation_project`
where `participation_project`.`project_id` =  @projectId;

SELECT `participant_mutations`.`id`,
 `participant_mutations`.`participation_id`,
 `participant_mutations`.`type_id`
 FROM `participant_mutations`
where `participant_mutations`.`participation_id` in (
	SELECT `participation_project`.`id` FROM `participation_project`
	where `participation_project`.`project_id` =  @projectId)
and type_id = 13;

SELECT `participant_mutations`.`id`,
 `participant_mutations`.`participation_id`,
 `participant_mutations`.`type_id`
 FROM `participant_mutations`
where `participant_mutations`.`participation_id` in (
	SELECT `participation_project`.`id` FROM `participation_project`
	where `participation_project`.`project_id` =  @projectId)
and type_id = 15;

SELECT `participant_mutations`.`id`,
 `participant_mutations`.`participation_id`,
 `participant_mutations`.`type_id`
 FROM `participant_mutations`
where `participant_mutations`.`participation_id` in (
	SELECT `participation_project`.`id`FROM `participation_project`
	where `participation_project`.`project_id` =  @projectId
)
and type_id = 16;

SELECT `participant_mutations`.`id`,
 `participant_mutations`.`participation_id`,
 `participant_mutations`.`type_id`
 FROM `participant_mutations`
where `participant_mutations`.`participation_id` in (
	SELECT `participation_project`.`id`FROM `participation_project`
	where `participation_project`.`project_id` =  @projectId
)
and type_id = 17;

/* ----------------------- */

UPDATE `projects` SET
 `projects`.`project_type_id` = 7,
 `projects`.`is_sce_project` = 1,
 `projects`.`base_project_code_ref` =  'solar-energy',
 `projects`.`ean` =  '',
 `projects`.`ean_manager` =  '',
 `projects`.`warranty_origin` =  '',
 `projects`.`ean_supply` =  '',
 `projects`.`tax_referral` = ''
where `projects`.`id` = @projectId;

UPDATE `participation_project` SET
 `participation_project`.`power_kwh_consumption` = 0
where `participation_project`.`project_id` =  @projectId;

UPDATE `participant_mutations` SET
 `participant_mutations`.`type_id` = 8
where `participant_mutations`.`participation_id` in (
	SELECT `participation_project`.`id` FROM `participation_project`
	where `participation_project`.`project_id` =  @projectId)
and type_id = 13;

-- UPDATE `participant_mutations` SET
--  `participant_mutations`.`type_id` = 9
-- where `participant_mutations`.`participation_id` in (
-- 	SELECT `participation_project`.`id` FROM `participation_project`
-- 	where `participation_project`.`project_id` =  @projectId)
-- and type_id = 15;
--
-- UPDATE `participant_mutations` SET
--  `participant_mutations`.`type_id` = 10
-- where `participant_mutations`.`participation_id` in (
-- 	SELECT `participation_project`.`id`FROM `participation_project`
-- 	where `participation_project`.`project_id` =  @projectId
-- )
-- and type_id = 16;
--
-- UPDATE `participant_mutations` SET
--  `participant_mutations`.`type_id` = 11
-- where `participant_mutations`.`participation_id` in (
-- 	SELECT `participation_project`.`id`FROM `participation_project`
-- 	where `participation_project`.`project_id` =  @projectId
-- )
-- and type_id = 17;
--
