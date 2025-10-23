<?php

declare(strict_types=1);

namespace App\Resource;

use Illuminate\Http\Resources\Json\JsonResource;

class LocationResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'src' => $this->src,
            'shortDescription' => $this->short_description,
            'mdDescription' => $this->md_description,
            'worlds' => WorldResource::collection($this->whenLoaded('worlds')) ?? [],
            'worldIds' => ($this->worlds ?? collect())->pluck('id'),
            'countries' => CountryResource::collection($this->whenLoaded('countries')) ?? [],
            'countryIds' => ($this->worlds ?? collect())->pluck('id'),
            'hostileCreatures' => HostileCreatureResource::collection($this->whenLoaded('hostileCreatures')) ?? [],
            'hostileCreatureIds' => ($this->hostileCreatures ?? collect())->pluck('id'),
            'createdAt' => $this->created_at?->toDateTimeString(),
            'updatedAt' => $this->updated_at?->toDateTimeString(),
        ];
    }
}
