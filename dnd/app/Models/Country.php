<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Country extends Model
{
    protected $table = 'countries';

    protected $fillable = [
        'src',
        'name',
        'short_description',
        'md_description',
    ];

    /**
     * Связь с мирами
     */
    public function worlds(): BelongsToMany
    {
        return $this->belongsToMany(
            World::class,
            'worlds_countries_map',
            'country_id',
            'world_id'
        );
    }

    /**
     * Связь с NPC
     */
    public function npcs(): BelongsToMany
    {
        return $this->belongsToMany(
            Npc::class,
            'countries_npc_map',
            'country_id',
            'npc_id'
        );
    }

    /**
     * Связь с локациями
     */
    public function locations(): BelongsToMany
    {
        return $this->belongsToMany(
            Location::class,
            'countries_locations_map',
            'country_id',
            'location_id'
        );
    }
}
