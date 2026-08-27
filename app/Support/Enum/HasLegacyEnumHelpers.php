<?php

namespace App\Support\Enum;

trait HasLegacyEnumHelpers
{
    public function getId(): string|int
    {
        return $this->value;
    }

    public static function collection(): array
    {
        return self::cases();
    }

    public static function get(string|int $id): ?self
    {
        return self::tryFrom($id);
    }

    public static function exists(string|int $id): bool
    {
        return self::tryFrom($id) !== null;
    }

    public static function random(): self
    {
        $cases = self::cases();
        return $cases[array_rand($cases)];
    }

    public function toArray(): array
    {
        return [
            'id' => $this->value,
            'name' => method_exists($this, 'getName') ? $this->getName() : $this->name,
        ];
    }
}