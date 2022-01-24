<?php

namespace App\Http\Traits\GmailApi;

use Carbon\Carbon;
use Illuminate\Support\Collection;

trait FormatHeaders
{
    private function reformatHeaders(array $headers): Collection
    {
        $result = [];

        foreach ($headers as $header) {
            switch ($header->name) {
                case 'Subject':
                    $result[strtolower($header->name)] = $header->value;
                    break;
                case 'From':
                    $result[strtolower($header->name)] = $this->reformatEmailAddresses($header->value)[0];
                    break;
                case 'To':
                case 'CC':
                case 'BCC':
                    $result[strtolower($header->name)] = $this->reformatEmailAddresses($header->value);
                    break;
                case 'Date':
                    $result['date'] = Carbon::parse($header->value)->setTimezone(date_default_timezone_get());
                    break;
                case 'Message-ID':
                    $result['message_id'] = $header->value;
                    break;
            }
        }

        return collect($result);
    }

    /**
     * Explode string of email addresses into array
     * Only use email address between '<>' and not to full address
     *
     * Example of string  "Rob Rollenberg <rob@xaris.nl>, Wim Mosman@xaris.nl>"
     * Should return ['rob@xaris.nl', 'wim@xaris.nl']
     *
     * @param string $emailAddressesString
     * @return array
     */
    private function reformatEmailAddresses(string $emailAddressesString): array
    {
        $emailAddresses = [];
        $regexPattern = "/<([^>]+)>/";

        foreach (explode(', ', $emailAddressesString) as $emailAddress) {
            preg_match($regexPattern, $emailAddress, $match);

            if (!$match) {
                $emailAddresses[] = $emailAddress;
                continue;
            }

            [, $result] = $match;
            $emailAddresses[] = $result;
        }

        return $emailAddresses;
    }
}