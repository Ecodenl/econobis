<?php

namespace Tests\Feature;


use App\Eco\Mailbox\MailgunDomain;
use App\Eco\User\User;
use Carbon\Carbon;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class MailgunDomainTest extends TestCase
{

    public function setUp()
    {
        parent::setUp();
        $this->artisan('migrate:fresh');
        $this->insertData();
    }

    /** @test */
    public function it_can_give_a_list_of_mailgun_domains()
    {
        $this->actingAs(User::find(1))
            ->json('GET', '/api/mailgun-domain/grid')
            ->assertStatus(200)
            ->assertJson([
                'data' => [
                    [
                        'id' => 1,
                        'domain' => 'xaris.nl',
                        'secret' => '123987456654',
                        'isVerified' => true,
                        'createdAt' => '2019-01-01 10:11:12',
                        'updatedAt' => '2019-01-02 11:12:13',
                    ],
                    [
                        'id' => 2,
                        'domain' => 'econobis.nl',
                        'secret' => '112233',
                        'isVerified' => false,
                        'createdAt' => '2018-12-11 10:09:08',
                        'updatedAt' => '2018-12-21 01:02:03',
                    ],
                    [
                        'id' => 3,
                        'domain' => 'test.nl',
                        'secret' => '12398tes123!',
                        'isVerified' => true,
                        'createdAt' => '2017-04-01 00:01:02',
                        'updatedAt' => '2019-01-01 11:12:13',
                    ],
                ],
            ]);
    }

    /** @test */
    public function it_can_store_a_new_mailgun_domain_with_data()
    {
        $this->actingAs(User::find(1))
            ->json('POST', '/api/mailgun-domain', [
                'domain' => 'new-domain.nl',
                'secret' => 'new secret',
                'isVerified' => '1',
            ])
            ->assertStatus(201)
            ->assertJson([
                'data' => [
                    'id' => 4,
                    'domain' => 'new-domain.nl',
                    'secret' => 'new secret',
                    'isVerified' => true,
                ]
            ]);

        $this->assertEquals([
            'id' => 4,
            'domain' => 'new-domain.nl',
            'secret' => 'new secret',
            'is_verified' => true,
        ], MailgunDomain::orderBy('id', 'desc')->first()->makeHidden(['created_at', 'updated_at'])->toArray());
    }

    /** @test */
    public function it_can_store_a_new_mailgun_domain_without_data()
    {
        $this->actingAs(User::find(1))
            ->json('POST', '/api/mailgun-domain', [])
            ->assertStatus(201)
            ->assertJson([
                'data' => [
                    'id' => 4,
                    'domain' => '',
                    'secret' => '',
                    'isVerified' => false,
                ]
            ]);

        $this->assertEquals([
            'id' => 4,
            'domain' => '',
            'secret' => '',
            'is_verified' => false,
        ], MailgunDomain::orderBy('id', 'desc')->first()->makeHidden(['created_at', 'updated_at'])->toArray());
    }

    /** @test */
    public function it_can_update_a_mailgun_domain_with_data()
    {
        $this->actingAs(User::find(1))
            ->json('POST', '/api/mailgun-domain/1', [
                'domain' => 'xaris2.nl',
                'secret' => '1239874566542',
                'isVerified' => false,
            ])
            ->assertStatus(200)
            ->assertJson([
                'data' => [
                    'id' => 1,
                    'domain' => 'xaris2.nl',
                    'secret' => '1239874566542',
                    'isVerified' => false,
                ]
            ]);

        $this->assertEquals([
            'id' => 1,
            'domain' => 'xaris2.nl',
            'secret' => '1239874566542',
            'is_verified' => false,
        ], MailgunDomain::find(1)->makeHidden(['created_at', 'updated_at'])->toArray());
    }

    /** @test */
    public function it_can_update_a_mailgun_domain_with_some_data()
    {
        $this->actingAs(User::find(1))
            ->json('POST', '/api/mailgun-domain/2', [
                'secret' => '987654321',
            ])
            ->assertStatus(200)
            ->assertJson([
                'data' => [
                    'id' => 2,
                    'domain' => 'econobis.nl',
                    'secret' => '987654321',
                    'isVerified' => false,
                ]
            ]);

        $this->assertEquals([
            'id' => 2,
            'domain' => 'econobis.nl',
            'secret' => '987654321',
            'is_verified' => false,
        ], MailgunDomain::find(2)->makeHidden(['created_at', 'updated_at'])->toArray());
    }

    /** @test */
    public function it_cannot_update_a_mailgun_domain_without_permission()
    {
        $user = User::find(1);
        $keyUserRole = Role::findByName('Beheerder');
        $user->removeRole($keyUserRole);
        $this->actingAs($user)
            ->json('POST', '/api/mailgun-domain/2', [
                'secret' => '987654321',
            ])
            ->assertStatus(403);
    }

    /** @test */
    public function it_cannot_store_a_new_mailgun_domain_without_permission()
    {
        $user = User::find(1);
        $keyUserRole = Role::findByName('Beheerder');
        $user->removeRole($keyUserRole);
        $this->actingAs($user)
            ->json('POST', '/api/mailgun-domain', [
                'domain' => 'new-domain.nl',
                'secret' => 'new secret',
                'isVerified' => '1',
            ])
            ->assertStatus(403);
    }

    protected function insertData()
    {
        MailgunDomain::create([
            'domain' => 'xaris.nl',
            'secret' => '123987456654',
            'is_verified' => true,
            'created_at' => Carbon::create(2019, 1, 1, 10, 11, 12),
            'updated_at' => Carbon::create(2019, 1, 2, 11, 12, 13),
        ]);
        MailgunDomain::create([
            'domain' => 'econobis.nl',
            'secret' => '112233',
            'is_verified' => false,
            'created_at' => Carbon::create(2018, 12, 11, 10, 9, 8),
            'updated_at' => Carbon::create(2018, 12, 21, 1, 2, 3),
        ]);
        MailgunDomain::create([
            'domain' => 'test.nl',
            'secret' => '12398tes123!',
            'is_verified' => true,
            'created_at' => Carbon::create(2017, 4, 1, 0, 1, 2),
            'updated_at' => Carbon::create(2019, 1, 1, 11, 12, 13),
        ]);
    }
}