<?php

namespace Tests\Unit;

use App\Eco\Contact\Contact;
use App\Eco\ParticipantProductionProject\ParticipantProductionProject;
use App\Eco\ProductionProject\ProductionProject;
use App\Eco\ProductionProject\ProductionProjectRevenue;
use App\Eco\Task\Task;
use App\Eco\User\User;
use Carbon\Carbon;
use Tests\TestCase;

class CalculatedModelFieldsTest extends TestCase
{
    public function setUp(){

        parent::setUp();
        $this->artisan('migrate:fresh');
        $this->be(User::find(1));
        $this->insertData();
    }

    public function testCalculatedFields()
    {
        $this->assertProductionProjectFields();
        $this->assertParticipantProductionProjectFields();
        $this->assertProductionProjectRevenueFields();
        $this->assertTasksFields();
    }

    public function assertProductionProjectFields()
    {
        $productionProject = ProductionProject::find(1);
        $this->assertEquals(0, $productionProject->issued_participations);
        $this->assertEquals(0, $productionProject->issued_participations_percentage);
        $this->assertEquals(0, $productionProject->participations_in_option);
        $this->assertEquals(0, $productionProject->issuable_participations);
        $this->assertEquals(0, $productionProject->participations_worth_total);

        $productionProject = ProductionProject::find(2);
        $this->assertEquals(10, $productionProject->issued_participations);
        $this->assertEquals(0, $productionProject->issued_participations_percentage);
        $this->assertEquals(4, $productionProject->participations_in_option);
        $this->assertEquals(-10, $productionProject->issuable_participations);
        $this->assertEquals(100, $productionProject->participations_worth_total);

        $productionProject = ProductionProject::find(3);
        $this->assertEquals(10, $productionProject->issued_participations);
        $this->assertEquals(10, $productionProject->issued_participations_percentage);
        $this->assertEquals(15, $productionProject->participations_in_option);
        $this->assertEquals(90, $productionProject->issuable_participations);
        $this->assertEquals(5000, $productionProject->participations_worth_total);
    }

    public function assertParticipantProductionProjectFields()
    {
        $participantProductionProject = ParticipantProductionProject::find(1);
        $this->assertEquals(20, $participantProductionProject->participations_worth_total);
        $this->assertEquals(2, $participantProductionProject->participations_current);

        $participantProductionProject = ParticipantProductionProject::find(2);
        $this->assertEquals(100, $participantProductionProject->participations_worth_total);
        $this->assertEquals(10, $participantProductionProject->participations_current);
    }

    public function assertProductionProjectRevenueFields()
    {
        $revenue = ProductionProjectRevenue::find(1);
        $this->assertEquals(0, $revenue->kwh_result);

        $revenue = ProductionProjectRevenue::find(2);
        $this->assertEquals(-100, $revenue->kwh_result);

        $revenue = ProductionProjectRevenue::find(3);
        $this->assertEquals(100, $revenue->kwh_result);

        $revenue = ProductionProjectRevenue::find(4);
        $this->assertEquals(100, $revenue->kwh_result);
    }

    public function assertTasksFields()
    {
        $task = Task::find(1);
        $this->assertEquals('2018-02-28 10:30:00', $task->datePlannedWithStartTime()->toDateTimeString());
        $this->assertEquals('2018-02-28 10:30:00', $task->datePlannedWithEndTime()->toDateTimeString());

        $task = Task::find(2);
        $this->assertEquals('2018-02-28 10:30:00', $task->datePlannedWithStartTime()->toDateTimeString());
        $this->assertEquals('2018-03-02 10:30:00', $task->datePlannedWithEndTime()->toDateTimeString());

        $task = Task::find(3);
        $this->assertEquals('2018-02-28 12:13:00', $task->datePlannedWithStartTime()->toDateTimeString());
        $this->assertEquals('2018-03-02 12:00:00', $task->datePlannedWithEndTime()->toDateTimeString());

        $task = Task::find(4);
        $this->assertEquals('2018-02-28 00:00:00', $task->datePlannedWithStartTime()->toDateTimeString());
        $this->assertEquals('2018-03-02 01:00:00', $task->datePlannedWithEndTime()->toDateTimeString());
    }

    public function insertData(){
      $this->insertProductionProjects();
      $this->insertContacts();
      $this->insertParticipantProductionProjects();
      $this->insertProductionProjectRevenues();
      $this->insertTasks();
    }

    public function insertProductionProjects(){

        $productionProject = new ProductionProject();
        $productionProject->name = 'Project 1';
        $productionProject->code = 'PJT 1';
        $productionProject->owned_by_id = 1;
        $productionProject->participation_worth = 0;
        $productionProject->save();

        $productionProject = new ProductionProject();
        $productionProject->name = 'Project 2';
        $productionProject->code = 'PJT 2';
        $productionProject->owned_by_id = 1;
        $productionProject->participation_worth = 10;
        $productionProject->save();

        $productionProject = new ProductionProject();
        $productionProject->name = 'Project 3';
        $productionProject->code = 'PJT 3';
        $productionProject->owned_by_id = 1;
        $productionProject->total_participations = 100;
        $productionProject->participation_worth = 500;
        $productionProject->save();
    }

    public function insertContacts(){

        $contact = new Contact();
        $contact->full_name = 'Piet';
        $contact->number = 'C1';
        $contact->save();

        $contact = new Contact();
        $contact->full_name = 'Klaas';
        $contact->number = 'C2';
        $contact->save();

        $contact = new Contact();
        $contact->full_name = 'Henk';
        $contact->number = 'C3';
        $contact->save();

        $contact = new Contact();
        $contact->full_name = 'Johan';
        $contact->number = 'C4';
        $contact->save();

        $contact = new Contact();
        $contact->full_name = 'Niels';
        $contact->number = 'C5';
        $contact->save();

        $contact = new Contact();
        $contact->full_name = 'Frank';
        $contact->number = 'C6';
        $contact->save();

    }

    public function insertParticipantProductionProjects(){

        //Status
        //1 Optie
        //2 Definitief
        //3 Verkocht

        //Project 1 leeg

        //Project 2
        $participant = new ParticipantProductionProject();
        $participant->contact_id = 1;
        $participant->status_id = 1;
        $participant->production_project_id = 2;
        $participant->participations_granted = 2;
        $participant->type_id = 1;
        $participant->save();

        $participant = new ParticipantProductionProject();
        $participant->contact_id = 2;
        $participant->status_id = 2;
        $participant->production_project_id = 2;
        $participant->participations_granted = 20;
        $participant->participations_sold = 10;
        $participant->type_id = 1;
        $participant->save();

        $participant = new ParticipantProductionProject();
        $participant->contact_id = 3;
        $participant->status_id = 1;
        $participant->production_project_id = 2;
        $participant->participations_granted = 8;
        $participant->participations_sold = 6;
        $participant->type_id = 1;
        $participant->save();

        //Project 3
        $participant = new ParticipantProductionProject();
        $participant->contact_id = 1;
        $participant->status_id = 1;
        $participant->production_project_id = 3;
        $participant->participations_granted = 10;
        $participant->type_id = 1;
        $participant->save();

        $participant = new ParticipantProductionProject();
        $participant->contact_id = 2;
        $participant->status_id = 1;
        $participant->production_project_id = 3;
        $participant->participations_granted = 10;
        $participant->participations_sold = 5;
        $participant->type_id = 1;
        $participant->save();

        $participant = new ParticipantProductionProject();
        $participant->contact_id = 3;
        $participant->status_id = 2;
        $participant->production_project_id = 3;
        $participant->participations_granted = 8;
        $participant->type_id = 1;
        $participant->save();

        $participant = new ParticipantProductionProject();
        $participant->contact_id = 4;
        $participant->status_id = 2;
        $participant->production_project_id = 3;
        $participant->participations_granted = 5;
        $participant->participations_sold = 3;
        $participant->type_id = 1;
        $participant->save();

        $participant = new ParticipantProductionProject();
        $participant->contact_id = 5;
        $participant->status_id = 3;
        $participant->production_project_id = 3;
        $participant->participations_granted = 8;
        $participant->type_id = 1;
        $participant->save();

        $participant = new ParticipantProductionProject();
        $participant->contact_id = 6;
        $participant->status_id = 3;
        $participant->production_project_id = 3;
        $participant->participations_granted = 8;
        $participant->participations_sold = 6;
        $participant->type_id = 1;
        $participant->save();
    }

    public function insertProductionProjectRevenues(){

        $revenue = new ProductionProjectRevenue();
        $revenue->category_id = 2;
        $revenue->production_project_id = 2;
        $revenue->date_begin = new Carbon();
        $revenue->date_end = new Carbon();
        $revenue->date_entry = new Carbon();
        $revenue->save();

        $revenue = new ProductionProjectRevenue();
        $revenue->category_id = 1;
        $revenue->production_project_id = 2;
        $revenue->kwh_start = 100;
        $revenue->date_begin = new Carbon();
        $revenue->date_end = new Carbon();
        $revenue->date_entry = new Carbon();
        $revenue->save();

        $revenue = new ProductionProjectRevenue();
        $revenue->category_id = 2;
        $revenue->production_project_id = 2;
        $revenue->kwh_end = 100;
        $revenue->date_begin = new Carbon();
        $revenue->date_end = new Carbon();
        $revenue->date_entry = new Carbon();
        $revenue->save();

        $revenue = new ProductionProjectRevenue();
        $revenue->category_id = 2;
        $revenue->production_project_id = 2;
        $revenue->kwh_start = 100;
        $revenue->kwh_end = 200;
        $revenue->date_begin = new Carbon();
        $revenue->date_end = new Carbon();
        $revenue->date_entry = new Carbon();
        $revenue->save();

    }

    public function insertTasks(){
        $task = new Task();
        $task->note = 'Test taak 1';
        $task->date_planned_start = '2018-02-28';
        $task->start_time_planned = '10:30:00';
        $task->save();

        $task = new Task();
        $task->note = 'Test taak 2';
        $task->date_planned_start = '2018-02-28';
        $task->start_time_planned = '10:30:00';
        $task->date_planned_finish = '2018-03-02';
        $task->save();

        $task = new Task();
        $task->note = 'Test taak 3';
        $task->date_planned_start = '2018-02-28';
        $task->start_time_planned = '12:13:00';
        $task->date_planned_finish = '2018-03-02';
        $task->end_time_planned = '12:00:00';
        $task->save();

        $task = new Task();
        $task->note = 'Test taak 4';
        $task->date_planned_start = '2018-02-28';
        $task->date_planned_finish = '2018-03-02';
        $task->save();

    }
}
