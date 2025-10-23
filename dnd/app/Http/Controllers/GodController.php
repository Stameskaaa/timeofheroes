<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\God;
use App\Resource\GodResource;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class GodController extends Controller
{
    public const GODS_LIMIT = 100;
    public const GODS_PAGE = 1;

    /**
     * Получение богов с пагинацией и фильтром по query
     */
    public function getGods(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'query' => 'nullable|string|max:255',
                'limit' => 'nullable|integer|min:1',
                'page' => 'nullable|integer|min:1',
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        }

        $limit = (int)($validated['limit'] ?? self::GODS_LIMIT);
        $page = (int)($validated['page'] ?? self::GODS_PAGE);
        $query = God::query();

        if (!empty($validated['query'])) {
            $query->where('name', 'ILIKE', "%{$validated['query']}%");
        }

        $total = $query->count();

        $gods = $query->orderBy('id')
            ->skip(($page - 1) * $limit)
            ->take($limit)
            ->get();

        return response()->json([
            'data' => GodResource::collection($gods),
            'meta' => [
                'page' => $page,
                'limit' => $limit,
                'total' => $total,
            ],
        ]);
    }

    /**
     * Получение бога по ID
     */
    public function getGod(int $id): JsonResponse
    {
        $god = God::with('worlds')->find($id);
        if (!$god) {
            return response()->json(['message' => 'God not found'], 404);
        }

        return response()->json(new GodResource($god));
    }

    /**
     * Создание бога
     */
    public function createGod(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'name' => 'nullable|string',
                'src' => 'nullable|string',
                'mdContent' => 'nullable|string',
                'worldIds' => 'nullable|array',
                'worldIds.*' => 'integer|exists:worlds,id',
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        }
        try {
            $god = God::create([
                'name' => $validated['name'] ?? null,
                'src' => $validated['src'] ?? null,
                'md_content' => $validated['mdContent'] ?? null,
            ]);
            $god->worlds()->sync($validated['worldIds'] ?? []);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }

        return response()->json(new GodResource($god), 201);
    }

    /**
     * Обновление бога
     */
    public function updateGod(int $id, Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'name' => 'nullable|string',
                'src' => 'nullable|string',
                'mdContent' => 'nullable|string',
                'worldIds' => 'nullable|array',
                'worldIds.*' => 'integer|exists:worlds,id',
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        }

        $god = God::find($id);
        if (!$god) {
            return response()->json(['message' => 'God not found'], 404);
        }
        try {
            $god->update([
                'name' => $validated['name'] ?? $god->name,
                'src' => $validated['src'] ?? $god->src,
                'md_content' => $validated['mdContent'] ?? $god->md_content,
            ]);
            $god->worlds()->sync($validated['worldIds'] ?? $god->worlds);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }

        $god->load(['worlds']);

        return response()->json(new GodResource($god));
    }

    /**
     * Удаление бога
     */
    public function deleteGod(int $id): JsonResponse
    {
        $god = God::find($id);
        if (!$god) {
            return response()->json(['message' => 'God not found'], 404);
        }

        $god->worlds()->detach();
        $god->delete();

        return response()->json([], 204);
    }
}
