<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines contain the default error messages used by
    | the validator class. Some of these rules have multiple versions such
    | as the size rules. Feel free to tweak each of these messages.
    |
    */
    'accepted'             => 'Dit veld moet geaccepteerd zijn.',
    'active_url'           => 'Dit veld is geen geldige URL.',
    'after'                => 'Dit veld moet een datum na :date zijn.',
    'after_or_equal'       => 'Dit veld moet een datum na of gelijk aan :date zijn.',
    'alpha'                => 'Dit veld mag alleen letters bevatten.',
    'alpha_dash'           => 'Dit veld mag alleen letters, nummers, underscores (_) en streepjes (-) bevatten.',
    'alpha_num'            => 'Dit veld mag alleen letters en nummers bevatten.',
    'array'                => 'Dit veld moet geselecteerde elementen bevatten.',
    'before'               => 'Dit veld moet een datum voor :date zijn.',
    'before_or_equal'      => 'Dit veld moet een datum voor of gelijk aan :date zijn.',
    'between'              => [
        'numeric' => 'Dit veld moet tussen :min en :max zijn.',
        'file'    => 'Dit veld moet tussen :min en :max kilobytes zijn.',
        'string'  => 'Dit veld moet tussen :min en :max karakters zijn.',
        'array'   => 'Dit veld moet tussen :min en :max items bevatten.',
    ],
    'boolean'              => 'Dit veld moet ja of nee zijn.',
    'confirmed'            => 'Dit veld bevestiging komt niet overeen.',
    'date'                 => 'Dit veld moet een datum bevatten.',
    'date_format'          => 'Dit veld moet een geldig datum formaat bevatten.',
    'different'            => 'Dit veld en :other moeten verschillend zijn.',
    'digits'               => 'Dit veld moet bestaan uit :digits cijfers.',
    'digits_between'       => 'Dit veld moet bestaan uit minimaal :min en maximaal :max cijfers.',
    'dimensions'           => 'Dit veld heeft geen geldige afmetingen voor afbeeldingen.',
    'distinct'             => 'Dit veld heeft een dubbele waarde.',
    'email'                => 'Dit is geen geldig e-mailadres.',
    'exists'               => 'Deze waarde is niet gevonden.',
    'file'                 => 'Dit veld moet een bestand zijn.',
    'filled'               => 'Dit veld is verplicht.',
    'image'                => 'Dit veld moet een afbeelding zijn.',
    'in'                   => 'Dit veld is ongeldig.',
    'in_array'             => 'Dit veld bestaat niet in :other.',
    'integer'              => 'Dit veld moet een getal zijn.',
    'ip'                   => 'Dit veld moet een geldig IP-adres zijn.',
    'ipv4'                 => 'Dit veld moet een geldig IPv4-adres zijn.',
    'ipv6'                 => 'Dit veld moet een geldig IPv6-adres zijn.',
    'json'                 => 'Dit veld moet een geldige JSON-string zijn.',
    'max'                  => [
        'numeric' => 'Dit veld mag niet hoger dan :max zijn.',
        'file'    => 'Dit veld mag niet meer dan :max kilobytes zijn.',
        'string'  => 'Dit veld mag niet uit meer dan :max karakters bestaan.',
        'array'   => 'Dit veld mag niet meer dan :max items bevatten.',
    ],
    'mimes'                => 'Dit veld moet een bestand zijn van het bestandstype :values.',
    'mimetypes'            => 'Dit veld moet een bestand zijn van het bestandstype :values.',
    'min'                  => [
        'numeric' => 'Dit veld moet minimaal :min zijn.',
        'file'    => 'Dit veld moet minimaal :min kilobytes zijn.',
        'string'  => 'Dit veld moet minimaal :min karakters zijn.',
        'array'   => 'Dit veld moet minimaal :min items bevatten.',
    ],
    'not_in'               => 'Het formaat van :attribute is ongeldig.',
    'numeric'              => 'Dit veld moet een nummer zijn.',
    'present'              => 'Dit veld moet bestaan.',
    'regex'                => 'Dit veld formaat is ongeldig.',
    'required'             => 'Dit veld is verplicht.',
    'required_if'          => 'Dit veld is verplicht indien :other gelijk is aan :value.',
    'required_unless'      => 'Dit veld is verplicht tenzij :other gelijk is aan :values.',
    'required_with'        => 'Dit veld is verplicht i.c.m. :values',
    'required_with_all'    => 'Dit veld is verplicht i.c.m. :values',
    'required_without'     => 'Dit veld is verplicht als :values niet ingevuld is.',
    'required_without_all' => 'Dit veld is verplicht als :values niet ingevuld zijn.',
    'same'                 => 'Dit veld en :other moeten overeenkomen.',
    'size'                 => [
        'numeric' => 'Dit veld moet :size zijn.',
        'file'    => 'Dit veld moet :size kilobyte zijn.',
        'string'  => 'Dit veld moet :size karakters zijn.',
        'array'   => 'Dit veld moet :size items bevatten.',
    ],
    'string'               => 'Dit veld moet een tekenreeks zijn.',
    'timezone'             => 'Dit veld moet een geldige tijdzone zijn.',
    'unique'               => 'Dit veld is al in gebruik.',
    'uploaded'             => 'Het uploaden van bestand is mislukt.',
    'url'                  => 'Dit veld is geen geldige URL.',

    'enum_exists'         => 'Dit is geen geldig type.',


    /*
    |--------------------------------------------------------------------------
    | Custom Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | Here you may specify custom validation messages for attributes using the
    | convention "attribute.rule" to name the lines. This makes it quick to
    | specify a specific custom language line for a given attribute rule.
    |
    */
    'custom'               => [
        'attribute-name' => [
            'rule-name' => 'custom-message',
        ],
    ],
    /*
    |--------------------------------------------------------------------------
    | Custom Validation Attributes
    |--------------------------------------------------------------------------
    |
    | The following language lines are used to swap attribute place-holders
    | with something more reader friendly such as E-Mail Address instead
    | of "email". This simply helps us make messages a little cleaner.
    |
    */
    'attributes'           => [
        'address'               => 'adres',
        'age'                   => 'leeftijd',
        'available'             => 'beschikbaar',
        'city'                  => 'stad',
        'content'               => 'inhoud',
        'country'               => 'land',
        'date'                  => 'datum',
        'day'                   => 'dag',
        'description'           => 'omschrijving',
        'email'                 => 'e-mailadres',
        'excerpt'               => 'uittreksel',
        'first_name'            => 'voornaam',
        'gender'                => 'geslacht',
        'hour'                  => 'uur',
        'last_name'             => 'achternaam',
        'message'               => 'boodschap',
        'minute'                => 'minuut',
        'mobile'                => 'mobiel',
        'month'                 => 'maand',
        'name'                  => 'naam',
        'password'              => 'wachtwoord',
        'password_confirmation' => 'wachtwoordbevestiging',
        'phone'                 => 'telefoonnummer',
        'second'                => 'seconde',
        'sex'                   => 'geslacht',
        'size'                  => 'grootte',
        'subject'               => 'onderwerp',
        'time'                  => 'tijd',
        'title'                 => 'titel',
        'username'              => 'gebruikersnaam',
        'year'                  => 'jaar',
    ],
];