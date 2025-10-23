<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class HostileCreature extends Model
{
    protected $table = 'hostile_creatures';

    protected $fillable = [
        'name',
        'src',
        'type_id',
        'type',
        'characteristics',
        'short_description',
        'md_description',
        'status',
        'md_history',
        'md_fun_facts',
        'md_statblock',
        'size_id',
        'hp',
        'speed',
        'armor_class',
        'saving_throws',
        'skills',
        'damage_immunities',
        'condition_immunities',
        'damage_resistance',
        'condition_resistance',
        'senses',
        'language',
        'challenge',
        'proficiency_bonus',
    ];

    protected $casts = [
        'damage_immunities' => 'array',
        'condition_immunities' => 'array',
        'damage_resistance' => 'array',
        'condition_resistance' => 'array',
        'characteristics' => 'array',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Связь с локациями
     */
    public function locations(): BelongsToMany
    {
        return $this->belongsToMany(
            Location::class,
            'locations_hostile_creatures_map',
            'hostile_creature_id',
            'location_id'
        );
    }
}
