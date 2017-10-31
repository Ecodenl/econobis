<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 24-10-2017
 * Time: 16:26
 */

namespace App\Helpers\RequestQuery;

use Illuminate\Http\Request;

abstract class RequestSort
{

    protected $parameterName = 'sorts';

    protected $sorts = [];

    protected $fields = [];

    protected $mapping = [];

    protected $joins = [];

    protected $joiner;

    public function __construct(Request $request)
    {
        $this->setRequestSorts($request);
    }


    private function setRequestSorts(Request $request)
    {
        $sorts = json_decode($request->input($this->parameterName), true);

        if(!$sorts) return;

        foreach ($sorts as $sort) {
            $this->addRequestSort($sort);
        }
    }

    private function addRequestSort($sort)
    {
        if (!isset($sort['field'])) throw new RequestSortException('Missing field argument.');

        $this->addSort($sort['field'],
            isset($sort['order']) ? strtolower($sort['order']) : null
        );
    }

    private function addSort($field, $order = null)
    {
        if (!in_array($field, $this->fields)) throw new RequestSortException('Invalid field argument \'' . $field . '\' for sorting.');
        if (!is_null($order) && !in_array($order, ['asc', 'desc'])) throw new RequestSortException('Invalid order argument \'' . $order . '\' for sorting.');

        if (is_null($order)) $order = 'asc';

        $this->sorts[] = [
            'field' => $field,
            'order' => $order,
        ];
    }

    public function apply($query)
    {
        foreach ($this->sorts as $sort) {
            $this->applySingle($query, $sort['field'], $sort['order']);
        }
    }

    private function applySingle($query, $field, $order)
    {
        $this->applyJoin($query, $field);

        $customApplyMethod = $this->getCustomApplyMethodName($field);
        if (method_exists($this, $customApplyMethod)) {
            $runDefault = $this->$customApplyMethod($query, $order);

            if (!$runDefault) return;
        }

        $mappedField = $this->getMappedField($field);

        $this->applySort($query, $mappedField, $order);
    }

    private function getCustomApplyMethodName($field)
    {
        return 'apply' . studly_case($field) . 'Sort';
    }

    private function applyJoin($query, $field)
    {
        if (!array_key_exists($field, $this->joins)) return;

        $joinName = $this->joins[$field];
        if(!$this->joiner) throw new RequestFilterException('Missing Joiner to apply join ' . $joinName . ' in ' . get_called_class());

        $this->joiner->apply($query, $joinName);
    }

    public function setJoiner(RequestJoiner $joiner = null)
    {
        $this->joiner = $joiner;
    }

    private function getMappedField($field)
    {
        if (array_key_exists($field, $this->mapping)) return $this->mapping[$field];

        return $field;
    }

    protected function applySort($query, $mappedField, $order)
    {
        $query->orderBy($mappedField, $order);
    }
}