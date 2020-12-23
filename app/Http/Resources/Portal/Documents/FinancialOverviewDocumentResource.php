<?php

namespace App\Http\Resources\Portal\Documents;

use Illuminate\Http\Resources\Json\Resource;

class FinancialOverviewDocumentResource extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     *
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'description' => $this->financialOverview->description,
            'name' => $this->name,
            'filename' => $this->filename,
            'dateSent' => $this->date_sent,
        ];
    }
}
