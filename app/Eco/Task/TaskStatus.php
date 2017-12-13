<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 12-12-2017
 * Time: 14:07
 */

namespace App\Eco\Task;


use JosKolenberg\Enum\Enum;
use JosKolenberg\Enum\EnumNotFoundException;

class TaskStatus extends Enum
{

    /**
     * @var
     */
    protected $id;
    /**
     * @var
     */
    protected $code;
    /**
     * @var
     */
    protected $name;

    public function __construct($id, $code, $name)
    {
        $this->id = $id;
        $this->code = $code;
        $this->name = $name;
    }


    /**
     * Seed the class with Enum instances
     *
     * @return array
     */
    protected static function seed()
    {
        return [
            new static(1, 'not_started', 'Niet gestart'),
            new static(2, 'started', 'Gestart'),
            new static(3, 'pending', 'In afwachting'),
            new static(4, 'finished', 'Klaar'),
        ];
    }

    /**
     * Return the name of the attribute which stores the identifier
     *
     * @return string
     */
    protected function identifierAttribute()
    {
        return 'code';
    }

    public static function getById($id)
    {
        foreach(static::collection() as $status){
            if($status->id == $id) return $status;
        }

        throw new EnumNotFoundException();
    }

    public function toArray()
    {
        return [
            'id' => $this->id,
            'code' => $this->code,
            'name' => $this->name,
        ];
    }

    public static function ids()
    {
        $result = [];
        foreach(static::collection() as $status){
            $result[] = $status->id;
        }
        return $result;
    }
}