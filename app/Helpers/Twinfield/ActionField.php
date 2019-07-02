<?php

namespace App\Helpers\Twinfield;

use Illuminate\Notifications\Action;

trait ActionField
{
    /**
     * Attribute to indicate the action of the transaction. Only used in the request XML.
     *
     * @var Action
     */
    private $action;

    public function getAction(): ?string
    {
        return $this->action;
    }

    /**
     * @param Action $action
     * @return $this
     */
    public function setAction(?string $action): self
    {
        $this->action = $action;

        return $this;
    }
}