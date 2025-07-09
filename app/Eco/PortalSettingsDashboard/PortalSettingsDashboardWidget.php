<?php

namespace App\Eco\PortalSettingsDashboard;

use App\Eco\ContactGroup\ContactGroup;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PortalSettingsDashboardWidget extends Model
{
    use SoftDeletes;

    protected $guarded = ['id'];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

    public function portalSettingsDashboard()
    {
        return $this->belongsTo(PortalSettingsDashboard::class);
    }

    public function contactGroup()
    {
        return $this->belongsTo(ContactGroup::class, 'show_group_id');
    }

    public function hideForContactGroup()
    {
        return $this->belongsTo(ContactGroup::class, 'hide_group_id');
    }

    public function getBackgroundColorUsedAttribute()
    {
        return !empty($this->background_color) ? $this->background_color : $this->portalSettingsDashboard->default_widget_background_color;
    }

    public function getTextColorUsedAttribute()
    {
        return !empty($this->text_color) ? $this->text_color : $this->portalSettingsDashboard->default_widget_text_color;
    }

}
