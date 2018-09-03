<?php

namespace App\Eco\ContactGroup;

use Illuminate\Database\Eloquent\Model;
use JosKolenberg\Enum\EnumNotFoundException;

class DynamicContactGroupFilter extends Model
{
    protected $table = 'dynamic_contact_group_filter';
    protected $guarded = ['id'];
    protected $appends = ['dataName'];

    public function contactGroup()
    {
        return $this->belongsTo(ContactGroup::class);
    }

    public function getDataNameAttribute(){
        if(!$this->model_name){
            return $this->data;
        }

        //db
        try {
            if($this->model_name == 'App\Eco\Occupation\Occupation') {
                $name = $this->model_name::find($this->data)->primary_occupation;
            }
            else{
                $name = $this->model_name::find($this->data)->name;
            }

        }
        //enum
        catch(EnumNotFoundException $e){
            $name = $this->model_name::get($this->data)->name;
        }

        return $name ? $name : '';
    }
}
