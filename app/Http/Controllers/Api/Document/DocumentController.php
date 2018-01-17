<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 04-01-2018
 * Time: 11:32
 */

namespace App\Http\Controllers\Api\Document;

use App\Eco\Document\Document;
use App\Helpers\RequestInput\RequestInput;
use App\Http\RequestQueries\Document\Grid\RequestQuery;
use App\Http\Resources\Document\FullDocument;
use App\Http\Resources\Document\GridDocument;

class DocumentController
{

    public function grid(RequestQuery $requestQuery)
    {
        $documents = $requestQuery->get();

        $documents->load(['contact']);

        return GridDocument::collection($documents)
            ->additional(['meta' => [
                'total' => $requestQuery->total(),
            ]
            ]);
    }

    public function show(Document $document)
    {
        $document->load('contact, contactGroup, oppportunity, sentBy, createdBy');

        return FullDocument::make($document);
    }

    public function store(RequestInput $requestInput)
    {
        $data = $requestInput
            ->string('description')->next()
            ->string('documentType')->validate('required')->alias('document_type')->next()
            ->string('documentGroup')->validate('required')->alias('document_group')->next()
            ->string('filename')->validate('required')->next()
            ->string('freeText1')->alias('free_text_1')->next()
            ->string('freeText2')->alias('free_text_2')->next()
            ->integer('contactId')->validate('exists:contacts,id')->alias('contact_id')->next()
            ->integer('contactGroupId')->validate('exists:contact_groups,id')->alias('contact_group_id')->next()
            ->integer('opportunityId')->validate('exists:opportunities,id')->alias('opportunity_id')->next()
            ->integer('sentById')->validate('exists:users,id')->alias('sent_by_id')->next()
            ->get();

        //todo
        //validate if filename exist in Alfresco
        //create document
        //save in alfresco

        $document = new Document();
        $document->fill($data);
        $document->save();

        return FullDocument::make($document->fresh());
    }

    public function update(RequestInput $requestInput, Document $document) {

        $data = $requestInput
            ->string('description')->next()
            ->string('documentType')->validate('required')->alias('document_type')->next()
            ->string('documentGroup')->validate('required')->alias('document_group')->next()
            ->string('freeText1')->alias('free_text_1')->next()
            ->string('freeText2')->alias('free_text_2')->next()
            ->integer('contactId')->validate('exists:contacts,id')->alias('contact_id')->next()
            ->integer('contactGroupId')->validate('exists:contact_groups,id')->alias('contact_group_id')->next()
            ->integer('opportunityId')->validate('exists:opportunities,id')->alias('opportunity_id')->next()
            ->integer('sentById')->validate('exists:users,id')->alias('sent_by_id')->next()
            ->get();

        $document->fill($data);
        $document->save();

        return FullDocument::make($document->fresh());
    }
}