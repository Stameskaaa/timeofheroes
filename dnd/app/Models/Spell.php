<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Spell extends Model
{
    protected $table = 'spells';

    protected $fillable = [
        'name',
        'level',
        'school_id',
        'casting_time',
        'duration',
        'distance',
        'short_description',
        'md_description',
        'components_list',
    ];

    protected $casts = [
        'level' => 'integer',
    ];

    public function characterClasses(): BelongsToMany
    {
        return $this->belongsToMany(
            CharacterClass::class,
            'spells_character_classes_map',
            'spell_id',
            'character_class_id'
        );
    }
}
