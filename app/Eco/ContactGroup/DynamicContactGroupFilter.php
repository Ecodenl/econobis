<?php

namespace App\Eco\ContactGroup;

use App\Eco\Contact\Contact;
use App\Eco\Occupation\Occupation;
use App\Eco\Order\OrderStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use JosKolenberg\Enum\EnumNotFoundException;

class DynamicContactGroupFilter extends Model
{
    protected $table = 'dynamic_contact_group_filter';
    protected $guarded = ['id'];

    //Niet weghalen! Deze model heeft zelf geen resource
    protected $appends = ['dataName'];

    public function contactGroup()
    {
        return $this->belongsTo(ContactGroup::class);
    }

    public function getDataNameAttribute()
    {
        if (!$this->model_name) {
            //Datums  omzetten
            if (preg_match("/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/", $this->data))  return Carbon::parse($this->data)->format('d-m-Y');

            // Booleans omzetten
            $yesNoFields = ['didAcceptAgreement'];
            if (in_array($this->field, $yesNoFields)) return $this->data ? 'Ja' : 'Nee';

            // orderStatus omzetten
            if ($this->field == 'orderStatus'){
                if($this->data){
                    return OrderStatus::get($this->data)->name;
                }
                else{
                    return '';
                }
            }

            return $this->data;
        }

        try {
            $model = $this->model_name::find($this->data);

            if($model)
            {
                switch ($this->model_name) {
                    case Occupation::class:
                        $name = $model->primary_occupation;
                        break;
                    case Contact::class:
                        $name = $model->full_name;
                        break;
                    default:
                        $name = $model->name;
                }
            }else{
                $name = '';
            }
       } catch (EnumNotFoundException $e) {
            $name = $this->model_name::get($this->data)->name;
        }

        return $name ? $name : '';
    }
}
