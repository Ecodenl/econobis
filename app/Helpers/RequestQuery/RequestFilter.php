<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 24-10-2017
 * Time: 10:29
 */

namespace App\Helpers\RequestQuery;

use Illuminate\Http\Request;

abstract class RequestFilter
{

    protected $parameterName = 'filters';

    protected $filters = [];

    protected $fields = [];

    protected $mapping = [];

    protected $joins = [];

    protected $defaultTypes = [
        '*' => 'ct',
    ];

    protected $types = [
        'eq',
        'neq',
        'ct',
        'lt',
        'lte',
        'gt',
        'gte',
        'bw',
        'nbw',
        'ew',
        'new',
        'nl',
        'nnl',
    ];

    protected $joiner;

    public function __construct(Request $request)
    {
        $this->setRequestFilters($request);
    }

    public function apply($query)
    {
        foreach ($this->filters as $filter) {
            $this->applySingle($query, $filter['field'], $filter['type'], $filter['data']);
        }
    }

    private function setRequestFilters(Request $request)
    {
        $filters = json_decode($request->input($this->parameterName), true);

        if(!$filters) return;

        foreach ($filters as $filter) {
            $this->addRequestFilter($filter);
        }
    }

    private function addRequestFilter($filter)
    {
        if (!isset($filter['field'])) throw new RequestFilterException('Missing field argument.');

        $this->addFilter($filter['field'],
            isset($filter['type']) ? $filter['type'] : null,
            isset($filter['data']) ? $filter['data'] : null
        );
    }

    private function addFilter($field, $type = null, $data = null)
    {
        if (!in_array($field, $this->fields)) throw new RequestFilterException('Invalid field argument');
        if (!is_null($type) && !in_array($type, $this->types)) throw new RequestFilterException('Invalid type argument');

        if (is_null($type)) $type = $this->getDefaultTypeForField($field);

        if (!in_array($type, ['nl', 'nnl']) && $data === null) throw new RequestFilterException('Missing data argument for type ' . $type);

        $this->filters[] = [
            'field' => $field,
            'type' => $type,
            'data' => $data,
        ];
    }

    private function applySingle($query, $field, $type, $data = null)
    {
        $this->applyJoin($query, $field);

        $customApplyMethod = $this->getCustomApplyMethodName($field);
        if (method_exists($this, $customApplyMethod)) {
            $runDefault = $this->$customApplyMethod($query, $type, $data);

            if (!$runDefault) return;
        }

        $mappedField = $this->getMappedField($field);

        $this->applyFilter($query, $mappedField, $type, $data);
    }

    private function getMappedField($field)
    {
        if (array_key_exists($field, $this->mapping)) return $this->mapping[$field];

        return $field;
    }

    private function getDefaultTypeForField($field)
    {
        if (isset($this->defaultTypes[$field])) {
            return $this->defaultTypes[$field];
        } elseif (isset($this->defaultTypes['*'])) {
            return $this->defaultTypes['*'];
        } else {
            return 'eq';
        }
    }

    private function getCustomApplyMethodName($field)
    {
        return 'apply' . studly_case($field) . 'Filter';
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

    protected function applyFilter($query, $mappedField, $type, $data)
    {
        switch ($type) {
            case 'eq':
                $query->where($mappedField, '=', $data);
                break;
            case 'neq':
                $query->where($mappedField, '!=', $data);
                break;
            case 'ct':
                $query->where($mappedField, 'LIKE', '%' . $data . '%');
                break;
            case 'lt':
                $query->where($mappedField, '<', $data);
                break;
            case 'lte':
                $query->where($mappedField, '<=', $data);
                break;
            case 'gt':
                $query->where($mappedField, '>', $data);
                break;
            case 'gte':
                $query->where($mappedField, '>=', $data);
                break;
            case 'bw':
                $query->where($mappedField, 'LIKE', $data . '%');
                break;
            case 'nbw':
                $query->where($mappedField, 'NOT LIKE', $data . '%');
                break;
            case 'ew':
                $query->where($mappedField, 'LIKE', '%' . $data);
                break;
            case 'new':
                $query->where($mappedField, 'NOT LIKE', '%' . $data);
                break;
            case 'nl':
                $query->whereNull($mappedField)->orWhere($mappedField, '=', 0);
                break;
            case 'nnl':
                $query->whereNotNull($mappedField);
                break;
        }
    }

    public static function applyHavingFilter($query, $mappedField, $type, $data)
    {
        switch ($type) {
            case 'eq':
                $query->having($mappedField, '=', $data);
                break;
            case 'neq':
                $query->having($mappedField, '!=', $data);
                break;
            case 'ct':
                $query->having($mappedField, 'LIKE', '%' . $data . '%');
                break;
            case 'lt':
                $query->having($mappedField, '<', $data);
                break;
            case 'lte':
                $query->having($mappedField, '<=', $data);
                break;
            case 'gt':
                $query->having($mappedField, '>', $data);
                break;
            case 'gte':
                $query->having($mappedField, '>=', $data);
                break;
            case 'bw':
                $query->having($mappedField, 'LIKE', $data . '%');
                break;
            case 'nbw':
                $query->having($mappedField, 'NOT LIKE', $data . '%');
                break;
            case 'ew':
                $query->having($mappedField, 'LIKE', '%' . $data);
                break;
            case 'new':
                $query->having($mappedField, 'NOT LIKE', '%' . $data);
                break;
            case 'nl':
                $query->havingRaw($mappedField . 'is null')->orHaving($mappedField, '=', 0);;
                break;
            case 'nnl':
                $query->havingRaw($mappedField . 'is not null')->orHaving($mappedField, '!=', 0);;
                break;
        }
    }
}