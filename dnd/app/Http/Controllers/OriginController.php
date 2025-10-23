<?php

namespace App\Http\Controllers;

use App\Models\Origin;
use App\Resource\OriginResource;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class OriginController extends Controller
{
    public const ORIGINS_LIMIT = 100;
    public const ORIGINS_PAGE = 1;

    /**
     * Получение происхождений
     */
    public function getOrigins(Request $request): JsonResponse
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

        $query = Origin::query();

        if (!empty($validated['query'])) {
            $query->where('name', 'ILIKE', "%{$validated['query']}%");
        }

        if (!empty($validated['worldId'])) {
            $query->whereHas('worlds', fn ($q) => $q->where('id', $validated['worldId']));
        }

        $limit = $validated['limit'] ?? self::ORIGINS_LIMIT;
        $page = $validated['page'] ?? self::ORIGINS_PAGE;
        $total = $query->count();

        $origins = $query->orderBy('id')
            ->skip(($page - 1) * $limit)
            ->take($limit)
            ->with(['worlds', 'features', 'characteristics'])
            ->get();

        return response()->json([
            'data' => OriginResource::collection($origins),
            'meta' => [
                'page' => (int)$page,
                'limit' => (int)$limit,
                'total' => $total,
            ],
        ]);
    }

    /**
     * Получить происхождение по идентификатору
     */
    public function getOrigin(int $id): JsonResponse
    {
        $origin = Origin::with(['worlds', 'features', 'characteristics'])->find($id);

        if (!$origin) {
            return response()->json(['message' => 'Origin not found'], 404);
        }

        return response()->json(new OriginResource($origin));
    }

    /**
     * Создать происхождение
     */
    public function createOrigin(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'name' => 'nullable|string',
                'src' => 'nullable|string',
                'skills' => 'nullable|string',
                'toolSkills' => 'nullable|string',
                'startEquipment' => 'nullable|array',
                'startEquipment.*' => 'nullable|string',
                'mdDescription' => 'nullable|string',
                'featureIds' => 'nullable|array',
                'featureIds.*' => 'integer|exists:features,id',
                'characteristicIds' => 'nullable|array',
                'characteristicIds.*' => 'integer|exists:characteristics,id',
                'worldIds' => 'nullable|array',
                'worldIds.*' => 'integer|exists:worlds,id',
            ]);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->errors()], 422);
        }

        try {
            $origin = Origin::create([
                'name' => $validated['name'] ?? null,
                'src' => $validated['src'] ?? null,
                'skills' => $validated['skills'] ?? null,
                'tool_skills' => $validated['toolSkills'] ?? null,
                'start_equipment' => $validated['startEquipment'] ?? null,
                'md_description' => $validated['mdDescription'] ?? null,
            ]);

            $origin->features()->sync($validated['featureIds'] ?? []);
            $origin->characteristics()->sync($validated['characteristicIds'] ?? []);
            $origin->worlds()->sync($validated['worldIds'] ?? []);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }

        $origin->load(['features', 'worlds', 'characteristics']);

        return response()->json(new OriginResource($origin), 201);
    }

    /**
     * Обновить происхождение
     */
    public function updateOrigin(int $id, Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'name' => 'nullable|string',
                'src' => 'nullable|string',
                'skills' => 'nullable|string',
                'toolSkills' => 'nullable|string',
                'startEquipment' => 'nullable|array',
                'startEquipment.*' => 'nullable|string',
                'mdDescription' => 'nullable|string',
                'featureIds' => 'nullable|array',
                'featureIds.*' => 'integer|exists:features,id',
                'characteristicIds' => 'nullable|array',
                'characteristicIds.*' => 'integer|exists:characteristics,id',
                'worldIds' => 'nullable|array',
                'worldIds.*' => 'integer|exists:worlds,id',
            ]);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->errors()], 422);
        }

        $origin = Origin::find($id);

        if (!$origin) {
            return response()->json(['message' => 'Origin not found'], 404);
        }

        try {
            $origin->update([
                'name' => $validated['name'] ?? $origin->name,
                'src' => $validated['src'] ?? $origin->src,
                'skills' => $validated['skills'] ?? $origin->skills,
                'tool_skills' => $validated['toolSkills'] ?? $origin->tool_skills,
                'start_equipment' => $validated['startEquipment'] ?? $origin->start_equipment,
                'md_description' => $validated['mdDescription'] ?? $origin->md_description,
            ]);

            $origin->features()->sync($validated['featureIds'] ?? $origin->features);
            $origin->characteristics()->sync(
                $validated['characteristicIds'] ?? $origin->characteristics,
            );
            $origin->worlds()->sync($validated['worldIds'] ?? $origin->worlds);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }

        $origin->load(['features', 'worlds', 'characteristics']);

        return response()->json(new OriginResource($origin));
    }

    /**
     * Удалить происхождение
     */
    public function deleteOrigin(int $id): JsonResponse
    {
        $origin = Origin::find($id);

        if (!$origin) {
            return response()->json(['message' => 'Origin not found'], 404);
        }

        try {
            $origin->features()->detach();
            $origin->characteristics()->detach();
            $origin->worlds()->detach();
            $origin->delete();
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }

        return response()->json([], 204);
    }
}
