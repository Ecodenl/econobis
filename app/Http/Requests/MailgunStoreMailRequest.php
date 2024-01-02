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

    public function getFrom()
    {
        $from = $this->input('From');

        return $this->stripEmail($from);
    }

    public function getTo()
    {
        $to = explode(',', $this->input('To'));

        return array_map(function($item){
            return $this->stripEmail($item);
        }, $to);
    }

    public function getCc()
    {
        $to = explode(',', $this->input('Cc'));

        return array_map(function($item){
            return $this->stripEmail($item);
        }, $to);
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

        if(!$cidMapping){
            return null;
        }

        $cid = array_search($attachmentKey, $cidMapping);

        if(!$cid) {
            return null;
        }

        return str_replace(['<', '>'], '', $cid);
    }

    /**
     * Haal het emailadres uit een string met emailadres en naam. (bijv. "Econobis" <info@econobis.nl>)
     */
    private function stripEmail($email)
    {
        if (strpos($email, '<') !== false) {
            $email = substr($email, strpos($email, '<') + 1);
            $email = substr($email, 0, strpos($email, '>'));
        }

        return trim($email);
    }
}