<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Characteristic;
use App\Resource\CharacteristicResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class CharacteristicController extends Controller
{
    public const CHARACTERISTICS_LIMIT = 100;
    public const CHARACTERISTICS_PAGE = 1;

    /**
     * Получение характеристик с пагинацией и фильтром по query
     */
    public function getCharacteristics(Request $request): JsonResponse
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

        $limit = (int)($validated['limit'] ?? self::CHARACTERISTICS_LIMIT);
        $page = (int)($validated['page'] ?? self::CHARACTERISTICS_PAGE);
        $query = Characteristic::query();

        if (!empty($validated['query'])) {
            $query->where('name', 'ILIKE', "%{$validated['query']}%");
        }

        $total = $query->count();

        $characteristics = $query->orderBy('id')
            ->skip(($page - 1) * $limit)
            ->take($limit)
            ->get();

        return response()->json([
            'data' => CharacteristicResource::collection($characteristics),
            'meta' => [
                'page' => $page,
                'limit' => $limit,
                'total' => $total,
            ],
        ]);
    }

    /**
     * Получение характеристики по ID
     */
    public function getCharacteristic(int $id): JsonResponse
    {
        $characteristic = Characteristic::find($id);
        if (!$characteristic) {
            return response()->json(['message' => 'Characteristic not found'], 404);
        }

        return response()->json(new CharacteristicResource($characteristic));
    }

    /**
     * Создание характеристики
     */
    public function createCharacteristic(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'name' => 'nullable|string',
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        }

        $characteristic = Characteristic::create([
            'name' => $validated['name'] ?? null,
        ]);

        return response()->json(new CharacteristicResource($characteristic), 201);
    }

    /**
     * Обновление характеристики
     */
    public function updateCharacteristic(int $id, Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'name' => 'nullable|string',
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        }

        $characteristic = Characteristic::find($id);
        if (!$characteristic) {
            return response()->json(['message' => 'Characteristic not found'], 404);
        }

        $characteristic->update([
            'name' => $validated['name'] ?? $characteristic->name,
        ]);

        return response()->json(new CharacteristicResource($characteristic));
    }

    /**
     * Удаление характеристики
     */
    public function deleteCharacteristic(int $id): JsonResponse
    {
        $characteristic = Characteristic::find($id);
        if (!$characteristic) {
            return response()->json(['message' => 'Characteristic not found'], 404);
        }

        $characteristic->delete();

        return response()->json([], 204);
    }
}
