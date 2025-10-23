<?php

declare(strict_types=1);

namespace App\Resource;

use Illuminate\Http\Resources\Json\JsonResource;

class FeatureResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'featureTypeId' => $this->feature_type_id,
            'requirements' => $this->requirements,
            'mdDescription' => $this->md_description,
            'worlds' => WorldResource::collection($this->whenLoaded('worlds')) ?? [],
            'worldIds' => ($this->worlds ?? collect())->pluck('id'),
            'createdAt' => $this->created_at?->toDateTimeString(),
            'updatedAt' => $this->updated_at?->toDateTimeString(),
        ];
    }
}
