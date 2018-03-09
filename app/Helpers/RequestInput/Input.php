<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 09-03-2018
 * Time: 15:21
 */

namespace App\Helpers\RequestInput;


class Input
{

    /**
     * The input data
     * @var array
     */
    protected $data = [];

    /**
     * Input constructor.
     * @param array $data
     */
    public function __construct(array $data)
    {
        $this->data = $data;
    }

    /**
     * Tell if the key is present in the data.
     * @param $key
     * @return bool
     */
    public function has($key)
    {
        return array_key_exists($key, $this->data);
    }

    /**
     * Give all the data.
     * @return array
     */
    public function all()
    {
        return $this->data;
    }

    /**
     * Give all the data.
     * @return array
     */
    public function input($key)
    {
        return $this->has($key) ? $this->data[$key] : null;
    }
}