<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 13-09-2018
 * Time: 14:45
 */

namespace App\Http\Controllers\Api\Webform;


use Throwable;

class WebformException extends \Exception
{

    protected $statusCode;

    public function __construct(string $message, int $statusCode)
    {
        $this->statusCode = $statusCode;
        parent::__construct($message, 0, null);
    }

    public function getStatusCode()
    {
        return $this->statusCode;
    }

}