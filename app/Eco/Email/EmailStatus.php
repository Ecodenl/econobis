<?php

namespace App\Eco\Email;

use App\Support\Enum\HasLegacyEnumHelpers;

enum EmailStatus: string
{
    use HasLegacyEnumHelpers;

    case UNREAD = 'unread';
    case READ = 'read';
    case IN_PROGRESS = 'in_progress';
    case URGENT = 'urgent';
    case CLOSED = 'closed';

    public function getName(): string
    {
        return match ($this) {
            self::UNREAD => 'Ongelezen',
            self::READ => 'Gelezen',
            self::IN_PROGRESS => 'In behandeling',
            self::URGENT => 'Urgent',
            self::CLOSED => 'Afgehandeld',
        };
    }
}