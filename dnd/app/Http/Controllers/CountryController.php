<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Country;
use App\Resource\CountryResource;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class CountryController extends Controller
{
    public const COUNTRY_LIMIT = 100;
    public const COUNTRY_PAGE = 1;

    /**
     * Получение стран
     */
    public function getCountries(Request $request): JsonResponse
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

        $limit = $validated['limit'] ?? self::COUNTRY_LIMIT;
        $page = $validated['page'] ?? self::COUNTRY_PAGE;

        $query = Country::query();
        if (!empty($validated['query'])) {
            $query->where('name', 'ILIKE', "%{$validated['query']}%");
        }

        $total = $query->count();
        $countries = $query->orderBy('id')
            ->with(['worlds', 'locations', 'npcs'])
            ->skip(($page - 1) * $limit)
            ->take($limit)
            ->get();

        return response()->json([
            'data' => CountryResource::collection($countries),
            'meta' => [
                'page' => $page,
                'limit' => $limit,
                'total' => $total,
            ],
        ]);
    }

    /**
     * Получить страну по идентификатору
     */
    public function getCountry(int $id): JsonResponse
    {
        $country = Country::with(['worlds', 'locations', 'npcs'])->find($id);

        if (!$country) {
            return response()->json(['message' => 'Country not found'], 404);
        }

        return response()->json(new CountryResource($country));
    }

    /**
     * Создать страну
     */
    public function createCountry(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'src' => 'nullable|string',
                'name' => 'nullable|string',
                'shortDescription' => 'nullable|string',
                'mdDescription' => 'nullable|string',
                'worldIds' => 'nullable|array',
                'worldIds.*' => 'integer|exists:worlds,id',
                'npcIds' => 'nullable|array',
                'npcIds.*' => 'integer|exists:npcs,id',
                'locationIds' => 'nullable|array',
                'locationIds.*' => 'integer|exists:locations,id',
            ]);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->errors()], 422);
        }

        try {
            $country = Country::create([
                'src' => $validated['src'] ?? null,
                'name' => $validated['name'] ?? null,
                'short_description' => $validated['shortDescription'] ?? null,
                'md_description' => $validated['mdDescription'] ?? null,
            ]);

            $country->worlds()->sync($validated['worldIds'] ?? []);
            $country->locations()->sync($validated['locationIds'] ?? []);
            $country->npcs()->sync($validated['npcIds'] ?? []);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }

        $country->load(['worlds', 'locations', 'npcs']);

        return response()->json(new CountryResource($country), 201);
    }

    /**
     * Обновить страну
     */
    public function updateCountry(int $id, Request $request): JsonResponse
    {
        $country = Country::findOrFail($id);

        try {
            $validated = $request->validate([
                'src' => 'nullable|string',
                'name' => 'nullable|string',
                'shortDescription' => 'nullable|string',
                'mdDescription' => 'nullable|string',
                'worldIds' => 'nullable|array',
                'worldIds.*' => 'integer|exists:worlds,id',
                'npcIds' => 'nullable|array',
                'npcIds.*' => 'integer|exists:npcs,id',
                'locationIds' => 'nullable|array',
                'locationIds.*' => 'integer|exists:locations,id',
            ]);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->errors()], 422);
        }

        try {
            $country->update([
                'src' => $validated['src'] ?? $country->src,
                'name' => $validated['name'] ?? $country->name,
                'short_description' => $validated['shortDescription'] ?? $country->short_description,
                'md_description' => $validated['mdDescription'] ?? $country->md_description,
            ]);

            $country->worlds()->sync($validated['worldIds'] ?? $country->worlds);
            $country->locations()->sync($validated['locationIds'] ?? $country->locations);
            $country->npcs()->sync($validated['npcIds'] ?? $country->npcs);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }

        $country->load(['worlds', 'locations', 'npcs']);

        return response()->json(new CountryResource($country));
    }

    /**
     * Удалить страну
     */
    public function deleteCountry(int $id): JsonResponse
    {
        $country = Country::find($id);

        if (!$country) {
            return response()->json(['message' => 'Country not found'], 404);
        }

        $country->worlds()->detach();
        $country->locations()->detach();
        $country->npcs()->detach();
        $country->delete();

        return response()->json([], 204);
    }
}
