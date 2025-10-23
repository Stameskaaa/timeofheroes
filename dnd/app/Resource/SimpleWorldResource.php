<?php

declare(strict_types=1);

namespace App\Resource;

use Illuminate\Http\Resources\Json\JsonResource;

class SimpleWorldResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'src' => $this->src,
            'name' => $this->name,
            'shortDescription' => $this->short_description,
            'createdAt' => $this->created_at?->toDateTimeString(),
            'updatedAt' => $this->updated_at?->toDateTimeString(),
        ];
    }
}
