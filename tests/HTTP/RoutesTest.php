<?php

namespace Tests\Feature;

use App\Eco\User\User;
use Tests\TestCase;
use PHPUnit\Framework\Assert as PHPUnit;

class ExampleTest extends TestCase
{

    /**
     * Test for grid routes.
     *
     * @return void
     */
    public function testApiGridRoutes()
    {
        $this->artisan('migrate:fresh');

        $user = User::find(1);


        $ApiGridRoutes =
            [
              'contact/grid',
              'intake/grid',
              'housing-file/grid',
              'user/grid',
              'contact-group/grid',
              'opportunity/grid',
              'task/grid/tasks',
              'task/grid/notes',
              'campaign/grid',
              'measure/grid',
              'mailbox/grid',
              'email/grid/in-folder/inbox',
              'email/grid/in-folder/sent',
              'email/grid/in-folder/concept',
              'email-template/grid',
              'document/grid',
              'document-template/grid',
              'audit-trail/grid',
              'team/grid',
              'quotation-request/grid',
              'production-project/grid',
            ];

        foreach ($ApiGridRoutes as $apiGridRoute) {

            fwrite(STDERR, print_r($apiGridRoute, TRUE));

            $response = $this
                ->actingAs($user)
                ->get('/api/' . $apiGridRoute);

            $actual = $response->getStatusCode();

            PHPUnit::assertTrue(
                $actual === 200,
                "Expected status code '200' but received {$actual} for route {$apiGridRoute}."
            );
        }
    }

    /**
     * Test for grid routes.
     *
     * @return void
     */
    public function testApiNewRoutes()
    {
        $this->artisan('migrate:fresh');

        $user = User::find(1);


        $ApiGridRoutes =
            [
                'contact/grid',
                'intake/grid',
                'housing-file/grid',
                'user/grid',
                'contact-group/grid',
                'opportunity/grid',
                'task/grid/tasks',
                'task/grid/notes',
                'campaign/grid',
                'measure/grid',
                'mailbox/grid',
                'email/grid/in-folder/inbox',
                'email/grid/in-folder/sent',
                'email/grid/in-folder/concept',
                'email-template/grid',
                'document/grid',
                'document-template/grid',
                'audit-trail/grid',
                'team/grid',
                'quotation-request/grid',
                'production-project/grid',
            ];

        foreach ($ApiGridRoutes as $apiGridRoute) {

            fwrite(STDERR, print_r($apiGridRoute, TRUE));

            $response = $this
                ->actingAs($user)
                ->get('/api/' . $apiGridRoute);

            $actual = $response->getStatusCode();

            PHPUnit::assertTrue(
                $actual === 200,
                "Could not create  '200' but received {$actual} for route {$apiGridRoute}."
            );
        }
    }
}