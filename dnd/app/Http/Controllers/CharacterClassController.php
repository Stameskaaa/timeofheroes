<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\CharacterClass;
use App\Resource\CharacterClassResource;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class CharacterClassController extends Controller
{
    public const CHARACTER_CLASS_LIMIT = 100;
    public const CHARACTER_CLASS_PAGE = 1;

    /**
     * Получение характеристик класса
     */
    public function getCharacterClasses(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'query' => 'nullable|string|max:255',
                'limit' => 'nullable|integer|min:1',
                'page' => 'nullable|integer|min:1',
                'worldId' => 'nullable|integer',
            ]);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->errors()], 422);
        }

        $limit = $validated['limit'] ?? self::CHARACTER_CLASS_LIMIT;
        $page = $validated['page'] ?? self::CHARACTER_CLASS_PAGE;

        $query = CharacterClass::query();

        if (!empty($validated['query'])) {
            $query->where('name', 'ILIKE', "%{$validated['query']}%");
        }

        if (!empty($validated['worldId'])) {
            $query->whereHas('worlds', fn ($q) => $q->where('worlds.id', $validated['worldId']));
        }

        $total = $query->count();
        $characterClasses = $query->orderBy('id')
            ->with(['worlds'])
            ->skip(($page - 1) * $limit)
            ->take($limit)
            ->get();

        return response()->json([
            'data' => CharacterClassResource::collection($characterClasses),
            'meta' => [
                'page' => $page,
                'limit' => $limit,
                'total' => $total,
            ],
        ]);
    }

    /**
     * Получение характеристики класса
     */
    public function getCharacterClass(int $id): JsonResponse
    {
        $characterClass = CharacterClass::with(['worlds', 'spells'])->find($id);

        if (!$characterClass) {
            return response()->json(['message' => 'Character class not found'], 404);
        }

        return response()->json(new CharacterClassResource($characterClass));
    }

    /**
     * Создание характеристики класса
     */
    public function createCharacterClass(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'src' => 'nullable|string',
                'name' => 'nullable|string',
                'diceHit' => 'nullable|string',
                'savingThrowsIds' => 'nullable|array',
                'savingThrowsIds.*' => 'integer',
                'skills' => 'nullable|string',
                'weaponSkills' => 'nullable|string',
                'toolSkills' => 'nullable|string',
                'armorIds' => 'nullable|array',
                'armorIds.*' => 'string',
                'startEquipment' => 'nullable|array',
                'startEquipment.*' => 'string',
                'mdDescription' => 'nullable|string',
                'mdTableData' => 'nullable|string',
                'characteristicIds' => 'nullable|array',
                'characteristicIds.*' => 'integer',
                'worldIds' => 'nullable|array',
                'worldIds.*' => 'integer|exists:worlds,id',
                'spellIds' => 'nullable|array',
                'spellIds.*' => 'integer|exists:spells,id',
                'subclassSkills' => 'nullable|array',
                'subclassSkills.*.title' => 'required|string',
                'subclassSkills.*.mdDescription' => 'required|string',
            ]);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->errors()], 422);
        }

        try {
            $characterClass = CharacterClass::create([
                'src' => $validated['src'] ?? null,
                'name' => $validated['name'] ?? null,
                'dice_hit' => $validated['diceHit'] ?? null,
                'skills' => $validated['skills'] ?? null,
                'weapon_skills' => $validated['weaponSkills'] ?? null,
                'tool_skills' => $validated['toolSkills'] ?? null,
                'armor_ids' => $validated['armorIds'] ?? null,
                'start_equipment' => $validated['startEquipment'] ?? null,
                'md_description' => $validated['mdDescription'] ?? null,
                'md_table_data' => $validated['mdTableData'] ?? null,
                'characteristic_ids' => $validated['characteristicIds'] ?? null,
                'saving_throws_ids' => $validated['savingThrowsIds'] ?? null,
                'subclass_skills' => $validated['subclassSkills'] ?? null,
            ]);

            $characterClass->worlds()->sync($validated['worldIds'] ?? []);
            $characterClass->spells()->sync($validated['spellIds'] ?? []);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }

        $characterClass->load(['worlds', 'spells']);

        return response()->json(new CharacterClassResource($characterClass), 201);
    }

    /**
     * Обновление характеристики класса
     */
    public function updateCharacterClass(int $id, Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'src' => 'nullable|string',
                'name' => 'nullable|string',
                'diceHit' => 'nullable|string',
                'savingThrowsIds' => 'nullable|array',
                'savingThrowsIds.*' => 'integer',
                'skills' => 'nullable|string',
                'weaponSkills' => 'nullable|string',
                'toolSkills' => 'nullable|string',
                'armorIds' => 'nullable|array',
                'armorIds.*' => 'string',
                'startEquipment' => 'nullable|array',
                'startEquipment.*' => 'string',
                'mdDescription' => 'nullable|string',
                'mdTableData' => 'nullable|string',
                'characteristicIds' => 'nullable|array',
                'characteristicIds.*' => 'integer',
                'worldIds' => 'nullable|array',
                'worldIds.*' => 'integer|exists:worlds,id',
                'spellIds' => 'nullable|array',
                'spellIds.*' => 'integer|exists:spells,id',
                'subclassSkills' => 'nullable|array',
                'subclassSkills.*.title' => 'required|string',
                'subclassSkills.*.mdDescription' => 'required|string',
            ]);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->errors()], 422);
        }

        $characterClass = CharacterClass::find($id);

        if (!$characterClass) {
            return response()->json(['message' => 'Character class not found'], 404);
        }

        try {
            $characterClass->update([
                'src' => $validated['src'] ?? $characterClass->src,
                'name' => $validated['name'] ?? $characterClass->name,
                'dice_hit' => $validated['diceHit'] ?? $characterClass->dice_hit,
                'skills' => $validated['skills'] ?? $characterClass->skills,
                'weapon_skills' => $validated['weaponSkills'] ?? $characterClass->weapon_skills,
                'tool_skills' => $validated['toolSkills'] ?? $characterClass->tool_skills,
                'armor_ids' => $validated['armorIds'] ?? $characterClass->armor_ids,
                'start_equipment' => $validated['startEquipment'] ?? $characterClass->start_equipment,
                'md_description' => $validated['mdDescription'] ?? $characterClass->md_description,
                'md_table_data' => $validated['mdTableData'] ?? $characterClass->md_table_data,
                'characteristic_ids' => $validated['characteristicIds'] ?? $characterClass->characteristic_ids,
                'saving_throws_ids' => $validated['savingThrowsIds'] ?? $characterClass->saving_throws_ids,
                'subclass_skills' => $validated['subclassSkills'] ?? $characterClass->subclass_skills,
            ]);

            $characterClass->worlds()->sync($validated['worldIds'] ?? $characterClass->worlds);
            $characterClass->spells()->sync($validated['spellIds'] ?? $characterClass->spells);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }

        $characterClass->load(['worlds', 'spells']);

        return response()->json(new CharacterClassResource($characterClass->fresh()));
    }

    /**
     * Удаление характеристики класса
     */
    public function deleteCharacterClass(int $id): JsonResponse
    {
        $characterClass = CharacterClass::find($id);

        if (!$characterClass) {
            return response()->json(['message' => 'Character class not found'], 404);
        }

        try {
            $characterClass->worlds()->detach();
            $characterClass->spells()->detach();
            $characterClass->delete();
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }

        return response()->json([], 204);
    }
}
