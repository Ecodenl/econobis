<?php

namespace App\Eco\Document;

use App\Support\Enum\HasLegacyEnumHelpers;

enum DocumentGroup: string
{
    use HasLegacyEnumHelpers;

    case GENERAL = 'general';
    case CONTRACT = 'contract';
    case PARTICIPATION = 'participation';
    case REGISTRATION = 'registration';
    case INFRARED = 'infrared';
    case COST_ESTIMATE = 'cost-estimate';
    case MEMBERSHIP = 'membership';
    case INVOICE = 'invoice';
    case QUOTATION = 'quotation';
    case REVENUE = 'revenue';
    case ORDER = 'order';
    case PRIVACY = 'privacy';
    case QUICKSCAN = 'quickscan';
    case CONSULTATION = 'consultation';
    case BUDGET_REQUEST = 'budget-request';
    case PRE_REGISTRATION = 'pre-registration';
    case FINANCIAL_OVERVIEW = 'financial-overview';
    case DEFAULT_EMAIL_ATTACHMENT = 'default-email-attachment';

    public function getName(): string
    {
        return match ($this) {
            self::GENERAL => 'Algemeen',
            self::CONTRACT => 'Contract',
            self::PARTICIPATION => 'Deelname',
            self::REGISTRATION => 'Inschrijvingsbevestiging',
            self::INFRARED => 'Infraroodopnames',
            self::COST_ESTIMATE => 'Kostenraming',
            self::MEMBERSHIP => 'Lidmaatschap',
            self::INVOICE => 'Nota',
            self::QUOTATION => 'Kansactie',
            self::REVENUE => 'Opbrengst',
            self::ORDER => 'Order',
            self::PRIVACY => 'Privacyverklaring',
            self::QUICKSCAN => 'Quickscan',
            self::CONSULTATION => 'Rapportage coach',
            self::BUDGET_REQUEST => 'Budgetaanvraag',
            self::PRE_REGISTRATION => 'Voorinschrijving',
            self::FINANCIAL_OVERVIEW => 'Waardestaat',
            self::DEFAULT_EMAIL_ATTACHMENT => 'Standaard E-mail bijlage',
        };
    }
}
