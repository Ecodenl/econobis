<?php

namespace App\Eco\HousingFile;

use Illuminate\Database\Eloquent\Model;

class HousingFileHoomLink extends Model
{
    // Laat je niet foppen:
    // building-contract-type is hoomdossier naam voor wat in econobis is_house_for_sale heet
    // (en monument heet in econobis is_monument)
    const SELECT_NO_YES_UNKNOWN_FIELDS =
        [
            'building-contract-type',
            'monument',
        ];
    const SELECT_DROPDOWN_FIELDS =
        [
            'building-type-category',
            'roof-type',
            'energy-label',
            'energy-label-status',
            // 'frame-type',
            'cook-type',
            'heat-source',
            'water-comfort',
            // 'pitched-roof-heating',
            // 'flat-roof-heating',
            // 'hr3p-glass-frame-current-glass',
            // 'glass-in-lead-replace-rooms-heated',
            'boiler-setting-comfort-heat',
            'crack-sealing-type',
            'current-floor-insulation',
            // 'building-heating-application',
            'ventilation-type',
            'current-living-rooms-windows',
            'current-wall-insulation',
            'current-roof-insulation',
            'current-sleeping-rooms-windows',
            'has-cavity-wall',
            'has-solar-panels',
            'heat-source-warm-tap-water',
        ];

    protected $table = 'housing_file_hoom_links';
     /**
     * The attributes that are not mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id'
    ];

}
