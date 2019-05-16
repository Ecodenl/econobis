<?php

namespace App\Http\JoryBuilders;


use JosKolenberg\LaravelJory\Config\Config;
use JosKolenberg\LaravelJory\JoryBuilder;

class LedgerJoryBuilder extends JoryBuilder
{
    protected function config(Config $config): void
    {
        $config->field('id')->filterable()->sortable();
        $config->field('description')->filterable()->sortable();
        $config->field('vat_code_id')->filterable()->sortable();
        $config->field('twinfield_ledger_code')->filterable()->sortable();
        $config->field('created_at')->filterable()->sortable();
        $config->field('updated_at')->filterable()->sortable();

        // Relations
        $config->relation('vatCode');
    }
}