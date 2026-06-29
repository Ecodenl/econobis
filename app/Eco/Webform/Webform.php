<?php

namespace App\Eco\Webform;

use App\Eco\Team\Team;
use App\Eco\User\User;
use App\Http\Traits\Encryptable;
use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;

class Webform extends Model
{
    use Encryptable;
    use RevisionableTrait;

    protected $guarded = ['id'];

    protected $casts = [
        'date_start' => 'date',
        'date_end' => 'date',
        'api_key_date' => 'date',
        'last_requests' => 'array',
    ];

    protected $encryptable = [
        'api_key'
    ];

    public function responsibleUser()
    {
        return $this->belongsTo(User::class);
    }

    public function responsibleTeam()
    {
        return $this->belongsTo(Team::class);
    }

    public function actions()
    {
        return $this->hasMany(WebformAction::class);
    }

    public function canCreateParticipations(): bool
    {
        return (bool) optional($this->getAction(WebformActionCode::PARTICIPATION_CREATE))->enabled;
    }

    public function canCreateOrders(): bool
    {
        return (bool) optional($this->getAction(WebformActionCode::ORDER_CREATE))->enabled;
    }

    public function allowedParticipationStatusIds(): array
    {
        $action = $this->getAction(WebformActionCode::PARTICIPATION_CREATE);

        if (!$action) {
            return [];
        }

        $filter = $action->filters
            ->where('field', 'status_id')
            ->where('operator', 'in')
            ->first();

        if (!$filter || empty($filter->value)) {
            return [];
        }

        $values = json_decode($filter->value, true);

        if (!is_array($values)) {
            return [];
        }

        return array_map('intval', $values);
    }

    public function getAction(string $actionCode): ?WebformAction
    {
        return $this->actions->firstWhere('action_code', $actionCode);
    }
}
