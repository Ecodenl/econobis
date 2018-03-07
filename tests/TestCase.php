<?php

namespace Tests;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication, RefreshDatabase;

    protected static $migrationsRun = false;

    public function setUp()
    {
        parent::setUp();

        if (!static::$migrationsRun) {
            $this->artisan('migrate:fresh');
            static::$migrationsRun = true;
        }
    }
}
