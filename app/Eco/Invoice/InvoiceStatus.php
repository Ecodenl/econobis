<?php

namespace App\Eco\Invoice;

use App\Support\Enum\HasLegacyEnumHelpers;

enum InvoiceStatus: string
{
    use HasLegacyEnumHelpers;

    case TO_SEND = 'to-send';
    case IN_PROGRESS = 'in-progress';
    case ERROR_MAKING = 'error-making';
    case IS_SENDING = 'is-sending';
    CASE ERROR_SENDING = 'ERROR-SENDING';
    case IS_RESENDING = 'is-resending';
    case SENT = 'sent';
    case IS_EXPORTING = 'is-exporting';
    case ERROR_EXPORTING = 'error-exporting';
    case EXPORTED = 'exported';
    case PAID = 'paid';
    case IRRECOVERABLE = 'irrecoverable';

    public function getName(): string
    {
        return match ($this) {
            self::TO_SEND => 'Te verzenden',
            self::IN_PROGRESS => 'Wordt definitief gemaakt',
            self::ERROR_MAKING => 'Fout bij maken',
            self::IS_SENDING => 'Wordt verstuurd',
            self::ERROR_SENDING => 'Opnieuw te verzenden',
            self::IS_RESENDING => 'Wordt opnieuw verstuurd',
            self::SENT => 'Verzonden',
            self::IS_EXPORTING => 'Wordt gesynchroniseerd naar Twinfield',
            self::ERROR_EXPORTING => 'Fout bij synchroniseren naar Twinfield',
            self::EXPORTED => 'Geboekt naar Twinfield',
            self::PAID => 'Betaald',
            self::IRRECOVERABLE => 'Oninbaar',
        };
    }
}