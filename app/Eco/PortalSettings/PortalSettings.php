<?php

namespace App\Eco\PortalSettings;

use App\Eco\Administration\Administration;
use App\Eco\ContactGroup\ContactGroup;
use App\Eco\EmailTemplate\EmailTemplate;
use App\Eco\Team\Team;
use App\Eco\User\User;
use Illuminate\Database\Eloquent\Model;

class PortalSettings extends Model
{
    protected $guarded = ['id'];

    protected $casts = [
        'portal_active' => 'boolean',
        'show_new_at_cooperative_link' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function responsibleUser(){
        return $this->belongsTo(User::class, 'responsible_user_id', 'id');
    }
    public function contactResponsibleOwnerUser(){
        return $this->belongsTo(User::class, 'contact_responsible_owner_user_id', 'id');
    }
    public function checkContactTaskResponsibleUser(){
        return $this->belongsTo(User::class, 'check_contact_task_responsible_user_id', 'id');
    }
    public function checkContactTaskResponsibleTeam(){
        return $this->belongsTo(Team::class, 'check_contact_task_responsible_team_id', 'id');
    }
    public function emailTemplateNewAccount(){
        return $this->belongsTo(EmailTemplate::class, 'email_template_new_account_id', 'id');
    }
    public function defaultContactGroupMember(){
        return $this->belongsTo(ContactGroup::class, 'default_contact_group_member_id', 'id');
    }
    public function defaultContactGroupNoMember(){
        return $this->belongsTo(ContactGroup::class, 'default_contact_group_no_member_id', 'id');
    }
    public function defaultAdministration(){
        return $this->belongsTo(Administration::class, 'default_administration_id', 'id');
    }

    public function createdBy(){
        return $this->belongsTo(User::class);
    }

}
