<?php

namespace App\Helpers\Delete\Models;

use App\Helpers\AddressEnergySupplier\AddressEnergySupplierHelper;
use App\Helpers\Delete\DeleteInterface;
use Illuminate\Database\Eloquent\Model;

class DeleteAddressEnergySupplier implements DeleteInterface
{
    private $errorMessage = [];
    private $addressEnergySupplier;

    public function __construct(Model $addressEnergySupplier)
    {
        $this->addressEnergySupplier = $addressEnergySupplier;
    }

    public function delete()
    {
        if (! $this->canDelete()) {
            return $this->errorMessage;
        }

        $this->deleteModels();
        $this->dissociateRelations();
        $this->deleteRelations();
        $this->customDeleteActions();

        if (count($this->errorMessage) === 0) {
            $this->addressEnergySupplier->delete();
        }

        return $this->errorMessage;
    }

    public function canDelete()
    {
        $this->errorMessage = array_merge(
            $this->errorMessage,
            AddressEnergySupplierHelper::getDeleteBlockingMessages($this->addressEnergySupplier)
        );

        return count($this->errorMessage) === 0;
    }

    public function deleteModels()
    {
    }

    public function dissociateRelations()
    {
    }

    public function deleteRelations()
    {
    }

    public function customDeleteActions()
    {
    }
}