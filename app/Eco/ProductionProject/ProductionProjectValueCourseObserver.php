<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 20-10-2017
 * Time: 10:00
 */

namespace App\Eco\ProductionProject;

use Illuminate\Support\Facades\Auth;

class ProductionProjectValueCourseObserver
{

    public function creating(ProductionProjectValueCourse $productionProjectValueCourse)
    {
        $userId = Auth::id();
        $productionProjectValueCourse->created_by_id = $userId;
    }
}