<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class World extends Model
{
    protected $table = 'worlds';

    protected $fillable = [
        'src',
        'name',
        'short_description',
        'md_description',
        'md_history',
    ];

    /**
     * Связь с происхождениями
     */
    public function origins(): BelongsToMany
    {
        return $this->belongsToMany(
            Origin::class,
            'worlds_origins_map',
            'world_id',
            'origin_id'
        );
    }

    /**
     * Связь с чертами
     */
    public function features(): BelongsToMany
    {
        return $this->belongsToMany(
            Feature::class,
            'worlds_features_map',
            'world_id',
            'feature_id'
        );
    }

    /**
     * Связь с богами
     */
    public function gods(): BelongsToMany
    {
        return $this->belongsToMany(
            God::class,
            'worlds_gods_map',
            'world_id',
            'god_id'
        );
    }

    /**
     * Связь с классами персонажей
     */
    public function characterClasses(): BelongsToMany
    {
        return $this->belongsToMany(
            CharacterClass::class,
            'worlds_character_classes_map',
            'world_id',
            'character_class_id'
        );
    }

    /**
     * Связь с расами
     */
    public function races(): BelongsToMany
    {
        return $this->belongsToMany(
            Race::class,
            'worlds_races_map',
            'world_id',
            'race_id'
        );
    }

    /**
     * Связь со странами
     */
    public function countries(): BelongsToMany
    {
        return $this->belongsToMany(
            Country::class,
            'worlds_countries_map',
            'world_id',
            'country_id'
        );
    }

    /**
     * Связь с локациями
     */
    public function locations(): BelongsToMany
    {
        return $this->belongsToMany(
            Location::class,
            'worlds_locations_map',
            'world_id',
            'location_id'
        );
    }

    /**
     * Связь с NPC
     */
    public function npcs(): BelongsToMany
    {
        return $this->belongsToMany(
            Npc::class,
            'worlds_npc_map',
            'world_id',
            'npc_id'
        );
    }
}
