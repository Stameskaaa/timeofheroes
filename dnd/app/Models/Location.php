<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Location extends Model
{
    protected $table = 'locations';

    protected $fillable = [
        'name',
        'src',
        'short_description',
        'md_description',
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
            'worlds_locations_map',
            'location_id',
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
            'countries_locations_map',
            'location_id',
            'country_id'
        );
    }

    /**
     * Связь с враждебными существами
     */
    public function hostileCreatures(): BelongsToMany
    {
        return $this->belongsToMany(
            HostileCreature::class,
            'locations_hostile_creatures_map',
            'location_id',
            'hostile_creature_id'
        );
    }
}
