<?php

namespace App\Eco\RevenuesKwh;

use App\Eco\Project\Project;
use App\Eco\Project\ProjectRevenueCategory;
use App\Eco\Project\ProjectRevenueDistributionType;
use App\Eco\User\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;

class RevenuesKwh extends Model
{
    use RevisionableTrait;

    protected $table = 'revenues_kwh';

     /**
     * The attributes that are not mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id'
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    //relations

    public function project(){
        return $this->belongsTo(Project::class);
    }
    public function category(){
        return $this->belongsTo(ProjectRevenueCategory::class, 'category_id');
    }
    public function createdBy()
    {
        return $this->belongsTo(User::class);
    }

    public function partsKwh(){
        return $this->hasMany(RevenuePartsKwh::class, 'revenue_id');
    }
    public function distributionKwh(){
        return $this->hasMany(RevenueDistributionKwh::class, 'revenue_id');
    }
    public function distributionPartsKwh(){
        return $this->hasMany(RevenueDistributionPartsKwh::class, 'revenue_id');
    }
    public function distributionValuesKwh(){
        return $this->hasMany(RevenueDistributionValuesKwh::class, 'revenue_id');
    }
    public function valuesKwh(){
        return $this->hasMany(RevenueValuesKwh::class, 'revenue_id');
    }

    public function newPartsKwh(){
        return $this->hasMany(RevenuePartsKwh::class, 'revenue_id')->where('status', 'new');
    }
    public function confirmedPartsKwh(){
        return $this->hasMany(RevenuePartsKwh::class, 'revenue_id')->whereIn('status', ['confirmed', 'processed']);
    }
    public function conceptPartsKwh(){
        return $this->hasMany(RevenuePartsKwh::class, 'revenue_id')->where('status', 'concept');
    }
    public function newOrConceptPartsKwh(){
        return $this->hasMany(RevenuePartsKwh::class, 'revenue_id')->whereIn('status', ['new', 'concept']);
    }
    public function conceptDistributionKwh(){
        return $this->hasMany(RevenueDistributionKwh::class, 'revenue_id')->where('status', 'concept');
    }
    public function conceptDistributionPartsKwh(){
        return $this->hasMany(RevenueDistributionPartsKwh::class, 'revenue_id')->where('status', 'concept');
    }
    public function conceptDistributionValuesKwh(){
        return $this->hasMany(RevenueDistributionValuesKwh::class, 'revenue_id')->where('status', 'concept');
    }
    public function newOrConceptDistributionPartsKwh(){
        return $this->hasMany(RevenueDistributionPartsKwh::class, 'revenue_id')->whereIn('status', ['new', 'concept']);
    }
    public function newOrConceptDistributionValuesKwh(){
        return $this->hasMany(RevenueDistributionValuesKwh::class, 'revenue_id')->whereIn('status', ['new', 'concept']);
    }
    public function conceptValuesKwh(){
        return $this->hasMany(RevenueValuesKwh::class, 'revenue_id')->where('status', 'çoncept');
    }

    //Appended fields

    public function getDistributionType()
    {
        if(!$this->distribution_type_id) return null;

        return ProjectRevenueDistributionType::get($this->distribution_type_id);
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

    public function getKwhEndHighAttribute()
    {
        $dateRegistrationDayAfterEnd = Carbon::parse($this->date_end)->addDay()->format('Y-m-d');
        $revenueValuesKwhDateEnd = RevenueValuesKwh::where('revenue_id', $this->id)->where('date_registration', $dateRegistrationDayAfterEnd)->where('is_simulated', false)->first();

        return $revenueValuesKwhDateEnd ? $revenueValuesKwhDateEnd->kwh_start_high : 0;
    }
    public function getKwhEndLowAttribute()
    {
        $dateRegistrationDayAfterEnd = Carbon::parse($this->date_end)->addDay()->format('Y-m-d');
        $revenueValuesKwhDateEnd = RevenueValuesKwh::where('revenue_id', $this->id)->where('date_registration', $dateRegistrationDayAfterEnd)->where('is_simulated', false)->first();

        return $revenueValuesKwhDateEnd ? $revenueValuesKwhDateEnd->kwh_start_low : 0;
    }

    public function getLastPartsKwhAttribute()
    {
        return $this->partsKwh()->orderByDesc('date_end')->first();
    }

    public function getDateEndLastConfirmedPartsKwhAttribute()
    {
        $lastConfirmedPartsKwh = $this->confirmedPartsKwh()->orderByDesc('date_end')->first();
        return $lastConfirmedPartsKwh ? $lastConfirmedPartsKwh->date_end : null;
    }

    public function getDefaultDocumentName($reportType){
        $administrationName = $this->translateToValidCharacterSet($this->project->administration->name);
        $projectName = $this->translateToValidCharacterSet($this->project->name);

        $yearBegin = Carbon::parse($this->date_begin)->format('Y');
        $yearEnd = Carbon::parse($this->date_end)->format('Y');

        // Vervangen _ in reporttype met spatie
        $reportType = str_replace('_', ' ', $reportType);

        if($yearEnd === $yearBegin) {
            $year = $yearBegin;
            $maxProjectNameLength = 179 - strlen($reportType);
            $administrationNameAndProjectNameSubstring = substr($administrationName . " - " . $projectName, 0, $maxProjectNameLength);
        } else {
            $year = $yearBegin . '-' . $yearEnd;
            $maxProjectNameLength = 174 - strlen($reportType);
            $administrationNameAndProjectNameSubstring = substr($administrationName . " - " . $projectName, 0, $maxProjectNameLength);
        }

        $defaultDocumentName = $reportType . " - " . $administrationNameAndProjectNameSubstring . " " . $year;

        return $defaultDocumentName;
    }

    public function getHasNewPartsKwh(){
        return $this->newPartsKwh()->count() > 0;
    }

    public function getHasConfirmedPartsKwh(){
        return $this->confirmedPartsKwh()->count() > 0;
    }

    protected function translateToValidCharacterSet($field){

        $fieldUtf8Decoded = mb_convert_encoding($field, 'ISO-8859-1', 'UTF-8');
        $replaceFrom = mb_convert_encoding('ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýÿ', 'ISO-8859-1', 'UTF-8');
        $replaceTo = mb_convert_encoding('AAAAAAACEEEEIIIIDNOOOOOOUUUUYsaaaaaaaceeeeiiiionoooooouuuuyy', 'ISO-8859-1', 'UTF-8');
        $field = strtr( $fieldUtf8Decoded, $replaceFrom, $replaceTo );
        $field = preg_replace('/[^A-Za-z0-9 -]/', '', $field);

        return $field;
    }
}
