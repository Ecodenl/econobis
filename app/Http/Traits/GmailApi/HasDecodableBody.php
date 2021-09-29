<?php

namespace App\Http\Traits\GmailApi;

trait HasDecodableBody
{

    /**
     * @param $content
     *
     * @return string
     */
    public function getDecodedBody($content): string
    {
        $content = str_replace('_', '/', str_replace('-', '+', $content));

        return base64_decode($content);
    }

}