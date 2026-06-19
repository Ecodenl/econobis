<?php

namespace App\Eco\Jobs;

use JosKolenberg\Enum\EnumWithIdAndName;

class JobCategory extends EnumWithIdAndName
{
    static $all;

    protected static function seed()
    {
        return [
            new static('email', 'Email'),
            new static('participant', 'Deelnemer rapportage'),
            new static('revenue', 'Opbrengst rapportage'),
            new static('create-invoice', "Maken nota's"),
            new static('create-invoice-post', "Maken nota's post"),
            new static('create-payment-invoice', 'Maken uitkeringsnota\'s'),
            new static('process-revenues-kwh', 'Opbrengst verdelen'),
            new static('sent-invoice', 'Versturen nota'),
            new static('sent-invoice-reminder', 'Versturen herinnering nota'),
            new static('create-financial-overview-project', 'Aanmaken waardestaat project'),
            new static('sent-financial-overview-contact', 'Maken/versturen waardestaten email'),
            new static('create-financial-overview-contact-post', 'Maken waardestaten post'),
            new static('sync-laposta', 'Synchronisatie relatie in Laposta'),
        ];

    }
}