<?php

namespace Illuminate\Database\Eloquent;

trait EcoSoftDelete
{
    public function softDelete(){
        $this->is_deleted = 1;
        $this->save();
    }

    public function restore(){
        $this->is_deleted = 0;
        $this->save();
    }

    public function forceDelete(){
        $this->delete();
    }
}
