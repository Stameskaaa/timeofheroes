<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\HostileType;
use App\Models\User;
use App\Models\UserRole;
use App\Resource\CharacterClassResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Validation\ValidationException;

class UserRoleController
{
    public const USERS_LIMIT = 100;
    public const USERS_PAGE = 1;

    /**
     * Назначить роль пользователю по email
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function assignRoleByEmail(Request $request)
    {
        try {
            $validated = $request->validate([
                'email' => 'required|string',
                'role' => ['required', 'string', new Enum(UserRole::class)],
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        }

        $email = $validated['email'];

        $role = $validated['role'];
        if($role === UserRole::ADMIN->value) {
            return response()->json(['message' => 'You can not'], 403);
        }
        $user = User::where('email', $email)->first();

        if (!$user) {
            Log::warning("Пользователь с email {$email} не найден");
            return response()->json([
                'message' => 'Validation failed',
            ], 422);
        }

        $user->role = $role;
        $user->save();

        return response()->json();
    }

    /**
     * Получение editor's
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    function getEmailsByRole(Request $request): JsonResponse
    {
        $role = UserRole::EDITOR->value;
        $users = User::where('role', $role)
            ->pluck('email')
            ->toArray();

        return response()->json($users);
    }

    /**
     * Получение users
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    function getUsers(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'limit' => 'nullable|integer|min:1',
                'page' => 'nullable|integer|min:1',
            ]);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->errors()], 422);
        }

        $limit = $validated['limit'] ?? self::USERS_LIMIT;
        $page = $validated['page'] ?? self::USERS_PAGE;

        $query = User::query();
        $total = $query->count();

        $users = $query->orderBy('role')
            ->skip(($page - 1) * $limit)
            ->take($limit)
            ->get();

        return response()->json([
            'data' => $users,
            'meta' => [
                'page' => $page,
                'limit' => $limit,
                'total' => $total,
            ],
        ]);
    }

    /**
     * Удаление users
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    function deleteUser(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'email' => 'required|email|exists:users,email',
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        }

        $user = User::where('email', $validated['email'])->first();

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        if ($user->role === UserRole::ADMIN->value) {
            return response()->json(['message' => 'You can not'], 403);
        }

        $user->delete();

        return response()->json(['message' => 'User deleted successfully']);
    }
}
