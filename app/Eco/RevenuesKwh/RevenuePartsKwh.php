<?php

namespace App\Eco\RevenuesKwh;

use App\Helpers\Project\RevenueDistributionKwhHelper;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;

class RevenuePartsKwh extends Model
{
    use RevisionableTrait;

    protected $table = 'revenue_parts_kwh';

     /**
     * The attributes that are not mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id'
    ];

    //relations

    public function revenuesKwh()
    {
        return $this->belongsTo(RevenuesKwh::class, 'revenue_id');
    }

    public function distributionPartsKwh(){
        return $this->hasMany(RevenueDistributionPartsKwh::class, 'parts_id');
    }
    public function distributionPartsKwhVisible(){
        return $this->hasMany(RevenueDistributionPartsKwh::class, 'parts_id')->where('is_visible', true);
    }
    public function distributionValuesKwh(){
        return $this->hasMany(RevenueDistributionValuesKwh::class, 'parts_id');
    }
    public function conceptDistributionPartsKwh(){
        return $this->hasMany(RevenueDistributionPartsKwh::class, 'parts_id')->where('status', 'concept');
    }
    public function conceptDistributionValuesKwh(){
        return $this->hasMany(RevenueDistributionValuesKwh::class, 'parts_id')->where('status', 'concept');
    }
    public function newOrConceptDistributionPartsKwh(){
        return $this->hasMany(RevenueDistributionPartsKwh::class, 'parts_id')->whereIn('status', ['new', 'concept']);
    }
    public function newOrConceptDistributionValuesKwh(){
        return $this->hasMany(RevenueDistributionValuesKwh::class, 'parts_id')->whereIn('status', ['new', 'concept']);
    }
    //Appended fields

    public function conceptValuesKwh(){
        $partDateBegin =  Carbon::parse($this->date_begin)->format('Y-m-d');
        $partDateEnd = Carbon::parse($this->date_end)->format('Y-m-d');

        return RevenueValuesKwh::where('revenue_id', $this->revenue_id)->whereBetween('date_registration', [$partDateBegin, $partDateEnd])->where('status', 'concept')->get();
    }
    public function confirmedValuesKwh(){
        $partDateBegin =  Carbon::parse($this->date_begin)->format('Y-m-d');
        $partDateEnd = Carbon::parse($this->date_end)->format('Y-m-d');

        return RevenueValuesKwh::where('revenue_id', $this->revenue_id)->whereBetween('date_registration', [$partDateBegin, $partDateEnd])->where('status', 'confirmed');
    }

    public function getDeliveredTotalConceptStringAttribute()
    {
        return number_format( $this->delivered_total_concept, '2',',', '.' );
    }
    public function getDeliveredTotalConfirmedStringAttribute()
    {
        return number_format( ($this->delivered_total_confirmed + $this->delivered_total_processed), '2',',', '.' );
    }
    public function getDeliveredTotalProcessedStringAttribute()
    {
        return number_format( $this->delivered_total_processed, '2',',', '.' );
    }
    public function getDeliveredTotalStringAttribute()
    {
        return number_format( ($this->delivered_total_concept + $this->delivered_total_confirmed + $this->delivered_total_processed), '2',',', '.' );
    }
    public function getValuesKwhStartAttribute()
    {
        $valuesKwhStart = RevenueValuesKwh::where('revenue_id', $this->revenue_id)->where('date_registration', $this->date_begin)->first();
        // voorlopig nooit edit start toestaan. Beginstanden 1e part wordt vastgelegd bij 1e keer aanmaak. Bij volgende parts zijn Beginstanden altijd gelijk aan Eindstanden voorgaande peridoe,
        // als die gewijzigd worden (als allowEditEnd mag dus), dan wijzigen deze beginstanden ook meteen mee (is 1 en dezelfde value !)
        if(!$valuesKwhStart){
            return ['allowEditStart' => false, 'kwhStart' => 0, 'kwhStartHigh' => 0, 'kwhStartLow' => 0, ];
        } else {
            return ['allowEditStart' => false, 'kwhStart' => $valuesKwhStart->kwh_start, 'kwhStartHigh' => $valuesKwhStart->kwh_start_high, 'kwhStartLow' => $valuesKwhStart->kwh_start_low ];
        }
    }
    public function getValuesKwhEndAttribute()
    {
        $dayAfterEnd = Carbon::parse($this->date_end)->addDay()->format('Y-m-d');
        $valuesKwhEnd = RevenueValuesKwh::where('revenue_id', $this->revenue_id)->where('date_registration', $dayAfterEnd)->first();

        $kwhEnd = 0;
        $kwhEndHigh = 0;
        $kwhEndLow = 0;
        $isSimulated = null;

        $allowEditEnd = false;

        // voor edit moet status in ieder geval new of concept zijn.
        if (in_array($this->status, ['new', 'concept'])) {
            $checkDateForPreviousPart = Carbon::parse($this->date_begin)->format('Y-m-d');
            $previousRevenuePartsKwh = RevenuePartsKwh::where('revenue_id', $this->revenue_id)->where('date_end', '<', $checkDateForPreviousPart)->orderBy('date_end', 'desc')->first();
            if ($previousRevenuePartsKwh) {
                $statusPreviousPart = $previousRevenuePartsKwh->status;
            } else {
                $statusPreviousPart = 'notfound';
            }
            // geen voorgaande part meer, dan edit toegestaan (bij 1e part)
            if ($statusPreviousPart == 'notfound') {
                $allowEditEnd = true;
                // Anders edit toestaan als voorgaand niet ook nog new is.
            } elseif ($statusPreviousPart != 'new') {
                $allowEditEnd = true;
            }
        }

        if($valuesKwhEnd){
            $kwhEnd = $valuesKwhEnd->kwh_start;
            $kwhEndHigh = $valuesKwhEnd->kwh_start_high;
            $kwhEndLow = $valuesKwhEnd->kwh_start_low;
            $isSimulated = $valuesKwhEnd->is_simulated;
        }

        return ['allowEditEnd' => $allowEditEnd, 'kwhEnd' =>  $kwhEnd, 'kwhEndHigh' => $kwhEndHigh, 'kwhEndLow' => $kwhEndLow,
            'isSimulated' => $isSimulated];
    }

    public function getIsFirstRevenuePartsKwhAttribute()
    {
        return Carbon::parse($this->date_begin)->format('Y-m-d') == Carbon::parse($this->revenuesKwh->date_begin)->format('Y-m-d');
    }
    public function getIsLastRevenuePartsKwhAttribute()
    {
        return Carbon::parse($this->date_end)->format('Y-m-d') == Carbon::parse($this->revenuesKwh->date_end)->format('Y-m-d');
    }
    public function getIsEndOfYearRevenuePartsKwhAttribute()
    {
        return Carbon::parse($this->date_end)->month == 12 && Carbon::parse($this->date_end)->day == 31;
    }

    public function getPreviousRevenuePartsKwhAttribute()
    {
        $dateRegistrationDayBeforeBegin = Carbon::parse($this->date_begin)->subDay()->format('Y-m-d');
        return RevenuePartsKwh::where('revenue_id', $this->revenue_id)->where('date_end', $dateRegistrationDayBeforeBegin)->first();
    }
    public function getNextRevenuePartsKwhAttribute()
    {
        $dateRegistrationDayAfterEnd = Carbon::parse($this->date_end)->addDay()->format('Y-m-d');
        return RevenuePartsKwh::where('revenue_id', $this->revenue_id)->where('date_begin', $dateRegistrationDayAfterEnd)->first();
    }

    public function getDistributionForReportEnergySupplier()
    {
        $revenueDistributionKwhHelper = new RevenueDistributionKwhHelper();
        $distributionsForReportAndSetProcessed = array_merge($revenueDistributionKwhHelper->getDistributionSetProcessedEnergySupplier($this), $revenueDistributionKwhHelper->getDistributionForReportEnergySupplier($this));

        return $distributionsForReportAndSetProcessed;
    }

    public function calculator()
    {
        return new RevenuePartsKwhCalculator($this);
    }

    public function getDefaultDocumentName(){
        $administrationName = $this->translateToValidCharacterSet($this->revenuesKwh->project->administration->name);
        $projectName = $this->translateToValidCharacterSet($this->revenuesKwh->project->name);
        $reportType = "opbrengst";

        $yearBegin = Carbon::parse($this->date_begin)->format('Y');
        $yearEnd = Carbon::parse($this->date_end)->format('Y');

        if($yearEnd === $yearBegin) {
            $year = $yearBegin;
            $maxProjectNameLength = 181 - strlen($reportType);
            $administrationNameAndProjectNameSubstring = substr($administrationName . " " . $projectName, 0, $maxProjectNameLength);
        } else {
            $year = $yearBegin . '-' . $yearEnd;
            $maxProjectNameLength = 176 - strlen($reportType);
            $administrationNameAndProjectNameSubstring = substr($administrationName . " " . $projectName, 0, $maxProjectNameLength);
        }

        $defaultDocumentName = $reportType . " " . $administrationNameAndProjectNameSubstring . " " . $year;

        return $defaultDocumentName;
    }

    protected function translateToValidCharacterSet($field){

//        $field = strtr(utf8_decode($field), utf8_decode('ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýÿ'), 'AAAAAAACEEEEIIIIDNOOOOOOUUUUYsaaaaaaaceeeeiiiionoooooouuuuyy');
        $field = strtr(mb_convert_encoding($field, 'UTF-8', mb_list_encodings()), mb_convert_encoding('ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýÿ', 'UTF-8', mb_list_encodings()), 'AAAAAAACEEEEIIIIDNOOOOOOUUUUYsaaaaaaaceeeeiiiionoooooouuuuyy');
//        $field = iconv('UTF-8', 'ASCII//TRANSLIT', $field);
        $field = preg_replace('/[^A-Za-z0-9 -]/', '', $field);

        return $field;
    }
}
