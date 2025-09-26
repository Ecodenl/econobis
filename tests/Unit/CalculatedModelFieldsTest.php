<?php

namespace Tests\Unit;

use App\Eco\Administration\Administration;
use App\Eco\Contact\Contact;
use App\Eco\Invoice\Invoice;
use App\Eco\Invoice\InvoicePayment;
use App\Eco\Order\Order;
use App\Eco\Order\OrderProduct;
use App\Eco\ParticipantProject\ParticipantProject;
use App\Eco\Product\PriceHistory;
use App\Eco\Product\Product;
use App\Eco\Project\Project;
use App\Eco\Project\ProjectRevenue;
use App\Eco\Task\Task;
use App\Eco\User\User;
use App\Helpers\Invoice\InvoiceHelper;
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
        $this->assertOrdersFields();
        $this->assertInvoicesFields();
    }

    public function assertProductionProjectFields()
    {

    }

    public function assertParticipantProductionProjectFields()
    {
        $participantProductionProject = ParticipantProject::find(1);
        $this->assertEquals(0, $participantProductionProject->participations_worth_total);
        $this->assertEquals(0, $participantProductionProject->participations_current);

        $participantProductionProject = ParticipantProject::find(2);
        $this->assertEquals(100, $participantProductionProject->participations_worth_total);
        $this->assertEquals(10, $participantProductionProject->participations_current);
    }

    public function assertProductionProjectRevenueFields()
    {
        $revenue = ProjectRevenue::find(1);
        $this->assertEquals(0, $revenue->kwh_result);

        $revenue = ProjectRevenue::find(2);
        $this->assertEquals(-100, $revenue->kwh_result);

        $revenue = ProjectRevenue::find(3);
        $this->assertEquals(100, $revenue->kwh_result);

        $revenue = ProjectRevenue::find(4);
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

    public function assertOrdersFields()
    {
        $order = Order::find(1);
        $this->assertEquals(9910.72, $order->total_price_incl_vat);
        $this->assertEquals(109042.88, $order->total_price_incl_vat_per_year);

        $orderProduct = OrderProduct::find(1);
        $this->assertEquals(1235.72, $orderProduct->getAmountInclReductionInclVat());
        $this->assertEquals(4942.88, $orderProduct->getAmountInclReductionInclVatPerYear());

        $orderProduct = OrderProduct::find(2);
        $this->assertEquals(8675, $orderProduct->getAmountInclReductionInclVat());
        $this->assertEquals(104100, $orderProduct->getAmountInclReductionInclVatPerYear());

        $product = Product::find(1);
        $this->assertEquals(100, $product->current_price->price);
        $this->assertEquals(121, $product->current_price->price_incl_vat);

        $product = Product::find(2);
        $this->assertEquals(1000, $product->current_price->price);
        $this->assertEquals(1060, $product->current_price->price_incl_vat);

        $order = Order::find(2);
        $this->assertEquals(176.26, $order->total_price_incl_vat);
        $this->assertEquals(2115.12, $order->total_price_incl_vat_per_year);

    }

    public function assertInvoicesFields()
    {
        $invoice = Invoice::find(1);
        $this->assertEquals(109268.88, $invoice->total_incl_vat_incl_reduction);
        $this->assertEquals(109248.88, $invoice->amount_open);
        $this->assertEquals('2018-01-31', $invoice->date_payment_due->format('Y-m-d'));
    }


    public function insertData(){
      $this->insertProductionProjects();
      $this->insertContacts();
      $this->insertParticipantProductionProjects();
      $this->insertProductionProjectRevenues();
      $this->insertTasks();
      $this->insertOrder();
      $this->insertInvoice();
    }

    public function insertProductionProjects(){

        $productionProject = new Project();
        $productionProject->name = 'Project 1';
        $productionProject->code = 'PJT 1';
        $productionProject->owned_by_id = 1;
        $productionProject->participation_worth = 0;
        $productionProject->save();

        $productionProject = new Project();
        $productionProject->name = 'Project 2';
        $productionProject->code = 'PJT 2';
        $productionProject->owned_by_id = 1;
        $productionProject->participation_worth = 10;
        $productionProject->save();

        $productionProject = new Project();
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
        $participant = new ParticipantProject();
        $participant->contact_id = 1;
        $participant->status_id = 1;
        $participant->production_project_id = 2;
        $participant->participations_granted = 2;
        $participant->type_id = 1;
        $participant->save();

        $participant = new ParticipantProject();
        $participant->contact_id = 2;
        $participant->status_id = 2;
        $participant->production_project_id = 2;
        $participant->participations_granted = 20;
        $participant->participations_sold = 10;
        $participant->type_id = 1;
        $participant->save();

        $participant = new ParticipantProject();
        $participant->contact_id = 3;
        $participant->status_id = 1;
        $participant->production_project_id = 2;
        $participant->participations_granted = 8;
        $participant->participations_sold = 6;
        $participant->type_id = 1;
        $participant->save();

        //Project 3
        $participant = new ParticipantProject();
        $participant->contact_id = 1;
        $participant->status_id = 1;
        $participant->production_project_id = 3;
        $participant->participations_granted = 10;
        $participant->type_id = 1;
        $participant->save();

        $participant = new ParticipantProject();
        $participant->contact_id = 2;
        $participant->status_id = 1;
        $participant->production_project_id = 3;
        $participant->participations_granted = 10;
        $participant->participations_sold = 5;
        $participant->type_id = 1;
        $participant->save();

        $participant = new ParticipantProject();
        $participant->contact_id = 3;
        $participant->status_id = 2;
        $participant->production_project_id = 3;
        $participant->participations_granted = 8;
        $participant->type_id = 1;
        $participant->save();

        $participant = new ParticipantProject();
        $participant->contact_id = 4;
        $participant->status_id = 2;
        $participant->production_project_id = 3;
        $participant->participations_granted = 5;
        $participant->participations_sold = 3;
        $participant->type_id = 1;
        $participant->save();

        $participant = new ParticipantProject();
        $participant->contact_id = 5;
        $participant->status_id = 3;
        $participant->production_project_id = 3;
        $participant->participations_granted = 8;
        $participant->type_id = 1;
        $participant->save();

        $participant = new ParticipantProject();
        $participant->contact_id = 6;
        $participant->status_id = 3;
        $participant->production_project_id = 3;
        $participant->participations_granted = 8;
        $participant->participations_sold = 6;
        $participant->type_id = 1;
        $participant->save();
    }

    public function insertProductionProjectRevenues(){

        $revenue = new ProjectRevenue();
        $revenue->category_id = 2;
        $revenue->production_project_id = 2;
        $revenue->date_begin = new Carbon();
        $revenue->date_end = new Carbon();
        $revenue->date_entry = new Carbon();
        $revenue->save();

        $revenue = new ProjectRevenue();
        $revenue->category_id = 1;
        $revenue->production_project_id = 2;
        $revenue->kwh_start = 100;
        $revenue->date_begin = new Carbon();
        $revenue->date_end = new Carbon();
        $revenue->date_entry = new Carbon();
        $revenue->save();

        $revenue = new ProjectRevenue();
        $revenue->category_id = 2;
        $revenue->production_project_id = 2;
        $revenue->kwh_end = 100;
        $revenue->date_begin = new Carbon();
        $revenue->date_end = new Carbon();
        $revenue->date_entry = new Carbon();
        $revenue->save();

        $revenue = new ProjectRevenue();
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

    public function insertOrder(){

        $ad = new Administration();
        $ad->name = 'test administratie';
        $ad->administration_code = "1445";
        $ad->btw_number = '1233123123';
        $ad->IBAN = 'CH3608387000001080173';
        $ad->created_by_id = 1;
        $ad->save();

        $pr = new Product();
        $pr->code = "TST2";
        $pr->name = "Testje productje2";
        $pr->administration_id = 1;
        $pr->invoice_frequency_id = 'quarterly';
        $pr->duration_id = 'month';
        $pr->created_by_id = 1;
        $pr->save();

        $ph = new PriceHistory();
        $ph->product_id = 1;
        $ph->date_start = '2018-05-01';
        $ph->price = 100;
        $ph->vat_percentage = 21;
        $ph->save();

        $pr = new Product();
        $pr->code = "TST3";
        $pr->name = "Testje productje3";
        $pr->administration_id = 1;
        $pr->invoice_frequency_id = 'monthly';
        $pr->created_by_id = 1;
        $pr->duration_id = 'month';
        $pr->save();

        $ph = new PriceHistory();
        $ph->product_id = 2;
        $ph->date_start = '2018-05-01';
        $ph->price = 1000;
        $ph->vat_percentage = 6;
        $ph->save();

        $or = new Order();
        $or->contact_id = 1;
        $or->administration_id = 1;
        $or->status_id = 'active';
        $or->subject = 'Leuke order super!';
        $or->payment_type_id = 'transfer';
        $or->IBAN = 'IBN';
        $or->date_requested = '2018-05-02';
        $or->created_by_id = 1;
        $or->collection_frequency_id = 'yearly';
        $or->save();

        $op = new OrderProduct();
        $op->product_id = 1;
        $op->order_id = 1;
        $op->amount = 12;
        $op->amount_reduction = 13;
        $op->percentage_reduction = 14;
        $op->date_start = '2018-01-01';
        $op->date_end = '2020-01-01';
        $op->save();

        $op = new OrderProduct();
        $op->product_id = 2;
        $op->order_id = 1;
        $op->amount = 10;
        $op->amount_reduction = 17;
        $op->percentage_reduction = 18;
        $op->date_start = '2018-01-01';
        $op->date_end = '2020-01-01';
        $op->save();

        //Order met product met een variabele prijs
        $or = new Order();
        $or->contact_id = 1;
        $or->administration_id = 1;
        $or->status_id = 'active';
        $or->subject = 'Leuke order met variabele prijs!';
        $or->payment_type_id = 'transfer';
        $or->IBAN = 'IBN';
        $or->date_requested = '2018-05-02';
        $or->created_by_id = 1;
        $or->collection_frequency_id = 'yearly';
        $or->save();

        $pr = new Product();
        $pr->code = "VAR";
        $pr->name = "Variabele prijs product";
        $pr->administration_id = 1;
        $pr->invoice_frequency_id = 'monthly';
        $pr->created_by_id = 1;
        $pr->duration_id = 'month';
        $pr->save();

        $ph = new PriceHistory();
        $ph->product_id = 3;
        $ph->date_start = '2018-01-01';
        $ph->has_variable_price = true;
        $ph->vat_percentage = 6;
        $ph->save();

        $op = new OrderProduct();
        $op->product_id = 3;
        $op->order_id = 2;
        $op->amount = 10;
        $op->amount_reduction = 5;
        $op->percentage_reduction = 5;
        $op->variable_price = 18;
        $op->date_start = '2018-01-01';
        $op->date_end = '2020-01-01';
        $op->save();

    }

    public function insertInvoice(){

        $invoice = new Invoice();
        $invoice->order_id = 1;
        $invoice->mollie_status_id = 'not_used';
        $invoice->date_sent = '2018-01-01';
        $invoice->collection_frequency_id = Order::find(1)->collection_frequency_id;

        $invoice->save();
        InvoiceHelper::saveInvoiceProducts($invoice, Order::find(1));

        $invoicePayment = new InvoicePayment();
        $invoicePayment->invoice_id = 1;
        $invoicePayment->amount = 20;
        $invoicePayment->date_paid = '2018-01-01';
        $invoicePayment->save();
    }
}
