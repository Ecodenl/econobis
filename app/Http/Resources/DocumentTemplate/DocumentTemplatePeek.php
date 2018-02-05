<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 26-10-2017
 * Time: 12:08
 */

namespace App\Http\Resources\DocumentTemplate;

use Illuminate\Http\Resources\Json\Resource;

class DocumentTemplatePeek extends Resource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'group' => $this->document_group,
            'type' => $this->template_type
        ];
    }
}