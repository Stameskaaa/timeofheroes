<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Feature;
use App\Resource\FeatureResource;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class FeatureController extends Controller
{
    public const FEATURES_LIMIT = 100;
    public const FEATURES_PAGE = 1;

    /**
     * Получение черт характера
     */
    public function getFeatures(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'query' => 'nullable|string|max:255',
                'limit' => 'nullable|integer|min:1',
                'page' => 'nullable|integer|min:1',
                'worldId' => 'nullable|integer',
                'featureTypeId' => 'nullable|integer',
                'ids' => 'nullable|array',
                'ids.*' => 'int',
            ]);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->errors()], 422);
        }

        $query = Feature::query();

        if (!empty($validated['query'])) {
            $query->where('name', 'ILIKE', "%{$validated['query']}%");
        }

        if (!empty($validated['featureTypeId'])) {
            $query->where('feature_type_id', $validated['featureTypeId']);
        }

        if (!empty($validated['worldId'])) {
            $query->whereHas('worlds', fn ($q) => $q->where('id', $validated['worldId']));
        }
        if (!empty($validated['ids'])) {
            $query->whereIn('id', $validated['ids']);
        }

        $limit = $validated['limit'] ?? self::FEATURES_LIMIT;
        $page = $validated['page'] ?? self::FEATURES_PAGE;
        $total = $query->count();

        $features = $query->orderBy('id')
            ->skip(($page - 1) * $limit)
            ->take($limit)
            ->with(['worlds'])
            ->get();

        return response()->json([
            'data' => FeatureResource::collection($features),
            'meta' => [
                'page' => (int)$page,
                'limit' => (int)$limit,
                'total' => $total,
            ],
        ]);
    }

    /**
     * Получить черту характера по идентификатору
     */
    public function getFeature(int $id): JsonResponse
    {
        $feature = Feature::with('worlds')->find($id);
        if (!$feature) {
            return response()->json(['message' => 'Feature not found'], 404);
        }

        return response()->json(new FeatureResource($feature));
    }

    /**
     * Создать черту характера
     */
    public function createFeature(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'name' => 'nullable|string',
                'featureTypeId' => 'nullable|int',
                'requirements' => 'nullable|string',
                'mdDescription' => 'nullable|string',
                'worldIds' => 'nullable|array',
                'worldIds.*' => 'integer|exists:worlds,id',
            ]);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->errors()], 422);
        }

        try {
            $feature = Feature::create([
                'name' => $validated['name'] ?? null,
                'feature_type_id' => $validated['featureTypeId'] ?? null,
                'requirements' => $validated['requirements'] ?? null,
                'md_description' => $validated['mdDescription'] ?? null,
            ]);

            $feature->worlds()->sync($validated['worldIds'] ?? []);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }

        $feature->load(['worlds']);

        return response()->json(new FeatureResource($feature), 201);
    }

    /**
     * Обновить черту характера
     */
    public function updateFeature(int $id, Request $request): JsonResponse
    {
        $feature = Feature::findOrFail($id);

        try {
            $validated = $request->validate([
                'name' => 'nullable|string',
                'featureTypeId' => 'nullable|int',
                'requirements' => 'nullable|string',
                'mdDescription' => 'nullable|string',
                'worldIds' => 'nullable|array',
                'worldIds.*' => 'integer|exists:worlds,id',
            ]);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->errors()], 422);
        }

        try {
            $feature->update([
                'name' => $validated['name'] ?? $feature->name,
                'feature_type_id' => $validated['featureTypeId'] ?? $feature->feature_type_id,
                'requirements' => $validated['requirements'] ?? $feature->requirements,
                'md_description' => $validated['mdDescription'] ?? $feature->md_description,
            ]);

            $feature->worlds()->sync($validated['worldIds'] ?? $feature->worlds);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }

        $feature->load(['worlds']);

        return response()->json(new FeatureResource($feature));
    }

    /**
     * Удалить черту характера
     */
    public function deleteFeature(int $id): JsonResponse
    {
        $feature = Feature::find($id);
        if (!$feature) {
            return response()->json(['message' => 'Feature not found'], 404);
        }

        try {
            $feature->worlds()->detach();
            $feature->delete();
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }

        return response()->json([], 204);
    }
}
