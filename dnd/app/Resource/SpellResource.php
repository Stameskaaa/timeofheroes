<?php

declare(strict_types=1);

namespace App\Resource;

use Illuminate\Http\Resources\Json\JsonResource;

class SpellResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'level' => $this->level,
            'schoolId' => $this->school_id,
            'castingTime' => $this->casting_time,
            'duration' => $this->duration,
            'distance' => $this->distance,
            'shortDescription' => $this->short_description,
            'mdDescription' => $this->md_description,
            'componentsList' => $this->components_list,
            'characterClasses' => CharacterClassResource::collection($this->whenLoaded('characterClasses')) ?? [],
            'characterClassIds' => ($this->characterClasses ?? collect())->pluck('id'),
            'createdAt' => $this->created_at?->toDateTimeString(),
            'updatedAt' => $this->updated_at?->toDateTimeString(),
            ];
    }
}
