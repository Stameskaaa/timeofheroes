<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\HostileCreature;
use App\Models\HostileType;
use App\Resource\HostileCreatureResource;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Validation\ValidationException;

class HostileCreatureController extends Controller
{
    public const HOSTILE_CREATURE_LIMIT = 100;
    public const HOSTILE_CREATURE_PAGE = 1;

    /**
     * Получение враждебных существ
     */
    public function getHostileCreatures(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'type' => ['nullable', 'string', new Enum(HostileType::class)],
                'query' => 'nullable|string|max:255',
                'limit' => 'nullable|integer|min:1',
                'page' => 'nullable|integer|min:1',
            ]);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->errors()], 422);
        }

        $limit = $validated['limit'] ?? self::HOSTILE_CREATURE_LIMIT;
        $page = $validated['page'] ?? self::HOSTILE_CREATURE_PAGE;

        $query = HostileCreature::query();
        if (!empty($validated['type'])) {
            $query->where('type', $validated['type']);
        }
        if (!empty($validated['query'])) {
            $query->where('name', 'ILIKE', "%{$validated['query']}%");
        }

        $total = $query->count();
        $hostiles = $query->orderBy('id')
            ->with('locations')
            ->skip(($page - 1) * $limit)
            ->take($limit)
            ->get();

        return response()->json([
            'data' => HostileCreatureResource::collection($hostiles),
            'meta' => [
                'page' => $page,
                'limit' => $limit,
                'total' => $total,
            ],
        ]);
    }

    /**
     * Получить враждебное существо по ID
     */
    public function getHostileCreature(int $id): JsonResponse
    {
        $hostile = HostileCreature::with('locations')->find($id);
        if (!$hostile) {
            return response()->json(['message' => 'Hostile Creature not found'], 404);
        }

        return response()->json($hostile);
    }

    /**
     * Создать враждебное существо
     */
    public function createHostileCreature(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'name' => 'nullable|string',
                'src' => 'nullable|string',
                'type' => ['nullable', 'string', new Enum(HostileType::class)],
                'shortDescription' => 'nullable|string',
                'mdDescription' => 'nullable|string',
                'status' => 'nullable|string',
                'mdHistory' => 'nullable|string',
                'mdFunFacts' => 'nullable|string',
                'mdStatblock' => 'nullable|string',
                'sizeId' => 'nullable|string',
                'typeId' => 'nullable|string',
                'hp' => 'nullable|string',
                'speed' => 'nullable|string',
                'armorClass' => 'nullable|int',
                'savingThrows' => 'nullable|string',
                'skills' => 'nullable|string',
                'damageImmunities' => 'nullable|array',
                'damageImmunities.*' => 'int',
                'conditionImmunities' => 'nullable|array',
                'conditionImmunities.*' => 'int',
                'damageResistance' => 'nullable|array',
                'damageResistance.*' => 'int',
                'conditionResistance' => 'nullable|array',
                'conditionResistance.*' => 'int',
                'senses' => 'nullable|string',
                'language' => 'nullable|string',
                'challenge' => 'nullable|string',
                'proficiencyBonus' => 'nullable|int',
                'characteristics' => 'nullable|array',
                'characteristics.*.id' => 'required|integer',
                'characteristics.*.value' => 'required|integer',
                'locationIds' => 'nullable|array',
                'locationIds.*' => 'integer|exists:locations,id',
            ]);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->errors()], 422);
        }

        try {
            $hostile = HostileCreature::create([
                'name' => $validated['name'] ?? null,
                'src' => $validated['src'] ?? null,
                'type' => $validated['type'] ?? null,
                'short_description' => $validated['shortDescription'] ?? null,
                'md_description' => $validated['mdDescription'] ?? null,
                'status' => $validated['status'] ?? null,
                'md_history' => $validated['mdHistory'] ?? null,
                'md_fun_facts' => $validated['mdFunFacts'] ?? null,
                'md_statblock' => $validated['mdStatblock'] ?? null,
                'size_id' => $validated['sizeId'] ?? null,
                'type_id' => $validated['typeId'] ?? null,
                'hp' => $validated['hp'] ?? null,
                'speed' => $validated['speed'] ?? null,
                'armor_class' => $validated['armorClass'] ?? null,
                'saving_throws' => $validated['savingThrows'] ?? null,
                'skills' => $validated['skills'] ?? null,
                'damage_immunities' => $validated['damageImmunities'] ?? [],
                'condition_immunities' => $validated['conditionImmunities'] ?? [],
                'damage_resistance' => $validated['damageResistance'] ?? [],
                'condition_resistance' => $validated['conditionResistance'] ?? [],
                'characteristics' => $validated['characteristics'] ?? [],
                'senses' => $validated['senses'] ?? null,
                'language' => $validated['language'] ?? null,
                'challenge' => $validated['challenge'] ?? null,
                'proficiency_bonus' => $validated['proficiencyBonus'] ?? null,
            ]);
            $hostile->locations()->sync($validated['locationIds'] ?? []);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }

        $hostile->load(['locations']);

        return response()->json(new HostileCreatureResource($hostile));
    }

    /**
     * Обновить враждебное существо
     */
    public function updateHostileCreature(int $id, Request $request): JsonResponse
    {
        $hostile = HostileCreature::with(['locations'])->find($id);
        if (!$hostile) {
            return response()->json(['message' => 'Hostile Creature not found'], 404);
        }

        try {
            $validated = $request->validate([
                'name' => 'nullable|string',
                'src' => 'nullable|string',
                'type' => ['nullable', 'string', new Enum(HostileType::class)],
                'shortDescription' => 'nullable|string',
                'mdDescription' => 'nullable|string',
                'status' => 'nullable|string',
                'mdHistory' => 'nullable|string',
                'mdFunFacts' => 'nullable|string',
                'mdStatblock' => 'nullable|string',
                'sizeId' => 'nullable|string',
                'typeId' => 'nullable|string',
                'hp' => 'nullable|string',
                'speed' => 'nullable|string',
                'armorClass' => 'nullable|int',
                'savingThrows' => 'nullable|string',
                'skills' => 'nullable|string',
                'damageImmunities' => 'nullable|array',
                'damageImmunities.*' => 'int',
                'conditionImmunities' => 'nullable|array',
                'conditionImmunities.*' => 'int',
                'damageResistance' => 'nullable|array',
                'damageResistance.*' => 'int',
                'conditionResistance' => 'nullable|array',
                'conditionResistance.*' => 'int',
                'senses' => 'nullable|string',
                'language' => 'nullable|string',
                'challenge' => 'nullable|string',
                'proficiencyBonus' => 'nullable|int',
                'characteristics' => 'nullable|array',
                'characteristics.*.id' => 'required|integer',
                'characteristics.*.value' => 'required|integer',
                'locationIds' => 'nullable|array',
                'locationIds.*' => 'integer|exists:locations,id',
            ]);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->errors()], 422);
        }

        try {
            $hostile->update([
                'name' => $validated['name'] ?? $hostile->name,
                'src' => $validated['src'] ?? $hostile->src,
                'type' => $validated['type'] ?? $hostile->type,
                'short_description' => $validated['shortDescription'] ?? $hostile->short_description,
                'md_description' => $validated['mdDescription'] ?? $hostile->md_description,
                'status' => $validated['status'] ?? $hostile->status,
                'md_history' => $validated['mdHistory'] ?? $hostile->md_history,
                'md_fun_facts' => $validated['mdFunFacts'] ?? $hostile->md_fun_facts,
                'md_statblock' => $validated['mdStatblock'] ?? $hostile->md_statblock,
                'size_id' => $validated['sizeId'] ?? $hostile->size_id,
                'type_id' => $validated['typeId'] ?? $hostile->type_id,
                'hp' => $validated['hp'] ?? $hostile->hp,
                'speed' => $validated['speed'] ?? $hostile->speed,
                'armor_class' => $validated['armorClass'] ?? $hostile->armor_class,
                'saving_throws' => $validated['savingThrows'] ?? $hostile->saving_throws,
                'skills' => $validated['skills'] ?? $hostile->skills,
                'damage_immunities' => json_encode($validated['damageImmunities'] ?? $hostile->damageImmunities),
                'condition_immunities' => json_encode($validated['conditionImmunities'] ?? $hostile->conditionImmunities),
                'damage_resistance' => json_encode($validated['damageResistance'] ?? $hostile->damageResistance),
                'condition_resistance' => json_encode($validated['conditionResistance'] ?? $hostile->conditionResistance),
                'characteristics' => json_encode($validated['characteristics'] ?? $hostile->characteristics),
                'senses' => $validated['senses'] ?? $hostile->senses,
                'language' => $validated['language'] ?? $hostile->language,
                'challenge' => $validated['challenge'] ?? $hostile->challenge,
                'proficiency_bonus' => $validated['proficiencyBonus'] ?? $hostile->proficiency_bonus,
            ]);
            $hostile->locations()->sync($validated['locationIds'] ?? $hostile->locations);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }

        $hostile->load(['locations']);

        return response()->json(new HostileCreatureResource($hostile), 201);
    }

    /**
     * Удалить враждебное существо
     */
    public function deleteHostileCreature(int $id): JsonResponse
    {
        $hostile = HostileCreature::find($id);
        if (!$hostile) {
            return response()->json(['message' => 'Hostile Creature not found'], 404);
        }

        $hostile->locations()->detach();
        $hostile->delete();

        return response()->json([], 204);
    }
}
