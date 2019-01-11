<?php

namespace App\Http\JoryBuilders;


use Illuminate\Database\Eloquent\Collection;
use JosKolenberg\Jory\Jory;
use JosKolenberg\LaravelJory\Config\Config;
use JosKolenberg\LaravelJory\JoryBuilder;

class MailgunDomainJoryBuilder extends JoryBuilder
{
    protected function config(Config $config): void
    {
        $config->field('id');
        $config->field('domain');
        $config->field('secret');
        $config->field('is_verified');
        $config->field('isVerified');
        $config->field('created_at');
        $config->field('updated_at');
    }

    protected function afterFetch(Collection $collection, Jory $jory): Collection
    {
        if ($jory->hasField('isVerified')) {
            foreach ($collection as $item) {
                $item->isVerified = $item->is_verified;
            }
        }

        return $collection;
    }


}