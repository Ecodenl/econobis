<?php

namespace App\Eco\Jobs;

use App\Support\Enum\HasLegacyEnumHelpers;

enum JobCategory: string
{
    use HasLegacyEnumHelpers;

    case EMAIL = 'email';
    case PARTICIPANT = 'participant';
    case REVENUE = 'revenue';
    case CREATE_INVOICE = 'create-invoice';
    case CREATE_INVOICE_POST = 'create-invoice-post';
    case CREATE_PAYMENT_INVOICE = 'create-payment-invoice';
    case PROCESS_REVENUES_KWH = 'process-revenues-kwh';
    case SENT_INVOICE = 'sent-invoice';
    case SENT_INVOICE_REMINDER = 'sent-invoice-reminder';
    case CREATE_FINANCIAL_OVERVIEW_PROJECT = 'create-financial-overview-project';
    case SENT_FINANCIAL_OVERVIEW_CONTACT = 'sent-financial-overview-contact';
    case CREATE_FINANCIAL_OVERVIEW_CONTACT_POST = 'create-financial-overview-contact-post';
    case SYNC_LAPOSTA = 'sync-laposta';

    public function getName(): string
    {
        return match ($this) {
            self::EMAIL => 'Email',
            self::PARTICIPANT => 'Deelnemer rapportage',
            self::REVENUE => 'Opbrengst rapportage',
            self::CREATE_INVOICE => "Maken nota's",
            self::CREATE_INVOICE_POST => "Maken nota's post",
            self::CREATE_PAYMENT_INVOICE => 'Maken uitkeringsnota\'s',
            self::PROCESS_REVENUES_KWH => 'Opbrengst verdelen',
            self::SENT_INVOICE => 'Versturen nota',
            self::SENT_INVOICE_REMINDER => 'Versturen herinnering nota',
            self::CREATE_FINANCIAL_OVERVIEW_PROJECT => 'Aanmaken waardestaat project',
            self::SENT_FINANCIAL_OVERVIEW_CONTACT => 'Maken/versturen waardestaten email',
            self::CREATE_FINANCIAL_OVERVIEW_CONTACT_POST => 'Maken waardestaten post',
            self::SYNC_LAPOSTA => 'Synchronisatie relatie in Laposta',
        };
    }
}