<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 04-01-2018
 * Time: 11:49
 */

namespace App\Http\Resources\Ledger;

use Illuminate\Http\Resources\Json\Resource;

class FullLedger extends Resource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'description' => $this->description,
            'vatCodeId' => $this->vat_code_id,
            'twinfieldLedgerCode' => $this->twinfield_ledger_code,
            'vatCode' => $this->vatCode,
        ];
    }
}