<?php

namespace Tests\Feature;

use App\Eco\User\User;
use Spatie\Permission\Models\Permission;
use Tests\TestCase;

class ExampleTest extends TestCase
{

    /**
     * The main test calling other tests.
     *
     * @return void
     */
    public function testRoutes()
    {
        $user = User::find(1);

        $denied = [];

        foreach (Permission::all() as $permission)
        {
            $user->syncPermissions([$permission]);
            $this->ApiGridRoutes($user, $permission->name, $denied);
            $this->ApiDetailRoutes($user, $permission->name, $denied);
        }

        dump($denied);
    }

    /**
     * Test for grid routes.
     *
     * @param User $user
     *
     * @return void
     */
    public function ApiGridRoutes(User $user, $permissionName, &$denied)
    {
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

            $response = $this
                ->actingAs($user)
                ->get('/api/' . $apiGridRoute);

            if($response->getStatusCode() === 429){
                array_push($denied, ['grid', $apiGridRoute, $permissionName]);
            }
        }
    }

    /**
     * Test for detail routes.
     *
     * @param User $user
     *
     * @return void
     */
    public function ApiDetailRoutes(User $user, $permissionName, &$denied)
    {
        $ApiDetailRoutes =
            [
                'contact/1',
                'intake/1',
                'housing-file/1',
                'user/1',
                'contact-group/1',
                'opportunity/1',
                'task/1',
                'campaign/1',
                'measure/1',
                'mailbox/1',
                'email/1',
                'email-template/1',
                'document/1',
                'document-template/1',
                'audit-trail/1',
                'team/1',
                'quotation-request/1',
                'production-project/1',
            ];

        foreach ($ApiDetailRoutes as $apiDetailRoute) {

            $response = $this
                ->actingAs($user)
                ->get('/api/' . $apiDetailRoute);

            if($response->getStatusCode() === 429){
                array_push($denied, ['details', $apiDetailRoute, $permissionName]);
            }
        }
    }
}