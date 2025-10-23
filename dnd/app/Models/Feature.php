<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Feature extends Model
{
    protected $table = 'features';

    protected $fillable = [
        'name',
        'feature_type_id',
        'requirements',
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
            'worlds_features_map',
            'feature_id',
            'world_id',
        );
    }
}
