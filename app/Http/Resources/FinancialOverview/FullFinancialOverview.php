<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 04-01-2018
 * Time: 11:49
 */

namespace App\Http\Resources\FinancialOverview;

use Illuminate\Http\Resources\Json\Resource;

class FinancialOverview extends Resource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'administrationId' => $this->administration_id,
            'year' => $this->year,
            'definitive' => $this->definitive,
        ];
    }
}