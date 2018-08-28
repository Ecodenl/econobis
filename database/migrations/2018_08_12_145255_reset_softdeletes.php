<?php

use App\Eco\Address\Address;
use App\Eco\Administration\Administration;
use App\Eco\Contact\Contact;
use App\Eco\Order\Order;
use App\Eco\Organisation\Organisation;
use App\Eco\ParticipantTransaction\ParticipantTransaction;
use App\Eco\Person\Person;
use App\Eco\Product\Product;
use App\Eco\Task\Task;
use App\Eco\User\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;

class ResetSoftdeletes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $mailContent = '<h1>De volgende items zijn teruggezet voor coöperatie '  . config('app.name') . '</h1><br><br>';
        $mailContent .= '<ul>';

        Auth::setUser(User::find(1));

        foreach (Task::onlyTrashed()->get() as $item){
            $item->deleted_at = null;
            $item->save();
            $mailContent .=('<li>Taak met id: '. $item->id . ', ' . $item->note . ' Teruggezet!' . '</li>');
        }

        foreach (Order::onlyTrashed()->get() as $item){
            $item->deleted_at = null;
            $item->save();
            $mailContent .=('<li>Order met id: '. $item->id . ', ' . $item->subject . ' Teruggezet!' . '</li>');
        }

        foreach (Person::onlyTrashed()->get() as $item){
            $item->deleted_at = null;
            $item->save();
        }

        foreach (Contact::onlyTrashed()->get() as $item){
            $item->deleted_at = null;
            $item->save();
            $mailContent .=('<li>Contact met id: '. $item->id . ', ' . $item->full_name .  ' Teruggezet!' . '</li>');
        }

        foreach (Product::onlyTrashed()->get() as $item){
            $item->deleted_at = null;
            $item->save();
            $mailContent .=('<li>Product met id: '. $item->id . ', ' . $item->name . ' Teruggezet!' . '</li>');
        }

        foreach (Organisation::onlyTrashed()->get() as $item){
            $item->deleted_at = null;
            $item->save();
        }

        foreach (Administration::onlyTrashed()->get() as $item){
            $item->deleted_at = null;
            $item->save();
            $mailContent .=('<li>Administratie met id: '. $item->id . ', ' . $item->name . ' Teruggezet!' . '</li>');
        }

        foreach (ParticipantTransaction::whereNotNull('deleted_at')->get() as $item){
            $mailContent .=('<li>Participant transactie '. $item->id . ' verwijderd!' . '</li>');
            $item->delete();
        }

        foreach (\App\Eco\ParticipantProductionProject\ParticipantProductionProject::onlyTrashed()->get() as $item){
            $item->deleted_at = null;
            $item->save();
            $mailContent .=('<li>Participatie met id: '. $item->id . ', ' . ($item->contact ? $item->contact->full_name : '') . ' in project: ' . $item->production_project_id . ' Teruggezet!' . '</li>');
        }

        foreach (Address::onlyTrashed()->get() as $item){
            $item->deleted_at = null;
            $item->save();
            $mailContent .=('<li>Adres met id: '. $item->id . ', ' . $item->street . ' ' . $item->number . $item->addition . ', ' . $item->city . ' van contact: ' . ($item->contact ? $item->contact->full_name : '') . ' Teruggezet!' . '</li>');
        }

        $mailContent .= '</ul>';
        if (\Config::get('app.env') == 'production') { // alleen mail versturen in productie
            Mail::send('emails.generic', ['html_body' => $mailContent], function ($message) {
                $message->subject('Softdelete teruggezet voor ' . config('app.name'));
                $message->to(['fren.dehaan@xaris.nl', 'rene.van.vliet@outlook.com']);
            });
        }


//        //Participant transacties zijn geen softdelete meer
        Schema::table('participant_transactions', function (Blueprint $table) {
            $table->dropColumn('deleted_at');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {

    }
}
