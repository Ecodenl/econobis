<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 26-10-2017
 * Time: 11:55
 */

namespace App\Eco\Document;


use JosKolenberg\Enum\Enum;
use JosKolenberg\Enum\EnumWithIdAndName;

class DocumentCreatedFrom extends EnumWithIdAndName
{

    /**
     * Seed the class with Enum instances
     *
     * @return array
     */
    protected static function seed(): array
    {
        return [
            new static('administration', 'Administratie'),
            new static('campaign', 'Campagne'),
            new static('contact', 'Contact'),
            new static('contactgroup', 'Contactgroep'),
            new static('participant', 'Deelnemer'),
            new static('document', 'Document'),
            new static('emailattachment', 'E-mail bijlage'),
            new static('intake', 'Intake'),
            new static('measure', 'Maatregel'),
            new static('opportunity', 'Kans'),
            new static('quotationrequest', 'Offerteverzoek'),
            new static('order', 'Order'),
            new static('project', 'Project'),
            new static('task', 'Taak'),
            new static('housingfile', 'Woningdossier'),
        ];
    }
}