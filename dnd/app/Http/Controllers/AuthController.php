<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\User;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    /**
     * Регистрация
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function register(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string',
                'email' => 'required|email|unique:users',
                'password' => 'required|string|min:6',
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        }

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        // Генерация access токена через guard 'management'
        $accessToken = auth('management')->login($user);

        // Генерация refresh токена
        $refreshTokenPlain = Str::random(64);
        $refreshTokenHash = hash('sha256', $refreshTokenPlain);

        // Сохраняем хэш refresh токена и срок действия (строго int)
        $user->update([
            'refresh_token' => $refreshTokenHash,
            'refresh_token_expires_at' => Carbon::now()->addDays((int)30),
        ]);

        // Ответ с токенами
        return response()->json([
            'accessToken' => $accessToken,
            'refreshToken' => $refreshTokenPlain,
            'tokenType' => 'bearer',
            'expiresIn' => auth('management')->factory()->getTTL() * 60,
        ], 201);
    }

    /**
     * Логин пользователя
     */
    public function login(Request $request): JsonResponse
    {
        try {
            $credentials = $request->validate([
                'email' => 'required|email',
                'password' => 'required|string',
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        }

        // Попытка получить JWT access token
        $token = auth('management')->attempt($credentials);
        if (!$token) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        /** @var \App\Models\User $user */
        $user = auth('management')->user();

        // Сгенерировать и сохранить refresh token (храним хэш)
        $refreshTokenPlain = Str::random(64);
        $refreshTokenHash = hash('sha256', $refreshTokenPlain);

        $user->refresh_token = $refreshTokenHash;
        $user->refresh_token_expires_at = now()->addDays(30);
        $user->save();

        // Получаем TTL (expiresIn) — с обработкой случая, если guard не предоставляет factory()
        $ttlSeconds = $this->getGuardTtlSeconds('management');

        return response()->json([
            'accessToken' => $token,
            'refreshToken' => $refreshTokenPlain,
            'tokenType' => 'bearer',
            'expiresIn' => $ttlSeconds,
        ], 200);
    }

    /**
     * Получить текущего пользователя
     *
     * @return JsonResponse
     */
    public function me(): JsonResponse
    {
        return response()->json(auth('management')->user());
    }

    /**
     * Выход (удаление токена)
     *
     * @return JsonResponse
     */
    public function logout(): JsonResponse
    {
        auth('management')->logout();
        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Получить refresh токен
     *
     * @return JsonResponse
     */
    public function refresh(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'refreshToken' => 'required|string',
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        }

        $providedPlain = $validated['refreshToken'];
        $providedHash = hash('sha256', $providedPlain);

        // Найти пользователя с таким refresh-token (хэш) и не просроченным сроком действия
        /** @var User|null $user */
        $user = User::where('refresh_token', $providedHash)
            ->where('refresh_token_expires_at', '>', now())
            ->first();

        if (!$user) {
            return response()->json(['message' => 'Invalid or expired refresh token'], 401);
        }

        // Генерируем новый access token (jwt-auth)
        $accessToken = auth('management')->login($user);

        // Ротируем refresh token — выдаём новый и сохраняем его хэш
        $newRefreshPlain = Str::random(64);
        $newRefreshHash = hash('sha256', $newRefreshPlain);

        $user->refresh_token = $newRefreshHash;
        $user->refresh_token_expires_at = now()->addDays(30);
        $user->save();

        $ttlSeconds = $this->getGuardTtlSeconds('management');

        return response()->json([
            'accessToken' => $accessToken,
            'refreshToken' => $newRefreshPlain,
            'tokenType' => 'bearer',
            'expiresIn' => $ttlSeconds,
        ], 200);
    }

    /**
     * Возвращает TTL в секундах для guard-а (если доступен factory), иначе берёт jwt.ttl из конфига.
     */
    private function getGuardTtlSeconds(string $guard): int
    {
        $guardObj = auth($guard);

        // Если guard предоставляет factory() (jwt-auth), используем его
        try {
            if (method_exists($guardObj, 'factory')) {
                $ttl = $guardObj->factory()->getTTL();
                return (int)$ttl * 60;
            }
        } catch (Exception $e) {
            // fallthrough to config fallback
        }

        // fallback: берем ttl из конфигурации jwt (минуты -> секунды)
        $configTtl = config('jwt.ttl', config('jwt.ttl', 60)); // на всякий случай
        return (int)$configTtl * 60;
    }
}
