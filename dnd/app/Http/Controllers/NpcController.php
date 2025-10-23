<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Npc;
use App\Resource\NpcResource;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class NpcController extends Controller
{
    public const NPC_LIMIT = 100;
    public const NPC_PAGE = 1;

    /**
     * Получение списка NPC
     */
    public function getNpcSearch(Request $request): JsonResponse
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

        $limit = $validated['limit'] ?? self::NPC_LIMIT;
        $page = $validated['page'] ?? self::NPC_PAGE;

        $query = Npc::query();
        if (!empty($validated['query'])) {
            $query->where('name', 'ILIKE', "%{$validated['query']}%");
        }

        $total = $query->count();
        $npcs = $query->with(['countries', 'worlds'])
            ->skip(($page - 1) * $limit)
            ->take($limit)
            ->get();

        return response()->json([
            'data' => NpcResource::collection($npcs),
            'meta' => [
                'page' => $page,
                'limit' => $limit,
                'total' => $total,
            ],
        ]);
    }

    /**
     * Получить NPC по ID
     */
    public function getNpc(int $id): JsonResponse
    {
        $npc = Npc::with(['countries', 'worlds'])->find($id);

        if (!$npc) {
            return response()->json(['message' => 'Npc not found'], 404);
        }

        return response()->json(new NpcResource($npc));
    }

    /**
     * Создать NPC
     */
    public function createNpc(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'name' => 'nullable|string',
                'src' => 'nullable|string',
                'status' => 'nullable|string',
                'fraction' => 'nullable|string',
                'shortDescription' => 'nullable|string',
                'mdDescription' => 'nullable|string',
                'mdHistory' => 'nullable|string',
                'mdFunFacts' => 'nullable|string',
                'worldIds' => 'nullable|array',
                'worldIds.*' => 'integer|exists:worlds,id',
                'countryIds' => 'nullable|array',
                'countryIds.*' => 'integer|exists:countries,id',
            ]);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->errors()], 422);
        }

        try {
            $npc = Npc::create([
                'name' => $validated['name'] ?? null,
                'src' => $validated['src'] ?? null,
                'status' => $validated['status'] ?? null,
                'fraction' => $validated['fraction'] ?? null,
                'short_description' => $validated['shortDescription'] ?? null,
                'md_description' => $validated['mdDescription'] ?? null,
                'md_history' => $validated['mdHistory'] ?? null,
                'md_fun_facts' => $validated['mdFunFacts'] ?? null,
            ]);

            $npc->worlds()->sync($validated['worldIds'] ?? []);
            $npc->countries()->sync($validated['countryIds'] ?? []);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }

        $npc->load(['countries', 'worlds']);

        return response()->json(new NpcResource($npc), 201);
    }

    /**
     * Обновить NPC
     */
    public function updateNpc(int $id, Request $request): JsonResponse
    {
        $npc = Npc::findOrFail($id);

        try {
            $validated = $request->validate([
                'name' => 'nullable|string',
                'src' => 'nullable|string',
                'status' => 'nullable|string',
                'fraction' => 'nullable|string',
                'shortDescription' => 'nullable|string',
                'mdDescription' => 'nullable|string',
                'mdHistory' => 'nullable|string',
                'mdFunFacts' => 'nullable|string',
                'worldIds' => 'nullable|array',
                'worldIds.*' => 'integer|exists:worlds,id',
                'countryIds' => 'nullable|array',
                'countryIds.*' => 'integer|exists:countries,id',
            ]);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->errors()], 422);
        }

        try {
            $npc->update([
                'name' => $validated['name'] ?? $npc->name,
                'src' => $validated['src'] ?? $npc->src,
                'status' => $validated['status'] ?? $npc->status,
                'fraction' => $validated['fraction'] ?? $npc->fraction,
                'short_description' => $validated['shortDescription'] ?? $npc->short_description,
                'md_description' => $validated['mdDescription'] ?? $npc->md_description,
                'md_history' => $validated['mdHistory'] ?? $npc->md_history,
                'md_fun_facts' => $validated['mdFunFacts'] ?? $npc->md_fun_facts,
            ]);

            $npc->worlds()->sync($validated['worldIds'] ?? $npc->worlds);
            $npc->countries()->sync($validated['countryIds'] ?? $npc->country_ids);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }

        $npc->load(['countries', 'worlds']);

        return response()->json(new NpcResource($npc));
    }

    /**
     * Удалить NPC
     */
    public function deleteNpc(int $id): JsonResponse
    {
        $npc = Npc::find($id);

        if (!$npc) {
            return response()->json(['message' => 'Npc not found'], 404);
        }

        $npc->worlds()->detach();
        $npc->countries()->detach();
        $npc->delete();

        return response()->json([], 204);
    }
}
