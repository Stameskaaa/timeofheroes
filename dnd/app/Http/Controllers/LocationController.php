<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Location;
use App\Resource\LocationResource;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class LocationController extends Controller
{
    public const LOCATIONS_LIMIT = 100;
    public const LOCATIONS_PAGE = 1;

    /**
     * Получение локаций
     */
    public function getLocations(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'query' => 'nullable|string|max:255',
                'limit' => 'nullable|integer|min:1',
                'page' => 'nullable|integer|min:1',
                'ids' => 'nullable|array',
                'ids.*' => 'int',
            ]);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->errors()], 422);
        }

        $limit = $validated['limit'] ?? self::LOCATIONS_LIMIT;
        $page = $validated['page'] ?? self::LOCATIONS_PAGE;

        $query = Location::query();
        if (!empty($validated['query'])) {
            $query->where('name', 'ILIKE', "%{$validated['query']}%");
        }
        if (!empty($validated['ids'])) {
            $query->whereIn('id', $validated['ids']);
        }

        $total = $query->count();
        $locations = $query->orderBy('id')
            ->with(['worlds', 'countries', 'hostileCreatures'])
            ->skip(($page - 1) * $limit)
            ->take($limit)
            ->get();

        return response()->json([
            'data' => LocationResource::collection($locations),
            'meta' => [
                'page' => $page,
                'limit' => $limit,
                'total' => $total,
            ],
        ]);
    }

    /**
     * Получить локацию по идентификатору
     */
    public function getLocation(int $id): JsonResponse
    {
        $location = Location::with(['worlds', 'countries', 'hostileCreatures'])->find($id);

        if (!$location) {
            return response()->json(['message' => 'Location not found'], 404);
        }

        return response()->json(new LocationResource($location));
    }

    /**
     * Создать локацию
     */
    public function createLocation(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'name' => 'nullable|string',
                'src' => 'nullable|string',
                'shortDescription' => 'nullable|string',
                'mdDescription' => 'nullable|string',
                'worldIds' => 'nullable|array',
                'worldIds.*' => 'integer|exists:worlds,id',
                'countryIds' => 'nullable|array',
                'countryIds.*' => 'integer|exists:countries,id',
                'hostileCreatureIds' => 'nullable|array',
                'hostileCreatureIds.*' => 'integer|exists:hostile_creatures,id',
            ]);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->errors()], 422);
        }

        try {
            $location = Location::create([
                'name' => $validated['name'] ?? null,
                'src' => $validated['src'] ?? null,
                'short_description' => $validated['shortDescription'] ?? null,
                'md_description' => $validated['mdDescription'] ?? null,
            ]);

            $location->worlds()->sync($validated['worldIds'] ?? []);
            $location->countries()->sync($validated['countryIds'] ?? []);
            $location->hostileCreatures()->sync($validated['hostileCreatureIds'] ?? []);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }

        $location->load(['worlds', 'countries', 'hostileCreatures']);

        return response()->json(new LocationResource($location), 201);
    }

    /**
     * Обновить локацию
     */
    public function updateLocation(int $id, Request $request): JsonResponse
    {
        $location = Location::findOrFail($id);

        try {
            $validated = $request->validate([
                'name' => 'nullable|string',
                'src' => 'nullable|string',
                'shortDescription' => 'nullable|string',
                'mdDescription' => 'nullable|string',
                'worldIds' => 'nullable|array',
                'worldIds.*' => 'integer|exists:worlds,id',
                'countryIds' => 'nullable|array',
                'countryIds.*' => 'integer|exists:countries,id',
                'hostileCreatureIds' => 'nullable|array',
                'hostileCreatureIds.*' => 'integer|exists:hostile_creatures,id',
            ]);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->errors()], 422);
        }

        $location->update([
            'name' => $validated['name'] ?? $location->name,
            'src' => $validated['src'] ?? $location->src,
            'short_description' => $validated['shortDescription'] ?? $location->short_description,
            'md_description' => $validated['mdDescription'] ?? $location->md_description,
        ]);

        try {
            $location->worlds()->sync($validated['worldIds'] ?? $location->worlds);
            $location->countries()->sync($validated['countryIds'] ?? $location->countries);
            $location->hostileCreatures()->sync($validated['hostileCreatureIds'] ?? $location->hostileCreatures);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }

        $location->load(['worlds', 'countries', 'hostileCreatures']);

        return response()->json(new LocationResource($location));
    }

    /**
     * Удалить локацию
     */
    public function deleteLocation(int $id): JsonResponse
    {
        $location = Location::find($id);

        if (!$location) {
            return response()->json(['message' => 'Location not found'], 404);
        }

        $location->worlds()->detach();
        $location->countries()->detach();
        $location->hostileCreatures()->detach();
        $location->delete();

        return response()->json([], 204);
    }
}
