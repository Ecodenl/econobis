<?php

namespace App\Eco\AuditTrail;

use App\Eco\User\User;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Support\Facades\Crypt;

class AuditTrail extends Model
{
    protected $table = 'revisions';

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    private const SENSITIVE_FIELDS = [
        'iban',
        'iban_payout',
        'api_key',
        'mollie_api_key',
        'password',
        'alfresco_password',
        'twinfield_password',
        'twinfield_client_secret',
        'client_secret',
        'token',
        'secret',
    ];

    private function isEncryptedField(): bool
    {
        $modelClass = $this->revisionable_type;

        $modelClass = is_string($modelClass)
            ? (Relation::getMorphedModel($modelClass) ?? $modelClass)
            : null;

        if (!is_string($modelClass)
            || !class_exists($modelClass)
            || !is_subclass_of($modelClass, Model::class)) {

            // Fallback voor onbekende of verwijderde modellen
            return in_array(
                strtolower((string) $this->key),
                self::SENSITIVE_FIELDS,
                true
            );
        }

        $model = new $modelClass();

        return method_exists($model, 'isEncryptable')
            && $model->isEncryptable($this->key);
    }

    private function maskEncryptedValue($value)
    {
        if (!$this->isEncryptedField()) {
            return $value;
        }

        if ($value === null || $value === '') {
            return '';
        }

        try {
            $decryptedValue = Crypt::decrypt($value);

            return trim((string) $decryptedValue) === ''
                ? ''
                : '********';
        } catch (DecryptException $e) {
            return '********';
        }
    }

    public function getOldValueAttribute($value)
    {
        return $this->maskEncryptedValue($value);
    }

    public function getNewValueAttribute($value)
    {
        return $this->maskEncryptedValue($value);
    }

    public function getValueChangedAttribute()
    {
        $oldValue = $this->getRawOriginal('old_value');
        $newValue = $this->getRawOriginal('new_value');

        if (!$this->isEncryptedField()) {
            return $oldValue != $newValue;
        }

        try {
            if ($oldValue) {
                $oldValue = Crypt::decrypt($oldValue);
            }

            if ($newValue) {
                $newValue = Crypt::decrypt($newValue);
            }
        } catch (DecryptException $e) {
            // Bij mislukte decryptie vergelijken we de oorspronkelijke waarden.
            return $this->getRawOriginal('old_value')
                != $this->getRawOriginal('new_value');
        }

        return $oldValue != $newValue;
    }
}