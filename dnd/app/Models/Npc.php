<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Npc extends Model
{
    protected $table = 'npcs';

    protected $fillable = [
        'name',
        'src',
        'status',
        'fraction',
        'short_description',
        'md_description',
        'md_history',
        'md_fun_facts',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Связь с мирами
     */
    public function worlds(): BelongsToMany
    {
        return $this->belongsToMany(
            World::class,
            'worlds_npc_map',
            'npc_id',
            'world_id'
        );
    }

    /**
     * Связь со странами
     */
    public function countries(): BelongsToMany
    {
        return $this->belongsToMany(
            Country::class,
            'countries_npc_map',
            'npc_id',
            'country_id'
        );
    }
}
