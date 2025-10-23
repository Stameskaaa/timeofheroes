<?php

declare(strict_types=1);

namespace App\Resource;

use Illuminate\Http\Resources\Json\JsonResource;

class NewsResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'shortDescription' => $this->short_description,
            'mdDescription' => $this->md_description,
            'src' => $this->src,
            'createdAt' => $this->created_at?->toDateTimeString(),
            'updatedAt' => $this->updated_at?->toDateTimeString(),
        ];
    }
}
