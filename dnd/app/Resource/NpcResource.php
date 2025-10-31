<?php

declare(strict_types=1);

namespace App\Resource;

use Illuminate\Http\Resources\Json\JsonResource;

class NpcResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'src' => $this->src,
            'status' => $this->status,
            'fraction' => $this->fraction,
            'shortDescription' => $this->short_description,
            'mdDescription' => $this->md_description,
            'mdHistory' => $this->md_history,
            'mdFunFacts' => $this->md_fun_facts,
            'worlds' => WorldResource::collection($this->whenLoaded('worlds')) ?? [],
            'worldIds' => ($this->worlds ?? collect())->pluck('id'),
            'countries' => CountryResource::collection($this->whenLoaded('countries')) ?? [],
            'countryIds' => ($this->countries ?? collect())->pluck('id'),
            'createdAt' => $this->created_at?->toDateTimeString(),
            'updatedAt' => $this->updated_at?->toDateTimeString(),
        ];
    }
}
