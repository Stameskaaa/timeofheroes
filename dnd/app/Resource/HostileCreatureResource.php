<?php

declare(strict_types=1);

namespace App\Resource;

use Illuminate\Http\Resources\Json\JsonResource;

class HostileCreatureResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'src' => $this->src,
            'type' => $this->type,
            'typeId' => $this->type_id,
            'shortDescription' => $this->short_description,
            'mdDescription' => $this->md_description,
            'status' => $this->status,
            'mdHistory' => $this->md_history,
            'mdFunFacts' => $this->md_fun_facts,
            'mdStatblock' => $this->md_statblock,
            'sizeId' => $this->size_id,
            'hp' => $this->hp,
            'speed' => $this->speed,
            'armorClass' => $this->armor_class,
            'savingThrows' => $this->saving_throws,
            'skills' => $this->skills,
            'characteristics' => $this->characteristics ?? [],
            'damageImmunities' => $this->damage_immunities ?? [],
            'conditionImmunities' => $this->condition_immunities ?? [],
            'damageResistance' => $this->damage_resistance ?? [],
            'conditionResistance' => $this->condition_resistance ?? [],
            'senses' => $this->senses,
            'language' => $this->language,
            'challenge' => $this->challenge,
            'proficiencyBonus' => $this->proficiency_bonus,
            'locations' => LocationResource::collection($this->whenLoaded('locations')) ?? [],
            'locationIds' => ($this->locations ?? collect())->pluck('id'),
            'createdAt' => $this->created_at?->toDateTimeString(),
            'updatedAt' => $this->updated_at?->toDateTimeString(),
        ];
    }
}
