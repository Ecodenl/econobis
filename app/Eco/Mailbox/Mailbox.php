<?php

namespace App\Eco\Mailbox;

use App\Eco\User\User;
use App\Http\Traits\Encryptable;
use Illuminate\Database\Eloquent\Model;

class Mailbox extends Model
{
    use Encryptable;

    protected $guarded = ['id'];

    protected $dates = [
        'created_at',
        'updated_at',
    ];

    protected $encryptable = [
        'password'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'primary' => 'boolean',
        'valid' => 'boolean',
        'link_contact_from_email_to_address' => 'boolean',
    ];

    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    public function mailboxIgnores()
    {
        return $this->hasMany(MailboxIgnore::class);
    }

    public function mailgunDomain()
    {
        return $this->belongsTo(MailgunDomain::class);
    }

    public function oauthApiSettings()
    {
        return $this->hasOne(MailboxOauthApiSettings::class);
    }

    public static function getDefault()
    {
        return static::where('primary', true)->first();
    }

    public function getIncomingServerType()
    {
        if (!$this->incoming_server_type) return null;

        return IncomingServerType::get($this->incoming_server_type);
    }
    public function getOutcomingServerType()
    {
        if (!$this->outgoing_server_type) return null;

        return OutgoingServerType::get($this->outgoing_server_type);
    }

    public function ignoresEmailAddress(string $emailAddress)
    {
        foreach ($this->mailboxIgnores as $mailboxIgnore) {
            if ($mailboxIgnore->ignoresEmailAddress($emailAddress)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Geef de config om Mailer object mee aan te kunnen maken.
     */
    public function getConfig()
    {
        return match ($this->outgoing_server_type) {
            'ms-oauth' => $this->getMicrosoftGraphConfig(),
            'mailgun' => $this->getMailgunConfig(),
            default => $this->getSmtpConfig(),
        };
    }

    protected function getSmtpConfig()
    {
        return [
            'from' => [
                'address' => $this->email,
                'name' => $this->name,
            ],
            'transport' => 'smtp',
            'host' => $this->smtp_host,
            'port' => $this->smtp_port,
            'encryption' => $this->smtp_encryption,
            'username' => $this->username,
            'password' => $this->password,
        ];
    }

    protected function getMicrosoftGraphConfig()
    {
        return [
            'from' => [
                'address' => $this->email,
                'name' => $this->name,
            ],
            'transport' => 'microsoft-graph-custom',
            'microsoft_graph_tenant_id' => optional($this->oauthApiSettings)->tenant_id,
            'microsoft_graph_client_id' => optional($this->oauthApiSettings)->client_id,
            'microsoft_graph_client_secret' => optional($this->oauthApiSettings)->client_secret,
        ];
    }

    protected function getMailgunConfig()
    {
        $mailgunDomain = $this->mailgunDomain;
        if(!$mailgunDomain){
            throw new \Exception('Mailbox ' . $this->id . ' given to apply Mailgun but mailbox has no Mailgun domain.');
        }
        if(!$mailgunDomain->is_verified){
            throw new \Exception('Mailbox ' . $this->id . ' given to apply Mailgun but Mailgun domain has not been verified.');
        }

        return [
            'from' => [
                'address' => $this->email,
                'name' => $this->name,
            ],
            'transport' => 'mailgun',
            'domain' => $mailgunDomain->domain,
            'secret' => $mailgunDomain->secret,
            'endpoint' => 'api.eu.mailgun.net',
            'scheme' => 'https',
        ];
    }
}
