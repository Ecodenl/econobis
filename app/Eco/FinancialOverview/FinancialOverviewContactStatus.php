<?php

namespace App\Eco\FinancialOverview;

use App\Support\Enum\HasLegacyEnumHelpers;

enum FinancialOverviewContactStatus: string
{
    use HasLegacyEnumHelpers;

    case CONCEPT = 'concept';
    case TO_SEND = 'to-send';
    case IN_PROGRESS = 'in-progress';
    case ERROR_MAKING = 'error-making';
    case IS_SENDING = 'is-sending';
    CASE ERROR_SENDING = 'ERROR-SENDING';
    case IS_RESENDING = 'is-resending';
    case SENT = 'sent';

    public function getName(): string
    {
        return match ($this) {
            self::CONCEPT => 'Concept',
            self::TO_SEND => 'Te verzenden',
            self::IN_PROGRESS => 'Wordt definitief gemaakt',
            self::ERROR_MAKING => 'Fout bij maken',
            self::IS_SENDING => 'Wordt verstuurd',
            self::ERROR_SENDING => 'Opnieuw te verzenden',
            self::IS_RESENDING => 'Wordt opnieuw verstuurd',
            self::SENT => 'Verzonden',
        };
    }
}