<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\SimpleWorld;
use App\Resource\SimpleWorldResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class SimpleWorldController
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

        $query = SimpleWorld::query();

        if (!empty($validated['query'])) {
            $query->where('name', 'ILIKE', "%{$validated['query']}%");
        }

        $total = $query->count();
        $worlds = $query->orderBy('id')
            ->skip(($page - 1) * $limit)
            ->take($limit)
            ->get();

        return response()->json([
            'data' => SimpleWorldResource::collection($worlds),
            'meta' => [
                'page' => $page,
                'limit' => $limit,
                'total' => $total,
            ],
        ]);
    }
}
