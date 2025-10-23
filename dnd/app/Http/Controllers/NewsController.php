<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\News;
use App\Resource\NewsResource;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class NewsController extends Controller
{
    public const NEWS_LIMIT = 100;
    public const NEWS_PAGE = 1;

    /**
     * Получение списка новостей
     */
    public function getNews(Request $request): JsonResponse
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

        $limit = (int)($validated['limit'] ?? self::NEWS_LIMIT);
        $page = (int)($validated['page'] ?? self::NEWS_PAGE);

        $query = News::query();

        if (!empty($validated['query'])) {
            $query->where('name', 'ILIKE', "%{$validated['query']}%");
        }

        $total = $query->count();

        $news = $query->orderBy('id')
            ->skip(($page - 1) * $limit)
            ->take($limit)
            ->get();

        return response()->json([
            'data' => NewsResource::collection($news),
            'meta' => [
                'page' => $page,
                'limit' => $limit,
                'total' => $total,
            ],
        ]);
    }

    /**
     * Получить новость по ID
     */
    public function getNewsById(int $id): JsonResponse
    {
        $news = News::find($id);

        if (!$news) {
            return response()->json(['message' => 'News not found'], 404);
        }

        return response()->json(new NewsResource($news));
    }

    /**
     * Создать новость
     */
    public function createNews(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'name' => 'nullable|string',
                'shortDescription' => 'nullable|string',
                'mdDescription' => 'nullable|string',
                'src' => 'nullable|string',
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        }

        try {
            $news = News::create([
                'name' => $validated['name'] ?? null,
                'short_description' => $validated['shortDescription'] ?? null,
                'md_description' => $validated['mdDescription'] ?? null,
                'src' => $validated['src'] ?? null,
            ]);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }

        return response()->json(new NewsResource($news), 201);
    }

    /**
     * Обновить новость
     */
    public function updateNews(int $id, Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'name' => 'nullable|string',
                'shortDescription' => 'nullable|string',
                'mdDescription' => 'nullable|string',
                'src' => 'nullable|string',
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        }

        $news = News::find($id);
        if (!$news) {
            return response()->json(['message' => 'News not found'], 404);
        }
        try {
            $news->update([
                'name' => $validated['name'] ?? $news->name,
                'short_description' => $validated['shortDescription'] ?? $news->short_description,
                'md_description' => $validated['mdDescription'] ?? $news->md_description,
                'src' => $validated['src'] ?? $news->src,
            ]);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }

        return response()->json(new NewsResource($news));
    }

    /**
     * Удалить новость
     */
    public function deleteNews(int $id): JsonResponse
    {
        $news = News::find($id);
        if (!$news) {
            return response()->json(['message' => 'News not found'], 404);
        }

        $news->delete();

        return response()->json([], 204);
    }
}
