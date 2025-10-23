<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Rule;
use App\Models\RuleType;
use App\Resource\RuleResource;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Validation\ValidationException;

class RuleController extends Controller
{
    public const RULE_LIMIT = 100;
    public const RULE_PAGE = 1;

    /**
     * Получение правил с фильтрацией и пагинацией
     */
    public function getRules(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'type' => ['nullable', 'string', new Enum(RuleType::class)],
                'tags' => 'nullable|array',
                'tags.*' => 'string',
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

        $limit = (int)($validated['limit'] ?? self::RULE_LIMIT);
        $page = (int)($validated['page'] ?? self::RULE_PAGE);

        $query = Rule::query();

        if (!empty($validated['type'])) {
            $query->where('type', $validated['type']);
        }

        if (!empty($validated['tags'])) {
            $query->whereJsonContains('tags', $validated['tags']);
        }

        if (!empty($validated['query'])) {
            $query->where('name', 'ILIKE', "%{$validated['query']}%");
        }

        $total = $query->count();

        $rules = $query->orderBy('id')
            ->skip(($page - 1) * $limit)
            ->take($limit)
            ->get();

        return response()->json([
            'data' => RuleResource::collection($rules),
            'meta' => [
                'page' => $page,
                'limit' => $limit,
                'total' => $total,
            ],
        ]);
    }

    /**
     * Получить правило по ID
     */
    public function getRule(int $id): JsonResponse
    {
        $rule = Rule::find($id);
        if (!$rule) {
            return response()->json(['message' => 'Rule not found'], 404);
        }

        return response()->json(new RuleResource($rule));
    }

    /**
     * Создать правило
     */
    public function createRule(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'type' => ['required', 'string', new Enum(RuleType::class)],
                'name' => 'nullable|string',
                'shortDescription' => 'nullable|string',
                'mdContent' => 'nullable|string',
                'tags' => 'nullable|array',
                'tags.*' => 'string',
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        }

        try {
            $rule = Rule::create([
                'type' => $validated['type'],
                'name' => $validated['name'] ?? null,
                'short_description' => $validated['shortDescription'] ?? null,
                'md_content' => $validated['mdContent'] ?? null,
                'tags' => $validated['tags'] ?? [],
            ]);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }

        return response()->json(new RuleResource($rule), 201);
    }

    /**
     * Обновление правила
     */
    public function updateRule(int $id, Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'type' => ['nullable', 'string', new Enum(RuleType::class)],
                'name' => 'nullable|string',
                'shortDescription' => 'nullable|string',
                'mdContent' => 'nullable|string',
                'tags' => 'nullable|array',
                'tags.*' => 'string',
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        }

        $rule = Rule::find($id);
        if (!$rule) {
            return response()->json(['message' => 'Rule not found'], 404);
        }

        try {
            $rule->update([
                'type' => $validated['type'] ?? $rule->type,
                'name' => $validated['name'] ?? $rule->name,
                'short_description' => $validated['shortDescription'] ?? $rule->short_description,
                'md_content' => $validated['mdContent'] ?? $rule->md_content,
                'tags' => $validated['tags'] ?? $rule->tags,
            ]);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }

        return response()->json(new RuleResource($rule));
    }

    /**
     * Удалить правило
     */
    public function deleteRule(int $id): JsonResponse
    {
        $rule = Rule::find($id);
        if (!$rule) {
            return response()->json(['message' => 'Rule not found'], 404);
        }

        $rule->delete();

        return response()->json([], 204);
    }
}
