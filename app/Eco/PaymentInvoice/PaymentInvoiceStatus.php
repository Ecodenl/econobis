<?php

namespace App\Eco\PaymentInvoice;

use App\Support\Enum\HasLegacyEnumHelpers;

enum PaymentInvoiceStatus: string
{
    use HasLegacyEnumHelpers;

    case SENT = 'sent';
    case NOT_PAID = 'not-paid';

    public function getName(): string
    {
        return match ($this) {
            self::SENT => 'Verzonden',
            self::NOT_PAID => 'Niet betaald',
        };
    }
}