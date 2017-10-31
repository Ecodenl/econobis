<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 9:14
 */

namespace App\Helpers\RequestQuery;

abstract class RequestQuery
{

    /**
     * @var RequestFilter
     */
    protected $filter;
    /**
     * @var RequestJoiner
     */
    protected $joiner;
    /**
     * @var RequestSort
     */
    protected $sort;

    public function __construct(RequestFilter $filter = null,
                                RequestSort $sort = null,
                                RequestJoiner $joiner = null)
    {
        $this->filter = $filter;
        $this->sort = $sort;
        $this->joiner = $joiner;

        $this->init();
    }

    public function apply($query)
    {
        $this->applyFilter($query);
        $this->applySort($query);
    }

    protected function init()
    {
        if ($this->filter) $this->filter->setJoiner($this->joiner);
        if ($this->sort) $this->sort->setJoiner($this->joiner);
    }

    public function getQuery()
    {
        $query = $this->baseQuery();

        $this->apply($query);

        return $query;
    }

    public function get()
    {
        return $this->getQuery()->get();
    }

    /**
     * @param $query
     */
    protected function applyFilter($query)
    {
        if ($this->filter) $this->filter->apply($query);
    }

    /**
     * @param $query
     */
    protected function applySort($query)
    {
        if ($this->sort) $this->sort->apply($query);
    }

    abstract protected function baseQuery();
}