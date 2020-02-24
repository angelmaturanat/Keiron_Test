<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    protected $fillable = [
        'assigned_user_id'
    ];

    public function user()
    {
        return $this->hasOne('App\User', 'id', 'owner_user_id');
    }

    public function asignado()
    {
        return $this->hasOne('App\User', 'id', 'assigned_user_id');
    }
}
