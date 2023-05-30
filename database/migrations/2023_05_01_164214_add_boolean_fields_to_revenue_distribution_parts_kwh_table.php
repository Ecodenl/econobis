<?php

use App\Eco\AddressEnergySupplier\AddressEnergySupplier;
use App\Eco\RevenuesKwh\RevenueDistributionPartsKwh;
use Carbon\Carbon;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddBooleanFieldsToRevenueDistributionPartsKwhTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('revenue_distribution_parts_kwh', function (Blueprint $table) {
            $table->boolean('is_energy_supplier_switch')->default(false)->after('is_visible');;
            $table->boolean('is_end_participation')->default(false)->after('is_energy_supplier_switch');;
            $table->boolean('is_end_total_period')->default(false)->after('is_end_participation');;
            $table->boolean('is_end_year_period')->default(false)->after('is_end_total_period');;
        });

        $revenueDistributionPartsKwhAll = RevenueDistributionPartsKwh::all();
        foreach ($revenueDistributionPartsKwhAll as $revenueDistributionPartsKwh){

            $saveQuietly = false;
            if(AddressEnergySupplier::where('address_id', $revenueDistributionPartsKwh->distributionKwh->participation->address_id)->where('energy_supplier_id', $revenueDistributionPartsKwh->es_id)->where('end_date', $revenueDistributionPartsKwh->partsKwh->date_end)->exists()){
                $revenueDistributionPartsKwh->is_energy_supplier_switch = true;
                $saveQuietly = true;
            }
            if($revenueDistributionPartsKwh->distributionKwh->participation->date_terminated == $revenueDistributionPartsKwh->partsKwh->date_end){
                $revenueDistributionPartsKwh->is_end_participation = true;
                $saveQuietly = true;
            }
            if( $revenueDistributionPartsKwh->partsKwh->date_end && $revenueDistributionPartsKwh->partsKwh->date_end == $revenueDistributionPartsKwh->partsKwh->revenuesKwh->date_end ){
                $revenueDistributionPartsKwh->is_end_total_period = true;
                $saveQuietly = true;
            }
            if( $revenueDistributionPartsKwh->partsKwh->date_end && Carbon::parse($revenueDistributionPartsKwh->partsKwh->date_end)->day == 31 && Carbon::parse($revenueDistributionPartsKwh->partsKwh->date_end)->month == 12 ){
                $revenueDistributionPartsKwh->is_end_year_period = true;
                $saveQuietly = true;
            }

            if($saveQuietly){
                $revenueDistributionPartsKwh->saveQuietly();
            }
        }

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('revenue_distribution_parts_kwh', 'is_end_year_period')) {
            Schema::table('revenue_distribution_parts_kwh', function (Blueprint $table) {
                $table->dropColumn('is_end_year_period');
            });
        }
        if (Schema::hasColumn('revenue_distribution_parts_kwh', 'is_end_total_period')) {
            Schema::table('revenue_distribution_parts_kwh', function (Blueprint $table) {
                $table->dropColumn('is_end_total_period');
            });
        }
        if (Schema::hasColumn('revenue_distribution_parts_kwh', 'is_end_participation')) {
            Schema::table('revenue_distribution_parts_kwh', function (Blueprint $table) {
                $table->dropColumn('is_end_participation');
            });
        }
        if (Schema::hasColumn('revenue_distribution_parts_kwh', 'is_energy_supplier_switch')) {
            Schema::table('revenue_distribution_parts_kwh', function (Blueprint $table) {
                $table->dropColumn('is_energy_supplier_switch');
            });
        }
    }
}
