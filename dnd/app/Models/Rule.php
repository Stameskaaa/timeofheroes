<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rule extends Model
{
    protected $table = 'rules';

    protected $fillable = [
        'name',
        'short_description',
        'md_content',
        'type',
        'tags',
    ];

    protected $casts = [
        'tags' => 'array',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'shortDescription' => $this->short_description,
            'mdContent' => $this->md_content,
            'type' => $this->type,
            'tags' => $this->tags,
            'createdAt' => $this->created_at?->toDateTimeString(),
            'updatedAt' => $this->updated_at?->toDateTimeString(),
        ];
    }
}
