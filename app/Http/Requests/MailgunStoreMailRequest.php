<?php

namespace App\Http\Requests;

use App\Eco\Mailbox\Mailbox;
use Illuminate\Foundation\Http\FormRequest;

class MailgunStoreMailRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [];
    }

    public function getTo()
    {
        return [$this->input('Delivered-To')];
    }

    public function getMailbox()
    {
        return Mailbox::where('inbound_mailgun_post_token', $this->route('mailgunPostToken'))->first();
    }

    public function getHtmlBody()
    {
        $html = $this->input('body-html');

        if(!$html) {
            $html = nl2br($this->input('body-plain'));
        }

        if (strlen($html) <= 250000) {
            return $html;
        }

        return substr($html, 0, 250000) . '<p>Deze mail is langer dan 250.000 karakters en hierdoor ingekort.</p>';
    }

    public function getCidForAttachment($attachmentKey)
    {
        $cidMapping = json_decode($this->input('content-id-map'), true);

        $cid = array_search($attachmentKey, $cidMapping);

        if(!$cid) {
            return null;
        }

        return str_replace(['<', '>'], '', $cid);
    }
}