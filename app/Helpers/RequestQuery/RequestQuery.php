<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 9:14
 */

namespace App\Helpers\RequestQuery;

use Illuminate\Http\Request;

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

    protected $offsetParameter = 'offset';
    protected $limitParameter = 'limit';

    /**
     * @var Request
     */
    protected $request;

    public function __construct(Request $request,
                                RequestFilter $filter = null,
                                RequestSort $sort = null,
                                RequestJoiner $joiner = null,
                                RequestExtraFilter $extraFilter = null)
    {
        $this->request = $request;
        $this->filter = $filter;
        $this->extraFilter = $extraFilter;
        $this->sort = $sort;
        $this->joiner = $joiner;

        $this->init();
    }

    public function apply($query)
    {
        $this->applyFilter($query);
        $this->applyExtraFilter($query);
        $this->applySort($query);
        $this->applyPagination($query);
    }

    protected function init()
    {
        if ($this->filter) $this->filter->setJoiner($this->joiner);
        if ($this->extraFilter) $this->extraFilter->setJoiner($this->joiner);
        if ($this->sort) $this->sort->setJoiner($this->joiner);
    }

    public function getRequest()
    {
        return $this->request;
    }

    public function getQuery()
    {
        $query = $this->baseQuery();

        $this->apply($query);

        return $query;
    }

    public function get()
    {
        $this->joiner->resetProcessedJoins();
        return $this->getQuery()->get();
    }

    public function total()
    {
        $this->joiner->resetProcessedJoins();
        $query = $this->baseQuery();
        $this->applyFilter($query);
        $this->applyExtraFilter($query);
        return $query->count();
    }

    public function totalIds()
    {
        $this->joiner->resetProcessedJoins();
        $query = $this->baseQuery();
        $this->applyFilter($query);
        $this->applyExtraFilter($query);
        $this->applySort($query);
        return $query->get()->pluck('id');
    }

    /**
     * @param $query
     */
    protected function applyFilter($query)
    {
        if ($this->filter) {
            $this->filter->apply($query);
        }
    }

    /**
     * @param $query
     */
    protected function applyExtraFilter($query)
    {
        if ($this->extraFilter) {
            if ($this->request && $this->request->input('filterType') === 'and') {
                $this->extraFilter->apply($query);
            } else if ($this->request && $this->request->input('filterType') === 'or') {
                // Als extra filters als 'OR' worden behandeld blijven de standaard filters wel als 'AND' werken,
                // daarom alle extra filters in een 'AND' wrappen
                $query->where(function($query){
                    $this->extraFilter->applyOr($query);
                });
            } else {
                $this->extraFilter->apply($query);
            }
        }
    }

    /**
     * @param $query
     */
    protected function applySort($query)
    {
        if ($this->sort) $this->sort->apply($query);
    }

    abstract protected function baseQuery();

    protected function applyPagination($query)
    {
        $limit = $this->getLimit();
        $offset = $this->getOffset();

        if ($limit) $query->limit($this->getLimit());
        if ($offset && $limit) $query->offset($this->getOffset()); // Offset kan alleen gezet werden icm limit

        return $query;
    }

    protected function getLimit()
    {
        return (int)$this->request->input($this->limitParameter, null);
    }

    protected function getOffset()
    {
        return (int)$this->request->input($this->offsetParameter, null);
    }

    public function getQueryNoPagination()
    {
        $query = $this->baseQuery();

        $this->joiner->resetProcessedJoins();

        $this->applyFilter($query);
        $this->applyExtraFilter($query);
        $this->applySort($query);

        return $query;
    }
}