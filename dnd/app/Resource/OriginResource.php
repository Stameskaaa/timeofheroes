<?php

declare(strict_types=1);

namespace App\Resource;

use Illuminate\Http\Resources\Json\JsonResource;

class OriginResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'src' => $this->src,
            'skills' => $this->skills,
            'toolSkills' => $this->tool_skills,
            'startEquipment' => $this->start_equipment,
            'mdDescription' => $this->md_description,
            'worlds' => WorldResource::collection($this->whenLoaded('worlds')) ?? [],
            'worldIds' => ($this->worlds ?? collect())->pluck('id'),
            'characteristics' => CharacteristicResource::collection($this->whenLoaded('characteristics')) ?? [],
            'characteristicIds' => ($this->characteristics ?? collect())->pluck('id'),
            'features' => FeatureResource::collection($this->whenLoaded('features')) ?? [],
            'featureIds' => ($this->features ?? collect())->pluck('id'),
            'createdAt' => $this->created_at?->toDateTimeString(),
            'updatedAt' => $this->updated_at?->toDateTimeString(),
        ];
    }
}
