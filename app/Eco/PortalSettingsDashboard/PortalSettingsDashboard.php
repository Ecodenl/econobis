<?php

namespace App\Eco\PortalSettingsDashboard;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PortalSettingsDashboard extends Model
{
    use SoftDeletes;

    protected $guarded = ['id'];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

    public function widgets()
    {
        return $this->hasMany(PortalSettingsDashboardWidget::class);
    }

}
