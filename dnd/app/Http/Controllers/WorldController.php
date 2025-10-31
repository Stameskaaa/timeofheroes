<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\World;
use App\Resource\WorldResource;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class WorldController extends Controller
{
    public const WORLD_LIMIT = 100;
    public const WORLD_PAGE = 1;

    /**
     * Получение миров
     */
    public function getWorlds(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'query' => 'nullable|string|max:255',
                'limit' => 'nullable|integer|min:1',
                'page' => 'nullable|integer|min:1',
            ]);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->errors()], 422);
        }

        $limit = $validated['limit'] ?? self::WORLD_LIMIT;
        $page = $validated['page'] ?? self::WORLD_PAGE;

        $query = World::query();

        if (!empty($validated['query'])) {
            $query->where('name', 'ILIKE', "%{$validated['query']}%");
        }

        $total = $query->count();
        $worlds = $query->orderBy('id')
            ->with([
                'origins',
                'features',
                'gods',
                'characterClasses',
                'races',
                'countries',
                'locations',
                'locations.hostileCreatures',
                'npcs',
            ])
            ->skip(($page - 1) * $limit)
            ->take($limit)
            ->get();

        return response()->json([
            'data' => WorldResource::collection($worlds),
            'meta' => [
                'page' => $page,
                'limit' => $limit,
                'total' => $total,
            ],
        ]);
    }

    /**
     * Получить мир по ID
     */
    public function getWorld(int $id): JsonResponse
    {
        $world = World::with([
            'origins',
            'features',
            'gods',
            'characterClasses',
            'races',
            'countries',
            'locations',
            'locations.hostileCreatures',
            'npcs',
        ])->find($id);

        if (!$world) {
            return response()->json(['message' => 'World not found'], 404);
        }

        return response()->json(new WorldResource($world));
    }

    /**
     * Создание мира
     */
    public function createWorld(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'src' => 'nullable|string',
                'name' => 'nullable|string',
                'shortDescription' => 'nullable|string',
                'mdDescription' => 'nullable|string',
                'mdHistory' => 'nullable|string',
                'countryIds' => 'nullable|array',
                'countryIds.*' => 'integer|exists:countries,id',
                'locationIds' => 'nullable|array',
                'locationIds.*' => 'integer|exists:locations,id',
                'raceIds' => 'nullable|array',
                'raceIds.*' => 'integer|exists:races,id',
                'characterClassIds' => 'nullable|array',
                'characterClassIds.*' => 'integer|exists:character_classes,id',
                'originIds' => 'nullable|array',
                'originIds.*' => 'integer|exists:origins,id',
                'featureIds' => 'nullable|array',
                'featureIds.*' => 'integer|exists:features,id',
                'godIds' => 'nullable|array',
                'godIds.*' => 'integer|exists:gods,id',
                'npcIds' => 'nullable|array',
                'npcIds.*' => 'integer|exists:npcs,id',
            ]);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->errors()], 422);
        }

        try {
            $world = World::create([
                'src' => $validated['src'] ?? null,
                'name' => $validated['name'] ?? null,
                'short_description' => $validated['shortDescription'] ?? null,
                'md_description' => $validated['mdDescription'] ?? null,
                'md_history' => $validated['mdHistory'] ?? null,
            ]);

            $world->countries()->sync($validated['countryIds'] ?? []);
            $world->locations()->sync($validated['locationIds'] ?? []);
            $world->races()->sync($validated['raceIds'] ?? []);
            $world->characterClasses()->sync($validated['characterClassIds'] ?? []);
            $world->origins()->sync($validated['originIds'] ?? []);
            $world->features()->sync($validated['featureIds'] ?? []);
            $world->gods()->sync($validated['godIds'] ?? []);
            $world->npcs()->sync($validated['npcIds'] ?? []);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }

        $world->load(['countries', 'locations', 'races', 'characterClasses', 'origins', 'features', 'gods', 'npcs']);

        return response()->json(new WorldResource($world), 201);
    }

    /**
     * Обновление мира
     */
    public function updateWorld(int $id, Request $request): JsonResponse
    {
        $world = World::findOrFail($id);

        try {
            $validated = $request->validate([
                'src' => 'nullable|string',
                'name' => 'nullable|string',
                'shortDescription' => 'nullable|string',
                'mdDescription' => 'nullable|string',
                'mdHistory' => 'nullable|string',
                'countryIds' => 'nullable|array',
                'countryIds.*' => 'integer|exists:countries,id',
                'locationIds' => 'nullable|array',
                'locationIds.*' => 'integer|exists:locations,id',
                'raceIds' => 'nullable|array',
                'raceIds.*' => 'integer|exists:races,id',
                'characterClassIds' => 'nullable|array',
                'characterClassIds.*' => 'integer|exists:character_classes,id',
                'originIds' => 'nullable|array',
                'originIds.*' => 'integer|exists:origins,id',
                'featureIds' => 'nullable|array',
                'featureIds.*' => 'integer|exists:features,id',
                'godIds' => 'nullable|array',
                'godIds.*' => 'integer|exists:gods,id',
                'npcIds' => 'nullable|array',
                'npcIds.*' => 'integer|exists:npcs,id',
            ]);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->errors()], 422);
        }

        try {
            $world->update([
                'src' => $validated['src'] ?? $world->src,
                'name' => $validated['name'] ?? $world->name,
                'short_description' => $validated['shortDescription'] ?? $world->short_description,
                'md_description' => $validated['mdDescription'] ?? $world->md_description,
                'md_history' => $validated['mdHistory'] ?? $world->md_history,
            ]);

            $world->countries()->sync($validated['countryIds'] ?? $world->countries);
            $world->locations()->sync($validated['locationIds'] ?? $world->locations);
            $world->races()->sync($validated['raceIds'] ?? $world->races);
            $world->characterClasses()->sync(
                $validated['characterClassIds'] ?? $world->characterClasses,
            );
            $world->origins()->sync($validated['originIds'] ?? $world->origins);
            $world->features()->sync($validated['featureIds'] ?? $world->features);
            $world->gods()->sync($validated['godIds'] ?? $world->gods);
            $world->npcs()->sync($validated['npcIds'] ?? $world->npcs);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }

        $world->load(['countries', 'locations', 'races', 'characterClasses', 'origins', 'features', 'gods', 'npcs']);

        return response()->json(new WorldResource($world));
    }

    /**
     * Удаление мира
     */
    public function deleteWorld(int $id): JsonResponse
    {
        $world = World::find($id);
        if (!$world) {
            return response()->json(['message' => 'World not found'], 404);
        }

        $world->origins()->detach();
        $world->features()->detach();
        $world->gods()->detach();
        $world->characterClasses()->detach();
        $world->races()->detach();
        $world->countries()->detach();
        $world->locations()->detach();
        $world->npcs()->detach();

        $world->delete();

        return response()->json([], 204);
    }
}
