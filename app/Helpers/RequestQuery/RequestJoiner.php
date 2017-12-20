<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 9:43
 */

namespace App\Helpers\RequestQuery;


abstract class RequestJoiner
{

    protected $processedJoins = [];

    public function apply($query, $joinName)
    {
        $customJoinMethod = $this->getCustomJoinMethodName($joinName);
        if (in_array($customJoinMethod, $this->processedJoins)) return;

        if (!method_exists($this, $customJoinMethod)) throw new JoinNotFoundException('Missing join ' . $joinName . ' (function ' . $customJoinMethod . ') in ' . get_called_class());

        $this->$customJoinMethod($query);

        $this->processedJoins[] = $customJoinMethod;
    }

    private function getCustomJoinMethodName($joinName)
    {
        return 'apply' . studly_case($joinName) . 'Join';
    }

    public function resetProcessedJoins()
    {
        $this->processedJoins = [];
    }
}