<?php

namespace App\Eco\Webform;

use App\Http\Controllers\Api\Webform\WebformException;
use Illuminate\Support\Facades\Log;

class WebformActionGuard
{
    protected const REQUIRED_FILTERS = [
        WebformActionCode::PARTICIPATION_CREATE => ['status_id'],
        WebformActionCode::ORDER_CREATE => [],
    ];

    public function assertAllowed(Webform $webform, string $actionCode, array $values): void
    {
        $action = $webform->actions()
            ->where('action_code', $actionCode)
            ->where('enabled', true)
            ->with('filters')
            ->first();

        if (!$action) {

            $this->error("Actie '{$actionCode}' is niet toegestaan voor dit webformulier.");
        }

        foreach (self::REQUIRED_FILTERS[$actionCode] ?? [] as $requiredField) {
            if (!$action->filters->contains('field', $requiredField)) {
                $this->error("Verplicht filter '{$requiredField}' ontbreekt voor actie '{$actionCode}'.");
            }
        }

        foreach ($action->filters as $filter) {
            $value = $values[$filter->field] ?? null;

            if (!$this->matches($value, $filter->operator, $filter->value)) {
                $this->error("Filter '{$filter->field}' met operator '{$filter->operator}' staat waarde '{$value}' niet toe voor actie '{$actionCode}'.");
            }
        }
    }

    private function matches($value, string $operator, ?string $filterValue): bool
    {
        return match ($operator) {
            '=' => (string) $value === (string) $filterValue,
            '!=' => (string) $value !== (string) $filterValue,
            '<=' => (float) $value <= (float) $filterValue,
            '>=' => (float) $value >= (float) $filterValue,
            '<' => (float) $value < (float) $filterValue,
            '>' => (float) $value > (float) $filterValue,
            'in' => in_array((string) $value, array_map('trim', explode(',', (string) $filterValue)), true),
            default => false,
        };
    }

    protected function error(string $string, int $statusCode = 422)
    {
        throw new WebformException($string, $statusCode);
    }

}


