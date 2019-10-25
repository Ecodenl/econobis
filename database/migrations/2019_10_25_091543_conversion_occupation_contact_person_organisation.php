<?php

use App\Eco\Contact\ContactType;
use App\Eco\Occupation\OccupationContact;
use Illuminate\Database\Migrations\Migration;

class ConversionOccupationContactPersonOrganisation extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // link primaryContact = person and contact = orginastion is not allowed anymore.
        // in that case we switch the link:
        //        primaryContact = contact (organisation)
        //        contact = primaryContact (peron)
        $occupationContacts = OccupationContact::get();
        foreach ($occupationContacts as $occupationContact){
            // link primaryContact = person and contact = orginastion is not allowed.
            // in that case we switch the link:
            //   primaryContact = contact (organisation)
            //   contact = primaryContact (peron)
            $primaryContact = $occupationContact->primaryContact;
            $secondaryContact = $occupationContact->contact;
            $occupationId = $occupationContact->occupation_id;
            if ($primaryContact->type_id == ContactType::PERSON && $secondaryContact->type_id == ContactType::ORGANISATION) {

                if(!OccupationContact::where('occupation_id', $occupationId)
                    ->where('primary_contact_id', $secondaryContact->id)
                    ->Where('contact_id', $primaryContact->id)->exists() )
                {
                    $occupationContact->primary_contact_id = $secondaryContact->id;
                    $occupationContact->contact_id = $primaryContact->id;
                    $occupationContact->save();
                }else{
                    $occupationContact->delete();
                }
            }
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
