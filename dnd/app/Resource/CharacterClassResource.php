<?php

namespace App\Resource;

use Illuminate\Http\Resources\Json\JsonResource;

class CharacterClassResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'src' => $this->src,
            'diceHit' => $this->dice_hit,
            'savingThrowsIds' => $this->saving_throws_ids,
            'skills' => $this->skills,
            'weaponSkills' => $this->weapon_skills,
            'toolSkills' => $this->tool_skills,
            'armorIds' => $this->armor_ids,
            'startEquipment' => $this->start_equipment,
            'mdDescription' => $this->md_description,
            'mdTableData' => $this->md_table_data,
            'characteristicIds' => $this->characteristic_ids,
            'subclassSkills' => $this->subclass_skills,
            'worlds' => WorldResource::collection($this->whenLoaded('worlds')) ?? [],
            'worldIds' => ($this->worlds ?? collect())->pluck('id'),
            'spellIds' => ($this->spells ?? collect())->pluck('id'),
            'createdAt' => $this->created_at?->toDateTimeString(),
            'updatedAt' => $this->updated_at?->toDateTimeString(),
        ];
    }
}
