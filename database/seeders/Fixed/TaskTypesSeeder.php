<?php

namespace Database\Seeders\Fixed;

use App\Eco\Task\TaskType;
use Illuminate\Database\Seeder;

class TaskTypesSeeder extends Seeder
{
    public function run(): void
    {
        TaskType::upsert([
            ['id' => 1, 'name' => 'Bellen', 'default_portal_task_type' => 0, 'uses_wf_new_task' => 0, 'email_template_id_wf_new_task' => null, 'uses_wf_completed_task' => 0, 'email_template_id_wf_completed_task' => null, 'number_of_days_to_send_email_completed_task' => 0, 'uses_wf_expired_task' => 0, 'email_template_id_wf_expired_task' => null],
            ['id' => 2, 'name' => 'E-mail', 'default_portal_task_type' => 0, 'uses_wf_new_task' => 0, 'email_template_id_wf_new_task' => null, 'uses_wf_completed_task' => 0, 'email_template_id_wf_completed_task' => null, 'number_of_days_to_send_email_completed_task' => 0, 'uses_wf_expired_task' => 0, 'email_template_id_wf_expired_task' => null],
            ['id' => 3, 'name' => 'Offerte maken', 'default_portal_task_type' => 0, 'uses_wf_new_task' => 0, 'email_template_id_wf_new_task' => null, 'uses_wf_completed_task' => 0, 'email_template_id_wf_completed_task' => null, 'number_of_days_to_send_email_completed_task' => 0, 'uses_wf_expired_task' => 0, 'email_template_id_wf_expired_task' => null],
            ['id' => 4, 'name' => 'Contactmoment', 'default_portal_task_type' => 0, 'uses_wf_new_task' => 0, 'email_template_id_wf_new_task' => null, 'uses_wf_completed_task' => 0, 'email_template_id_wf_completed_task' => null, 'number_of_days_to_send_email_completed_task' => 0, 'uses_wf_expired_task' => 0, 'email_template_id_wf_expired_task' => null],
            ['id' => 5, 'name' => 'Overige', 'default_portal_task_type' => 0, 'uses_wf_new_task' => 0, 'email_template_id_wf_new_task' => null, 'uses_wf_completed_task' => 0, 'email_template_id_wf_completed_task' => null, 'number_of_days_to_send_email_completed_task' => 0, 'uses_wf_expired_task' => 0, 'email_template_id_wf_expired_task' => null],
            ['id' => 6, 'name' => 'Webformulier', 'default_portal_task_type' => 0, 'uses_wf_new_task' => 0, 'email_template_id_wf_new_task' => null, 'uses_wf_completed_task' => 0, 'email_template_id_wf_completed_task' => null, 'number_of_days_to_send_email_completed_task' => 0, 'uses_wf_expired_task' => 0, 'email_template_id_wf_expired_task' => null],
            ['id' => 7, 'name' => 'Intern overleg', 'default_portal_task_type' => 0, 'uses_wf_new_task' => 0, 'email_template_id_wf_new_task' => null, 'uses_wf_completed_task' => 0, 'email_template_id_wf_completed_task' => null, 'number_of_days_to_send_email_completed_task' => 0, 'uses_wf_expired_task' => 0, 'email_template_id_wf_expired_task' => null],
            ['id' => 9, 'name' => 'Aanmelding', 'default_portal_task_type' => 0, 'uses_wf_new_task' => 0, 'email_template_id_wf_new_task' => null, 'uses_wf_completed_task' => 0, 'email_template_id_wf_completed_task' => null, 'number_of_days_to_send_email_completed_task' => 0, 'uses_wf_expired_task' => 0, 'email_template_id_wf_expired_task' => null],
            ['id' => 10, 'name' => 'Adviesgesprek', 'default_portal_task_type' => 0, 'uses_wf_new_task' => 0, 'email_template_id_wf_new_task' => null, 'uses_wf_completed_task' => 0, 'email_template_id_wf_completed_task' => null, 'number_of_days_to_send_email_completed_task' => 0, 'uses_wf_expired_task' => 0, 'email_template_id_wf_expired_task' => null],
            ['id' => 11, 'name' => 'Nota maken', 'default_portal_task_type' => 0, 'uses_wf_new_task' => 0, 'email_template_id_wf_new_task' => null, 'uses_wf_completed_task' => 0, 'email_template_id_wf_completed_task' => null, 'number_of_days_to_send_email_completed_task' => 0, 'uses_wf_expired_task' => 0, 'email_template_id_wf_expired_task' => null],
            ['id' => 12, 'name' => 'Informatie toesturen', 'default_portal_task_type' => 0, 'uses_wf_new_task' => 0, 'email_template_id_wf_new_task' => null, 'uses_wf_completed_task' => 0, 'email_template_id_wf_completed_task' => null, 'number_of_days_to_send_email_completed_task' => 0, 'uses_wf_expired_task' => 0, 'email_template_id_wf_expired_task' => null],
            ['id' => 13, 'name' => 'Bezoek', 'default_portal_task_type' => 0, 'uses_wf_new_task' => 0, 'email_template_id_wf_new_task' => null, 'uses_wf_completed_task' => 0, 'email_template_id_wf_completed_task' => null, 'number_of_days_to_send_email_completed_task' => 0, 'uses_wf_expired_task' => 0, 'email_template_id_wf_expired_task' => null],
            ['id' => 14, 'name' => 'Overstap energieleverancier', 'default_portal_task_type' => 0, 'uses_wf_new_task' => 0, 'email_template_id_wf_new_task' => null, 'uses_wf_completed_task' => 0, 'email_template_id_wf_completed_task' => null, 'number_of_days_to_send_email_completed_task' => 0, 'uses_wf_expired_task' => 0, 'email_template_id_wf_expired_task' => null],
            ['id' => 15, 'name' => 'Controleer contactgegevens', 'default_portal_task_type' => 1, 'uses_wf_new_task' => 0, 'email_template_id_wf_new_task' => null, 'uses_wf_completed_task' => 0, 'email_template_id_wf_completed_task' => null, 'number_of_days_to_send_email_completed_task' => 0, 'uses_wf_expired_task' => 0, 'email_template_id_wf_expired_task' => null],
            ['id' => 17, 'name' => 'Hoomdossier quickscan', 'default_portal_task_type' => 0, 'uses_wf_new_task' => 0, 'email_template_id_wf_new_task' => null, 'uses_wf_completed_task' => 0, 'email_template_id_wf_completed_task' => null, 'number_of_days_to_send_email_completed_task' => 0, 'uses_wf_expired_task' => 0, 'email_template_id_wf_expired_task' => null],
            ['id' => 18, 'name' => 'Adreswijziging deelnemer', 'default_portal_task_type' => 0, 'uses_wf_new_task' => 0, 'email_template_id_wf_new_task' => null, 'uses_wf_completed_task' => 0, 'email_template_id_wf_completed_task' => null, 'number_of_days_to_send_email_completed_task' => 0, 'uses_wf_expired_task' => 0, 'email_template_id_wf_expired_task' => null],
            ['id' => 19, 'name' => 'Nazorg', 'default_portal_task_type' => 0, 'uses_wf_new_task' => 0, 'email_template_id_wf_new_task' => null, 'uses_wf_completed_task' => 0, 'email_template_id_wf_completed_task' => null, 'number_of_days_to_send_email_completed_task' => 0, 'uses_wf_expired_task' => 0, 'email_template_id_wf_expired_task' => null],
            ['id' => 20, 'name' => 'Subsidieaanvraag', 'default_portal_task_type' => 0, 'uses_wf_new_task' => 0, 'email_template_id_wf_new_task' => null, 'uses_wf_completed_task' => 0, 'email_template_id_wf_completed_task' => null, 'number_of_days_to_send_email_completed_task' => 0, 'uses_wf_expired_task' => 0, 'email_template_id_wf_expired_task' => null],
        ], ['id'], [
            'name',
            'default_portal_task_type',
            'uses_wf_new_task',
            'email_template_id_wf_new_task',
            'uses_wf_completed_task',
            'email_template_id_wf_completed_task',
            'number_of_days_to_send_email_completed_task',
            'uses_wf_expired_task',
            'email_template_id_wf_expired_task',
        ]);
    }
}