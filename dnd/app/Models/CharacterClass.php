<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class CharacterClass extends Model
{
    protected $table = 'character_classes';

    protected $fillable = [
        'name',
        'src',
        'dice_hit',
        'skills',
        'weapon_skills',
        'tool_skills',
        'armor_ids',
        'start_equipment',
        'md_description',
        'md_table_data',
        'characteristic_ids',
        'saving_throws_ids',
        'subclass_skills',
    ];

    protected $casts = [
        'armor_ids' => 'array',
        'start_equipment' => 'array',
        'characteristic_ids' => 'array',
        'subclass_skills' => 'array',
        'saving_throws_ids' => 'array',
    ];

    /**
     * Связь с мирами
     */
    public function worlds(): BelongsToMany
    {
        return $this->belongsToMany(
            World::class,
            'worlds_character_classes_map',
            'character_class_id',
            'world_id',
        );
    }

    public function spells(): BelongsToMany
    {
        return $this->belongsToMany(
            Spell::class,
            'spells_character_classes_map',
            'character_class_id',
            'spell_id',
        );
    }
}
