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
    protected static function seed()
    {
        return [
            new static('document', 'Document'),
            new static('project', 'Project'),
            new static('participant', 'Deelnemer'),
            new static('administration', 'Administratie'),
            new static('contact', 'Contact'),
            new static('campagne', 'Campagne'),
            new static('contactgroup', 'Contactgroep'),
            new static('order', 'Order'),
            new static('housingfile', 'Woningdossier'),
            new static('intake', 'Intake'),
            new static('measure', 'Maatregel'),
            new static('opportunity', 'Kans'),
            new static('quotationreguest', 'Offerteverzoek'),
            new static('task', 'Taak'),
        ];
    }
}