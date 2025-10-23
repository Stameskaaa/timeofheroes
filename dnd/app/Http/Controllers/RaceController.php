<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Race;
use App\Resource\RaceResource;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class RaceController extends Controller
{
    public const RACE_LIMIT = 100;
    public const RACE_PAGE = 1;

    /**
     * Получение рас
     */
    public function getRaces(Request $request): JsonResponse
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

        $query = Race::query();

        if (!empty($validated['query'])) {
            $query->where('name', 'ILIKE', "%{$validated['query']}%");
        }

        if (!empty($validated['worldId'])) {
            $query->whereHas('worlds', fn ($q) => $q->where('id', $validated['worldId']));
        }

        $limit = $validated['limit'] ?? self::RACE_LIMIT;
        $page = $validated['page'] ?? self::RACE_PAGE;
        $total = $query->count();

        $races = $query->orderBy('id')
            ->skip(($page - 1) * $limit)
            ->take($limit)
            ->with(['worlds'])
            ->get();

        return response()->json([
            'data' => RaceResource::collection($races),
            'meta' => [
                'page' => (int)$page,
                'limit' => (int)$limit,
                'total' => $total,
            ],
        ]);
    }

    /**
     * Получить расу по идентификатору
     */
    public function getRace(int $id): JsonResponse
    {
        $race = Race::with('worlds')->find($id);

        if (!$race) {
            return response()->json(['message' => 'Race not found'], 404);
        }

        return response()->json(new RaceResource($race));
    }

    /**
     * Создать расу
     */
    public function createRace(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'name' => 'nullable|string',
                'src' => 'nullable|string',
                'mdDescription' => 'nullable|string',
                'features' => 'nullable|array',
                'features.*' => 'nullable|string',
                'mdHistory' => 'nullable|string',
                'worldIds' => 'nullable|array',
                'worldIds.*' => 'int|exists:worlds,id',
            ]);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->errors()], 422);
        }

        try {
            $race = Race::create([
                'name' => $validated['name'] ?? null,
                'src' => $validated['src'] ?? null,
                'md_description' => $validated['mdDescription'] ?? null,
                'features' => $validated['features'] ?? null,
                'md_history' => $validated['mdHistory'] ?? null,
            ]);
            $race->worlds()->sync($validated['worldIds'] ?? []);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }

        $race->load(['worlds']);

        return response()->json(new RaceResource($race), 201);
    }

    /**
     * Обновить расу
     */
    public function updateRace(int $id, Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'name' => 'nullable|string',
                'src' => 'nullable|string',
                'mdDescription' => 'nullable|string',
                'features' => 'nullable|array',
                'features.*' => 'nullable|string',
                'mdHistory' => 'nullable|string',
                'worldIds' => 'nullable|array',
                'worldIds.*' => 'integer|exists:worlds,id',
            ]);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->errors()], 422);
        }

        $race = Race::find($id);

        if (!$race) {
            return response()->json(['message' => 'Race not found'], 404);
        }

        try {
            $race->update([
                'name' => $validated['name'] ?? $race->name,
                'src' => $validated['src'] ?? $race->src,
                'md_description' => $validated['mdDescription'] ?? $race->md_description,
                'features' => $validated['features'] ?? $race->features,
                'md_history' => $validated['mdHistory'] ?? $race->md_history,
            ]);
            $race->worlds()->sync($validated['worldIds'] ?? $race->worlds);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }
        $race->load(['worlds']);

        return response()->json(new RaceResource($race));
    }

    /**
     * Удалить расу
     */
    public function deleteRace(int $id): JsonResponse
    {
        $race = Race::find($id);

        if (!$race) {
            return response()->json(['message' => 'Race not found'], 404);
        }

        try {
            $race->worlds()->detach();
            $race->delete();
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }

        return response()->json([], 204);
    }
}
