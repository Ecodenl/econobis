<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 20-10-2017
 * Time: 10:00
 */

namespace App\Eco\AddressEnergySupplier;

use App\Http\Controllers\Api\AddressEnergySupplier\AddressEnergySupplierController;
use Carbon\Carbon;

class AddressEnergySupplierObserver
{
    public function saved(AddressEnergySupplier $addressEnergySupplier)
    {
        $oldAddressEnergySupplierId =$addressEnergySupplier->getOriginal('id');
        $aesMemberSince = $addressEnergySupplier->member_since ? Carbon::parse($addressEnergySupplier->member_since)->format('Y-m-d') : '1900-01-01';
        $aesMemberSinceOriginal = $addressEnergySupplier->getOriginal('member_since') ? Carbon::parse($addressEnergySupplier->getOriginal('member_since'))->format('Y-m-d') : '1900-01-01';
        $aesEndDate = $addressEnergySupplier->end_date ? Carbon::parse($addressEnergySupplier->end_date)->format('Y-m-d') : '9999-12-31';
        $aesEndDateOriginal = $addressEnergySupplier->getOriginal('end_date') ? Carbon::parse($addressEnergySupplier->getOriginal('end_date'))->format('Y-m-d') : '9999-12-31';
        if($aesMemberSince!=$aesMemberSinceOriginal || $aesEndDate!=$aesEndDateOriginal)
        {
            $addressEnergySupplierController = new AddressEnergySupplierController();
            $addressEnergySupplierController->determineIsCurrentSupplier($addressEnergySupplier);

            $participations = $addressEnergySupplier->address->participations;
            foreach($participations as $participation) {
                $distributionsKwh = $participation->revenueDistributionKwh->whereIn('status', ['concept', 'confirmed']);
                foreach($distributionsKwh as $distributionKwh) {
                    $distributionPartsKwh = $distributionKwh->distributionPartsKwh->whereIn('status', ['concept', 'confirmed']);
                    foreach($distributionPartsKwh as $distributionPartKwh) {
                        // Als datum klant sinds of eind datum gewijzigd:
                        // Voor de distributie perioden waar deze addressEnergySupplier op betrekking hebben (date_begin ligt tussen aangepaste datum klant sinds en/of aangepaste eind datum):
                        // Aanpassen: es_id, es_number en energysupplier name.
                        if ($distributionPartKwh->partsKwh->date_begin >= $aesMemberSince && $distributionPartKwh->partsKwh->date_begin <= $aesEndDate) {
                            $distributionPartKwh->es_id = $addressEnergySupplier->energySupplier->id;
                            $distributionPartKwh->energy_supplier_number = $addressEnergySupplier->es_number;
                            $distributionPartKwh->energy_supplier_name = $addressEnergySupplier->energySupplier->name;
                            $distributionPartKwh->save();
                        } elseif ($oldAddressEnergySupplierId > 0 && $distributionPartKwh->partsKwh->date_begin >= $aesMemberSinceOriginal && $distributionPartKwh->partsKwh->date_begin <= $aesEndDateOriginal) {
                        // Voor de distributie perioden waar deze addressEnergySupplier geen betrekking meer op hebben, maar wel hadden (date_begin ligt nog wel tussen originele datum klant sinds en/of originele eind datum):
                        // Aanpassen: es_id, es_number en energysupplier name leeg maken.
                            $distributionPartKwh->energy_supplier_name = "";
                            $distributionPartKwh->energy_supplier_number = "";
                            $distributionPartKwh->es_id = null;
                            $distributionPartKwh->save();
                        }
                    }
                }
            }
        }

        if($addressEnergySupplier->isDirty('es_number'))
        {
            // Check if any linked revenue distribution part is present with status concept or confirmed
            // If so, then change energy supplier data
            $participations = $addressEnergySupplier->address->participations;
            foreach($participations as $participation) {
                $distributionsKwh = $participation->revenueDistributionKwh->whereIn('status', ['concept', 'confirmed']);
                foreach($distributionsKwh as $distributionKwh) {
                    $distributionPartsKwh = $distributionKwh->distributionPartsKwh->whereIn('status', ['concept', 'confirmed']);
                    foreach($distributionPartsKwh as $distributionPartKwh) {
                        // Als klantnummer gewijzigd:
                        // Voor de distributie perioden waar deze addressEnergySupplier op betrekking hebben (date_begin ligt tussen datum klant sinds en eind datum):
                        // Aanpassen: es_id, es_number en energysupplier name.
                        if ($distributionPartKwh->partsKwh->date_begin >= $aesMemberSince && $distributionPartKwh->partsKwh->date_begin <= $aesEndDate) {
                            $distributionPartKwh->energy_supplier_number = $addressEnergySupplier->es_number;
                            $distributionPartKwh->save();
                        }
                    }
                }
            }

        }
    }

    public function deleted(AddressEnergySupplier $addressEnergySupplier)
    {
        $aesMemberSince = $addressEnergySupplier->member_since ? Carbon::parse($addressEnergySupplier->member_since)->format('Y-m-d') : '1900-01-01';
        $aesEndDate = $addressEnergySupplier->end_date ? Carbon::parse($addressEnergySupplier->end_date)->format('Y-m-d') : '9999-12-31';

        $address = $addressEnergySupplier->address;
        if (!$address){
            return;
        }

        foreach($address->participations as $participation) {
            $distributionsKwh = $participation->revenueDistributionKwh->whereIn('status', ['concept', 'confirmed']);
            foreach($distributionsKwh as $distributionKwh) {
                $distributionPartsKwh = $distributionKwh->distributionPartsKwh->whereIn('status', ['concept', 'confirmed']);
                foreach($distributionPartsKwh as $distributionPartKwh) {
                    if ($distributionPartKwh->partsKwh->date_begin >= $aesMemberSince && $distributionPartKwh->partsKwh->date_begin <= $aesEndDate) {
                        $distributionPartKwh->energy_supplier_name = "";
                        $distributionPartKwh->energy_supplier_number = "";
                        $distributionPartKwh->es_id = null;
                        $distributionPartKwh->save();
                    }
                }
            }
        }
    }
}