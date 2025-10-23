<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class God extends Model
{
    protected $table = 'gods';

    protected $fillable = ['name', 'src', 'md_content'];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Связь с мирами
     */
    public function worlds()
    {
        return $this->belongsToMany(
            World::class,
            'worlds_gods_map',
            'god_id',
            'world_id'
        );
    }
}
