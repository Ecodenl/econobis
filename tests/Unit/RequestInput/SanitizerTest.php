<?php

namespace Tests\Unit\RequestInput;

use App\Helpers\RequestInput\RequestInput;
use App\Helpers\RequestInput\Sanitizer;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class SanitizerTest extends TestCase
{
    /**
     * @test
     */
    public function it_can_retrieve_data_from_a_request()
    {
        $requestInput = $this->getRequestInput()
            ->string('empty')->next()
            ->string('string')->next()
            ->string('zero')->next()
            ->string('int')->next()
            ->string('null')->next()
            ->string('true')->next()
            ->string('false')->next()
            ->string('date')->next();

        $this->assertEquals([
            'empty' => '',
            'string' => 'this is a test',
            'zero' => '0',
            'int' => '123',
            'null' => 'null',
            'true' => 'true',
            'false' => 'false',
            'date' => '2018-04-05',
        ], $requestInput->get());
    }

    /**
     * @test
     */
    public function it_can_return_default_values_if_input_is_empty()
    {
        $requestInput = $this->getRequestInput()
            ->string('empty')->onEmpty('default')->next()
            ->string('string')->onEmpty('default')->next()
            ->string('zero')->onEmpty('default')->next()
            ->string('int')->onEmpty('default')->next()
            ->string('null')->onEmpty('default')->next()
            ->string('true')->onEmpty('default')->next()
            ->string('false')->onEmpty('default')->next()
            ->string('date')->onEmpty('default')->next();

        $this->assertEquals([
            'empty' => 'default',
            'string' => 'this is a test',
            'zero' => 'default',
            'int' => '123',
            'null' => 'null',
            'true' => 'true',
            'false' => 'false',
            'date' => '2018-04-05',
        ], $requestInput->get());
    }

    /**
     * @test
     */
    public function it_can_return_default_values_if_a_key_is_not_present_in_the_input_data()
    {
        $requestInput = $this->getRequestInput()
            ->string('empty')->next()
            ->string('string')->next()
            ->string('not_available')->whenMissing('default')->next();

        $this->assertEquals([
            'empty' => '',
            'string' => 'this is a test',
            'not_available' => 'default',
        ], $requestInput->get());
    }

    /**
     * @test
     */
    public function it_ignores_any_data_which_is_not_defined()
    {
        $requestInput = $this->getRequestInput()
            ->string('string')->next()
            ->string('null')->next()
            ->string('false')->next();

        $this->assertEquals([
            'string' => 'this is a test',
            'null' => 'null',
            'false' => 'false',
        ], $requestInput->get());
    }

    /**
     * @test
     */
    public function it_can_return_data_on_an_aliased_key()
    {
        $requestInput = $this->getRequestInput()
            ->string('string')->alias('string_new')->next();

        $this->assertEquals([
            'string_new' => 'this is a test',
        ], $requestInput->get());
    }

    /**
     * @test
     */
    public function it_can_validate_the_data()
    {
        $this->expectException(ValidationException::class);

        $requestInput = $this->getRequestInput()
            ->string('string')->validate('email')->next()
            ->get();

    }

    /**
     * @test
     */
    public function it_can_validate_the_data_by_pipe_notation()
    {
        $this->expectException(ValidationException::class);

        $requestInput = $this->getRequestInput()
            ->string('string')->validate('email|min:4')->next()
            ->get();

    }

    /**
     * @test
     */
    public function it_can_validate_the_data_by_array()
    {
        $this->expectException(ValidationException::class);

        $requestInput = $this->getRequestInput()
            ->string('string')->validate(['email', 'min:4'])->next()
            ->get();

    }

    /**
     * @test
     */
    public function it_can_cast_the_data()
    {
        $requestInput = $this->getRequestInput()
            ->string('empty')->next()
            ->string('string')->next()
            ->integer('zero')->next()
            ->integer('int')->next()
            ->string('null')->next()
            ->boolean('true')->next()
            ->boolean('false')->next()
            ->date('date')->next();

        $this->assertEquals([
            'empty' => '',
            'string' => 'this is a test',
            'zero' => 0,
            'int' => 123,
            'null' => 'null',
            'true' => true,
            'false' => true,
            'date' => new Carbon('2018-04-05'),
        ], $requestInput->get());
    }

    /**
     * @test
     */
    public function it_can_make_fields_nullable_which_converts_empty_values_to_null()
    {
        $requestInput = $this->getRequestInput()
            ->string('empty')->nullable()->next()
            ->string('string')->nullable()->next()
            ->integer('zero')->nullable()->next()
            ->integer('int')->nullable()->next()
            ->string('null')->nullable()->next()
            ->boolean('true')->nullable()->next()
            ->boolean('false')->nullable()->next()
            ->date('date')->nullable()->next();

        $this->assertEquals([
            'empty' => null,
            'string' => 'this is a test',
            'zero' => null,
            'int' => 123,
            'null' => 'null',
            'true' => true,
            'false' => true,
            'date' => new Carbon('2018-04-05'),
        ], $requestInput->get());
    }

    /**
     * @test
     */
    public function it_can_default_values_for_missing_keys_or_empty_values()
    {
        $requestInput = $this->getRequestInput()
            ->string('empty')->default('default')->next()
            ->string('string')->default('default')->next()
            ->integer('zero')->default(12345)->next()
            ->integer('int')->default('default')->next()
            ->string('null')->default('default')->next()
            ->boolean('true')->default('default')->next()
            ->boolean('false')->default('default')->next()
            ->date('date')->default('default')->next()
            ->string('not_available')->whenMissing('default')->next();

        $this->assertEquals([
            'empty' => 'default',
            'string' => 'this is a test',
            'zero' => 12345,
            'int' => 123,
            'null' => 'null',
            'true' => true,
            'false' => true,
            'date' => new Carbon('2018-04-05'),
            'not_available' => 'default',
        ], $requestInput->get());
    }

    public function getRequestInput()
    {
        return new Sanitizer($this->getExampleData());
    }

    public function getExampleData()
    {
        return [
            'empty' => '',
            'string' => 'this is a test',
            'zero' => '0',
            'int' => '123',
            'null' => 'null',
            'true' => 'true',
            'false' => 'false',
            'date' => '2018-04-05',
        ];
    }
}
