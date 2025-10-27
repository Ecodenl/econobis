<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 14-11-2017
 * Time: 14:07
 */

namespace App\Eco\Task;


use Laracasts\Presenter\Presenter;

class TaskPresenter extends Presenter
{
    public function noteSummary()
    {
        // Make summary from note, if string is longer then 40 characters
        return str_limit($this->note, 160);
    }
}