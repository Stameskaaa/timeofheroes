<?php

declare(strict_types=1);

namespace App\Resource;

use Illuminate\Http\Resources\Json\JsonResource;

class CountryResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'src' => $this->src,
            'name' => $this->name,
            'shortDescription' => $this->short_description,
            'mdDescription' => $this->md_description,
            'worlds' => WorldResource::collection($this->whenLoaded('worlds')) ?? [],
            'worldIds' => ($this->worlds ?? collect())->pluck('id'),
            'npcs' => NpcResource::collection($this->whenLoaded('npcs')) ?? [],
            'npcIds' => ($this->npcs ?? collect())->pluck('id'),
            'locations' => LocationResource::collection($this->whenLoaded('locations')) ?? [],
            'locationIds' => ($this->locations ?? collect())->pluck('id'),
            'createdAt' => $this->created_at?->toDateTimeString(),
            'updatedAt' => $this->updated_at?->toDateTimeString(),
        ];
    }
}
