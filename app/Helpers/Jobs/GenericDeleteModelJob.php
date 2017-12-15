<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 14-12-2017
 * Time: 11:44
 */

namespace App\Helpers\Jobs;


use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Query\Builder;

class GenericDeleteModelJob
{

    /**
     * @var bool
     */
    protected $force = false;

    /**
     * @var Model
     */
    protected $model;

    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    /**
     * @param bool $force
     * @return $this
     */
    public function force($force = true)
    {
        $this->force = $force;
        return $this;
    }

    protected function deleteOnModel(Model $model)
    {
        if($this->force) $model->forceDelete();
        else $model->delete();
    }

    protected function deleteOnQuery($query)
    {
        if($this->force) $query->forceDelete();
        else $query->delete();
    }

    protected function deleteModel()
    {
        $this->deleteOnModel($this->model);
    }

    public static function single(Model $model, $force = false)
    {
        return (new static($model))->force($force)->handle();
    }

    public static function collection(Collection $collection, $force = false)
    {
        foreach($collection as $model){
            (new static($model))->force($force)->handle();
        }
    }

    public function handle(){
        $this->deleteModel();
    }
}