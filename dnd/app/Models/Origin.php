<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Origin extends Model
{
    protected $table = 'origins';

    protected $fillable = [
        'name',
        'src',
        'skills',
        'tool_skills',
        'start_equipment',
        'md_description',
    ];

    protected $casts = [
        'start_equipment' => 'array',
    ];

    /**
     * Связь с мирами
     */
    public function worlds(): BelongsToMany
    {
        return $this->belongsToMany(
            World::class,
            'worlds_origins_map',
            'origin_id',
            'world_id'
        );
    }

    /**
     * Связь с характеристиками
     */
    public function characteristics(): BelongsToMany
    {
        return $this->belongsToMany(
            Characteristic::class,
            'origins_characteristics_map',
            'origin_id',
            'characteristic_id'
        );
    }

    /**
     * Связь с чертами
     */
    public function features(): BelongsToMany
    {
        return $this->belongsToMany(
            Feature::class,
            'origins_features_map',
            'origin_id',
            'feature_id'
        );
    }
}
