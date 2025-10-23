<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Spell;
use App\Resource\SpellResource;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class SpellController extends Controller
{
    public const SPELL_LIMIT = 100;
    public const SPELL_PAGE = 1;

    /**
     * Получение заклинаний
     */
    public function getSpells(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'query' => 'nullable|string|max:255',
                'limit' => 'nullable|integer|min:1',
                'page' => 'nullable|integer|min:1',
                'level' => 'nullable|integer',
                'schoolId' => 'nullable|integer',
                'characterClassId' => 'nullable|integer|min:1',
                'ids' => 'nullable|array',
                'ids.*' => 'int',
            ]);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->errors()], 422);
        }

        $query = Spell::query();

        if (!empty($validated['query'])) {
            $query->where('name', 'ILIKE', "%{$validated['query']}%");
        }
        if (!empty($validated['level'])) {
            $query->where('level', $validated['level']);
        }
        if (!empty($validated['schoolId'])) {
            $query->where('school_id', $validated['schoolId']);
        }
        if (!empty($validated['characterClassId'])) {
            $query->whereHas('characterClasses', fn ($q) => $q->where('id', $validated['characterClassId']));
        }
        if (!empty($validated['ids'])) {
            $query->whereIn('id', $validated['ids']);
        }

        $limit = $validated['limit'] ?? self::SPELL_LIMIT;
        $page = $validated['page'] ?? self::SPELL_PAGE;
        $total = $query->count();

        $spells = $query->orderBy('id')
            ->with('characterClasses')
            ->skip(($page - 1) * $limit)
            ->take($limit)
            ->get();

        return response()->json([
            'data' => SpellResource::collection($spells),
            'meta' => ['page' => $page, 'limit' => $limit, 'total' => $total],
        ]);
    }

    /**
     * Получить заклинание по ID
     */
    public function getSpell(int $id): JsonResponse
    {
        $spell = Spell::with('characterClasses')->find($id);
        if (!$spell) {
            return response()->json(['message' => 'Spell not found'], 404);
        }
        return response()->json(new SpellResource($spell));
    }

    /**
     * Создать заклинание
     */
    /**
     * Создать заклинание
     */
    public function createSpell(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'name' => 'nullable|string',
                'level' => 'nullable|integer',
                'schoolId' => 'nullable|integer',
                'castingTime' => 'nullable|string',
                'duration' => 'nullable|string',
                'distance' => 'nullable|string',
                'shortDescription' => 'nullable|string',
                'mdDescription' => 'nullable|string',
                'componentsList' => 'nullable|string',
                'characterClassIds' => 'nullable|array',
                'characterClassIds.*' => 'integer|exists:character_classes,id',
            ]);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->errors()], 422);
        }

        try {
            $spell = Spell::create([
                'name' => $validated['name'] ?? null,
                'level' => $validated['level'] ?? null,
                'school_id' => $validated['schoolId'] ?? null,
                'casting_time' => $validated['castingTime'] ?? null,
                'duration' => $validated['duration'] ?? null,
                'distance' => $validated['distance'] ?? null,
                'short_description' => $validated['shortDescription'] ?? null,
                'md_description' => $validated['mdDescription'] ?? null,
                'components_list' => $validated['componentsList'] ?? null,
            ]);

            $spell->characterClasses()->sync($validated['characterClassIds'] ?? []);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }

        $spell->load(['characterClasses']);

        return response()->json(new SpellResource($spell), 201);
    }

    /**
     * Обновить заклинание
     */
    public function updateSpell(int $id, Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'name' => 'nullable|string',
                'level' => 'nullable|integer',
                'schoolId' => 'nullable|integer',
                'castingTime' => 'nullable|string',
                'duration' => 'nullable|string',
                'distance' => 'nullable|string',
                'shortDescription' => 'nullable|string',
                'mdDescription' => 'nullable|string',
                'componentsList' => 'nullable|string',
                'characterClassIds' => 'nullable|array',
                'characterClassIds.*' => 'integer|exists:character_classes,id',
            ]);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->errors()], 422);
        }

        $spell = Spell::find($id);

        if (!$spell) {
            return response()->json(['message' => 'Spell not found'], 404);
        }

        try {
            $spell->update([
                'name' => $validated['name'] ?? $spell->name,
                'level' => $validated['level'] ?? $spell->level,
                'school_id' => $validated['schoolId'] ?? $spell->school_id,
                'casting_time' => $validated['castingTime'] ?? $spell->casting_time,
                'duration' => $validated['duration'] ?? $spell->duration,
                'distance' => $validated['distance'] ?? $spell->distance,
                'short_description' => $validated['shortDescription'] ?? $spell->short_description,
                'md_description' => $validated['mdDescription'] ?? $spell->md_description,
                'components_list' => $validated['componentsList'] ?? $spell->components_list,
            ]);

            $spell->characterClasses()->sync($validated['characterClassIds'] ?? $spell->characterClasses);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }

        $spell->load(['characterClasses']);

        return response()->json(new SpellResource($spell));
    }

    /**
     * Удалить заклинание
     */
    public function deleteSpell(int $id): JsonResponse
    {
        $spell = Spell::find($id);
        if (!$spell) {
            return response()->json(['message' => 'Spell not found'], 404);
        }

        try {
            $spell->characterClasses()->detach();
            $spell->delete();
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }

        return response()->json([], 204);
    }
}
