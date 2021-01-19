<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 01-12-2017
 * Time: 12:09
 */

namespace App\Http\Resources\FinancialOverviewPost;

use Illuminate\Http\Resources\Json\Resource;

class GridFinancialOverviewPost extends Resource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'financialOverviewId' => $this->financial_overview_id,
            'filename' => $this->filename,
            'name' => $this->name,
            'createdAt' => $this->created_at,
        ];
    }
}