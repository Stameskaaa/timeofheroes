<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Race extends Model
{
    protected $table = 'races';

    protected $fillable = [
        'name',
        'src',
        'md_description',
        'features',
        'md_history',
    ];

    protected $casts = [
        'features' => 'array',
    ];

    /**
     * Связь с мирами
     */
    public function worlds(): BelongsToMany
    {
        return $this->belongsToMany(
            World::class,
            'worlds_races_map',
            'race_id',
            'world_id',
        );
    }
}
