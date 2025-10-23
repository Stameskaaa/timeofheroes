<?php

declare(strict_types=1);

namespace App\Resource;

use Illuminate\Http\Resources\Json\JsonResource;

class WorldResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'src' => $this->src,
            'name' => $this->name,
            'shortDescription' => $this->short_description,
            'mdDescription' => $this->md_description,
            'mdHistory' => $this->md_history,
            'originIds' => ($this->origins ?? collect())->pluck('id'),
            'featureIds' => ($this->features ?? collect())->pluck('id'),
            'gods' => GodResource::collection($this->whenLoaded('gods')) ?? [],
            'godIds' => ($this->gods ?? collect())->pluck('id'),
            'characterClassIds' => ($this->characterClasses ?? collect())->pluck('id'),
            'raceIds' => ($this->races ?? collect())->pluck('id'),
            'countries' => CountryResource::collection($this->whenLoaded('countries')) ?? [],
            'countryIds' => ($this->countries ?? collect())->pluck('id'),
            'locations' => LocationResource::collection($this->whenLoaded('locations')) ?? [],
            'locationIds' => ($this->locations ?? collect())->pluck('id'),
            'npcs' => NpcResource::collection($this->whenLoaded('npcs')) ?? [],
            'npcIds' => ($this->npcs ?? collect())->pluck('id'),
            'createdAt' => $this->created_at?->toDateTimeString(),
            'updatedAt' => $this->updated_at?->toDateTimeString(),
        ];
    }
}
